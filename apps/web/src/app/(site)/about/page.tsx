import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { AboutIntro } from "@/components/about/about-intro";
import { AboutServices } from "@/components/about/about-services";
import { AboutValues } from "@/components/about/about-values";
import { AboutCta } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | Medizaai",
  description: "রাজশাহীর মানুষের জন্য সহজ স্বাস্থ্যসেবা — Medizaai সম্পর্কে জানুন।",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "আমাদের সম্পর্কে" },
        ]}
        title="আমাদের সম্পর্কে"
        subtitle="রাজশাহীর মানুষের জন্য সহজ স্বাস্থ্যসেবা"
      />
      <AboutIntro />
      <AboutServices />
      <AboutValues />
      <AboutCta />
    </>
  );
}