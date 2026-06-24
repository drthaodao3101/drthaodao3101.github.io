"use client";

import { PageHeader, SectionHeading, Reveal } from "@/components/ui";
import Timeline from "@/components/Timeline";
import ResearchInterests from "@/components/ResearchInterests";
import { Icon } from "@/lib/icons";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";
import personal from "@/data/personal-info.json";

export default function AboutPage() {
  const { lang } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.about[lang]}
        title={lang === "en" ? "About Me" : "Giới thiệu"}
        sub={personal.tagline[lang]}
      />

      <section className="section grid gap-12 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="font-display text-xl leading-relaxed text-navy">{personal.intro[lang]}</p>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">{personal.bio[lang]}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {personal.currentRoles[lang].map((r, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card flex items-start gap-3">
                  <Icon name={i === 0 ? "stethoscope" : "scholar"} width={20} height={20} className="mt-0.5 shrink-0 text-teal" />
                  <p className="text-sm font-medium leading-snug text-navy">{r}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-line shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={personal.profilePhoto} alt={personal.name} className="aspect-[3/4] w-full object-cover" />
          </div>
          <div className="mt-4 card">
            <p className="font-mono text-[11px] uppercase tracking-wider text-teal">Focus areas</p>
            <p className="mt-2 text-sm text-muted">
              {lang === "en"
                ? "AI in otolaryngology, radiology, gastroenterology, obstetrics, diagnostics, treatment support, and prognosis."
                : "AI trong Tai Mũi Họng, chẩn đoán hình ảnh, tiêu hóa, sản khoa, chẩn đoán, hỗ trợ điều trị và tiên lượng."}
            </p>
          </div>
        </aside>
      </section>

      <section className="bg-surface/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="Journey" title={dict.sections.timeline[lang]} />
          <div className="mt-9 max-w-3xl">
            <Timeline />
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow={dict.sections.researchInterests[lang]}
          title={dict.sections.researchInterests[lang]}
          sub={dict.sections.researchInterestsSub[lang]}
        />
        <div className="mt-9">
          <ResearchInterests />
        </div>
      </section>
    </>
  );
}
