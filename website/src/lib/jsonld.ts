import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, CONTACT_EMAIL, GITHUB_ORG } from "./constants";
import type { DrupalTemplate } from "@/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    sameAs: [GITHUB_ORG],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function softwareApplicationJsonLd(template: DrupalTemplate) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: template.name,
    description: template.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    url: `${SITE_URL}/templates/${template.slug}`,
    downloadUrl: template.repoUrl,
    softwareVersion: template.version,
    license: "https://www.gnu.org/licenses/gpl-2.0.html",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqPageJsonLd(
  faqs: { category: string; questions: { q: string; a: string }[] }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((cat) =>
      cat.questions.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
