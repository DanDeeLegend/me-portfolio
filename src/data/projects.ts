export type ProjectStatus = "Live" | "Shipped" | "Prototype" | "In development" | "Planned" | "Concept";

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
};

export const projects: Project[] = [
  {
    slug: "contractlens",
    title: "ContractLens",
    summary:
      "Ethereum smart-contract activity dashboard. Give it a contract address and it turns raw Sepolia event logs into a readable activity feed.",
    highlights: [
      "Matches Keccak-256 event-signature hashes and decodes indexed and non-indexed parameters from ABI-encoded data.",
      "A lightweight Etherscan alternative for single-contract monitoring.",
      "Chose Alchemy JSON-RPC over running a node, and documented the trade-off.",
    ],
    role: "Designed and built end to end during the Bitnob internship",
    stack: ["React", "TypeScript", "Vite", "ethers.js v6", "Alchemy"],
    year: "2026",
    status: "Live",
    featured: true,
    links: {
      demo: "https://contract-lens-two.vercel.app",
      repo: "https://github.com/DanDeeLegend/ContractLens",
    },
  },
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
  },
  {
    slug: "ncf-discipleship-portal",
    title: "Discipleship School Portal",
    summary:
      "Mobile-first, role-based portal for a four-week discipleship school cohort, serving mentees, mentors and supervisors across eight roles.",
    highlights: [
      "Vanilla ES modules with no build step: one router, one page registry, one data layer.",
      "Syncs across devices through Supabase with an offline outbox, and installs as a PWA.",
      "Layout swept for horizontal overflow across eight roles and eight screen widths.",
    ],
    role: "Product owner and developer",
    stack: ["JavaScript (ES modules)", "Supabase", "PWA", "Google Forms"],
    year: "2026",
    status: "In development",
    featured: true,
    privateRepo: true,
    links: {},
  },
  {
    slug: "nacos-nile-landing",
    title: "NACOS Nile Landing Page",
    summary:
      "Single-page site for the Nile University chapter of the Nigeria Association of Computing Students, built for the chapter's landing-page competition.",
    highlights: [
      "Covers chapter identity across six disciplines, four initiative streams and a nine-member executive council.",
      "Full SEO layer: Open Graph, Twitter cards, theme colour and custom brand assets.",
    ],
    role: "Designer and developer (competition entry)",
    stack: ["Next.js", "React", "Vercel"],
    year: "2026",
    status: "Shipped",
    featured: false,
    links: { demo: "https://nacos-nile-landing.vercel.app" },
  },
  {
    slug: "signalmap",
    title: "SignalMap",
    summary:
      "Desktop app for mapping WiFi and cellular signal quality across a university campus.",
    highlights: [
      "Analysed 60+ Google Form survey responses on campus network disruption using pivot tables.",
      "Built a pixel-accurate Flutter UI from a Figma export, extracting design tokens and the widget tree end to end.",
      "Docs-as-code structure: PRD, SRS and architecture docs, with Git hygiene around raw survey data.",
    ],
    role: "Product and developer",
    stack: ["Flutter", "Dart", "Figma", "Google Forms"],
    year: "2026",
    status: "Prototype",
    featured: false,
    privateRepo: true,
    links: {},
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
