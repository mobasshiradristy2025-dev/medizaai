import { Container } from "@/components/shared/container";
import { CONTACT } from "@/lib/constants";

export function TopBar() {
  return (
    <div className="hidden bg-brand-900 text-[13px] leading-5 text-brand-100 md:block">
      <Container className="flex items-center justify-between gap-4 py-2">
        <p className="hidden md:block">
          রাজশাহীর বিশ্বস্ত স্বাস্থ্যসেবা · হোয়াটসঅ্যাপ: {CONTACT.whatsappDisplay}
        </p>
        <p className="flex items-center gap-3 whitespace-nowrap">
          <span>জরুরি: {CONTACT.emergency}</span>
          <span aria-hidden>|</span>
          <span>বাংলা · EN</span>
        </p>
      </Container>
    </div>
  );
}