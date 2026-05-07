// SubEventsSection.tsx
import SliderSection from "@/components/homepage/SliderSection";
import Image from "next/image";

export default function SubEventsSection() {
    return (
        <>
            {/* ── DESKTOP ── */}
            <div className="hidden md:block relative w-full -mt-4    z-10">
                <Image
                    src="/images/homepage/tagline/Background-Sub-Events.png"
                    alt=""
                    width={1458}
                    height={1130}
                    style={{ width: "100%", height: "auto" }}
                    className="block"
                />
                <div className="absolute -top-[2.75%] left-0 w-full">
                    <SliderSection />
                </div>
                    <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4 text-center">
                        <p style={{
                            fontFamily: "Times New Roman, serif",
                            fontStyle: "italic",
                            fontWeight: 100,
                            fontSize: "clamp(4rem, 6.5cqw, 15rem)",
                            color: "#CF388E",
                            lineHeight: 1.4,
                            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}>
                            <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal" }}>S</span>
                            {"ub Events"}
                        </p>
                    </div>
            </div>

            {/* ── MOBILE ── */}
            <div
                className="md:hidden w-full -mt-6 z-10 flex flex-col items-center py-8 px-4 gap-6"
                style={{
                    backgroundImage: "url('/images/homepage/tagline/Background-Sub-Events.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                {/* Slider */}
                <SliderSection />
            </div>
        </>
    );
}