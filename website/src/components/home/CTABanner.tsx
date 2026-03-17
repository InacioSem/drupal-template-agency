import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CTABanner() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to build your next Drupal site?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Stop building from scratch. Pick a template, run one command, and
            start customizing for your client in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/templates"
              className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
            >
              Browse Templates <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/docs/getting-started"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              )}
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
