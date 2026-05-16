import Container from "@/components/ui/container";
import { portfolio } from "@/data/portfolio";

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.08 1.82 2.82 1.29 3.5.99.11-.77.42-1.29.76-1.59-2.67-.3-5.48-1.31-5.48-5.86 0-1.29.47-2.35 1.23-3.18-.12-.3-.53-1.51.12-3.14 0 0 1-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.3-1.53 3.29-1.21 3.29-1.21.66 1.63.25 2.84.13 3.14.77.83 1.23 1.89 1.23 3.18 0 4.56-2.82 5.56-5.5 5.85.44.37.81 1.1.81 2.23v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1s2.5 1.12 2.5 2.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.19h.05c.53-1 1.84-2.19 3.79-2.19 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.86c0-1.88-.03-4.29-2.61-4.29-2.61 0-3.01 2.04-3.01 4.15V24h-4V8Z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[rgba(8,12,22,0.92)]">
      <Container className="flex flex-col gap-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>Built by Anadil Gazi</p>
        <div className="flex items-center gap-3">
          {portfolio.socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="rounded-full border border-border p-2 transition hover:border-accent hover:text-accent-strong"
            >
              {item.label === "GitHub" ? <GitHubIcon /> : <LinkedInIcon />}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
