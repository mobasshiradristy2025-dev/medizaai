import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { HOME_FAQS } from "@/data/faqs";

export function Faq() {
  return (
    <section className="bg-white py-12 md:py-[100px]">
      <Container className="flex flex-col gap-8 md:gap-[50px]">
        <SectionHeading title="সাধারণ প্রশ্ন" />

        <div className="flex flex-col gap-4">
          {HOME_FAQS.map((faq, index) => (
            <details
              key={faq.question}
              name="home-faq"
              open={index === 0}
              className="group rounded-[8px] border border-line bg-surface"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[8px] p-5 group-open:pb-3 focus-visible:outline-2 focus-visible:outline-brand-700 [&::-webkit-details-marker]:hidden">
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