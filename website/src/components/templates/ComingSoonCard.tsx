import { Stethoscope, Scale, Rocket, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ComingSoonTemplate } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Scale,
  Rocket,
};

export function ComingSoonCard({ template }: { template: ComingSoonTemplate }) {
  const Icon = iconMap[template.icon] || Rocket;

  return (
    <div className="relative rounded-2xl border border-dashed border-border/80 bg-muted/30 p-8 overflow-hidden group">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${template.color}, transparent 70%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
            style={{ backgroundColor: `${template.color}15`, color: template.color }}
          >
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant="outline" className="text-xs font-medium border-dashed">
            Coming Soon
          </Badge>
        </div>

        <h3 className="text-lg font-bold mb-1">{template.name}</h3>
        <p className="text-sm text-muted-foreground mb-5">{template.tagline}</p>

        <ul className="space-y-2">
          {template.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: template.color }}
              />
              {feature}
            </li>
          ))}
          {template.features.length > 4 && (
            <li className="text-xs text-muted-foreground/60 pl-3.5">
              +{template.features.length - 4} more features
            </li>
          )}
        </ul>

        <div className="mt-6 pt-4 border-t border-dashed border-border/50">
          <p className="text-xs text-muted-foreground/60">
            Interested in this template?{" "}
            <a href="/contact" className="text-primary hover:underline font-medium">
              Let us know
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
