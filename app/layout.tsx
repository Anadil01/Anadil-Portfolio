import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://anadil.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Anadil | Full-Stack Developer",
    template: "%s | Anadil",
  },

  description:
    "Anadil is a Full-Stack Developer specializing in MERN stack, React, Node.js, MongoDB, and modern web applications.",

  applicationName: "Anadil Portfolio",

  keywords: [
    "Anadil",
    "Anadil developer",
    "Anadil Full Stack Developer",
    "Anadil MERN Stack Developer",
    "Anadil portfolio",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "JavaScript Developer",
    "TypeScript Developer",
  ],

  authors: [
    {
      name: "Anadil",
      url: siteUrl,
    },
  ],

  creator: "Anadil",
  publisher: "Anadil",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Anadil",
    title: "Anadil | Full-Stack Developer",
    description:
      "Portfolio of Anadil, a Full-Stack Developer specializing in MERN stack, React, Node.js, MongoDB, and modern web applications.",
    images: [
      {
        url: "/images/profile-photo.webp",
        width: 1200,
        height: 630,
        alt: "Anadil — Full-Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Anadil | Full-Stack Developer",
    description:
      "Anadil — Full-Stack Developer specializing in MERN stack, React, Node.js, MongoDB, and modern web applications.",
    images: ["/images/profile-photo.webp"],
  },

  category: "technology",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anadil",
  url: siteUrl,
  image: `${siteUrl}/images/profile-photo.webp`,
  jobTitle: "Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in MERN stack, React, Node.js, MongoDB, and modern web applications.",
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MERN Stack",
    "Full-Stack Development",
    "Web Development",
  ],
  sameAs: [
    "https://github.com/Anadil01",
    "https://www.linkedin.com/in/anadil-gazi/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Anadil",
  alternateName: "Anadil Portfolio",
  url: siteUrl,
  description:
    "Official portfolio website of Anadil, a Full-Stack Developer.",
  author: {
    "@type": "Person",
    name: "Anadil",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body className="min-h-full">{children}</body>
    </html>
  );
}