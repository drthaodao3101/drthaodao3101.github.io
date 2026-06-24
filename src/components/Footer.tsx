"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { dict } from "@/lib/i18n";
import { Icon } from "@/lib/icons";
import personal from "@/data/personal-info.json";
import social from "@/data/social-links.json";

export default function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  const socials = [
    { href: social.googleScholar, icon: "scholar", label: "Google Scholar" },
    { href: social.github, icon: "github", label: "GitHub" },
    { href: social.orcid, icon: "orcid", label: "ORCID" },
    { href: social.linkedin, icon: "linkedin", label: "LinkedIn" },
    { href: social.researchGate, icon: "external", label: "ResearchGate" },
  ].filter((s) => s.href);

  return (
    <footer className="no-print mt-24 border-t border-line bg-navy text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-white">{personal.name}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan">{personal.credentials} · {personal.vietnameseName}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">{dict.footer.note[lang]}</p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">{dict.nav.contact[lang]}</p>
          <a href={`mailto:${personal.email}`} className="block text-white/80 hover:text-cyan">{personal.email}</a>
          <p className="mt-2 text-white/60">{personal.clinicalInstitution}</p>
          <p className="text-white/60">{personal.academicInstitution}</p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">{dict.sections.profiles[lang]}</p>
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-white/75 transition-colors hover:border-cyan hover:text-cyan"
              >
                <Icon name={s.icon} width={14} height={14} />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {personal.name}. All rights reserved.</span>
          <span className="font-mono">{dict.footer.built[lang]}</span>
        </div>
      </div>
    </footer>
  );
}
