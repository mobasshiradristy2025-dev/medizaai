import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/page-hero";
import {
  AccountBrowser,
  type SearchParams,
} from "@/components/account/account-browser";

export const metadata: Metadata = {
  title: "আমার বুকিং ও অর্ডার | Medizaai",
  description: "মোবাইল নম্বর দিয়ে আপনার বুকিং ও অর্ডারের অবস্থা দেখুন।",
  robots: { index: false },
};

export default function AccountBookingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "হোম", href: "/" }, { label: "আমার বুকিং" }]}
        title="আমার বুকিং ও অর্ডার"
        subtitle="মোবাইল নম্বর দিয়ে অবস্থা দেখুন"
      />
      <Suspense fallback={<div className="min-h-[600px]" aria-busy />}>
        <AccountBrowser searchParams={searchParams} />
      </Suspense>
    </>
  );
}