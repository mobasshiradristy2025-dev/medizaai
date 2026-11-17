import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { DoctorAbout } from "@/components/doctors/doctor-about";
import { DoctorBookingCard } from "@/components/doctors/doctor-booking-card";
import { DoctorListItem } from "@/components/doctors/doctor-list-item";
import { DoctorProfileHeader } from "@/components/doctors/doctor-profile-header";
import { VideoCallSteps } from "@/components/doctors/video-call-steps";
import {
  getAllDoctorSlugs,
  getDoctorBySlug,
  getOtherDoctors,
} from "@/lib/api/doctors";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDoctorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return { title: "ডাক্তার পাওয়া যায়নি | Medizaai" };

  return {
    title: `${doctor.name} | Medizaai`,
    description: `${doctor.name} (${doctor.specialty}) — ভিডিও কলে পরামর্শ নিন।`,
  };
}

async function DoctorDetail({ params }: PageProps) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();

  // Design-e 1 jon "অন্য ডাক্তার" dekhano hoyeche; beshi dekhate number bodlan
  const others = await getOtherDoctors(slug, 1);

  return (
    <>
      <Container className="pt-5">
        <Breadcrumb
          items={[
            { label: "হোম", href: "/" },
            { label: "ডাক্তার", href: "/doctors" },
            { label: doctor.name },
          ]}
        />
      </Container>

      <Container className="grid gap-8 pt-8 pb-12 md:pt-[72px] md:pb-[72px] lg:grid-cols-[1fr_420px]">
        <div className="flex min-w-0 flex-col gap-6">
          <DoctorProfileHeader doctor={doctor} />
          <DoctorAbout doctor={doctor} />
          <VideoCallSteps />

          {others.length > 0 && (
            <>
              <h2 className="text-[20px] leading-[30px] font-semibold text-ink">
                অন্য ডাক্তার
              </h2>
              {others.map((other) => (
                <DoctorListItem key={other.slug} doctor={other} />
              ))}
            </>
          )}
        </div>

        <DoctorBookingCard doctorSlug={doctor.slug} fee={doctor.fee} />
      </Container>
    </>
  );
}

export default function DoctorPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-[800px]" aria-busy />}>
      <DoctorDetail params={params} />
    </Suspense>
  );
}