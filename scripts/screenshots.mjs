#!/usr/bin/env node
/**
 * Screenshots + theme checks with Playwright, using the installed Microsoft
 * Edge (no browser download needed).
 *
 *   npm run build && npm start        # in one terminal
 *   node scripts/screenshots.mjs      # in another (BASE_URL defaults to :3000)
 *
 * Saves PNGs to ./screenshots (git-ignored) and prints check results.
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
const results = [];
const check = (name, ok, detail = "") => {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

const bgOf = (page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--bg").trim());

/** Scroll through so every reveal-on-scroll section is shown before a full-page shot. */
async function revealAll(page) {
  await page.evaluate(async () => {
    // "instant" overrides the page's smooth scrolling so each step lands.
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(600);
}

/** Click the theme toggle until the wanted mode is active. */
async function chooseTheme(page, mode) {
  for (let i = 0; i < 3; i++) {
    const label = await page.getByRole("button", { name: /^Theme:/ }).getAttribute("aria-label");
    if (label?.startsWith(`Theme: ${mode}.`)) return;
    await page.getByRole("button", { name: /^Theme:/ }).click();
  }
}

const states = [
  { name: "system-light", colorScheme: "light" },
  { name: "system-dark", colorScheme: "dark" },
  { name: "forced-light", colorScheme: "dark", force: "Light" },
  { name: "forced-dark", colorScheme: "light", force: "Dark" },
];

for (const width of [390, 1280]) {
  for (const state of states) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      colorScheme: state.colorScheme,
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    if (state.force) await chooseTheme(page, state.force);
    await revealAll(page);
    await page.screenshot({ path: `${OUT}/${width}-${state.name}.png`, fullPage: true });
    await context.close();
  }
}

// --- Behaviour checks -------------------------------------------------------

// 1. Forced Dark survives a reload, and is applied before <body> exists (no flash).
{
  const context = await browser.newContext({ colorScheme: "light" });
  const page = await context.newPage();
  await page.goto(BASE);
  await chooseTheme(page, "Dark");
  // Watch the whole document from the moment it's created (before <html>
  // exists) and record whether <body> existed when data-theme was set.
  await page.addInitScript(() => {
    window.__themeSetBeforeBody = null;
    new MutationObserver((_, obs) => {
      if (document.documentElement?.getAttribute("data-theme")) {
        window.__themeSetBeforeBody = document.body === null;
        obs.disconnect();
      }
    }).observe(document, { attributes: true, childList: true, subtree: true });
  });
  await page.reload();
  const attr = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  check("Reload keeps the chosen theme", attr === "dark", `data-theme=${attr}`);
  const early = await page.evaluate(() => window.__themeSetBeforeBody);
  check("Theme applied before <body> is parsed (no flash)", early === true);
  check("Dark background after reload", (await bgOf(page)) === "#1b1a21", await bgOf(page));
  await context.close();
}

// 2. System mode follows an OS change live.
{
  const context = await browser.newContext({ colorScheme: "light" });
  const page = await context.newPage();
  await page.goto(BASE);
  const before = await bgOf(page);
  await page.emulateMedia({ colorScheme: "dark" });
  const after = await bgOf(page);
  check("System mode switches live with the OS", before === "#fbfaf7" && after === "#1b1a21", `${before} → ${after}`);
  await context.close();
}

// 3. No horizontal scroll at any target width.
for (const width of [360, 390, 768, 1024, 1280, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  check(`No horizontal scroll at ${width}px`, overflow <= 0, `${overflow}px extra`);
  await context.close();
}

// 4. Mobile menu: opens, Escape closes, focus returns to the button.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 800 } });
  const page = await context.newPage();
  await page.goto(BASE);
  const button = page.getByRole("button", { name: "Open menu" });
  await button.click();
  const expanded = await page.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded");
  const locked = await page.evaluate(() => document.body.style.overflow);
  await page.keyboard.press("Escape");
  const closed = (await page.locator("#mobile-menu").count()) === 0;
  const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-controls"));
  check("Mobile menu opens with aria-expanded=true", expanded === "true");
  check("Body scroll locked while menu is open", locked === "hidden");
  check("Escape closes the menu and returns focus", closed && focused === "mobile-menu");
  await page.screenshot({ path: `${OUT}/390-menu-closed.png` });
  await context.close();
}

// 5. Menu screenshot in dark mode.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 800 }, colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto(BASE);
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.screenshot({ path: `${OUT}/390-menu-open-dark.png` });
  await context.close();
}

await browser.close();
const failed = results.filter((r) => !r).length;
console.log(failed === 0 ? `\nAll ${results.length} checks pass.` : `\n${failed} check(s) failed.`);
process.exit(failed === 0 ? 0 : 1);
