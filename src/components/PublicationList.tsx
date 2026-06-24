"use client";

import { useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./ui";
import { Icon } from "@/lib/icons";
import { dict } from "@/lib/i18n";
import publications from "@/data/publications.json";

type Pub = (typeof publications)[number];

const FILTERS = [
  "all",
  "otolaryngology",
  "computer-science",
  "medical-image-analysis",
  "journal",
  "conference",
  "preprint",
  "poster",
] as const;

export function PublicationCard({ pub }: { pub: Pub }) {
  const { lang } = useLang();
  return (
    <article className="card card-hover">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-semibold text-teal">{pub.year}</span>
        {pub.role && (
          <span className="rounded-full bg-navy/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-navy/70">
            {pub.role}
          </span>
        )}
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-navy">
        {pub.title}
      </h3>
      {pub.authors && (
        <p className="mt-2 text-[13px] leading-relaxed text-muted">{pub.authors}</p>
      )}
      <p className="mt-2 text-sm font-medium italic text-navy/80">{pub.venue}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
        <div className="flex flex-wrap gap-1.5">
          {pub.tags?.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        {pub.link ? (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="link-inline text-sm">
            <Icon name="external" width={15} height={15} /> {dict.research.link[lang]}
          </a>
        ) : (
          <span className="font-mono text-[11px] text-muted/60">{dict.research.noLink[lang]}</span>
        )}
      </div>
    </article>
  );
}

export default function PublicationList() {
  const { lang } = useLang();
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return publications
      .filter((p) => active === "all" || p.categories.includes(active))
      .filter((p) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.venue.toLowerCase().includes(q) ||
          (p.authors ?? "").toLowerCase().includes(q) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => b.year - a.year);
  }, [active, query]);

  const label = (f: string) =>
    f === "all" ? dict.research.filterAll[lang] : (dict.research.filters as any)[f]?.[lang] ?? f;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all ${
                active === f
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-white text-navy/70 hover:border-teal hover:text-teal"
              }`}
            >
              {label(f)}
            </button>
          ))}
        </div>
        <div className="relative lg:w-64">
          <Icon name="search" width={16} height={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "en" ? "Search publications…" : "Tìm công bố…"}
            className="w-full rounded-xl border border-line bg-white py-2 pl-9 pr-3 text-sm text-navy placeholder:text-muted/70 focus:border-teal"
          />
        </div>
      </div>

      <p className="mt-4 font-mono text-xs text-muted">
        {filtered.length} {dict.research.count[lang]}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line bg-surface py-12 text-center text-sm text-muted">
          {dict.research.empty[lang]}
        </p>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 6) * 40}>
              <PublicationCard pub={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
