import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { SeeAllLink } from "@/components/shared/see-all-link";
import { Carousel } from "@/components/shared/carousel";
import { GuideCard } from "@/components/guides/guide-card";
import { GUIDES } from "@/data/guides";

export function OurGuides() {
  return (
    <section className="hidden bg-gradient-to-b from-mint to-cream py-16 md:block md:py-[100px]">
      <Container className="flex flex-col gap-10 md:gap-[60px]">
        <SectionHeading
          title="আমাদের গাইড"
          subtitle="হাসপাতালে যাওয়ার সঙ্গী"
        >
          <SeeAllLink href="/guides" />
        </SectionHeading>

        <Carousel
          columns={3}
          prevLabel="আগের গাইড"
          nextLabel="পরের গাইড"
        >
          {GUIDES.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}