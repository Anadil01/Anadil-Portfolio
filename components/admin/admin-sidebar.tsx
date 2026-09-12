"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "⌂",
  },
  {
    label: "Profile",
    href: "/admin/profile",
    icon: "◉",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: "▣",
  },
  {
    label: "Skills",
    href: "/admin/skills",
    icon: "✦",
  },
  {
    label: "Experience",
    href: "/admin/experience",
    icon: "◷",
  },
  {
    label: "Education",
    href: "/admin/education",
    icon: "◇",
  },
  {
    label: "Resume",
    href: "/admin/resume",
    icon: "▤",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/[0.08] bg-[#0c0c0c] lg:flex lg:flex-col">
      {/* Brand */}
      <div className="border-b border-white/[0.08] px-6 py-6">
        <Link
          href="/admin/dashboard"
          className="block"
        >
          <div className="text-xl font-bold tracking-tight text-white">
            Anadil<span className="text-orange-500">.</span>
          </div>

          <div className="mt-1 text-xs text-zinc-500">
            Portfolio Admin
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
          Manage
        </p>

        {navigation.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                active
                  ? "bg-orange-500 text-black"
                  : "text-zinc-500 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${
                  active
                    ? "bg-black/10"
                    : "bg-white/[0.04] group-hover:bg-white/[0.08]"
                }`}
              >
                {item.icon}
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/[0.08] p-4">
        <Link
          href="/"
          target="_blank"
          className="mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
        >
          <span>↗</span>
          View Portfolio
        </Link>

        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <span>↪</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}