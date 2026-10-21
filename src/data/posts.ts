export type Post = {
  slug: string; // must match a file in src/content/blog/<slug>.mdx
  title: string;
  description: string;
  date: string; // ISO date, YYYY-MM-DD
  tags: string[];
};

/** Add a post: create src/content/blog/<slug>.mdx and add its entry here (newest first). */
export const posts: Post[] = [
  {
    slug: "how-this-site-is-built",
    title: "How this portfolio is built",
    description:
      "The stack, the design system and the handful of decisions behind this site, including the ones I'd revisit.",
    date: "2026-10-21",
    tags: ["nextjs", "design", "meta"],
  },
];

export function formatDate(iso: string) {
  // Fixed locale and UTC so server and client always agree.
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
