import type { Metadata } from "next";
import Link from "next/link";
import {
  Rocket, Palette, ChefHat, PenLine, Zap, Accessibility, Cloud, Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import articles from "@/data/kb-articles.json";

export const metadata: Metadata = {
  title: "Knowledge Base",
  description: "Guides, tutorials, and best practices for DrupalReady templates.",
};

const iconMap: Record<string, LucideIcon> = {
  Rocket, Palette, ChefHat, PenLine, Zap, Accessibility, Cloud, Shield,
};

const categories = [...new Set(articles.map((a) => a.category))];

export default function KBPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Knowledge Base
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Guides, tutorials, and best practices for building with DrupalReady
            templates.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-lg font-bold text-primary mb-4">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {articles
                  .filter((a) => a.category === category)
                  .map((article) => {
                    const Icon = iconMap[article.icon] || Rocket;
                    return (
                      <Link
                        key={article.slug}
                        href={`/kb/${article.slug}`}
                        className="group rounded-2xl border bg-card p-6 card-hover"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm group-hover:text-primary transition-colors mb-1">
                              {article.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {article.excerpt}
                            </p>
                            <span className="text-xs text-muted-foreground/60 mt-2 inline-block">
                              {article.readTime} read
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border bg-muted/30 p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Can&apos;t find what you need?</h2>
          <p className="text-muted-foreground mb-4">
            Check the FAQ or contact our support team.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/faq"
              className="inline-flex items-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
            >
              View FAQ
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center rounded-full bg-gradient-accent px-6 py-2.5 text-sm font-semibold text-white"
            >
              Get Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
