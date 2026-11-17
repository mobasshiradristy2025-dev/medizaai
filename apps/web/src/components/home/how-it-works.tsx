import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { toBn } from "@/lib/bn-number";

const STEPS = [
  {
    title: "সেবা বেছে নিন",
    description: "ডাক্তার, গাইড বা ওষুধ — যেটা দরকার।",
  },
  {
    title: "নাম ও মোবাইল নম্বর দিন",
    description: "লগইন লাগবে না, মাত্র কয়েকটি তথ্য।",
  },
  {
    title: "আমরা ফোন করে নিশ্চিত করি",
    description: "সময়, ফি ও বিস্তারিত ফোনে জানিয়ে দেব।",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-12 md:py-[100px]">
      <Container className="flex flex-col gap-10 md:gap-[60px]">
        <SectionHeading title="কীভাবে কাজ করে" subtitle="তিনটি সহজ ধাপ" />

        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col items-start gap-3 rounded-[8px] border border-line bg-surface p-5"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-700 text-xl leading-[30px] font-bold text-white">
                {toBn(index + 1)}
              </span>
              <h3 className="text-[20px] leading-[30px] font-semibold text-ink">
                {step.title}
              </h3>
              <p className="text-base leading-6 text-ink-2">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}