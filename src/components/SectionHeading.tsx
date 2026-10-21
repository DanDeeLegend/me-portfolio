export function SectionHeading({
  index,
  title,
  id,
  as: Tag = "h2",
}: {
  index: string;
  title: string;
  id?: string;
  /** Use "h1" on pages where this is the page title. */
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="font-mono text-sm text-accent">{index}</span>
      <Tag id={id} className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </Tag>
    </div>
  );
}
