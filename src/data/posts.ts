export type Post = {
  slug: string; // must match a file in src/content/blog/<slug>.mdx
  title: string;
  description: string;
  date: string; // ISO date, YYYY-MM-DD
  tags: string[];
};

/** Add a new post: create src/content/blog/<slug>.mdx and add its entry here (newest first). */
export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, world: why I'm building in public",
    description:
      "A placeholder post. Replace it with your first real article, e.g. what you learned this month.",
    date: "2026-01-01",
    tags: ["meta"],
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
