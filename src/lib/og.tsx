import { ImageResponse } from "next/og";
import { BRUSH_STROKE_PATH } from "@/components/Doodles";
import { profile } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${profile.name} — Software Engineer`;

/** Cream card: name, a dry-brush stroke, title. Shared by OG + Twitter. */
export function renderOgImage() {
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
          background: "#fbf6ee",
          color: "#2b211c",
        }}
      >
        <div style={{ display: "flex", fontSize: 76, letterSpacing: -1.5, fontFamily: "serif" }}>
          {profile.name}
        </div>
        <svg width="400" height="28" viewBox="0 0 260 18" style={{ marginTop: 14 }}>
          <path d={BRUSH_STROKE_PATH} fill="#a64b2a" fillRule="evenodd" />
        </svg>
        <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#6b5a4f" }}>
          Software Engineer
        </div>
      </div>
    ),
    ogSize,
  );
}
