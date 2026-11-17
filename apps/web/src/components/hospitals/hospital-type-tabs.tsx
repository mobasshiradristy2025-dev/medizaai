import Link from "next/link";
import type { HospitalType } from "@/data/hospitals";
import { toBn } from "@/lib/bn-number";

type HospitalTypeTabsProps = {
  types: readonly HospitalType[];
  active?: HospitalType;
  q: string;
  total: number;
};

function buildHref(q: string, type?: HospitalType) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (type) params.set("type", type);
  const query = params.toString();
  return query ? `/hospitals?${query}` : "/hospitals";
}

export function HospitalTypeTabs({
  types,
  active,
  q,
  total,
}: HospitalTypeTabsProps) {
  const tabs: { key: HospitalType | undefined; label: string }[] = [
    { key: undefined, label: `সব (${toBn(total)})` },
    ...types.map((type) => ({ key: type, label: type })),
  ];

  return (
    <nav aria-label="হাসপাতালের ধরন">
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