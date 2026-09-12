import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import { portfolio } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#080808] py-24 sm:py-32"
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/[0.035] blur-[140px]"
      />

      <Container>
        <div className="relative">
          {/* HEADER */}

          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-orange-500" />

                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-orange-400">
                    Experience
                  </p>
                </div>

                <h2 className="mt-5 text-[clamp(3rem,8vw,8rem)] font-black leading-[0.82] tracking-[-0.07em] text-white">
                  WORK
                  <br />
                  <span className="text-white/30">
                    HISTORY
                  </span>
                  <span className="text-orange-500">
                    .
                  </span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-white/40 lg:pb-2">
                Hands-on experience building full-stack
                products, secure APIs, real-time systems,
                and production deployments.
              </p>
            </div>
          </Reveal>

          {/* TIMELINE */}

          <div className="relative mt-14">
            {/* Vertical line */}

            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-orange-500/50 via-white/[0.08] to-transparent sm:left-[11px]"
            />

            <div className="space-y-8">
              {portfolio.experience.map(
                (item, index) => (
                  <Reveal
                    key={`${item.role}-${item.company}`}
                    className={`[transition-delay:${index * 120}ms]`}
                  >
                    <article className="relative pl-8 sm:pl-14">
                      {/* Timeline dot */}

                      <span className="absolute left-0 top-8 flex h-4 w-4 items-center justify-center rounded-full border border-orange-500/40 bg-[#080808] sm:h-6 sm:w-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 sm:h-2 sm:w-2" />
                      </span>

                      {/* EXPERIENCE CARD */}

                      <div className="group overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#101010] transition duration-500 hover:-translate-y-1 hover:border-orange-500/20">
                        {/* TOP */}

                        <div className="border-b border-white/[0.07] p-6 sm:p-8">
                          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange-400">
                                {String(
                                  index + 1
                                ).padStart(
                                  2,
                                  "0"
                                )}{" "}
                                / Experience
                              </p>

                              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                                {item.role}
                              </h3>

                              <p className="mt-2 text-sm text-white/40">
                                {item.company}
                              </p>
                            </div>

                            {/* PERIOD */}

                            <div className="shrink-0 md:text-right">
                              <p className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/55">
                                {item.period}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* ACHIEVEMENTS */}

                        <div className="grid gap-px bg-white/[0.06] md:grid-cols-2">
                          {item.points.map(
                            (point, pointIndex) => (
                              <div
                                key={point}
                                className="group/point bg-[#101010] p-5 transition duration-300 hover:bg-orange-500/[0.035] sm:p-6"
                              >
                                <div className="flex gap-4">
                                  <span className="font-mono text-[10px] text-orange-500/60">
                                    {String(
                                      pointIndex + 1
                                    ).padStart(
                                      2,
                                      "0"
                                    )}
                                  </span>

                                  <p className="text-sm leading-7 text-white/45 transition group-hover/point:text-white/70">
                                    {point}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        {/* BOTTOM */}

                        <div className="flex items-center justify-between border-t border-white/[0.07] px-6 py-4 sm:px-8">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                            Full-Stack Development
                          </span>

                          <span className="text-orange-500/40 transition duration-300 group-hover:text-orange-400">
                            ↗
                          </span>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}