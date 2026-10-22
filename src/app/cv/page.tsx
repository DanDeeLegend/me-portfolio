import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "CV",
  alternates: { canonical: "/cv" },
  description: "Daniel Aminu's CV: projects, experience and skills across web, mobile, AI and blockchain.",
};

/** Viewer first, download second. Wide screens get the PDF viewer; phones get the pages as images, since mobile browsers can't scroll an embedded PDF. */
export default function CvPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 pb-24 sm:px-8">
      <SectionHeading note="the two-page version" title="CV" as="h1" />
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <a href={site.cvPath ?? "#"} download className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-transform hover:scale-105">
          Download PDF
        </a>
        <a href={site.cvPath ?? "#"} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:bg-fg hover:text-bg">
          Open in a new tab
        </a>
      </div>

      <iframe
        src={`${site.cvPath}#view=FitH`}
        title="Daniel Aminu's CV (PDF)"
        className="hidden h-[85vh] min-h-[640px] w-full rounded-2xl border border-line bg-card md:block"
      />

      <div className="space-y-6 md:hidden">
        {[1, 2].map((n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={n}
            src={`/cv/page-${n}.webp`}
            alt={`CV page ${n} of 2. The text is also on this site's home page, or download the PDF above.`}
            width={910}
            height={1287}
            className="w-full rounded-xl border border-line bg-white"
          />
        ))}
      </div>
    </div>
  );
}
