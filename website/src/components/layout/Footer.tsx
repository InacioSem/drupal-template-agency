import Link from "next/link";
import { Anvil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SITE_NAME, GITHUB_ORG, CONTACT_EMAIL } from "@/lib/constants";

const footerLinks = {
  Templates: [
    { label: "Starter Business", href: "/templates/starter-business" },
    { label: "Starter Government", href: "/templates/starter-government" },
    { label: "Starter Nonprofit", href: "/templates/starter-nonprofit" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Getting Started", href: "/docs/getting-started" },
    { label: "Customization", href: "/docs/customization" },
    { label: "Deployment", href: "/docs/deployment" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "GitHub", href: GITHUB_ORG },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Anvil className="h-5 w-5 text-primary" />
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Production-ready Drupal 11 templates. Install in 60 seconds.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 inline-block text-sm text-muted-foreground hover:text-foreground"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for the Drupal community.
          </p>
        </div>
      </div>
    </footer>
  );
}
