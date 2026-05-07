"use client"
import Image from "next/image"

interface TrainingCardProps {
    photoSrc: string
    logoSrc: string
    companySrc: string
    title: string
    timeline: string
    place: string
    shortDesc: string
    fullDesc: string[]
    joinHref?: string
    open: boolean
    onToggle: () => void
}

export default function TrainingCard({
    photoSrc,
    logoSrc,
    companySrc,
    title,
    timeline,
    place,
    shortDesc,
    fullDesc,
    joinHref = "#",
    open,
    onToggle,
}: TrainingCardProps) {
    return (
        <div style={{
            background: "#FFEFF8",
            border: "2px solid #ED84C6",
            borderRadius: "clamp(12px, 1.5vw, 20px)",
            padding: "clamp(10px, 1.2vw, 16px)",
            width: "100%",
        }}>
            <div style={{
                display: "grid",
                gridTemplateColumns: "clamp(180px, 40%, 560px) 1fr",
                gap: "clamp(12px, 2vw, 20px)",
                alignItems: "start",
            }}>
                {/* Kolom kiri: foto + logo */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(8px, 1vw, 12px)",
                    minWidth: 0,
                }}>
                    <div style={{
                        width: "100%",
                        borderRadius: "clamp(4px, 1vw, 12px)",
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

                    {/* Logo — muncul saat open */}
                    <div style={{
                        overflow: "hidden",
                        maxHeight: open ? "200px" : "0px",
                        opacity: open ? 1 : 0,
                        transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "clamp(6px, 1vw, 12px)",
                            paddingLeft: "15%",
                            paddingTop: "4%",
                        }}>
                            <div style={{
                                position: "relative",
                                width: "clamp(36px, 6vw, 96px)",
                                height: "clamp(36px, 6vw, 96px)",
                                borderRadius: "50%",
                                overflow: "hidden",
                                flexShrink: 0,
                            }}>
                                <Image src={logoSrc} alt="UIWIB" fill className="object-cover" />
                            </div>
                            <span style={{
                                fontSize: "clamp(10px, 1vw, 16px)",
                                color: "#888",
                                fontWeight: 500,
                            }}>x</span>
                            <div style={{
                                position: "relative",
                                width: "clamp(36px, 6vw, 96px)",
                                height: "clamp(36px, 6vw, 96px)",
                                borderRadius: "50%",
                                overflow: "hidden",
                                flexShrink: 0,
                            }}>
                                <Image src={companySrc} alt="Company" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kolom kanan */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(5px, 0.8vw, 10px)",
                    minWidth: 0,
                    marginTop: "2%",
                }}>
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontSize: "clamp(13px, 1.8vw, 28px)",
                        fontWeight: 900,
                        textDecoration: "underline",
                        color: "#DF56A4",
                        margin: 0,
                        letterSpacing: "-0.05em",
                    }}>
                        {title}
                    </p>
                    <p style={{
                        fontSize: "clamp(11px, 1.3vw, 16px)",
                        color: "#DF56A4",
                        margin: 0,
                        letterSpacing: "-0.05em",
                    }}>
                        <strong style={{ fontWeight: 900 }}>Timeline:</strong> {timeline}
                    </p>
                    <p style={{
                        fontSize: "clamp(11px, 1.3vw, 16px)",
                        color: "#DF56A4",
                        margin: 0,
                        letterSpacing: "-0.05em",
                    }}>
                        <strong style={{ fontWeight: 900 }}>Place:</strong> {place}
                    </p>

                    {!open ? (
                        <p style={{
                            fontSize: "clamp(11px, 1.1vw, 15px)",
                            color: "#DF56A4",
                            lineHeight: 1.6,
                            margin: 0,
                            fontWeight: 500,
                        }}>
                            {shortDesc}...
                        </p>
                    ) : (
                        <>
                            <p style={{
                                fontSize: "clamp(11px, 1.1vw, 15px)",
                                color: "#DF56A4",
                                lineHeight: 1.6,
                                margin: 0,
                                fontWeight: 500,
                            }}>
                                {shortDesc}
                            </p>
                            {fullDesc.map((para, i) => (
                                <p key={i} style={{
                                    fontSize: "clamp(11px, 1.1vw, 15px)",
                                    color: "#DF56A4",
                                    lineHeight: 1.6,
                                    margin: 0,
                                    fontWeight: 500,
                                }}>
                                    {para}
                                </p>
                            ))}
                        </>
                    )}

                    <button onClick={onToggle} style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#FFA94F",
                        fontSize: "clamp(11px, 1vw, 15px)",
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

            {/* Join button */}
            <div style={{
                overflow: "hidden",
                maxHeight: open ? "80px" : "0px",
                opacity: open ? 1 : 0,
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "clamp(4px, 0.8vw, 8px)",
                marginTop: "clamp(6px, 0.8vw, 10px)",
            }}>
                <a href={joinHref} style={{
                    background: "#E91E8C",
                    color: "#fff",
                    padding: "clamp(6px, 0.8vw, 12px) clamp(16px, 2vw, 28px)",
                    borderRadius: "20px",
                    fontSize: "clamp(11px, 1vw, 15px)",
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