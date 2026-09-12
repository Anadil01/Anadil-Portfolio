import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function migratePortfolio() {
  // Import these AFTER dotenv loads the environment variables.
  const { connectToDatabase } = await import("../lib/mongodb");
  const { portfolio } = await import("../data/portfolio");

  const { default: Profile } = await import("../models/Profile");
  const { default: Project } = await import("../models/Project");
  const { default: Skill } = await import("../models/Skill");
  const { default: Experience } = await import("../models/Experience");
  const { default: Education } = await import("../models/Education");

  console.log("🚀 Starting portfolio migration...\n");

  // --------------------------------------------------
  // CONNECT TO DATABASE
  // --------------------------------------------------

  await connectToDatabase();

  console.log("✅ Connected to MongoDB\n");

  // --------------------------------------------------
  // 0. LEGACY PROJECT STATUS
  // --------------------------------------------------

  const archivedMigration = await Project.updateMany(
    { status: "archived" },
    { $set: { status: "draft" } }
  );

  console.log(
    `🔄 Migrated ${archivedMigration.modifiedCount} archived project(s) to draft.\n`
  );

  // --------------------------------------------------
  // 1. PROFILE
  // --------------------------------------------------

  console.log("👤 Migrating profile...");

  await Profile.findOneAndUpdate(
    {},
    {
      name: portfolio.profile.name,
      role: portfolio.profile.role,
      location: portfolio.profile.location,
      email: portfolio.profile.email,
      availability: portfolio.profile.availability,

      image: {
        src: portfolio.profile.image.src,
        alt: portfolio.profile.image.alt,
      },

      tagline: portfolio.profile.tagline,
      bio: portfolio.profile.bio,

      certifications: portfolio.certifications,

      socials: portfolio.socials,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  console.log("   ✓ Profile migrated");

  // --------------------------------------------------
  // 2. PROJECTS
  // --------------------------------------------------

  console.log("\n📁 Migrating projects...");

  for (const [index, project] of portfolio.projects.entries()) {
    await Project.findOneAndUpdate(
      {
        slug: project.slug,
      },
      {
        title: project.title,
        slug: project.slug,
        description: project.description,
        impact: project.impact,
        highlights: project.highlights,

        caseStudy: {
          challenge: project.caseStudy.challenge,
          solution: project.caseStudy.solution,
          result: project.caseStudy.result,
          screenshots: project.caseStudy.screenshots,
        },

        stack: project.stack,

        image: {
          src: project.image.src,
          alt: project.image.alt,
        },

        liveDemo: project.liveDemo,
        github: project.github,

        featured: index === 0,
        status: "published",
        order: index,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log(`   ✓ ${project.title}`);
  }

  // --------------------------------------------------
  // 3. SKILLS
  // --------------------------------------------------

  console.log("\n🛠️ Migrating skills...");

  let skillOrder = 0;

  for (const [category, skills] of Object.entries(portfolio.skills)) {
    for (const skillName of skills) {
      await Skill.findOneAndUpdate(
        {
          category,
          name: skillName,
        },
        {
          category,
          name: skillName,
          order: skillOrder++,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );

      console.log(`   ✓ ${category}: ${skillName}`);
    }
  }

  // --------------------------------------------------
  // 4. EXPERIENCE
  // --------------------------------------------------

  console.log("\n💼 Migrating experience...");

  for (const [index, experience] of portfolio.experience.entries()) {
    await Experience.findOneAndUpdate(
      {
        company: experience.company,
        role: experience.role,
      },
      {
        role: experience.role,
        company: experience.company,
        period: experience.period,
        points: experience.points,
        order: index,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log(
      `   ✓ ${experience.role} — ${experience.company}`
    );
  }

  // --------------------------------------------------
  // 5. EDUCATION
  // --------------------------------------------------

  console.log("\n🎓 Migrating education...");

  const educationPeriod = portfolio.education.period.split("-");

  await Education.findOneAndUpdate(
    {
      degree: portfolio.education.degree,
      institution: portfolio.education.school,
    },
    {
      degree: portfolio.education.degree,
      institution: portfolio.education.school,
      field: portfolio.education.specialization,
      startYear: educationPeriod[0],
      endYear: educationPeriod[1],
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  console.log("   ✓ Education migrated");

  // --------------------------------------------------
  // SUMMARY
  // --------------------------------------------------

  const profileCount = await Profile.countDocuments();
  const projectCount = await Project.countDocuments();
  const skillCount = await Skill.countDocuments();
  const experienceCount = await Experience.countDocuments();
  const educationCount = await Education.countDocuments();

  console.log("\n========================================");
  console.log("🎉 MIGRATION COMPLETE");
  console.log("========================================");

  console.log(`Profiles:     ${profileCount}`);
  console.log(`Projects:     ${projectCount}`);
  console.log(`Skills:       ${skillCount}`);
  console.log(`Experience:   ${experienceCount}`);
  console.log(`Education:    ${educationCount}`);

  console.log("========================================\n");

  process.exit(0);
}

migratePortfolio().catch((error) => {
  console.error("\n❌ Migration failed:");
  console.error(error);

  process.exit(1);
});