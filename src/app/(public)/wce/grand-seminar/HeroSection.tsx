import Image from "next/image"
export default function HeroSectionGS() {
    return (
        <>
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

        {/* MOBILE */}
        <section className="block md:hidden relative w-full overflow-hidden" style={{ marginTop: "-1.5rem" }}>
            <div className="relative w-full" style={{ aspectRatio: "399/279" }}>
                <Image src="/images/wce/grand-seminar/mobile/BG-Blue-GS-mb.png" alt="" fill
                    className="object-cover object-center" priority />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-start px-6" style={{ paddingTop: "6%" }}>
                <p style={{
                    fontFamily: "TimesNewRoman, serif",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "clamp(2rem, 11vw, 4rem)",
                    color: "#FFDBEE",
                    lineHeight: 1.2,
                    letterSpacing: "-0.05em",
                    margin: 0,
                    textAlign: "center",
                }}>
                    <span style={{ fontFamily: "Amoresa, serif", fontStyle: "normal" }}>G</span>
                    {"rand Seminar"}
                </p>
                <p style={{
                    fontFamily: "TTCommons, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.8rem, 4.5vw, 1.2rem)",
                    color: "#FFDBEE",
                    lineHeight: 1.4,
                    marginTop: "2%",
                    textAlign: "center",
                }}>
                    {"This year's theme:"}
                </p>
                <p style={{
                    fontFamily: "TTCommons, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(0.7rem, 4.2vw, 2rem)",
                    color: "#FFDBEE",
                    lineHeight: 1.2,
                    letterSpacing: "-0.05em",
                    marginTop: "1%",
                    textAlign: "center",
                }}>
                    {'"Beyond The Hustle: Rewiring Women\'s Relationship With Work Through Purpose Alignment In The Agentic Era."'}
                </p>
                <p style={{
                    fontFamily: "TTCommons, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.65rem, 3.5vw, 0.9rem)",
                    color: "white",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    marginTop: "3%",
                    textAlign: "center",
                }}>
                    {"COUNTDOWN UNTIL OUR GRAND SEMINAR"}
                </p>
            </div>
        </section>
        </>
    );
}