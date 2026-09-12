export type SocialLink = {
  label: string;
  href: string;
};

export type Media = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  impact: string;
  highlights: string[];
  caseStudy: {
    challenge: string;
    solution: string;
    result: string;
    screenshots: Media[];
  };
  stack: string[];
  image: Media;
  liveDemo?: string;
  github?: string;
};

export const portfolio = {
  profile: {
    name: "Anadil Gazi",
    role: "MERN Stack · Full-Stack Developer",
    location: "India",
    email: "mdanadil32@gmail.com",
    availability: "Open to full-time roles and freelance work",
    image: {
      src: "/images/profile-photo.webp",
      alt: "Portrait of Anadil Gazi",
    },
    tagline:
      "Full-stack developer building secure, real-time web applications with React, Node.js, and MongoDB.",
    bio:
      "Passionate about solving real-world problems, from AI-powered platforms to real-time collaboration systems.",
  },
  skills: {
    Language: ["JavaScript", "Java", "SQL", "TypeScript"],
    Frontend: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
    Backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "MVC Architecture",
    ],
    Database: ["MongoDB", "MongoDB Atlas", "PostgreSQL"],
    Tools: [
      "Socket.io",
      "React Query",
      "Zustand",
      "Cloudinary",
      "Vercel",
      "Render",
      "Git & GitHub",
      "Postman",
    ],
  },
  projects: [
    {
      slug: "ai-resume-analyzer",
      title: "AI Resume Analyzer Platform",
      description:
        "ATS scoring and resume improvement via Gemini API with secure authentication and a responsive dashboard.",
      impact:
        "Delivered an AI-assisted workflow that helps users quickly evaluate resume quality and improve interview readiness.",
      highlights: [
        "Turns resume feedback into an ATS score and actionable improvement steps.",
        "Protects personal resume data with authenticated user flows.",
        "Connects Gemini API analysis to a responsive, end-to-end dashboard experience.",
      ],
      caseStudy: {
        challenge: "Job seekers need clear, practical feedback on whether a resume is likely to pass an ATS review, without turning the process into a manual editing exercise.",
        solution: "Built a secure dashboard that connects Gemini-powered analysis with ATS scoring and guided improvement suggestions in one responsive workflow.",
        result: "Users can move from an uploaded resume to structured feedback and targeted next steps through a single authenticated product experience.",
        screenshots: [{ src: "/images/project-placementpro.png", alt: "AI Resume Analyzer dashboard preview" }],
      },
      stack: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "Gemini API",
        "JWT",
        "Tailwind CSS",
      ],
      image: {
        src: "/images/project-placementpro.png",
        alt: "Preview card for AI Resume Analyzer Platform",
      },
      liveDemo: "https://placement-pro-kappa.vercel.app",
      github: "https://github.com/Anadil01/Placement-Pro",
    },
    {
      slug: "collabboard",
      title: "CollabBoard - Real-Time Collaboration Platform",
      description:
        "Multi-user platform with live updates and real-time sync via Socket.io, plus React Query and Zustand for smooth state handling.",
      impact:
        "Created a synchronized collaboration experience optimized for instant updates and smooth multi-user interaction.",
      highlights: [
        "Delivers live multi-user updates through Socket.io-powered synchronization.",
        "Keeps server and client state predictable with React Query and Zustand.",
        "Supports secure account access through protected application flows.",
      ],
      caseStudy: {
        challenge: "Collaborative workflows feel disconnected when people cannot see shared changes as they happen.",
        solution: "Combined Socket.io for live synchronization with React Query and Zustand to keep remote data and local interface state reliable.",
        result: "The platform provides a responsive multi-user collaboration flow with secure account access and live updates.",
        screenshots: [{ src: "/images/project-collabboard.png", alt: "CollabBoard collaboration interface preview" }],
      },
      stack: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "Socket.io",
        "React Query",
        "Zustand",
        "Tailwind CSS",
      ],
      image: {
        src: "/images/project-collabboard.png",
        alt: "Preview card for CollabBoard collaboration platform",
      },
      liveDemo: "https://collabboard-iota.vercel.app",
      github: "https://github.com/Anadil01/collabboard",
    },
    {
      slug: "hn-insight-hub",
      title: "HN Insight Hub - Hacker News Aggregator",
      description:
        "Scrapes top Hacker News stories with bookmarking, JWT-protected APIs, and a Cheerio-based scraper.",
      impact:
        "Turned scraped news data into a structured, bookmarkable reading experience with secure user flows.",
      highlights: [
        "Transforms top Hacker News stories into a structured, readable feed.",
        "Lets authenticated users save and revisit bookmarked stories.",
        "Combines Cheerio scraping with JWT-protected APIs for a complete data workflow.",
      ],
      caseStudy: {
        challenge: "Hacker News moves quickly, making it difficult to turn its best stories into a focused, personal reading workflow.",
        solution: "Created a Cheerio-based ingestion pipeline and JWT-protected APIs, then layered bookmarking over a structured React interface.",
        result: "Users can discover top stories in a cleaner feed and save the articles that matter to them for later.",
        screenshots: [{ src: "/images/project-hn-insight-hub.png", alt: "HN Insight Hub feed preview" }],
      },
      stack: [
        "MongoDB Atlas",
        "Express.js",
        "React.js",
        "Node.js",
        "JWT",
        "Axios",
        "Cheerio",
        "Tailwind CSS",
      ],
      image: {
        src: "/images/project-hn-insight-hub.png",
        alt: "Preview card for HN Insight Hub",
      },
      liveDemo: "https://hn-insight-hub.vercel.app",
      github: "https://github.com/Anadil01/hn-insight-hub",
    },
    {
      slug: "vacation-rental-platform",
      title: "Vacation Rental Platform",
      description:
        "Rental platform with Mapbox geocoding, interactive maps, and role-based authentication using Passport.js.",
      impact:
        "Built a booking-style platform with location intelligence and secure owner controls for listing management.",
      highlights: [
        "Adds location-aware listings through Mapbox geocoding and interactive maps.",
        "Separates owner controls from visitor access with role-aware authentication.",
        "Supports a complete listing workflow, from creation to discovery.",
      ],
      caseStudy: {
        challenge: "Rental discovery needs location context, while listing management requires clear permissions for owners and visitors.",
        solution: "Built a listing platform with Mapbox geocoding and maps, Passport.js authentication, and role-aware controls.",
        result: "The product supports a location-aware journey from browsing listings to managing properties through protected workflows.",
        screenshots: [{ src: "/images/vactional-rental-platform.png", alt: "Vacation rental platform listing preview" }],
      },
      stack: [
        "MongoDB",
        "Express.js",
        "Node.js",
        "EJS",
        "Passport.js",
        "Mapbox API",
        "Cloudinary",
        "Bootstrap",
      ],
      image: {
        src: "/images/vactional-rental-platform.png",
        alt: "Preview card for Vacation Rental Platform",
      },
      liveDemo: "https://stay-hub-nq4h.onrender.com/listings",
      github: "https://github.com/Anadil01/MajorProject",
    },
  ] satisfies Project[],
  experience: [
    {
      role: "Full-Stack Developer",
      company: "Freelance & Independent Projects",
      period: "Jan 2025 - Present",
      points: [
        "Built and deployed multiple production MERN stack applications.",
        "Designed secure REST APIs with JWT authentication and protected routes.",
        "Implemented real-time systems using Socket.io and WebSockets.",
        "Integrated third-party APIs and cloud workflows via Vercel and Render.",
      ],
    },
  ],
  education: {
    degree: "BCA",
    school: "Teerthanker Mahaveer University",
    specialization: "Mobile Application & Web Technologies",
    period: "2023-2026",
  },
  certifications: [
    "Full Stack Web Development (MERN) - Apna College",
    "Technology Job Simulation - Deloitte Australia (Forage)",
    "Programming in C - Infosys",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/Anadil01" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/anadil-gazi",
    },
  ] satisfies SocialLink[],
};
