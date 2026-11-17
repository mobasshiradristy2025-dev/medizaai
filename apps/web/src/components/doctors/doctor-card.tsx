import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/types/doctor";
import { formatPrice } from "@/lib/bn-number";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="mx-auto flex w-full max-w-[420px] flex-col gap-4 rounded-[12px] border border-line bg-surface p-5 lg:max-w-none">
      <div className="relative aspect-[342/250] w-full overflow-hidden rounded-[8px] bg-ph">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(min-width: 1024px) 384px, 420px"
          className="object-cover object-top"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[18px] leading-[27px] font-semibold text-ink">
          {doctor.name}
        </h3>
        <p className="text-right text-[13px] leading-5 text-ink-2">
          {doctor.qualification}
        </p>
      </div>

      <ul className="flex flex-wrap gap-2">
        <li className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] text-brand-900">
          {doctor.specialty}
        </li>
        {doctor.videoAvailable && (
          <li className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] text-brand-900">
            ভিডিও কলে পাওয়া যায়
          </li>
        )}
      </ul>

      <div className="flex items-center justify-between gap-3">
        <p className="text-[18px] leading-[27px] font-bold text-brand-700">
          ফি {formatPrice(doctor.fee)}
        </p>
        <Link
          href={`/doctors/${doctor.slug}`}
          className="rounded-[8px] bg-brand-700 px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-900"
        >
          বুক করুন
        </Link>
      </div>
    </article>
  );
}