"use client";

import { useState } from "react";
import { Container } from "@/components/shared/container";
import { GuideBookingCard } from "@/components/guides/guide-booking-card";
import { GuidePackagePicker } from "@/components/guides/guide-package-picker";
import type { Guide, GuidePackageKey } from "@/types/guide";

type GuideBookingSectionProps = {
  guide: Guide;
  initialPackage: GuidePackageKey;
  hospitals: string[];
  header: React.ReactNode;
  steps: React.ReactNode;
};

/** Package picker (left) ar booking card (right) ek-i selected package share kore. */
export function GuideBookingSection({
  guide,
  initialPackage,
  hospitals,
  header,
  steps,
}: GuideBookingSectionProps) {
  const [selectedKey, setSelectedKey] = useState(initialPackage);
  const selectedPackage =
    guide.packages.find((pkg) => pkg.key === selectedKey) ?? guide.packages[0];

  return (
    <Container className="grid gap-8 pt-8 pb-12 md:pt-[72px] md:pb-[72px] lg:grid-cols-[1fr_420px]">
      <div className="flex min-w-0 flex-col gap-6">
        {header}
        <GuidePackagePicker
          packages={guide.packages}
          selected={selectedKey}
          onSelect={setSelectedKey}
        />
        {steps}
      </div>

      <GuideBookingCard
        guideSlug={guide.slug}
        selectedPackage={selectedPackage}
        hospitals={hospitals}
      />
    </Container>
  );
}