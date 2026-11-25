#!/usr/bin/env node
/**
 * Checks WCAG 2.x contrast for every main text/background pair in both
 * themes. Token values are read from src/app/globals.css, so this can't drift
 * from the real styles.
 *
 *   node scripts/check-contrast.mjs
 *
 * Exits with code 1 if any pair fails.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const cssPath = fileURLToPath(new URL("../src/app/globals.css", import.meta.url));
const css = readFileSync(cssPath, "utf8");

/** Extract `--name: value;` pairs from the first block matching `selector {`. */
function tokens(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Selector not found: ${selector}`);
  const body = css.slice(start, css.indexOf("}", start));
  const out = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) out[name] = value.trim();
  return out;
}

const light = tokens(":root");
const dark = { ...light, ...tokens(':root[data-theme="dark"]') };

/** Parse #rgb/#rrggbb, rgb(r g b / a) and var(--x) into [r, g, b, a]. */
function color(value, theme) {
  const v = value.trim();
  const ref = v.match(/^var\(--([\w-]+)\)$/);
  if (ref) return color(theme[ref[1]], theme);
  if (v.startsWith("#")) {
    const hex = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join("") : v.slice(1);
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).concat(1);
  }
  const rgb = v.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[/,]\s*([\d.]+))?\s*\)$/);
  if (rgb) return [+rgb[1], +rgb[2], +rgb[3], rgb[4] === undefined ? 1 : +rgb[4]];
  throw new Error(`Can't parse colour: ${value}`);
}

/** Composite a (possibly translucent) colour over an opaque one. */
function over(fg, bg) {
  const a = fg[3];
  return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat(1);
}

function luminance([r, g, b]) {
  const lin = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const BODY = 4.5; // normal text
const UI = 3; // large text, icons, focus rings, UI parts

/** [label, foreground token, background token, minimum, (optional) base under a translucent bg] */
const pairs = [
  ["Body text on page", "text", "bg", BODY],
  ["Body text on card", "text", "surface", BODY],
  ["Body text on lavender card", "text", "surface-alt", BODY],
  ["Muted text on page", "text-muted", "bg", BODY],
  ["Muted text on card", "text-muted", "surface", BODY],
  ["Muted text on lavender card", "text-muted", "surface-alt", BODY],
  ["Link text on page", "accent-strong", "bg", BODY],
  ["Link text on card", "accent-strong", "surface", BODY],
  ["Link text on lavender card", "accent-strong", "surface-alt", BODY],
  ["Primary button text", "on-primary", "primary", BODY],
  ["Focus ring / active UI on page", "accent", "bg", UI],
  ["Focus ring / active UI on card", "accent", "surface", UI],
  ["Monogram on lavender", "accent-strong", "surface-alt", BODY],
  ...["mint", "peach", "sky", "butter", "rose"].flatMap((t) => [
    [`Text on ${t} tint (on page)`, "text", t, BODY, "bg"],
    [`Text on ${t} tint (on card)`, "text", t, BODY, "surface"],
  ]),
];

let failures = 0;
for (const [themeName, theme] of [
  ["LIGHT", light],
  ["DARK", dark],
]) {
  console.log(`\n${themeName}`);
  for (const [label, fgName, bgName, min, baseName] of pairs) {
    let bg = color(theme[bgName], theme);
    if (bg[3] < 1) bg = over(bg, color(theme[baseName ?? "bg"], theme));
    const fg = over(color(theme[fgName], theme), bg);
    const r = ratio(fg, bg);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(
      `  ${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (needs ${min}:1)  ${label}  [--${fgName} on --${bgName}]`,
    );
  }
}

console.log(
  "\nNote: --border is a decorative hairline and is not required to meet 3:1;" +
    " no control relies on it to be identified.",
);
console.log(failures === 0 ? "\nAll pairs pass WCAG AA." : `\n${failures} pair(s) FAIL.`);
process.exit(failures === 0 ? 0 : 1);
