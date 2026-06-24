"use client";

import { useState } from "react";
import { PageHeader, Reveal } from "@/components/ui";
import { Icon } from "@/lib/icons";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";
import certificates from "@/data/certificates.json";

const catLabel: Record<string, { en: string; vi: string }> = {
  all: { en: "All", vi: "Tất cả" },
  ai: { en: "AI / ML", vi: "AI / ML" },
  "health-ai": { en: "Health AI", vi: "AI Y tế" },
  math: { en: "Mathematics", vi: "Toán học" },
  programming: { en: "Programming", vi: "Lập trình" },
};

export default function CertificatesPage() {
  const { lang } = useLang();
  const [filter, setFilter] = useState("all");

  const cats = ["all", ...Array.from(new Set(certificates.map((c) => c.category)))];
  const list = filter === "all" ? certificates : certificates.filter((c) => c.category === filter);

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.certificates[lang]}
        title={dict.sections.certificates[lang]}
        sub={
          lang === "en"
            ? "Professional certifications and continuing education in AI, machine learning, and healthcare."
            : "Chứng chỉ chuyên môn và đào tạo liên tục về AI, máy học và y tế."
        }
      />

      <section className="section">
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                filter === c
                  ? "bg-navy text-white shadow-card"
                  : "border border-line text-muted hover:border-teal hover:text-teal"
              }`}
            >
              {(catLabel[c] ?? { en: c, vi: c })[lang]}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((c, i) => (
            <Reveal key={c.id} delay={i * 40}>
              <div className="card-hover flex h-full items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon name="award" width={22} height={22} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold leading-snug text-navy">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                    <span>{c.year}</span>
                    {c.credentialId && (
                      <span className="text-teal">
                        {lang === "en" ? "ID" : "Mã"}: {c.credentialId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
