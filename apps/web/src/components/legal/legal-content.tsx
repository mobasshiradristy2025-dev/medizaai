import { toBn } from "@/lib/bn-number";
import type { LegalSection } from "@/types/legal";

type LegalContentProps = {
  sections: LegalSection[];
  notice?: string;
};

export function LegalContent({ sections, notice }: LegalContentProps) {
  return (
    <article className="flex min-w-0 flex-col gap-6 rounded-[16px] border border-line bg-surface p-6 md:p-8">
      {notice && (
        <p className="rounded-[10px] bg-accent-100 px-4 py-3 text-sm leading-[21px] text-brand-900">
          {notice}
        </p>
      )}

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-title`}
          className="flex scroll-mt-6 flex-col gap-2"
        >
          <h2
            id={`${section.id}-title`}
            className="text-[22px] leading-[33px] font-semibold text-brand-900"
          >
            {toBn(index + 1)}. {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-7 text-ink-2">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}