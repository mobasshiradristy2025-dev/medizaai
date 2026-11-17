import Link from "next/link";
import { Container } from "@/components/shared/container";
import { toBn } from "@/lib/bn-number";
import {
  CONTACT,
  FOOTER_COMPANY_LINKS,
  FOOTER_SERVICE_LINKS,
  SOCIAL_LINKS,
} from "@/lib/constants";

type FooterLink = { label: string; href: string };

async function CopyrightYear() {
  "use cache";
  return toBn(new Date().getFullYear());
}

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <h3 className="text-base leading-6 font-semibold text-accent">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm leading-[21px] text-brand-100 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-900">
      <Container className="pt-12 pb-8 md:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-[28px] leading-[42px] font-bold text-white"
            >
              Medizaai
            </Link>
            <p className="text-sm leading-6 text-brand-100">
              ডাক্তার, গাইড, ওষুধ ও হাসপাতাল তথ্য — রাজশাহীর মানুষের জন্য এক
              জায়গায়।
            </p>
            <ul className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="block size-9 rounded-full bg-brand-700 transition-colors hover:bg-brand-100/40"
                  />
                </li>
              ))}
            </ul>
          </div>

          <LinkColumn title="সেবা" links={FOOTER_SERVICE_LINKS} />
          <LinkColumn title="কোম্পানি" links={FOOTER_COMPANY_LINKS} />

          {/* Contact */}
          <div className="flex flex-col gap-[10px]">
            <h3 className="text-base leading-6 font-semibold text-accent">
              যোগাযোগ
            </h3>
            <ul className="flex flex-col gap-3 text-sm leading-[21px] text-brand-100">
              <li>হোয়াটসঅ্যাপ: {CONTACT.whatsappDisplay}</li>
              <li>{CONTACT.location}</li>
              <li>জরুরি: {CONTACT.emergency}</li>
              <li>স্বাস্থ্য বাতায়ন: {CONTACT.healthHotline}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 text-[13px] leading-5 text-brand-100 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> Medizaai সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p>
            আমরা কুকি ব্যবহার করি ·{" "}
            <Link href="/privacy" className="hover:text-white hover:underline">
              গোপনীয়তা নীতি
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}