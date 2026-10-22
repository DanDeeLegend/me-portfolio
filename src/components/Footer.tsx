import { site } from "@/data/site";
import { Mascot } from "./Mascot";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-4">
          <Mascot mood="wink" className="w-20 shrink-0" />
          <p>
            <span className="font-hand text-2xl text-fg">Thanks for scrolling.</span>
            <br />© {site.name}. Made in Abuja, with Claude Code.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-block py-2 hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
