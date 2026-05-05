import Image from "next/image";
import SliderWCEHome from "./SliderWCEHome";

export default function EventsSectionHome() {
    return (
        <section
            className="hidden md:block relative w-full overflow-visible"
            style={{ marginTop: "-8vw" }}
        >
            <div className="relative w-full" style={{ aspectRatio: "1443/1202", containerType: "inline-size" }}>
                <div className="absolute inset-0">
                    <Image src="/images/wce/home/BG-Yellow.png" alt="" fill sizes="100vw"
                        className="object-cover object-center" priority />
                </div>
            </div>

            <div className="absolute top-[8%] w-full text-center">
                <p style={{
                    fontFamily: "TimesNewRoman, serif",
                    fontWeight: 500,
                    fontSize: "6.5cqw",
                    color: "#CF388E",
                    lineHeight: 1.4,
                    letterSpacing: "-0.05em",
                }}>
                    <span style={{ fontFamily: "Amoresa, serif" }}>O</span>
                    {"ur Series of Events"}
                </p>
            </div>

            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4">
                <Image
                    src="/images/wce/home/Grid.png"
                    alt="Grid"
                    width={1338}
                    height={859}
                    style={{ width: "85%", height: "auto" }}
                />
            </div>

            {/* Slider di dalam section */}
            <div className="absolute w-full" style={{ top: "30%", zIndex: 30 }}>
                <SliderWCEHome height="clamp(400px, 45vw, 650px)" />
            </div>
        </section>
    );
}