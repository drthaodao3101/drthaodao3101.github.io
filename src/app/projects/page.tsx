"use client";

import { PageHeader } from "@/components/ui";
import ProjectsGrid from "@/components/ProjectsGrid";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";

export default function ProjectsPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHeader
        eyebrow={dict.sections.featuredProjects[lang]}
        title={dict.sections.featuredProjects[lang]}
        sub={dict.sections.projectsSub[lang]}
      />
      <section className="section">
        <ProjectsGrid />
      </section>
    </>
  );
}
