"use client"
import Image from "next/image"
import PreEventCard from "./PreEventCard"

export default function PreEventsSection() {
    return (
        <div style={{
            overflow: "hidden",  // ini yang motong
            marginTop: "-6vw",
            position: "relative",
            zIndex: 20,
        }}>
            <section
                style={{
                    position: "relative",
                    height: "clamp(600px, 55vw, 900px)",
                    overflow: "visible",
                }}
            >
                {/* Gambar */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                }}>
                    <Image
                        src="/images/wce/pre-event/BG-Yellow.png"
                        alt=""
                        fill
                        style={{ objectFit: "fill", objectPosition: "top" }}
                        priority
                    />
                </div>

                {/* Konten */}
                <div className="relative w-full flex flex-col items-center" style={{
                    zIndex: 1,
                    paddingTop: "clamp(60px, 7vw, 120px)",
                    paddingBottom: "clamp(32px, 4vw, 64px)",
                }}>
                    <p style={{
                        position: "relative", zIndex: 1,
                        fontFamily: "TimesNewRoman, serif",
                        fontWeight: 500,
                        fontSize: "clamp(1.2rem, 3vw, 4rem)",
                        color: "#FFA94F",
                        lineHeight: 1.4,
                        letterSpacing: "0.01em",
                        textAlign: "center",
                        width: "90%",
                        marginBottom: "clamp(16px, 3vw, 40px)",
                    }}>
                        Sharing Session with Professionals.
                    </p>
                    <div style={{
                        position: "relative", zIndex: 1,
                        border: "1.5px solid #F5D96B",
                        borderRadius: "clamp(8px, 1.5vw, 16px)",
                        width: "90%",
                        padding: "clamp(12px, 2vw, 24px)",
                        backgroundImage: `repeating-linear-gradient(
                            to right,
                            #F5D96B 0px,
                            #F5D96B 1.5px,
                            transparent 1.5px,
                            transparent calc(100% / 6)
                        )`,
                        backgroundSize: "100% 100%",
                    }}>
                        <PreEventCard />
                    </div>
                </div>
            </section>
        </div>
    )
}