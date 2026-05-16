"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import { navigationLinks } from "@/data/navigation";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sectionIds = navigationLinks.map((link) => link.sectionId);

    const updateActiveSection = () => {
      const current = sectionIds.findLast((id) => {
        const section = document.getElementById(id);

        if (!section) {
          return false;
        }

        const rect = section.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 140;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-[rgba(7,12,24,0.88)] backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/#about" className="min-w-0">
            <div className="font-mono text-sm uppercase tracking-[0.28em] text-accent">
              Anadil Gazi
            </div>
            <div className="truncate text-xs text-slate-400">
              MERN Stack / Full-Stack Web Developer
            </div>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-slate-200 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-2">
              {navigationLinks.map((link) => {
                const active = activeSection === link.sectionId;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        active
                          ? "border border-accent/40 bg-accent/10 font-medium text-accent-strong"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        {mobileOpen ? (
          <nav id="mobile-nav" aria-label="Mobile" className="pt-4 md:hidden">
            <ul className="space-y-2 rounded-2xl border border-border bg-surface p-3">
              {navigationLinks.map((link) => {
                const active = activeSection === link.sectionId;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 py-3 text-sm transition ${
                        active
                          ? "bg-accent/10 font-medium text-accent-strong"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
