import Image from "next/image";

export default function PartnerSection() {
    return (
        <>
            {/* ── DESKTOP ── */}
            <div className="hidden md:block relative w-full z-0" style={{ marginTop: "-4vw" }}>
                <Image
                    src="/images/homepage/partner/Background-Medpar.png"
                    alt=""
                    width={1458}
                    height={1130}
                    style={{ width: "100%", height: "auto" }}
                    className="block"
                />
                <div className="absolute top-[30%] left-0 right-0 flex justify-center px-4">
                    <Image
                        src="/images/homepage/partner/Media Partners.png"
                        alt="Media Partners"
                        width={380}
                        height={64}
                        style={{ width: "clamp(120px, 20vw, 380px)", height: "auto" }}
                    />
                </div>
                <div className="absolute bottom-[30%] left-0 right-0 flex justify-center px-4">
                    <Image
                        src="/images/homepage/partner/Company Partners.png"
                        alt="Company Partners"
                        width={450}
                        height={64}
                        style={{ width: "clamp(140px, 25vw, 450px)", height: "auto" }}
                    />
                </div>
            </div>

            {/* ── MOBILE ── */}
            <div
                className="block md:hidden w-full -mt-[30px] z-0 flex flex-col items-center py-10 px-4 gap-10"
                style={{
                    backgroundImage: "url('/images/homepage/partner/Background-Medpar.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                <Image
                    src="/images/homepage/partner/Media Partners.png"
                    alt="Media Partners"
                    width={380}
                    height={64}
                    style={{ width: "55vw", height: "auto", maxWidth: "280px" }}
                />
                <Image
                    src="/images/homepage/partner/Company Partners.png"
                    alt="Company Partners"
                    width={450}
                    height={64}
                    style={{ width: "65vw", height: "auto", maxWidth: "320px" }}
                />
            </div>
        </>
    );
}