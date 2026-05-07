import Image from "next/image";

export default function HeroSectionHomepage() {
    return (
        <>
            {/* DESKTOP */}
            <section className="hidden md:block relative w-full overflow-hidden" style={{ height: "100vh" }}>
                {/* Background */}
                <div className="absolute inset-0">
                    <Image src="/images/homepage/hero/Background.png" alt="" fill sizes="100vw"
                        className="object-cover object-center" priority />
                </div>
                <div style={{ position: "absolute", inset: 0, containerType: "size" }}>

                    {/* Lanyard */}
                    <div style={{ position: "absolute", top: "-7%", left: "50%", transform: "translateX(-50%)", width: "51cqw", zIndex: 25 }}>
                        <Image src="/images/homepage/hero/Lanyard UIWIB.png" alt="" width={791} height={708}
                            style={{ width: "100%", height: "auto" }} className="drop-shadow-2xl" priority />
                    </div>

                    {/* Button Learn More inside Lanyard */}
                    <div style={{
                        position: "absolute",
                        top: "65%",
                        left: "51%",
                        transform: "translateX(-50%) rotate(-4deg)",
                        zIndex: 30,
                    }}>
                        <a
                            href="#tagline"
                            style={{
                                display: "inline-block",
                                fontFamily: "TTCommons, sans-serif",
                                fontSize: "clamp(0.9rem, 1.2cqw, 2rem)",
                                fontWeight: 500,
                                color: "#ffffff",
                                backgroundColor: "#2555B7",
                                padding: "0.6em 2em",
                                borderRadius: "15px",
                                textDecoration: "none",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                whiteSpace: "nowrap",
                            }}>
                            Learn More
                        </a>
                    </div>

                    {/* Dots */}
                    <div style={{ position: "absolute", top: "25%", left: "3%", width: "18cqw", zIndex: 15 }}>
                        <Image src="/images/homepage/hero/Dots.png" alt="" width={276} height={282} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: "0%", right: "1.7%", width: "16cqw", zIndex: 15 }}>
                        <Image src="/images/homepage/hero/Dots.png" alt="" width={276} height={282} style={{ width: "100%", height: "auto" }} />
                    </div>

                    {/* Swirls */}
                    <div style={{ position: "absolute", top: "5%", left: "11%", width: "15cqw", zIndex: 40 }}>
                        <Image src="/images/homepage/hero/Swirl.png" alt="" width={276} height={282} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: "5%", left: "8.7%", width: "15cqw", zIndex: 40 }}>
                        <Image src="/images/homepage/hero/Swirl2.png" alt="" width={276} height={282} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", top: "2%", right: "8.3%", width: "15cqw", zIndex: 40 }}>
                        <Image src="/images/homepage/hero/Swirl3.png" alt="" width={276} height={282} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: "7%", right: "7%", width: "17cqw", zIndex: 40 }}>
                        <Image src="/images/homepage/hero/Swirl4.png" alt="" width={295} height={197} style={{ width: "100%", height: "auto" }} />
                    </div>

                    {/* Glow */}
                    <div style={{ position: "absolute", top: "15%", left: "18%", width: "18cqw", zIndex: 15 }}>
                        <Image src="/images/homepage/hero/Glow.png" alt="" width={378} height={378} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: "17%", right: "18%", width: "18cqw", zIndex: 20 }}>
                        <Image src="/images/homepage/hero/Glow.png" alt="" width={378} height={378} style={{ width: "100%", height: "auto" }} />
                    </div>

                    {/* Pictures */}
                    <div style={{ position: "absolute", top: "18%", left: "12%", width: "19cqw", zIndex: 10 }}>
                        <Image src="/images/homepage/hero/Picture 1.png" alt="" width={296} height={293} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: "10%", right: "13%", width: "20cqw", zIndex: 15 }}>
                        <Image src="/images/homepage/hero/Picture 2.png" alt="" width={296} height={293} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: "-15%", left: "22%", width: "21cqw", zIndex: 10 }}>
                        <Image src="/images/homepage/hero/Picture 3.png" alt="" width={386} height={311} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", top: "-5%", left: "0%", width: "14cqw", zIndex: 20 }}>
                        <Image src="/images/homepage/hero/Picture 4.png" alt="" width={240} height={206} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", top: "-10%", right: "0%", width: "18cqw", zIndex: 20 }}>
                        <Image src="/images/homepage/hero/Picture 5.png" alt="" width={263} height={165} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", top: "60%", left: "0%", transform: "translateY(-50%)", width: "16cqw", zIndex: 20 }}>
                        <Image src="/images/homepage/hero/Picture 6.png" alt="" width={250} height={514} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: "-12%", right: "5.2%", width: "15cqw", zIndex: 20 }}>
                        <Image src="/images/homepage/hero/Picture 7.png" alt="" width={250} height={514} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div style={{ position: "absolute", top: "27%", right: "0%", width: "21cqw", zIndex: 20 }}>
                        <Image src="/images/homepage/hero/Picture 8.png" alt="" width={385} height={298} style={{ width: "100%", height: "auto" }} />
                    </div>
                </div>
            </section >

            {/* MOBILE */}
            <section className="block md:hidden relative overflow-hidden" style={{ height: "50svh" }}>
                {/* Background */}
                <div className="absolute inset-0" style={{
                    backgroundImage: "url('/images/homepage/hero/mobile/BG-Yellow-mb.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                }} />

                {/* Swirls */}
                <div className="absolute top-[5%] left-[2%] z-[40]">
                    <Image src="/images/homepage/hero/Swirl.png" alt="" width={276} height={282} style={{ width: "35vw", height: "auto" }} />
                </div>
                <div className="absolute top-[3%] right-[2%] z-[40]">
                    <Image src="/images/homepage/hero/Swirl3.png" alt="" width={276} height={282} style={{ width: "20vw", height: "auto" }} />
                </div>
                <div className="absolute bottom-[8%] left-[2%] z-[40]">
                    <Image src="/images/homepage/hero/Swirl2.png" alt="" width={276} height={282} style={{ width: "20vw", height: "auto" }} />
                </div>
                <div className="absolute bottom-[8%] right-[2%] z-[40]">
                    <Image src="/images/homepage/hero/Swirl4.png" alt="" width={295} height={197} style={{ width: "20vw", height: "auto" }} />
                </div>

                {/* Dots */}
                <div className="absolute top-[28%] left-[0%] z-[30]">
                    <Image src="/images/homepage/hero/Dots.png" alt="" width={276} height={282} style={{ width: "12vw", height: "auto" }} />
                </div>

                {/* Layout utama — pakai absolute positioning biar ga push section */}
                <div className="absolute inset-0 z-10 pt-14">

                    {/* Photo1 kiri atas */}
                    <div className="absolute z-[20]" style={{ top: "0%", left: "5%" }}>
                        <Image src="/images/homepage/hero/mobile/Photo1-mb.png" alt="" width={296} height={293}
                            style={{ width: "30vw", height: "auto" }} />
                    </div>

                    {/* Photo2 kanan atas */}
                    <div className="absolute z-[10]" style={{ top: "-10%", right: "0%" }}>
                        <Image src="/images/homepage/hero/mobile/Photo2-mb.png" alt="" width={296} height={293}
                            style={{ width: "30vw", height: "auto" }} />
                    </div>

                    <div className="absolute z-[40]" style={{ top: "-5%", right: "0%" }}>
                        <Image src="/images/homepage/hero/Dots.png" alt="" width={276} height={282} style={{ width: "12vw", height: "auto" }} />
                    </div>

                    {/* Photo3 kiri tengah */}
                    <div className="absolute z-[20]" style={{ top: "38%", left: "2%" }}>
                        <div className="rotate-[-3deg]">
                            <Image src="/images/homepage/hero/mobile/Photo3-mb.png" alt="" width={296} height={293}
                                style={{ width: "25vw", height: "auto" }} />
                        </div>
                    </div>

                    {/* Photo4 kanan tengah */}
                    <div className="absolute z-[20]" style={{ top: "38%", right: "2%" }}>
                        <div className="rotate-[3deg]">
                            <Image src="/images/homepage/hero/mobile/Photo4-mb.png" alt="" width={296} height={293}
                                style={{ width: "25vw", height: "auto" }} />
                        </div>
                    </div>

                    {/* Photo5 kiri bawah */}
                    <div className="absolute z-[20]" style={{ top: "65%", left: "2%" }}>
                        <div className="rotate-[-3deg]">
                            <Image src="/images/homepage/hero/mobile/Photo5-mb.png" alt="" width={250} height={514}
                                style={{ width: "25vw", height: "auto" }} />
                        </div>
                    </div>

                    {/* Photo6 kanan bawah */}
                    <div className="absolute z-[20]" style={{ top: "65%", right: "2%" }}>
                        <div className="rotate-[3deg]">
                            <Image src="/images/homepage/hero/mobile/Photo6-mb.png" alt="" width={250} height={514}
                                style={{ width: "25vw", height: "auto" }} />
                        </div>
                    </div>

                    {/* Lanyard — center */}
                    <div className="absolute z-[25]" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                        <Image src="/images/homepage/hero/mobile/Lanyard-mb.png" alt="Welcome to UI Women in Business"
                            width={791} height={708}
                            style={{ width: "70vw", height: "auto" }}
                            className="drop-shadow-2xl" priority />
                    </div>
                </div>
            </section>
        </>
    );
}