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

            {/* Content */}
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 bottom-[15px]">
                {/* Title */}
                <Image
                    src="/images/about-us/visionmission/TitleVisionMission.png"
                    alt="Vision & Mission"
                    width={600}
                    height={100}
                    style={{ width: "50vw", height: "auto", maxWidth: "600px", minWidth: "200px" }}
                    className="mb-10"
                />

                {/* Accordion */}
                <div className="flex flex-col gap-10 w-full max-w-2xl">
                    {accordionItems.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={item.title}
                                className="rounded-xl overflow-hidden border border-white/30"
                                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                            >
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center px-6 py-4 text-white font-semibold text-2xl cursor-pointer bg-transparent border-none gap-2"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                >
                                    <span>{item.title}</span>
                                    <span
                                        className="text-xl transition-transform duration-300"
                                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                    >
                                        ˅
                                    </span>
                                </button>

                                <div
                                    style={{
                                        maxHeight: isOpen ? "500px" : "0px",
                                        overflow: "hidden",
                                        transition: "max-height 0.4s ease",
                                    }}
                                >
                                    <p className="px-6 pb-5 text-white/90 text-sm leading-relaxed text-center">
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