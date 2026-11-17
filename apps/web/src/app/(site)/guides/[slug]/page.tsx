import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { GuideBookingSection } from "@/components/guides/guide-booking-section";
import { GuideProfileHeader } from "@/components/guides/guide-profile-header";
import { GuideSteps } from "@/components/guides/guide-steps";
import {
  getAllGuideSlugs,
  getGuideBySlug,
  isGuidePackageKey,
} from "@/lib/api/guides";
import { getHospitals } from "@/lib/api/hospitals";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ package?: string | string[] }>;
};

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Pick<PageProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return { title: "গাইড পাওয়া যায়নি | Medizaai" };

  return {
    title: `${guide.name} | Medizaai`,
    description: `${guide.name} — হাসপাতালে আপনার সঙ্গী গাইড। প্যাকেজ বেছে বুক করুন।`,
  };
}

async function GuideDetail({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const hospitals = await getHospitals();
  const packageParam = Array.isArray(query.package)
    ? query.package[0]
    : query.package;
  const initialPackage = isGuidePackageKey(packageParam)
    ? packageParam
    : guide.packages[0].key;

  return (
    <>
      <Container className="pt-5">
        <Breadcrumb
          items={[
            { label: "হোম", href: "/" },
            { label: "গাইড", href: "/guides" },
            { label: guide.name },
          ]}
        />
      </Container>

      <GuideBookingSection
        guide={guide}
        initialPackage={initialPackage}
        hospitals={hospitals.map((hospital) => hospital.name)}
        header={<GuideProfileHeader guide={guide} />}
        steps={<GuideSteps />}
      />
    </>
  );
}

export default function GuidePage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-[800px]" aria-busy />}>
      <GuideDetail {...props} />
    </Suspense>
  );
}