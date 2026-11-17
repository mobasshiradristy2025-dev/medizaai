import { getDoctorBySlug } from "@/lib/api/doctors";
import { getGuideBySlug, isGuidePackageKey } from "@/lib/api/guides";
import { formatPrice } from "@/lib/bn-number";
import type { BookingSummary, BookingType } from "@/types/booking";

// TODO: backend ready hole asol booking number ar booking data id diye ekhane ane
const MOCK_BOOKING_NUMBER = "[MZ-XXXX]";

export function isBookingType(value: string | undefined): value is BookingType {
  return value === "doctor" || value === "guide" || value === "order";
}

type SummaryInput = {
  type: BookingType;
  item?: string;
  packageKey?: string;
};

export async function getBookingSummary({
  type,
  item,
  packageKey,
}: SummaryInput): Promise<BookingSummary | null> {
  const base = { bookingNumber: MOCK_BOOKING_NUMBER, status: "নতুন" };

  if (type === "doctor") {
    const doctor = item ? await getDoctorBySlug(item) : null;
    if (!doctor) return null;

    return {
      ...base,
      rows: [
        { label: "সেবা", value: "ডাক্তার (ভিডিও কল)" },
        { label: "ডাক্তার", value: doctor.name },
        { label: "ফি", value: formatPrice(doctor.fee) },
      ],
      note: "আমাদের প্রতিনিধি শীঘ্রই ফোন করে সময় ও ফি নিশ্চিত করবেন।",
    };
  }

  if (type === "guide") {
    const guide = item ? await getGuideBySlug(item) : null;
    if (!guide) return null;

    const selected = isGuidePackageKey(packageKey)
      ? guide.packages.find((pkg) => pkg.key === packageKey)
      : undefined;

    return {
      ...base,
      rows: [
        { label: "সেবা", value: "হাসপাতালে গাইড" },
        { label: "গাইড", value: guide.name },
        ...(selected
          ? [
              {
                label: "প্যাকেজ",
                value: `${selected.label} · ${formatPrice(selected.price)}`,
              },
            ]
          : []),
      ],
      note: "আমাদের প্রতিনিধি শীঘ্রই ফোন করে সময় ও প্যাকেজ নিশ্চিত করবেন।",
    };
  }

  return {
    ...base,
    rows: [
      { label: "সেবা", value: "ওষুধ হোম ডেলিভারি" },
      { label: "পেমেন্ট", value: "ক্যাশ অন ডেলিভারি" },
      { label: "ডেলিভারি", value: "২০–৪০ মিনিট" },
    ],
    note: "আমাদের প্রতিনিধি শীঘ্রই ফোন করে অর্ডার নিশ্চিত করবেন।",
  };
}