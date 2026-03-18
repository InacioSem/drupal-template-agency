"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { faqData } from "./faq-data";

const faqs = faqData;

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
