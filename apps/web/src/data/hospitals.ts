import type { Hospital } from "@/types/hospital";

export const HOSPITAL_TYPES = [
  "হাসপাতাল",
  "ডায়াগনস্টিক",
  "মেডিকেল সেন্টার",
] as const;

export type HospitalType = (typeof HOSPITAL_TYPES)[number];

export const HOSPITALS: Hospital[] = [
  {
    slug: "ramek",
    name: "রামেক",
    area: "[এলাকা]",
    type: "হাসপাতাল",
    image: "/images/hospitals/ramek.jpg",
    listImage: "/images/hospitals/list/ramek.png",
    popular: true,
  },
  {
    slug: "islami-bank-medical-college-hospital",
    name: "ইসলামী ব্যাংক মেডিকেল কলেজ হাসপাতাল",
    area: "[এলাকা]",
    type: "হাসপাতাল",
    image: "/images/hospitals/islami-bank.jpg",
    listImage: "/images/hospitals/list/islami-bank.jpg",
    popular: true,
  },
  {
    slug: "barendra-medical-college-hospital",
    name: "বরেন্দ্র মেডিকেল কলেজ হাসপাতাল",
    area: "[এলাকা]",
    type: "হাসপাতাল",
    image: "/images/hospitals/barendra.jpg",
    listImage: "/images/hospitals/list/barendra.jpg",
    popular: true,
  },
  {
    slug: "rajshahi-general-hospital",
    name: "রাজশাহী জেনারেল হাসপাতাল",
    area: "[এলাকা]",
    type: "হাসপাতাল",
    image: "/images/hospitals/rajshahi-general.jpg",
    listImage: "/images/hospitals/list/rajshahi-general.jpg",
    popular: true,
  },
  {
    slug: "independent-general-hospital",
    name: "ইন্ডিপেন্ডেন্ট জেনারেল হাসপাতাল",
    area: "[এলাকা]",
    type: "হাসপাতাল",
    image: "/images/hospitals/list/independent-general-hospital.jpg",
  },
  {
    slug: "jalal-memorial",
    name: "জালাল মেমোরিয়াল",
    area: "[এলাকা]",
    type: "হাসপাতাল",
    image: "/images/hospitals/list/jalal-memorial.jpg",
  },
  {
    slug: "progati-hospital-diagnostic",
    name: "প্রগতি হাসপাতাল ও ডায়াগনস্টিক",
    area: "[এলাকা]",
    type: "ডায়াগনস্টিক",
    image: "/images/hospitals/list/progati-hospital-diagnostic.jpg",
  },
  {
    slug: "lab-aid",
    name: "ল্যাব এইড",
    area: "[এলাকা]",
    type: "ডায়াগনস্টিক",
    image: "/images/hospitals/list/lab-aid.jpg",
  },
  {
    slug: "ibne-sina-diagnostic",
    name: "ইবনে সিনা ডায়াগনস্টিক",
    area: "[এলাকা]",
    type: "ডায়াগনস্টিক",
    image: "/images/hospitals/list/ibne-sina-diagnostic.jpg",
  },
  {
    slug: "unverified-hospital-1",
    name: "[নাম যাচাই বাকি]",
    area: "[এলাকা]",
    type: "[ধরন]",
    image: "/images/hospitals/list/unverified-hospital-1.jpg",
    verified: false,
  },
  {
    slug: "unverified-hospital-2",
    name: "[নাম যাচাই বাকি]",
    area: "[এলাকা]",
    type: "[ধরন]",
    image: "/images/hospitals/list/unverified-hospital-2.jpg",
    verified: false,
  },
  {
    slug: "bio-path-diagnostic",
    name: "বায়ো পাথ ডায়াগনস্টিক",
    area: "[এলাকা]",
    type: "ডায়াগনস্টিক",
    image: "/images/hospitals/list/bio-path-diagnostic.jpg",
  },
  {
    slug: "rajshahi-university-medical-center",
    name: "রাজশাহী বিশ্ববিদ্যালয় মেডিকেল সেন্টার",
    area: "[এলাকা]",
    type: "মেডিকেল সেন্টার",
    image: "/images/hospitals/list/rajshahi-university-medical-center.jpg",
  },
];

export const POPULAR_HOSPITALS = HOSPITALS.filter(
  (hospital) => hospital.popular,
);