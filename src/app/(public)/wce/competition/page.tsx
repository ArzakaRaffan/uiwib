import type { Metadata } from "next";
import CompetitionSection from "./CompetitionSection";

export const metadata: Metadata = {
  title: "Competition | WCE | UIWIB",
};
import HeroSectionCompetition from "./HeroSectionCompetition";

export default function Competition() {
  return (
    <>
      <HeroSectionCompetition/>
      <CompetitionSection/>
    </>
  );
}