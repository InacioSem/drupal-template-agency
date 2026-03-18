import { ImageResponse } from "next/og";
import { getTemplateBySlug, getAllSlugs } from "@/lib/templates";
import { SITE_NAME } from "@/lib/constants";

export const alt = "DrupalReady Template";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  const name = template?.name ?? "Template";
  const tagline = template?.tagline ?? "";
  const vertical = template?.verticalLabel ?? "";

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
            fontSize: "16px",
            fontWeight: 600,
            color: "#8b5cf6",
            textTransform: "uppercase",
            letterSpacing: "3px",
            marginBottom: "16px",
          }}
        >
          {vertical}
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: "700px",
            marginTop: "16px",
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "40px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "18px",
          }}
        >
          <span>Free & Open Source</span>
          <span style={{ margin: "0 8px" }}>·</span>
          <span>{SITE_NAME}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
