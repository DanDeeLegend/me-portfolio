/**
 * Single source of truth for personal info.
 * Sourced from the CV (Sept 2026) and the GitHub account.
 */
export const site = {
  name: "Daniel Aminu",
  handle: "DanDeeLegend",
  url: "https://example.com", // REPLACE with the deployed URL once hosted
  headline: "Software engineer in the making.",
  roles: ["blockchain apps", "secure systems", "full-stack products", "things people use"],
  tagline:
    "Software Engineering student at Nile University of Nigeria with hands-on experience in applied cryptography, blockchain apps and full-stack web and mobile. I work from primary sources and build products for real users.",
  location: "Abuja, Nigeria",
  email: "danielaminu2@gmail.com",
  available: true,
  /** Set to "/cv.pdf" after adding a CV to public/ (a redacted copy, without phone or student ID). */
  cvPath: null as string | null,
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
    "I'm a Software Engineering undergraduate at Nile University of Nigeria, with hands-on experience in applied cryptography, blockchain application development and full-stack web and mobile engineering.",
    "During my Bitnob internship I built and defended six technical projects, including a deployed Ethereum dashboard and a from-scratch PKCS#7/AES-CBC implementation. I'm most comfortable working from specifications, standards and papers rather than second-hand summaries.",
    "Outside of code I write: technical articles on Medium, and essays on personal growth, faith and reflection on Substack.",
  ],
  facts: [
    { k: "Studying", v: "B.Sc. Software Engineering, Nile University (exp. 2028)" },
    { k: "Focus", v: "Blockchain · Cryptography · Full-stack" },
    { k: "Interned at", v: "Bitnob, Jul–Sep 2026" },
    { k: "Interests", v: "Frontend design, AI engineering, technical writing" },
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
      "Built ContractLens, a React/TypeScript dashboard that decodes raw Ethereum event logs into readable smart-contract activity, deployed to production.",
      "Implemented PKCS#7 padding and AES-CBC encryption from first principles in Python, with a pytest suite proving correct behaviour and two deliberately introduced bugs.",
      "Wrote technical case studies on Kerckhoffs's principle, modern stream ciphers (RC4, Salsa20, ChaCha20) and a 3DES vs AES benchmark showing AES's ~10× throughput advantage.",
      "Took part in code reviews on the Bitnob application, identifying optimisation and security improvements.",
    ],
  },
] as const;

export const writing = [
  {
    platform: "Medium",
    href: "https://medium.com/@danielaminu2",
    blurb: "Technical articles on engineering topics.",
  },
  {
    platform: "Substack",
    href: "https://substack.com/@dannii0",
    blurb: "Essays on personal growth, faith and reflection.",
  },
] as const;
