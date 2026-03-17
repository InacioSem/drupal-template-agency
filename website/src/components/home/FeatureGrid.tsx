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
    color: "#3b82f6",
    bgLight: "bg-blue-500/10",
  },
  {
    title: "Drupal 11 Native",
    description:
      "Built exclusively for Drupal 11 with modern PHP 8.3+, Symfony components, and Twig templates.",
    icon: Zap,
    color: "#f59e0b",
    bgLight: "bg-amber-500/10",
  },
  {
    title: "Security First",
    description:
      "SecKit, Honeypot, and security best practices configured out of the box.",
    icon: Shield,
    color: "#10b981",
    bgLight: "bg-emerald-500/10",
  },
  {
    title: "Layout Builder + Paragraphs",
    description:
      "Drag-and-drop page building with pre-built paragraph components for flexible content.",
    icon: Blocks,
    color: "#8b5cf6",
    bgLight: "bg-violet-500/10",
  },
  {
    title: "SEO Ready",
    description:
      "Metatag, Pathauto, Simple Sitemap, and structured data configured from day one.",
    icon: Globe,
    color: "#ec4899",
    bgLight: "bg-pink-500/10",
  },
  {
    title: "Drupal Recipes",
    description:
      "Modular recipes let you enable features independently — add a blog, portfolio, or commerce.",
    icon: ChefHat,
    color: "#14b8a6",
    bgLight: "bg-teal-500/10",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need,{" "}
            <span className="text-gradient">nothing you don&apos;t</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Each template includes battle-tested modules, sensible defaults, and
            a modern development workflow.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border bg-card p-8 card-hover overflow-hidden"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgLight} mb-5`}>
                <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
              </div>

              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
