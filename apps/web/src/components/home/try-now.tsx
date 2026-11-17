import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

const ACTIONS = [
  {
    image: "/images/start/video-doctor.jpg",
    title: "ঘরে বসে ডাক্তারের পরামর্শ",
    description: "ভিডিও কলে অভিজ্ঞ ডাক্তারের সঙ্গে কথা বলুন।",
    cta: "ডাক্তার বুক করুন",
    href: "/doctors",
  },
  {
    image: "/images/start/hospital-guide.jpg",
    title: "হাসপাতালে গাইড",
    description: "অচেনা হাসপাতালে সঙ্গে থাকবেন গাইড।",
    cta: "গাইড বুক করুন",
    href: "/guides",
  },
  {
    image: "/images/start/medicine-order.jpg",
    title: "ওষুধ অর্ডার",
    description: "ঘরে বসেই প্রয়োজনীয় ওষুধ।",
    cta: "অর্ডার করুন",
    href: "/medicines",
  },
];

export function TryNow() {
  return (
    <section className="hidden bg-brand-900 py-12 md:block md:py-[100px]">
      <Container className="flex flex-col gap-10 md:gap-[60px]">
        <SectionHeading title="আজই শুরু করুন" light />

        <div className="grid gap-6 lg:grid-cols-3">
          {ACTIONS.map((action) => (
            <article
              key={action.title}
              className="mx-auto flex w-full max-w-[420px] flex-col gap-4 rounded-[6px] bg-brand-700 p-5 lg:max-w-none"
            >
              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[4px] bg-ph">
                <Image
                  src={action.image}
                  alt={action.title}
                  fill
                  sizes="(min-width: 1024px) 344px, 420px"
                  className="object-cover"
                />
              </div>

              <h3 className="text-[20px] leading-[30px] font-semibold text-white">
                {action.title}
              </h3>
              <p className="text-base leading-6 text-brand-100">
                {action.description}
              </p>

              <Link
                href={action.href}
                className="self-start rounded-[10px] bg-accent px-4 py-2 text-sm leading-[21px] font-semibold whitespace-nowrap text-brand-900 transition-opacity hover:opacity-90"
              >
                {action.cta}
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}