import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${profile.name} — Software Engineer`;

/** Cream card: name, a hand-drawn squiggle, title. Shared by OG + Twitter. */
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
        <svg
          width="380"
          height="26"
          viewBox="0 0 240 16"
          fill="none"
          stroke="#a64b2a"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ marginTop: 12 }}
        >
          <path d="M3 10c12-7 20-7 30 0s19 6 30-1 20-6 30 1 19 6 30-1 21-6 31 1 19 6 30-1 20-6 30 0 14 4 19 1" />
        </svg>
        <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#6b5a4f" }}>
          Software Engineer
        </div>
      </div>
    ),
    ogSize,
  );
}
