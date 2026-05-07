"use client"
import Image from "next/image"
import { useState } from "react"
import PreEventCard from "./PreEventCard"

// Asset: 5760 x 4516
const BG_RATIO = 4516 / 5760  // 0.784 — ratio asli asset

// Tinggi display: unexpanded=785, expanded=1129 (baseline 1440px lebar)
const RATIO_CLOSED = 600  / 1440  // 0.545
const RATIO_OPEN   = 800 / 1440  // 0.784

export default function PreEventsSection() {
    const [open, setOpen] = useState(false)
    const clipRatio = open ? RATIO_OPEN : RATIO_CLOSED
    const containerHeight = `calc(100vw * ${clipRatio})`

    return (
        <div style={{
            overflow: "hidden",
            marginTop: "-6vw",
            position: "relative",
            zIndex: 20,
        }}>
            <div style={{
                position: "relative",
                width: "100%",
                height: containerHeight,
                minHeight: `calc(100vw * ${RATIO_CLOSED})`,
                overflow: "hidden",
                transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
                {/* Background — full height asset */}
                <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: `calc(100vw * ${BG_RATIO})`,
                }}>
                    <Image
                        src="/images/wce/pre-event/BG-Yellow.png"
                        alt="" fill
                        style={{ objectFit: "fill", objectPosition: "top" }}
                        priority
                    />
                </div>

                {/* Bunga dekorasi */}
                <Image src="/images/wce/pre-event/Flower.png" alt="" width={80} height={80}
                    style={{
                        position: "absolute", top: "5%", left: "3%",
                        width: "clamp(40px, 5vw, 90px)", height: "auto",
                        opacity: 0.85, zIndex: 1, pointerEvents: "none",
                    }}
                />
                <Image src="/images/wce/pre-event/Flower.png" alt="" width={80} height={80}
                    style={{
                        position: "absolute", top: "8%", right: "4%",
                        width: "clamp(50px, 6vw, 110px)", height: "auto",
                        opacity: 0.85, zIndex: 1, pointerEvents: "none",
                    }}
                />
                <Image src="/images/wce/pre-event/Flower.png" alt="" width={80} height={80}
                    style={{
                        position: "absolute", bottom: "10%", left: "6%",
                        width: "clamp(35px, 4vw, 70px)", height: "auto",
                        opacity: 0.7, zIndex: 1, pointerEvents: "none",
                    }}
                />

                {/* Konten */}
                <div
                    className="absolute w-full flex flex-col items-center"
                    style={{
                        top: 0, left: 0, right: 0,
                        zIndex: 2,
                        paddingTop: "clamp(40px, 6vw, 120px)",
                        paddingBottom: "clamp(32px, 4vw, 64px)",
                    }}
                >
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontWeight: 500,
                        fontSize: "clamp(1rem, 2.5vw, 3.5rem)",
                        color: "#FFA94F",
                        lineHeight: 1.4,
                        letterSpacing: "0.01em",
                        textAlign: "center",
                        width: "90%",
                        margin: 0,
                        marginBottom: "clamp(12px, 2.5vw, 36px)",
                    }}>
                        Sharing Session with Professionals.
                    </p>
                    <div style={{
                        border: "1.5px solid #F5D96B",
                        borderRadius: "clamp(8px, 1.2vw, 16px)",
                        width: "90%",
                        padding: "clamp(10px, 1.5vw, 20px)",
                        backgroundImage: `repeating-linear-gradient(
                            to right,
                            #F5D96B 0px,
                            #F5D96B 1.5px,
                            transparent 1.5px,
                            transparent calc(100% / 6)
                        )`,
                        backgroundSize: "100% 100%",
                    }}>
                        <PreEventCard onOpenChange={setOpen} />
                    </div>
                </div>
            </div>
        </div>
    )
}