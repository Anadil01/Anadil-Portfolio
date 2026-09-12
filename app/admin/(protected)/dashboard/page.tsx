import Link from "next/link";

const stats = [
  {
    label: "Projects",
    value: "4",
    href: "/admin/projects",
  },
  {
    label: "Skills",
    value: "26",
    href: "/admin/skills",
  },
  {
    label: "Experience",
    value: "1",
    href: "/admin/experience",
  },
  {
    label: "Education",
    value: "1",
    href: "/admin/education",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Welcome back.
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Manage your portfolio content from here.
        </p>
      </header>

      <div className="px-6 py-8 md:px-10">
        {/* Stats */}
        <section>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-orange-500/40 hover:bg-white/[0.05]"
              >
                <p className="text-sm text-white/40">
                  {stat.label}
                </p>

                <p className="mt-3 text-4xl font-bold">
                  {stat.value}
                </p>

                <p className="mt-4 text-xs text-orange-500 opacity-0 transition group-hover:opacity-100">
                  Manage →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold">
            Quick actions
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Link
              href="/admin/projects"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-orange-500/40"
            >
              <p className="font-medium">Manage Projects</p>

              <p className="mt-2 text-sm text-white/40">
                Add, edit, publish or archive portfolio projects.
              </p>
            </Link>

            <Link
              href="/admin/profile"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-orange-500/40"
            >
              <p className="font-medium">Edit Profile</p>

              <p className="mt-2 text-sm text-white/40">
                Update your name, bio, contact details and social links.
              </p>
            </Link>

            <Link
              href="/admin/resume"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-orange-500/40"
            >
              <p className="font-medium">Manage Resume</p>

              <p className="mt-2 text-sm text-white/40">
                Upload or replace your current resume.
              </p>
            </Link>
          </div>
        </section>

        {/* System status */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">
                System status
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Portfolio CMS is connected to MongoDB.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Connected
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}