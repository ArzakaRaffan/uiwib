"use client"
import Image from "next/image"

interface CompetitionCardProps {
    photoSrc: string
    timelineSrc: string
    title: string
    timeline: string
    place: string
    shortDesc: string
    fullDesc: string
    joinHref?: string
    // Controlled dari parent
    open: boolean,
    timelineScale?: number
    onToggle: () => void
}

export default function CompetitionCard({
    photoSrc,
    timelineSrc,
    title,
    timeline,
    place,
    shortDesc,
    fullDesc,
    joinHref = "#",
    open,
    timelineScale = 1,
    onToggle,
}: CompetitionCardProps) {
    return (
        <div style={{
            opacity: "0.85",
            background: "#CFE5FC",
            border: "2px solid #87C9FF",
            borderRadius: "clamp(12px, 1.5vw, 20px)",
            padding: "clamp(10px, 1.5vw, 16px)",
            width: "100%",
        }}>
            <div style={{
                display: "grid",
                gridTemplateColumns: "clamp(180px, 40%, 640px) 1fr",
                gap: "clamp(12px, 2vw, 20px)",
                alignItems: "start",
                overflow: "visible",
            }}>
                {/* Kolom kiri: foto + timeline (hanya saat open) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1vw, 12px)" }}>
                    <div style={{
                        width: "100%",
                        borderRadius: "clamp(1px, 2vw, 12px)",
                        overflow: "hidden",
                    }}>
                        <Image
                            src={photoSrc}
                            alt={title}
                            width={598}
                            height={338}
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>

                    {/* Timeline — animasi muncul saat open */}
                    <div style={{
                        overflow: "hidden",
                        maxHeight: open ? "500px" : "0px",
                        opacity: open ? 1 : 0,
                        transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                        marginTop: "1vw",   // ← dorong ke bawah dalam flex
                    }}>
                        <div style={{ width: "100%" }}>
                            <Image
                                src={timelineSrc}
                                alt="Timeline"
                                width={612 * timelineScale}
                                height={192}
                                style={{ width: "100%", height: "auto", display: "block" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Kolom kanan */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(6px, 1vw, 10px)",
                    minWidth: 0,
                    marginTop: "2%",
                }}>
                    <p style={{
                        fontSize: "clamp(13px, 2vw, 50px)",
                        fontWeight: 900,
                        textDecoration: "underline",
                        color: "#2555B7",
                        margin: 0,
                        letterSpacing: "-0.05em",
                    }}>
                        {title}
                    </p>
                    <p style={{ fontSize: "clamp(12px, 1.5vw, 15px)", color: "#2555B7", margin: 0, letterSpacing: "-0.05em" }}>
                        <strong style={{ fontWeight: 900 }}>Timeline:</strong> {timeline}
                    </p>
                    <p style={{ fontSize: "clamp(12px, 1.5vw, 15px)", color: "#2555B7", margin: 0, letterSpacing: "-0.05em" }}>
                        <strong style={{ fontWeight: 900 }}>Place:</strong> {place}
                    </p>
                    <p style={{
                        fontSize: "clamp(11px, 1.2vw, 20px)",
                        color: "#2555B7",
                        lineHeight: 1.6,
                        margin: 0,
                        fontWeight: 500,
                    }}>
                        {shortDesc}
                        {open ? ` ${fullDesc}` : "..."}
                    </p>

                    <button onClick={onToggle} style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#F576AF",
                        fontSize: "clamp(11px, 1vw, 20px)",
                        textAlign: "left",
                        padding: 0,
                        width: "fit-content",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                    }}>
                        {open ? "Read Less" : "Read More"}
                        <span style={{
                            display: "inline-block",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                        }}>∨</span>
                    </button>
                </div>
            </div>
            <div style={{
                overflow: "hidden",
                maxHeight: open ? "80px" : "0px",
                opacity: open ? 1 : 0,
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "clamp(4px, 0.8vw, 8px)",
                marginTop: "clamp(8px, 1vw, 12px)",
            }}>
                <a href={joinHref} style={{
                    background: "#E91E8C",
                    color: "#fff",
                    padding: "clamp(6px, 0.8vw, 8px) clamp(16px, 2vw, 24px)",
                    borderRadius: "20px",
                    fontSize: "clamp(11px, 1.2vw, 20px)",
                    fontWeight: 500,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                }}>
                    Coming Soon!
                </a>
            </div>

        </div>
    )
}
