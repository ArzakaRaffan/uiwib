"use client"
import Image from "next/image"
import { useState } from "react"
import PreEventCard from "./PreEventCard"

const BG_RATIO = 4516 / 5760
const RATIO_CLOSED = 600 / 1440
const RATIO_OPEN = 800 / 1440

export default function PreEventsSection() {
    const [open, setOpen] = useState(false)
    const clipRatio = open ? RATIO_OPEN : RATIO_CLOSED
    const containerHeight = `calc(100vw * ${clipRatio})`

    return (
        <>
            {/* DESKTOP */}
            <div className="hidden md:block" style={{ overflow: "hidden", marginTop: "-6vw", position: "relative", zIndex: 20 }}>
                <div style={{
                    position: "relative", width: "100%",
                    height: containerHeight,
                    minHeight: `calc(100vw * ${RATIO_CLOSED})`,
                    overflow: "hidden",
                    transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: `calc(100vw * ${BG_RATIO})` }}>
                        <Image src="/images/wce/pre-event/BG-Yellow.png" alt="" fill
                            style={{ objectFit: "fill", objectPosition: "top" }} priority />
                    </div>
                    <Image src="/images/wce/pre-event/Flower.png" alt="" width={80} height={80}
                        style={{ position: "absolute", top: "5%", left: "3%", width: "clamp(40px, 5vw, 90px)", height: "auto", opacity: 0.85, zIndex: 1, pointerEvents: "none" }} />
                    <Image src="/images/wce/pre-event/Flower.png" alt="" width={80} height={80}
                        style={{ position: "absolute", top: "8%", right: "4%", width: "clamp(50px, 6vw, 110px)", height: "auto", opacity: 0.85, zIndex: 1, pointerEvents: "none" }} />
                    <Image src="/images/wce/pre-event/Flower.png" alt="" width={80} height={80}
                        style={{ position: "absolute", bottom: "10%", left: "6%", width: "clamp(35px, 4vw, 70px)", height: "auto", opacity: 0.7, zIndex: 1, pointerEvents: "none" }} />
                    <div className="absolute w-full flex flex-col items-center"
                        style={{ top: 0, left: 0, right: 0, zIndex: 2, paddingTop: "clamp(40px, 6vw, 120px)", paddingBottom: "clamp(32px, 4vw, 64px)" }}>
                        <p style={{ fontFamily: "TimesNewRoman, serif", fontWeight: 500, fontSize: "clamp(1rem, 2.5vw, 3.5rem)", color: "#FFA94F", lineHeight: 1.4, letterSpacing: "0.01em", textAlign: "center", width: "90%", margin: 0, marginBottom: "clamp(12px, 2.5vw, 36px)" }}>
                            Sharing Session with Professionals.
                        </p>
                        <div style={{ border: "1.5px solid #F5D96B", borderRadius: "clamp(8px, 1.2vw, 16px)", width: "90%", padding: "clamp(10px, 1.5vw, 20px)", backgroundImage: `repeating-linear-gradient(to right, #F5D96B 0px, #F5D96B 1.5px, transparent 1.5px, transparent calc(100% / 6))`, backgroundSize: "100% 100%" }}>
                            <PreEventCard onOpenChange={setOpen} />
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className="block md:hidden relative w-full overflow-hidden" style={{ minHeight: "70svh", marginTop:"-3vw" }}>
                <div className="absolute inset-0">
                    <Image src="/images/wce/pre-event/mobile/BG-Yellow-Pre-mb.png" alt="" fill
                        style={{ objectFit: "cover", objectPosition: "top" }} />
                </div>
                <div className="relative z-10 flex flex-col items-center px-4 py-8">
                    <p style={{ fontFamily: "TimesNewRoman, serif", fontWeight: 500, fontSize: "clamp(1rem, 5vw, 1.5rem)", color: "#FFA94F", lineHeight: 1.4, textAlign: "center", marginBottom: "16px" }}>
                        Sharing Session with Professionals.
                    </p>

                    {/* Card */}
                    <div style={{
                        background: "#FFD6E0",
                        border: "2px solid #F5D96B",
                        borderRadius: "16px",
                        padding: "20px",
                        width: "100%",
                    }}>
                        <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                            <div style={{ borderRadius: "10px", overflow: "hidden", flexShrink: 0, width: "52%" }}>
                                <Image src="/images/wce/pre-event/Photo1.png" alt="Pre Event"
                                    width={598} height={338} style={{ width: "100%", height: "auto", display: "block" }} />
                            </div>
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                                <p style={{ fontFamily: "Times New Roman, serif", fontSize: "clamp(0.95rem, 4vw, 1.4rem)", fontWeight: 700, textDecoration: "underline", color: "#DF56A4", margin: 0 }}>Pre Event</p>
                                <p style={{ fontSize: "clamp(0.65rem, 2.8vw, 0.9rem)", color: "#DF56A4", margin: 0 }}><strong>Timeline:</strong> Saturday, 16 May 2026</p>
                                <p style={{ fontSize: "clamp(0.65rem, 2.8vw, 0.9rem)", color: "#DF56A4", margin: 0 }}><strong>Place:</strong> Online, Zoom</p>
                            </div>
                        </div>

                        <p style={{ fontSize: "clamp(0.6rem, 2.5vw, 0.85rem)", color: "#DF56A4", lineHeight: 1.6, margin: "0 0 12px", fontWeight: 500 }}>
                            A professional exposure session that gives participants a realistic glimpse into the industry environment. Through firsthand sharing from a speaker with direct experience in the field, participants will gain insight into real career journeys, workplace expectations, and the day-to-day realities of working in a well-known FMCG company such as Unilever. This event also serves as a promotional event for upcoming WCE 2026's competition and Unilever Future Leaders Programme.
                        </p>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                    <span style={{ background: "#FFF0AF", color: "#F576AF", borderRadius: "20px", padding: "2px 7px", fontSize: "clamp(8px, 2.4vw, 11px)", fontWeight: 500 }}>9 May 2026</span>
                                    <span style={{ color: "#888", fontSize: "11px" }}>→</span>
                                    <span style={{ background: "#FFF0AF", color: "#F576AF", borderRadius: "20px", padding: "2px 7px", fontSize: "clamp(8px, 2.4vw, 11px)", fontWeight: 500 }}>16 May 2026</span>
                                </div>
                                <div style={{ display: "flex", gap: "30px", paddingLeft: "8px" }}>
                                    <span style={{ fontSize: "clamp(7px, 2.2vw, 10px)", color: "#2555B7", fontWeight: 700 }}>Registration</span>
                                    <span style={{ fontSize: "clamp(7px, 2.2vw, 10px)", color: "#2555B7", fontWeight: 700 }}>Pre-Event Day</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <div style={{ position: "relative", width: "clamp(32px, 12vw, 48px)", height: "clamp(32px, 12vw, 48px)", borderRadius: "50%", overflow: "hidden" }}>
                                    <Image src="/images/wce/pre-event/UIWIB.png" alt="UIWIB" fill className="object-cover" />
                                </div>
                                <span style={{ fontSize: "12px", color: "#666" }}>x</span>
                                <div style={{ position: "relative", width: "clamp(32px, 12vw, 48px)", height: "clamp(32px, 12vw, 48px)", borderRadius: "50%", overflow: "hidden" }}>
                                    <Image src="/images/wce/pre-event/Unilever.png" alt="Unilever" fill className="object-cover" />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                            <a href="https://bit.ly/WCEUnilever2026" style={{
                                background: "#E91E8C", color: "#fff",
                                padding: "6px 20px", borderRadius: "20px",
                                fontSize: "clamp(10px, 3vw, 14px)", fontWeight: 500,
                                textDecoration: "none", whiteSpace: "nowrap",
                            }}>Join Event</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}