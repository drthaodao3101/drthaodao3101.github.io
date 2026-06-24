"use client";

import { Icon } from "@/lib/icons";
import social from "@/data/social-links.json";

const entries = [
  { key: "googleScholar", icon: "scholar", label: "Google Scholar" },
  { key: "researchGate", icon: "external", label: "ResearchGate" },
  { key: "orcid", icon: "orcid", label: "ORCID" },
  { key: "github", icon: "github", label: "GitHub" },
  { key: "linkedin", icon: "linkedin", label: "LinkedIn" },
] as const;

export default function ProfileLinks({ variant = "solid" }: { variant?: "solid" | "outline" }) {
  return (
    <div className="flex flex-wrap gap-3">
      {entries.map((e) => {
        const href = (social as Record<string, string>)[e.key];
        const disabled = !href;
        const cls =
          variant === "solid"
            ? "bg-navy text-white hover:bg-teal"
            : "border border-line text-navy hover:border-teal hover:text-teal";
        if (disabled) {
          return (
            <span
              key={e.key}
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-dashed border-line px-3.5 py-2 text-sm text-muted/60"
              title="Link not set — add it in src/data/social-links.json"
            >
              <Icon name={e.icon} width={16} height={16} /> {e.label}
            </span>
          );
        }
        return (
          <a
            key={e.key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold shadow-card transition-all hover:shadow-lift ${cls}`}
          >
            <Icon name={e.icon} width={16} height={16} /> {e.label}
          </a>
        );
      })}
    </div>
  );
}
