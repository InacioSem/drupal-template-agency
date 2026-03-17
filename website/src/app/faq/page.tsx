"use client";

import { useState } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronDown, Search } from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is DrupalReady?",
        a: "DrupalReady provides production-ready Drupal 11 templates for 20+ industries. Each template includes pre-configured content types, paragraph components, views, a custom theme, and Drupal Recipes — so you can launch a professional Drupal site in minutes instead of months.",
      },
      {
        q: "Do I need to know Drupal to use these templates?",
        a: "Basic Drupal knowledge is helpful, but our templates are designed to be beginner-friendly. Each includes a custom admin dashboard, guided tour, and contextual help text on every form. If you can use WordPress, you can use our templates.",
      },
      {
        q: "What are the system requirements?",
        a: "You need PHP 8.3 or higher, Composer 2.x, and a database (MySQL/MariaDB or PostgreSQL). For local development, we recommend Lando or DDEV. Node.js 20+ is needed for theme asset compilation.",
      },
      {
        q: "How do I install a template?",
        a: "Run a single Composer command: `composer create-project drupalready/starter-business my-site`. Then start your local environment with Lando, install Drupal, and apply the base recipe. Full instructions are in our Getting Started guide.",
      },
    ],
  },
  {
    category: "Templates & Customization",
    questions: [
      {
        q: "Can I customize the templates?",
        a: "Absolutely. Templates are designed to be customized. You can modify content types, add fields, change theme colors and typography, create new paragraph types, and extend functionality with additional Drupal modules. Everything follows Drupal coding standards.",
      },
      {
        q: "Can I use a template for a client project?",
        a: "Yes. All templates are GPL-2.0+ licensed, which means you can use them for client work, modify them, and distribute them. There are no restrictions on commercial use.",
      },
      {
        q: "What's included in each template?",
        a: "Each template includes: 7-8 content types, 10 paragraph components, pre-configured Views, a custom responsive theme, Drupal Recipes for modular setup, Gin admin theme, SEO configuration (Metatag, Pathauto, Sitemap), security modules (SecKit, Honeypot), and a custom admin dashboard.",
      },
      {
        q: "How are templates different from Drupal themes?",
        a: "Drupal themes only provide visual styling. Our templates are complete site packages — they include the theme PLUS content types, field configurations, views, paragraph types, recipes, admin customizations, and editor experience improvements. It's like getting a fully furnished house vs. just paint and wallpaper.",
      },
      {
        q: "Can I switch templates after starting?",
        a: "Templates are meant as starting points. Switching after you've added content would require migration. We recommend choosing the template closest to your needs and customizing from there.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "Which Drupal version do templates support?",
        a: "All templates are built for Drupal 11 exclusively. We use modern Drupal features including Recipes API, Layout Builder, and Single Directory Components.",
      },
      {
        q: "Do templates work with Layout Builder?",
        a: "Yes. Every template has Layout Builder pre-configured for all content types, especially Landing Pages. Editors can drag and drop sections, add paragraph components, and customize layouts without touching code.",
      },
      {
        q: "What about accessibility?",
        a: "Accessibility is built into every template. We include the editoria11y module for real-time content auditing, enforce alt text on all images, validate heading order, and target WCAG 2.2 AA compliance. The Government template targets AAA where feasible.",
      },
      {
        q: "Can I use these templates with a headless/decoupled setup?",
        a: "The templates are designed for traditional Drupal rendering, but since they use standard Drupal content architecture, you can expose the content via JSON:API or GraphQL for a headless frontend. We plan to offer headless variant recipes in a future update.",
      },
      {
        q: "How do I update a template after installing?",
        a: "Templates are installed as standalone Drupal projects, not as dependencies. To get updates, check our changelog and apply relevant changes manually. We provide update guides for major releases.",
      },
    ],
  },
  {
    category: "Pricing & Support",
    questions: [
      {
        q: "Are the templates really free?",
        a: "Yes. Every template is free, open source, and GPL-licensed. You can download, use, modify, and distribute them without any cost. We monetize through professional services — custom development, setup assistance, and maintenance plans.",
      },
      {
        q: "What support is available?",
        a: "Free users get community support via GitHub Discussions. Professional and Enterprise service clients get priority email support with 24-hour response times. You can also submit support tickets through our Support Center.",
      },
      {
        q: "Do you offer custom template development?",
        a: "Yes. If you need a template for a specific industry or with custom requirements, we offer custom development services. Contact us to discuss your project.",
      },
      {
        q: "Do you offer hosting?",
        a: "We don't offer hosting directly. Our templates work with any Drupal-compatible hosting provider including Platform.sh, Pantheon, Acquia, and traditional LAMP hosting. We provide deployment guides for each.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-5 text-sm text-muted-foreground leading-relaxed -mt-1">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");

  const filtered = search
    ? faqs
        .map((cat) => ({
          ...cat,
          questions: cat.questions.filter(
            (q) =>
              q.q.toLowerCase().includes(search.toLowerCase()) ||
              q.a.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((cat) => cat.questions.length > 0)
    : faqs;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Quick answers to the most common questions about DrupalReady.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-card pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {filtered.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-lg font-bold mb-1 text-primary">{cat.category}</h2>
              <div className="rounded-2xl border bg-card px-6">
                {cat.questions.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No questions match your search. Try different keywords or{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              contact us
            </Link>.
          </div>
        )}

        {/* Still need help */}
        <div className="mt-16 rounded-2xl border bg-muted/30 p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            Can&apos;t find what you&apos;re looking for? Our team is here to help.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-2.5 text-sm font-semibold text-white"
            >
              Contact Us
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
            >
              Open a Ticket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
