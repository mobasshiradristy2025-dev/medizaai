import type { MedicineCategoryKey } from "@/types/medicine";

type MedicineSearchBarProps = {
  defaultQuery: string;
  category?: MedicineCategoryKey;
};

export function MedicineSearchBar({
  defaultQuery,
  category,
}: MedicineSearchBarProps) {
  return (
    <form
      action="/medicines"
      method="get"
      role="search"
      className="flex gap-3"
    >
      {category && <input type="hidden" name="category" value={category} />}
      <input
        type="search"
        name="q"
        defaultValue={defaultQuery}
        aria-label="ওষুধের নাম বা সমস্যা"
        placeholder="ওষুধের নাম বা সমস্যা দিয়ে খুঁজুন"
        className="h-[50px] min-w-0 flex-1 rounded-[8px] border border-line bg-white px-4 text-base text-ink outline-none placeholder:text-ink-3 focus:border-brand-700"
      />
      <button
        type="submit"
        className="h-[50px] rounded-[8px] bg-brand-700 px-6 text-base font-semibold text-white transition-colors hover:bg-brand-900"
      >
        খুঁজুন
      </button>
    </form>
  );
}