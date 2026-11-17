import Image from "next/image";
import type { Guide } from "@/types/guide";
import { toBn } from "@/lib/bn-number";

export function GuideProfileHeader({ guide }: { guide: Guide }) {
  return (
    <section className="rounded-[12px] border border-line bg-surface p-6">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="relative size-40 shrink-0 overflow-hidden rounded-[12px] bg-ph">
          <Image
            src={guide.image}
            alt={guide.name}
            fill
            priority
            sizes="160px"
            className="object-cover object-top"
          />
        </div>

        <div className="flex min-w-0 flex-col items-start gap-[10px]">
          <h1 className="text-[30px] leading-[45px] font-bold text-ink md:text-[32px] md:leading-[48px]">
            {guide.name}
          </h1>
          <span className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] whitespace-nowrap text-brand-900">
            অভিজ্ঞতা {toBn(guide.experienceYears)} বছর
          </span>
          <p className="text-base leading-6 text-ink-2">
            কাজের ক্ষেত্র: {guide.description}
          </p>
        </div>
      </div>
    </section>
  );
}