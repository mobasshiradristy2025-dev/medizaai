import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfoCard } from "@/components/contact/contact-info-card";
import { ContactMap } from "@/components/contact/contact-map";
import { ContactFaq } from "@/components/contact/contact-faq";

export const metadata: Metadata = {
  title: "যোগাযোগ | Medizaai",
  description: "প্রশ্ন বা সাহায্যের জন্য Medizaai-র সঙ্গে যোগাযোগ করুন।",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "হোম", href: "/" }, { label: "যোগাযোগ" }]}
        title="যোগাযোগ"
        subtitle="আমরা সাহায্য করতে প্রস্তুত"
      />

      <section className="bg-line/25 py-12">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
          <ContactForm />
          <div className="flex flex-col gap-6">
            <ContactInfoCard />
            <ContactMap />
          </div>
        </Container>
      </section>

      <ContactFaq />
    </>
  );
}