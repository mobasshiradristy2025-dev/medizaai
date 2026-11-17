import Image from "next/image";
import Link from "next/link";
import type { Hospital } from "@/types/hospital";

export function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <article className="flex h-full w-full flex-col gap-[10px] rounded-[8px] border border-line bg-surface p-3">
      <div className="relative aspect-[256/150] w-full overflow-hidden rounded-[6px] bg-ph">
        <Image
          src={hospital.image}
          alt={hospital.name}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <h3 className="text-[18px] leading-[26px] font-semibold text-ink">
        {hospital.name}
      </h3>
      <p className="text-sm leading-[21px] text-ink-3">{hospital.area}</p>

      <div className="flex items-center justify-between gap-3">
        <span className="rounded-[6px] bg-brand-100/60 px-[10px] py-[3px] text-xs leading-[18px] text-ink-2">
          {hospital.type}
        </span>
        <Link
          href={`/guides?hospital=${hospital.slug}`}
          className="rounded-[6px] border border-line bg-white px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-brand-700 hover:text-brand-700"
        >
          গাইড নিন
        </Link>
      </div>
    </article>
  );
}