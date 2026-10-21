/** Decorative scrolling strip. Hidden from screen readers; the Skills section holds the real list. */
export function Marquee({ words }: { words: string[] }) {
  const row = [...words, ...words];
  return (
    <div
      aria-hidden="true"
      className="marquee overflow-hidden border-y border-line bg-accent py-4 text-accent-ink"
    >
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
