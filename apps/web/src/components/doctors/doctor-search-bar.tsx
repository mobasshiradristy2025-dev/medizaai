import Link from "next/link";

type DoctorSearchBarProps = {
  defaultQuery: string;
  sortHref: string;
};

export function DoctorSearchBar({ defaultQuery, sortHref }: DoctorSearchBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        name="q"
        defaultValue={defaultQuery}
        aria-label="ডাক্তার খুঁজুন"
        placeholder="ডাক্তারের নাম বা বিভাগ দিয়ে খুঁজুন"
        className="h-[50px] min-w-0 flex-1 rounded-[8px] border border-line bg-white px-4 text-base text-ink outline-none placeholder:text-ink-3 focus:border-brand-700"
      />
      <button
        type="submit"
        className="h-[50px] rounded-[8px] bg-brand-700 px-5 text-base font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-900"
      >
        খুঁজুন
      </button>
      <Link
        href={sortHref}
        className="flex h-[50px] items-center justify-center rounded-[8px] border border-brand-700 bg-white px-5 text-base font-semibold whitespace-nowrap text-brand-700 transition-colors hover:bg-brand-100/40"
      >
        সাজান: ফি
      </Link>
    </div>
  );
}