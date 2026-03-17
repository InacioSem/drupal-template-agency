import { getAllTemplates } from "@/lib/templates";
import { TemplateCard } from "@/components/templates/TemplateCard";

export function TemplateShowcase() {
  const templates = getAllTemplates();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose Your Starting Point
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three production-ready templates, each tailored to a specific
            vertical. Install and start customizing in minutes.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}
