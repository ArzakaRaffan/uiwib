import Image from "next/image";
import EnvelopeEmpower from "@/components/homepage/EnvelopeEmpower";
import EnvelopeConnect from "@/components/homepage/EnvelopeConnect";
import EnvelopeGrow from "@/components/homepage/EnvelopeGrow";

export default function TaglineSection() {
    return (
        <section className="relative" style={{ backgroundColor: "#f0d060" }}>

            {/* Flower Border */}
            <div className="absolute top-0 left-0 right-0 z-[40]" style={{ transform: "translateY(-50%)" }}>
                <Image
                    src="/images/homepage/hero/Flower Border.png"
                    alt=""
                    width={1440}
                    height={50}
                    style={{ width: "100%", height: "auto" }}
                />
            </div>

            {/* ═══════════════════════════════════════
                DESKTOP (md ke atas)
            ═══════════════════════════════════════ */}
            <div className="hidden md:block">

                {/* 1. Blue Background + Tagline */}
                <div className="relative w-full pt-4">
                    <Image
                        src="/images/homepage/tagline/Blue-Background.png"
                        alt=""
                        width={1440}
                        height={400}
                        style={{ width: "100%", height: "auto" }}
                        className="block"
                    />
                    <div className="absolute top-[25%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4">
                        <Image
                            src="/images/homepage/tagline/Tagline.png"
                            alt="Empowering women in Universitas Indonesia"
                            width={791}
                            height={708}
                            style={{ width: "clamp(200px, 55vw, 700px)", height: "auto" }}
                            priority
                        />
                    </div>
                </div>

                {/* 2. Pink Background + Envelopes + WCE */}
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

                    {/* WCE Logo */}
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 z-[25]">
                        <Image
                            src="/images/homepage/tagline/WCE Logo.png"
                            alt="WCE Logo"
                            width={188}
                            height={198}
                            style={{ width: "clamp(60px, 15vw, 188px)", height: "auto" }}
                        />
                    </div>

                    {/* WCE Explanation */}
                    <div className="absolute top-[35%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4">
                        <Image
                            src="/images/homepage/tagline/WCE-Explanation.png"
                            alt="Weekend Career Expo"
                            width={960}
                            height={343}
                            style={{ width: "clamp(280px, 60vw, 960px)", height: "auto" }}
                        />
                    </div>

                    {/* Calendar */}
                    <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4">
                        <Image
                            src="/images/homepage/tagline/Calendar WCE.png"
                            alt="WCE Calendar"
                            width={1360}
                            height={679}
                            style={{ width: "clamp(280px, 80vw, 1360px)", height: "auto" }}
                        />
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════
                MOBILE (di bawah md)
            ═══════════════════════════════════════ */}
            <div className="block md:hidden">

                {/* 1. Tagline */}
                <div
                    className="w-full flex items-center justify-center py-12 px-6"
                    style={{
                        backgroundImage: "url('/images/homepage/tagline/Blue-Background.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "180px",
                    }}
                >
                    <Image
                        src="/images/homepage/tagline/Tagline.png"
                        alt="Empowering women in Universitas Indonesia"
                        width={791}
                        height={708}
                        style={{ width: "85vw", height: "auto", maxWidth: "400px" }}
                        priority
                    />
                </div>

                {/* 2. Pillars (Empower, Connect, Grow) */}
                <div
                    className="w-full flex flex-col items-center py-10 px-6 gap-8"
                    style={{
                        backgroundImage: "url('/images/homepage/tagline/Pink-Background.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Empower */}
                    <div className="flex flex-col items-center gap-3">
                        <Image
                            src="/images/homepage/tagline/Envelope-Closed-Empower.png"
                            alt="Empower"
                            width={332}
                            height={203}
                            style={{ width: "70vw", height: "auto", maxWidth: "300px" }}
                        />
                        <Image
                            src="/images/homepage/tagline/Empower.png"
                            alt="Empower"
                            width={111}
                            height={41}
                            style={{ width: "25vw", height: "auto", maxWidth: "120px" }}
                        />
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col items-center gap-3">
                        <Image
                            src="/images/homepage/tagline/Envelope-Closed-Connect.png"
                            alt="Connect"
                            width={332}
                            height={203}
                            style={{ width: "70vw", height: "auto", maxWidth: "300px" }}
                        />
                        <Image
                            src="/images/homepage/tagline/Connect.png"
                            alt="Connect"
                            width={111}
                            height={41}
                            style={{ width: "25vw", height: "auto", maxWidth: "120px" }}
                        />
                    </div>

                    {/* Grow */}
                    <div className="flex flex-col items-center gap-3">
                        <Image
                            src="/images/homepage/tagline/Envelope-Closed-Grow.png"
                            alt="Grow"
                            width={332}
                            height={203}
                            style={{ width: "70vw", height: "auto", maxWidth: "300px" }}
                        />
                        <Image
                            src="/images/homepage/tagline/Grow.png"
                            alt="Grow"
                            width={80}
                            height={41}
                            style={{ width: "18vw", height: "auto", maxWidth: "80px" }}
                        />
                    </div>

                    {/* WCE Logo + Explanation */}
                    <div className="flex flex-col items-center gap-4 mt-4">
                        <Image
                            src="/images/homepage/tagline/WCE Logo.png"
                            alt="WCE Logo"
                            width={188}
                            height={198}
                            style={{ width: "25vw", height: "auto", maxWidth: "120px" }}
                        />
                        <Image
                            src="/images/homepage/tagline/WCE-Explanation.png"
                            alt="Weekend Career Expo"
                            width={960}
                            height={343}
                            style={{ width: "90vw", height: "auto", maxWidth: "500px" }}
                        />
                    </div>

                    {/* Calendar */}
                    <Image
                        src="/images/homepage/tagline/Calendar WCE.png"
                        alt="WCE Calendar"
                        width={1360}
                        height={679}
                        style={{ width: "95vw", height: "auto", maxWidth: "600px" }}
                        className="rounded-xl shadow-lg"
                    />
                </div>
            </div>

        </section>
    );
}