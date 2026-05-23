// src/app/(public)/page.tsx
import type { Metadata } from "next";
import HeroSection from "../(public)/home/HeroSection"

export const metadata: Metadata = {
  title: "Home | UIWIB",
};
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