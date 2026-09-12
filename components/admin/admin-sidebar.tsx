"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type IconName =
  | "dashboard"
  | "profile"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "resume";

const navigation: {
  label: string;
  href: string;
  icon: IconName;
}[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "dashboard",
  },
  {
    label: "Profile",
    href: "/admin/profile",
    icon: "profile",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: "projects",
  },
  {
    label: "Skills",
    href: "/admin/skills",
    icon: "skills",
  },
  {
    label: "Experience",
    href: "/admin/experience",
    icon: "experience",
  },
  {
    label: "Education",
    href: "/admin/education",
    icon: "education",
  },
  {
    label: "Resume",
    href: "/admin/resume",
    icon: "resume",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
          ===================================================== */}

      <aside className="sticky top-0 hidden h-screen w-[272px] shrink-0 border-r border-white/[0.08] bg-[#0a0a0a] lg:flex lg:flex-col">
        {/* ===================================================
            BRAND
            =================================================== */}

        <div className="border-b border-white/[0.08] px-6 py-6">
          <Link
            href="/admin/dashboard"
            className="group block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 transition group-hover:border-orange-500/40 group-hover:bg-orange-500/15">
                <span className="text-lg font-black text-orange-500">
                  A
                </span>
              </div>

              <div>
                <div className="text-[17px] font-bold tracking-[-0.02em] text-white">
                  Anadil
                  <span className="text-orange-500">.</span>
                </div>

                <div className="mt-0.5 text-[11px] font-medium tracking-wide text-zinc-600">
                  PORTFOLIO ADMIN
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* ===================================================
            ADMIN STATUS
            =================================================== */}

        <div className="px-4 pt-5">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-white">
                  A
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a0a0a] bg-emerald-500" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-200">
                  Admin
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <span className="text-[11px] text-zinc-600">
                    System online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
            =================================================== */}

        <nav className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-700">
            Manage portfolio
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                    active
                      ? "bg-orange-500 text-black shadow-lg shadow-orange-500/10"
                      : "text-zinc-500 hover:bg-white/[0.045] hover:text-zinc-100"
                  }`}
                >
                  {/* Active indicator */}

                  {active && (
                    <span className="absolute -left-4 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-orange-500" />
                  )}

                  {/* Icon */}

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                      active
                        ? "bg-black/10"
                        : "bg-white/[0.035] text-zinc-600 group-hover:bg-white/[0.07] group-hover:text-zinc-300"
                    }`}
                  >
                    <AdminIcon
                      name={item.icon}
                      active={active}
                    />
                  </span>

                  {/* Label */}

                  <span className="text-[13px] font-medium">
                    {item.label}
                  </span>

                  {/* Active arrow */}

                  {active && (
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="ml-auto h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M7.5 4.5L13 10L7.5 15.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ===================================================
            BOTTOM ACTIONS
            =================================================== */}

        <div className="border-t border-white/[0.08] p-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700">
            Quick actions
          </p>

          {/* View portfolio */}

          <Link
            href="/"
            target="_blank"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-500 transition hover:bg-white/[0.045] hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.035] text-zinc-600 transition group-hover:bg-white/[0.07] group-hover:text-zinc-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M14 5H19V10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M19 5L12 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M19 14V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5H10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span>View portfolio</span>

            <span className="ml-auto text-xs text-zinc-700 transition group-hover:text-zinc-400">
              ↗
            </span>
          </Link>

          {/* Sign out */}

          <button
            type="button"
            onClick={logout}
            className="group mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-zinc-600 transition hover:bg-red-500/[0.07] hover:text-red-400"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.025] transition group-hover:bg-red-500/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M10 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M14 8L18 12L14 16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M18 12H10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span>Sign out</span>
          </button>

          {/* Version */}

          <div className="mt-4 px-3">
            <p className="text-[10px] text-zinc-800">
              Portfolio CMS
            </p>

            <p className="mt-0.5 text-[10px] text-zinc-800">
              v1.0
            </p>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MOBILE TOP BAR
          ===================================================== */}

      <div className="sticky top-0 z-40 flex border-b border-white/[0.08] bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-sm font-black text-orange-500">
              A
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Anadil<span className="text-orange-500">.</span>
              </p>

              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-600">
                Admin
              </p>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-400 transition hover:text-white"
          >
            View site ↗
          </Link>
        </div>
      </div>
    </>
  );
}

// ==========================================================
// ADMIN ICONS
// ==========================================================

function AdminIcon({
  name,
  active,
}: {
  name: IconName;
  active: boolean;
}) {
  const className = `h-4 w-4 ${
    active ? "text-black" : ""
  }`;

  if (name === "dashboard") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <rect
          x="4"
          y="4"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <rect
          x="14"
          y="4"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <rect
          x="4"
          y="14"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <rect
          x="14"
          y="14"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (name === "profile") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="8"
          r="3.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M5.5 19C6.2 15.8 8.4 14 12 14C15.6 14 17.8 15.8 18.5 19"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "projects") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <rect
          x="4"
          y="5"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M4 9H20"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M8 7H8.01M11 7H11.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "skills") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M12 3L13.9 9.1L20 11L13.9 12.9L12 19L10.1 12.9L4 11L10.1 9.1L12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="M18.5 4L19.1 5.9L21 6.5L19.1 7.1L18.5 9L17.9 7.1L16 6.5L17.9 5.9L18.5 4Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "experience") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <rect
          x="4"
          y="7"
          width="16"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M9 7V5.5C9 4.67 9.67 4 10.5 4H13.5C14.33 4 15 4.67 15 5.5V7"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M4 11H20"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M10 13H14"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "education") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M3.5 9.5L12 5L20.5 9.5L12 14L3.5 9.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path
          d="M7 12V16C8.4 17.5 10.1 18.25 12 18.25C13.9 18.25 15.6 17.5 17 16V12"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M20.5 10V15"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 4H14L18 8V20H7C5.9 20 5 19.1 5 18V6C5 4.9 5.9 4 7 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M14 4V8H18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M8.5 12H15.5M8.5 15H15.5M8.5 18H12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}