/**
 * update-publications.ts
 * ------------------------------------------------------------------
 * Quarterly academic-profile sync helper.
 *
 * Fetches works from the public ORCID API and writes a *suggestion*
 * file to data/suggested-updates/YYYY-MM-DD-updates.json — it NEVER
 * overwrites src/data/publications.json directly. A human reviews the
 * suggestion (via the PR opened by the GitHub Action) and merges only
 * the entries they approve.
 *
 * Set the ORCID iD below (or via the ORCID_ID env var) once it exists.
 * Google Scholar and ResearchGate have no official public API and are
 * intentionally left as manual import (DOI / BibTeX) — see README.
 *
 * Usage:  ORCID_ID=0000-0000-0000-0000 npm run update-publications
 * ------------------------------------------------------------------
 */
import { mkdir, writeFile, readFile } from "fs/promises";
import { join } from "path";

const ORCID_ID = process.env.ORCID_ID || ""; // e.g. "0000-0002-1825-0097"
const SUGGEST_DIR = join(process.cwd(), "data", "suggested-updates");
const EXISTING = join(process.cwd(), "src", "data", "publications.json");

type OrcidWork = {
  title?: string;
  journal?: string;
  year?: string;
  doi?: string;
  url?: string;
  type?: string;
};

async function fetchOrcidWorks(id: string): Promise<OrcidWork[]> {
  const res = await fetch(`https://pub.orcid.org/v3.0/${id}/works`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`ORCID API ${res.status}`);
  const data = (await res.json()) as any;
  const groups = data.group ?? [];
  return groups.map((g: any) => {
    const summary = g["work-summary"]?.[0] ?? {};
    const ids = summary["external-ids"]?.["external-id"] ?? [];
    const doiEntry = ids.find((x: any) => x["external-id-type"] === "doi");
    return {
      title: summary.title?.title?.value,
      journal: summary["journal-title"]?.value,
      year: summary["publication-date"]?.year?.value,
      doi: doiEntry?.["external-id-value"],
      url: doiEntry ? `https://doi.org/${doiEntry["external-id-value"]}` : summary.url?.value,
      type: summary.type,
    };
  });
}

async function loadExistingTitles(): Promise<Set<string>> {
  try {
    const raw = await readFile(EXISTING, "utf8");
    const pubs = JSON.parse(raw) as Array<{ title: string }>;
    return new Set(pubs.map((p) => p.title.trim().toLowerCase()));
  } catch {
    return new Set();
  }
}

async function main() {
  if (!ORCID_ID) {
    console.log("ℹ No ORCID_ID set. Skipping automated fetch.");
    console.log("  Add your ORCID iD to src/data/social-links.json and pass ORCID_ID to enable.");
    return;
  }

  console.log(`→ Fetching ORCID works for ${ORCID_ID} …`);
  const works = await fetchOrcidWorks(ORCID_ID);
  const known = await loadExistingTitles();

  const newWorks = works.filter((w) => w.title && !known.has(w.title.trim().toLowerCase()));

  const today = new Date().toISOString().slice(0, 10);
  await mkdir(SUGGEST_DIR, { recursive: true });
  const outPath = join(SUGGEST_DIR, `${today}-updates.json`);

  const payload = {
    checkedAt: new Date().toISOString(),
    source: "orcid",
    orcidId: ORCID_ID,
    totalFromOrcid: works.length,
    newCount: newWorks.length,
    suggestions: newWorks.map((w) => ({
      title: w.title,
      venue: w.journal ?? "",
      year: w.year ? Number(w.year) : null,
      doi: w.doi ?? "",
      link: w.url ?? "",
      review: "pending",
    })),
  };

  await writeFile(outPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`✓ Wrote ${newWorks.length} suggestion(s) to ${outPath}`);
  console.log("  Review the PR, then copy approved entries into src/data/publications.json.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
