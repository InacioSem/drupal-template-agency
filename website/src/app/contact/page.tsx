import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL, GITHUB_ORG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with DrupalReady for custom templates, support, or questions.",
};

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question, need a custom template, or want to discuss a project?
          We&apos;d love to hear from you.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-primary" />
              <CardTitle className="mt-2">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For general inquiries, support questions, or custom template
                requests.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={cn(buttonVariants())}
              >
                {CONTACT_EMAIL}
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-primary" />
              <CardTitle className="mt-2">GitHub Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For technical questions, bug reports, and feature requests —
                join the conversation on GitHub.
              </p>
              <a
                href={`${GITHUB_ORG}/drupal-template-agency/discussions`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Open a Discussion
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 rounded-lg border bg-muted/30 p-8">
          <h2 className="text-xl font-semibold">Custom Template Development</h2>
          <p className="mt-2 text-muted-foreground">
            Need a template tailored to your industry, brand, or specific
            requirements? We offer custom template development services
            including:
          </p>
          <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
            <li>Custom content types and paragraph components</li>
            <li>Branded theme design and development</li>
            <li>Third-party integration configuration</li>
            <li>Migration assistance from existing Drupal sites</li>
            <li>Ongoing maintenance and security updates</li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            Email us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            to discuss your project.
          </p>
        </div>
      </div>
    </div>
  );
}
