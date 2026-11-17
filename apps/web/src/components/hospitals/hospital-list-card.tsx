import Image from "next/image";
import Link from "next/link";
import type { Hospital } from "@/types/hospital";

export function HospitalListCard({ hospital }: { hospital: Hospital }) {
  const details = [hospital.address, hospital.phone]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      {/* Mobile: horizontal card (Figma mobile) */}
      <article className="flex w-full flex-col gap-[10px] rounded-[14px] border border-line bg-surface p-4 md:hidden">
        <div className="flex items-center gap-3">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-[12px] bg-ph">
            <Image
              src={hospital.image}
              alt={hospital.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h3 className="text-[17px] leading-[26px] font-semibold text-ink line-clamp-2">
              {hospital.name}
            </h3>
            <p className="text-[13px] leading-5 text-ink-2">
              {details || "[এলাকা] · [ফোন]"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] text-brand-700">
            {hospital.type}
          </span>
          <Link
            href={`/guides?hospital=${hospital.slug}`}
            className="rounded-[10px] border border-brand-700 bg-white px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-brand-700 transition-colors hover:bg-brand-100/40"
          >
            গাইড নিন
          </Link>
        </div>
      </article>

      {/* Desktop: original vertical card */}
      <article className="hidden h-full w-full flex-col gap-[10px] rounded-[12px] border border-line bg-surface p-[14px] md:flex">
        <div className="relative aspect-[354/130] w-full overflow-hidden rounded-[10px] bg-ph">
          <Image
            src={hospital.listImage ?? hospital.image}
            alt={hospital.name}
            fill
            sizes="(min-width: 1024px) 354px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <h3 className="text-[18px] leading-[26px] font-semibold text-ink">
          {hospital.name}
        </h3>
        <p className="text-sm leading-[21px] text-ink-2">
          {hospital.area} · {details || "[এলাকা] · [ফোন]"}
        </p>

        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] text-brand-700">
            {hospital.type}
          </span>
          <Link
            href={`/guides?hospital=${hospital.slug}`}
            className="rounded-[8px] border border-brand-700 bg-white px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-brand-700 transition-colors hover:bg-brand-100/40"
          >
            গাইড নিন
          </Link>
        </div>
      </article>
    </>
  );
}