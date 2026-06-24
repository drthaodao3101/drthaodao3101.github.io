"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { dict } from "@/lib/i18n";
import { Icon } from "@/lib/icons";
import personal from "@/data/personal-info.json";

export default function Hero() {
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <HeroBackdrop />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pb-24 lg:pt-20">
        {/* Left: identity */}
        <div className="animate-fadeUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/5 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">
            <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-teal" />
            Physician · Scientist
          </span>

          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] text-navy sm:text-6xl">
            {personal.name}
          </h1>
          <p className="mt-1.5 font-display text-xl text-muted">
            {personal.vietnameseName} <span className="text-muted/60">· {personal.credentials}</span>
          </p>

          <p className="mt-4 bg-gradient-to-r from-navy via-teal to-cyan bg-clip-text font-semibold text-transparent sm:text-lg">
            {personal.title}
          </p>

          {/* signature waveform underline */}
          <svg className="mt-3 h-5 w-56 text-teal/70" viewBox="0 0 240 24" fill="none" aria-hidden>
            <path
              d="M0 12h24l8-9 10 19 9-22 9 18 6-7h18l8-5 10 9 9-13 8 14h78"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hero-wave"
            />
          </svg>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
            {personal.intro[lang]}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/research/" className="btn-primary">
              <Icon name="search" width={17} height={17} /> {dict.cta.viewResearch[lang]}
            </Link>
            <a href={personal.cvFile} className="btn-secondary" download>
              <Icon name="download" width={17} height={17} /> {dict.cta.downloadCv[lang]}
            </a>
            <Link href="/research/" className="btn-ghost">
              {dict.cta.viewPublications[lang]}
            </Link>
            <Link href="/contact/" className="btn-ghost">
              {dict.cta.contactMe[lang]}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-2"><Icon name="building" width={16} height={16} className="text-teal" /> Thong Nhat Hospital</span>
            <span className="flex items-center gap-2"><Icon name="scholar" width={16} height={16} className="text-teal" /> University of Science, VNU-HCM</span>
          </div>
        </div>

        {/* Right: portrait */}
        <div className="relative mx-auto w-full max-w-sm animate-fadeUp lg:max-w-none" style={{ animationDelay: "120ms" }}>
          <div className="absolute -inset-3 rounded-[1.6rem] bg-gradient-to-tr from-teal/15 via-cyan/10 to-transparent blur-xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[1.4rem] border border-line bg-surface shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personal.profilePhoto}
              alt={personal.name}
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">Otolaryngology · Medical AI</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-line bg-white px-3 py-2 shadow-card sm:block">
            <p className="font-mono text-[10px] uppercase tracking-wider text-teal">Focus</p>
            <p className="text-xs font-medium text-navy">Laryngoscopy · CT · XAI</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Abstract backdrop: CT crosshair grid + neural nodes + waveform. */
function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,rgba(34,184,207,0.08),transparent_70%)]" />
      <svg className="absolute right-[-6%] top-[-10%] h-[520px] w-[520px] text-teal/10" viewBox="0 0 400 400" fill="none">
        <defs>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" stroke="currentColor" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#grid)" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1" />
        <path d="M200 20v360M20 200h360" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      {/* neural nodes */}
      <svg className="absolute left-[-4%] bottom-[-8%] h-72 w-72 text-cyan/15" viewBox="0 0 200 200" fill="none">
        <g stroke="currentColor" strokeWidth="0.8">
          <path d="M20 40 90 30 90 100 20 110Z" />
          <path d="M90 30 160 60 90 100" />
          <path d="M20 40 90 100M20 110 90 30" />
        </g>
        <g fill="currentColor">
          <circle cx="20" cy="40" r="3" /><circle cx="20" cy="110" r="3" />
          <circle cx="90" cy="30" r="3" /><circle cx="90" cy="100" r="3" />
          <circle cx="160" cy="60" r="3" />
        </g>
      </svg>
    </div>
  );
}
