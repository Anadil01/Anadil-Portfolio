import ContactSection from "@/components/sections/contact-section";
import SiteShell from "@/components/layout/site-shell";

export default function Contact() {
  return (
    <SiteShell>
    <main className="flex-1">
      <ContactSection standalone />
    </main>
     </SiteShell>
  );
}
