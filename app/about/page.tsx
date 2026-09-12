import HeroSection from "@/components/sections/hero-section";
import SiteShell from "@/components/layout/site-shell";

export default function About() {
  return (
    <SiteShell>
      <main className="flex-1">
        <HeroSection />
      </main>
    </SiteShell>
  );
}