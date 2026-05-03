// HeroSection.tsx
import Image from "next/image"
export default function HeroSectionGS() {
    return (
        <section className="hidden md:block relative w-full overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: "1440/650", containerType: "inline-size" }}>
                <div className="absolute inset-0">
                    <Image src="/images/wce/grand-seminar/Background-Blue.png" alt="" fill sizes="100vw"
                        className="object-cover object-center" priority />
                </div>
                <div className="absolute top-[8%] w-full text-center">
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: "7cqw",
                        color: "#FFDBEE",
                        lineHeight: 1.4,
                    }}>
                        <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal" }}>G</span>
                        {"rand Seminar"}
                    </p>
                </div>
                <div className="absolute top-[32%] w-full text-center">
                    <p style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontWeight: 700,
                        fontSize: "3cqw",
                        color: "#FFDBEE",
                        lineHeight: 1.4,
                    }}>
                        {"This year's theme:"}
                    </p>
                </div>
                <div className="absolute top-[42%] w-full text-center px-8">
                    <p style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontWeight: 500,
                        fontSize: "2.5cqw",
                        color: "#FFDBEE",
                        lineHeight: 1.4,
                        letterSpacing: "-0.02em",
                    }}>
                        {'"Beyond The Hustle: Rewiring Women\'s Relationship With'}
                        <br />
                        {'Work Through Purpose Alignment In The Agentic Era."'}
                    </p>
                </div>
                <div className="absolute bottom-[25%] w-full text-center">
                    <p style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontWeight: 700,
                        fontSize: "2.5cqw",
                        color: "white",
                        letterSpacing: "0em",
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                    }}>
                        {"COUNTDOWN UNTIL OUR GRAND SEMINAR"}
                    </p>
                </div>
            </div>
        </section>
    );
}