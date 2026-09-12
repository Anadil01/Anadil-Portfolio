import { notFound } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectForm from "@/components/admin/project-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: Props) {
  const { id } = await params;

  await connectToDatabase();

  const project = await Project.findById(id)
    .lean();

  if (!project) {
    notFound();
  }

  const serializedProject = {
    ...project,
    _id: project._id.toString(),
    status:
      project.status === "published"
        ? "published"
        : "draft",
    createdAt: undefined,
    updatedAt: undefined,
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 px-6 py-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Admin
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Edit Project
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Update {project.title}.
        </p>
      </header>

      <div className="px-6 py-8 md:px-10">
        <ProjectForm
          mode="edit"
          initialProject={JSON.parse(
            JSON.stringify(serializedProject)
          )}
        />
      </div>
    </div>
  );
}