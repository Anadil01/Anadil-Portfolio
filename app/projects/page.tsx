import ProjectsSection from "@/components/sections/projects-section";
import SiteShell from "@/components/layout/site-shell";


export default function Projects() {
  return (
    <SiteShell>
    <main className="flex-1">
      <ProjectsSection standalone />
    </main>
    </SiteShell>
  );
}
