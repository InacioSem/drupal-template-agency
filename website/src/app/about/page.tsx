import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "DrupalForge provides production-ready Drupal 11 templates for agencies, governments, and nonprofits.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight">
          About {SITE_NAME}
        </h1>

        <div className="mt-8 space-y-6 text-muted-foreground leading-7">
          <p className="text-lg">
            {SITE_NAME} was born from a simple frustration: building Drupal sites
            takes too long. While WordPress developers can spin up a polished
            site in an afternoon, Drupal developers spend weeks configuring
            content types, views, paragraphs, and themes before they can show a
            client anything.
          </p>

          <p>
            We believe Drupal is the best CMS for complex, content-rich websites
            — but its power shouldn&apos;t come at the cost of productivity. {SITE_NAME}{" "}
            bridges this gap by providing production-ready templates that give
            you a running start.
          </p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">
            Our Mission
          </h2>
          <p>
            To make Drupal accessible, fast, and delightful to build with —
            without sacrificing the flexibility and power that makes it the
            enterprise CMS of choice.
          </p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">
            What We Provide
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong className="text-foreground">Free, open-source templates</strong> — complete
              Drupal 11 projects with content types, paragraphs, views, and
              custom themes
            </li>
            <li>
              <strong className="text-foreground">Composer-based distribution</strong> — install
              with a single command, just like any Drupal project
            </li>
            <li>
              <strong className="text-foreground">Drupal 11 Recipes</strong> — modular configuration
              you can mix and match
            </li>
            <li>
              <strong className="text-foreground">Professional support</strong> — custom template
              development, site setup, and ongoing maintenance
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground pt-4">
            Built for the Drupal Community
          </h2>
          <p>
            Every template is GPL-licensed, follows Drupal coding standards, and
            is designed to be extended and customized. We&apos;re not trying to
            replace the Drupal way — we&apos;re trying to accelerate it.
          </p>
          <p>
            Whether you&apos;re a freelancer delivering client sites, an agency
            scaling your output, or an enterprise team evaluating Drupal —{" "}
            {SITE_NAME} gives you a head start.
          </p>
        </div>

        <div className="mt-12 flex gap-4">
          <Link href="/templates" className={cn(buttonVariants())}>
            Browse Templates
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
