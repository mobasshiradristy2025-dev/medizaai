import { CONTACT } from "@/lib/constants";
import type { LegalSection } from "@/types/legal";

// Draft copy: chhuranto korar age ayni poramorsho nin.
export const PRIVACY_NOTICE = "খসড়া — চূড়ান্ত করার আগে আইনি পরামর্শ নিন।";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "collect",
    title: "কোন তথ্য সংগ্রহ করি",
    paragraphs: [
      "নাম, মোবাইল নম্বর, ঠিকানা এবং বুকিং বা অর্ডারের তথ্য — শুধু সেবা দেওয়ার জন্য যতটুকু দরকার।",
    ],
  },
  {
    id: "use",
    title: "তথ্য কীভাবে ব্যবহার করি",
    paragraphs: [
      "বুকিং ও অর্ডার নিশ্চিত করতে, ডেলিভারি করতে এবং আপনার সঙ্গে যোগাযোগ করতে।",
    ],
  },
  {
    id: "security",
    title: "নিরাপত্তা",
    paragraphs: [
      "পুরো সাইট HTTPS-এ চলে। ডেটাবেস ও অ্যাডমিন প্যানেলে শুধু অনুমোদিত ব্যক্তি প্রবেশ করতে পারেন।",
    ],
  },
  {
    id: "sharing",
    title: "তথ্য শেয়ার",
    paragraphs: [
      "আপনার তথ্য বিক্রি করা হয় না। [শেয়ারের শর্ত যোগ হবে]",
    ],
  },
  {
    id: "rights",
    title: "আপনার অধিকার",
    paragraphs: [
      `আপনার তথ্য দেখতে বা মুছে ফেলতে চাইলে হোয়াটসঅ্যাপে জানান: ${CONTACT.whatsappDisplay}।`,
    ],
  },
];