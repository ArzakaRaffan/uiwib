import type { Metadata } from "next";
import HeroSectionGS from "./HeroSection";

export const metadata: Metadata = {
  title: "Grand Seminar | WCE | UIWIB",
};
import EventsSectionGS from "./EventsSection";

export default function GrandSeminar() {
  return (
    <>
      <HeroSectionGS/>
      <EventsSectionGS/>
    </>
  );
}