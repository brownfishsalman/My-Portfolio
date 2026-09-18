"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const CARRIAGE = 0.72;

type Props = {
  children: ReactNode;
  className?: string;
  /** Force the inked state (for content that sits in the first viewport). */
  inked?: boolean;
};

/**
 * A block of content on the roll. Visible by default; with JS, blocks that sit
 * below the carriage wait faint on the paper and are stamped to full ink the
 * moment the carriage crosses their top edge. Ink never lifts.
 */
export function Recorded({ children, className, inked = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"unknown" | "faint" | "inked">(inked ? "inked" : "unknown");

  useEffect(() => {
    if (inked) return;
    const el = ref.current;
    if (!el) return;
    const line = window.innerHeight * CARRIAGE;
    if (el.getBoundingClientRect().top <= line) {
      setState("inked");
      return;
    }
    setState("faint");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("inked");
          io.disconnect();
        }
      },
      { rootMargin: `0px 0px -${Math.round((1 - CARRIAGE) * 100)}% 0px`, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inked]);

  return (
    <div
      ref={ref}
      className={["recorded", className].filter(Boolean).join(" ")}
      data-recorded={state === "unknown" ? undefined : state === "inked" ? "true" : "false"}
    >
      {children}
    </div>
  );
}
