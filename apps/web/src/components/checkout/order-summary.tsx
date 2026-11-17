"use client";

import Link from "next/link";
import { formatPrice, toBn } from "@/lib/bn-number";
import { MEDICINE_ORDER } from "@/lib/constants";
import { getSubtotal, useCartStore } from "@/store/cart-store";

const frameClass =
  "self-start rounded-[12px] border border-line bg-surface p-6 shadow-[0px_8px_24px_0px_rgba(15,79,74,0.12)] lg:sticky lg:top-6";

export function OrderSummary({ isSubmitting }: { isSubmitting: boolean }) {
  const lines = useCartStore((state) => state.lines);
  const hydrated = useCartStore((state) => state.hydrated);

  if (!hydrated) {
    return <section aria-busy className={`${frameClass} min-h-[320px]`} />;
  }

  const hasItems = lines.length > 0;
  const subtotal = getSubtotal(lines);
  const delivery = hasItems ? MEDICINE_ORDER.deliveryFee : 0;
  const total = subtotal + delivery;
  const canOrder = subtotal >= MEDICINE_ORDER.minOrder;

  return (
    <section aria-labelledby="summary-title" className={frameClass}>
      <div className="flex flex-col gap-3">
        <h2
          id="summary-title"
          className="pb-1 text-[24px] leading-9 font-bold text-brand-900"
        >
          অর্ডারের সারাংশ
        </h2>

        {hasItems ? (
          <ul className="flex flex-col gap-2 border-b border-line pb-3">
            {lines.map((line) => (
              <li
                key={line.slug}
                className="flex items-center justify-between gap-3 text-sm leading-[21px] text-ink-2"
              >
                <span>
                  {line.name} × {toBn(line.qty)}
                </span>
                <span className="font-semibold text-ink">
                  {formatPrice(line.unitPrice * line.qty)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-2 border-b border-line pb-3 text-sm leading-[21px] text-ink-2">
            <p>আপনার কার্ট খালি।</p>
            <Link
              href="/medicines"
              className="font-semibold text-brand-700 hover:text-brand-900"
            >
              ওষুধ দেখুন
            </Link>
          </div>
        )}

        <dl className="flex flex-col gap-2 text-sm leading-[21px] text-ink-2">
          <div className="flex justify-between">
            <dt>ওষুধের মোট</dt>
            <dd className="font-semibold text-ink">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between border-b border-line pb-3">
            <dt>ডেলিভারি চার্জ</dt>
            <dd className="font-semibold text-ink">{formatPrice(delivery)}</dd>
          </div>
          <div className="flex items-center justify-between pt-1">
            <dt className="text-base font-semibold text-ink">সর্বমোট</dt>
            <dd className="text-[22px] leading-[33px] font-bold text-brand-700">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <p className="text-sm leading-[21px] text-ink-3">
          ডেলিভারি: ২০–৪০ মিনিট · পেমেন্ট: ক্যাশ অন ডেলিভারি
        </p>

        <button
          type="submit"
          disabled={!canOrder || isSubmitting}
          className="h-[50px] rounded-[8px] bg-brand-700 text-base font-semibold text-white transition-colors hover:bg-brand-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "অর্ডার হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
        </button>

        {!canOrder && (
          <p
            role="status"
            className="rounded-[8px] bg-red-50 px-3 py-2 text-sm leading-[21px] text-red-600"
          >
            ওষুধের দাম {formatPrice(MEDICINE_ORDER.minOrder)}-এর কম হলে “অর্ডার”
            বাটন বন্ধ থাকবে।
          </p>
        )}
      </div>
    </section>
  );
}