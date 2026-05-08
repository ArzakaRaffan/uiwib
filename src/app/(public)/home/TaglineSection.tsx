import Image from "next/image";
import EnvelopeEmpower from "@/components/homepage/EnvelopeEmpower";
import EnvelopeConnect from "@/components/homepage/EnvelopeConnect";
import EnvelopeGrow from "@/components/homepage/EnvelopeGrow";

export default function TaglineSection() {
    return (
        <section id="tagline" className="relative" style={{ backgroundColor: "#f0d060" }}>

            {/* Flower Border */}
            <div className="absolute top-0 left-0 right-0 z-[40]" style={{ transform: "translateY(-50%)" }}>
                <Image
                    src="/images/homepage/hero/Flower Border.png"
                    alt=""
                    width={1440}
                    height={50}
                    style={{ width: "100%", height: "auto" }}
                />
            </div>

            {/* ═══════════════════════════════════════
                DESKTOP (md ke atas)
            ═══════════════════════════════════════ */}
            <div className="hidden md:block">

                {/* 1. Blue Background + Tagline */}
                <div className="relative w-full pt-4">
                    <Image
                        src="/images/homepage/tagline/Blue-Background.png"
                        alt=""
                        width={1440}
                        height={400}
                        style={{ width: "100%", height: "auto" }}
                        className="block"
                    />
                    <div className="absolute top-[30%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4 text-center">
                        <p style={{
                            fontFamily: "TimesNewRoman, serif",
                            fontStyle: "italic",
                            fontWeight: 300,
                            fontSize: "clamp(1.2rem, 2.3cqw, 3.5rem)",
                            color: "white",
                            lineHeight: 1.4,
                            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}>
                            {"Empowering women in Universitas Indonesia for"}
                            <br />
                            {"their future and beyond #"}
                            <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal" }}>S</span>
                            {"tronger"}
                            <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal" }}>T</span>
                            {"ogether."}
                        </p>
                    </div>
                </div>

                {/* 2. Pink Background + Envelopes + WCE */}
                <div className="relative w-full">
                    <Image
                        src="/images/homepage/tagline/Pink-Background.png"
                        alt=""
                        width={1440}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                        className="block"
                    />
                    <EnvelopeEmpower />
                    <EnvelopeConnect />
                    <EnvelopeGrow />

                    {/* WCE Logo */}
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 z-[25]">
                        <Image
                            src="/images/homepage/tagline/WCE Logo.png"
                            alt="WCE Logo"
                            width={188}
                            height={198}
                            style={{ width: "clamp(60px, 15vw, 188px)", height: "auto" }}
                        />
                    </div>

                    {/* WCE Explanation */}
                    <div className="absolute top-[37%] left-1/2 -translate-x-1/2 z-[25] w-full px-4 text-center">
                        <p style={{
                            fontFamily: "TimesNewRoman, serif",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: "clamp(4rem, 6.5cqw, 12rem)",
                            color: "#CF388E",
                            lineHeight: 1.4,
                            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            textAlign: "center",
                            letterSpacing: "-0.07em",
                        }}>
                            <span style={{
                                fontFamily: "Amoresa, serif",
                                fontStyle: "normal",
                                marginBottom: "1%",
                                position: "relative",
                                top: "-0.1em"  // naik dikit, sesuaikan nilainya
                            }}>W</span>
                            {"eekend Career Expo"}
                        </p>
                    </div>

                    <div className="absolute top-[47%] left-1/2 -translate-x-1/2 z-[25] w-full flex flex-col items-center px-4 text-center">
                        <p style={{
                            fontFamily: "TTCommons, sans-serif",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "clamp(1.5rem,1.5cqw, 4rem)",
                            color: "#2555B7",
                            lineHeight: 1.4,
                            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}>
                            {"Established in 2021, Weekend Career Expo by UI Women in Business aims to bridge fresh"}
                            <br />
                            {"graduates and students to the professional fields through various informational sessions."}
                        </p>
                        <a
                            href="/wce/"
                            style={{
                                fontFamily: "TTCommons, sans-serif",
                                fontSize: "clamp(1rem, 2cqw, 5rem)",
                                fontWeight: 600,
                                color: "#CF388E",
                                textDecoration: "underline",
                                textAlign: "center",
                                marginTop: "2rem",
                            }}
                        >
                            Learn More
                        </a>
                    </div>

                    {/* Calendar */}
                    <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4">
                        <Image
                            src="/images/homepage/tagline/Calendar WCE.png"
                            alt="WCE Calendar"
                            width={1360}
                            height={679}
                            style={{ width: "clamp(280px, 85vw, 1360px)", height: "auto" }}
                        />
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════
    MOBILE (di bawah md)
═══════════════════════════════════════ */}
            <div className="block md:hidden relative w-full">
                <Image
                    src="/images/homepage/tagline/mobile/BG-Blue-mb.png"
                    alt=""
                    width={393}
                    height={600}
                    style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div className="absolute inset-0 flex items-start justify-center pt-[8%] px-6">
                    <p style={{
                        fontFamily: '"Times New Roman", serif',
                        fontStyle: "normal",
                        fontWeight: 300,
                        fontSize: "clamp(0.5rem, 4.4vw, 2rem)",
                        color: "white",
                        lineHeight: 1.5,
                        textAlign: "center",
                    }}>
                        {"Empowering women in Universitas Indonesia for their future and beyond #"}
                        <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal" }}>S</span>
                        {"tronger"}
                        <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal" }}>T</span>
                        {"ogether."}
                    </p>
                </div>
                <EnvelopeEmpower isMobile={true} isStatic={true} />
                <EnvelopeConnect isMobile={true} isStatic={true} />
                <EnvelopeGrow isMobile={true} isStatic={true} />
            </div>

            {/* WCE Section Mobile */}
            <div className="block md:hidden relative w-full" style={{ marginTop: "-3.5%" }}>
                {/* Background */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/homepage/tagline/mobile/BG-Pink-mb.png"
                        alt=""
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                </div>

                {/* Konten — in flow, bukan absolute */}
                <div className="relative z-10 flex flex-col items-center px-4 py-8">
                    {/* WCE Logo */}
                    <Image
                        src="/images/homepage/tagline/WCE Logo.png"
                        alt="WCE Logo"
                        width={188}
                        height={198}
                        style={{ width: "clamp(50px, 18vw, 120px)", height: "auto", marginTop: "4%" }}
                    />

                    {/* Weekend Career Expo title */}
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: "clamp(2rem, 9vw, 4rem)",
                        color: "#CF388E",
                        lineHeight: 1.2,
                        textAlign: "center",
                        letterSpacing: "-0.07em",
                        marginTop: "4%",
                    }}>
                        <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal", position: "relative", top: "-0.1em" }}>W</span>
                        {"eekend Career Expo"}
                    </p>

                    {/* Description */}
                    <p style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontWeight: 500,
                        fontSize: "clamp(0.75rem, 3.2vw, 1rem)",
                        color: "#2555B7",
                        lineHeight: 1.5,
                        textAlign: "center",
                        marginTop: "4%",
                    }}>
                        {"Established in 2021, Weekend Career Expo by UI Women in Business aims to bridge fresh graduates and students to the professional fields through various informational sessions."}
                    </p>

                    {/* Learn More */}
                    <a href="/wce/" style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontSize: "clamp(0.85rem, 3.5vw, 1.2rem)",
                        fontWeight: 600,
                        color: "#CF388E",
                        textDecoration: "underline",
                        marginTop: "4%",
                    }}>
                        Learn More
                    </a>

                    {/* Calendar */}
                    <Image
                        src="/images/homepage/tagline/Calendar WCE.png"
                        alt="WCE Calendar"
                        width={1360}
                        height={679}
                        style={{ width: "92vw", height: "auto", marginTop: "4%" }}
                    />
                </div>
            </div>
        </section >
    );
}