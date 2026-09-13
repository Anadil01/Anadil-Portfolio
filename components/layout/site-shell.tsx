import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";

import { portfolio } from "@/data/portfolio";
import { connectToDatabase } from "@/lib/mongodb";
import Profile from "@/models/Profile";

export default async function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  let profile = portfolio.profile;

  try {
    await connectToDatabase();

    const databaseProfile = await Profile.findOne().lean();

    if (databaseProfile) {
      profile = {
        ...portfolio.profile,
        name: databaseProfile.name,
        role: databaseProfile.role,
        location: databaseProfile.location,
        email: databaseProfile.email,
        availability: databaseProfile.availability,
        image: {
          src:
            databaseProfile.image?.src ||
            portfolio.profile.image.src,
          alt:
            databaseProfile.image?.alt ||
            portfolio.profile.image.alt,
        },
        tagline: databaseProfile.tagline,
        bio: databaseProfile.bio,
      };
    }
  } catch (error) {
    console.error("Failed to load public profile:", error);
  }

  return (
    <div className="site-theme flex min-h-screen flex-col">
      <SiteHeader
        profile={{
          name: profile.name,
          role: profile.role,
          availability: profile.availability,
        }}
      />

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}