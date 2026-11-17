import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { SeeAllLink } from "@/components/shared/see-all-link";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { DOCTORS } from "@/data/doctors";

export function PopularDoctors() {
  return (
    <section className="bg-white py-12 md:py-[72px]">
      <Container className="flex flex-col gap-10 md:gap-[60px]">
        <SectionHeading
          title="জনপ্রিয় ডাক্তার"
          subtitle="ভিডিও কলে পরামর্শ নিন"
        >
          <SeeAllLink href="/doctors" />
        </SectionHeading>

        <div className="flex flex-col items-center gap-8">
          <div className="grid w-full gap-6 lg:grid-cols-3">
            {DOCTORS.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>

          <Link
            href="/doctors"
            className="rounded-[6px] border border-line bg-white px-7 py-[14px] text-[18px] leading-[27px] font-medium text-ink transition-colors hover:border-brand-700 hover:text-brand-700"
          >
            আরও ডাক্তার
          </Link>
        </div>
      </Container>
    </section>
  );
}