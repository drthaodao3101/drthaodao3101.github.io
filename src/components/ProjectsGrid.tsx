"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./ui";
import { Icon } from "@/lib/icons";
import projects from "@/data/projects.json";

const statusStyle: Record<string, string> = {
  active: "bg-cyan/10 text-teal border-cyan/30",
  published: "bg-teal/10 text-teal-700 border-teal/30",
  planned: "bg-surface text-muted border-line",
};

export default function ProjectsGrid({ limit }: { limit?: number }) {
  const { lang } = useLang();
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((p, i) => (
        <Reveal key={p.id} delay={i * 50}>
          <article className="card card-hover flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-cyan">
                <Icon name="layers" width={19} height={19} />
              </span>
              <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusStyle[p.status] ?? statusStyle.planned}`}>
                {p.status}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-navy">
              {p.title[lang as "en" | "vi"]}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {p.description[lang as "en" | "vi"]}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-teal">
              {p.role[lang as "en" | "vi"]}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.technologies.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            {(p.repo || p.demo || p.paper) && (
              <div className="mt-4 flex flex-wrap gap-3 border-t border-line pt-3 text-sm">
                {p.repo && <a href={p.repo} className="link-inline" target="_blank" rel="noopener noreferrer"><Icon name="github" width={15} height={15} /> Code</a>}
                {p.demo && <a href={p.demo} className="link-inline" target="_blank" rel="noopener noreferrer"><Icon name="external" width={15} height={15} /> Demo</a>}
                {p.paper && <a href={p.paper} className="link-inline" target="_blank" rel="noopener noreferrer"><Icon name="scholar" width={15} height={15} /> Paper</a>}
              </div>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
