/**
 * Single source of truth for personal info.
 * Sourced from the CV (Sept 2026) and the GitHub account.
 */
export const site = {
  name: "Daniel Aminu",
  handle: "DanDeeLegend",
  url: "https://me-portfolio-gamma-one.vercel.app", // production alias; change if you add a custom domain
  headline: "Software engineer in the making.",
  tagline:
    "Software Engineering student at Nile University, Abuja. I read the spec, build the thing, break it on purpose, then write down what happened. Right now that means cryptography, Flutter apps for my campus, and a long list of side quests.",
  location: "Abuja, Nigeria",
  email: "danielaminu2@gmail.com",
  availability: "Activeee for gigs, internships and the likes",
  /** Redacted CV (no phone number or student ID) lives at public/cv.pdf. Set to null to hide the button. */
  cvPath: "/cv.pdf" as string | null,
  socials: [
    { label: "GitHub", href: "https://github.com/DanDeeLegend" },
    { label: "LinkedIn", href: "https://linkedin.com/in/daniel-aminu" },
    { label: "Medium", href: "https://medium.com/@danielaminu2" },
    { label: "Substack", href: "https://substack.com/@dannii0" },
    { label: "Instagram", href: "https://instagram.com/dani0_tm" },
    { label: "Threads", href: "https://www.threads.com/@dani0_tm" },
  ],
} as const;

export const about = {
  paragraphs: [
    "I'm Daniel, but pretty much everywhere I go I'm Dannybouy. I study Software Engineering at Nile University in Abuja, and I'm happiest when I understand a thing all the way down: the spec, the failure mode, and why it was designed that way.",
    "This summer I spent July to September at Bitnob, a payments company, building six projects in cryptography and blockchain and presenting each one to an engineer every week. Explaining my own code out loud turned out to be the real test.",
    "Outside of code I write: engineering notes on Medium, and essays on faith and growth on Substack. I build for the people around me too: a campus signal map, my fellowship's website, and a thirteen-chapter cryptography series where every number is measured.",
  ],
  facts: [
    { k: "Studying", v: "B.Sc. Software Engineering, Nile University (exp. 2028)" },
    { k: "Based in", v: "Abuja, Nigeria" },
    { k: "Focus", v: "Cryptography · Blockchain · Full-stack" },
    { k: "Interned at", v: "Bitnob, Jul–Sep 2026" },
    { k: "Answers to", v: "Daniel, Dannybouy" },
  ],
} as const;

export const experience = [
  {
    role: "Software Engineering Intern",
    org: "Bitnob",
    context: "Cross-border payments on Bitcoin and stablecoin rails",
    period: "Jul – Sep 2026",
    points: [
      "Completed and defended six technical projects in applied cryptography and blockchain application development, presented weekly to an engineering supervisor.",
      "Implemented PKCS#7 padding and AES-CBC encryption from first principles in Python, with a pytest suite proving correct behaviour and two deliberately introduced bugs.",
      "Wrote technical case studies on Kerckhoffs's principle, modern stream ciphers (RC4, Salsa20, ChaCha20) and a 3DES vs AES benchmark showing AES's ~10× throughput advantage.",
      "Took part in code reviews on the Bitnob application, identifying optimisation and security improvements.",
    ],
  },
] as const;

export const writing = [
  {
    platform: "Medium",
    handle: "@danielaminu2",
    href: "https://medium.com/@danielaminu2",
    blurb: "Technical articles on engineering topics.",
  },
  {
    platform: "Substack",
    handle: "@dannii0",
    href: "https://substack.com/@dannii0",
    blurb: "Essays on personal growth, faith and reflection.",
  },
] as const;
