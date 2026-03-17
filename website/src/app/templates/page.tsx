import type { Metadata } from "next";
import { getAllTemplates } from "@/lib/templates";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { ComingSoonCard } from "@/components/templates/ComingSoonCard";
import comingSoonData from "@/data/coming-soon.json";
import type { ComingSoonTemplate } from "@/types";

const comingSoon = comingSoonData as ComingSoonTemplate[];

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Browse production-ready Drupal 11 templates for agencies, governments, nonprofits, healthcare, legal, and SaaS.",
};

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Template Catalog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Each template is a complete Drupal 11 project with content types,
            paragraphs, views, theme, and configuration — ready to install via
            Composer.
          </p>
        </div>

        {/* Available Templates */}
        <div className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/60 mb-6">
            Available Now
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.slug} template={template} />
            ))}
          </div>
        </div>

        {/* Coming Soon Templates */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              More templates{" "}
              <span className="text-gradient">on the way</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              We&apos;re building templates for more industries. Tell us which
              one you need most.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((template) => (
              <ComingSoonCard key={template.slug} template={template} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl border bg-muted/30 p-10 text-center">
          <h2 className="text-xl font-bold">Need a template for a different industry?</h2>
          <p className="mt-2 text-muted-foreground">
            We build custom Drupal templates for any vertical. Tell us what you
            need.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-block text-primary font-semibold hover:underline"
          >
            Get in touch &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
