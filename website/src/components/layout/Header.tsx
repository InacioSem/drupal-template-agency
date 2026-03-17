"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Anvil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, SITE_NAME, GITHUB_ORG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-accent text-white transition-transform group-hover:scale-110">
            <Anvil className="h-4 w-4" />
          </div>
          <span className="font-extrabold tracking-tight">{SITE_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg transition-colors hover:text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={GITHUB_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg transition-colors hover:text-foreground hover:bg-muted"
          >
            GitHub
          </a>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:shadow-md hover:shadow-primary/25 hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" />}
            className="md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col gap-2 mt-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-lg font-medium rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/templates"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-accent px-5 py-3 text-base font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
