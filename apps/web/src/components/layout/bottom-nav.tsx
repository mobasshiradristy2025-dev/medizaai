"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Stethoscope, HandHeart, Pill, Building2 } from "lucide-react";

const TABS = [
  { href: "/", label: "হোম", match: (p: string) => p === "/" },
  { href: "/doctors", label: "ডাক্তার", match: (p: string) => p.startsWith("/doctors") },
  { href: "/guides", label: "গাইড", match: (p: string) => p.startsWith("/guides") },
  { href: "/medicines", label: "ওষুধ", match: (p: string) => p.startsWith("/medicines") || p.startsWith("/cart") || p.startsWith("/checkout") },
  { href: "/hospitals", label: "হাসপাতাল", match: (p: string) => p.startsWith("/hospitals") },
];

const ICONS = [Home, Stethoscope, HandHeart, Pill, Building2];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="মোবাইল নেভিগেশন"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface md:hidden"
    >
      <div className="mx-auto flex max-w-[390px] items-center justify-between px-2 py-[8px] pb-[10px]">
        {TABS.map((tab, i) => {
          const active = tab.match(pathname);
          const Icon = ICONS[i];
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-1 flex-col items-center gap-[2px]"
            >
              <span
                className={`flex size-[30px] items-center justify-center rounded-[6px] ${
                  active ? "bg-brand-700" : "bg-brand-100"
                }`}
              >
                <Icon
                  className={`size-5 ${active ? "text-white" : "text-ink-3"}`}
                  strokeWidth={2}
                />
              </span>
              <span
                className={`text-[12px] leading-[18px] ${
                  active ? "font-bold text-brand-700" : "font-medium text-ink-2"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}