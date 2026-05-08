import Image from "next/image"
export default function HeroSectionTraining() {
    return (
        <>
        <section className="hidden md:block relative w-full overflow-visible z-10">
            <div className="relative w-full" style={{ aspectRatio: "1442/461", containerType: "inline-size" }}>
                <div className="absolute inset-0">
                    <Image src="/images/wce/training/BG-Pink-Training.png" alt="" fill sizes="100vw"
                        className="object-cover object-center" priority />
                </div>

                {/* Teks di dalam div aspect ratio supaya ikut scale */}
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: "clamp(4px, 1vw, 20px)", paddingBottom: "5%" }}>
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontWeight: 500,
                        fontSize: "clamp(2rem, 7.5vw, 10rem)",
                        color: "#CF388E",
                        lineHeight: 1.2,
                        letterSpacing: "-0.05em",
                        margin: 0,
                        textAlign: "center",
                    }}>
                        <span style={{ fontFamily: "Amoresa, serif" }}>T</span>
                        {"raining"}
                    </p>
                    <p style={{
                        fontFamily: "TTCommons, serif",
                        fontWeight: 300,
                        fontSize: "clamp(0.6rem, 1.6vw, 2rem)",
                        color: "#CF388E",
                        lineHeight: 1.5,
                        letterSpacing: "-0.05em",
                        margin: 0,
                        textAlign: "center",
                    }}>
                        {"Organized by Universitas Indonesia Women in Business"}
                        <br/>
                        {"Weekend Career Expo 2026 holds two types of trainings."}
                    </p>
                </div>
            </div>
        </section>

        {/* MOBILE */}
        <section className="block md:hidden relative w-full overflow-hidden" style={{ marginTop: "-1.5rem" }}>
            <div className="relative w-full" style={{ aspectRatio: "393/220" }}>
                <Image src="/images/wce/training/BG-Pink-Training.png" alt="" fill
                    className="object-cover object-center" priority />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4" style={{ paddingBottom: "5%" }}>
                <p style={{
                    fontFamily: "TimesNewRoman, serif",
                    fontWeight: 500,
                    fontSize: "clamp(2rem, 10vw, 3.5rem)",
                    color: "#CF388E",
                    lineHeight: 1.2,
                    letterSpacing: "-0.05em",
                    margin: 0,
                    textAlign: "center",
                }}>
                    <span style={{ fontFamily: "Amoresa, serif" }}>T</span>
                    {"raining"}
                </p>
                <p style={{
                    fontFamily: "TTCommons, serif",
                    fontWeight: 300,
                    fontSize: "clamp(0.7rem, 3.5vw, 1rem)",
                    color: "#CF388E",
                    lineHeight: 1.5,
                    letterSpacing: "-0.05em",
                    margin: 0,
                    textAlign: "center",
                    marginTop: "4%",
                }}>
                    {"Organized by Universitas Indonesia Women in Business"}
                    <br />{"Weekend Career Expo 2026 holds two types of trainings."}
                </p>
            </div>
        </section>
        </>
    )
}