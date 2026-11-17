import Link from "next/link";
import type { MedicineCategory, MedicineCategoryKey } from "@/types/medicine";

type MedicineCategoryTabsProps = {
  categories: MedicineCategory[];
  active?: MedicineCategoryKey;
  q: string;
};

function buildHref(q: string, category?: MedicineCategoryKey) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const query = params.toString();
  return query ? `/medicines?${query}` : "/medicines";
}

export function MedicineCategoryTabs({
  categories,
  active,
  q,
}: MedicineCategoryTabsProps) {
  const tabs = [{ key: undefined, label: "সব" }, ...categories];

  return (
    <nav aria-label="ওষুধের ধরন">
      <ul className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <li key={tab.label}>
              <Link
                href={buildHref(q, tab.key)}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex h-10 items-center rounded-full border px-4 text-sm leading-[21px] font-medium transition-colors ${
                  isActive
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-line bg-white text-ink hover:border-brand-700"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}