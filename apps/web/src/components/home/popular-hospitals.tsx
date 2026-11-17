import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { SeeAllLink } from "@/components/shared/see-all-link";
import { Carousel } from "@/components/shared/carousel";
import { HospitalCard } from "@/components/hospitals/hospital-card";
import { POPULAR_HOSPITALS } from "@/data/hospitals";

export function PopularHospitals() {
  return (
    <section className="bg-gradient-to-b from-mint to-cream py-16 md:py-[100px]">
      <Container className="flex flex-col gap-10 md:gap-[60px]">
        <SectionHeading
          title="জনপ্রিয় হাসপাতাল"
          subtitle="রাজশাহীর ১৩টি হাসপাতাল ও ডায়াগনস্টিক"
        >
          <SeeAllLink href="/hospitals" />
        </SectionHeading>

        <Carousel
          columns={4}
          prevLabel="আগের হাসপাতাল"
          nextLabel="পরের হাসপাতাল"
        >
          {POPULAR_HOSPITALS.map((hospital) => (
            <HospitalCard key={hospital.slug} hospital={hospital} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}