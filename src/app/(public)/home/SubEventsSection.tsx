import SliderSection from "@/components/homepage/SliderSection";
import Image from "next/image";

export default function SubEventsSection() {
    return (
        <div className="relative w-full -mt-3 z-10">
            <Image
                src="/images/homepage/tagline/Background-Sub-Events.png"
                alt=""
                width={1458}
                height={1130}
                style={{ width: "100%", height: "auto" }}
                className="block"
            />
            <div className="absolute -top-[53px] left-0 w-full">
                <SliderSection />
            </div>
            <div className="absolute bottom-[50px] left-0 right-0 flex justify-center px-4">
                <Image
                    src="/images/homepage/tagline/Sub-Events.png"
                    alt="Grow"
                    width={481}
                    height={335}
                    style={{ width: "27vw", height: "auto", maxWidth: "481px", minWidth: "180px" }}
                />
            </div>
        </div>
    );
}