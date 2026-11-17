import { formatPrice } from "@/lib/bn-number";
import type { AccountEntry } from "@/types/account";

// Mock data: ei number diye search korle demo booking/order dekhabe.
// TODO: backend ready hole eta shoriye real API call korben.
export const DEMO_PHONE = "01712345678";

export const ACCOUNT_ENTRIES: AccountEntry[] = [
  {
    id: "booking-1",
    group: "booking",
    phone: DEMO_PHONE,
    title: "ডাক্তার বুকিং",
    subtitle: "ডা. শুভ আব্দুল্লাহ · [তারিখ] · [সময়]",
    status: { label: "নিশ্চিত", tone: "success" },
    steps: [
      { label: "নতুন", description: "বুকিং গ্রহণ করা হয়েছে", done: true },
      { label: "নিশ্চিত", description: "ফোনে সময় ও ফি নিশ্চিত", done: true },
      { label: "শেষ", description: "ভিডিও কল সম্পন্ন", done: false },
    ],
  },
  {
    id: "order-1",
    group: "order",
    phone: DEMO_PHONE,
    title: `ওষুধের অর্ডার · ${formatPrice(180)}`,
    subtitle: "৩টি আইটেম · ক্যাশ অন ডেলিভারি",
    status: { label: "ডেলিভারিতে পাঠানো হয়েছে", tone: "info" },
    steps: [
      { label: "নতুন", description: "অর্ডার গ্রহণ করা হয়েছে", done: true },
      { label: "ফোনে নিশ্চিত", done: true },
      {
        label: "ডেলিভারিতে পাঠানো হয়েছে",
        description: "২০–৪০ মিনিটের মধ্যে পৌঁছাবে",
        done: true,
      },
      { label: "ডেলিভার্ড", done: false },
    ],
  },
];