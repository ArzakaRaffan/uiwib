"use client"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

export default function PreEventCard() {
    const [open, setOpen] = useState(false)
    const expandRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (expandRef.current) {
            setHeight(open ? expandRef.current.scrollHeight : 0)
        }
    }, [open])

    return (
        <div style={{
            background: "#FFD6E0",
            border: "2px solid #F5D96B",
            borderRadius: "clamp(12px, 1.5vw, 20px)",
            padding: "clamp(10px, 1.5vw, 16px)",
            width: "100%",
        }}>
            <div style={{
                display: "grid",
                gridTemplateColumns: "clamp(180px, 40%, 600px) 1fr",
                gap: "clamp(12px, 2vw, 20px)",
                alignItems: "stretch",
            }}>
                {/* Kolom kiri */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1vw, 12px)" }}>
                    {/* Foto */}
                    <div style={{
                        position: "relative",
                        width: "100%",
                        height: "clamp(180px, 19vw, 320px)",
                        borderRadius: "clamp(8px, 1vw, 12px)",
                        overflow: "hidden",
                    }}>
                        <Image
                            src="/images/wce/pre-event/Photo1.png"
                            alt="Pre Event Speaker"
                            fill
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Expanded */}
                    <div
                        ref={expandRef}
                        style={{
                            overflow: "hidden",
                            height: `${height}px`,
                            transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 1vw, 10px)", paddingTop: "4px" }}>
                            {/* Timeline pills */}
                            <div style={{ display: "flex", alignItems: "center", gap: "clamp(4px, 0.5vw, 6px)", flexWrap: "wrap" }}>
                                <span style={{
                                    background: "#FDE8EF", color: "#B03060", borderRadius: "20px",
                                    padding: "clamp(2px, 0.3vw, 3px) clamp(6px, 0.8vw, 10px)",
                                    fontSize: "clamp(9px, 1.3vw, 20px)", fontWeight: 500,
                                }}>9 May 2026</span>
                                <span style={{ color: "#888", fontSize: "clamp(12px, 1.5vw, 20px)" }}>→</span>
                                <span style={{
                                    background: "#FDE8EF", color: "#B03060", borderRadius: "20px",
                                    padding: "clamp(2px, 0.3vw, 3px) clamp(6px, 0.8vw, 10px)",
                                    fontSize: "clamp(9px, 1.3vw, 20px)", fontWeight: 500,
                                }}>16 May 2026</span>
                                <div style={{ display: "flex", flexDirection: "row", gap: "clamp(20px, 4vw, 55px)", paddingTop: "2px", paddingLeft: "clamp(10px, 2vw, 25px)" }}>
                                    <span style={{ fontSize: "clamp(9px, 1vw, 20px)", color: "#2555B7", fontWeight: 700, whiteSpace: "nowrap" }}>
                                        Registration
                                    </span>
                                    <span style={{ fontSize: "clamp(9px, 1vw, 20px)", color: "#2555B7", fontWeight: 700, whiteSpace: "nowrap" }}>
                                        Pre-Event Day
                                    </span>
                                </div>
                            </div>

                            {/* Logos */}
                            <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1vw, 10px)", marginLeft: "3%" }}>
                                <div style={{
                                    position: "relative",
                                    width: "clamp(40px, 8vw, 128px)",
                                    height: "clamp(40px, 8vw, 128px)",
                                    borderRadius: "50%", overflow: "hidden",
                                }}>
                                    <Image src="/images/wce/pre-event/UIWIB.png" alt="UIWIB" fill className="object-cover" />
                                </div>
                                <span style={{ fontSize: "clamp(10px, 1.2vw, 14px)", color: "#666" }}>x</span>
                                <div style={{
                                    position: "relative",
                                    width: "clamp(40px, 8vw, 128px)",
                                    height: "clamp(40px, 8vw, 128px)",
                                    borderRadius: "50%", overflow: "hidden",
                                }}>
                                    <Image src="/images/wce/pre-event/Unilever.png" alt="Unilever" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kolom kanan */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 1vw, 10px)", minWidth: 0, marginTop: "2%", height: "100%" }}>
                    <p style={{ fontSize: "clamp(13px, 2vw, 50px)", fontWeight: 900, textDecoration: "underline", color: "#DF56A4", margin: 0, letterSpacing: "-0.05em" }}>
                        Pre Event
                    </p>
                    <p style={{ fontSize: "clamp(12px, 1.5vw, 15px)", color: "#DF56A4", margin: 0, letterSpacing: "-0.05em" }}>
                        <strong style={{ fontWeight: 900 }}>Timeline:</strong> Saturday, 16 May 2026
                    </p>
                    <p style={{ fontSize: "clamp(12px, 1.5vw, 15px)", color: "#DF56A4", margin: 0, letterSpacing: "-0.05em" }}>
                        <strong style={{ fontWeight: 900 }}>Place :</strong> Online, Zoom
                    </p>
                    <p style={{ fontSize: "clamp(11px, 1.2vw, 20px)", color: "#DF56A4", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                        A professional exposure session that gives participants a realistic glimpse
                        into the industry environment. Through firsthand sharing from a speaker
                        with direct experience in the field, participants will gain insight into
                        {open
                            ? " real career journeys, workplace expectations, and the day-to-day realities of working in a well-known FMCG company such as Unilever. This event also serves as a promotional event for upcoming WCE 2026's competition and Unilever Future Leaders Programme."
                            : "..."}
                    </p>

                    <button onClick={() => setOpen(!open)} style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: "#F576AF", fontSize: "clamp(11px, 1vw, 20px)",
                        textAlign: "left", padding: 0, width: "fit-content",
                        display: "flex", alignItems: "center", gap: "4px",
                    }}>
                        {open ? "Read Less" : "Read More"}
                        <span style={{
                            display: "inline-block",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                        }}>∨</span>
                    </button>

                    {/* Join button */}
                    <div style={{
                        overflow: "hidden",
                        maxHeight: open ? "80px" : "0px",
                        opacity: open ? 1 : 0,
                        transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "auto",
                        marginBottom: "3%",
                        paddingTop: "clamp(4px, 0.8vw, 8px)",
                    }}>
                        <a href="#" style={{
                            background: "#E91E8C", color: "#fff",
                            padding: "clamp(6px, 0.8vw, 8px) clamp(16px, 2vw, 24px)",
                            borderRadius: "20px",
                            fontSize: "clamp(11px, 1.2vw, 20px)", fontWeight: 500,
                            textDecoration: "none", whiteSpace: "nowrap",
                        }}>
                            Join Event
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}