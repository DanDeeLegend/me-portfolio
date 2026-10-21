"use client";

import { motion } from "motion/react";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "var(--glow)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 sm:px-8 sm:pt-28 sm:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-xs text-muted"
        >
          {site.availability} · {site.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tighter"
        >
          Heyaa I&apos;m Daniel
          <br />
          a.k.a <span className="text-accent">Dannybouy.</span>
          <br />
          <span className="text-muted">I do the unthinkable with </span>
          <span className="text-accent">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 max-w-2xl text-lg text-muted sm:text-xl"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-3"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
