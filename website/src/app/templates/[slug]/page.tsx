import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { InstallInstructions } from "@/components/templates/InstallInstructions";
import { CopyButton } from "@/components/shared/CopyButton";
import { getTemplateBySlug, getAllSlugs } from "@/lib/templates";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { softwareApplicationJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return {};

  return {
    title: `${template.name} — ${SITE_NAME}`,
    description: template.description,
    openGraph: {
      title: `${template.name} — Free Drupal 11 Template`,
      description: template.description,
      url: `${SITE_URL}/templates/${template.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.name} — Free Drupal 11 Template`,
      description: template.description,
    },
    alternates: {
      canonical: `${SITE_URL}/templates/${template.slug}`,
    },
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd(template)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Templates", href: "/templates" },
              { name: template.name, href: `/templates/${template.slug}` },
            ])
          ),
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/templates"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Templates
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{template.verticalLabel}</Badge>
                <Badge variant="outline">v{template.version}</Badge>
                <Badge variant="outline">Drupal {template.drupalVersion}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {template.name}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {template.description}
              </p>
            </div>

            {/* Screenshots */}
            {template.screenshots.length > 0 ? (
              <div className="mt-8 space-y-4">
                {/* Primary screenshot */}
                {template.screenshots.filter(s => s.isPrimary).map((screenshot) => (
                  <div key={screenshot.src} className="relative aspect-video rounded-lg border overflow-hidden">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                    />
                  </div>
                ))}
                {/* Gallery */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {template.screenshots.filter(s => !s.isPrimary).map((screenshot) => (
                    <div key={screenshot.src} className="relative aspect-video rounded-lg border overflow-hidden">
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-8 aspect-video rounded-lg border bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">
                  Template preview — screenshots coming soon
                </span>
              </div>
            )}

            {/* Tabs */}
            <Tabs defaultValue="features" className="mt-8">
              <TabsList>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
                <TabsTrigger value="content">Content Types</TabsTrigger>
                <TabsTrigger value="install">Installation</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {template.features.map((feature) => (
                    <div key={feature.title} className="rounded-lg border p-4">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="modules" className="mt-6">
                <div className="space-y-3">
                  {template.modules.map((mod) => (
                    <div
                      key={mod.name}
                      className="flex items-start justify-between rounded-lg border p-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{mod.humanName}</h3>
                          {mod.isCore && (
                            <Badge variant="secondary" className="text-xs">
                              Core
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {mod.description}
                        </p>
                      </div>
                      <a
                        href={mod.drupalOrgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground flex-shrink-0"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="content" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Content Types ({template.contentTypes.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {template.contentTypes.map((ct) => (
                        <Badge key={ct} variant="outline">
                          {ct}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Paragraph Types ({template.paragraphTypes.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {template.paragraphTypes.map((pt) => (
                        <Badge key={pt} variant="secondary">
                          {pt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Drupal Recipes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {template.recipes.map((r) => (
                        <Badge key={r} variant="outline">
                          {r}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="install" className="mt-6">
                <InstallInstructions template={template} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Install */}
              <div className="rounded-lg border p-6">
                <h3 className="font-semibold mb-3">Quick Install</h3>
                <div className="rounded-md bg-zinc-950 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs text-zinc-300 font-mono break-all">
                      {template.composerCommand}
                    </code>
                    <CopyButton text={template.composerCommand} />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={template.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants(), "w-full")}
                  >
                    View on GitHub
                  </a>
                  {template.demoUrl && (
                    <a
                      href={template.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="rounded-lg border p-6">
                <h3 className="font-semibold mb-3">Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Version</dt>
                    <dd className="font-medium">{template.version}</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Drupal</dt>
                    <dd className="font-medium">{template.drupalVersion}</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">PHP</dt>
                    <dd className="font-medium">{template.phpVersion}</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Theme</dt>
                    <dd className="font-medium">{template.theme.name}</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">License</dt>
                    <dd className="font-medium">GPL-2.0+</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Updated</dt>
                    <dd className="font-medium">{template.updatedAt}</dd>
                  </div>
                </dl>
              </div>

              {/* Theme Info */}
              <div className="rounded-lg border p-6">
                <h3 className="font-semibold mb-2">Theme</h3>
                <p className="text-sm text-muted-foreground">
                  {template.theme.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Base theme: {template.theme.baseTheme}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
