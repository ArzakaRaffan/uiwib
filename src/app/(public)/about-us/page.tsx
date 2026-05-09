import GetToKnowSection from "./GetToKnowSection";
import VisionMissionSection from "./VisionMissionSection";
import CyclingPhotoMobile from "@/components/about-us/CyclingPhotoMobile";

export default function AboutUsPage() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <GetToKnowSection />
        <VisionMissionSection />
      </div>

      {/* Mobile */}
      <div className="block md:hidden relative" style={{ overflowX: "clip" }}>
        <GetToKnowSection />
        <CyclingPhotoMobile />
        <VisionMissionSection />
      </div>
    </>
  );
}