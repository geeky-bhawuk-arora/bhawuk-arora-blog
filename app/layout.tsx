import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "Bhawuk — Developer Blog",
    template: "%s | Bhawuk",
  },
  description:
    "Thoughts on code, AI, design, career, and the craft of building software. Written by Bhawuk.",
  keywords: ["developer", "blog", "typescript", "nextjs", "AI", "design"],
  authors: [{ name: "Bhawuk" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <Navbar />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}

/* Server-safe footer — NO event handlers, NO client hooks */
function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "2.5rem 2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: "1.9rem",
              height: "1.9rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg,#6366f1,#a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.6rem",
              fontWeight: 700,
              color: "white",
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "-0.02em",
              flexShrink: 0,
            }}
          >
            BK
          </div>
          <span
            style={{
              fontSize: "0.8rem",
              fontFamily: "JetBrains Mono, monospace",
              color: "var(--text-muted)",
            }}
          >
            bhawuk.dev
          </span>
        </div>

        <p
          style={{
            fontSize: "0.75rem",
            fontFamily: "JetBrains Mono, monospace",
            color: "var(--text-muted)",
          }}
        >
          Made with love by Bhawuk
        </p>

        {/* Static links — no event handlers */}
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {[
            { label: "GitHub", href: "https://github.com/geeky-bhawuk-arora" },
            { label: "LinkedIn", href: "https://linkedin.com/in/bhawuk-arora" },
            { label: "Email", href: "mailto:bhawuk.arora008@gmail.com" }
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.75rem",
                fontFamily: "JetBrains Mono, monospace",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
