import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-12 sm:p-20 text-center">
          {/* Animated decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl animate-float" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl animate-float-delayed" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
              <Rocket className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
              Ready to build your next
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Drupal site?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg text-white/60 leading-relaxed">
              Stop building from scratch. Pick a template, run one command, and
              start customizing for your client in minutes.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/templates"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
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
          </div>
        </div>
      </div>
    </section>
  );
}
