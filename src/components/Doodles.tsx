/** Hand-drawn marks. All use currentColor, so colour them with text-* classes; the #doodle filter (see DoodleDefs) wobbles the lines. */
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const wob = { filter: "url(#doodle)" } as const;

export function DoodleDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <filter id="doodle" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
      </filter>
      {/* Lens-like warp for the nav's backdrop (Chromium only; other browsers just get the blur). */}
      <filter id="glass-distort" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="1" seed="4" result="t" />
        <feGaussianBlur in="t" stdDeviation="2" result="b" />
        <feDisplacementMap in="SourceGraphic" in2="b" scale="16" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

export function Underline({ className = "" }: P) {
  return (
    <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" className={className} style={wob} {...base}>
      <path d="M3 12 C30 3 55 19 85 10 S140 4 197 11" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Scribble({ className = "" }: P) {
  return (
    <svg viewBox="0 0 130 90" aria-hidden="true" className={className} style={wob} {...base}>
      <path d="M64 8C22 6 4 30 14 54c12 26 76 30 98 4 14-24-12-50-56-48-16 2-26 8-30 14" />
    </svg>
  );
}

export function Arrow({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" className={className} style={wob} {...base}>
      <path d="M6 10C40 0 90 20 100 62M84 48l16 16 12-20" />
    </svg>
  );
}

export function Spark({ className = "" }: P) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} style={wob} {...base}>
      <path d="M24 3l5 16 16 5-16 5-5 16-5-16-16-5 16-5z" />
    </svg>
  );
}

export function Squiggle({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 24" aria-hidden="true" className={className} style={wob} {...base}>
      <path d="M4 14c8-14 14 12 22 0s14 12 22 0 14 12 22 0 14 12 22 0 14 12 22 0" />
    </svg>
  );
}
