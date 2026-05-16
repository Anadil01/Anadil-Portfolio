import type { Metadata } from "next";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
