import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#12261c",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(214,133,92,0.35), transparent 45%), radial-gradient(circle at 85% 85%, rgba(214,133,92,0.18), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#d6855c",
          }}
        >
          {site.shortName}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 600, color: "#f7f3ec", lineHeight: 1.1 }}>
            Journeys, chauffeured
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 600, color: "#f7f3ec", lineHeight: 1.1 }}>
            to perfection.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "rgba(247,243,236,0.65)", maxWidth: 820 }}>
            Cars, SUVs, tempo travellers & coaches across South India — verified
            drivers, transparent pricing.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
