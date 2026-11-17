import { Hero } from "@/components/home/hero";
import { WhyMedizaai } from "@/components/home/why-medizaai";
import { ChooseYourNeed } from "@/components/home/choose-your-need";
import { PopularHospitals } from "@/components/home/popular-hospitals";
import { PopularDoctors } from "@/components/home/popular-doctors";
import { OurGuides } from "@/components/home/our-guides";
import { HowItWorks } from "@/components/home/how-it-works";
import { TryNow } from "@/components/home/try-now";
import { Faq } from "@/components/home/faq";
import { EmergencyStrip } from "@/components/layout/emergency-strip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyMedizaai />
      <ChooseYourNeed />
      <PopularHospitals />
      <PopularDoctors />
      <OurGuides />
      <HowItWorks />
      <TryNow />
      <Faq />
      <EmergencyStrip />
    </>
  );
}