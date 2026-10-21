import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { posts, formatDate } from "@/data/posts";
import { writing } from "@/data/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on software engineering, AI and blockchain.",
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <SectionHeading index="→" title="Writing" />
      <ul className="divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block py-6">
              <time dateTime={post.date} className="font-mono text-sm text-muted">
                {formatDate(post.date)}
              </time>
              <h2 className="mt-1 font-display text-2xl font-semibold transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-muted">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-muted">
        More writing on{" "}
        {writing.map((w, i) => (
          <span key={w.platform}>
            {i > 0 && " and "}
            <a href={w.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
              {w.platform}
            </a>
          </span>
        ))}
        .
      </p>
    </div>
  );
}
