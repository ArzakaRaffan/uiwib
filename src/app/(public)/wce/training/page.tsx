import type { Metadata } from "next";
import HeroSectionTraining from "./HeroSectionTraining";

export const metadata: Metadata = {
  title: "Training | WCE | UIWIB",
};
import TrainingSection from "./TrainingSection";


export default function Training() {
  return (
    <>
      <HeroSectionTraining />
      <TrainingSection/>
    </>
  );
}