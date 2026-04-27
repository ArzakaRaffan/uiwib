import Image from "next/image";

export default function HeroSectionHomepage() {
    return (
        <>
            {/* DESKTOP */}
            <section
                className="hidden md:block relative min-h-screen overflow-hidden pt-16"
                style={{ backgroundColor: "#f0d060" }}
            >
                {/* Background */}
                <div className="absolute inset-0">
                    <Image src="/images/homepage/hero/Background.png" alt="" fill sizes="100vw"
                        className="object-cover object-center" priority />
                </div>

                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-[25]">
                    <Image src="/images/homepage/hero/Lanyard UIWIB.png" alt="" width={791} height={708}
                        style={{ width: "clamp(380px, 62vw, 850px)", height: "auto" }}
                        className="drop-shadow-2xl" priority />
                </div>

                {/* Dots */}
                <div className="absolute top-[36%] left-[2.8vw] -translate-y-1/2 z-[15]">
                    <Image src="/images/homepage/hero/Dots.png" alt="" width={276} height={282}
                        style={{ width: "clamp(100px, 18vw, 276px)", height: "auto" }} />
                </div>
                <div className="absolute bottom-[-7vh] right-[1.7vw] -translate-y-1/2 z-[15]">
                    <Image src="/images/homepage/hero/Dots.png" alt="" width={276} height={282}
                        style={{ width: "clamp(100px, 18vw, 276px)", height: "auto" }} />
                </div>

                {/* Swirls */}
                <div className="absolute top-[8vh] left-[11.8vw] -translate-y-1/2 z-[40]">
                    <Image src="/images/homepage/hero/Swirl.png" alt="" width={276} height={282}
                        style={{ width: "clamp(100px, 15vw, 276px)", height: "auto" }} />
                </div>
                <div className="absolute bottom-[-2vh] left-[8.7vw] -translate-y-1/2 z-[40]">
                    <Image src="/images/homepage/hero/Swirl2.png" alt="" width={276} height={282}
                        style={{ width: "clamp(100px, 15vw, 276px)", height: "auto" }} />
                </div>
                <div className="absolute top-[2vh] right-[8.3vw] z-[40]">
                    <Image src="/images/homepage/hero/Swirl3.png" alt="" width={276} height={282}
                        style={{ width: "clamp(100px, 17vw, 276px)", height: "auto" }} />
                </div>
                <div className="absolute bottom-[10vh] right-[6.9vw] z-[40]">
                    <Image src="/images/homepage/hero/Swirl4.png" alt="" width={295} height={197}
                        style={{ width: "clamp(100px, 17vw, 295px)", height: "auto" }} />
                </div>

                {/* Glow */}
                <div className="absolute top-[30vh] left-[13.5vw] -translate-y-1/2 z-[15]">
                    <Image src="/images/homepage/hero/Glow.png" alt="" width={378} height={378}
                        style={{ width: "clamp(100px, 20vw, 378px)", height: "auto" }} />
                </div>
                <div className="absolute bottom-[5vh] right-[13.9vw] -translate-y-1/2 z-[20]">
                    <Image src="/images/homepage/hero/Glow.png" alt="" width={378} height={378}
                        style={{ width: "clamp(100px, 20vw, 378px)", height: "auto" }} />
                </div>

                {/* Pictures */}
                <div className="absolute top-[14%] left-[11.25vw] z-[10]">
                    <Image src="/images/homepage/hero/Picture 1.png" alt="" width={296} height={293}
                        style={{ width: "clamp(100px, 18vw, 296px)", height: "auto" }} />
                </div>
                <div className="absolute bottom-[15vh] right-[13.9vw] z-[15]">
                    <Image src="/images/homepage/hero/Picture 2.png" alt="" width={296} height={293}
                        style={{ width: "clamp(100px, 18vw, 296px)", height: "auto" }} />
                </div>
                <div className="absolute bottom-[-8vh] left-[30vw] -translate-x-1/2 z-[10]">
                    <Image src="/images/homepage/hero/Picture 3.png" alt="" width={386} height={311}
                        style={{ width: "clamp(100px, 23vw, 386px)", height: "auto" }} />
                </div>
                <div className="absolute top-0 left-[0.14vw] -translate-y-1/3 z-[20]">
                    <Image src="/images/homepage/hero/Picture 4.png" alt="" width={240} height={206}
                        style={{ width: "clamp(100px, 15vw, 240px)", height: "auto" }} />
                </div>
                <div className="absolute top-[-8vh] right-0 z-[20]">
                    <Image src="/images/homepage/hero/Picture 5.png" alt="" width={263} height={165}
                        style={{ width: "clamp(100px, 18vw, 263px)", height: "auto" }} />
                </div>
                <div className="absolute top-[50%] left-0 -translate-y-1/2 z-[20]">
                    <Image src="/images/homepage/hero/Picture 6.png" alt="" width={250} height={514}
                        style={{ width: "clamp(100px, 16vw, 250px)", height: "auto" }} />
                </div>
                <div className="absolute bottom-[-11vh] right-[5.2vw] z-[20]">
                    <Image src="/images/homepage/hero/Picture 7.png" alt="" width={250} height={514}
                        style={{ width: "clamp(100px, 16vw, 250px)", height: "auto" }} />
                </div>
                <div className="absolute top-[20vh] right-0 z-[20]">
                    <Image src="/images/homepage/hero/Picture 8.png" alt="" width={385} height={298}
                        style={{ width: "clamp(100px, 20vw, 385px)", height: "auto" }} />
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