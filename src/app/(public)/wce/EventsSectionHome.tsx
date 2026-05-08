"use client";

import Image from "next/image";
import Link from "next/link";
import SliderWCEHome from "./SliderWCEHome";


const eventCards = [
    { src: "/images/wce/home/Slider1.png", label: "Pre-Event", href: "/wce/pre-event", btnColor: "#E8A020" },
    { src: "/images/wce/home/Slider2.png", label: "Competition", href: "/wce/competition", btnColor: "#4A90D9" },
    { src: "/images/wce/home/Slider3.png", label: "Training", href: "/wce/training", btnColor: "#E91E8C" },
    { src: "/images/wce/home/Slider4.png", label: "Grand Seminar", href: "/wce/grand-seminar", btnColor: "#E8A020" },
];

export default function EventsSectionHome() {
    return (
        <>
            <section
                className="hidden md:block relative w-full overflow-visible"
                style={{ marginTop: "-8vw", zIndex: 10 }}
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

            {/* MOBILE */}
            <section className="block md:hidden relative w-full" style={{
                zIndex: 10,
                marginTop: "-2.5vw",
                backgroundImage: "url('/images/wce/home/mobile/BG-Events-mb.png')",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
            }}>

                <Image src="/images/wce/pre-event/Flower.png" alt="" width={120} height={120}
                    style={{ position: "absolute", top: "8%", left: "2%", width: "12vw", height: "auto", zIndex: 0, opacity: 0.9 }} />
                <Image src="/images/wce/pre-event/Flower.png" alt="" width={120} height={120}
                    style={{ position: "absolute", top: "2%", right: "2%", width: "10vw", height: "auto", zIndex: 0, opacity: 0.85 }} />
                <Image src="/images/wce/pre-event/Flower.png" alt="" width={120} height={120}
                    style={{ position: "absolute", bottom: "10%", left: "2%", width: "12vw", height: "auto", zIndex: 0, opacity: 0.9 }} />
                <Image src="/images/wce/pre-event/Flower.png" alt="" width={120} height={120}
                    style={{ position: "absolute", bottom: "3%", right: "2%", width: "15vw", height: "auto", zIndex: 0, opacity: 0.8 }} />

                <div className="relative flex flex-col items-center px-4" style={{ paddingTop: "6%", paddingBottom: "6%", zIndex: 10 }}>
                    <p style={{
                        fontFamily: "Times New Roman, serif",
                        fontWeight: 500,
                        fontSize: "clamp(1.8rem, 9vw, 3rem)",
                        color: "#CF388E",
                        lineHeight: 1.2,
                        letterSpacing: "-0.05em",
                        textAlign: "center",
                        margin: 0,
                    }}>
                        <span style={{ fontFamily: "Amoresa, serif" }}>O</span>
                        {"ur Series of Events"}
                    </p>

                    <div style={{
                        border: "1.5px solid #F5D96B",
                        borderRadius: "clamp(8px, 3vw, 16px)",
                        width: "98%",
                        marginTop: "5%",
                        padding: "clamp(-10px, -1vw, 8px)",
                        backgroundImage: `repeating-linear-gradient(
                to right,
                #F5D96B 0px,
                #F5D96B 1.5px,
                transparent 1.5px,
                transparent calc(100% / 6)
            )`,
                        backgroundSize: "100% 100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        {/* Row 1: Pre-Event + Competition */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                            {eventCards.slice(0, 2).map((card, i) => (
                                <div key={i} style={{ position: "relative" }}>
                                    <Image src={card.src} alt={card.label} width={1250} height={1250}
                                        style={{ width: "100%", height: "auto", display: "block" }} />
                                    <div style={{ position: "absolute", bottom: "10%", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
                                        <Link href={card.href} style={{
                                            background: card.btnColor, color: "#fff",
                                            padding: "5px clamp(10px, 3vw, 14px)", borderRadius: "20px",
                                            fontSize: "clamp(1px, 1.5vw, 14px)", fontWeight: 600,
                                            textDecoration: "none", whiteSpace: "nowrap",
                                        }}>Learn More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Row 2: Training + Grand Seminar */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                            {eventCards.slice(2, 4).map((card, i) => (
                                <div key={i} style={{ position: "relative" }}>
                                    <Image src={card.src} alt={card.label} width={1200} height={1200}
                                        style={{ width: "100%", height: "auto", display: "block" }} />
                                    <div style={{ position: "absolute", bottom: "10%", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
                                        <Link href={card.href} style={{
                                            background: card.btnColor, color: "#fff",
                                            padding: "5px clamp(10px, 3vw, 14px)", borderRadius: "20px",
                                            fontSize: "clamp(1px, 1.5vw, 14px)", fontWeight: 600,
                                            textDecoration: "none", whiteSpace: "nowrap",
                                        }}>Learn More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}