import type { Doctor } from "@/types/doctor";

export function DoctorAbout({ doctor }: { doctor: Doctor }) {
  return (
    <section className="flex flex-col gap-3 rounded-[12px] border border-line bg-surface p-6">
      <h2 className="text-[20px] leading-[30px] font-semibold text-ink">
        পরিচিতি
      </h2>
      <p className="text-sm leading-[21px] text-ink-2">
        {doctor.bio ?? "[ডাক্তারের পরিচিতি ও বিশেষজ্ঞতা যোগ হবে]"}
      </p>
      <h3 className="text-base leading-6 font-semibold text-ink">ডিগ্রি</h3>
      <p className="text-sm leading-[21px] text-ink-2">{doctor.qualification}</p>
    </section>
  );
}