import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { about, experience, site, writing } from "@/data/site";
import { projects } from "@/data/projects";
import { skillGroups, strengths, marqueeWords } from "@/data/skills";
import { posts, formatDate } from "@/data/posts";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <Marquee words={marqueeWords} />

      <section id="projects" aria-labelledby="projects-h" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
        <SectionHeading index="01" title="Selected work" id="projects-h" />
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.1}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link href="/projects" className="font-medium text-accent underline-offset-4 hover:underline">
            View all projects →
          </Link>
        </Reveal>
      </section>

      <section id="about" aria-labelledby="about-h" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
        <SectionHeading index="02" title="About" id="about-h" />
        <div className="grid gap-12 md:grid-cols-5">
          <Reveal className="space-y-5 text-lg text-muted md:col-span-3">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-2">
            <dl className="divide-y divide-line rounded-3xl border border-line bg-card">
              {about.facts.map((f) => (
                <div key={f.k} className="flex items-baseline justify-between gap-4 px-6 py-4">
                  <dt className="font-mono text-xs uppercase text-muted">{f.k}</dt>
                  <dd className="text-right text-sm">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="mb-6 font-mono text-xs uppercase text-accent">Experience</h3>
          </Reveal>
          {experience.map((job) => (
            <Reveal key={job.org}>
              <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="font-display text-2xl font-bold">
                    {job.role} · {job.org}
                  </h4>
                  <span className="font-mono text-sm text-muted">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{job.context}</p>
                <ul className="mt-5 space-y-3 text-muted">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="text-accent">
                        →
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-3xl border border-line p-6">
                <h3 className="font-mono text-xs uppercase text-accent">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full bg-card px-3 py-1.5 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="rounded-3xl border border-accent p-6">
            <h3 className="font-mono text-xs uppercase text-accent">How I work</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {strengths.map((s) => (
                <li key={s} className="rounded-full bg-card px-4 py-2">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section id="writing" aria-labelledby="writing-h" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
        <SectionHeading index="03" title="Writing" id="writing-h" />
        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          {writing.map((w, i) => (
            <Reveal key={w.platform} delay={i * 0.08}>
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-3xl border border-line bg-card p-6 transition-colors hover:border-accent"
              >
                <span className="font-display text-2xl font-bold">{w.platform} ↗</span>
                <p className="mt-2 text-muted">{w.blurb}</p>
              </a>
            </Reveal>
          ))}
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {posts.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-2xl font-semibold transition-colors group-hover:text-accent">
                  {post.title}
                </span>
                <time dateTime={post.date} className="font-mono text-sm text-muted">
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blog" className="mt-8 inline-block font-medium text-accent underline-offset-4 hover:underline">
          All articles →
        </Link>
      </section>

      <section id="contact" aria-labelledby="contact-h" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
        <SectionHeading index="04" title="Let's talk" id="contact-h" />
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal className="space-y-6">
            <p className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Got a project, internship or idea? <span className="text-accent">Say hello.</span>
            </p>
            <a href={`mailto:${site.email}`} className="inline-block text-lg underline underline-offset-4">
              {site.email}
            </a>
            <ul className="flex flex-wrap gap-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:bg-fg hover:text-bg"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
