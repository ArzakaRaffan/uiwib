// HeroSection.tsx
import Image from "next/image"
export default function HeroSectionPE() {
    return (
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
                <div className="absolute bottom-[37%] left-1/2 -translate-x-1/2 z-[25] w-full  flex justify-center px-4 text-center">
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
    )
}