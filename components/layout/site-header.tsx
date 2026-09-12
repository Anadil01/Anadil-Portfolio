"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

type SiteHeaderProfile = {
  name: string;
  role: string;
  availability: string;
};

type SiteHeaderProps = {
  profile: SiteHeaderProfile;
};

export default function SiteHeader({
  profile,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const firstName =
    profile.name.trim().split(" ")[0] ||
    profile.name;

  return (
    <>
      {/* =================================================
          DESKTOP / MOBILE HEADER
         ================================================= */}

      <header
        className={`fixed left-0 right-0 top-0 z-50 px-4 pt-4 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "pt-3"
            : "pt-4"
        }`}
      >
        <div
          className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border px-3 backdrop-blur-2xl transition-all duration-500 sm:h-[68px] sm:px-4 ${
            scrolled
              ? "border-white/[0.1] bg-[#0b0b0b]/85 shadow-2xl shadow-black/30"
              : "border-white/[0.07] bg-[#0b0b0b]/65"
          }`}
        >
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3 rounded-full px-3 py-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/[0.08] text-sm font-black text-orange-400 transition duration-300 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-black">
              A
            </span>

            <span className="hidden text-sm font-semibold tracking-[-0.01em] text-white sm:block">
              {profile.name}
            </span>
          </Link>

          {/* DESKTOP NAV */}

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-xs font-medium text-white/45 transition duration-300 hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* DESKTOP CTA */}

          <div className="hidden items-center gap-2 md:flex">
            <span className="flex max-w-[240px] items-center gap-2 truncate rounded-full border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-[10px] uppercase tracking-[0.16em] text-white/30">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" />

              Available
            </span>

            <Link
              href="/resume"
              className="rounded-full bg-orange-500 px-4 py-2.5 text-xs font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Resume ↗
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((open) => !open)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/70 transition hover:border-orange-500/30 hover:text-orange-400 md:hidden"
          >
            <span className="relative flex h-4 w-4 flex-col justify-center gap-1.5">
              <span
                className={`block h-px w-4 bg-current transition duration-300 ${
                  menuOpen
                    ? "translate-y-[3px] rotate-45"
                    : ""
                }`}
              />

              <span
                className={`block h-px w-4 bg-current transition duration-300 ${
                  menuOpen
                    ? "-translate-y-[3px] -rotate-45"
                    : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* =================================================
          MOBILE MENU
         ================================================= */}

      <div
        className={`fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-2xl transition duration-500 md:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col px-6 pb-10 pt-28">
          <div className="flex-1">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.28em] text-orange-400">
                {profile.name}
              </p>

              <p className="mt-2 text-sm text-white/30">
                {profile.role}
              </p>
            </div>

            <nav className="flex flex-col">
              {navItems.map(
                (item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between border-b border-white/[0.07] py-5"
                  >
                    <span className="text-3xl font-bold tracking-[-0.04em] text-white/70 transition group-hover:text-white">
                      {item.label}
                    </span>

                    <span className="font-mono text-[10px] text-white/20 transition group-hover:text-orange-400">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>
                  </Link>
                )
              )}
            </nav>
          </div>

          <div className="border-t border-white/[0.08] pt-6">
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                  Status
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm text-white/50">
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />

                  <span className="truncate">
                    {profile.availability ||
                      "Open to opportunities"}
                  </span>
                </p>
              </div>

              <Link
                href="/resume"
                onClick={closeMenu}
                className="shrink-0 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-black"
              >
                Resume ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}