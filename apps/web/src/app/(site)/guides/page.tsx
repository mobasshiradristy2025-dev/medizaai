import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { GuideInfoBanner } from "@/components/guides/guide-info-banner";
import { GuideListCard } from "@/components/guides/guide-list-card";
import { PackageComparisonTable } from "@/components/guides/package-comparison-table";
import { getGuides } from "@/lib/api/guides";

export const metadata: Metadata = {
  title: "গাইড | Medizaai",
  description: "হাসপাতালে আপনার সঙ্গী — অভিজ্ঞ গাইড বুক করুন।",
};

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "হোম", href: "/" }, { label: "গাইড" }]}
        title="গাইড"
        subtitle="হাসপাতালে আপনার সঙ্গী"
      />

      <section className="py-12 md:py-[72px]">
        <Container className="flex flex-col gap-10 md:gap-[60px]">
          <GuideInfoBanner />

          <div className="grid gap-6 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideListCard key={guide.slug} guide={guide} />
            ))}
          </div>

          <PackageComparisonTable guides={guides} />
        </Container>
      </section>
    </>
  );
}