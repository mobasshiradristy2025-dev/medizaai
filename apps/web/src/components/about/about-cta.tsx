import Link from "next/link";
import { Container } from "@/components/shared/container";
import { CONTACT } from "@/lib/constants";

export function AboutCta() {
  return (
    <section className="bg-brand-900 py-10 md:py-14">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[26px] leading-[34px] font-bold text-white md:text-[32px] md:leading-10">
          আজই আপনার প্রয়োজন জানান
        </h2>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/doctors"
            className="rounded-[8px] bg-accent px-6 py-[13px] text-base leading-6 font-semibold whitespace-nowrap text-brand-900 transition-opacity hover:opacity-90"
          >
            ডাক্তার দেখান
          </Link>
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[8px] bg-white px-6 py-[13px] text-base leading-6 font-semibold whitespace-nowrap text-brand-900 transition-colors hover:bg-brand-100"
          >
            হোয়াটসঅ্যাপে লিখুন
          </a>
        </div>
      </Container>
    </section>
  );
}