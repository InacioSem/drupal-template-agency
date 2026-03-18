import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the DrupalReady team. Ask about custom templates, request a quote, or discuss your Drupal project.",
  openGraph: {
    title: "Contact — DrupalReady",
    description:
      "Get in touch with the DrupalReady team. Ask about custom templates, request a quote, or discuss your Drupal project.",
    url: `${SITE_URL}/contact`,
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({
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
              { name: "Contact", href: "/contact" },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
