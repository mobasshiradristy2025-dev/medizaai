import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/shared/container";
import { SuccessCard } from "@/components/booking/success-card";
import { getBookingSummary, isBookingType } from "@/lib/api/bookings";

export const metadata: Metadata = {
  title: "বুকিং গ্রহণ করা হয়েছে | Medizaai",
  description: "আপনার বুকিং আমরা পেয়েছি। শীঘ্রই ফোন করে নিশ্চিত করব।",
  robots: { index: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

async function SuccessContent({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const type = first(params.type);
  if (!isBookingType(type)) notFound();

  const summary = await getBookingSummary({
    type,
    item: first(params.item),
    packageKey: first(params.package),
  });
  if (!summary) notFound();

  return <SuccessCard summary={summary} />;
}

export default function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <section className="py-12 md:py-[72px]">
      <Container>
        <Suspense fallback={<div className="min-h-[480px]" aria-busy />}>
          <SuccessContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </section>
  );
}