"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

interface DropdownOption {
    label: string
    href: string
}

interface CompetitionCardProps {
    photoSrc: string
    timelineSrc?: string
    timelines?: string[]
    title: string
    timeline: string
    place: string
    shortDesc: string
    fullDesc: string
    joinHref?: string
    buttonLabel?: string
    dropdownOptions?: DropdownOption[]
    open: boolean
    timelineScale?: number
    onToggle: () => void
}

export default function CompetitionCard({
    photoSrc,
    timelineSrc,
    timelines,
    title,
    timeline,
    place,
    shortDesc,
    fullDesc,
    joinHref = "#",
    buttonLabel = "Register Here",
    dropdownOptions,
    open,
    timelineScale = 1,
    onToggle,
}: CompetitionCardProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [dropdownOpen])

    const btnStyle: React.CSSProperties = {
        background: "#E91E8C",
        color: "#fff",
        padding: "clamp(6px, 0.8vw, 8px) clamp(16px, 2vw, 24px)",
        borderRadius: "20px",
        fontSize: "clamp(11px, 1.2vw, 20px)",
        fontWeight: 500,
        whiteSpace: "nowrap",
        textDecoration: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
    }

    return (
        <div style={{
            opacity: "0.85",
            background: "#CFE5FC",
            border: "2px solid #87C9FF",
            borderRadius: "clamp(12px, 1.5vw, 20px)",
            padding: "clamp(10px, 1.5vw, 16px)",
            width: "100%",
        }}>
            {/* ── Main grid: photo left, info right ── */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "clamp(180px, 40%, 640px) 1fr",
                gap: "clamp(12px, 2vw, 20px)",
                alignItems: "start",
                overflow: "visible",
            }}>
                {/* Left col: photo + single-image timeline */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1vw, 12px)" }}>
                    <div style={{
                        width: "100%",
                        borderRadius: "clamp(1px, 2vw, 12px)",
                        overflow: "hidden",
                        aspectRatio: "16/9",
                        position: "relative",
                        marginTop: "clamp(8px, 2vw, 28px)",
                    }}>
                        <Image src={photoSrc} alt={title} fill style={{ objectFit: "cover" }} />
                    </div>

                    {/* Single timeline image (legacy prop) */}
                    {timelineSrc && (
                        <div style={{
                            overflow: "hidden",
                            maxHeight: open ? "500px" : "0px",
                            opacity: open ? 1 : 0,
                            transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                            marginTop: "1vw",
                        }}>
                            <Image
                                src={timelineSrc}
                                alt="Timeline"
                                width={612 * timelineScale}
                                height={192}
                                style={{ width: "100%", height: "auto", display: "block" }}
                            />
                        </div>
                    )}
                </div>

                {/* Right col: title, meta, description, toggle */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(6px, 1vw, 10px)",
                    minWidth: 0,
                    marginTop: "2%",
                }}>
                    <p style={{
                        fontFamily: "Times New Roman, serif",
                        fontSize: "clamp(13px, 2.5vw, 50px)",
                        fontWeight: 700,
                        textDecoration: "underline",
                        color: "#2555B7",
                        margin: 0,
                        letterSpacing: "-0.05em",
                    }}>
                        {title}
                    </p>
                    <p style={{ fontSize: "clamp(12px, 2vw, 20px)", color: "#2555B7", margin: 0, letterSpacing: "-0.05em" }}>
                        <strong style={{ fontWeight: 700 }}>Timeline:</strong> {timeline}
                    </p>
                    <p style={{ fontSize: "clamp(12px, 2vw, 20px)", color: "#2555B7", margin: 0, letterSpacing: "-0.05em" }}>
                        <strong style={{ fontWeight: 700 }}>Place:</strong> {place}
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

            {/* ── Multi-timeline row ── */}
            {timelines && timelines.length > 0 && (
                <div style={{
                    overflow: "hidden",
                    maxHeight: open ? "600px" : "0px",
                    opacity: open ? 1 : 0,
                    transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                    marginTop: open ? "clamp(10px, 1.2vw, 20px)" : 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "clamp(8px, 1.5vw, 20px)",
                }}>
                    {timelines.map((src, i) => (
                        <div key={src} style={{
                            // ── Edit width here (applies to both images equally) ──
                            width: "45%",
                            // ── Edit margins here ──
                            marginLeft:  i === 0 ? "5%"  : undefined,   // Undergraduate ← left margin
                            marginRight: i === 1 ? "2%"  : undefined,   // Fresh Graduate → right margin
                            flexShrink: 0,
                        }}>
                            <Image
                                src={src}
                                alt={`Timeline ${i + 1}`}
                                width={700}
                                height={350}
                                style={{ width: "90%", height: "auto", display: "block", borderRadius: "clamp(6px, 1vw, 12px)" }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* ── Register button row ── */}
            <div style={{
                overflow: "visible",
                maxHeight: open ? "80px" : "0px",
                opacity: open ? 1 : 0,
                pointerEvents: open ? "auto" : "none",
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "clamp(4px, 0.8vw, 8px)",
                marginTop: "clamp(8px, 1vw, 12px)",
                position: "relative",
            }}>
                {dropdownOptions && dropdownOptions.length > 0 ? (
                    <div ref={dropdownRef} style={{ position: "relative" }}>
                        <button onClick={() => setDropdownOpen((v) => !v)} style={btnStyle}>
                            {buttonLabel}
                            <span style={{
                                display: "inline-block",
                                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease",
                                fontSize: "0.75em",
                                lineHeight: 1,
                            }}>▾</span>
                        </button>
                        {dropdownOpen && (
                            <div style={{
                                position: "absolute",
                                bottom: "110%",
                                right: 0,
                                background: "#fff",
                                border: "1.5px solid #E91E8C",
                                borderRadius: "12px",
                                overflow: "hidden",
                                zIndex: 50,
                                minWidth: "160px",
                                boxShadow: "0 4px 16px rgba(233,30,140,0.15)",
                            }}>
                                {dropdownOptions.map((opt, i) => (
                                    <a
                                        key={i}
                                        href={opt.href}
                                        style={{
                                            display: "block",
                                            padding: "clamp(8px, 0.8vw, 10px) clamp(16px, 1.5vw, 20px)",
                                            color: "#E91E8C",
                                            fontWeight: 500,
                                            fontSize: "clamp(11px, 1.2vw, 18px)",
                                            textDecoration: "none",
                                            borderBottom: i < dropdownOptions.length - 1 ? "1px solid #FFDBEE" : "none",
                                            whiteSpace: "nowrap",
                                        }}
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        {opt.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
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
                        {buttonLabel}
                    </a>
                )}
            </div>
        </div>
    )
}
