import ProjectForm from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 px-6 py-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Admin
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          New Project
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Add a new project to your portfolio.
        </p>
      </header>

      <div className="px-6 py-8 md:px-10">
        <ProjectForm mode="create" />
      </div>
    </div>
  );
}