// SubEventsSection.tsx
import SliderSection from "@/components/homepage/SliderSection";
import Image from "next/image";

export default function SubEventsSection() {
    return (
        <>
            {/* ── DESKTOP ── */}
            <div className="hidden md:block relative w-full -mt-4 z-10">
                <Image
                    src="/images/homepage/tagline/Background-Sub-Events.png"
                    alt=""
                    width={1458}
                    height={1130}
                    style={{ width: "100%", height: "auto" }}
                    className="block"
                />
                <div className="absolute -top-[2.5%] left-0 w-full">
                    <SliderSection />
                </div>
                <div className="absolute bottom-[8vh] left-0 right-0 flex justify-center px-4">
                    <Image
                        src="/images/homepage/tagline/Sub-Events.png"
                        alt="Sub Events"
                        width={481}
                        height={335}
                        style={{ width: "clamp(140px, 27vw, 481px)", height: "auto" }}
                    />
                </div>
            </div>

            {/* ── MOBILE ── */}
            <div
                className="block md:hidden w-full -mt-6 z-10 flex flex-col items-center py-8 px-4 gap-6"
                style={{
                    backgroundImage: "url('/images/homepage/tagline/Background-Sub-Events.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                {/* Slider */}
                <SliderSection />

                {/* Sub Events title */}
                <Image
                    src="/images/homepage/tagline/Sub-Events.png"
                    alt="Sub Events"
                    width={481}
                    height={335}
                    style={{ width: "75vw", height: "auto", maxWidth: "350px" }}
                />
            </div>
        </>
    );
}