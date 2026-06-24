"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./ui";
import { Icon } from "@/lib/icons";
import interests from "@/data/research-interests.json";

export default function ResearchInterests({ limit }: { limit?: number }) {
  const { lang } = useLang();
  const items = limit ? interests.slice(0, limit) : interests;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.id} delay={i * 40}>
          <div className="card card-hover group h-full">
            <div className="flex items-start gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal/8 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                <Icon name={it.icon} width={21} height={21} />
              </span>
              <p className="pt-1.5 text-[15px] font-medium leading-snug text-navy">
                {it[lang]}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
