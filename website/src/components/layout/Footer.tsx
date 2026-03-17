import Link from "next/link";
import { Anvil } from "lucide-react";
import { SITE_NAME, GITHUB_ORG, CONTACT_EMAIL } from "@/lib/constants";

const footerLinks = {
  Templates: [
    { label: "Starter Business", href: "/templates/starter-business" },
    { label: "Starter Government", href: "/templates/starter-government" },
    { label: "Starter Nonprofit", href: "/templates/starter-nonprofit" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Knowledge Base", href: "/kb" },
    { label: "FAQ", href: "/faq" },
    { label: "Support", href: "/support" },
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
    <footer className="relative overflow-hidden border-t bg-gradient-hero text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
                <Anvil className="h-4 w-4" />
              </div>
              <span className="font-extrabold">{SITE_NAME}</span>
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              Production-ready Drupal 11 templates.
              <br />Install in 60 seconds.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built for the Drupal community.
          </p>
        </div>
      </div>
    </footer>
  );
}
