"use client";

import { useState } from "react";

type TechLogoProps = {
  name: string;
  compact?: boolean;
};

/*
 * Exact technology name -> Devicon icon name.
 *
 * Keep these names synchronized with data/portfolio.ts
 * and the MongoDB skill values.
 */
const iconNames: Record<string, string> = {
  JavaScript: "javascript",
  Java: "java",
  SQL: "azuresqldatabase",
  TypeScript: "typescript",

  "React.js": "react",
  "Next.js": "nextjs",
  HTML5: "html5",
  CSS3: "css3",
  "Tailwind CSS": "tailwindcss",
  Bootstrap: "bootstrap",

  "Node.js": "nodejs",
  "Express.js": "express",
  "REST APIs": "fastapi",
  "JWT Authentication": "jsonwebtokens",
  "MVC Architecture": "dotnetcore",

  MongoDB: "mongodb",
  "MongoDB Atlas": "mongodb",
  PostgreSQL: "postgresql",

  "Socket.io": "socketio",
  Zustand: "zustand",
  Vercel: "vercel",
  Render: "render",
  "Git & GitHub": "github",
  Postman: "postman",

  JWT: "jsonwebtokens",
  Axios: "axios",
  Cheerio: "cheerio",
  EJS: "nodejs",
  "Passport.js": "passport",
  "Mapbox API": "mapbox",

  "Gemini API": "google",
};

/*
 * A few technologies either don't have a reliable Devicon
 * path or have changed between icon releases.
 *
 * Simple Icons gives us a second source for those.
 */
const simpleIconNames: Record<string, string> = {
  "React Query": "reactquery",
  Cloudinary: "cloudinary",
  Zustand: "zustand",
  "Socket.io": "socketdotio",
  Vercel: "vercel",
  Render: "render",
  Postman: "postman",
  "Git & GitHub": "github",
  "Mapbox API": "mapbox",
  "Gemini API": "googlegemini",
};

/*
 * Some Devicon names have historically used slightly
 * different directory names.
 */
const deviconAliases: Record<string, string[]> = {
  socketio: [
    "socketio",
    "socketio-original",
  ],
};

export default function TechLogo({
  name,
  compact = false,
}: TechLogoProps) {
  const size = compact
    ? "h-4 w-4"
    : "h-5 w-5";

  const [sourceIndex, setSourceIndex] =
    useState(0);

  const deviconName = iconNames[name];
  const simpleIconName =
    simpleIconNames[name];

  /*
   * Build several possible sources.
   *
   * The first source is preferred.
   * If it fails, we automatically try the next one.
   */
  const sources: string[] = [];

  if (deviconName) {
    const aliases =
      deviconAliases[deviconName];

    if (aliases) {
      aliases.forEach((alias) => {
        sources.push(
          `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${deviconName}/${alias}.svg`
        );
      });
    } else {
      sources.push(
        `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${deviconName}/${deviconName}-original.svg`
      );
    }
  }

  if (simpleIconName) {
    sources.push(
      `https://cdn.simpleicons.org/${simpleIconName}`
    );
  }

  const currentSource =
    sources[sourceIndex];

  /*
   * No known icon:
   * render a clean fallback instead of a broken image.
   */
  if (!currentSource) {
    return (
      <FallbackIcon
        name={name}
        size={size}
      />
    );
  }

  return (
    <img
      src={currentSource}
      alt=""
      aria-hidden="true"
      className={`${size} shrink-0 object-contain`}
      loading="lazy"
      onError={() => {
        if (
          sourceIndex <
          sources.length - 1
        ) {
          setSourceIndex(
            (current) => current + 1
          );
        } else {
          setSourceIndex(
            sources.length
          );
        }
      }}
    />
  );
}

function FallbackIcon({
  name,
  size,
}: {
  name: string;
  size: string;
}) {
  const letters = name
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={`${size} inline-flex shrink-0 items-center justify-center rounded-md border border-orange-500/20 bg-orange-500/[0.06] text-[8px] font-bold tracking-tight text-orange-400`}
    >
      {letters || "?"}
    </span>
  );
}