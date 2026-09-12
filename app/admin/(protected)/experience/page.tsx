"use client";

import { FormEvent, useEffect, useState } from "react";

type Experience = {
  _id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
  order: number;
};

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<
    Experience[]
  >([]);

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");
  const [pointsText, setPointsText] = useState("");
  const [order, setOrder] = useState("0");

  const [editingId, setEditingId] = useState<
    string | null
  >(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // --------------------------------------------------
  // LOAD
  // --------------------------------------------------

  async function loadExperience() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/experience"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load experience"
        );
      }

      setExperiences(data.experiences);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load experience"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExperience();
  }, []);

  // --------------------------------------------------
  // RESET
  // --------------------------------------------------

  function resetForm() {
    setRole("");
    setCompany("");
    setPeriod("");
    setPointsText("");
    setOrder("0");
    setEditingId(null);
  }

  // --------------------------------------------------
  // EDIT
  // --------------------------------------------------

  function startEdit(experience: Experience) {
    setEditingId(experience._id);

    setRole(experience.role);
    setCompany(experience.company);
    setPeriod(experience.period);

    setPointsText(
      experience.points.join("\n")
    );

    setOrder(String(experience.order));

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    const points = pointsText
      .split("\n")
      .map((point) => point.trim())
      .filter(Boolean);

    try {
      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `/api/admin/experience/${editingId}`
        : "/api/admin/experience";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          company,
          period,
          points,
          order: Number(order),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save experience"
        );
      }

      if (isEditing) {
        setExperiences((current) =>
          current.map((item) =>
            item._id === editingId
              ? data.experience
              : item
          )
        );

        setMessage(
          "Experience updated successfully."
        );
      } else {
        setExperiences((current) => [
          ...current,
          data.experience,
        ]);

        setMessage(
          "Experience created successfully."
        );
      }

      resetForm();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save experience"
      );
    } finally {
      setSaving(false);
    }
  }

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------

  async function deleteExperience(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/experience/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete experience"
        );
      }

      setExperiences((current) =>
        current.filter(
          (item) => item._id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete experience"
      );
    }
  }

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-sm text-white/40">
          Loading experience...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 px-6 py-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Admin
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Experience
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Manage your professional experience.
        </p>
      </header>

      <div className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* FORM */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                {editingId
                  ? "Edit experience"
                  : "Add experience"}
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Add a professional experience entry.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Role"
                  value={role}
                  onChange={setRole}
                  placeholder="Full-Stack Developer"
                />

                <Field
                  label="Company"
                  value={company}
                  onChange={setCompany}
                  placeholder="Freelance & Independent Projects"
                />

                <Field
                  label="Period"
                  value={period}
                  onChange={setPeriod}
                  placeholder="Jan 2025 - Present"
                />

                <Field
                  label="Display order"
                  type="number"
                  value={order}
                  onChange={setOrder}
                />
              </div>

              <TextArea
                label="Responsibilities / achievements"
                value={pointsText}
                rows={7}
                onChange={setPointsText}
              />

              <p className="-mt-3 text-xs text-white/30">
                One point per line.
              </p>

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

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save changes"
                      : "Add experience"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm hover:bg-white/5"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* EXPERIENCE LIST */}

          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                Experience history
              </h2>

              <p className="mt-1 text-sm text-white/40">
                {experiences.length} entries
              </p>
            </div>

            <div className="space-y-4">
              {experiences.map((experience) => (
                <article
                  key={experience._id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold">
                          {experience.role}
                        </h3>

                        <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
                          {experience.period}
                        </span>
                      </div>

                      <p className="mt-2 text-white/50">
                        {experience.company}
                      </p>

                      {experience.points.length > 0 && (
                        <ul className="mt-5 space-y-2">
                          {experience.points.map(
                            (point, index) => (
                              <li
                                key={index}
                                className="flex gap-3 text-sm text-white/60"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

                                <span>{point}</span>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          startEdit(experience)
                        }
                        className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteExperience(
                            experience._id
                          )
                        }
                        className="rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {experiences.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
                  <p className="text-white/40">
                    No experience entries yet.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
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
        placeholder={placeholder}
        required={
          label === "Role" ||
          label === "Company" ||
          label === "Period"
        }
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
        className="w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
      />
    </div>
  );
}