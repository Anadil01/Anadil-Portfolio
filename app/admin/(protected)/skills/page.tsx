"use client";

import { FormEvent, useEffect, useState } from "react";

type Skill = {
  _id: string;
  category: string;
  name: string;
  icon?: string;
  order: number;
};

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadSkills() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/skills"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load skills"
        );
      }

      setSkills(data.skills);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load skills"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSkills();
  }, []);

  function resetForm() {
    setCategory("");
    setName("");
    setIcon("");
    setEditingId(null);
    setError("");
  }

  function startEdit(skill: Skill) {
    setEditingId(skill._id);
    setCategory(skill.category);
    setName(skill.name);
    setIcon(skill.icon || "");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `/api/admin/skills/${editingId}`
        : "/api/admin/skills";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          name,
          icon,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save skill"
        );
      }

      if (isEditing) {
        setSkills((current) =>
          current.map((skill) =>
            skill._id === editingId
              ? data.skill
              : skill
          )
        );

        setMessage(
          "Skill updated successfully."
        );
      } else {
        setSkills((current) => [
          ...current,
          data.skill,
        ]);

        setMessage(
          "Skill created successfully."
        );
      }

      resetForm();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save skill"
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteSkill(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/skills/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete skill"
        );
      }

      setSkills((current) =>
        current.filter(
          (skill) => skill._id !== id
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
          : "Failed to delete skill"
      );
    }
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-sm text-white/40">
          Loading skills...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}

      <header className="border-b border-white/10 px-6 py-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Admin
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Skills
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Manage your technical skills.
        </p>
      </header>

      <div className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Form */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                {editingId
                  ? "Edit skill"
                  : "Add skill"}
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Add a skill and organize it by category.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-5 md:grid-cols-2"
            >
              <Field
                label="Category"
                value={category}
                onChange={setCategory}
                placeholder="Frontend"
              />

              <Field
                label="Skill name"
                value={name}
                onChange={setName}
                placeholder="React.js"
              />

              <div className="md:col-span-2">
                <Field
                  label="Icon"
                  value={icon}
                  onChange={setIcon}
                  placeholder="react"
                />

                <p className="mt-2 text-xs text-white/30">
                  Optional. We'll connect actual icon/image
                  support later.
                </p>
              </div>

              {error && (
                <div className="md:col-span-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {message && (
                <div className="md:col-span-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                  {message}
                </div>
              )}

              <div className="flex gap-3 md:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save changes"
                      : "Add skill"}
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

          {/* Skills */}

          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  All skills
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  {skills.length} skills
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(
                skills.reduce<
                  Record<string, Skill[]>
                >((groups, skill) => {
                  if (!groups[skill.category]) {
                    groups[skill.category] = [];
                  }

                  groups[skill.category].push(
                    skill
                  );

                  return groups;
                }, {})
              ).map(([categoryName, categorySkills]) => (
                <div
                  key={categoryName}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="font-semibold text-orange-500">
                    {categoryName}
                  </h3>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill._id}
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-black p-4"
                      >
                        <div>
                          <p className="font-medium">
                            {skill.name}
                          </p>

                          {skill.icon && (
                            <p className="mt-1 text-xs text-white/30">
                              {skill.icon}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() =>
                              startEdit(skill)
                            }
                            className="rounded-lg px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteSkill(
                                skill._id
                              )
                            }
                            className="rounded-lg px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/60">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={
          label === "Category" ||
          label === "Skill name"
        }
        className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-orange-500"
      />
    </div>
  );
}