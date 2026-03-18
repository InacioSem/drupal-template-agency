import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Support Center",
  description:
    "Need help with a DrupalReady template? Create a support ticket and our team will respond within 24 hours.",
  openGraph: {
    title: "Support Center — DrupalReady",
    description:
      "Need help with a DrupalReady template? Create a support ticket and our team will respond within 24 hours.",
    url: `${SITE_URL}/support`,
  },
  alternates: {
    canonical: `${SITE_URL}/support`,
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Support", href: "/support" },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
