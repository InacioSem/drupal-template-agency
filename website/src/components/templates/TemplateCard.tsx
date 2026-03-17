import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import type { DrupalTemplate } from "@/types";

export function TemplateCard({ template }: { template: DrupalTemplate }) {
  const primaryScreenshot = template.screenshots.find((s) => s.isPrimary);

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-video bg-muted relative border-b overflow-hidden">
        {primaryScreenshot ? (
          <Image
            src={primaryScreenshot.src}
            alt={primaryScreenshot.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Preview coming soon</span>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{template.verticalLabel}</Badge>
          <Badge variant="outline">Drupal {template.drupalVersion}</Badge>
        </div>
        <CardTitle className="mt-2">{template.name}</CardTitle>
        <CardDescription>{template.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>{template.contentTypes.length} content types</span>
          <span>&middot;</span>
          <span>{template.paragraphTypes.length} paragraph types</span>
          <span>&middot;</span>
          <span>{template.modules.length}+ modules</span>
        </div>
        <Link
          href={`/templates/${template.slug}`}
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
