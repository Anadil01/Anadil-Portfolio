import Link from "next/link";

import Container from "@/components/ui/container";
import SiteShell from "@/components/layout/site-shell";

import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Resume | Anadil Gazi",
  description: "View and download Anadil Gazi's resume.",
};

export default async function ResumePage() {
  let resume = null;

  try {
    await connectToDatabase();

    resume = await Resume.findOne()
      .sort({ uploadedAt: -1 })
      .lean();
  } catch (error) {
    console.error("Failed to load public resume:", error);
  }

  return (
    <SiteShell>
      <main className="resume-page flex-1 pt-28 pb-16 sm:pt-32 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-6xl">

            {/* Top controls */}
            <div className="print-controls mb-7 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/"
                className="font-mono text-sm text-slate-400 transition hover:text-accent-strong"
              >
                ← Back to portfolio
              </Link>

              {resume && (
                <div className="flex flex-wrap gap-3">
                  <a
                    href={resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    Open Resume ↗
                  </a>

                  <a
                    href={resume.url}
                    download={resume.name}
                    className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
                  >
                    Download Resume ↓
                  </a>
                </div>
              )}
            </div>

            {resume ? (
              <section className="section-card overflow-hidden rounded-[2rem]">

                {/* Resume header */}
                <div className="flex flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-500">
                      Resume
                    </p>

                    <h1 className="mt-3 break-all text-2xl font-semibold text-white sm:text-3xl">
                      {resume.name}
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                      Latest uploaded resume ·{" "}
                      {new Date(resume.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <a
                    href={resume.url}
                    download={resume.name}
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-orange-400"
                  >
                    Download PDF ↓
                  </a>
                </div>

                {/* PDF viewer */}
                <div className="border-t border-white/10 bg-black/40 p-3 sm:p-5">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
                    <iframe
                      src={resume.url}
                      title="Anadil Gazi Resume"
                      className="h-[75vh] min-h-[700px] w-full"
                    />
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Want a copy of my resume?
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Download the latest uploaded PDF.
                    </p>
                  </div>

                  <a
                    href={resume.url}
                    download={resume.name}
                    className="inline-flex items-center justify-center rounded-full border border-orange-500/40 bg-orange-500/10 px-5 py-2.5 text-sm font-medium text-orange-400 transition hover:border-orange-500 hover:bg-orange-500/20"
                  >
                    Download PDF ↓
                  </a>
                </div>
              </section>
            ) : (
              <section className="section-card rounded-[2rem] px-6 py-20 text-center sm:px-10">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-500">
                  Resume
                </p>

                <h1 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
                  Resume currently unavailable
                </h1>

                <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-400">
                  A resume has not been uploaded yet. Please check back later.
                </p>

                <Link
                  href="/"
                  className="mt-8 inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
                >
                  Back to portfolio
                </Link>
              </section>
            )}
          </div>
        </Container>
      </main>
    </SiteShell>
  );
}