"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

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

  const [highlightsText, setHighlightsText] =
    useState(
      (initialProject?.highlights || []).join("\n")
    );

  const [screenshotsText, setScreenshotsText] =
    useState(
      (initialProject?.caseStudy?.screenshots || [])
        .map((item) => `${item.src}|${item.alt}`)
        .join("\n")
    );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
    field:
      | "challenge"
      | "solution"
      | "result",
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

  function updateImage(
    field: "src" | "alt",
    value: string
  ) {
    setProject((current) => ({
      ...current,
      image: {
        ...current.image,
        [field]: value,
      },
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");

    const highlights = highlightsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const stack = stackText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const screenshots =
      screenshotsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [src, ...altParts] =
            line.split("|");

          return {
            src: src.trim(),
            alt:
              altParts.join("|").trim() ||
              project.title,
          };
        });

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
            "Failed to save project"
        );
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save project"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-5xl space-y-8"
    >
      {/* Basic */}

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold">
          Basic information
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field
            label="Title"
            value={project.title}
            onChange={(value) =>
              updateField("title", value)
            }
          />

          <Field
            label="Slug"
            value={project.slug}
            onChange={(value) =>
              updateField("slug", value)
            }
          />

          <div className="md:col-span-2">
            <TextArea
              label="Description"
              value={project.description}
              rows={4}
              onChange={(value) =>
                updateField(
                  "description",
                  value
                )
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

      {/* Stack + Highlights */}

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold">
          Technologies & highlights
        </h2>

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
            rows={6}
            onChange={setHighlightsText}
          />

          <p className="-mt-3 text-xs text-white/30">
            One highlight per line.
          </p>
        </div>
      </section>

      {/* Image */}

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold">
          Main image
        </h2>

        <div className="mt-6 space-y-5">
          <Field
            label="Image URL"
            value={project.image.src}
            onChange={(value) =>
              updateImage("src", value)
            }
          />

          <Field
            label="Alt text"
            value={project.image.alt}
            onChange={(value) =>
              updateImage("alt", value)
            }
          />

          {project.image.src && (
            <img
              src={project.image.src}
              alt={project.image.alt}
              className="h-48 w-full rounded-xl object-cover"
            />
          )}
        </div>
      </section>

      {/* Case study */}

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold">
          Case study
        </h2>

        <div className="mt-6 space-y-5">
          <TextArea
            label="Challenge"
            value={project.caseStudy.challenge}
            rows={4}
            onChange={(value) =>
              updateCaseStudy(
                "challenge",
                value
              )
            }
          />

          <TextArea
            label="Solution"
            value={project.caseStudy.solution}
            rows={4}
            onChange={(value) =>
              updateCaseStudy(
                "solution",
                value
              )
            }
          />

          <TextArea
            label="Result"
            value={project.caseStudy.result}
            rows={4}
            onChange={(value) =>
              updateCaseStudy(
                "result",
                value
              )
            }
          />

          <TextArea
            label="Screenshots"
            value={screenshotsText}
            rows={5}
            onChange={setScreenshotsText}
          />

          <p className="-mt-3 text-xs text-white/30">
            One screenshot per line:
            <br />
            image-url | alt text
          </p>
        </div>
      </section>

      {/* Links */}

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold">
          Links
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field
            label="Live demo URL"
            value={project.liveDemo || ""}
            onChange={(value) =>
              updateField(
                "liveDemo",
                value
              )
            }
          />

          <Field
            label="GitHub URL"
            value={project.github || ""}
            onChange={(value) =>
              updateField(
                "github",
                value
              )
            }
          />
        </div>
      </section>

      {/* Publishing */}

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold">
          Publishing
        </h2>

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
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
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

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Save */}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() =>
            router.push("/admin/projects")
          }
          className="rounded-xl border border-white/10 px-5 py-3 text-sm transition hover:bg-white/5"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : mode === "create"
              ? "Create project"
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}

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
        required={
          label === "Title" ||
          label === "Slug"
        }
        className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
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
        className="w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
      />
    </div>
  );
}