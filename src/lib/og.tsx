import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${profile.name} — Software Engineer`;

/** Plain typographic card on the site background. Shared by OG + Twitter. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "96px",
          background: "#faf8f4",
          color: "#1c1a17",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, letterSpacing: -1.5 }}>{profile.name}</div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 36, color: "#5c5650" }}>{profile.role}</div>
        <div style={{ display: "flex", marginTop: 48, width: 64, height: 3, background: "#9a3f1f" }} />
      </div>
    ),
    ogSize,
  );
}
