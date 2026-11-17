import { Container } from "@/components/shared/container";
import { formatPrice } from "@/lib/bn-number";
import { MEDICINE_ORDER } from "@/lib/constants";

const ITEMS = [
  `ডেলিভারি চার্জ ${formatPrice(MEDICINE_ORDER.deliveryFee)} (পুরো শহরে এক রেট)`,
  `সর্বনিম্ন অর্ডার ${formatPrice(MEDICINE_ORDER.minOrder)}`,
  "২০–৪০ মিনিটে ডেলিভারি",
  "পেমেন্ট: ক্যাশ অন ডেলিভারি",
];

export function MedicineInfoStrip() {
  return (
    <ul className="flex flex-wrap justify-between gap-x-6 gap-y-3 rounded-[12px] bg-brand-100/40 px-5 py-4">
      {ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 text-sm leading-[21px] font-medium text-ink"
        >
          <span aria-hidden className="size-2 rounded-full bg-brand-700" />
          {item}
        </li>
      ))}
    </ul>
  );
}