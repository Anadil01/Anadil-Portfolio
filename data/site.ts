import { portfolio } from "@/data/portfolio";

export const siteConfig = {
  name: `${portfolio.profile.name} Portfolio`,
  title: `${portfolio.profile.name} | ${portfolio.profile.role}`,
  description: `${portfolio.profile.tagline} ${portfolio.profile.bio}`,
  email: portfolio.profile.email,
};
