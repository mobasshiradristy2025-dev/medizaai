"use client";

import type { Guide, GuidePackageKey } from "@/types/guide";
import { formatPrice } from "@/lib/bn-number";

type GuidePackagePickerProps = {
  packages: Guide["packages"];
  selected: GuidePackageKey;
  onSelect: (key: GuidePackageKey) => void;
};

export function GuidePackagePicker({
  packages,
  selected,
  onSelect,
}: GuidePackagePickerProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2
        id="package-picker-label"
        className="text-[22px] leading-[33px] font-semibold text-ink"
      >
        প্যাকেজ বেছে নিন
      </h2>

      <div
        role="radiogroup"
        aria-labelledby="package-picker-label"
        className="grid gap-4 sm:grid-cols-3"
      >
        {packages.map((pkg) => (
          <label key={pkg.key} className="cursor-pointer">
            <input
              type="radio"
              name="package"
              value={pkg.key}
              checked={selected === pkg.key}
              onChange={() => onSelect(pkg.key)}
              className="peer sr-only"
            />
            <span className="flex h-full flex-col gap-2 rounded-[12px] border border-line bg-surface p-5 transition-colors hover:border-brand-700 peer-checked:border-brand-700 peer-checked:bg-brand-100/40 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-700">
              <span className="text-[18px] leading-[27px] font-semibold text-ink">
                {pkg.label}
              </span>
              <span className="text-[30px] leading-[45px] font-bold text-brand-700">
                {formatPrice(pkg.price)}
              </span>
              <span className="text-sm leading-5 text-ink-3">
                [সেবার তালিকা যোগ হবে]
              </span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}