/**
 * Single source of truth for personal info.
 * Everything marked REPLACE is a placeholder: edit here, the whole site updates.
 */
export const site = {
  name: "Daniel", // REPLACE with your full name
  handle: "DanDeeLegend",
  url: "https://example.com", // REPLACE with your deployed URL
  headline: "Software engineer in the making.",
  roles: ["full-stack apps", "AI tools", "blockchain systems", "clean interfaces"],
  tagline:
    "Software Engineering student at Nile University of Nigeria building full-stack products, exploring AI engineering and learning blockchain & cryptography.",
  location: "Abuja, Nigeria", // REPLACE if different
  email: "danielaminu2@gmail.com",
  available: true,
  cvPath: "/cv.pdf", // drop your CV at public/cv.pdf
  socials: [
    { label: "GitHub", href: "https://github.com/DanDeeLegend" },
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" }, // REPLACE
    { label: "X", href: "https://x.com/your-handle" }, // REPLACE
    { label: "YouTube", href: "https://youtube.com/@your-handle" }, // REPLACE
  ],
} as const;

export const about = {
  paragraphs: [
    "I'm a Software Engineering student at Nile University of Nigeria. I like turning vague ideas into working products, and I care about how they feel to use as much as how they run.",
    "Right now I'm going deep on blockchain and cryptography through an internship, while building full-stack projects and exploring AI engineering. I also write and make content about what I learn.",
  ],
  facts: [
    { k: "Studying", v: "Software Engineering, Nile University" },
    { k: "Focus", v: "Full-stack · AI · Blockchain" },
    { k: "Learning", v: "Cryptography, system design" },
    { k: "Also into", v: "Writing, automation, content" },
  ],
} as const;
