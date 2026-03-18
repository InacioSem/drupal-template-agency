import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "DrupalReady templates are free and open source. Premium support and custom development available.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
};

const tiers = [
  {
    name: "Community",
    price: "Free",
    description: "All templates, forever free and open source.",
    features: [
      "All 3 starter templates",
      "Composer installation",
      "Drupal Recipes included",
      "Full source code (GPL-2.0+)",
      "GitHub issue support",
      "Community discussions",
    ],
    cta: "Browse Templates",
    href: "/templates",
    highlighted: false,
  },
  {
    name: "Professional Setup",
    price: "Custom",
    description: "We set up and customize a template for your project.",
    features: [
      "Everything in Community",
      "Template installation on your hosting",
      "Theme customization (colors, fonts, logo)",
      "Content type modifications",
      "Up to 5 custom paragraph types",
      "2 hours of training",
      "30 days of email support",
    ],
    cta: "Contact Us",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full custom template development and ongoing support.",
    features: [
      "Everything in Professional",
      "Custom template from scratch",
      "Bespoke theme design",
      "Third-party integrations",
      "Content migration assistance",
      "Ongoing maintenance plan",
      "Priority email & video support",
      "SLA-backed response times",
    ],
    cta: "Contact Us",
    href: "/contact",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Templates are free.
            <br />
            <span className="text-muted-foreground">Support is optional.</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Every DrupalReady template is free, open source, and GPL-licensed.
            If you need help setting up, customizing, or maintaining your site —
            we&apos;re here.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col ${
                tier.highlighted ? "border-primary shadow-lg" : ""
              }`}
            >
              <CardHeader>
                {tier.highlighted && (
                  <Badge className="w-fit mb-2">Most Popular</Badge>
                )}
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="text-3xl font-bold">{tier.price}</div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={cn(
                    buttonVariants({
                      variant: tier.highlighted ? "default" : "outline",
                    }),
                    "w-full"
                  )}
                >
                  {tier.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-16" />

        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Questions about pricing?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Every project is different. Email us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            and we&apos;ll put together a custom quote.
          </p>
        </div>
      </div>
    </div>
  );
}
