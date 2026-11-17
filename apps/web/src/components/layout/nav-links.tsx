"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {NAV_LINKS.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`text-base leading-6 whitespace-nowrap transition-colors hover:text-brand-700 ${
              active ? "font-semibold text-brand-700" : "font-medium text-ink-2"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}