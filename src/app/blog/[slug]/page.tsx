import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, formatDate } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <Link href="/blog" className="font-mono text-sm text-muted hover:text-fg">
        ← All articles
      </Link>
      <header className="mt-8 mb-10">
        <time dateTime={post.date} className="font-mono text-sm text-muted">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
      </header>
      <div className="prose-custom">
        <Content />
      </div>
    </article>
  );
}
