"use client";

import { MotionConfig } from "motion/react";

// reducedMotion="user" makes every animation respect the OS "reduce motion" setting.
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
