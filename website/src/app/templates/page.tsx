import type { Metadata } from "next";
import { getAllTemplates } from "@/lib/templates";
import { TemplateCard } from "@/components/templates/TemplateCard";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Browse production-ready Drupal 11 templates for agencies, governments, and nonprofits.",
};

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Template Catalog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Each template is a complete Drupal 11 project with content types,
            paragraphs, views, theme, and configuration — ready to install via
            Composer.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>

        <div className="mt-16 rounded-lg border bg-muted/30 p-8 text-center">
          <h2 className="text-xl font-semibold">Need a custom template?</h2>
          <p className="mt-2 text-muted-foreground">
            We offer custom template development and Drupal consulting services.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-block text-primary font-medium hover:underline"
          >
            Get in touch &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
