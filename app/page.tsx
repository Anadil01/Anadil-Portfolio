import ContactSection from "@/components/sections/contact-section";
import EducationSection from "@/components/sections/education-section";
import ExperienceSection from "@/components/sections/experience-section";
import HeroSection from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
