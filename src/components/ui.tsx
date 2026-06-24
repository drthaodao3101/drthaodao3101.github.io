"use client";

import React, { useEffect, useRef, useState } from "react";

/** Scroll-triggered reveal, respects prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
      <span className="h-px w-6 bg-teal/50" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-[15px] leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="border-b border-line bg-gradient-to-b from-surface to-white">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-14 sm:pt-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-navy sm:text-5xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{sub}</p>}
      </div>
    </div>
  );
}
