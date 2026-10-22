import { site } from "@/data/site";
import { Arrow, Scribble, Spark, Squiggle } from "./Doodles";
import { Mascot } from "./Mascot";

/** Server component: the entrance animation is CSS (.rise), so the headline paints without waiting for hydration. */
export function Hero() {
  const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "var(--glow)" }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-32 pb-24 sm:px-8 sm:pt-36 md:grid-cols-[1.35fr_1fr] md:gap-8 md:pb-28">
        <div>
          <p className="rise mb-7 inline-block -rotate-1 rounded-md border-2 border-dashed border-accent px-3.5 py-1.5 font-mono text-xs text-fg sm:text-sm">
            {site.availability} · {site.location}
          </p>

          <h1
            className="rise font-display text-[clamp(2.5rem,6.6vw,5.6rem)] font-extrabold leading-[0.97] tracking-tighter"
            style={d(0.05)}
          >
            Heyaa I&apos;m Daniel
            <br />
            a.k.a <span className="text-accent">Dannybouy.</span>
            <br />
            <span className="text-muted">I </span>
            <span className="relative inline-block text-accent">
              vibecode
              <Squiggle className="absolute -bottom-3 left-0 h-4 w-full text-fg" />
            </span>
            <span className="text-muted"> the unthinkable.</span>
          </h1>

          <p className="rise mt-9 max-w-xl text-lg text-muted sm:text-xl" style={d(0.25)}>
            {site.tagline}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={d(0.4)}>
            <a href="#projects" className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-transform hover:scale-105">
              See my work
            </a>
            {site.cvPath ? (
              <a href={site.cvPath} download className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:bg-fg hover:text-bg">
                Download CV
              </a>
            ) : (
              <a href="#contact" className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:bg-fg hover:text-bg">
                Get in touch
              </a>
            )}
          </div>
        </div>

        {/* Collage: cut-out photo as a sticker, the mascot waving over its corner, and a few scraps of doodle. */}
        <div className="rise relative mx-auto w-60 sm:w-72 md:w-full md:max-w-sm" style={d(0.3)}>
          <Scribble className="absolute -top-6 -right-8 h-24 w-28 text-accent opacity-80" />
          <figure className="polaroid relative z-10 rotate-2">
            <span aria-hidden="true" className="tape" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/daniel.jpg"
              alt="Daniel Aminu in a pink plaid blazer and black tie"
              width={302}
              height={418}
              className="w-full"
            />
            <figcaption className="font-hand pt-2 text-center text-2xl text-[#14141a]">Dannybouy</figcaption>
          </figure>
          <Mascot mood="wave" className="wiggle absolute -right-10 -bottom-10 z-20 w-32 rotate-6 sm:-right-14 sm:w-40" />
          <p className="font-hand absolute -top-9 left-0 z-20 -rotate-6 text-2xl text-accent sm:text-3xl">hi, that&apos;s me!</p>
          <Arrow className="absolute -top-4 left-24 z-20 h-12 w-16 rotate-[20deg] text-accent" />
          <Spark className="absolute -left-8 bottom-28 z-20 h-9 w-9 text-accent" />
          <span className="absolute bottom-4 -left-6 z-20 -rotate-6 rounded-md bg-accent px-3 py-1 font-mono text-xs text-accent-ink shadow-lg">
            Abuja, NG
          </span>
        </div>
      </div>
    </section>
  );
}
