"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import ImageUpload from "@/components/admin/image-upload";

type ProjectData = {
  _id?: string;

  title: string;
  slug: string;
  description: string;
  impact: string;

  highlights: string[];

  caseStudy: {
    challenge: string;
    solution: string;
    result: string;
    screenshots: {
      src: string;
      alt: string;
    }[];
  };

  stack: string[];

  image: {
    src: string;
    alt: string;
  };

  liveDemo?: string;
  github?: string;

  featured: boolean;
  status: "draft" | "published" | "archived";
  order: number;
};

const emptyProject: ProjectData = {
  title: "",
  slug: "",
  description: "",
  impact: "",

  highlights: [],

  caseStudy: {
    challenge: "",
    solution: "",
    result: "",
    screenshots: [],
  },

  stack: [],

  image: {
    src: "",
    alt: "",
  },

  liveDemo: "",
  github: "",

  featured: false,
  status: "draft",
  order: 0,
};

type Props = {
  initialProject?: ProjectData;
  mode: "create" | "edit";
};

export default function ProjectForm({
  initialProject,
  mode,
}: Props) {
  const router = useRouter();

  const [project, setProject] = useState<ProjectData>(
    initialProject || emptyProject
  );

  const [stackText, setStackText] = useState(
    (initialProject?.stack || []).join(", ")
  );

  const [highlightsText, setHighlightsText] = useState(
    (initialProject?.highlights || []).join("\n")
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(
    field: keyof ProjectData,
    value: string | boolean | number
  ) {
    setProject((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateCaseStudy(
    field: "challenge" | "solution" | "result",
    value: string
  ) {
    setProject((current) => ({
      ...current,
      caseStudy: {
        ...current.caseStudy,
        [field]: value,
      },
    }));
  }

  function updateImage(field: "src" | "alt", value: string) {
    setProject((current) => ({
      ...current,
      image: {
        ...current.image,
        [field]: value,
      },
    }));
  }

  function addScreenshot() {
    setProject((current) => ({
      ...current,
      caseStudy: {
        ...current.caseStudy,
        screenshots: [
          ...current.caseStudy.screenshots,
          {
            src: "",
            alt: "",
          },
        ],
      },
    }));
  }

  function updateScreenshot(
    index: number,
    field: "src" | "alt",
    value: string
  ) {
    setProject((current) => ({
      ...current,
      caseStudy: {
        ...current.caseStudy,
        screenshots: current.caseStudy.screenshots.map(
          (screenshot, screenshotIndex) =>
            screenshotIndex === index
              ? {
                  ...screenshot,
                  [field]: value,
                }
              : screenshot
        ),
      },
    }));
  }

  function removeScreenshot(index: number) {
    setProject((current) => ({
      ...current,
      caseStudy: {
        ...current.caseStudy,
        screenshots: current.caseStudy.screenshots.filter(
          (_, screenshotIndex) =>
            screenshotIndex !== index
        ),
      },
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const highlights = highlightsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const stack = stackText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const screenshots =
      project.caseStudy.screenshots.filter(
        (screenshot) => screenshot.src.trim()
      );

    const payload = {
      ...project,
      highlights,
      stack,
      caseStudy: {
        ...project.caseStudy,
        screenshots,
      },
    };

    try {
      const url =
        mode === "create"
          ? "/api/admin/projects"
          : `/api/admin/projects/${project._id}`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to save project."
        );
      }

      setSuccess(
        mode === "create"
          ? "Project created successfully."
          : "Project updated successfully."
      );

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save project."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-5xl space-y-8 pb-32"
    >
      {/* BASIC INFORMATION */}

      <section className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
            01
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Basic information
          </h2>

          <p className="mt-1 text-sm text-white/40">
            The core information visitors see about this project.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field
            label="Title"
            value={project.title}
            onChange={(value) =>
              updateField("title", value)
            }
            required
          />

          <Field
            label="Slug"
            value={project.slug}
            onChange={(value) =>
              updateField("slug", value)
            }
            required
          />

          <div className="md:col-span-2">
            <TextArea
              label="Description"
              value={project.description}
              rows={5}
              onChange={(value) =>
                updateField("description", value)
              }
            />
          </div>

          <div className="md:col-span-2">
            <TextArea
              label="Impact"
              value={project.impact}
              rows={3}
              onChange={(value) =>
                updateField("impact", value)
              }
            />
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}

      <section className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
            02
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Technologies & highlights
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Describe the technologies and strongest parts of the project.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <TextArea
            label="Tech stack"
            value={stackText}
            rows={2}
            onChange={setStackText}
          />

          <p className="-mt-3 text-xs text-white/30">
            Separate technologies with commas.
          </p>

          <TextArea
            label="Highlights"
            value={highlightsText}
            rows={7}
            onChange={setHighlightsText}
          />

          <p className="-mt-3 text-xs text-white/30">
            One highlight per line.
          </p>
        </div>
      </section>

      {/* MAIN IMAGE */}

      <section className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
            03
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Project image
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Upload the main image displayed on your portfolio.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <ImageUpload
            value={project.image.src}
            onChange={(value) =>
              updateImage("src", value)
            }
            label="Main project image"
          />

          <Field
            label="Alt text"
            value={project.image.alt}
            onChange={(value) =>
              updateImage("alt", value)
            }
          />
        </div>
      </section>

      {/* CASE STUDY */}

      <section className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
            04
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Case study
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Explain the problem, your approach, and the result.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <TextArea
            label="Challenge"
            value={project.caseStudy.challenge}
            rows={5}
            onChange={(value) =>
              updateCaseStudy("challenge", value)
            }
          />

          <TextArea
            label="Solution"
            value={project.caseStudy.solution}
            rows={5}
            onChange={(value) =>
              updateCaseStudy("solution", value)
            }
          />

          <TextArea
            label="Result"
            value={project.caseStudy.result}
            rows={5}
            onChange={(value) =>
              updateCaseStudy("result", value)
            }
          />
        </div>
      </section>

      {/* SCREENSHOTS */}

      <section className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
              05
            </p>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Project screenshots
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Add screenshots that can be shown on the project detail page.
            </p>
          </div>

          <button
            type="button"
            onClick={addScreenshot}
            className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2.5 text-sm font-medium text-orange-300 transition hover:border-orange-500/50 hover:bg-orange-500/15"
          >
            + Add screenshot
          </button>
        </div>

        {project.caseStudy.screenshots.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-black/20 px-5 py-10 text-center">
            <p className="text-sm text-white/40">
              No screenshots added yet.
            </p>

            <button
              type="button"
              onClick={addScreenshot}
              className="mt-3 text-sm text-orange-400 transition hover:text-orange-300"
            >
              Add your first screenshot
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {project.caseStudy.screenshots.map(
              (screenshot, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/[0.08] bg-black/20 p-5"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-medium text-white">
                      Screenshot {index + 1}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        removeScreenshot(index)
                      }
                      className="text-xs text-red-400 transition hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-5">
                    <ImageUpload
                      value={screenshot.src}
                      onChange={(value) =>
                        updateScreenshot(
                          index,
                          "src",
                          value
                        )
                      }
                      label={`Screenshot ${index + 1}`}
                    />

                    <Field
                      label="Alt text"
                      value={screenshot.alt}
                      onChange={(value) =>
                        updateScreenshot(
                          index,
                          "alt",
                          value
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* LINKS */}

      <section className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
            06
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Project links
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Add the live project and source repository.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field
            label="Live demo URL"
            value={project.liveDemo || ""}
            onChange={(value) =>
              updateField("liveDemo", value)
            }
          />

          <Field
            label="GitHub URL"
            value={project.github || ""}
            onChange={(value) =>
              updateField("github", value)
            }
          />
        </div>
      </section>

      {/* PUBLISHING */}

      <section className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
            07
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Publishing
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Control visibility and ordering on your portfolio.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white/60">
              Status
            </label>

            <select
              value={project.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
            >
              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>

              <option value="archived">
                Archived
              </option>
            </select>
          </div>

          <Field
            label="Display order"
            type="number"
            value={String(project.order)}
            onChange={(value) =>
              updateField(
                "order",
                Number(value)
              )
            }
          />
        </div>

        <label className="mt-6 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={project.featured}
            onChange={(event) =>
              updateField(
                "featured",
                event.target.checked
              )
            }
            className="h-4 w-4 accent-orange-500"
          />

          <span className="text-sm text-white/70">
            Featured project
          </span>
        </label>
      </section>

      {/* ERROR */}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {/* STICKY SAVE BAR */}

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[#0c0c0c]/95 px-5 py-4 backdrop-blur-xl lg:left-[290px]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              Ready to publish?
            </p>

            <p className="text-xs text-white/35">
              Save your changes to update your portfolio.
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                router.push("/admin/projects")
              }
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : mode === "create"
                  ? "Create project"
                  : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
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
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-orange-500"
      />
    </div>
  );
}

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
        className="w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-orange-500"
      />
    </div>
  );
}