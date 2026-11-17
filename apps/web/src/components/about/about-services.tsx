import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AboutCard } from "@/components/about/about-card";

const SERVICES = [
  { title: "অনলাইন ডাক্তার", description: "ভিডিও কলে ডাক্তার দেখান" },
  { title: "গাইড বুকিং", description: "হাসপাতালে সঙ্গী গাইড" },
  { title: "ওষুধ ডেলিভারি", description: "রাজশাহী শহরে ২০–৪০ মিনিট" },
  { title: "হাসপাতাল তথ্য", description: "১৩টি হাসপাতাল ও ডায়াগনস্টিক" },
];

export function AboutServices() {
  return (
    <section className="bg-brand-100/40 py-12 md:py-[72px]">
      <Container className="flex flex-col gap-8">
        <SectionHeading title="আমাদের সেবা" />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <li key={service.title}>
              <AboutCard
                title={service.title}
                description={service.description}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}