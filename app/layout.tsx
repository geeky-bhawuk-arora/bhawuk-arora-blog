import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: {
    default: "Bhawuk — Developer Blog",
    template: "%s | Bhawuk",
  },
  description:
    "Thoughts on code, AI, design, career, and the craft of building software. Written by Bhawuk.",
  keywords: ["developer", "blog", "typescript", "nextjs", "AI", "design"],
  authors: [{ name: "Bhawuk" }],
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex flex-col min-h-screen">
        <LoadingScreen />
        <CustomCursor />
        <Providers>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}

/* Server-safe footer — NO event handlers, NO client hooks */
function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] mt-auto">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
          Made with <Heart size={12} className="text-red-500 fill-red-500" /> by Bhawuk
        </p>

        <div className="flex gap-6">
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
              className="text-[10px] md:text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-widest"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
