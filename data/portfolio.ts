export type SocialLink = {
  label: string;
  href: string;
};

export type Media = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  description: string;
  impact: string;
  stack: string[];
  image: Media;
  liveDemo?: string;
  github?: string;
};

export const portfolio = {
  profile: {
    name: "Anadil Gazi",
    role: "MERN Stack · Full-Stack Web Developer",
    location: "India",
    email: "mdanadil32@gmail.com",
    availability: "Open to full-time & freelance opportunities",
    resumeHref: "/Anadil_FullStack_Developer_Resume.pdf",
    image: {
      src: "/images/profile-photo.webp",
      alt: "Portrait of Anadil Gazi",
    },
    tagline:
      "Building scalable, secure, and real-time web applications with clean backend architecture and modern UI.",
    bio:
      "Passionate about solving real-world problems, from AI-powered platforms to real-time collaboration systems.",
  },
  skills: {
    Language: ["JavaScript", "Java", "SQL", "TypeScript (Basics)"],
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
      title: "AI Resume Analyzer Platform",
      description:
        "ATS scoring and resume improvement via Gemini API with secure authentication and a responsive dashboard.",
      impact:
        "Delivered an AI-assisted workflow that helps users quickly evaluate resume quality and improve interview readiness.",
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
      title: "CollabBoard - Real-Time Collaboration Platform",
      description:
        "Multi-user platform with live updates and real-time sync via Socket.io, plus React Query and Zustand for smooth state handling.",
      impact:
        "Created a synchronized collaboration experience optimized for instant updates and smooth multi-user interaction.",
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
      title: "HN Insight Hub - Hacker News Aggregator",
      description:
        "Scrapes top Hacker News stories with bookmarking, JWT-protected APIs, and a Cheerio-based scraper.",
      impact:
        "Turned scraped news data into a structured, bookmarkable reading experience with secure user flows.",
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
      title: "Vacation Rental Platform",
      description:
        "Rental platform with Mapbox geocoding, interactive maps, and role-based authentication using Passport.js.",
      impact:
        "Built a booking-style platform with location intelligence and secure owner controls for listing management.",
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
