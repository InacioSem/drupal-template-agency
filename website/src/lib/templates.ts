import type { DrupalTemplate, TemplateVertical } from "@/types";
import templatesData from "@/data/templates.json";

const templates = templatesData as DrupalTemplate[];

export function getAllTemplates(): DrupalTemplate[] {
  return templates;
}

export function getTemplateBySlug(slug: string): DrupalTemplate | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getTemplatesByVertical(
  vertical: TemplateVertical
): DrupalTemplate[] {
  return templates.filter((t) => t.vertical === vertical);
}

export function getAllSlugs(): string[] {
  return templates.map((t) => t.slug);
}
