"use client";

import { useState } from "react";
import { PageHeader, Reveal } from "@/components/ui";
import { Icon } from "@/lib/icons";
import ProfileLinks from "@/components/ProfileLinks";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";
import personal from "@/data/personal-info.json";

function buildVCard() {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Dao;Thao Thi Phuong;;Dr.;MD, MSc",
    "FN:Thao Thi Phuong Dao, MD, MSc",
    "TITLE:ENT Doctor | Computer Scientist | Medical AI Researcher",
    `ORG:${personal.clinicalInstitution};${personal.academicInstitution}`,
    `EMAIL;TYPE=INTERNET:${personal.email}`,
    "URL:https://drthaodao3101.github.io",
    `ADR;TYPE=WORK:;;${personal.location};;;;`,
    "END:VCARD",
  ].join("\r\n");
}

export default function ContactPage() {
  const { lang } = useLang();
  const t = dict.contactForm;

  const [form, setForm] = useState({ name: "", email: "", affiliation: "", purpose: "collaboration", message: "" });
  const [spam, setSpam] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus(t.fillError[lang]);
      return;
    }
    if (spam.trim() !== "5") {
      setStatus(t.spamError[lang]);
      return;
    }
    const purposeLabel = (t.purposeOptions as Record<string, { en: string; vi: string }>)[form.purpose][lang];
    const subject = `[Portfolio] ${purposeLabel} — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Affiliation: ${form.affiliation}`,
      `Purpose: ${purposeLabel}`,
      "",
      form.message,
    ].join("\n");
    setStatus(t.opening[lang]);
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function downloadVCard() {
    const blob = new Blob([buildVCard()], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Thao_Thi_Phuong_Dao.vcf";
    a.click();
    URL.revokeObjectURL(url);
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20";

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.contact[lang]}
        title={dict.sections.contact[lang]}
        sub={
          lang === "en"
            ? "For research collaboration, clinical or academic discussion, speaking, and review invitations."
            : "Để hợp tác nghiên cứu, trao đổi lâm sàng hoặc học thuật, mời báo cáo và phản biện."
        }
      />

      <section className="section grid gap-10 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <Reveal>
            <div className="card space-y-4">
              {[
                { icon: "mail", label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                { icon: "stethoscope", label: lang === "en" ? "Clinical" : "Lâm sàng", value: personal.clinicalInstitution },
                { icon: "building", label: lang === "en" ? "Academic" : "Học thuật", value: personal.academicInstitution },
                { icon: "pin", label: lang === "en" ? "Location" : "Địa điểm", value: personal.location },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <Icon name={row.icon} width={18} height={18} className="mt-0.5 shrink-0 text-teal" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{row.label}</p>
                    {row.href ? (
                      <a href={row.href} className="link-inline text-sm font-medium text-navy">
                        {row.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-navy">{row.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="card">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-teal">{dict.sections.profiles[lang]}</p>
              <ProfileLinks variant="outline" />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <button onClick={downloadVCard} className="btn-secondary w-full justify-center">
              <Icon name="download" width={16} height={16} /> {t.vcard[lang]}
            </button>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="card">
            <h2 className="font-display text-xl font-semibold text-navy">{t.title[lang]}</h2>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">{t.name[lang]}</span>
                  <input className={inputCls} value={form.name} onChange={set("name")} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">{t.email[lang]}</span>
                  <input type="email" className={inputCls} value={form.email} onChange={set("email")} />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">{t.affiliation[lang]}</span>
                  <input className={inputCls} value={form.affiliation} onChange={set("affiliation")} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">{t.purpose[lang]}</span>
                  <select className={inputCls} value={form.purpose} onChange={set("purpose")}>
                    {Object.entries(t.purposeOptions).map(([k, v]) => (
                      <option key={k} value={k}>
                        {(v as { en: string; vi: string })[lang]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-navy">{t.message[lang]}</span>
                <textarea rows={5} className={inputCls} value={form.message} onChange={set("message")} />
              </label>

              <label className="block max-w-[260px]">
                <span className="mb-1.5 block text-sm font-medium text-navy">{t.spam[lang]}</span>
                <input className={inputCls} value={spam} onChange={(e) => setSpam(e.target.value)} inputMode="numeric" />
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <button onClick={submit} className="btn-primary">
                  <Icon name="mail" width={16} height={16} /> {t.send[lang]}
                </button>
                {status && <span className="text-sm text-muted">{status}</span>}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
