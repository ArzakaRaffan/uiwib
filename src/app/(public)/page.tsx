// src/app/(public)/page.tsx
import HeroSection from "../(public)/home/HeroSection"
import TaglineSection from "../(public)/home/TaglineSection";
import PartnerSection from "./home/PartnerSection";
import SubEventsSection from "./home/SubEventsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TaglineSection />
      <SubEventsSection/>
      <PartnerSection/>
    </>
  );
}