"use client";

import ImageUpload from "@/components/admin/image-upload";
import { FormEvent, useEffect, useState } from "react";

type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  availability: string;

  image: {
    src: string;
    alt: string;
  };

  tagline: string;
  bio: string;

  certifications: string[];

  socials: {
    label: string;
    href: string;
  }[];
};

const emptyProfile: Profile = {
  name: "",
  role: "",
  location: "",
  email: "",
  availability: "",

  image: {
    src: "",
    alt: "",
  },

  tagline: "",
  bio: "",

  certifications: [],

  socials: [],
};

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);

  const [certificationsText, setCertificationsText] =
    useState("");

  const [socials, setSocials] = useState<
    { label: string; href: string }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ======================================================
  // LOAD PROFILE
  // ======================================================

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/admin/profile");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile"
          );
        }

        setProfile(data.profile);

        setCertificationsText(
          (data.profile.certifications || []).join("\n")
        );

        setSocials(data.profile.socials || []);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  // ======================================================
  // UPDATE PROFILE FIELD
  // ======================================================

  function updateField(
    field: keyof Profile,
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  // ======================================================
  // UPDATE IMAGE
  // ======================================================

  function updateImage(
    field: "src" | "alt",
    value: string
  ) {
    setProfile((current) => ({
      ...current,

      image: {
        ...current.image,
        [field]: value,
      },
    }));
  }

  // ======================================================
  // SOCIAL LINKS
  // ======================================================

  function addSocial() {
    setSocials((current) => [
      ...current,
      {
        label: "",
        href: "",
      },
    ]);
  }

  function updateSocial(
    index: number,
    field: "label" | "href",
    value: string
  ) {
    setSocials((current) =>
      current.map((social, socialIndex) =>
        socialIndex === index
          ? {
              ...social,
              [field]: value,
            }
          : social
      )
    );
  }

  function removeSocial(index: number) {
    setSocials((current) =>
      current.filter(
        (_, socialIndex) => socialIndex !== index
      )
    );
  }

  // ======================================================
  // SAVE PROFILE
  // ======================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const certifications = certificationsText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const response = await fetch(
        "/api/admin/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...profile,
            certifications,
            socials,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile"
        );
      }

      setProfile(data.profile);

      setCertificationsText(
        (data.profile.certifications || []).join("\n")
      );

      setSocials(data.profile.socials || []);

      setMessage("Profile updated successfully.");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  }

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-orange-500" />

          <p className="text-sm text-zinc-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="min-h-screen pb-20">
      {/* ==================================================
          PAGE HEADER
          ================================================== */}

      <header className="mb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-orange-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
                Portfolio settings
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
              Profile
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
              Manage the information that appears across
              your public portfolio.
            </p>
          </div>

          <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 lg:block">
            <span className="text-xs text-zinc-500">
              Changes are saved to MongoDB
            </span>
          </div>
        </div>
      </header>

      {/* ==================================================
          STATUS MESSAGES
          ================================================== */}

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-5 py-4">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs text-red-400">
            !
          </div>

          <div>
            <p className="text-sm font-semibold text-red-300">
              Something went wrong
            </p>

            <p className="mt-1 text-sm text-red-400/80">
              {error}
            </p>
          </div>
        </div>
      )}

      {message && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] px-5 py-4">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">
            ✓
          </div>

          <p className="text-sm font-medium text-emerald-300">
            {message}
          </p>
        </div>
      )}

      {/* ==================================================
          FORM
          ================================================== */}

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-6xl space-y-6"
      >
        {/* ==================================================
            BASIC INFORMATION
            ================================================== */}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/20">
          <SectionHeader
            number="01"
            title="Basic information"
            description="Your main portfolio identity."
          />

          <div className="p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                label="Name"
                hint="Your professional name"
                value={profile.name}
                onChange={(value) =>
                  updateField("name", value)
                }
                placeholder="Anadil Gazi"
              />

              <Field
                label="Role"
                hint="Your primary professional title"
                value={profile.role}
                onChange={(value) =>
                  updateField("role", value)
                }
                placeholder="MERN Stack · Full-Stack Web Developer"
              />

              <Field
                label="Location"
                hint="Where you're based"
                value={profile.location}
                onChange={(value) =>
                  updateField("location", value)
                }
                placeholder="India"
              />

              <Field
                label="Email"
                hint="Public contact email"
                type="email"
                value={profile.email}
                onChange={(value) =>
                  updateField("email", value)
                }
                placeholder="you@example.com"
              />

              <div className="md:col-span-2">
                <Field
                  label="Availability"
                  hint="Shown to potential employers or clients"
                  value={profile.availability}
                  onChange={(value) =>
                    updateField(
                      "availability",
                      value
                    )
                  }
                  placeholder="Open to full-time roles and freelance work"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            ABOUT
            ================================================== */}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/20">
          <SectionHeader
            number="02"
            title="About"
            description="The messaging visitors see throughout your portfolio."
          />

          <div className="space-y-6 p-6 sm:p-8">
            <Field
              label="Tagline"
              hint="A short sentence that represents you"
              value={profile.tagline}
              onChange={(value) =>
                updateField("tagline", value)
              }
              placeholder="Building useful products with modern web technologies."
            />

            <TextArea
              label="Bio"
              hint="Your longer introduction"
              value={profile.bio}
              rows={7}
              onChange={(value) =>
                updateField("bio", value)
              }
              placeholder="Tell visitors about yourself, your experience, and what you build..."
            />
          </div>
        </section>

        {/* ==================================================
            PROFILE IMAGE
            ================================================== */}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/20">
          <SectionHeader
            number="03"
            title="Profile image"
            description="Upload and manage the image used on your portfolio."
          />

          <div className="p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
              {/* Upload */}

              <div>
                <ImageUpload
                  value={profile.image.src}
                  onChange={(url) =>
                    updateImage("src", url)
                  }
                  label="Profile photo"
                />

                <div className="mt-6 rounded-2xl border border-white/5 bg-black/30 p-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5 text-orange-500">
                      ●
                    </div>

                    <div>
                      <p className="text-sm font-medium text-zinc-300">
                        Image guidelines
                      </p>

                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        Use a clear professional photo.
                        JPG, PNG, WebP and AVIF are
                        supported up to 5MB.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alt text */}

              <div>
                <Field
                  label="Alt text"
                  hint="Accessibility description"
                  value={profile.image.alt}
                  onChange={(value) =>
                    updateImage("alt", value)
                  }
                  placeholder="Portrait of Anadil Gazi"
                />

                <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
                    Current image
                  </p>

                  <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black">
                    {profile.image.src ? (
                      <img
                        src={profile.image.src}
                        alt={
                          profile.image.alt ||
                          "Profile preview"
                        }
                        className="aspect-square w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center">
                        <span className="text-xs text-zinc-600">
                          No image
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            CERTIFICATIONS
            ================================================== */}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/20">
          <SectionHeader
            number="04"
            title="Certifications"
            description="Add one certification per line."
          />

          <div className="p-6 sm:p-8">
            <TextArea
              label="Certification list"
              hint="Each line becomes a separate certification"
              value={certificationsText}
              rows={7}
              onChange={setCertificationsText}
              placeholder={
                "Full Stack Web Development (MERN) - Apna College\nTechnology Job Simulation - Deloitte Australia (Forage)\nProgramming in C - Infosys"
              }
            />

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-zinc-600">
                {certificationsText
                  .split("\n")
                  .filter((item) => item.trim())
                  .length}{" "}
                certifications
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            SOCIAL LINKS
            ================================================== */}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/20">
          <SectionHeader
            number="05"
            title="Social links"
            description="Links displayed on your public portfolio."
          />

          <div className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-300">
                  Connected profiles
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  GitHub, LinkedIn, or any other professional
                  profile.
                </p>
              </div>

              <button
                type="button"
                onClick={addSocial}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-white"
              >
                <span className="text-lg leading-none">
                  +
                </span>

                Add social link
              </button>
            </div>

            {socials.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-12 text-center">
                <p className="text-sm font-medium text-zinc-400">
                  No social links yet
                </p>

                <p className="mt-2 text-xs text-zinc-600">
                  Add GitHub, LinkedIn, or another profile.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {socials.map((social, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                        Social {String(index + 1).padStart(2, "0")}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeSocial(index)
                        }
                        className="text-xs font-medium text-red-400/80 transition hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                      <Field
                        label="Label"
                        value={social.label}
                        onChange={(value) =>
                          updateSocial(
                            index,
                            "label",
                            value
                          )
                        }
                        placeholder="GitHub"
                      />

                      <Field
                        label="URL"
                        value={social.href}
                        onChange={(value) =>
                          updateSocial(
                            index,
                            "href",
                            value
                          )
                        }
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ==================================================
            SAVE BAR
            ================================================== */}

        <div className="sticky bottom-4 z-20">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#151515]/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-medium text-white">
                Ready to publish?
              </p>

              <p className="mt-0.5 text-xs text-zinc-500">
                Save your changes to update your portfolio.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-w-[150px] items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />

                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ========================================================
// SECTION HEADER
// ========================================================

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-orange-500/20 bg-orange-500/10">
        <span className="font-mono text-xs font-semibold text-orange-500">
          {number}
        </span>
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
}

// ========================================================
// INPUT FIELD
// ========================================================

function Field({
  label,
  hint,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <div className="mb-2.5">
        <label className="block text-sm font-medium text-zinc-200">
          {label}
        </label>

        {hint && (
          <p className="mt-1 text-xs text-zinc-600">
            {hint}
          </p>
        )}
      </div>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-sm text-white placeholder:text-zinc-700 outline-none transition duration-200 focus:border-orange-500/60 focus:bg-black focus:ring-4 focus:ring-orange-500/5"
      />
    </div>
  );
}

// ========================================================
// TEXTAREA
// ========================================================

function TextArea({
  label,
  hint,
  value,
  onChange,
  rows = 5,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <div className="mb-2.5">
        <label className="block text-sm font-medium text-zinc-200">
          {label}
        </label>

        {hint && (
          <p className="mt-1 text-xs text-zinc-600">
            {hint}
          </p>
        )}
      </div>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-sm leading-6 text-white placeholder:text-zinc-700 outline-none transition duration-200 focus:border-orange-500/60 focus:bg-black focus:ring-4 focus:ring-orange-500/5"
      />
    </div>
  );
}