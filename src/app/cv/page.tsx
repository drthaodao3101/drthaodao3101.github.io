"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui";
import { Icon } from "@/lib/icons";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";
import cvSettings from "@/data/cv-settings.json";
import personal from "@/data/personal-info.json";
import education from "@/data/education.json";
import work from "@/data/work-experience.json";
import interests from "@/data/research-interests.json";
import publications from "@/data/publications.json";
import projects from "@/data/projects.json";
import certificates from "@/data/certificates.json";
import skills from "@/data/skills.json";
import clinical from "@/data/clinical.json";

type Variant = keyof typeof cvSettings.variants;
type Pub = (typeof publications)[number];

const LAST_UPDATED = "June 2026";

function pubsFor(section: string): Pub[] {
  switch (section) {
    case "publicationsTop":
      return publications.slice(0, 6);
    case "publicationsClinical":
      return publications.filter((p) => p.categories.includes("otolaryngology"));
    case "publicationsCS":
      return publications.filter((p) => p.categories.includes("computer-science"));
    default:
      return publications;
  }
}

export default function CvPage() {
  const { lang } = useLang();
  const t = dict.cvPage;
  const [variant, setVariant] = useState<Variant>(cvSettings.defaultVariant as Variant);
  const sections = cvSettings.variants[variant].sections as string[];

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-2 mt-6 border-b border-line pb-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
      {children}
    </h2>
  );

  return (
    <>
      <div className="no-print">
        <PageHeader eyebrow={dict.nav.cv[lang]} title={t.title[lang]} sub={t.intro[lang]} />
      </div>

      {/* Controls */}
      <div className="no-print mx-auto max-w-3xl px-5 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(cvSettings.variants) as Variant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  variant === v
                    ? "bg-navy text-white shadow-card"
                    : "border border-line text-muted hover:border-teal hover:text-teal"
                }`}
              >
                {cvSettings.variants[v].label[lang]}
              </button>
            ))}
          </div>
          <button onClick={() => window.print()} className="btn-primary">
            <Icon name="download" width={16} height={16} /> {t.print[lang]}
          </button>
        </div>
      </div>

      {/* Sheet */}
      <div className="mx-auto max-w-3xl px-5 py-8">
        <div className="cv-sheet rounded-2xl border border-line bg-white p-8 shadow-card sm:p-10">
          {/* Header always */}
          <header className="border-b-2 border-navy pb-4">
            <h1 className="font-display text-3xl font-bold text-navy">
              {personal.name}
              <span className="ml-2 text-lg font-medium text-muted">{personal.credentials}</span>
            </h1>
            <p className="mt-1 font-mono text-sm text-teal">{personal.title}</p>
            <p className="mt-2 text-sm text-muted">
              {personal.email} · {personal.location} · drthaodao3101.github.io
            </p>
          </header>

          {sections.includes("personal") && (
            <section>
              <Heading>{lang === "en" ? "Profile" : "Giới thiệu"}</Heading>
              <p className="text-sm leading-relaxed text-navy/90">{personal.intro[lang]}</p>
            </section>
          )}

          {sections.includes("education") && (
            <section>
              <Heading>{lang === "en" ? "Education" : "Học vấn"}</Heading>
              {education.map((e) => (
                <div key={e.id} className="mb-2 flex justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-navy">{e.degree[lang]}</p>
                    <p className="text-sm text-muted">{e.institution[lang]}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted">{e.period}</span>
                </div>
              ))}
            </section>
          )}

          {sections.includes("work") && (
            <section>
              <Heading>{lang === "en" ? "Experience" : "Kinh nghiệm"}</Heading>
              {work.map((w) => (
                <div key={w.id} className="mb-2 flex justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-navy">{w.role[lang]}</p>
                    <p className="text-sm text-muted">{w.organization[lang]}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted">{w.period}</span>
                </div>
              ))}
            </section>
          )}

          {sections.includes("clinical") && (
            <section>
              <Heading>{lang === "en" ? "Clinical Expertise" : "Chuyên môn lâm sàng"}</Heading>
              <p className="text-sm leading-relaxed text-navy/90">
                {clinical.expertise.map((x) => x[lang]).join(" · ")}
              </p>
            </section>
          )}

          {sections.includes("interests") && (
            <section>
              <Heading>{lang === "en" ? "Research Interests" : "Hướng nghiên cứu"}</Heading>
              <p className="text-sm leading-relaxed text-navy/90">
                {interests.map((x) => x[lang]).join(" · ")}
              </p>
            </section>
          )}

          {sections.some((s) => s.startsWith("publications")) && (
            <section>
              <Heading>{lang === "en" ? "Selected Publications" : "Công bố tiêu biểu"}</Heading>
              <ol className="space-y-2">
                {pubsFor(sections.find((s) => s.startsWith("publications"))!).map((p) => (
                  <li key={p.id} className="text-sm leading-snug text-navy/90">
                    <span className="font-semibold">{p.title}.</span> <span className="text-muted">{p.authors}.</span>{" "}
                    <span className="italic">{p.venue}</span>, {p.year}.
                    {p.role ? <span className="ml-1 font-mono text-xs text-teal">[{p.role}]</span> : null}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {sections.includes("projects") && (
            <section>
              <Heading>{lang === "en" ? "Projects" : "Dự án"}</Heading>
              {projects.map((p) => (
                <div key={p.id} className="mb-2">
                  <p className="text-sm font-semibold text-navy">{p.title[lang]}</p>
                  <p className="text-sm text-muted">{p.description[lang]}</p>
                </div>
              ))}
            </section>
          )}

          {sections.includes("certificates") && (
            <section>
              <Heading>{lang === "en" ? "Certificates & Courses" : "Chứng chỉ & Khóa học"}</Heading>
              {certificates.map((c) => (
                <div key={c.id} className="mb-1 flex justify-between gap-4">
                  <p className="text-sm text-navy">
                    {c.title} <span className="text-muted">— {c.issuer}</span>
                  </p>
                  <span className="shrink-0 font-mono text-xs text-muted">{c.year}</span>
                </div>
              ))}
            </section>
          )}

          {sections.includes("skills") && (
            <section>
              <Heading>{lang === "en" ? "Skills" : "Kỹ năng"}</Heading>
              {skills.map((cat) => (
                <p key={cat.id} className="mb-1 text-sm text-navy/90">
                  <span className="font-semibold">{cat.category[lang]}:</span> {cat.skills.join(", ")}
                </p>
              ))}
            </section>
          )}

          {sections.includes("contact") && (
            <section>
              <Heading>{lang === "en" ? "Contact" : "Liên hệ"}</Heading>
              <p className="text-sm text-navy/90">
                {personal.email} · {personal.clinicalInstitution} · {personal.academicInstitution}
              </p>
            </section>
          )}

          <p className="mt-8 font-mono text-[10px] text-muted">
            {t.lastUpdated[lang]}: {LAST_UPDATED}
          </p>
        </div>
      </div>
    </>
  );
}
