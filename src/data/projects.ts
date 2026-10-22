export type ProjectStatus = "Live" | "Shipped" | "Prototype" | "In development" | "Planned" | "Concept";

export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  role: string;
  stack: string[];
  year: string;
  status: ProjectStatus;
  featured: boolean;
  /** Source repo is private: show a label instead of a link that would 404. */
  privateRepo?: boolean;
  links: { demo?: string; repo?: string };
  /** Screenshots served from /public. "phones" = tall mobile shots side by side; "wide" = desktop shots with thumbnails. */
  shots?: Shot[];
  shotLayout?: "wide" | "phones";
};

export const projects: Project[] = [
  {
    slug: "padding-scheme-explorer",
    title: "Padding Scheme Explorer",
    summary:
      "A cryptographic correctness demonstrator: PKCS#7 padding written from scratch and wired into real AES-CBC, shipped beside two deliberately buggy variants.",
    highlights: [
      "pytest suite proves the correct behaviour and the exact failure of each bug (off-by-one unpad, silent corruption).",
      "Shows how padding-validity becomes distinguishable, the exact signal a padding-oracle attacker exploits.",
    ],
    role: "Solo developer",
    stack: ["Python", "PyCryptodome", "pytest"],
    year: "2026",
    status: "Shipped",
    featured: true,
    links: { repo: "https://github.com/DanDeeLegend/padding-scheme-explorer" },
  },
  {
    slug: "ncf-website",
    title: "Nile Christian Fellowship Website",
    summary:
      "Static Next.js rebuild of a fellowship's Framer site: 35 routes, a measured design system, and forms that hand off to WhatsApp, email or Google Sheets.",
    highlights: [
      "Collapsed 22 border radii into a 7-step scale and darkened muted text so it passes WCAG AA on every background.",
      "Cut 51 photographs from 171 MB to 9.2 MB with no visible loss.",
      "No backend or CMS: typed content files, plus Apps Script for email and a membership spreadsheet.",
    ],
    role: "Designer and developer",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Vercel", "Apps Script"],
    year: "2026",
    status: "Live",
    featured: true,
    privateRepo: true,
    links: { demo: "https://ncf-website-ten.vercel.app" },
    shotLayout: "wide",
    shots: [
      {
        src: "/projects/ncf/home.webp",
        alt: "Nile Christian Fellowship home page: a full-width photo of a congregation in a lecture hall with the headline 'Nile Christian Fellowship', stats for members and years of ministry, and Join Us and Watch Sermons buttons.",
        width: 1440,
        height: 810,
      },
      {
        src: "/projects/ncf/events.webp",
        alt: "Nile Christian Fellowship events page: a hero reading 'Moments that transform lives' above an 'Upcoming Events' section.",
        width: 1440,
        height: 810,
      },
      {
        src: "/projects/ncf/sermons.webp",
        alt: "Nile Christian Fellowship sermons page: a hero reading 'Listen. Learn. Grow.' above a 'Find a message' browse section.",
        width: 1440,
        height: 810,
      },
    ],
  },
  {
    slug: "signalmap",
    title: "SignalMap",
    summary:
      "Community-powered mobile network intelligence for Nigerian university students: know where your network works. Students report signal quality and the map colours each campus building by carrier.",
    highlights: [
      "A building is coloured only once it has 5+ reports from 3+ different users within 30 days, so one noisy report can't skew the map.",
      "Shipped as an installable Flutter PWA, from a codebase that also builds for Android and iOS.",
      "Grounded in research: analysed 60+ survey responses on campus network disruption before designing, then built a pixel-accurate UI from a Figma export.",
    ],
    role: "Product and developer",
    stack: ["Flutter", "Dart", "Supabase", "Figma", "Render"],
    year: "2026",
    status: "Live",
    featured: true,
    privateRepo: true,
    links: { demo: "https://signalmap-8117.onrender.com" },
    shotLayout: "phones",
    shots: [
      {
        src: "/projects/signalmap/map.webp",
        alt: "SignalMap home screen: a campus map with building outlines, a search bar and filter chips for MTN, Airtel, Glo and 9mobile.",
        width: 540,
        height: 1200,
      },
      {
        src: "/projects/signalmap/building.webp",
        alt: "SignalMap building detail sheet for the Library: MTN Nigeria rated Good, based on 14 reports, with high confidence.",
        width: 540,
        height: 1200,
      },
      {
        src: "/projects/signalmap/report.webp",
        alt: "SignalMap report flow, step 1 of 3: detected location and a choice of network provider.",
        width: 540,
        height: 1200,
      },
    ],
  },
  {
    slug: "the-board",
    title: "The Board",
    summary:
      "Personal life-management app that applies a business-management metaphor to an individual's life.",
    highlights: [
      "Measures drift from your own baseline rather than fixed goals, using passive and prompted data capture.",
      "Phase 1 complete: pure-Dart domain model and drift-detection engine with test coverage.",
      "First target users: students on campus.",
    ],
    role: "Founder and developer",
    stack: ["Flutter", "Dart"],
    year: "2026",
    status: "In development",
    featured: false,
    links: {},
  },
  {
    slug: "bright-spot",
    title: "Bright Spot",
    summary:
      "A local-first password manager for Android, distributed as a sideloaded APK.",
    highlights: [
      "Core UX decision: migrate between devices by scanning a QR code instead of cloud sync.",
      "Architecture and product spec complete; implementation not started.",
    ],
    role: "Product and architecture",
    stack: ["Flutter (planned)", "Android"],
    year: "2026",
    status: "Planned",
    featured: false,
    links: {},
  },
  {
    slug: "school-homepage-redesign",
    title: "School Homepage Redesign",
    summary:
      "Pitch concept for an Abuja international school's homepage: keeps the school's brand while modernising layout, type and content structure.",
    highlights: [
      "Design tokens sampled from the live brand (burgundy and gold), with Fraunces and Inter.",
      "No framework or build step; WCAG AA contrast, skip link and reduced-motion support.",
    ],
    role: "Designer and developer",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    status: "Concept",
    featured: false,
    links: { repo: "https://github.com/DanDeeLegend/web-redesign-offers" },
  },
];
