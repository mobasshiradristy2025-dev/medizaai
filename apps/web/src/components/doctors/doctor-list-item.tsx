import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/types/doctor";
import { formatPrice, toBn } from "@/lib/bn-number";

export function DoctorListItem({ doctor }: { doctor: Doctor }) {
  const experience = doctor.experienceYears
    ? `${toBn(doctor.experienceYears)} বছর`
    : "[— বছর]";

  return (
    <article className="flex flex-col gap-5 rounded-[12px] border border-line bg-surface p-5 sm:flex-row sm:items-center">
      <div className="relative size-[72px] shrink-0 overflow-hidden rounded-full bg-ph md:size-28">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="112px"
          className="object-cover object-top"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <h3 className="text-[20px] leading-[30px] font-semibold text-ink">
          {doctor.name}
        </h3>
        <ul className="flex flex-wrap gap-2">
          <li className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] text-brand-900">
            {doctor.specialty}
          </li>
          <li className="rounded-full bg-line/50 px-[10px] py-[3px] text-xs leading-[18px] text-ink-2">
            {doctor.qualification}
          </li>
        </ul>
        <p className="text-[13px] leading-[21px] text-ink-2">
          অভিজ্ঞতা: {experience}
        </p>
        {doctor.videoAvailable && (
          <span className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] text-brand-700">
            ভিডিও কলে পাওয়া যায়
          </span>
        )}
      </div>

      <div className="flex flex-col items-start sm:items-end">
        <p className="text-xs leading-[18px] text-ink-3">ভিডিও কল ফি</p>
        <p className="mt-2 text-[28px] leading-[42px] font-bold text-brand-700">
          {formatPrice(doctor.fee)}
        </p>
        <div className="mt-3 flex flex-col items-start gap-2 sm:items-end">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="rounded-[8px] bg-brand-700 px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-900"
          >
            বুক করুন
          </Link>
          <Link
            href={`/doctors/${doctor.slug}`}
            className="rounded-[8px] border border-brand-700 bg-white px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-brand-700 transition-colors hover:bg-brand-100/40"
          >
            প্রোফাইল দেখুন
          </Link>
        </div>
      </div>
    </article>
  );
}