import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { CopyButton } from "@/components/shared/CopyButton";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const INSTALL_CMD = "composer create-project drupalforge/starter-business my-site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm text-muted-foreground mb-6">
          Drupal 11 &middot; Composer &middot; Recipes API
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Build Drupal sites
          <br />
          <span className="text-primary">in minutes, not months</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Production-ready Drupal 11 templates for agencies, governments, and
          nonprofits. Pre-configured content types, paragraphs, views, and
          themes — install with a single Composer command.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/templates"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Browse Templates <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/docs/getting-started"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Read the Docs
          </Link>
        </div>

        <div className="mt-12 mx-auto max-w-2xl">
          <div className="rounded-lg border bg-zinc-950 p-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm font-mono">$</span>
                <code className="text-sm text-zinc-300 font-mono">
                  {INSTALL_CMD}
                </code>
              </div>
              <CopyButton text={INSTALL_CMD} />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Requires PHP 8.3+ and Composer 2.x
          </p>
        </div>
      </div>
    </section>
  );
}
