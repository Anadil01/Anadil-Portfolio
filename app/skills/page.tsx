import SkillsSection from "@/components/sections/skills-section";
import SiteShell from "@/components/layout/site-shell";


export default function SkillsPage() {
  return (
     <SiteShell>
    <main className="flex-1">
      <SkillsSection />
    </main>
    </SiteShell>
  );
}
