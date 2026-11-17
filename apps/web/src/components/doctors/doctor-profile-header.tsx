import Image from "next/image";
import type { Doctor } from "@/types/doctor";
import { formatPrice, toBn } from "@/lib/bn-number";

export function DoctorProfileHeader({ doctor }: { doctor: Doctor }) {
  const experience = doctor.experienceYears
    ? `${toBn(doctor.experienceYears)} বছর`
    : "[— বছর]";

  const stats = [
    { label: "ভিডিও কল ফি", value: formatPrice(doctor.fee) },
    { label: "অভিজ্ঞতা", value: experience },
    { label: "বিভাগ", value: doctor.specialty },
  ];

  return (
    <section className="flex flex-col gap-6 rounded-[12px] border border-line bg-surface p-6">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="relative size-40 shrink-0 overflow-hidden rounded-full bg-ph">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            priority
            sizes="160px"
            className="object-cover object-top"
          />
        </div>

        <div className="flex min-w-0 flex-col items-start gap-[10px]">
          <h1 className="text-[30px] leading-[45px] font-bold text-ink">
            {doctor.name}
          </h1>
          <ul className="flex flex-wrap gap-2">
            <li className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] text-brand-900">
              {doctor.specialty}
            </li>
            <li className="rounded-full bg-line/50 px-[10px] py-[3px] text-xs leading-[18px] text-ink-2">
              {doctor.qualification}
            </li>
          </ul>
          {doctor.videoAvailable && (
            <span className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] text-brand-700">
              ভিডিও কলে পাওয়া যায়
            </span>
          )}
        </div>
      </div>

      <dl className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 rounded-[12px] bg-brand-100/40 p-4"
          >
            <dt className="text-[13px] leading-[18px] text-ink-3">{stat.label}</dt>
            <dd className="text-[20px] leading-[30px] font-bold text-brand-700">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}