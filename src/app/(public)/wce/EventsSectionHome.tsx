import Image from "next/image";
import SliderWCEHome from "./SliderWCEHome";

export default function EventsSectionHome() {
    return (
        <section
            className="hidden md:block relative w-full overflow-visible"
            style={{ marginTop: "-8vw", zIndex: 10}}
        >
            <div className="relative w-full" style={{ aspectRatio: "1443/1202", containerType: "inline-size" }}>
                <div className="absolute inset-0">
                    <Image src="/images/wce/home/BG-Yellow.png" alt="" fill sizes="100vw"
                        className="object-cover object-center" priority />
                </div>
            </div>

            <div className="absolute top-[8%] w-full text-center">
                <p style={{
                    fontFamily: "Times New Roman, serif",
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

            {/* Bunga dekorasi */}
            <Image src="/images/wce/pre-event/Flower.png" alt="" width={100} height={100}
                style={{
                    position: "absolute", top: "5%", left: "2%",
                    width: "clamp(50px, 6vw, 100px)", height: "auto",
                    zIndex: 1, pointerEvents: "none", opacity: 0.9,
                }}
            />
            <Image src="/images/wce/pre-event/Flower.png" alt="" width={70} height={70}
                style={{
                    position: "absolute", top: "12%", right: "3%",
                    width: "clamp(35px, 4.5vw, 75px)", height: "auto",
                    zIndex: 1, pointerEvents: "none", opacity: 0.85,
                }}
            />
            <Image src="/images/wce/pre-event/Flower.png" alt="" width={120} height={120}
                style={{
                    position: "absolute", bottom: "15%", left: "1.5%",
                    width: "clamp(60px, 7vw, 120px)", height: "auto",
                    zIndex: 1, pointerEvents: "none", opacity: 0.9,
                }}
            />
            <Image src="/images/wce/pre-event/Flower.png" alt="" width={55} height={55}
                style={{
                    position: "absolute", bottom: "50%", right: "2%",
                    width: "clamp(30px, 5vw, 150px)", height: "auto",
                    zIndex: 1, pointerEvents: "none", opacity: 0.8,
                }}
            />
            <Image src="/images/wce/pre-event/Flower.png" alt="" width={55} height={55}
                style={{
                    position: "absolute", bottom: "25%", right: "2%",
                    width: "clamp(30px, 5vw, 150px)", height: "auto",
                    zIndex: 1, pointerEvents: "none", opacity: 0.8,
                }}
            />
        </section>
    );
}