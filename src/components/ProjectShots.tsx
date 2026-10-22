"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { ShotViewer } from "./ShotViewer";

/** Screenshots for a project card. Phones sit side by side; desktop shots get a thumbnail switcher. */
export function ProjectShots({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const shots = project.shots ?? [];
  if (shots.length === 0) return null;

  if (project.shotLayout === "phones") {
    return (
      <div className="relative mt-5 grid grid-cols-3 gap-3 rounded-2xl border border-line bg-bg p-3">
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Enlarge screenshot: ${s.alt}`}
            className="cursor-zoom-in rounded-xl transition-transform hover:scale-[1.02]"
          >
            <Image
              src={s.src}
              alt=""
              width={s.width}
              height={s.height}
              sizes="(min-width: 768px) 160px, 28vw"
              className="h-auto w-full rounded-xl border border-line"
            />
          </button>
        ))}
        {open !== null && <ShotViewer shots={shots} start={open} title={project.title} onClose={() => setOpen(null)} />}
      </div>
    );
  }

  const main = shots[active];
  return (
    <div className="relative mt-5">
      <button
        type="button"
        onClick={() => setOpen(active)}
        aria-label={`Enlarge screenshot: ${main.alt}`}
        className="group/shot relative block w-full cursor-zoom-in overflow-hidden rounded-2xl"
      >
        <Image
          src={main.src}
          alt=""
          width={main.width}
          height={main.height}
          sizes="(min-width: 768px) 520px, 100vw"
          className="h-auto w-full rounded-2xl border border-line"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 rounded-full bg-black/70 px-3 py-1.5 font-mono text-xs text-white opacity-90 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover/shot:opacity-100"
        >
          ⤢ Zoom
        </span>
      </button>
      {open !== null && <ShotViewer shots={shots} start={open} title={project.title} onClose={() => setOpen(null)} />}
      {shots.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`Show screenshot ${i + 1} of ${shots.length} for ${project.title}`}
              className={
                "overflow-hidden rounded-lg border transition-opacity " +
                (i === active ? "border-accent" : "border-line opacity-60 hover:opacity-100")
              }
            >
              <Image src={s.src} alt="" width={96} height={54} className="h-[54px] w-[96px] object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
