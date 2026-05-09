"use client";
import Image from "next/image";
import { useState } from "react";

const accordionItems = [
    {
        title: "Empower",
        content: "UIWIB provides an uplifting platform for women to become stronger and more confident in achieving their goals and dreams. UIWIB teaches not only its members, but also the society relevant gender issues and ways to strive in the professional world. Through every initiative, UIWIB holds dearly the mission to empower others.",
    },
    {
        title: "Connect",
        content: "UIWIB provides a hub for women from Universitas Indonesia to build connections with one another, alumni, and the professional world. Through collaborations with external partners such as companies, media, brands, and key opinion leaders, UIWIB embraces the need for students and fresh graduates to exchange ideas, experiences, and knowledge in order to thrive in the professional world and create an impact on society.",
    },
    {
        title: "Grow",
        content: "UIWIB recognizes the gaps in society and in education that limit the opportunities for women to grow towards their full potential. That is why, UIWIB aspires to help students from various backgrounds gain adequate access in sharpening their skills and grasp a deeper understanding of gender issues and various career opportunities, both within and outside the community.",
    },
];

export default function VisionMissionSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <>
            {/* ── DESKTOP ── */}
            <section className="hidden md:block relative w-full overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: "1440/900" }}>
                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/about-us/visionmission/VisionMission.png"
                            alt="" fill sizes="100vw"
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 z-0 bg-black/10" />

                    {/* Content */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8">
                        {/* Title */}
                        <Image
                            src="/images/about-us/visionmission/TitleVisionMission.png"
                            alt="Vision & Mission"
                            width={600}
                            height={100}
                            style={{ width: "50%", height: "auto" }}
                            className="mb-8"
                        />

                        {/* Accordion */}
                        <div style={{ width: "60%", display: "flex", flexDirection: "column", gap: "4vw" }}>
                            {accordionItems.map((item, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl overflow-hidden transition-all duration-300"
                                        style={{
                                            background: isOpen ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)",
                                            backdropFilter: "blur(12px)",
                                            border: isOpen ? "1.5px solid rgba(255,255,255,0.6)" : "1.5px solid rgba(255,255,255,0.25)",
                                            boxShadow: isOpen ? "0 8px 32px rgba(255,255,255,0.1)" : "none",
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="w-full flex items-center justify-center text-white font-bold cursor-pointer bg-transparent border-none gap-3"
                                            style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.4rem)", padding: "3% 5%" }}
                                            onClick={() => setOpenIndex(isOpen ? null : index)}
                                        >
                                            <span className="tracking-wide">{item.title}</span>
                                            <span
                                                className="flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0"
                                                style={{
                                                    width: "clamp(24px, 2vw, 32px)",
                                                    height: "clamp(24px, 2vw, 32px)",
                                                    background: isOpen ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
                                                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                                    fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
                                                }}
                                            >
                                                ↓
                                            </span>
                                        </button>

                                        <div style={{
                                            height: isOpen ? "1px" : "0px",
                                            background: "rgba(255,255,255,0.3)",
                                            transition: "height 0.3s ease",
                                            margin: "0 5%",
                                        }} />

                                        <div style={{
                                            maxHeight: isOpen ? "400px" : "0px",
                                            overflow: "hidden",
                                            transition: "max-height 0.4s ease",
                                        }}>
                                            <p
                                                className="text-white/90 leading-relaxed text-center"
                                                style={{ fontSize: "clamp(0.75rem, 1.1vw, 1rem)", padding: "3% 5%" }}
                                            >
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MOBILE ── */}
            <section className="block md:hidden relative w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src="/images/about-us/mobile/BG-Blue-VisMis-mb.png"
                        alt="" fill sizes="100vw" className="object-cover object-top" priority />
                </div>

                <div className="relative z-10 flex flex-col items-center px-5 py-4 gap-8">
                    {/* Title */}
                    <Image
                        src="/images/about-us/visionmission/TitleVisionMission.png"
                        alt="Vision & Mission"
                        width={600} height={100}
                        style={{ width: "clamp(200px, 80vw, 400px)", height: "auto" }}
                    />

                    {/* Cards — langsung terbuka semua */}
                    <div className="flex flex-col gap-4 w-full" style={{marginTop: "-2rem"}}>
                        {accordionItems.map((item) => (
                            <div key={item.title} className="overflow-hidden" style={{
                                background: "rgba(255,255,255,0.2)",
                                backdropFilter: "blur(12px)",
                                border: "1.5px solid rgba(255,255,255,0.5)",
                            }}>
                                <p className="text-white font-bold text-center" style={{
                                    fontSize: "clamp(1rem, 5vw, 1.3rem)",
                                    padding: "2% 5% 2%",
                                    fontFamily: "Times New Roman, serif",
                                    fontWeight: 300,
                                    letterSpacing: "-0.05em",
                                }}>
                                    {item.title}
                                </p>
                                <p className="text-white/90 leading-relaxed text-justify" style={{
                                    fontSize: "clamp(0.5rem, 3vw, 0.95rem)",
                                    padding: "1% 5% 4%",
                                    fontFamily: "TTCommons, serif",
                                    fontWeight: 300,
                                    letterSpacing: "-0.05em",
                                    lineHeight: "1.2"
                                }}>
                                    {item.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}