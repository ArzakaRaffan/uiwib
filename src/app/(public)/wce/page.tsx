import type { Metadata } from "next";
import EventsSectionHome from "./EventsSectionHome"

export const metadata: Metadata = {
  title: "WCE | UIWIB",
};
import HeroSectionHome from "./HeroSectionHome"

export default function WCEPage() {
  return (
    <>
      <HeroSectionHome />
      <EventsSectionHome />
    </>
  )
}
