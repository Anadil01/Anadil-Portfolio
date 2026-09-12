"use client";

import { FormEvent, useEffect, useState } from "react";

type Education = {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  description: string;
  order: number;
};

const emptyForm = {
  institution: "",
  degree: "",
  field: "",
  period: "",
  description: "",
  order: 1,
};

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadEducation() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/education");

      if (!response.ok) {
        throw new Error("Failed to load education");
      }

      const data = await response.json();

      setEducation(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load education");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEducation();
  }, []);

  function updateField(
    field: keyof typeof emptyForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]:
        field === "order"
          ? Number(value)
          : value,
    }));
  }

  function startEdit(item: Education) {
    setEditingId(item._id);

    setForm({
      institution: item.institution,
      degree: item.degree,
      field: item.field || "",
      period: item.period,
      description: item.description || "",
      order: item.order,
    });

    setMessage("");
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      ...emptyForm,
      order: education.length + 1,
    });

    setMessage("");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const url = editingId
        ? `/api/admin/education/${editingId}`
        : "/api/admin/education";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save education"
        );
      }

      setMessage(
        editingId
          ? "Education updated successfully."
          : "Education added successfully."
      );

      resetForm();

      await loadEducation();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteEducation(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education entry?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/education/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete education"
        );
      }

      setMessage("Education deleted successfully.");

      if (editingId === id) {
        resetForm();
      }

      await loadEducation();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to delete education."
      );
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-zinc-400">
          Loading education...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Education
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your academic background.
        </p>
      </div>

      {message && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
          {message}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[1fr_1.4fr]">
        {/* Form */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {editingId
                  ? "Edit Education"
                  : "Add Education"}
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {editingId
                  ? "Update this education entry."
                  : "Add a new academic entry."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Institution
              </label>

              <input
                value={form.institution}
                onChange={(event) =>
                  updateField(
                    "institution",
                    event.target.value
                  )
                }
                placeholder="Teerthanker Mahaveer University"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Degree
              </label>

              <input
                value={form.degree}
                onChange={(event) =>
                  updateField(
                    "degree",
                    event.target.value
                  )
                }
                placeholder="BCA"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Field / Specialization
              </label>

              <input
                value={form.field}
                onChange={(event) =>
                  updateField(
                    "field",
                    event.target.value
                  )
                }
                placeholder="Mobile Application & Web Technologies"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Period
              </label>

              <input
                value={form.period}
                onChange={(event) =>
                  updateField(
                    "period",
                    event.target.value
                  )
                }
                placeholder="2023 - 2026"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
                placeholder="Describe your studies, specialization, achievements, etc."
                rows={5}
                className="w-full resize-y rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Display Order
              </label>

              <input
                type="number"
                min="1"
                value={form.order}
                onChange={(event) =>
                  updateField(
                    "order",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Education"
                  : "Add Education"}
            </button>
          </form>
        </section>

        {/* Existing entries */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Education History
              </h2>

              <p className="text-sm text-zinc-500">
                {education.length}{" "}
                {education.length === 1
                  ? "entry"
                  : "entries"}
              </p>
            </div>
          </div>

          {education.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950 p-10 text-center">
              <p className="text-zinc-400">
                No education entries yet.
              </p>
            </div>
          ) : (
            education.map((item) => (
              <article
                key={item._id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">
                        {item.degree}
                      </h3>

                      <span className="rounded-full border border-zinc-700 px-2 py-1 text-xs text-zinc-400">
                        #{item.order}
                      </span>
                    </div>

                    <p className="mt-1 text-orange-400">
                      {item.institution}
                    </p>

                    {item.field && (
                      <p className="mt-1 text-sm text-zinc-400">
                        {item.field}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-zinc-500">
                      {item.period}
                    </p>

                    {item.description && (
                      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-zinc-400">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteEducation(item._id)
                      }
                      className="rounded-lg border border-red-900/60 px-4 py-2 text-sm text-red-400 transition hover:border-red-700 hover:bg-red-950/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}