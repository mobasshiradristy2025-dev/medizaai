export function GuideInfoBanner() {
  return (
    <aside className="flex items-start gap-5 rounded-[12px] border border-brand-700 bg-brand-100/40 p-6 sm:items-center">
      <span
        aria-hidden
        className="flex size-14 shrink-0 items-center justify-center rounded-[14px] bg-brand-100"
      >
        <span className="size-6 rounded-full bg-brand-700" />
      </span>

      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] leading-[27px] font-bold text-brand-900">
          গাইড সেবা কী?
        </h2>
        <p className="text-sm leading-[21px] text-ink-2">
          যারা হাসপাতাল বা ডাক্তার চেনেন না, গাইড তাদের সঙ্গে গিয়ে সাহায্য করেন।
          এটি সরাসরি সঙ্গে যাওয়ার সেবা, ভিডিও কল নয়।
        </p>
      </div>
    </aside>
  );
}