import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "চেকআউট | Medizaai",
  description: "ডেলিভারির তথ্য দিয়ে ওষুধের অর্ডার নিশ্চিত করুন।",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "ওষুধ", href: "/medicines" },
          { label: "চেকআউট" },
        ]}
        title="চেকআউট"
        subtitle="ডেলিভারির তথ্য দিন"
      />
      <section className="py-12 md:py-[72px]">
        <Container>
          <CheckoutForm />
        </Container>
      </section>
    </>
  );
}