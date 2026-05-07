import Image from "next/image";
import PhotoCollage from "./PhotoCollage";

export default function HeroSectionHome() {
    return (
        <>
            <section className="hidden md:block relative w-full overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: "1443/970", containerType: "inline-size" }}>
                    <div className="absolute inset-0">
                        <Image src="/images/wce/home/BG-Pink.png" alt="" fill sizes="100vw"
                            className="object-cover object-center" priority />
                    </div>
                </div>

                {/* Bunga dekorasi */}
                <Image src="/images/wce/home/Flower.png" alt="" width={120} height={120}
                    style={{
                        position: "absolute", bottom: "10%", left: "10%",
                        width: "clamp(60px, 10vw, 200px)", height: "auto",
                        zIndex: 10, pointerEvents: "none",
                    }}
                />
                <Image src="/images/wce/home/Flower.png" alt="" width={80} height={80}
                    style={{
                        position: "absolute", top: "22%", left: "4%",
                        width: "clamp(40px, 7vw, 90px)", height: "auto",
                        zIndex: 10, pointerEvents: "none",
                    }}
                />
                <Image src="/images/wce/home/Flower.png" alt="" width={60} height={60}
                    style={{
                        position: "absolute", top: "5%", right: "10%",
                        width: "clamp(30px, 7vw, 70px)", height: "auto",
                        zIndex: 10, pointerEvents: "none",
                    }}
                />

                <Image src="/images/wce/home/Flower.png" alt="" width={60} height={60}
                    style={{
                        position: "absolute", bottom: "10%", right: "15%",
                        width: "clamp(30px, 7vw, 70px)", height: "auto",
                        zIndex: 10, pointerEvents: "none",
                    }}
                />

                <div className="absolute top-[8%] w-full text-center">
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontWeight: 500,
                        fontSize: "7.5cqw",
                        color: "#CF388E",
                        lineHeight: 1.4,
                        letterSpacing: "-0.05em",
                    }}>
                        <span style={{ fontFamily: "Amoresa, serif" }}>W</span>
                        {"eekend Career Expo"}
                    </p>
                </div>

                <div className="absolute top-[24%] w-full text-center">
                    <p style={{
                        fontFamily: "TTCommons, serif",
                        fontWeight: 700,
                        fontSize: "2.5cqw",
                        color: "#CF388E",
                        lineHeight: 1.4,
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                    }}>
                        {"25 May 2026-31 August 2026"}
                    </p>
                </div>

                <div className="absolute top-[32%] w-full text-center">
                    <p style={{
                        fontFamily: "TTCommons, serif",
                        fontWeight: 500,
                        fontSize: "2cqw",
                        color: "#CF388E",
                        lineHeight: 1.4,
                        letterSpacing: "-0.03em",
                    }}>
                        {"Introducing the theme of "} <strong>#ThriveForImpact</strong> {"  to encourage future"}
                        <br />
                        {"leaders to act with purpose and lead with intention."}
                    </p>
                </div>

                {/* PhotoCollage di dalam section, overlay di atas BG */}
                <div className="absolute inset-0 w-full h-full">
                    <PhotoCollage />
                </div>
            </section>

            {/* MOBILE */}
            <section className="block md:hidden relative w-full overflow-hidden" style={{ marginTop: "-8%" }}>
                <div className="relative w-full">
                    <Image
                        src="/images/wce/home/mobile/BG-Pink-WCE-mb.png"
                        alt=""
                        width={393}
                        height={700}
                        style={{ width: "100%", height: "auto", display: "block" }}
                        priority
                    />
                </div>
                {/* Konten */}
                <div className="absolute inset-0 flex flex-col items-center px-4" style={{ paddingTop: "6%" }}>

                    {/* Title */}
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontWeight: 500,
                        fontSize: "clamp(2rem, 10vw, 3.5rem)",
                        color: "#CF388E",
                        lineHeight: 1.2,
                        letterSpacing: "-0.05em",
                        textAlign: "center",
                        margin: 0,
                    }}>
                        <span style={{ fontFamily: "Amoresa, serif" }}>W</span>
                        {"eekend Career Expo"}
                    </p>

                    {/* Date */}
                    <p style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(0.75rem, 3.5vw, 1.1rem)",
                        color: "#CF388E",
                        lineHeight: 1.4,
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                        textAlign: "center",
                        marginTop: "3%",
                    }}>
                        {"25 May 2026–31 August 2026"}
                    </p>

                    {/* Description */}
                    <p style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontWeight: 500,
                        fontSize: "clamp(0.7rem, 3vw, 1rem)",
                        color: "#CF388E",
                        lineHeight: 1.5,
                        textAlign: "center",
                        marginTop: "3%",
                    }}>
                        {"Introducing the theme of "}<strong>#ThriveForImpact</strong>{" to encourage future leaders to act with purpose and lead with intention."}
                    </p>

                    {/* Photo Collage */}
                    <div className="w-full">
                        <PhotoCollage isMobile={true} />
                    </div>
                </div>
            </section>
        </>
    );
}