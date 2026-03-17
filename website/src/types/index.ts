export type TemplateVertical =
  | "agency-business"
  | "government-education"
  | "nonprofit-healthcare"
  | "healthcare"
  | "legal"
  | "saas"
  | "university"
  | "restaurant"
  | "realestate"
  | "church"
  | "hotel"
  | "construction"
  | "finance"
  | "media"
  | "portfolio"
  | "ecommerce"
  | "school"
  | "association"
  | "fitness"
  | "consulting";

export interface ComingSoonTemplate {
  slug: string;
  name: string;
  tagline: string;
  vertical: TemplateVertical;
  verticalLabel: string;
  icon: string;
  color: string;
  features: string[];
}

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  isPrimary: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface ModuleInfo {
  name: string;
  humanName: string;
  description: string;
  drupalOrgUrl: string;
  isCore: boolean;
}

export interface ThemeInfo {
  name: string;
  baseTheme: string;
  description: string;
}

export interface DrupalTemplate {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  vertical: TemplateVertical;
  verticalLabel: string;
  composerPackage: string;
  composerCommand: string;
  version: string;
  drupalVersion: string;
  phpVersion: string;
  repoUrl: string;
  demoUrl: string | null;
  screenshots: Screenshot[];
  features: Feature[];
  modules: ModuleInfo[];
  contentTypes: string[];
  paragraphTypes: string[];
  theme: ThemeInfo;
  recipes: string[];
  updatedAt: string;
  downloads: number;
}
