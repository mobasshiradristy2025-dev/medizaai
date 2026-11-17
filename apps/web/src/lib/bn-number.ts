const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** 1200 -> "১২০০" */
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** 1200 -> "৳১,২০০" */
export function formatPrice(amount: number): string {
  return `৳${toBn(amount.toLocaleString("en-US"))}`;
}