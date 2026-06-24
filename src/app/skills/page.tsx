"use client";

import { PageHeader, Reveal } from "@/components/ui";
import { Icon } from "@/lib/icons";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";
import skills from "@/data/skills.json";

export default function SkillsPage() {
  const { lang } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.skills[lang]}
        title={dict.sections.skills[lang]}
        sub={
          lang === "en"
            ? "A toolkit spanning the clinic, the research lab, and the codebase."
            : "Bộ công cụ trải dài từ phòng khám, phòng nghiên cứu đến lập trình."
        }
      />

      <section className="section grid gap-6 lg:grid-cols-3">
        {skills.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 80}>
            <div className="card h-full">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-cyan">
                  <Icon name={cat.icon} width={20} height={20} />
                </span>
                <h2 className="font-display text-lg font-semibold text-navy">{cat.category[lang]}</h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
