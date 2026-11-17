import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

const SERVICES = [
  {
    image: "/images/home/services/video-doctor.jpg",
    title: "ভিডিও কলে ডাক্তার",
    description: "ঘরে বসে অভিজ্ঞ ডাক্তারের পরামর্শ",
    price: "ফি ৳১০০ থেকে",
    cta: "ডাক্তার দেখান",
    href: "/doctors",
  },
  {
    image: "/images/home/services/hospital-guide.jpg",
    title: "হাসপাতালে গাইড",
    description: "হাসপাতালে আপনার সঙ্গে থাকবেন গাইড",
    price: "৳২৫০ থেকে",
    cta: "গাইড বুক করুন",
    href: "/guides",
  },
  {
    image: "/images/home/services/medicine-delivery.jpg",
    title: "ওষুধ হোম ডেলিভারি",
    description: "রাজশাহী শহরে ২০–৪০ মিনিটে",
    price: "ডেলিভারি ৳৩০",
    cta: "ওষুধ অর্ডার করুন",
    href: "/medicines",
  },
];

export function ChooseYourNeed() {
  return (
    <section className="bg-white py-12 md:py-[72px]">
      <Container className="flex flex-col gap-10 md:gap-[60px]">
        <SectionHeading
          title="আপনার প্রয়োজন বেছে নিন"
          subtitle="তিনটি মূল সেবা"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="mx-auto flex w-full max-w-[420px] flex-col gap-[14px] rounded-[6px] border border-line bg-surface p-4 shadow-[0px_8px_24px_0px_rgba(15,79,74,0.12)] lg:max-w-none"
            >
              <div className="relative aspect-[350/190] w-full overflow-hidden rounded-[4px] bg-ph">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 384px, 100vw"
                  className="object-cover"
                />
              </div>

              <h3 className="text-[22px] leading-[33px] font-semibold text-ink">
                {service.title}
              </h3>
              <p className="text-base leading-6 text-ink-2">
                {service.description}
              </p>

              <div className="flex items-center justify-between gap-3">
                <span className="text-base leading-6 font-bold whitespace-nowrap text-brand-700">
                  {service.price}
                </span>
                <Link
                  href={service.href}
                  className="rounded-[6px] border border-line bg-white px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-brand-700 hover:text-brand-700"
                >
                  {service.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}