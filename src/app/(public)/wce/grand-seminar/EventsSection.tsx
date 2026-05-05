import Image from "next/image";
import CountDownGrandSeminar from "./CountdownSection";
export default function EventsSectionGS() {
    return (
        <section
            className="hidden md:block relative w-full overflow-visible"
            style={{ containerType: "inline-size", zIndex: 10, marginTop: "-0.5vw" }}
        >
            <Image
                src="/images/wce/grand-seminar/BG-Yellow.png"
                alt=""
                width={1428}
                height={1577}
                style={{ width: "100%", height: "auto" }}
                className="block"
                priority
            />
            <CountDownGrandSeminar />

            <div className="absolute z-30" style={{ top: "15%", left: "50%", transform: "translateX(-50%)", width: "70%", textAlign: "center" }}>
                <p style={{
                    fontFamily: "TTCommons, sans-serif",
                    fontSize: "1.8cqw",
                    color: "#2555B7",
                    lineHeight: 1.8,
                }}>
                    {"The event will be held on "}
                    <span style={{ fontWeight: 700 }}>{"Saturday, August 1, 2026,"}</span>
                    {" from "}
                    <span style={{ fontWeight: 700 }}>{"08.00 to 17:00."}</span>
                    {" It will feature a talk show with inspiring women leaders, along with presentations from participating companies."}
                </p>
                <a
                    href="/register"
                    style={{
                        display: "inline-block",
                        marginTop: "3%",
                        padding: "0.8cqw 2.5cqw",
                        background: "#1a237e",
                        color: "white",
                        fontFamily: "TTCommons, sans-serif",
                        fontWeight: 600,
                        fontSize: "1.5cqw",
                        borderRadius: "0.5cqw",
                        textDecoration: "none",
                    }}
                >
                    Register Now
                </a>
            </div>
            {/* Photo Strip */}
            <div className="absolute z-30" style={{ top: "30%", left: "50%", transform: "translateX(-50%)", width: "100%" }}>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    {/* Pink Rect Background */}
                    <Image
                        src="/images/wce/grand-seminar/Pink Rect.png"
                        alt=""
                        width={1503}
                        height={436}
                        style={{ width: "100%", height: "auto" }}
                    />
                    {/* Photos */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        padding: "2% 2%",
                        gap: "2%",
                        transform: "rotate(-1.5deg)",
                    }}>
                        {["Photo1", "Photo2", "Photo3"].map((photo) => (
                            <div key={photo} style={{ flex: 1, aspectRatio: "4/3" }}>
                                <Image
                                    src={`/images/wce/grand-seminar/${photo}.png`}
                                    alt={photo}
                                    width={400}
                                    height={300}
                                    style={{
                                        width: "95%",
                                        height: "95%",
                                        borderRadius: "1.5cqw",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute z-30" style={{ bottom: "6%", left: "50%", transform: "translateX(-50%)", width: "90%" }}>
                {/* Title */}
                <div style={{ textAlign: "center", marginBottom: "4%" }}>
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "5cqw",
                        color: "#CF388E",
                    }}>
                        Our Series of Events
                    </p>
                </div>

                {/* 3 Cards */}
                <div style={{ display: "flex", gap: "2%", justifyContent: "center" }}>
                    {[
                        {
                            bg: "CompanyPresentation",
                            title: "Company Presentation",
                            content: <>Providing an opportunity for leading organizations to <strong>introduce their values, workplace environment, and available career paths.</strong></>,
                        },
                        {
                            bg: "SeminarSession",
                            title: "Seminar Session",
                            content: <>Gain insights from <strong>inspiring women leaders</strong> and change makers through engaging discussions.</>,
                        },
                        {
                            bg: "AwardingSession",
                            title: "Awarding Session",
                            content: <><strong>Honoring remarkable participants</strong> of both the essay and mini case competitions of Weekend Career Expo 2026.</>,
                        },
                    ].map(({ bg, title, content }) => (
                        <div key={bg} style={{ flex: 1, position: "relative" }}>
                            <Image
                                src={`/images/wce/grand-seminar/${bg}.png`}
                                alt={title}
                                width={400}
                                height={400}
                                style={{ width: "100%", height: "auto", borderRadius: "1.5cqw" }}
                            />
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                padding: "10%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "4%",
                                textAlign: "center",
                            }}>
                                <p style={{
                                    fontFamily: "TTCommons, sans-serif",
                                    fontWeight: 700,
                                    fontSize: "2.1cqw",
                                    color: "white",
                                    textDecoration: "underline",
                                    textUnderlineOffset: "3px",
                                    textAlign: "center",
                                }}>
                                    {title}
                                </p>
                                <p style={{
                                    fontFamily: "TTCommons, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "1.6cqw",
                                    color: "white",
                                    lineHeight: 1.5,
                                    textAlign: "center",
                                }}>
                                    {content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}