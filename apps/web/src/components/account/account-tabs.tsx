import Link from "next/link";
import { toBn } from "@/lib/bn-number";
import type { AccountGroup } from "@/types/account";

type AccountTabsProps = {
  phone: string;
  active: AccountGroup;
  bookingCount: number;
  orderCount: number;
};

export function AccountTabs({
  phone,
  active,
  bookingCount,
  orderCount,
}: AccountTabsProps) {
  const tabs = [
    { group: "booking" as const, label: `বুকিং (${toBn(bookingCount)})`, tab: "bookings" },
    { group: "order" as const, label: `অর্ডার (${toBn(orderCount)})`, tab: "orders" },
  ];

  return (
    <nav aria-label="বুকিং ও অর্ডার">
      <ul className="flex flex-wrap gap-3">
        {tabs.map((item) => {
          const isActive = item.group === active;
          const params = new URLSearchParams({ phone, tab: item.tab });
          return (
            <li key={item.group}>
              <Link
                href={`/account/bookings?${params.toString()}`}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex h-11 items-center rounded-full border px-5 text-sm leading-[21px] font-semibold transition-colors ${
                  isActive
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-line bg-white text-ink hover:border-brand-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}