import { Container } from "@/components/shared/container";
import { CONTACT } from "@/lib/constants";

export function EmergencyStrip() {
  return (
    <div className="bg-accent-100 text-brand-900">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-[21px]">
        <p className="text-base leading-6 font-bold">
          জরুরি প্রয়োজনে কল করুন:{" "}
          <a href="tel:999" className="hover:underline">
            {CONTACT.emergency}
          </a>
        </p>
        <p className="text-sm leading-[21px] font-medium">
          স্বাস্থ্য বাতায়ন: {CONTACT.healthHotline}
        </p>
      </Container>
    </div>
  );
}