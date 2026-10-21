"use client";

import type { Project } from "@/data/projects";
import { ProjectShots } from "./ProjectShots";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Cursor-follow spotlight: only sets CSS vars, so no re-renders on mouse move.
  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  const live = project.status === "Live";

  return (
    <article
      onMouseMove={onMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 60%)",
        }}
      />
      <div className="relative flex items-center justify-between font-mono text-xs text-muted">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="flex items-center gap-3">
          <span
            className={
              "rounded-full border px-2.5 py-0.5 " +
              (live ? "border-accent text-accent" : "border-line text-muted")
            }
          >
            {project.status}
          </span>
          {project.year}
        </span>
      </div>
      <ProjectShots project={project} />
      <h3 className="relative mt-6 font-display text-3xl font-bold tracking-tight">
        {project.title}
      </h3>
      <p className="relative mt-3 text-muted">{project.summary}</p>
      <ul className="relative mt-5 space-y-2 text-sm text-muted">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span aria-hidden="true" className="text-accent">
              →
            </span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <p className="relative mt-5 text-sm">
        <span className="text-muted">Role: </span>
        {project.role}
      </p>
      <ul className="relative mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs">
            {s}
          </li>
        ))}
      </ul>
      <div className="relative mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-8 text-sm font-medium">
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            Live site ↗<span className="sr-only"> of {project.title}</span>
          </a>
        )}
        {project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Source ↗<span className="sr-only"> of {project.title}</span>
          </a>
        )}
        {project.privateRepo && <span className="text-muted">Private repository</span>}
      </div>
    </article>
  );
}
