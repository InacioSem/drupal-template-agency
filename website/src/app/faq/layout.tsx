import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { faqPageJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { faqData } from "./faq-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about DrupalReady templates — installation, customization, pricing, support, and more.",
  openGraph: {
    title: "FAQ — DrupalReady",
    description:
      "Frequently asked questions about DrupalReady templates — installation, customization, pricing, support, and more.",
    url: `${SITE_URL}/faq`,
  },
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(faqData)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "FAQ", href: "/faq" },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
