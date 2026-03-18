import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import articles from "@/data/kb-articles.json";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `${SITE_URL}/kb/${slug}`,
    },
  };
}

export default async function KBArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/kb"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Knowledge Base
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {article.readTime} read
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{article.excerpt}</p>
        </div>

        <Separator className="mb-10" />

        <div className="space-y-10">
          {article.content.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold mb-4">{section.heading}</h2>
              <div className="text-muted-foreground leading-relaxed">
                {section.body.split("\n\n").map((paragraph, j) => {
                  if (paragraph.startsWith("```")) {
                    const code = paragraph.replace(/```\n?/g, "").trim();
                    return (
                      <pre
                        key={j}
                        className="rounded-xl bg-zinc-950 p-4 text-sm text-zinc-300 font-mono overflow-x-auto my-4"
                      >
                        {code}
                      </pre>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <ul key={j} className="list-disc list-inside space-y-1.5 my-4">
                        {paragraph.split("\n").map((item, k) => (
                          <li
                            key={k}
                            dangerouslySetInnerHTML={{
                              __html: item
                                .replace(/^- /, "")
                                .replace(/`(.*?)`/g, "<code class='bg-muted px-1.5 py-0.5 rounded text-xs font-mono'>$1</code>"),
                            }}
                          />
                        ))}
                      </ul>
                    );
                  }
                  if (/^\d+\./.test(paragraph)) {
                    return (
                      <ol key={j} className="list-decimal list-inside space-y-1.5 my-4">
                        {paragraph.split("\n").map((item, k) => (
                          <li
                            key={k}
                            dangerouslySetInnerHTML={{
                              __html: item
                                .replace(/^\d+\.\s*/, "")
                                .replace(/`(.*?)`/g, "<code class='bg-muted px-1.5 py-0.5 rounded text-xs font-mono'>$1</code>"),
                            }}
                          />
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p
                      key={j}
                      className="my-4"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/`(.*?)`/g, "<code class='bg-muted px-1.5 py-0.5 rounded text-xs font-mono'>$1</code>"),
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Related Articles */}
        <Separator className="my-12" />
        <div>
          <h2 className="text-lg font-bold mb-4">Related Articles</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {articles
              .filter((a) => a.slug !== slug && a.category === article.category)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/kb/${related.slug}`}
                  className="rounded-xl border p-4 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold text-sm mb-1">{related.title}</h3>
                  <p className="text-xs text-muted-foreground">{related.readTime} read</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
