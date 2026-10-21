"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";

/** Screenshots for a project card. Phones sit side by side; desktop shots get a thumbnail switcher. */
export function ProjectShots({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const shots = project.shots ?? [];
  if (shots.length === 0) return null;

  if (project.shotLayout === "phones") {
    return (
      <div className="relative mt-5 grid grid-cols-3 gap-3 rounded-2xl border border-line bg-bg p-3">
        {shots.map((s) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            sizes="(min-width: 768px) 160px, 28vw"
            className="h-auto w-full rounded-xl border border-line"
          />
        ))}
      </div>
    );
  }

  const main = shots[active];
  return (
    <div className="relative mt-5">
      <Image
        src={main.src}
        alt={main.alt}
        width={main.width}
        height={main.height}
        sizes="(min-width: 768px) 520px, 100vw"
        className="h-auto w-full rounded-2xl border border-line"
      />
      {shots.length > 1 && (
        <div className="mt-3 flex gap-2">
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
