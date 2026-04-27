import Image from "next/image";


export default function HeroSectionHomepage() {
    return (
        <section
            className="relative min-h-[110vh] overflow-hidden pt-16"
            style={{ backgroundColor: "#f0d060" }}
        >
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="/images/homepage/hero/Background.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/*Lanyard*/}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-[25]">
                <Image
                    src="/images/homepage/hero/Lanyard UIWIB.png"
                    alt=""
                    width={791}
                    height={708}
                    style={{ width: "52vw", height: "auto", maxWidth: "700px" }}
                    className="drop-shadow-2xl"
                    priority
                />
            </div>

            {/*Elements*/}
            <div className="absolute top-[36%] left-[40px] -translate-y-1/2 z-[15]">
                <Image
                    src="/images/homepage/hero/Dots.png"
                    alt=""
                    width={276}
                    height={282}
                    style={{ width: "20vw", height: "auto", maxWidth: "276px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute -bottom-[100px] right-[25px] -translate-y-1/2 z-[15]">
                <Image
                    src="/images/homepage/hero/Dots.png"
                    alt=""
                    width={276}
                    height={282}
                    style={{ width: "22vw", height: "auto", maxWidth: "276px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute top-[110px] left-[170px] -translate-y-1/2 z-[40]">
                <Image
                    src="/images/homepage/hero/Swirl.png"
                    alt=""
                    width={276}
                    height={282}
                    style={{ width: "16.5vw", height: "auto", maxWidth: "276px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute -bottom-[20px] left-[125px] -translate-y-1/2 z-[40]">
                <Image
                    src="/images/homepage/hero/Swirl2.png"
                    alt=""
                    width={276}
                    height={282}
                    style={{ width: "17vw", height: "auto", maxWidth: "276px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute top-[20px] right-[120px] z-[40]">
                <Image
                    src="/images/homepage/hero/Swirl3.png"
                    alt=""
                    width={276}
                    height={282}
                    style={{ width: "20vw", height: "auto", maxWidth: "276px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute bottom-[100px] right-[100px] z-[40]">
                <Image
                    src="/images/homepage/hero/Swirl4.png"
                    alt=""
                    width={295}
                    height={197}
                    style={{ width: "20vw", height: "auto", maxWidth: "295px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute top-[300px] left-[195px] -translate-y-1/2 z-[15]">
                <Image
                    src="/images/homepage/hero/Glow.png"
                    alt=""
                    width={378}
                    height={378}
                    style={{ width: "22vw", height: "auto", maxWidth: "378px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute bottom-[55px] right-[200px] -translate-y-1/2 z-[20]">
                <Image
                    src="/images/homepage/hero/Glow.png"
                    alt=""
                    width={378}
                    height={378}
                    style={{ width: "22vw", height: "auto", maxWidth: "378px", minWidth: "120px" }}
                />
            </div>


            {/*Pictures*/}
            <div className="absolute top-[14%] left-[162px] z-[10]">
                <Image
                    src="/images/homepage/hero/Picture 1.png"
                    alt=""
                    width={296}
                    height={293}
                    style={{ width: "20vw", height: "auto", maxWidth: "296px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute bottom-[150px] right-[200px] z-[15]">
                <Image
                    src="/images/homepage/hero/Picture 2.png"
                    alt=""
                    width={296}
                    height={293}
                    style={{ width: "20vw", height: "auto", maxWidth: "296px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute -bottom-[85px] left-[430px] -translate-x-1/2 z-[10]">
                <Image
                    src="/images/homepage/hero/Picture 3.png"
                    alt=""
                    width={386}
                    height={311}
                    style={{ width: "25vw", height: "auto", maxWidth: "386px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute top-0 left-2 -translate-y-1/2 z-20">
                <Image
                    src="/images/homepage/hero/Picture 4.png"
                    alt=""
                    width={240}
                    height={206}
                    style={{ width: "17vw", height: "auto", maxWidth: "240px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute -top-[75px] right-0 z-20">
                <Image
                    src="/images/homepage/hero/Picture 5.png"
                    alt=""
                    width={263}
                    height={165}
                    style={{ width: "20vw", height: "auto", maxWidth: "263px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute top-[55%] left-0 -translate-y-1/2 z-20">
                <Image
                    src="/images/homepage/hero/Picture 6.png"
                    alt=""
                    width={250}
                    height={514}
                    style={{ width: "17.5vw", height: "auto", maxWidth: "250px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute -bottom-[75px] right-[75px] z-20">
                <Image
                    src="/images/homepage/hero/Picture 7.png"
                    alt=""
                    width={250}
                    height={514}
                    style={{ width: "17.5vw", height: "auto", maxWidth: "250px", minWidth: "120px" }}
                />
            </div>

            <div className="absolute top-[200px] right-0 z-20">
                <Image
                    src="/images/homepage/hero/Picture 8.png"
                    alt=""
                    width={385}
                    height={298}
                    style={{ width: "22.5vw", height: "auto", maxWidth: "385px", minWidth: "120px" }}
                />
            </div>
        </section>
    );
}