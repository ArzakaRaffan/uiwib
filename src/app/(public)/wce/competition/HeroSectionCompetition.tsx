import Image from "next/image"
export default function HeroSectionCompetition() {
    return (
        <section className="hidden md:block relative w-full overflow-visible z-10">
            <div className="relative w-full" style={{ aspectRatio: "1442/461", containerType: "inline-size" }}>
                <div className="absolute inset-0">
                    <Image src="/images/wce/competition/BG-Yellow-Comp.png" alt="" fill sizes="100vw"
                        className="object-cover object-center" priority />
                </div>
            </div>
            <div className="absolute top-[18%] w-full text-center" style={{ containerType: "inline-size" }}>
                <p style={{
                    fontFamily: "TimesNewRoman, serif",
                    fontWeight: 500,
                    fontSize: "clamp(2.5rem, 7.5vw, 10rem)",
                    color: "#CF388E",
                    lineHeight: 1.4,
                    letterSpacing: "-0.05em",
                }}>
                    <span style={{ fontFamily: "Amoresa, serif" }}>C</span>
                    {"ompetition"}
                </p>
            </div>
            <div className="absolute bottom-[30%] w-full text-center">
                <p style={{
                    fontFamily: "TTCommons, serif",
                    fontWeight: 300,
                    fontSize: "clamp(0.75rem, 1.8vw, 2rem)",
                    color: "#CF388E",
                    lineHeight: 1.4,
                    letterSpacing: "-0.05em",
                }}>
                    {"Organized by Universitas Indonesia Women in Business Weekend Career"}
                    <br/>
                    {"Expo 2026 holds two competitions open for public"}
                </p>
            </div>
        </section>
    )
}