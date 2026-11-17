import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/page-hero";
import {
  HospitalsBrowser,
  type SearchParams,
} from "@/components/hospitals/hospitals-browser";

export const metadata: Metadata = {
  title: "হাসপাতাল ও ডায়াগনস্টিক | Medizaai",
  description: "রাজশাহীর হাসপাতাল ও ডায়াগনস্টিক সেন্টারের তালিকা।",
};

export default function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "হোম", href: "/" }, { label: "হাসপাতাল" }]}
        title="হাসপাতাল ও ডায়াগনস্টিক"
        subtitle="রাজশাহীর ১৩টি হাসপাতাল ও ডায়াগনস্টিক সেন্টার"
      />
      <Suspense fallback={<div className="min-h-[600px]" aria-busy />}>
        <HospitalsBrowser searchParams={searchParams} />
      </Suspense>
    </>
  );
}