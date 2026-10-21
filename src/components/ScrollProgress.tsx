/** Decorative reading-progress bar. All behaviour lives in CSS (.scroll-progress), so it ships no JavaScript. */
export function ScrollProgress() {
  return <div aria-hidden="true" className="scroll-progress" />;
}
