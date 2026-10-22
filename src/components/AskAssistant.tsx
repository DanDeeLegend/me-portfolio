"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Mascot } from "./Mascot";
import { MIN_CONFIDENT_SCORE, buildIndex, search, type Entry, type Hit } from "@/lib/search";

type Props = { entries: Entry[]; suggestions: string[]; email: string };

/**
 * "Ask" assistant, option C: searches the site's own content in the browser. No model, no network request, nothing stored.
 * A model-backed version can replace `search()` later behind a server route; the UI would not change.
 */
export function AskAssistant({ entries, suggestions, email }: Props) {
  const index = useMemo(() => buildIndex(entries), [entries]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [hits, setHits] = useState<Hit[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  function ask(q: string) {
    const text = q.trim();
    if (!text) return;
    setQuery(text);
    setAsked(text);
    setHits(search(index, text));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  function onPanelKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== "Tab" || !panel.current) return;
    const items = panel.current.querySelectorAll<HTMLElement>("a[href], button, input");
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const best = hits[0];
  const confident = best && best.score >= MIN_CONFIDENT_SCORE;
  const related = hits.slice(1).filter((h) => h.score >= MIN_CONFIDENT_SCORE * 0.6);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-keyshortcuts="Control+K Meta+K"
        className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-accent px-4 py-3 font-medium text-accent-ink shadow-lg transition-transform hover:scale-105 focus-visible:scale-105 motion-reduce:transition-none"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.4A8 8 0 1 1 21 12z" />
        </svg>
        Ask
      </button>

      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Ask about Daniel"
          onKeyDown={onPanelKey}
          className="fixed right-4 bottom-20 z-50 flex max-h-[min(34rem,calc(100dvh-7rem))] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
            <Mascot mood="smile" className="-mt-1 -ml-1 w-14 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold">Ask about Daniel</p>
              <p className="text-xs text-muted">
                Searches this site&apos;s content in your browser. It&apos;s search, not AI, and nothing you type is sent or saved.
              </p>
            </div>
            <button type="button" onClick={close} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line hover:bg-fg hover:text-bg">
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <form
            className="flex gap-2 border-b border-line p-3"
            onSubmit={(e) => {
              e.preventDefault();
              ask(query);
            }}
          >
            <label htmlFor="ask-input" className="sr-only">
              Your question
            </label>
            <input
              id="ask-input"
              ref={input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={200}
              placeholder="e.g. Is Daniel available for work?"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-line bg-bg px-4 py-2 text-sm placeholder:text-muted"
            />
            <button type="submit" className="rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg">
              Ask
            </button>
          </form>

          <div className="overflow-y-auto p-4 text-sm" aria-live="polite">
            {asked === null ? (
              <div>
                <p className="mb-2 text-muted">Try one of these:</p>
                <ul className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => ask(s)} className="rounded-full border border-line px-3 py-1.5 text-left hover:bg-fg hover:text-bg">
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : confident ? (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-xs tracking-wide text-accent uppercase">{best.entry.kind}</p>
                  <p className="mt-1 font-display text-base font-semibold">{best.entry.title}</p>
                  <p className="mt-1 leading-relaxed text-muted">{best.entry.text}</p>
                  <Link href={best.entry.href} onClick={close} className="mt-2 inline-block font-medium text-accent underline underline-offset-4">
                    Open this on the site →
                  </Link>
                </div>
                {related.length > 0 && (
                  <div>
                    <p className="mb-1 text-xs text-muted">Related</p>
                    <ul className="space-y-1">
                      {related.map((h) => (
                        <li key={h.entry.id}>
                          <Link href={h.entry.href} onClick={close} className="underline underline-offset-4 hover:text-accent">
                            {h.entry.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <p>I couldn&apos;t find that on this site, and I won&apos;t guess.</p>
                <p className="text-muted">
                  Try different words, or ask Daniel directly at{" "}
                  <a className="text-accent underline underline-offset-4" href={`mailto:${email}`}>
                    {email}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
