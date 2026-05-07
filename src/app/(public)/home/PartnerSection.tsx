import Image from "next/image";
import MediaPartnersSection from "@/components/homepage/MediaPartners";
import CompanyPartnersSlider from "./CompanyPartnersSlider";


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
                {/* Judul */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4 text-center">
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontWeight: 700,
                        fontSize: "clamp(1.5rem, 2.75cqw, 4rem)",
                        color: "#2555B7",
                        lineHeight: 1.4,
                        letterSpacing: "0.05em",
                    }}>
                        {"Our Media Partners"}
                    </p>
                </div>

                {/* Marquee — di bawah judul */}
                <div className="absolute z-[25] w-full" style={{ top: "28%" }}>
                    <MediaPartnersSection />
                </div>
                <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 z-[25] w-full flex justify-center px-4 text-center">
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "clamp(1.5rem, 2.5cqw, 4rem)",
                        color: "#2555B7",
                        lineHeight: 1.4,
                        letterSpacing: "0.05em",
                    }}>
                        {"Our Company Partners"}
                    </p>
                </div>

                <div className="absolute z-[25] w-full" style={{ bottom: "10%" }}>
                    <CompanyPartnersSlider />
                </div>
            </div>

            {/* ── MOBILE ── */}
            <div
                className="md:hidden w-full z-0 flex flex-col items-center py-8 px-0"
                style={{
                    backgroundImage: "url('/images/media-partners/mobile/BG-Medpar-mb.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                    marginTop: "-10vw",
                }}
            >
                {/* Our Media Partners */}
                <p style={{
                    fontFamily: "TimesNewRoman, serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.2rem, 5.5vw, 2rem)",
                    color: "#2555B7",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                    marginTop: "7%",
                }}>
                    Our Media Partners
                </p>
                <MediaPartnersSection />

                {/* Our Company Partners */}
                <p style={{
                    fontFamily: "TimesNewRoman, serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.2rem, 5.5vw, 2rem)",
                    color: "#2555B7",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                    margin: 0,
                    marginTop: "4%",
                }}>
                    Our Company Partners
                </p>
                <CompanyPartnersSlider />

                <div style={{ paddingBottom: "8%" }} />
            </div>
        </>
    );
}