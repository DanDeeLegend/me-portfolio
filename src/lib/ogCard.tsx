import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${site.name} (a.k.a Dannybouy): software engineer, AI, blockchain and cryptography`;

/** Shared 1200x630 share card, used for both Open Graph and Twitter previews. */
export function ogCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c10",
          color: "#f2efe8",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: "rgba(200,255,61,0.16)",
            filter: "blur(80px)",
          }}
        />
        <div style={{ display: "flex", fontSize: 28, color: "#a3a1ad" }}>
          {site.name.toLowerCase().replace(" ", ".")} · {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            Daniel a.k.a
          </div>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 800, letterSpacing: -4, lineHeight: 1, color: "#c8ff3d" }}>
            Dannybouy.
          </div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 28, color: "#a3a1ad" }}>
            I do the unthinkable with&nbsp;<span style={{ color: "#c8ff3d" }}>AI</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a3a1ad" }}>
          Blockchain · Cryptography · Full-stack · Nile University of Nigeria
        </div>
      </div>
    ),
    ogSize,
  );
}
