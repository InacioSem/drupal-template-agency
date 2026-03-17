export const SITE_NAME = "DrupalReady";
export const SITE_DESCRIPTION =
  "Production-ready Drupal 11 templates for agencies, governments, and nonprofits. Install in 60 seconds with Composer.";
export const SITE_URL = "https://drupalready.dev";
export const GITHUB_ORG = "https://github.com/InacioSem";
export const CONTACT_EMAIL = "hello@drupalready.dev";

export const NAV_LINKS = [
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const VERTICALS = [
  { value: "agency-business", label: "Agency & Business" },
  { value: "government-education", label: "Government & Education" },
  { value: "nonprofit-healthcare", label: "Nonprofit & Healthcare" },
] as const;
