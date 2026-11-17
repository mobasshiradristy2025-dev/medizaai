import Link from "next/link";
import { Check } from "lucide-react";
import type { BookingSummary } from "@/types/booking";

export function SuccessCard({ summary }: { summary: BookingSummary }) {
  return (
    <section
      aria-labelledby="success-title"
      className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-5 rounded-[16px] border border-line bg-surface p-6 text-center shadow-[0px_8px_24px_0px_rgba(15,79,74,0.12)] md:p-10"
    >
      <span
        aria-hidden
        className="flex size-20 items-center justify-center rounded-full bg-success-100"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-success text-white">
          <Check size={20} strokeWidth={3} />
        </span>
      </span>

      <div className="flex flex-col gap-2">
        <h1
          id="success-title"
          className="text-[28px] leading-[38px] font-bold text-brand-900 md:text-[32px] md:leading-[44px]"
        >
          বুকিং গ্রহণ করা হয়েছে
        </h1>
        <p className="text-sm leading-[21px] text-ink-2">
          বুকিং নম্বর: {summary.bookingNumber}
        </p>
      </div>

      <dl className="flex w-full flex-col gap-3 rounded-[12px] bg-line/25 p-5 text-left">
        {summary.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4 text-sm leading-[21px]"
          >
            <dt className="text-ink-2">{row.label}</dt>
            <dd className="text-right font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 text-sm leading-[21px]">
          <dt className="text-ink-2">অবস্থা</dt>
          <dd>
            <span className="rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] font-medium text-brand-700">
              {summary.status}
            </span>
          </dd>
        </div>
      </dl>

      <p className="text-sm leading-[21px] text-ink-2">{summary.note}</p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/account/bookings"
          className="rounded-[8px] bg-brand-700 px-5 py-3 text-base leading-6 font-semibold text-white transition-colors hover:bg-brand-900"
        >
          আমার বুকিং দেখুন
        </Link>
        <Link
          href="/"
          className="rounded-[8px] border border-brand-700 bg-white px-5 py-3 text-base leading-6 font-semibold text-brand-700 transition-colors hover:bg-brand-100/40"
        >
          হোমে ফিরুন
        </Link>
      </div>
    </section>
  );
}