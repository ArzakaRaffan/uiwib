// HeroSection.tsx
import Image from "next/image"
export default function HeroSectionPE() {
    return (
        <>
            {/* DESKTOP */}
            <section
                className="hidden md:block relative w-full overflow-hidden"
                style={{ zIndex: 10, position: "relative" }}
            >
                <div
                    className="relative w-full"
                    style={{ aspectRatio: "1440/500", containerType: "inline-size" }}
                >
                    <div className="absolute inset-0">
                        <Image
                            src="/images/wce/pre-event/BG-Blue.png"
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-[25] w-full px-4 text-center">
                        <p style={{
                            fontFamily: "TimesNewRoman, serif",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "clamp(4rem, 7cqw, 12rem)",
                            color: "white",
                            lineHeight: 1.4,
                            letterSpacing: "0.01em",
                            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            textAlign: "center",
                        }}>
                            <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal" }}>P</span>
                            {"re-Event"}
                        </p>
                    </div>
                    <div className="absolute bottom-[37%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4 text-center">
                        <p style={{
                            fontFamily: "TTCommons, sans-serif",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "clamp(1.5rem,2cqw, 4rem)",
                            color: "white",
                            lineHeight: 1.5,
                            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}>
                            {"Organized by Universitas Indonesia Women in Business"}
                            <br />
                            {"This year, Weekend Career Expo 2026 works together with Unilever"}
                        </p>
                    </div>
                </div>
            </section>

            {/* MOBILE */}
            <section className="block md:hidden relative w-full overflow-hidden" style={{ marginTop: "-1.5rem" }}>
                <div className="relative w-full">
                    <Image
                        src="/images/wce/pre-event/mobile/BG-Blue-Pre-mb.png"
                        alt=""
                        width={393}
                        height={500}
                        style={{ width: "100%", height: "auto", display: "block" }}
                        priority
                    />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-start px-6" style={{ paddingTop: "5%" }}>
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontWeight: 500,
                        fontSize: "clamp(2rem, 10vw, 3rem)",
                        color: "white",
                        lineHeight: 1.2,
                        letterSpacing: "0.01em",
                        textAlign: "center",
                        margin: 0,
                        textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}>
                        <span style={{ fontFamily: "Amoresa, serif" }}>P</span>
                        {"re-Event"}
                    </p>
                    <p style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontWeight: 500,
                        fontSize: "clamp(0.75rem, 3.2vw, 1rem)",
                        color: "white",
                        lineHeight: 1.4,
                        textAlign: "center",
                        marginTop: "3%",
                        textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}>
                        {"Organized by Universitas Indonesia Women in Business, This year, Weekend Career Expo 2026 works together with Unilever."}
                    </p>
                </div>
            </section>
        </>
    )
}