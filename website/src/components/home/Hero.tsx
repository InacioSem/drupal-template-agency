"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { CopyButton } from "@/components/shared/CopyButton";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const INSTALL_CMD = "composer create-project drupalforge/starter-business my-site";

const TYPING_TEXTS = [
  "in minutes, not months",
  "that clients love",
  "with zero boilerplate",
  "the modern way",
];

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_TEXTS[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIndex]);

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 sm:py-36">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-500/5 to-teal-500/5 blur-3xl animate-float-slow" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            Drupal 11 &middot; Composer &middot; Recipes API
          </div>
        </div>

        <h1 className="animate-slide-up-delay-1 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-white">
          Build Drupal sites
          <br />
          <span className="text-gradient bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="animate-slide-up-delay-2 mx-auto mt-8 max-w-2xl text-lg text-white/60 sm:text-xl leading-relaxed">
          Production-ready Drupal 11 templates for agencies, governments, and
          nonprofits. Pre-configured content types, paragraphs, views, and
          themes — install with a single Composer command.
        </p>

        <div className="animate-slide-up-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/templates"
            className={cn(
              "group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
            )}
          >
            Browse Templates
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
          >
            Read the Docs
          </Link>
        </div>

        <div className="mt-16 mx-auto max-w-2xl animate-slide-up-delay-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-white/30 font-mono">Terminal</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm font-mono">$</span>
                <code className="text-sm text-white/80 font-mono">
                  {INSTALL_CMD}
                </code>
              </div>
              <CopyButton text={INSTALL_CMD} />
            </div>
          </div>
          <p className="mt-3 text-xs text-white/30">
            Requires PHP 8.3+ and Composer 2.x
          </p>
        </div>
      </div>
    </section>
  );
}
