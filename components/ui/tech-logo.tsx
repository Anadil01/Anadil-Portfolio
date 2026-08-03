type TechLogoProps = {
  name: string;
  compact?: boolean;
};

const iconNames: Record<string, string> = {
  JavaScript: "javascript", Java: "java", SQL: "azuresqldatabase",
  "TypeScript (Basics)": "typescript", "React.js": "react", "Next.js": "nextjs",
  HTML5: "html5", CSS3: "css3", "Tailwind CSS": "tailwindcss", Bootstrap: "bootstrap",
  "Node.js": "nodejs", "Express.js": "express", "REST APIs": "fastapi",
  "JWT Authentication": "jsonwebtokens", "MVC Architecture": "dotnetcore", MongoDB: "mongodb",
  "MongoDB Atlas": "mongodb", PostgreSQL: "postgresql", "Socket.io": "socketio",
  "React Query": "reactquery", Zustand: "zustand", Cloudinary: "cloudinary", Vercel: "vercel",
  Render: "render", "Git & GitHub": "github", Postman: "postman", "Gemini API": "google",
  JWT: "jsonwebtokens", Axios: "axios", Cheerio: "cheerio", EJS: "nodejs",
  "Passport.js": "passport", "Mapbox API": "mapbox",
};

export default function TechLogo({ name, compact = false }: TechLogoProps) {
  const iconName = iconNames[name];
  const size = compact ? "h-4 w-4" : "h-5 w-5";

  if (!iconName) {
    return <span aria-hidden="true" className={`${size} inline-flex shrink-0 items-center justify-center rounded-full border border-current text-[9px] font-semibold text-accent`}>{name.slice(0, 1)}</span>;
  }

  // External Devicon SVGs are small decorative assets; using an img avoids
  // sending each icon through the Next image optimizer.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`} alt="" aria-hidden="true" className={`${size} shrink-0 object-contain`} loading="lazy" />;
}
