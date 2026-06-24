"use client";

import { PageHeader, Reveal } from "@/components/ui";
import { Icon } from "@/lib/icons";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";
import clinical from "@/data/clinical.json";

export default function ClinicalPage() {
  const { lang } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.clinical[lang]}
        title={dict.sections.clinicalExpertise[lang]}
        sub={
          lang === "en"
            ? "Clinical practice in otolaryngology, with a focus on laryngology and head-and-neck imaging."
            : "Thực hành lâm sàng Tai Mũi Họng, tập trung vào thanh học và hình ảnh đầu–cổ."
        }
      />

      <section className="section">
        <div className="grid gap-4 sm:grid-cols-2">
          {clinical.expertise.map((item, i) => (
            <Reveal key={item.en} delay={i * 50}>
              <div className="card-hover flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon name={item.icon} width={22} height={22} />
                </span>
                <div className="pt-1">
                  <p className="font-display text-lg font-semibold leading-snug text-navy">{item[lang]}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
            <Icon name="shield" width={20} height={20} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-sm leading-relaxed text-amber-900">{clinical.disclaimer[lang]}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
