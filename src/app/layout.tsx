import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});
const body = Geist({ variable: "--font-body", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Software Engineer`, template: `%s · ${site.name}` },
  description: site.tagline,
  openGraph: {
    title: `${site.name} · Software Engineer`,
    description: site.tagline,
    type: "website",
    siteName: site.name,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0c0c10" };

// Runs before first paint so the saved theme is applied without a flash.
// Dark (lime on near-black) is the signature look, so it is the default for everyone.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");d.dataset.theme=t==="light"?"light":"dark"}catch(e){d.dataset.theme="dark"}if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.reveal="on"})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain min-h-screen flex flex-col">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
