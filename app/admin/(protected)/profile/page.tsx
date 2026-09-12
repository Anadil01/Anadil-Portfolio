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

  const [certificationsText, setCertificationsText] = useState("");
  const [socials, setSocials] = useState<
    { label: string; href: string }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --------------------------------------------------
  // LOAD PROFILE
  // --------------------------------------------------

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/admin/profile");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load profile");
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

  // --------------------------------------------------
  // UPDATE FIELD
  // --------------------------------------------------

  function updateField(
    field: keyof Profile,
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  // --------------------------------------------------
  // UPDATE IMAGE
  // --------------------------------------------------

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

  // --------------------------------------------------
  // SOCIALS
  // --------------------------------------------------

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
      current.filter((_, socialIndex) => socialIndex !== index)
    );
  }

  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

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

      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profile,
          certifications,
          socials,
        }),
      });

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

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-sm text-white/40">
          Loading profile...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen">
      {/* Header */}

      <header className="border-b border-white/10 px-6 py-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Admin
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Profile
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Manage the information displayed on your portfolio.
        </p>
      </header>

      {/* Content */}

      <div className="px-6 py-8 md:px-10">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-4xl space-y-8"
        >
          {/* Basic Information */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Basic information
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Your main portfolio identity.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Name"
                value={profile.name}
                onChange={(value) =>
                  updateField("name", value)
                }
              />

              <Field
                label="Role"
                value={profile.role}
                onChange={(value) =>
                  updateField("role", value)
                }
              />

              <Field
                label="Location"
                value={profile.location}
                onChange={(value) =>
                  updateField("location", value)
                }
              />

              <Field
                label="Email"
                type="email"
                value={profile.email}
                onChange={(value) =>
                  updateField("email", value)
                }
              />

              <div className="md:col-span-2">
                <Field
                  label="Availability"
                  value={profile.availability}
                  onChange={(value) =>
                    updateField("availability", value)
                  }
                />
              </div>
            </div>
          </section>

          {/* About */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                About
              </h2>

              <p className="mt-1 text-sm text-white/40">
                The messaging used throughout your portfolio.
              </p>
            </div>

            <div className="space-y-5">
              <Field
                label="Tagline"
                value={profile.tagline}
                onChange={(value) =>
                  updateField("tagline", value)
                }
              />

              <TextArea
                label="Bio"
                value={profile.bio}
                rows={6}
                onChange={(value) =>
                  updateField("bio", value)
                }
              />
            </div>
          </section>

          {/* Image */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Profile image
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Image URL for now. Image upload will be added later.
              </p>
            </div>

            <div className="space-y-5">
              <Field
                label="Image URL"
                value={profile.image.src}
                onChange={(value) =>
                  updateImage("src", value)
                }
              />

              <Field
                label="Alt text"
                value={profile.image.alt}
                onChange={(value) =>
                  updateImage("alt", value)
                }
              />

              {profile.image.src && (
                <div>
                  <p className="mb-2 text-sm text-white/50">
                    Preview
                  </p>

                  <img
                    src={profile.image.src}
                    alt={profile.image.alt}
                    className="h-32 w-32 rounded-2xl object-cover"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Certifications */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Certifications
              </h2>

              <p className="mt-1 text-sm text-white/40">
                One certification per line.
              </p>
            </div>

            <textarea
              value={certificationsText}
              onChange={(event) =>
                setCertificationsText(event.target.value)
              }
              rows={6}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
              placeholder="Full Stack Web Development (MERN) - Apna College"
            />
          </section>

          {/* Socials */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Social links
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Links displayed on your portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={addSocial}
                className="rounded-xl bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
              >
                + Add
              </button>
            </div>

            <div className="space-y-4">
              {socials.length === 0 && (
                <p className="text-sm text-white/30">
                  No social links added.
                </p>
              )}

              {socials.map((social, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-black p-4"
                >
                  <div className="grid gap-4 md:grid-cols-[180px_1fr_auto]">
                    <input
                      value={social.label}
                      onChange={(event) =>
                        updateSocial(
                          index,
                          "label",
                          event.target.value
                        )
                      }
                      placeholder="GitHub"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-orange-500"
                    />

                    <input
                      value={social.href}
                      onChange={(event) =>
                        updateSocial(
                          index,
                          "href",
                          event.target.value
                        )
                      }
                      placeholder="https://github.com/..."
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-orange-500"
                    />

                    <button
                      type="button"
                      onClick={() => removeSocial(index)}
                      className="rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Messages */}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {message}
            </div>
          )}

          {/* Save */}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --------------------------------------------------
// REUSABLE FIELD
// --------------------------------------------------

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/60">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
      />
    </div>
  );
}

// --------------------------------------------------
// REUSABLE TEXTAREA
// --------------------------------------------------

function TextArea({
  label,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/60">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={rows}
        className="w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
      />
    </div>
  );
}