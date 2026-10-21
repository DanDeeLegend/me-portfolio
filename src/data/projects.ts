export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  year: string;
  featured: boolean;
  links: { demo?: string; repo?: string };
};

/** PLACEHOLDERS: replace each entry with a real project. */
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary:
      "Replace me: one sentence on what this does and who it is for. Lead with the problem, not the tech.",
    role: "Solo developer: design, frontend, backend",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2026",
    featured: true,
    links: { demo: "https://example.com", repo: "https://github.com/DanDeeLegend" },
  },
  {
    slug: "project-two",
    title: "Project Two",
    summary:
      "Replace me: describe a measurable outcome, e.g. 'cut report time from 2 hours to 5 minutes'.",
    role: "Full-stack developer",
    stack: ["Python", "FastAPI", "OpenAI API"],
    year: "2026",
    featured: true,
    links: { repo: "https://github.com/DanDeeLegend" },
  },
  {
    slug: "project-three",
    title: "Project Three",
    summary:
      "Replace me: a blockchain or cryptography project is a strong signal given your internship.",
    role: "Smart contract developer",
    stack: ["Solidity", "Hardhat", "ethers.js"],
    year: "2025",
    featured: true,
    links: { repo: "https://github.com/DanDeeLegend" },
  },
  {
    slug: "project-four",
    title: "Project Four",
    summary: "Replace me: smaller experiment or university project.",
    role: "Developer",
    stack: ["React", "Tailwind"],
    year: "2025",
    featured: false,
    links: { repo: "https://github.com/DanDeeLegend" },
  },
];
