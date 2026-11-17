import type { Guide, GuidePackage } from "@/types/guide";

function packages(
  normal: number,
  extra: number,
  premium: number,
): GuidePackage[] {
  return [
    { key: "normal", label: "নরমাল", price: normal },
    { key: "extra", label: "এক্সট্রা", price: extra },
    { key: "premium", label: "প্রিমিয়াম", price: premium },
  ];
}

export const GUIDES: Guide[] = [
  {
    slug: "md-abdullah",
    name: "মো. আব্দুল্লাহ",
    experienceYears: 5,
    description: "সব হাসপাতাল, সব ধরনের বিশেষজ্ঞ ডাক্তার",
    startingPrice: 250,
    packages: packages(250, 500, 1020),
    image: "/images/guides/md-abdullah.jpg",
    listImage: "/images/guides/list/md-abdullah.jpg",
  },
  {
    slug: "dipa-das",
    name: "দীপা দাস",
    experienceYears: 5,
    description: "রামেক, পপুলার ও সব ধরনের টেস্ট সহায়তা",
    startingPrice: 300,
    packages: packages(300, 750, 1220),
    image: "/images/guides/dipa-das.jpg",
    listImage: "/images/guides/list/dipa-das.jpg",
  },
  {
    slug: "abdul-basid-toha",
    name: "আব্দুল বাসিদ তোহা",
    experienceYears: 5,
    description: "সব হাসপাতাল ও টেস্ট রিপোর্ট বিশেষজ্ঞ",
    startingPrice: 250,
    packages: packages(250, 500, 1020),
    image: "/images/guides/abdul-basid-toha.jpg",
    listImage: "/images/guides/list/abdul-basid-toha.jpg",
  },
];