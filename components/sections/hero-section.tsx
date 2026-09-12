import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import { connectToDatabase } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { portfolio } from "@/data/portfolio";

export default async function HeroSection() {
  /*
   * ------------------------------------------------------
   * PUBLIC PROFILE DATA
   * ------------------------------------------------------
   *
   * The admin panel saves profile changes to MongoDB.
   *
   * Previously this component always read:
   *
   *   data/portfolio.ts
   *
   * which meant the public portfolio never saw changes
   * made from /admin/profile.
   *
   * We now read the profile from MongoDB.
   *
   * The original portfolio data remains as a fallback so
   * the public site doesn't completely break if MongoDB
   * is temporarily unavailable.
   */

  let profile = portfolio.profile;

  try {
    await connectToDatabase();

    const databaseProfile = await Profile.findOne()
      .lean();

    if (databaseProfile) {
      profile = {
        name: databaseProfile.name,
        role: databaseProfile.role,
        location: databaseProfile.location,
        email: databaseProfile.email,
        availability:
          databaseProfile.availability,

        image: {
          src: databaseProfile.image?.src || "",
          alt:
            databaseProfile.image?.alt ||
            `Portrait of ${databaseProfile.name}`,
        },

        tagline: databaseProfile.tagline,
        bio: databaseProfile.bio,

        certifications:
          databaseProfile.certifications || [],

        socials:
          databaseProfile.socials || [],
      };
    }
  } catch (error) {
    console.error(
      "Failed to load public profile from MongoDB:",
      error
    );
  }

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-[#080808] pt-28 sm:pt-32 lg:pt-36"
    >
      {/* Ambient background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[30%] h-72 w-72 rounded-full bg-orange-600/[0.05] blur-[100px]"
      />

      <Container>
        <Reveal>
          <div className="relative min-h-[calc(100vh-9rem)] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d0d]">
            {/* Decorative grid */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "70px 70px",
              }}
            />

            {/* Orange glow behind image */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[45%] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-[100px] sm:h-[480px] sm:w-[480px]"
            />

            <div className="relative z-10 px-5 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10 lg:px-12 lg:pb-14">
              {/* TOP ROW */}

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-sm font-semibold text-orange-400">
                    A
                  </span>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                      {profile.name}
                    </p>

                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/30">
                      Full-Stack Developer
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                  <span className="max-w-[260px] truncate text-xs text-white/40">
                    {profile.availability}
                  </span>
                </div>
              </div>

              {/* HERO */}

              <div className="relative mt-10 lg:mt-14">
                {/* SMALL INTRO */}

                <div className="relative z-20 flex justify-center">
                  <span className="rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-xs text-white/60 backdrop-blur-xl">
                    Hello, I&apos;m{" "}
                    {profile.name.split(" ")[0]}
                    <span className="ml-2 text-orange-400">
                      ✦
                    </span>
                  </span>
                </div>

                {/* HUGE TITLE */}

                <div className="relative z-20 mt-5 text-center">
                  <h1 className="mx-auto max-w-6xl text-[clamp(3.6rem,11vw,10rem)] font-black leading-[0.82] tracking-[-0.07em] text-white">
                    <span className="block">
                      {profile.name.split(" ")[0]}
                      <span className="text-orange-500">
                        .
                      </span>
                    </span>

                    <span className="mt-2 block text-white/95">
                      FULL-STACK
                    </span>

                    <span className="block text-white/95">
                      DEVELOPER
                    </span>
                  </h1>
                </div>

                {/* PROFILE IMAGE */}

                <div className="relative mx-auto mt-[-10px] h-[390px] w-[300px] sm:mt-[-25px] sm:h-[500px] sm:w-[390px] lg:mt-[-55px] lg:h-[570px] lg:w-[450px]">
                  {/* Orange circle */}

                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full bg-orange-400"
                  />

                  {/* Circle border */}

                  <div
                    aria-hidden="true"
                    className="absolute bottom-[-8px] left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full border border-orange-300/20"
                  />

                  {/* Image */}

                  <div className="absolute inset-x-[7%] bottom-0 top-[5%] overflow-hidden">
                    {profile.image.src ? (
                      <Image
                        src={profile.image.src}
                        alt={profile.image.alt}
                        fill
                        priority
                        sizes="(max-width: 640px) 300px, (max-width: 1024px) 390px, 450px"
                        className="object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-center">
                        <div>
                          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-2xl font-bold text-orange-400">
                            A
                          </div>

                          <p className="mt-3 text-xs text-white/30">
                            Profile image
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Left floating card */}

                  <div className="absolute left-[-28px] top-[30%] hidden w-44 rounded-2xl border border-white/[0.12] bg-black/55 p-4 shadow-2xl backdrop-blur-xl sm:block lg:left-[-120px]">
                    <div className="text-2xl text-white/80">
                      “
                    </div>

                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Building thoughtful interfaces and dependable systems.
                    </p>

                    <div className="mt-3 h-px w-full bg-white/[0.08]" />

                    <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-orange-400">
                      Developer mindset
                    </p>
                  </div>

                  {/* Right experience card */}

                  <div className="absolute right-[-20px] top-[24%] hidden rounded-2xl border border-white/[0.12] bg-black/55 px-5 py-4 shadow-2xl backdrop-blur-xl sm:block lg:right-[-105px]">
                    <div className="flex items-center gap-1 text-orange-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>

                    <p className="mt-2 text-2xl font-bold text-white">
                      MERN
                    </p>

                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                      Full-stack ecosystem
                    </p>
                  </div>

                  {/* Bottom left capability */}

                  <div className="absolute bottom-[15%] left-[-5px] hidden rounded-full border border-white/[0.12] bg-black/60 px-4 py-2.5 text-xs text-white/65 backdrop-blur-xl sm:block lg:left-[-90px]">
                    React · Next.js
                  </div>

                  {/* Bottom right capability */}

                  <div className="absolute bottom-[10%] right-[-5px] hidden rounded-full border border-white/[0.12] bg-black/60 px-4 py-2.5 text-xs text-white/65 backdrop-blur-xl sm:block lg:right-[-80px]">
                    Node · MongoDB
                  </div>
                </div>

                {/* DESCRIPTION */}

                <div className="relative z-20 mx-auto mt-2 max-w-2xl text-center sm:mt-0">
                  <p className="text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                    {profile.tagline}
                  </p>
                </div>

                {/* ACTIONS */}

                <div className="relative z-20 mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/#projects"
                    className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
                  >
                    View projects

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </Link>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/75 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  >
                    Let&apos;s talk
                  </Link>
                </div>

                {/* BOTTOM INFO */}

                <div className="relative z-20 mt-10 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
                  <InfoCard
                    number="01"
                    title="BUILD"
                    description="Modern web applications"
                  />

                  <InfoCard
                    number="02"
                    title="SCALE"
                    description="Reliable backend systems"
                  />

                  <InfoCard
                    number="03"
                    title="SHIP"
                    description="Products people can use"
                  />
                </div>
              </div>
            </div>

            {/* Vertical side label */}

            <div className="absolute bottom-10 right-5 hidden [writing-mode:vertical-rl] lg:block">
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/20">
                Scroll to explore
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function InfoCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-xl transition duration-300 hover:border-orange-500/20 hover:bg-orange-500/[0.03]">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] text-orange-400">
          {number}
        </span>

        <span className="text-white/15 transition group-hover:text-orange-400/60">
          ↗
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-white">
        {title}
      </p>

      <p className="mt-1 text-xs text-white/30">
        {description}
      </p>
    </div>
  );
}