import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/blog", ...posts.map((p) => `/blog/${p.slug}`)];
  return routes.map((r) => ({ url: `${site.url}${r}` }));
}
