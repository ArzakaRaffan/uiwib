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
        <section className="relative overflow-hidden min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/about-us/visionmission/VisionMission.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Overlay supaya konten lebih terbaca */}
            <div className="absolute inset-0 z-0 bg-black/10" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 md:py-20">
                {/* Title */}
                <Image
                    src="/images/about-us/visionmission/TitleVisionMission.png"
                    alt="Vision & Mission"
                    width={600}
                    height={100}
                    style={{
                        width: "clamp(180px, 45vw, 600px)",
                        height: "auto",
                    }}
                    className="mb-8 md:mb-12"
                />

                {/* Accordion */}
                <div className="flex flex-col gap-4 md:gap-6 w-full max-w-xl md:max-w-2xl">
                    {accordionItems.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={item.title}
                                className="rounded-2xl overflow-hidden transition-all duration-300"
                                style={{
                                    background: isOpen
                                        ? "rgba(255,255,255,0.25)"
                                        : "rgba(255,255,255,0.12)",
                                    backdropFilter: "blur(12px)",
                                    border: isOpen
                                        ? "1.5px solid rgba(255,255,255,0.6)"
                                        : "1.5px solid rgba(255,255,255,0.25)",
                                    boxShadow: isOpen
                                        ? "0 8px 32px rgba(255,255,255,0.1)"
                                        : "none",
                                }}
                            >
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between px-6 md:px-8 py-4 md:py-5 text-white font-bold cursor-pointer bg-transparent border-none gap-3"
                                    style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                >
                                    <span className="tracking-wide">{item.title}</span>
                                    <span
                                        className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 flex-shrink-0"
                                        style={{
                                            background: isOpen
                                                ? "rgba(255,255,255,0.3)"
                                                : "rgba(255,255,255,0.15)",
                                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                            fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                                        }}
                                    >
                                        ↓
                                    </span>
                                </button>

                                {/* Divider */}
                                <div
                                    style={{
                                        height: isOpen ? "1px" : "0px",
                                        background: "rgba(255,255,255,0.3)",
                                        transition: "height 0.3s ease",
                                        margin: "0 1.5rem",
                                    }}
                                />

                                <div
                                    style={{
                                        maxHeight: isOpen ? "600px" : "0px",
                                        overflow: "hidden",
                                        transition: "max-height 0.4s ease",
                                    }}
                                >
                                    <p
                                        className="px-6 md:px-8 py-5 text-white/90 leading-relaxed text-center"
                                        style={{ fontSize: "clamp(0.8rem, 1.8vw, 1rem)" }}
                                    >
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}