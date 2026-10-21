import { site } from "@/data/site";

/** Server component: the entrance animation is CSS (.rise), so the headline paints without waiting for hydration. */
export function Hero() {
  const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

  return (
    <section className="relative overflow-hidden">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "var(--glow)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 sm:px-8 sm:pt-28 sm:pb-32">
        <p
          className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-xs text-muted"
        >
          {site.availability} · {site.location}
        </p>

        <h1
          className="rise font-display text-[clamp(2.75rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tighter"
          style={d(0.05)}
        >
          Heyaa I&apos;m Daniel
          <br />
          a.k.a <span className="text-accent">Dannybouy.</span>
          <br />
          <span className="text-muted">I </span>
          <span className="text-accent">vibecode</span>
          <span className="text-muted"> the unthinkable.</span>
        </h1>

        <p className="rise mt-8 max-w-2xl text-lg text-muted sm:text-xl" style={d(0.25)}>
          {site.tagline}
        </p>

        <div className="rise mt-10 flex flex-wrap gap-3" style={d(0.4)}>
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-transform hover:scale-105"
          >
            See my work
          </a>
          {site.cvPath ? (
            <a
              href={site.cvPath}
              download
              className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:bg-fg hover:text-bg"
            >
              Download CV
            </a>
          ) : (
            <a
              href="#contact"
              className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:bg-fg hover:text-bg"
            >
              Get in touch
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
