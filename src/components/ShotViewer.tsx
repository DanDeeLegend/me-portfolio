"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Shot } from "@/data/projects";

const MIN = 1;
const MAX = 6;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Full-screen screenshot viewer with real zoom: wheel (cursor-anchored), pinch, double-click/tap, +/- buttons and keys,
 * drag to pan, arrows to move between shots, Esc to close. Rendered in a portal because project cards are transformed
 * (hover lift), which would otherwise trap a position:fixed overlay inside the card.
 */
export function ShotViewer({ shots, start, title, onClose }: { shots: Shot[]; start: number; title: string; onClose: () => void }) {
  const [index, setIndex] = useState(start);
  const [view, setView] = useState({ s: 1, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; s: number } | null>(null);
  const shot = shots[index];

  /** Keep the image from being dragged past its edges. */
  const bound = useCallback((s: number, x: number, y: number) => {
    const el = img.current;
    const st = stage.current;
    if (!el || !st) return { s, x, y };
    const mx = Math.max(0, (el.offsetWidth * s - st.clientWidth) / 2);
    const my = Math.max(0, (el.offsetHeight * s - st.clientHeight) / 2);
    return { s, x: clamp(x, -mx, mx), y: clamp(y, -my, my) };
  }, []);

  /** Zoom to `next`, keeping the point (px, py), measured from the stage centre, fixed on screen. */
  const zoomAt = useCallback(
    (next: number, px = 0, py = 0) =>
      setView((v) => {
        const s = clamp(next, MIN, MAX);
        const k = s / v.s;
        return s === MIN ? { s, x: 0, y: 0 } : bound(s, px - (px - v.x) * k, py - (py - v.y) * k);
      }),
    [bound],
  );

  const reset = useCallback(() => setView({ s: 1, x: 0, y: 0 }), []);
  const go = useCallback(
    (d: number) => {
      setIndex((i) => (i + d + shots.length) % shots.length);
      reset();
    },
    [shots.length, reset],
  );

  // Lock page scroll, restore focus on close, and keep keyboard focus inside the dialog.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stage.current?.parentElement?.querySelector<HTMLElement>("[data-close]")?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return onClose();
      if (e.key === "+" || e.key === "=") return zoomAt(view.s * 1.5);
      if (e.key === "-" || e.key === "_") return zoomAt(view.s / 1.5);
      if (e.key === "0") return reset();
      if (shots.length > 1 && e.key === "ArrowRight") return go(1);
      if (shots.length > 1 && e.key === "ArrowLeft") return go(-1);
      if (e.key === "Tab") {
        const f = stage.current?.parentElement?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view.s, zoomAt, reset, go, onClose, shots.length]);

  // Wheel needs a non-passive listener so the page behind never scrolls.
  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const r = st!.getBoundingClientRect();
      zoomAt(view.s * Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018)), e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
    }
    st.addEventListener("wheel", onWheel, { passive: false });
    return () => st.removeEventListener("wheel", onWheel);
  }, [view.s, zoomAt]);

  function down(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), s: view.s };
    }
    setDragging(true);
  }

  function move(e: React.PointerEvent) {
    const p = pointers.current.get(e.pointerId);
    if (!p) return;
    const st = stage.current!.getBoundingClientRect();
    if (pointers.current.size === 2 && pinch.current) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [a, b] = [...pointers.current.values()];
      const mid = { x: (a.x + b.x) / 2 - st.left - st.width / 2, y: (a.y + b.y) / 2 - st.top - st.height / 2 };
      zoomAt((pinch.current.s * Math.hypot(a.x - b.x, a.y - b.y)) / pinch.current.dist, mid.x, mid.y);
      return;
    }
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (view.s > 1) setView((v) => bound(v.s, v.x + dx, v.y + dy));
  }

  function up(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) setDragging(false);
  }

  function dbl(e: React.MouseEvent) {
    const r = stage.current!.getBoundingClientRect();
    if (view.s > 1.05) reset();
    else zoomAt(2.5, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
  }

  const btn =
    "grid h-11 min-w-11 place-items-center rounded-full border border-white/25 bg-white/10 px-3 text-lg text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-white";

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`${title} screenshot viewer`} className="fixed inset-0 z-[70] flex flex-col bg-black/90 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
        <p className="min-w-0 truncate font-mono text-xs sm:text-sm">
          {title} · {index + 1} / {shots.length} · {Math.round(view.s * 100)}%
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className={btn} onClick={() => zoomAt(view.s / 1.5)} aria-label="Zoom out" disabled={view.s <= MIN}>
            −
          </button>
          <button type="button" className={btn} onClick={() => zoomAt(view.s * 1.5)} aria-label="Zoom in" disabled={view.s >= MAX}>
            +
          </button>
          <button type="button" className={btn + " text-sm"} onClick={reset} aria-label="Reset zoom to fit">
            Fit
          </button>
          <button type="button" data-close className={btn} onClick={onClose} aria-label="Close viewer">
            ×
          </button>
        </div>
      </div>

      <div
        ref={stage}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onDoubleClick={dbl}
        className={`relative min-h-0 flex-1 touch-none select-none overflow-hidden ${view.s > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={shot.full ?? shot.src}
          ref={img}
          src={shot.full ?? shot.src}
          alt={shot.alt}
          draggable={false}
          className="absolute top-1/2 left-1/2 max-h-full max-w-full rounded-lg"
          style={{
            transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${view.s})`,
            transition: dragging ? "none" : "transform 0.18s ease-out",
          }}
        />
        {shots.length > 1 && (
          <>
            <button type="button" className={`${btn} absolute top-1/2 left-3 -translate-y-1/2`} onClick={() => go(-1)} aria-label="Previous screenshot" onPointerDown={(e) => e.stopPropagation()}>
              ‹
            </button>
            <button type="button" className={`${btn} absolute top-1/2 right-3 -translate-y-1/2`} onClick={() => go(1)} aria-label="Next screenshot" onPointerDown={(e) => e.stopPropagation()}>
              ›
            </button>
          </>
        )}
      </div>

      <p className="px-4 py-3 text-center text-xs text-white/70 sm:text-sm">
        Scroll, pinch or double-click to zoom · drag to move · arrow keys for next and previous · Esc to close
      </p>
    </div>,
    document.body,
  );
}
