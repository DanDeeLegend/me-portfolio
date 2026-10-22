import { Underline } from "./Doodles";

export function SectionHeading({
  note,
  title,
  id,
  as: Tag = "h2",
}: {
  /** Handwritten aside next to the title. */
  note?: string;
  title: string;
  id?: string;
  /** Use "h1" on pages where this is the page title. */
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end gap-x-5 gap-y-1">
      <Tag id={id} className="relative inline-block font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
        <Underline className="absolute -bottom-2.5 left-0 h-3 w-full text-accent" />
      </Tag>
      {note && <span className="font-hand -rotate-3 text-2xl text-accent sm:text-3xl">{note}</span>}
    </div>
  );
}
