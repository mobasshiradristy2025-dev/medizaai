import type { Faq } from "@/data/faqs";
import { formatPrice } from "@/lib/bn-number";
import { MEDICINE_ORDER } from "@/lib/constants";

export const CONTACT_FAQS: Faq[] = [
  {
    question: "ডাক্তারের ভিডিও কল কীভাবে হয়?",
    answer:
      "বুকিং নিশ্চিত হলে আমাদের প্রতিনিধি কলের মাধ্যমে জানিয়ে দেবেন।",
  },
  {
    question: "ওষুধ ডেলিভারি কোথায় পাওয়া যায়?",
    answer: "বর্তমানে রাজশাহী শহরে ওষুধ হোম ডেলিভারি দেওয়া হয়।",
  },
  {
    question: "ন্যূনতম অর্ডার কত?",
    answer: `ওষুধের সর্বনিম্ন অর্ডার ${formatPrice(MEDICINE_ORDER.minOrder)}। ডেলিভারি চার্জ ${formatPrice(MEDICINE_ORDER.deliveryFee)}, পুরো শহরে এক রেট।`,
  },
  {
    question: "গাইড সেবা কী?",
    answer:
      "অভিজ্ঞ গাইড আপনার সঙ্গে হাসপাতালে গিয়ে ডাক্তার দেখানো ও টেস্টে সাহায্য করবেন।",
  },
  {
    question: "অনলাইনে টাকা দিতে হবে?",
    answer: "ওষুধের পেমেন্ট ক্যাশ অন ডেলিভারি, অর্থাৎ অনলাইনে টাকা দিতে হয় না।",
  },
];