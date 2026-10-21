export function SectionHeading({
  index,
  title,
  id,
}: {
  index: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="font-mono text-sm text-accent">{index}</span>
      <h2 id={id} className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
