import type { HospitalType } from "@/data/hospitals";

type HospitalSearchBarProps = {
  defaultQuery: string;
  type?: HospitalType;
};

export function HospitalSearchBar({
  defaultQuery,
  type,
}: HospitalSearchBarProps) {
  return (
    <form
      action="/hospitals"
      method="get"
      role="search"
      className="flex gap-3"
    >
      {type && <input type="hidden" name="type" value={type} />}
      <input
        type="search"
        name="q"
        defaultValue={defaultQuery}
        aria-label="হাসপাতাল খুঁজুন"
        placeholder="নাম, এলাকা বা ধরন দিয়ে খুঁজুন"
        className="h-[50px] min-w-0 flex-1 rounded-[8px] border border-line bg-white px-4 text-base text-ink outline-none placeholder:text-ink-3 focus:border-brand-700"
      />
      <button
        type="submit"
        className="h-[50px] rounded-[8px] bg-brand-700 px-6 text-base font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-900"
      >
        খুঁজুন
      </button>
    </form>
  );
}