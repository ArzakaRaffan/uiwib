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
            </section>

            {/* MOBILE */}
            <section
                className="block md:hidden relative min-h-screen overflow-hidden pt-16"
                style={{ backgroundColor: "#f5e6c8" }}
            >
                <div className="absolute inset-0">
                    <Image src="/images/homepage/hero/Background.png" alt="" fill sizes="100vw"
                        className="object-cover object-center" priority />
                </div>

                <div className="absolute top-4 left-4 z-[40]">
                    <Image src="/images/homepage/hero/Swirl.png" alt="" width={276} height={282}
                        style={{ width: "20vw", height: "auto" }} />
                </div>
                <div className="absolute top-4 right-4 z-[40]">
                    <Image src="/images/homepage/hero/Swirl3.png" alt="" width={276} height={282}
                        style={{ width: "20vw", height: "auto" }} />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 gap-6">
                    <Image src="/images/homepage/hero/Lanyard UIWIB.png" alt="Welcome to UI Women in Business"
                        width={791} height={708}
                        style={{ width: "85vw", height: "auto", maxWidth: "400px" }}
                        className="drop-shadow-2xl" priority />
                    <div className="flex gap-3 justify-center w-full">
                        <div className="rotate-[-4deg]">
                            <Image src="/images/homepage/hero/Picture 6.png" alt="" width={250} height={514}
                                style={{ width: "38vw", height: "auto" }} />
                        </div>
                        <div className="rotate-[4deg]">
                            <Image src="/images/homepage/hero/Picture 1.png" alt="" width={296} height={293}
                                style={{ width: "38vw", height: "auto" }} />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-[50]">
                    <Image src="/images/homepage/hero/Flower Border.png" alt="" width={1440} height={50}
                        style={{ width: "100%", height: "auto" }} />
                </div>
            </section>
        </>
    );
}