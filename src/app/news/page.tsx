"use client";

import { PageHeader, Reveal } from "@/components/ui";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";
import news from "@/data/news.json";

const typeStyle: Record<string, string> = {
  keynote: "bg-cyan/15 text-teal",
  paper: "bg-navy/10 text-navy",
  journal: "bg-teal/15 text-teal",
  poster: "bg-amber-100 text-amber-700",
  course: "bg-muted/15 text-muted",
};

const typeLabel: Record<string, { en: string; vi: string }> = {
  keynote: { en: "Keynote", vi: "Báo cáo mời" },
  paper: { en: "Paper", vi: "Bài báo" },
  journal: { en: "Journal", vi: "Tạp chí" },
  poster: { en: "Poster", vi: "Poster" },
  course: { en: "Course", vi: "Khóa học" },
};

export default function NewsPage() {
  const { lang } = useLang();
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.news[lang]}
        title={dict.sections.news[lang]}
        sub={
          lang === "en"
            ? "Talks, accepted papers, courses, and academic milestones."
            : "Các bài nói, công bố được chấp nhận, khóa học và dấu mốc học thuật."
        }
      />

      <section className="section">
        <ol className="relative ml-3 border-l border-line">
          {sorted.map((item, i) => (
            <li key={item.id} className="relative pb-9 pl-8 last:pb-0">
              <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-teal shadow-card" />
              <Reveal delay={i * 40}>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-muted">
                    {new Date(item.date).toLocaleDateString(lang === "en" ? "en-US" : "vi-VN", {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                      typeStyle[item.type] ?? "bg-muted/15 text-muted"
                    }`}
                  >
                    {(typeLabel[item.type] ?? { en: item.type, vi: item.type })[lang]}
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-navy">
                  {item.title[lang]}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail[lang]}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
