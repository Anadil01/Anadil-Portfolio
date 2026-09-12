import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function createAdmin() {
  const { connectToDatabase } = await import("../lib/mongodb");
  const { default: User } = await import("../models/User");
  const bcrypt = await import("bcryptjs");

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email) {
    throw new Error("ADMIN_EMAIL is missing from .env.local");
  }

  if (!password) {
    throw new Error("ADMIN_PASSWORD is missing from .env.local");
  }

  console.log("🔐 Creating admin user...\n");

  await connectToDatabase();

  console.log("✅ Connected to MongoDB");

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    console.log("\n⚠️ Admin user already exists.");
    console.log(`Email: ${existingUser.email}`);

    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await User.create({
    email: email.toLowerCase(),
    passwordHash,
    role: "admin",
  });

  console.log("\n========================================");
  console.log("🎉 ADMIN CREATED");
  console.log("========================================");
  console.log(`Email: ${email}`);
  console.log("Password: configured from .env.local");
  console.log("Role: admin");
  console.log("========================================\n");

  process.exit(0);
}

createAdmin().catch((error) => {
  console.error("\n❌ Failed to create admin:");
  console.error(error);

  process.exit(1);
});