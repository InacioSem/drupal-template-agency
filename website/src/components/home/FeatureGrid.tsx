import {
  Package,
  Zap,
  Shield,
  Blocks,
  Globe,
  ChefHat,
} from "lucide-react";

const features = [
  {
    title: "Composer Install",
    description:
      "Standard Drupal workflow. One command to scaffold a complete site with all dependencies.",
    icon: Package,
  },
  {
    title: "Drupal 11 Native",
    description:
      "Built exclusively for Drupal 11 with modern PHP 8.3+, Symfony components, and Twig templates.",
    icon: Zap,
  },
  {
    title: "Security First",
    description:
      "SecKit, Honeypot, and security best practices configured out of the box.",
    icon: Shield,
  },
  {
    title: "Layout Builder + Paragraphs",
    description:
      "Drag-and-drop page building with pre-built paragraph components for flexible content.",
    icon: Blocks,
  },
  {
    title: "SEO Ready",
    description:
      "Metatag, Pathauto, Simple Sitemap, and structured data configured from day one.",
    icon: Globe,
  },
  {
    title: "Drupal Recipes",
    description:
      "Modular recipes let you enable features independently — add a blog, portfolio, or commerce.",
    icon: ChefHat,
  },
];

export function FeatureGrid() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need, Nothing You Don&apos;t
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Each template includes battle-tested modules, sensible defaults, and
            a modern development workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border bg-background p-6">
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
