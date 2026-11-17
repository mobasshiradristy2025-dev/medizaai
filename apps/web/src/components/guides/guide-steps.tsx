import { toBn } from "@/lib/bn-number";

const STEPS = [
  "প্যাকেজ বেছে বুক করুন",
  "আমরা ফোন করে নিশ্চিত করব",
  "নির্ধারিত দিনে হাসপাতালে গাইড আপনার সঙ্গে থাকবেন",
];

export function GuideSteps() {
  return (
    <section className="flex flex-col gap-6 rounded-[12px] border border-line bg-surface p-6">
      <h2 className="text-[22px] leading-[33px] font-semibold text-ink">
        কীভাবে কাজ করে
      </h2>
      <ol className="grid gap-6 sm:grid-cols-3">
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