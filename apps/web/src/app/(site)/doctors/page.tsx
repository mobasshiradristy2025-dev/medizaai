import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/page-hero";
import {
  DoctorsBrowser,
  type SearchParams,
} from "@/components/doctors/doctors-browser";

export const metadata: Metadata = {
  title: "ডাক্তার | Medizaai",
  description: "ভিডিও কলে অভিজ্ঞ ডাক্তারের পরামর্শ নিন।",
};

export default function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "হোম", href: "/" }, { label: "ডাক্তার" }]}
        title="ডাক্তার"
        subtitle="ভিডিও কলে অভিজ্ঞ ডাক্তারের পরামর্শ"
      />
      <Suspense fallback={<div className="min-h-[600px]" aria-busy />}>
        <DoctorsBrowser searchParams={searchParams} />
      </Suspense>
    </>
  );
}