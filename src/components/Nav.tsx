"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { dict } from "@/lib/i18n";

const links = [
  { href: "/", key: "home" },
  { href: "/about/", key: "about" },
  { href: "/research/", key: "research" },
  { href: "/projects/", key: "projects" },
  { href: "/clinical/", key: "clinical" },
  { href: "/skills/", key: "skills" },
  { href: "/news/", key: "news" },
  { href: "/certificates/", key: "certificates" },
  { href: "/hobbies/", key: "hobbies" },
  { href: "/contact/", key: "contact" },
] as const;

export default function Nav() {
  const { lang, toggle } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-white font-display text-lg leading-none shadow-card">
            <span className="-mt-0.5">td</span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[15px] font-semibold text-navy">Thao Thi Phuong Dao</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal">MD · MSc · PhD student</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-2.5 py-1.5 text-[13.5px] font-medium transition-colors ${
                isActive(l.href) ? "text-teal" : "text-navy/70 hover:text-navy"
              }`}
            >
              {dict.nav[l.key][lang]}
            </Link>
          ))}
          <LangButton lang={lang} onClick={toggle} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangButton lang={lang} onClick={toggle} />
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-navy"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive(l.href) ? "bg-teal/10 text-teal" : "text-navy/80 hover:bg-surface"
                }`}
              >
                {dict.nav[l.key][lang]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function LangButton({ lang, onClick }: { lang: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-navy transition-colors hover:border-teal hover:text-teal"
      aria-label="Switch language"
    >
      <span className={lang === "en" ? "text-teal" : "text-navy/40"}>EN</span>
      <span className="text-line">/</span>
      <span className={lang === "vi" ? "text-teal" : "text-navy/40"}>VI</span>
    </button>
  );
}
