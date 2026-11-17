import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/shared/container";
import { NavLinks } from "@/components/layout/nav-links";
import { CONTACT } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="flex items-center justify-between py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2 md:gap-[10px]">
          <span className="flex size-8 items-center justify-center rounded-[16px] bg-brand-700 text-base leading-6 font-bold text-white md:size-10 md:rounded-[20px] md:text-[20px] md:leading-[30px]">
            M
          </span>
          <span className="text-[22px] leading-[33px] font-bold text-brand-900 md:text-[26px] md:leading-[39px]">
            Medizaai
          </span>
        </Link>

        <Suspense fallback={null}>
          <NavLinks />
        </Suspense>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/account/bookings"
            className="hidden rounded-[10px] border border-brand-700 bg-surface px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-brand-700 md:inline-flex"
          >
            আমার বুকিং
          </Link>
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[10px] bg-brand-700 px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-white"
          >
            হোয়াটসঅ্যাপ
          </a>
        </div>
      </Container>
    </header>
  );
}