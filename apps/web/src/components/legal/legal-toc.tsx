"use client";

import { useEffect, useState } from "react";
import { toBn } from "@/lib/bn-number";

type LegalTocProps = {
  sections: { id: string; title: string }[];
};

export function LegalToc({ sections }: LegalTocProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -60% 0px" },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-labelledby="toc-title"
      className="self-start rounded-[12px] border border-line bg-surface p-5 lg:sticky lg:top-6"
    >
      <h2
        id="toc-title"
        className="pb-3 text-[20px] leading-[30px] font-semibold text-ink"
      >
        সূচি
      </h2>
      <ol className="flex flex-col gap-3">
        {sections.map((section, index) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                onClick={() => setActiveId(section.id)}
                className={`text-[15px] leading-6 transition-colors hover:text-brand-700 ${
                  active ? "font-semibold text-brand-700" : "text-ink-2"
                }`}
              >
                {toBn(index + 1)}. {section.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}