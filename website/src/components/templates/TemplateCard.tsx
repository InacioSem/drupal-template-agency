import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DrupalTemplate } from "@/types";

const verticalColors: Record<string, { gradient: string; badge: string }> = {
  "agency-business": {
    gradient: "from-blue-600/80 to-violet-600/80",
    badge: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  "government-education": {
    gradient: "from-amber-600/80 to-orange-600/80",
    badge: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
  "nonprofit-healthcare": {
    gradient: "from-emerald-600/80 to-teal-600/80",
    badge: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  "healthcare": {
    gradient: "from-cyan-600/80 to-teal-600/80",
    badge: "bg-cyan-500/10 text-cyan-700 border-cyan-200",
  },
  "legal": {
    gradient: "from-indigo-600/80 to-violet-600/80",
    badge: "bg-indigo-500/10 text-indigo-700 border-indigo-200",
  },
  "saas": {
    gradient: "from-amber-500/80 to-orange-500/80",
    badge: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
};

export function TemplateCard({ template }: { template: DrupalTemplate }) {
  const primaryScreenshot = template.screenshots.find((s) => s.isPrimary);
  const colors = verticalColors[template.vertical] || verticalColors["agency-business"];

  return (
    <Link href={`/templates/${template.slug}`} className="group block">
      <div className="relative rounded-2xl border border-border/50 bg-card overflow-hidden card-hover shadow-sm">
        {/* Image with gradient overlay */}
        <div className="relative aspect-video overflow-hidden">
          {primaryScreenshot ? (
            <>
              <Image
                src={primaryScreenshot.src}
                alt={primaryScreenshot.alt}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                colors.gradient
              )}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-lg">
                    View Template <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Preview coming soon</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge className={cn("border text-xs font-medium", colors.badge)} variant="outline">
              {template.verticalLabel}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Drupal {template.drupalVersion}
            </Badge>
          </div>

          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
            {template.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {template.tagline}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                {template.contentTypes.length} types
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                {template.paragraphTypes.length} paragraphs
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                {template.modules.length}+ modules
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}
