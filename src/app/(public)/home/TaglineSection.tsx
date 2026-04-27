import Image from "next/image";
import EnvelopeEmpower from "@/components/homepage/EnvelopeEmpower";
import EnvelopeConnect from "@/components/homepage/EnvelopeConnect";
import EnvelopeGrow from "@/components/homepage/EnvelopeGrow";

export default function TaglineSection() {
    return (
        <section className="relative">

            <div className="absolute -top-[85px] left-0 right-0 z-[40]">
                <Image
                    src="/images/homepage/hero/Flower Border.png"
                    alt=""
                    width={1440}
                    height={50}
                    style={{ width: "100%", height: "auto" }}
                />
            </div>

            {/* ── 1. TAGLINE (Blue Background) ── */}
            <div className="relative w-full">
                <Image
                    src="/images/homepage/tagline/Blue-Background.png"
                    alt=""
                    width={1440}
                    height={400}
                    style={{ width: "100%", height: "auto" }}
                    className="block"
                />

                <div className="absolute top-[100px] left-1/2 -translate-x-1/2 z-[25]">
                    <Image
                        src="/images/homepage/tagline/Tagline.png"
                        alt=""
                        width={791}
                        height={708}
                        style={{ width: "55vw", height: "auto", maxWidth: "700px" }}
                        className="drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>

            <div className="relative w-full">
                <Image
                    src="/images/homepage/tagline/Pink-Background.png"
                    alt=""
                    width={1440}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                    className="block"
                />


                <EnvelopeEmpower />

                <EnvelopeConnect />

                <EnvelopeGrow />

                <div className="absolute top-[230px] left-0 right-0 flex justify-center px-4">
                    <Image
                        src="/images/homepage/tagline/WCE Logo.png"
                        alt="Grow"
                        width={188}
                        height={198}
                        style={{ width: "13vw", height: "auto", maxWidth: "188px", minWidth: "40px" }}
                    />
                </div>

                <div className="absolute top-[345px] left-0 right-0 flex justify-center px-4">
                    <Image
                        src="/images/homepage/tagline/WCE-Explanation.png"
                        alt="Grow"
                        width={960}
                        height={343}
                        style={{ width: "65vw", height: "auto", maxWidth: "960px", minWidth: "280px" }}
                    />
                </div>

                <div className="absolute bottom-[100px] left-0 right-0 flex justify-center px-4">
                    <Image
                        src="/images/homepage/tagline/Calendar WCE.png"
                        alt="Grow"
                        width={1360}
                        height={679}
                        style={{ width: "85vw", height: "auto", maxWidth: "1360px", minWidth: "280px" }}
                    />
                </div>
            </div>
        </section>
    );
}
