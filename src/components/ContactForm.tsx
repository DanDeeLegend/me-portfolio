"use client";

import { site } from "@/data/site";

/**
 * No backend: composes a pre-filled email in the visitor's mail app.
 * Upgrade path: swap onSubmit for a Server Action that calls Resend/Formspree
 * (add rate limiting and a honeypot field before exposing a real endpoint).
 */
export function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-2xl border border-line bg-card px-4 py-3 text-fg placeholder:text-muted focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-muted">Name</label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-muted">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-muted">Message</label>
        <textarea id="message" name="message" required rows={5} className={field} />
      </div>
      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-transform hover:scale-105"
      >
        Send message
      </button>
    </form>
  );
}
