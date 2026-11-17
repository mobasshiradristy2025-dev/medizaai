"use client";

import Link from "next/link";
import { formatPrice, toBn } from "@/lib/bn-number";
import { MEDICINE_ORDER } from "@/lib/constants";
import { useCartStore } from "@/store/cart-store";

const checkoutClass =
  "flex h-[50px] items-center justify-center rounded-[8px] bg-brand-700 text-base font-semibold text-white transition-colors hover:bg-brand-900";

export function CartSummary() {
  const lines = useCartStore((state) => state.lines);

  const hasItems = lines.length > 0;
  const subtotal = lines.reduce(
    (sum, line) => sum + line.unitPrice * line.qty,
    0,
  );
  const delivery = hasItems ? MEDICINE_ORDER.deliveryFee : 0;
  const total = subtotal + delivery;
  const canCheckout = subtotal >= MEDICINE_ORDER.minOrder;

  return (
    <section
      aria-labelledby="cart-title"
      className="self-start rounded-[12px] border border-line bg-surface p-6 shadow-[0px_8px_24px_0px_rgba(15,79,74,0.12)] lg:sticky lg:top-6"
    >
      <div className="flex flex-col gap-3">
        <h2
          id="cart-title"
          className="pb-1 text-[24px] leading-9 font-bold text-brand-900"
        >
          আপনার কার্ট
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
          <p className="border-b border-line pb-3 text-sm leading-[21px] text-ink-2">
            কার্ট এখনো খালি। পছন্দের ওষুধ যোগ করুন।
          </p>
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
            <dt className="text-base font-semibold text-ink">
              সর্বমোট (আনুমানিক)
            </dt>
            <dd className="text-[22px] leading-[33px] font-bold text-brand-700">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        {canCheckout ? (
          <Link href="/checkout" className={checkoutClass}>
            চেকআউটে যান
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className={`${checkoutClass} cursor-not-allowed opacity-50`}
          >
            চেকআউটে যান
          </button>
        )}

        {hasItems && !canCheckout && (
          <p role="status" className="text-sm leading-[21px] text-ink-2">
            আরও {formatPrice(MEDICINE_ORDER.minOrder - subtotal)} যোগ করুন।
            সর্বনিম্ন অর্ডার {formatPrice(MEDICINE_ORDER.minOrder)}।
          </p>
        )}

        <p className="text-sm leading-[21px] text-ink-3">
          দাম আনুমানিক। চূড়ান্ত দাম ব্যবসায়ী নিশ্চিত করবেন।
        </p>
      </div>
    </section>
  );
}