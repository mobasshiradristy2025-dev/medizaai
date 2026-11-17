export function PrescriptionCard() {
  return (
    <section
      aria-labelledby="prescription-title"
      className="rounded-[12px] border border-line bg-surface p-6"
    >
      <h2
        id="prescription-title"
        className="pb-4 text-[22px] leading-[33px] font-semibold text-ink"
      >
        প্রেসক্রিপশন (প্রয়োজন হলে)
      </h2>

      <div
        aria-disabled
        className="flex flex-col items-center gap-1 rounded-[8px] border border-dashed border-line bg-cream px-5 py-8 text-center"
      >
        <p className="text-base leading-6 font-semibold text-ink">
          প্রেসক্রিপশনের ছবি আপলোড করুন
        </p>
        <p className="text-sm leading-[21px] text-ink-3">
          দ্বিতীয় ধাপে চালু হবে
        </p>
      </div>
    </section>
  );
}