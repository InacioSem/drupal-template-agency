import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const docsContent: Record<
  string,
  { title: string; description: string; sections: { heading: string; content: string }[] }
> = {
  "getting-started": {
    title: "Getting Started",
    description: "Install your first DrupalForge template in minutes.",
    sections: [
      {
        heading: "Prerequisites",
        content:
          "Before you begin, make sure you have the following installed:\n\n- **PHP 8.3 or higher** with required extensions (gd, xml, mbstring, curl, zip)\n- **Composer 2.x** — the PHP dependency manager\n- **Lando** or **DDEV** — for local development environments\n- **Node.js 20+** — for theme asset compilation\n- **Git** — for version control",
      },
      {
        heading: "Step 1: Create Your Project",
        content:
          'Choose a template and create your project with Composer:\n\n```\n# For agency/business sites\ncomposer create-project drupalforge/starter-business my-site\n\n# For government/education sites\ncomposer create-project drupalforge/starter-government my-site\n\n# For nonprofit/healthcare sites\ncomposer create-project drupalforge/starter-nonprofit my-site\n```\n\nThis downloads Drupal 11, all required modules, the custom theme, and configuration.',
      },
      {
        heading: "Step 2: Start Local Development",
        content:
          "Navigate to your project and start the local environment:\n\n```\ncd my-site\nlando start\n```\n\nThis spins up PHP, MariaDB, and all required services. Your site will be available at the URL shown in the terminal output.",
      },
      {
        heading: "Step 3: Install Drupal",
        content:
          "Install Drupal with the exported configuration:\n\n```\nlando drush site:install --existing-config -y\n```\n\nThis creates the database, applies all configuration, and sets up the admin account.",
      },
      {
        heading: "Step 4: Apply Recipes",
        content:
          "Apply the base recipe to configure content types, views, and permissions:\n\n```\nlando drush recipe recipes/base\n```\n\nYou can also apply optional recipes for specific features like blog, portfolio, or commerce.",
      },
      {
        heading: "Next Steps",
        content:
          "Your site is now running! Log in at `/user/login` with the credentials shown in the terminal. From here you can:\n\n- Customize the theme in `web/themes/custom/`\n- Modify content types and fields via the Drupal admin UI\n- Read the **Customization Guide** for deeper changes\n- Read the **Deployment Guide** when you're ready to go live",
      },
    ],
  },
  customization: {
    title: "Customization Guide",
    description: "Tailor your DrupalForge template to match your project.",
    sections: [
      {
        heading: "Theme Customization",
        content:
          "Each template includes a custom theme in `web/themes/custom/drupalforge_{vertical}/`. The theme uses Stable9 as its base and includes:\n\n- **CSS** organized in `css/base/`, `css/components/`, and `css/layout/`\n- **Twig templates** in `templates/` for overriding markup\n- **JavaScript** in `js/` for interactive components\n- **Libraries** defined in `{theme}.libraries.yml`\n\nModify colors, typography, and spacing by editing the CSS files. Override any Drupal template by copying it to the appropriate `templates/` subdirectory.",
      },
      {
        heading: "Content Types",
        content:
          "Content types are pre-configured but fully editable via the Drupal admin UI:\n\n1. Go to **Structure > Content Types**\n2. Edit fields, display settings, and form layouts\n3. Export changes with `lando drush config:export`\n\nAll configuration is stored in `config/sync/` and can be tracked in Git.",
      },
      {
        heading: "Paragraph Types",
        content:
          "Paragraph types provide the flexible content components. Each paragraph type has:\n\n- **Fields** for content input\n- **Twig template** for rendering\n- **CSS styles** for visual design\n\nAdd new paragraph types via the Drupal admin, then create a matching Twig template and styles.",
      },
      {
        heading: "Recipes",
        content:
          "DrupalForge templates use Drupal Recipes for modular configuration. Each recipe is in the `recipes/` directory and can be applied independently.\n\nTo create a custom recipe, add a new directory under `recipes/` with a `recipe.yml` file defining the modules, configuration, and content to apply.",
      },
    ],
  },
  deployment: {
    title: "Deployment Guide",
    description: "Deploy your DrupalForge site to production.",
    sections: [
      {
        heading: "Preparing for Deployment",
        content:
          "Before deploying, ensure:\n\n1. All configuration is exported: `lando drush config:export`\n2. Config split is set up for environment-specific settings\n3. The `settings.php` file uses environment variables for database credentials\n4. Security modules (SecKit, Honeypot) are properly configured\n5. Caching is enabled: `lando drush cr`",
      },
      {
        heading: "Platform.sh",
        content:
          "Platform.sh has first-class Drupal support:\n\n1. Add `.platform.app.yaml` and `.platform/` config (templates coming soon)\n2. Connect your Git repository\n3. Push to deploy\n\nPlatform.sh handles PHP, database, Redis, and file storage automatically.",
      },
      {
        heading: "Pantheon",
        content:
          "For Pantheon hosting:\n\n1. Create a new Drupal site on Pantheon\n2. Clone the Pantheon repo and merge your DrupalForge project\n3. Push to the `master` branch to deploy to Dev\n4. Use the Pantheon dashboard to deploy to Test and Live",
      },
      {
        heading: "Traditional Hosting",
        content:
          "For traditional LAMP/LEMP hosting:\n\n1. Run `composer install --no-dev --optimize-autoloader`\n2. Upload the project to your server\n3. Point the web root to the `web/` directory\n4. Create the database and update `settings.php`\n5. Run `drush site:install --existing-config` or import the database\n6. Set up a cron job for `drush cron`",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(docsContent).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = docsContent[slug];
  if (!doc) return {};
  return { title: doc.title, description: doc.description };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docsContent[slug];

  if (!doc) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/docs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Docs
        </Link>

        <h1 className="text-4xl font-bold tracking-tight">{doc.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{doc.description}</p>

        <div className="mt-12 space-y-10">
          {doc.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-2xl font-semibold">{section.heading}</h2>
              <Separator className="my-4" />
              <div className="prose prose-zinc max-w-none">
                {section.content.split("\n\n").map((paragraph, j) => {
                  if (paragraph.startsWith("```")) {
                    const code = paragraph.replace(/```\n?/g, "").trim();
                    return (
                      <pre
                        key={j}
                        className="rounded-lg bg-zinc-950 p-4 text-sm text-zinc-300 font-mono overflow-x-auto my-4"
                      >
                        {code}
                      </pre>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <ul key={j} className="list-disc list-inside space-y-1 my-4 text-muted-foreground">
                        {paragraph.split("\n").map((item, k) => (
                          <li key={k} dangerouslySetInnerHTML={{ __html: item.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                        ))}
                      </ul>
                    );
                  }
                  if (/^\d+\./.test(paragraph)) {
                    return (
                      <ol key={j} className="list-decimal list-inside space-y-1 my-4 text-muted-foreground">
                        {paragraph.split("\n").map((item, k) => (
                          <li key={k} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`(.*?)`/g, "<code class='bg-muted px-1 py-0.5 rounded text-sm'>$1</code>") }} />
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p
                      key={j}
                      className="my-4 text-muted-foreground leading-7"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>")
                          .replace(/`(.*?)`/g, "<code class='bg-muted px-1 py-0.5 rounded text-sm'>$1</code>"),
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
