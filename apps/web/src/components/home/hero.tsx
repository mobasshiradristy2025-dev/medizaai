import Image from "next/image";
import { Container } from "@/components/shared/container";
import { CONTACT } from "@/lib/constants";

const STATS = [
  { value: "১৩", label: "হাসপাতাল ও ডায়াগনস্টিক" },
  { value: "২০–৪০ মি.", label: "ওষুধ ডেলিভারি" },
  { value: "৩", label: "গাইড প্যাকেজ" },
];

const CHAT_OPTIONS = [
  { label: "ডাক্তার দেখাতে চাই", selected: true },
  { label: "গাইড লাগবে", selected: false },
  { label: "ওষুধ অর্ডার করতে চাই", selected: false },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      <Image
        src="/images/home/hero/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-900 via-brand-900/70 to-transparent md:bg-gradient-to-r md:from-brand-900 md:via-brand-900/70 md:to-[rgba(15,34,51,0)]"
      />

      <Container className="flex min-h-[654px] flex-col justify-center gap-4 py-6 md:min-h-[800px] md:py-[72px]">
        <div className="flex w-full max-w-[696px] flex-col items-start gap-4 md:gap-6">
          <span className="rounded-full bg-accent-100 px-[10px] py-[3px] text-xs leading-[18px] font-medium text-brand-900">
            রাজশাহীর জন্য
          </span>

          <h1 className="text-[32px] leading-[40px] font-bold text-white md:text-[44px] md:leading-[54px] lg:text-[56px] lg:leading-[67px]">
            রাজশাহীর সবচেয়ে সহজ স্বাস্থ্যসেবা
          </h1>

          <p className="text-[17px] leading-[26px] text-brand-100 md:text-base md:leading-7 lg:text-[20px] lg:leading-[30px]">
            ভিডিও কলে ডাক্তার, হাসপাতালে সঙ্গী গাইড আর ঘরে ওষুধ — সব এক জায়গায়, সহজ বাংলায়।
          </p>

          <form
            action="/doctors"
            method="get"
            className="flex w-full items-center gap-2 rounded-[12px] bg-white py-[6px] pr-[6px] pl-[14px] focus-within:ring-2 focus-within:ring-accent md:gap-4 md:rounded-[14px] md:py-2 md:pr-2 md:pl-6"
          >
            <span className="hidden text-base leading-6 font-medium whitespace-nowrap text-ink sm:inline">
              সেবা: ডাক্তার
            </span>
            <span aria-hidden className="hidden text-base text-line sm:inline">
              |
            </span>
            <input
              type="search"
              name="q"
              aria-label="ডাক্তার বা বিভাগ খুঁজুন"
              placeholder="ডাক্তার বা বিভাগ খুঁজুন"
              className="min-w-0 flex-1 bg-transparent text-base leading-6 text-ink outline-none placeholder:text-ink-3"
            />
            <button
              type="submit"
              className="rounded-[10px] bg-accent px-3 py-[8px] text-sm leading-[21px] font-semibold whitespace-nowrap text-brand-900 md:px-[26px] md:py-[13px] md:text-base md:leading-6"
            >
              খুঁজুন
            </button>
          </form>

          <dl className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-10 md:gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[22px] leading-[33px] font-bold text-accent md:text-[30px] md:leading-[45px]">
                  {stat.value}
                </dd>
                <p className="text-[13px] leading-5 text-brand-100 md:text-sm md:leading-[21px]" aria-hidden>
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <div className="w-full max-w-[358px] rounded-[16px] bg-white p-4 md:hidden">
          <p className="mb-2 text-[20px] leading-[30px] font-bold text-brand-900">
            আমাদের সঙ্গে কথা বলুন
          </p>
          <div className="flex flex-col gap-[10px]">
            {CHAT_OPTIONS.map((opt) => (
              <div
                key={opt.label}
                className={`flex items-center gap-[10px] rounded-[10px] border px-3 py-[10px] ${
                  opt.selected
                    ? "border-brand-700 bg-mint"
                    : "border-line bg-white"
                }`}
              >
                <span
                  className={`flex size-[18px] items-center justify-center rounded-full border ${
                    opt.selected ? "border-brand-700" : "border-line"
                  }`}
                >
                  {opt.selected && (
                    <span className="size-[10px] rounded-full bg-brand-700" />
                  )}
                </span>
                <span className="text-base leading-6 font-medium text-ink">
                  {opt.label}
                </span>
              </div>
            ))}
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center justify-center rounded-[10px] bg-brand-700 py-[13px] text-base leading-6 font-semibold text-white"
            >
              হোয়াটসঅ্যাপে চ্যাট করুন
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}