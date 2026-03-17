"use client";

import { useState } from "react";
import Link from "next/link";
import { LifeBuoy, CheckCircle, BookOpen, HelpCircle } from "lucide-react";

export default function SupportPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [ticketId, setTicketId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      category: (form.elements.namedItem("category") as HTMLSelectElement).value,
      priority: (form.elements.namedItem("priority") as HTMLSelectElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("success");
        setTicketId(result.ticketId);
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <LifeBuoy className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Support Center
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Need help with a template? Create a support ticket and our team will assist you.
          </p>
        </div>

        {/* Quick Help Links */}
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          <Link href="/kb" className="group rounded-2xl border bg-card p-6 card-hover">
            <BookOpen className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">Knowledge Base</h3>
            <p className="text-sm text-muted-foreground">Browse guides, tutorials, and how-to articles.</p>
          </Link>
          <Link href="/faq" className="group rounded-2xl border bg-card p-6 card-hover">
            <HelpCircle className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">FAQ</h3>
            <p className="text-sm text-muted-foreground">Quick answers to common questions.</p>
          </Link>
          <Link href="/docs" className="group rounded-2xl border bg-card p-6 card-hover">
            <BookOpen className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">Documentation</h3>
            <p className="text-sm text-muted-foreground">Installation, customization, and deployment guides.</p>
          </Link>
        </div>

        {/* Ticket Form */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border bg-card p-8">
            <h2 className="text-xl font-bold mb-2">Create a Support Ticket</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tickets are routed to <strong className="text-foreground">support@drupalready.dev</strong> and responded to within 24 hours.
            </p>

            {status === "success" ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Ticket Created!</h3>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-mono font-bold text-primary mb-4">
                  {ticketId}
                </div>
                <p className="text-muted-foreground">
                  We&apos;ve received your ticket and will respond within 24 hours.
                  <br />Save your ticket ID for reference.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-primary font-semibold hover:underline"
                >
                  Submit another ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    >
                      <option value="">Select a category</option>
                      <option value="installation">Installation Issue</option>
                      <option value="configuration">Configuration Help</option>
                      <option value="theming">Theme Customization</option>
                      <option value="modules">Module / Recipe Issue</option>
                      <option value="performance">Performance</option>
                      <option value="deployment">Deployment</option>
                      <option value="billing">Billing / Account</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium mb-1.5">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    >
                      <option value="low">Low — General question</option>
                      <option value="medium" selected>Medium — Need help soon</option>
                      <option value="high">High — Blocking my work</option>
                      <option value="urgent">Urgent — Production issue</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                    placeholder="Please describe the issue in detail. Include:&#10;- Which template you're using&#10;- Steps to reproduce the issue&#10;- Any error messages&#10;- Your environment (PHP version, hosting provider)"
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-8 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Submitting..." : "Submit Ticket"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
