"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./ui";
import education from "@/data/education.json";
import work from "@/data/work-experience.json";

type Item = {
  id: string;
  period: string;
  startYear: number;
  primary: string;
  secondary: string;
  type: string;
};

const dotColor: Record<string, string> = {
  medical: "bg-teal border-teal",
  cs: "bg-cyan border-cyan",
  clinical: "bg-navy border-navy",
};

export default function Timeline() {
  const { lang } = useLang();

  const items: Item[] = [
    ...education.map((e) => ({
      id: e.id,
      period: e.period,
      startYear: e.startYear,
      primary: e.degree[lang as "en" | "vi"],
      secondary: e.institution[lang as "en" | "vi"],
      type: e.type,
    })),
    ...work.map((w) => ({
      id: w.id,
      period: w.period,
      startYear: w.startYear,
      primary: w.role[lang as "en" | "vi"],
      secondary: w.organization[lang as "en" | "vi"],
      type: w.type,
    })),
  ].sort((a, b) => a.startYear - b.startYear);

  return (
    <div className="relative ml-1">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-teal/40 via-line to-cyan/40" />
      <div className="space-y-7">
        {items.map((it, i) => (
          <Reveal key={it.id} delay={i * 60}>
            <div className="relative pl-8">
              <span className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 bg-white ${dotColor[it.type] ?? "border-teal"}`}>
                <span className={`absolute inset-[3px] rounded-full ${dotColor[it.type]?.split(" ")[0] ?? "bg-teal"}`} />
              </span>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-teal">{it.period}</p>
              <p className="mt-1 font-display text-lg font-semibold leading-snug text-navy">{it.primary}</p>
              <p className="text-sm text-muted">{it.secondary}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
