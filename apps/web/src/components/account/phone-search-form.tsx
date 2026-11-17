import type { AccountGroup } from "@/types/account";

type PhoneSearchFormProps = {
  defaultPhone: string;
  tab: AccountGroup;
  error?: string;
};

export function PhoneSearchForm({ defaultPhone, tab, error }: PhoneSearchFormProps) {
  return (
    <section
      aria-labelledby="phone-search-title"
      className="rounded-[12px] border border-line bg-surface p-6"
    >
      <form
        action="/account/bookings"
        method="get"
        role="search"
        className="flex flex-col gap-3"
      >
        {tab === "order" && <input type="hidden" name="tab" value="orders" />}

        <h2
          id="phone-search-title"
          className="text-[22px] leading-[33px] font-semibold text-ink"
        >
          মোবাইল নম্বর দিয়ে খুঁজুন
        </h2>

        <label htmlFor="phone" className="text-sm leading-[21px] text-ink-2">
          মোবাইল নম্বর
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={defaultPhone}
            placeholder="01XXXXXXXXX"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "phone-error" : undefined}
            className={`h-[50px] min-w-0 flex-1 rounded-[8px] border bg-white px-4 text-base text-ink outline-none placeholder:text-ink-3 focus:border-brand-700 ${
              error ? "border-red-600" : "border-line"
            }`}
          />
          <button
            type="submit"
            className="h-[50px] rounded-[8px] bg-brand-700 px-6 text-base font-semibold text-white transition-colors hover:bg-brand-900"
          >
            খুঁজুন
          </button>
        </div>
        {error && (
          <p id="phone-error" role="alert" className="text-sm leading-[21px] text-red-600">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}