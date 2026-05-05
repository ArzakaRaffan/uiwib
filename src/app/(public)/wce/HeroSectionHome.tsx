import Image from "next/image";
import PhotoCollage from "./PhotoCollage";

export default function HeroSectionHome() {
    return (
        <section className="hidden md:block relative w-full overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: "1443/970", containerType: "inline-size" }}>
                <div className="absolute inset-0">
                    <Image src="/images/wce/home/BG-Pink.png" alt="" fill sizes="100vw"
                        className="object-cover object-center" priority />
                </div>
            </div>

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
    );
}