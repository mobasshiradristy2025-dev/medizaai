import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { LegalContent } from "@/components/legal/legal-content";
import { LegalToc } from "@/components/legal/legal-toc";
import { PRIVACY_NOTICE, PRIVACY_SECTIONS } from "@/data/privacy";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি | Medizaai",
  description: "আপনার তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখা হয় তা জানুন।",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "গোপনীয়তা নীতি" },
        ]}
        title="গোপনীয়তা নীতি"
        subtitle="আপনার তথ্য কীভাবে সুরক্ষিত রাখি"
      />

      <section className="bg-line/25 py-12 md:py-[72px]">
        <Container className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">
          <LegalToc
            sections={PRIVACY_SECTIONS.map(({ id, title }) => ({ id, title }))}
          />
          <LegalContent sections={PRIVACY_SECTIONS} notice={PRIVACY_NOTICE} />
        </Container>
      </section>
    </>
  );
}