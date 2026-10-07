"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Final value, already verified. The animation only ever ends on this number. */
  value: number;
  decimals?: number;
  suffix?: string;
}

/**
 * Counts up to a verified value once, when it scrolls into view. Screen
 * readers and reduced-motion users get the final value immediately.
 */
export function CountUp({ value, decimals = 0, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const final = `${value.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    // Server HTML and no-JS readers get the final value; the count starts only once visible.
    if (reduce) return;
    if (!inView) {
      const id = requestAnimationFrame(() => setShown(0));
      return () => cancelAnimationFrame(id);
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(v),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{`${shown.toFixed(decimals)}${suffix}`}</span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
