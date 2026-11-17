import { Check } from "lucide-react";
import type { AccountEntry } from "@/types/account";

const TONE_CLASSES = {
  success: "bg-success-100 text-success",
  info: "bg-brand-100 text-brand-700",
} as const;

export function EntryCard({ entry }: { entry: AccountEntry }) {
  return (
    <article className="flex w-full flex-col gap-4 rounded-[12px] border border-line bg-surface p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[20px] leading-[30px] font-semibold text-ink">
          {entry.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-[10px] py-[3px] text-xs leading-[18px] font-medium ${TONE_CLASSES[entry.status.tone]}`}
        >
          {entry.status.label}
        </span>
      </div>

      <p className="text-base leading-6 text-ink-2">{entry.subtitle}</p>

      <ol className="flex flex-col">
        {entry.steps.map((step, index) => {
          const isLast = index === entry.steps.length - 1;
          return (
            <li key={step.label} className="relative pb-5 pl-9 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden
                  className={`absolute top-6 bottom-0 left-[11px] w-0.5 ${
                    step.done ? "bg-brand-700" : "bg-line"
                  }`}
                />
              )}
              <span
                aria-hidden
                className={`absolute top-0 left-0 flex size-6 items-center justify-center rounded-full border-2 ${
                  step.done
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-line bg-white"
                }`}
              >
                {step.done && <Check size={12} strokeWidth={3} />}
              </span>

              <p className="text-base leading-6 font-semibold text-ink">
                {step.label}
                {!step.done && <span className="sr-only"> (বাকি)</span>}
              </p>
              {step.description && (
                <p className="text-sm leading-[21px] text-ink-2">
                  {step.description}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </article>
  );
}