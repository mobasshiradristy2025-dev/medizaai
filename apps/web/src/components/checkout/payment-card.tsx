export function PaymentCard() {
  return (
    <section
      aria-labelledby="payment-title"
      className="rounded-[12px] border border-line bg-surface p-6"
    >
      <h2
        id="payment-title"
        className="pb-4 text-[22px] leading-[33px] font-semibold text-ink"
      >
        পেমেন্ট
      </h2>

      <div
        role="radiogroup"
        aria-labelledby="payment-title"
        className="flex flex-col gap-3"
      >
        <label className="flex items-center gap-3 rounded-[8px] border border-brand-700 bg-brand-100/40 px-4 py-3 text-base leading-6 font-medium text-ink">
          <input
            type="radio"
            name="payment"
            value="cod"
            defaultChecked
            className="size-4 accent-brand-700"
          />
          ক্যাশ অন ডেলিভারি
        </label>

        <label className="flex items-center justify-between gap-3 rounded-[8px] border border-line bg-cream px-4 py-3 text-base leading-6 text-ink-3">
          <span className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="mobile"
              disabled
              className="size-4"
            />
            বিকাশ / নগদ
          </span>
          <span className="rounded-full bg-accent-100 px-[10px] py-[3px] text-xs leading-[18px] font-medium text-brand-900">
            শিগগিরই
          </span>
        </label>
      </div>
    </section>
  );
}