import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/page-hero";
import {
  MedicinesBrowser,
  type SearchParams,
} from "@/components/medicines/medicines-browser";

export const metadata: Metadata = {
  title: "ওষুধ | Medizaai",
  description: "রাজশাহী শহরে ঘরে বসে ওষুধ অর্ডার করুন।",
};

export default function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "হোম", href: "/" }, { label: "ওষুধ" }]}
        title="ওষুধ"
        subtitle="রাজশাহী শহরে হোম ডেলিভারি"
      />
      <Suspense fallback={<div className="min-h-[600px]" aria-busy />}>
        <MedicinesBrowser searchParams={searchParams} />
      </Suspense>
    </>
  );
}