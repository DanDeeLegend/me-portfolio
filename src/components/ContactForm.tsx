"use client";

import { useRef, useState } from "react";
import { site } from "@/data/site";
import { Mascot, type Mood } from "./Mascot";

const TOPICS = ["Internship", "Freelance gig", "Collaboration", "Just saying hi"] as const;
const MAX = 600;
const COLORS = ["var(--accent)", "#f4a9c0", "#ffffff", "#f2c94c"];

type Field = "name" | "email" | "message";
type Piece = { id: number; x: number; y: number; r: number; c: string };

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/**
 * No backend: the form composes a pre-filled email in the visitor's own mail app, and says so plainly.
 * Upgrade path: a server route that calls a mail API (add rate limiting and a honeypot before exposing it).
 */
export function ContactForm() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("Internship");
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, email: false, message: false });
  const [focus, setFocus] = useState<Field | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState<Piece[]>([]);
  const card = useRef<HTMLFormElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  const errors: Record<Field, string> = {
    name: values.name.trim() ? "" : "Tell me who you are.",
    email: emailOk(values.email) ? "" : "That email doesn't look right.",
    message: values.message.trim().length >= 10 ? "" : "A few more words, please (10+ characters).",
  };
  const show = (f: Field) => touched[f] && errors[f];

  // The mascot reacts to what you're doing.
  const mood: Mood = sent ? "wave" : show("email") ? "confused" : focus === "message" ? "wink" : "smile";

  const set = (f: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [f]: f === "message" ? e.target.value.slice(0, MAX) : e.target.value }));

  function spotlight(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  function magnet(e: React.PointerEvent<HTMLButtonElement>) {
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.12}px, ${(e.clientY - r.top - r.height / 2) * 0.2}px)`;
  }

  const composed = () => {
    const subject = `${topic}: message from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n${values.name.trim()} (${values.email.trim()})`;
    return { subject, body };
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const bad = (["name", "email", "message"] as Field[]).find((f) => errors[f]);
    if (bad) {
      setShakeKey((k) => k + 1);
      card.current?.querySelector<HTMLElement>(`[name="${bad}"]`)?.focus();
      return;
    }
    const { subject, body } = composed();
    setConfetti(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 520,
        y: -80 - Math.random() * 280,
        r: (Math.random() - 0.5) * 900,
        c: COLORS[i % COLORS.length],
      })),
    );
    setSent(true);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function copy() {
    const { subject, body } = composed();
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\nSubject: ${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard can be blocked; the email link below still works
    }
  }

  const input =
    "peer w-full rounded-2xl border bg-bg/60 px-4 pt-6 pb-2 text-fg placeholder-transparent outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_20%,transparent)]";
  const label =
    "pointer-events-none absolute left-4 top-2 text-xs text-accent transition-all duration-200 peer-placeholder-shown:top-[1.05rem] peer-placeholder-shown:text-base peer-placeholder-shown:text-muted peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent";
  const shake = (f: Field) => (show(f) ? `shake-${shakeKey % 2}` : "");

  return (
    <div className="relative pt-14 sm:pt-16">
      <Mascot mood={mood} className="absolute top-0 right-4 z-10 w-24 transition-transform duration-300 sm:right-8 sm:w-28" />

      <form
        ref={card}
        onSubmit={onSubmit}
        onPointerMove={spotlight}
        noValidate
        className="contact-card overflow-hidden p-5 sm:p-8"
        aria-label="Contact form"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{ background: "radial-gradient(380px circle at var(--mx, 80%) var(--my, 0%), var(--glow), transparent 65%)" }}
        />

        {sent ? (
          <div className="relative py-6 text-center" role="status" aria-live="polite">
            {confetti.map((p) => (
              <span
                key={p.id}
                aria-hidden="true"
                className="confetti-piece"
                style={{ background: p.c, ["--x" as string]: `${p.x}px`, ["--y" as string]: `${p.y}px`, ["--r" as string]: `${p.r}deg` }}
              />
            ))}
            <p className="font-hand text-4xl text-accent">Almost there!</p>
            <p className="mt-2 font-display text-2xl font-bold">Your email app should be opening.</p>
            <p className="mx-auto mt-3 max-w-sm text-muted">
              The message is filled in. It only reaches me when you press send there. Nothing opened? Copy it, or email me directly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={copy} className="min-h-11 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink transition-transform hover:scale-105">
                {copied ? "Copied ✓" : "Copy message"}
              </button>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-2.5 font-medium transition-colors hover:bg-fg hover:text-bg">
                {site.email}
              </a>
              <button type="button" onClick={() => { setSent(false); setConfetti([]); }} className="min-h-11 rounded-full px-5 py-2.5 text-muted underline underline-offset-4 hover:text-fg">
                Write another
              </button>
            </div>
          </div>
        ) : (
          <div className="relative space-y-5">
            <fieldset>
              <legend className="mb-2.5 text-sm text-muted">What's this about?</legend>
              <div role="radiogroup" aria-label="Topic" className="flex flex-wrap gap-2">
                {TOPICS.map((t) => {
                  const on = t === topic;
                  return (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setTopic(t)}
                      className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                        on ? "scale-[1.04] border-accent bg-accent font-medium text-accent-ink shadow-[0_6px_20px_-6px_var(--accent)]" : "border-line text-muted hover:border-accent hover:text-fg"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className={`relative ${shake("name")}`}>
              <input id="cf-name" name="name" value={values.name} onChange={set("name")} onFocus={() => setFocus("name")} onBlur={() => { setFocus(null); setTouched((t) => ({ ...t, name: true })); }} autoComplete="name" placeholder="Name" aria-invalid={!!show("name")} aria-describedby={show("name") ? "cf-name-e" : undefined} className={`${input} ${show("name") ? "border-red-400" : "border-line"}`} />
              <label htmlFor="cf-name" className={label}>Name</label>
              {show("name") && <p id="cf-name-e" className="mt-1.5 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div className={`relative ${shake("email")}`}>
              <input id="cf-email" name="email" type="email" inputMode="email" value={values.email} onChange={set("email")} onFocus={() => setFocus("email")} onBlur={() => { setFocus(null); setTouched((t) => ({ ...t, email: true })); }} autoComplete="email" placeholder="Email" aria-invalid={!!show("email")} aria-describedby={show("email") ? "cf-email-e" : undefined} className={`${input} ${show("email") ? "border-red-400" : "border-line"}`} />
              <label htmlFor="cf-email" className={label}>Email</label>
              {show("email") && <p id="cf-email-e" className="mt-1.5 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div className={`relative ${shake("message")}`}>
              <textarea id="cf-message" name="message" rows={5} value={values.message} onChange={set("message")} onFocus={() => setFocus("message")} onBlur={() => { setFocus(null); setTouched((t) => ({ ...t, message: true })); }} placeholder="Message" aria-invalid={!!show("message")} aria-describedby={`cf-count${show("message") ? " cf-message-e" : ""}`} className={`${input} resize-none ${show("message") ? "border-red-400" : "border-line"}`} />
              <label htmlFor="cf-message" className={label}>Message</label>
              <div className="mt-2 flex items-center gap-3">
                <div aria-hidden="true" className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-accent transition-[width] duration-200" style={{ width: `${(values.message.length / MAX) * 100}%` }} />
                </div>
                <span id="cf-count" className="font-mono text-xs text-muted">{values.message.length}/{MAX}</span>
              </div>
              {show("message") && <p id="cf-message-e" className="mt-1.5 text-sm text-red-400">{errors.message}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
              <button
                ref={btn}
                type="submit"
                onPointerMove={magnet}
                onPointerLeave={() => { if (btn.current) btn.current.style.transform = ""; }}
                className="btn-shine relative min-h-12 overflow-hidden rounded-full bg-accent px-7 py-3 font-display text-lg font-semibold text-accent-ink shadow-[0_10px_30px_-10px_var(--accent)] transition-[transform,box-shadow] duration-200 hover:shadow-[0_14px_36px_-8px_var(--accent)] active:scale-95"
              >
                Send message →
              </button>
              <p className="max-w-[16rem] text-xs text-muted">Opens your email app with this message filled in. Nothing is sent until you press send there.</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
