import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Wrench, Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to install, customize, and deploy DrupalForge templates.",
};

const docs = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description:
      "Install your first DrupalForge template and get a Drupal 11 site running in minutes.",
    icon: BookOpen,
  },
  {
    slug: "customization",
    title: "Customization Guide",
    description:
      "Customize content types, paragraphs, themes, and configuration to match your project needs.",
    icon: Wrench,
  },
  {
    slug: "deployment",
    title: "Deployment Guide",
    description:
      "Deploy your DrupalForge site to Platform.sh, Pantheon, Acquia, or any hosting provider.",
    icon: Rocket,
  },
];

export default function DocsPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to install, customize, and deploy DrupalForge
          templates.
        </p>

        <div className="mt-12 grid gap-6">
          {docs.map((doc) => (
            <Link key={doc.slug} href={`/docs/${doc.slug}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-start gap-4">
                  <doc.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle>{doc.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {doc.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
