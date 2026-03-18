import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const alt = "DrupalReady — Production-Ready Drupal 11 Templates";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "32px",
              fontWeight: 800,
            }}
          >
            D
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "white",
            }}
          >
            {SITE_NAME}
          </span>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Production-Ready Drupal 11 Templates
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.4)",
            marginTop: "16px",
          }}
        >
          Install in 60 seconds with Composer
        </div>
      </div>
    ),
    { ...size }
  );
}
