import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AboutCard } from "@/components/about/about-card";

const VALUES = [
  {
    title: "সত্যিকারের তথ্য",
    description:
      "ভুয়া রিভিউ বা গ্রাহক সংখ্যা দেখাই না — আসল তথ্য এলে তবেই যোগ করি।",
  },
  {
    title: "ব্যক্তিগত তথ্যের সুরক্ষা",
    description:
      "নাম, ঠিকানা ও স্বাস্থ্যের তথ্য নিরাপদে রাখি, প্রয়োজনের বেশি সংগ্রহ করি না।",
  },
  {
    title: "ফোনে নিশ্চিতকরণ",
    description:
      "প্রতিটি বুকিং ও অর্ডার আমাদের প্রতিনিধি ফোন করে নিশ্চিত করেন।",
  },
];

export function AboutValues() {
  return (
    <section className="py-12 md:py-[72px]">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          title="আমাদের নীতি"
          subtitle="আপনার বিশ্বাসই আমাদের পুঁজি"
        />

        <ul className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <li key={value.title}>
              <AboutCard
                tone="accent"
                title={value.title}
                description={value.description}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}