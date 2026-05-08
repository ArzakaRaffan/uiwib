import Image from "next/image";
import EnvelopeEmpower from "@/components/homepage/EnvelopeEmpower";
import EnvelopeConnect from "@/components/homepage/EnvelopeConnect";
import EnvelopeGrow from "@/components/homepage/EnvelopeGrow";

export default function TaglineSection() {
    return (
        <section id="tagline" className="relative" style={{ backgroundColor: "#f0d060" }}>

            {/* Flower Border */}
            <div className="hidden md:block absolute top-0 left-0 right-0 z-[40]" style={{ transform: "translateY(-50%)" }}>
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
            <div className="hidden md:block" style={{ containerType: "inline-size" }}>

                {/* 1. Blue Background + Tagline */}
                <div className="relative w-full" style={{
                    containerType: "inline-size",
                    aspectRatio: "1440/500"  // sesuai dimensi asli gambar
                }}>
                    <Image
                        src="/images/homepage/tagline/Blue-Background.png"
                        alt=""
                        fill
                        style={{ objectFit: "cover" }}
                        className="block"
                    />
                    <div style={{
                        position: "absolute",
                        top: "10cqw",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 25,
                        width: "100%",
                        padding: "0 1rem",
                        textAlign: "center",
                    }}>
                        <p style={{
                            fontFamily: "TimesNewRoman, serif",
                            fontStyle: "italic",
                            fontWeight: 300,
                            fontSize: "clamp(1.2rem, 2.5cqw, 5rem)",
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
                <div className="relative w-full" style={{
                    containerType: "inline-size",
                    aspectRatio: "1440/1563"
                }}>
                    <Image
                        src="/images/homepage/tagline/Pink-Background.png"
                        alt=""
                        fill
                        style={{ objectFit: "cover" }}
                        className="block"
                    />
                    <EnvelopeEmpower />
                    <EnvelopeConnect />
                    <EnvelopeGrow />

                    {/* WCE Logo */}
                    <div style={{ position: "absolute", top: "20cqw", left: "50%", transform: "translateX(-50%)", zIndex: 25 }}>
                        <Image
                            src="/images/homepage/tagline/WCE Logo.png"
                            alt="WCE Logo"
                            width={188}
                            height={198}
                            style={{ width: "clamp(60px, 13cqw, 188px)", height: "auto" }}
                        />
                    </div>

                    {/* WCE Explanation */}
                    <div style={{ position: "absolute", top: "37cqw", left: "50%", transform: "translateX(-50%)", zIndex: 25, width: "100%", padding: "0 1rem", textAlign: "center" }}>
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
                            <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal", position: "relative", top: "-0.1em" }}>W</span>
                            {"eekend Career Expo"}
                        </p>
                    </div>

                    <div style={{ position: "absolute", top: "50cqw", left: "50%", transform: "translateX(-50%)", zIndex: 25, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 1rem", textAlign: "center" }}>
                        <p style={{
                            fontFamily: "TTCommons, sans-serif",
                            fontWeight: 500,
                            fontSize: "clamp(1.5rem, 1.5cqw, 4rem)",
                            color: "#2555B7",
                            lineHeight: 1.4,
                            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}>
                            {"Established in 2021, Weekend Career Expo by UI Women in Business aims to bridge fresh"}
                            <br />
                            {"graduates and students to the professional fields through various informational sessions."}
                        </p>
                        <a href="/wce/" style={{
                            fontFamily: "TTCommons, sans-serif",
                            fontSize: "clamp(1rem, 2cqw, 5rem)",
                            fontWeight: 600,
                            color: "#CF388E",
                            textDecoration: "underline",
                            textAlign: "center",
                            marginTop: "2rem",
                        }}>
                            Learn More
                        </a>
                    </div>

                    {/* Calendar */}
                    <div style={{ position: "absolute", bottom: "1.5cqw", left: "50%", transform: "translateX(-50%)", zIndex: 25, width: "100%", display: "flex", justifyContent: "center", padding: "0 1rem" }}>
                        <Image
                            src="/images/homepage/tagline/Calendar WCE.png"
                            alt="WCE Calendar"
                            width={1360}
                            height={679}
                            style={{ width: "clamp(280px, 85cqw, 1360px)", height: "auto" }}
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