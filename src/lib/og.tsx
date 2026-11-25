import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${profile.name} — Software Engineer`;

// The OG image is rendered to a PNG, so it can't read the CSS variables.
// These mirror the light-theme tokens in globals.css.
const BG = "#FBFAF7";
const TEXT = "#2E2A33";
const MUTED = "#6B6573";
const ACCENT = "#8E7CC3";

/**
 * Load a Google font as TTF for the image renderer. Returns null if the
 * network isn't available, so the build never fails because of a font.
 */
async function loadFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

/** Name in the heading font, "Software Engineer" in mono, a lavender bar. */
export async function renderOgImage() {
  const [manrope, mono] = await Promise.all([
    loadFont("Manrope", 600),
    loadFont("JetBrains+Mono", 400),
  ]);
  const fonts = [
    ...(manrope ? [{ name: "Manrope", data: manrope, weight: 600 as const }] : []),
    ...(mono ? [{ name: "JetBrains Mono", data: mono, weight: 400 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: BG,
          color: TEXT,
        }}
      >
        <div style={{ display: "flex", width: 72, height: 8, borderRadius: 4, background: ACCENT }} />
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 80,
            fontWeight: 600,
            letterSpacing: -2,
            fontFamily: manrope ? "Manrope" : "sans-serif",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 34,
            color: MUTED,
            fontFamily: mono ? "JetBrains Mono" : "monospace",
          }}
        >
          Software Engineer
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
