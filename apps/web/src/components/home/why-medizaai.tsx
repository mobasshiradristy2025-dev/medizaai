import Image from "next/image";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

const FEATURES = [
  {
    icon: "/icons/why/appointment-01.svg",
    title: "সহজ বুকিং",
    description: "শুধু নাম ও মোবাইল নম্বর দিয়েই বুকিং — লগইন ছাড়া।",
  },
  {
    icon: "/icons/why/call-done-02.svg",
    title: "ফোনে নিশ্চিতকরণ",
    description:
      "প্রতিটি বুকিং আমাদের প্রতিনিধি ফোন করে সময় ও ফি নিশ্চিত করেন।",
  },
  {
    icon: "/icons/why/delivery-sent-01.svg",
    title: "দ্রুত হোম ডেলিভারি",
    description: "রাজশাহী শহরে ২০–৪০ মিনিটে ওষুধ, ক্যাশ অন ডেলিভারি।",
  },
  {
    icon: "/icons/why/mentor.svg",
    title: "হাসপাতালে সঙ্গী গাইড",
    description: "অভিজ্ঞ গাইড আপনার সঙ্গে হাসপাতালে গিয়ে সাহায্য করবেন।",
  },
];

export function WhyMedizaai() {
  return (
    <section className="bg-gradient-to-b from-mint to-cream py-16 md:py-[100px]">
      <Container className="flex flex-col gap-10 md:gap-[60px]">
        <SectionHeading
          title="কেন Medizaai?"
          subtitle="আপনার প্রতিটি ধাপে পাশে আছি"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col items-center gap-3 rounded-[16px] border border-line bg-surface p-5"
            >
              <div className="flex size-14 items-center justify-center rounded-[18.667px] bg-brand-100">
                <Image
                  src={feature.icon}
                  alt=""
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-center text-[20px] leading-[30px] font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="text-center text-[15px] leading-[23px] text-ink-2">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}