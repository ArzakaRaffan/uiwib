import CyclingPhoto from "@/components/about-us/CyclingPhoto";
import Image from "next/image";

export default function GetToKnowSection() {
    return (
        <>
            {/* ── DESKTOP ── */}
            <section className="hidden md:block relative w-full overflow-hidden">
                {/* Container dengan aspect ratio tetap — semua elemen di dalam ini */}
                <div className="relative w-full" style={{ aspectRatio: "1440/900", containerType: "inline-size" }}>

                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                        <Image src="/images/about-us/get-to-know/Background-GTK.png"
                            alt="" fill sizes="100vw" className="object-cover object-center" priority />
                    </div>
                    {/* Texture */}
                    <div className="absolute inset-0 z-10">
                        <Image src="/images/about-us/get-to-know/Texture-GTK.png"
                            alt="" fill sizes="100vw" className="object-cover object-center" priority />
                    </div>
                    {/* Elements */}
                    <div className="absolute top-0 left-0 z-20 w-full overflow-hidden">
                        <Image src="/images/about-us/get-to-know/Elements-GTK.png"
                            alt="" width={1440} height={800}
                            style={{ width: "103%", height: "auto", transform: "translateX(-5%) translateY(-5%)" }}
                            priority />
                    </div>

                    <div className="absolute z-30 text-center" style={{ top: "12%", right: "8%" }}>
                        <div style={{ lineHeight: 1.1 }}>
                            <div style={{
                                fontSize: "6.5cqw",  // relatif terhadap container width
                                color: "#CF388E",
                                lineHeight: 1,
                                letterSpacing: "-0.02em"
                            }}>
                                <span style={{ fontFamily: "Amoresa, serif" }}>G</span>
                                <span style={{ fontFamily: "TimesNewRoman, serif", fontStyle: "italic" }}>et to know</span>
                            </div>
                            <div style={{
                                fontFamily: "TimesNewRoman, serif",
                                fontSize: "9cqw",
                                color: "#CF388E",
                                fontWeight: 900,
                                lineHeight: 0.9,
                                letterSpacing: "-0.03em",
                            }}>
                                UIWIB
                            </div>
                        </div>
                    </div>

                    {/* UIWIB History */}
                    <div className="absolute z-30" style={{ top: "45%", right: "2%", width: "46%" }}>
                        <p style={{
                            fontFamily: "TTCommons, sans-serif",
                            fontSize: "clamp(1rem, 1.55vw, 2rem)",
                            color: "#CF388E",
                            textAlign: "justify",
                            lineHeight: 1.5,
                            letterSpacing: "0.01em",
                        }}>
                            <span style={{ fontWeight: 700 }}>
                                Universitas Indonesia Women in Business (UIWIB)
                            </span>{" "}
                            is a community initiated organization made by women from Universitas Indonesia for
                            women in the community as a whole and the general public. UIWIB strives to empower
                            female students at Universitas Indonesia through{" "}
                            <span style={{ fontWeight: 700 }}>career and gender education.</span>{" "}
                            Therefore, UI Women in Business upholds three missions:{" "}
                            <span style={{ fontWeight: 700 }}>empower, connect, and grow.</span>
                        </p>
                        <p style={{
                            fontFamily: "TTCommons, sans-serif",
                            fontSize: "clamp(1rem, 1.55vw, 2rem)",
                            color: "#CF388E",
                            textAlign: "justify",
                            lineHeight: 1.5,
                            letterSpacing: "0.01em",
                            marginTop: "1.5%",
                        }}>
                            This year, up to{" "}
                            <span style={{ fontWeight: 700 }}>70 women,</span>{" "}
                            under five different divisions, share the same dream to fulfill the vision and
                            mission of UIWIB through arranging various events and initiatives ranging from{" "}
                            <span style={{ fontWeight: 700 }}>
                                The Spring Circle, Weekend Career Expo, Gender Lens At Work, Creative
                                Workshops, and many more!
                            </span>{" "}
                            All with the same aim:{" "}
                            <span style={{ fontWeight: 700 }}>
                                empowering women for their future and beyond.
                            </span>
                        </p>
                    </div>
                    <CyclingPhoto />
                </div>
            </section>

            {/* ── MOBILE ── */}
            <section
                className="block md:hidden relative w-full overflow-hidden"
                style={{ backgroundColor: "#f0d060", minHeight: "100svh", paddingTop: "15vw" }}
            >
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <Image src="/images/about-us/get-to-know/Background-GTK.png"
                        alt="" fill sizes="100vw" className="object-cover object-center" priority />
                </div>
                {/* Texture */}
                <div className="absolute inset-0 z-10">
                    <Image src="/images/about-us/get-to-know/Texture-GTK.png"
                        alt="" fill sizes="100vw" className="object-cover object-center" priority />
                </div>
                {/* Elements */}
                <div className="absolute top-0 left-0 z-20 w-full overflow-hidden">
                    <Image src="/images/about-us/get-to-know/Elements-GTK.png"
                        alt="" width={1440} height={800}
                        style={{ minWidth: "150%", height: "auto", transform: "translateX(-10%) translateY(-5%)" }}
                        priority />
                </div>

                {/* Get To Know — TEXT */}
                <div className="absolute z-30 text-right" style={{ top: "12vw", right: "4vw" }}>
                    <div style={{ lineHeight: 1.1 }}>
                        <div style={{ fontSize: "clamp(1.8rem, 10vw, 4rem)", color: "#c2185b", lineHeight: 1 }}>
                            <span style={{ fontFamily: "Amoresa, serif" }}>G</span>
                            <span style={{ fontFamily: "TimesNewRoman, serif", fontStyle: "italic" }}>et to know</span>
                        </div>
                        <div style={{
                            fontFamily: "TimesNewRoman, serif",
                            fontSize: "clamp(2.2rem, 13vw, 5rem)",
                            color: "#c2185b",
                            fontWeight: "bold",
                            lineHeight: 1,
                        }}>
                            UIWIB
                        </div>
                    </div>
                </div>

                {/* UIWIB History — TEXT */}
                <div className="absolute z-30" style={{ bottom: "48vw", right: "2vw", width: "80vw" }}>
                    <p style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontSize: "clamp(0.65rem, 3vw, 0.9rem)",
                        color: "#4a0030",
                        textAlign: "justify",
                        lineHeight: 1.7,
                    }}>
                        <span style={{ fontWeight: 700 }}>
                            Universitas Indonesia Women in Business (UIWIB)
                        </span>{" "}
                        is a community initiated organization made by women from Universitas Indonesia for
                        women in the community as a whole and the general public. UIWIB strives to empower
                        female students at Universitas Indonesia through{" "}
                        <span style={{ fontWeight: 700 }}>career and gender education.</span>{" "}
                        Therefore, UI Women in Business upholds three missions:{" "}
                        <span style={{ fontWeight: 700 }}>empower, connect, and grow.</span>
                    </p>
                    <p style={{
                        fontFamily: "TTCommons, sans-serif",
                        fontSize: "clamp(0.65rem, 3vw, 0.9rem)",
                        color: "#4a0030",
                        textAlign: "justify",
                        lineHeight: 1.7,
                        marginTop: "3vw",
                    }}>
                        This year, up to{" "}
                        <span style={{ fontWeight: 700 }}>70 women,</span>{" "}
                        under five different divisions, share the same dream to fulfill the vision and
                        mission of UIWIB through arranging various events and initiatives ranging from{" "}
                        <span style={{ fontWeight: 700 }}>
                            The Spring Circle, Weekend Career Expo, Gender Lens At Work, Creative
                            Workshops, and many more!
                        </span>{" "}
                        All with the same aim:{" "}
                        <span style={{ fontWeight: 700 }}>
                            empowering women for their future and beyond.
                        </span>
                    </p>
                </div>

                {/* Camera */}
                <div className="absolute z-30" style={{ bottom: "6vw", left: "0vw" }}>
                    <Image src="/images/about-us/get-to-know/Camera.png" alt="Camera"
                        width={500} height={400} style={{ width: "75vw", height: "auto" }} />
                </div>
                {/* Photo */}
                <div className="absolute z-20 rotate-[5deg]" style={{ bottom: "10vw", left: "8vw" }}>
                    <Image src="/images/about-us/get-to-know/Photo1.png" alt="Photo"
                        width={500} height={400} style={{ width: "50vw", height: "auto" }} />
                </div>
            </section>
        </>
    );
}