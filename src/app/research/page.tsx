"use client";

import { PageHeader } from "@/components/ui";
import PublicationList from "@/components/PublicationList";
import ProfileLinks from "@/components/ProfileLinks";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";

export default function ResearchPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHeader
        eyebrow={dict.sections.publications[lang]}
        title={dict.sections.publications[lang]}
        sub={dict.sections.publicationsSub[lang]}
      />
      <section className="section">
        <div className="mb-10">
          <ProfileLinks variant="outline" />
        </div>
        <PublicationList />
      </section>
    </>
  );
}
