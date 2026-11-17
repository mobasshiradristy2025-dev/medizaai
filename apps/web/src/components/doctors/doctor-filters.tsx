import Link from "next/link";
import { CheckboxField } from "@/components/shared/checkbox-field";
import { formatPrice } from "@/lib/bn-number";

type DoctorFiltersProps = {
  specialties: string[];
  selectedSpecialties: string[];
  videoOnly: boolean;
  feeRange: { min: number; max: number };
};

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-6 font-medium text-ink-2">{children}</p>
  );
}

export function DoctorFilters({
  specialties,
  selectedSpecialties,
  videoOnly,
  feeRange,
}: DoctorFiltersProps) {
  return (
    <aside className="flex flex-col gap-4 self-start rounded-[12px] border border-line bg-surface p-5">
      <h2 className="text-[20px] leading-[30px] font-semibold text-ink">
        ফিল্টার
      </h2>

      <FilterLabel>বিভাগ</FilterLabel>
      {specialties.map((specialty) => (
        <CheckboxField
          key={specialty}
          name="specialty"
          value={specialty}
          label={specialty}
          defaultChecked={selectedSpecialties.includes(specialty)}
        />
      ))}

      <FilterLabel>ভিডিও কল ফি</FilterLabel>
      <p className="text-[15px] leading-6 text-ink">
        {formatPrice(feeRange.min)} – {formatPrice(feeRange.max)}
      </p>

      <FilterLabel>সুবিধা</FilterLabel>
      <CheckboxField
        name="video"
        value="1"
        label="ভিডিও কলে পাওয়া যায়"
        defaultChecked={videoOnly}
      />

      <button
        type="submit"
        className="h-[50px] rounded-[8px] bg-brand-700 text-base font-semibold text-white transition-colors hover:bg-brand-900"
      >
        ফিল্টার প্রয়োগ করুন
      </button>
      <Link
        href="/doctors"
        className="text-center text-[15px] leading-6 font-medium text-brand-700 hover:underline"
      >
        রিসেট করুন
      </Link>
    </aside>
  );
}