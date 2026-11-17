import { toBn } from "@/lib/bn-number";

const STEPS = [
  "ফর্ম পূরণ করে বুক করুন",
  "আমরা ফোন করে সময় ও ফি নিশ্চিত করব",
  "নির্ধারিত সময়ে ভিডিও কলে পরামর্শ",
];

export function VideoCallSteps() {
  return (
    <section className="flex flex-col gap-4 rounded-[12px] border border-line bg-surface p-6">
      <h2 className="text-[20px] leading-[30px] font-semibold text-ink">
        ভিডিও কল কীভাবে হবে
      </h2>
      <ol className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step} className="flex flex-col items-start gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-700 text-base leading-6 font-bold text-white">
              {toBn(index + 1)}
            </span>
            <p className="text-base leading-6 text-ink-2">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}