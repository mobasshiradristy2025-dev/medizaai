import Image from "next/image";
import Link from "next/link";
import type { Guide } from "@/types/guide";
import { formatPrice, toBn } from "@/lib/bn-number";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="flex h-full w-full flex-col gap-4 rounded-[8px] border border-line bg-surface p-3">
      <div className="relative aspect-[358/170] w-full overflow-hidden rounded-[6px] bg-ph">
        <Image
          src={guide.image}
          alt={guide.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[18px] leading-[27px] font-semibold text-ink">
          {guide.name}
        </h3>
        <span className="shrink-0 rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] whitespace-nowrap text-brand-900">
          অভিজ্ঞতা {toBn(guide.experienceYears)} বছর
        </span>
      </div>

      <p className="text-sm leading-[21px] text-ink-2">{guide.description}</p>

      <div className="mt-auto flex items-center justify-between gap-3">
        <p className="text-base leading-6 font-bold text-brand-700">
          {formatPrice(guide.startingPrice)} থেকে
        </p>
        <Link
          href={`/guides/${guide.slug}`}
          className="rounded-[8px] bg-brand-700 px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-900"
        >
          বুক করুন
        </Link>
      </div>
    </article>
  );
}