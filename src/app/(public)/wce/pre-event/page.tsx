import type { Metadata } from "next";
import HeroSectionPE from "./HeroSection";

export const metadata: Metadata = {
  title: "Pre Event | WCE | UIWIB",
};
import PreEventsSection from "./PreEvents";

export default function PreEvent() {
  return (
    <>
      <HeroSectionPE/>
      <PreEventsSection/>
    </>
  );
}