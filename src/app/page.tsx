"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import ResearchInterests from "@/components/ResearchInterests";
import ProjectsGrid from "@/components/ProjectsGrid";
import Timeline from "@/components/Timeline";
import ProfileLinks from "@/components/ProfileLinks";
import { PublicationCard } from "@/components/PublicationList";
import { SectionHeading, Reveal } from "@/components/ui";
import { Icon } from "@/lib/icons";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";
import publications from "@/data/publications.json";
import clinical from "@/data/clinical.json";

export default function HomePage() {
  const { lang } = useLang();
  const featured = [...publications].sort((a, b) => b.year - a.year).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Research interests */}
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

      {/* Timeline */}
      <section className="bg-surface/60 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Journey" title={dict.sections.timeline[lang]} />
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              {lang === "en"
                ? "Two disciplines, one trajectory — from clinical medicine to computer science, each building on the last."
                : "Hai chuyên ngành, một hành trình — từ y học lâm sàng đến khoa học máy tính, mỗi bước kế thừa bước trước."}
            </p>
            <Link href="/about/" className="btn-ghost mt-6">
              {dict.cta.readMore[lang]} <Icon name="external" width={15} height={15} />
            </Link>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Featured publications */}
      <section className="section">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow={dict.sections.publications[lang]}
            title={lang === "en" ? "Selected Publications" : "Công bố tiêu biểu"}
            sub={dict.sections.publicationsSub[lang]}
          />
          <Link href="/research/" className="btn-ghost hidden shrink-0 sm:inline-flex">
            {dict.cta.viewAll[lang]} <Icon name="external" width={15} height={15} />
          </Link>
        </div>
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <PublicationCard pub={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-7">
          <ProfileLinks variant="outline" />
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-surface/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow={dict.sections.featuredProjects[lang]}
              title={dict.sections.featuredProjects[lang]}
              sub={dict.sections.projectsSub[lang]}
            />
            <Link href="/projects/" className="btn-ghost hidden shrink-0 sm:inline-flex">
              {dict.cta.viewAll[lang]} <Icon name="external" width={15} height={15} />
            </Link>
          </div>
          <div className="mt-9">
            <ProjectsGrid limit={4} />
          </div>
        </div>
      </section>

      {/* Clinical CTA strip */}
      <section className="section">
        <div className="overflow-hidden rounded-2xl border border-line bg-navy text-white shadow-lift">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">{dict.sections.clinicalExpertise[lang]}</span>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">
                {lang === "en" ? "Clinical depth, computational reach." : "Chiều sâu lâm sàng, tầm vóc tính toán."}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{clinical.disclaimer[lang]}</p>
              <Link href="/clinical/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan px-4 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-white">
                {dict.sections.clinicalExpertise[lang]} <Icon name="external" width={15} height={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 self-center">
              {clinical.expertise.slice(0, 4).map((c) => (
                <div key={c.en} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                  <Icon name={c.icon} width={18} height={18} className="text-cyan" />
                  <span className="text-[13px] font-medium leading-tight">{c[lang]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
