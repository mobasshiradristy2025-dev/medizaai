import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CONTACT_FAQS } from "@/data/contact-faqs";

export function ContactFaq() {
  return (
    <section id="faq" className="scroll-mt-6 bg-white py-12 md:py-[72px]">
      <Container className="flex flex-col gap-8">
        <SectionHeading title="সাধারণ প্রশ্ন" />

        <div className="flex flex-col gap-8">
          {CONTACT_FAQS.map((faq, index) => (
            <details
              key={faq.question}
              name="contact-faq"
              open={index === 0}
              className="group rounded-[12px] border border-line bg-surface"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[12px] p-5 group-open:pb-3 focus-visible:outline-2 focus-visible:outline-brand-700 [&::-webkit-details-marker]:hidden">
                <span className="text-base leading-6 font-semibold text-ink">
                  {faq.question}
                </span>
                <Plus
                  size={18}
                  strokeWidth={2.5}
                  className="shrink-0 text-brand-700 group-open:hidden"
                />
                <Minus
                  size={18}
                  strokeWidth={2.5}
                  className="hidden shrink-0 text-brand-700 group-open:block"
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-[21px] text-ink-2">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}