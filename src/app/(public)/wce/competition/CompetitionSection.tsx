"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import CompetitionCard from "./CompetitionCard"

const BG_W = 5750
const BG_H_FULL = 10000

const BG_H_CLOSED  = 5800
const BG_H_OPEN_1  = 7350   // hanya BCC
const BG_H_OPEN_2  = 6650   // hanya Essay
const BG_H_OPEN_3  = 6100   // hanya Photo
const BG_H_OPEN_12 = 8200   // BCC + Essay
const BG_H_OPEN_13 = 7750   // BCC + Photo
const BG_H_OPEN_23 = 7000   // Essay + Photo
const BG_H_OPEN_123 = 8600  // semua

function getClipRatio(openStates: boolean[]) {
    const [o1, o2, o3] = openStates
    if (o1 && o2 && o3) return BG_H_OPEN_123 / BG_W
    if (o1 && o2)       return BG_H_OPEN_12  / BG_W
    if (o1 && o3)       return BG_H_OPEN_13  / BG_W
    if (o2 && o3)       return BG_H_OPEN_23  / BG_W
    if (o1)             return BG_H_OPEN_1   / BG_W
    if (o2)             return BG_H_OPEN_2   / BG_W
    if (o3)             return BG_H_OPEN_3   / BG_W
    return BG_H_CLOSED / BG_W
}

export default function CompetitionSection() {
    const [openStates, setOpenStates] = useState([false, false, false])
    const [containerHeight, setContainerHeight] = useState<string>(
        `calc(100vw * ${BG_H_CLOSED / BG_W})`
    )
    const [bccDropdownOpen, setBccDropdownOpen] = useState(false)
    const bccDropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (bccDropdownRef.current && !bccDropdownRef.current.contains(e.target as Node)) {
                setBccDropdownOpen(false)
            }
        }
        if (bccDropdownOpen) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [bccDropdownOpen])

    const toggle = (i: number) => {
        setOpenStates(prev => {
            const next = [...prev]
            next[i] = !next[i]
            return next
        })
    }

    useEffect(() => {
        const clipRatio = getClipRatio(openStates)
        setContainerHeight(`calc(100vw * ${clipRatio})`)
    }, [openStates])

    return (
        <>
            {/* DESKTOP */}
            <div className="hidden md:block" style={{ overflow: "hidden", marginTop: "-6vw", position: "relative", zIndex: 20 }}>
                <div style={{
                    position: "relative",
                    width: "100%",
                    height: containerHeight,
                    minHeight: `calc(100vw * ${BG_H_CLOSED / BG_W})`,
                    overflow: "hidden",
                    transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}>
                    <div style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        height: `calc(100vw * ${BG_H_FULL / BG_W})`,
                    }}>
                        <Image
                            src="/images/wce/competition/BG-Pink-Competition.webp"
                            alt="" fill
                            style={{ objectFit: "fill", objectPosition: "top" }}
                            priority
                        />
                    </div>

                    <div style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: "clamp(40px, 6vw, 120px)",
                        paddingBottom: "clamp(32px, 4vw, 64px)",
                    }}>
                        <p style={{
                            fontFamily: "TimesNewRoman, serif",
                            fontWeight: 100,
                            fontSize: "clamp(1rem, 2.5vw, 3.5rem)",
                            color: "#CF388E",
                            lineHeight: 1.4,
                            letterSpacing: "0.01em",
                            textAlign: "center",
                            width: "90%",
                            margin: 0,
                            marginBottom: "clamp(12px, 3vw, 40px)",
                        }}>
                            Stay competitive and adaptable.
                        </p>

                        <div style={{
                            width: "90%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "clamp(12px, 1.5vw, 24px)",
                            padding: "clamp(10px, 1.2vw, 18px)",
                            border: "1.5px solid #FFDBEE",
                            borderRadius: "clamp(8px, 1.2vw, 16px)",
                            backgroundImage: `repeating-linear-gradient(
                            to right,
                            #FFDBEE 0px,
                            #FFDBEE 1.5px,
                            transparent 1.5px,
                            transparent calc(100% / 6)
                        )`,
                            backgroundSize: "100% 100%",
                        }}>
                            <CompetitionCard
                                open={openStates[0]}
                                onToggle={() => toggle(0)}
                                photoSrc="/images/wce/competition/Photo1.webp"
                                title="Business Case Competition"
                                timeline=" Saturday, 13 June-Saturday, 25 July 2026"
                                place="Hybrid"
                                buttonLabel="Register Here"
                                timelines={[
                                    "/images/wce/competition/Undergraduate BCC.webp",
                                    "/images/wce/competition/Freshgraduate BCC.webp",
                                ]}
                                dropdownOptions={[
                                    { label: "Undergraduate", href: "https://forms.gle/XfDrzF96KLq8gfC3A" },
                                    { label: "Fresh Graduate", href: "https://www.surveymonkey.com/r/cimbniagabuscomp2026" },
                                ]}
                                shortDesc="The Business Case Competition is one of the initiatives of Weekend Career Expo 2026 organized by Universitas Indonesia Women in Business. This competition challenges participants to"
                                fullDesc="solve real-world business problems through strategic analysis, innovation, and critical thinking. Through mentoring and networking sessions, participants will gain valuable insights while developing impactful business solutions. Finalists will present their ideas before a panel of judges and compete based on relevance, feasibility, and presentation quality."
                            />
                            <CompetitionCard
                                open={openStates[1]}
                                onToggle={() => toggle(1)}
                                photoSrc="/images/wce/competition/Photo2.webp"
                                title="Essay Competition"
                                timeline=" Monday, 1 June-Saturday, 25 July 2026"
                                place="Online"
                                buttonLabel="Register Here"
                                joinHref="https://forms.gle/U3HU53r2xyUjbfFj6"
                                timelineSrc="/images/wce/competition/Timeline Essay.webp"
                                shortDesc="The Essay Competition is an annual event organized by Universitas Indonesia Women in Business as one of the initiatives of Weekend Career Expo 2026. Carrying the grand theme"
                                fullDesc={`"The Spillover Effect: How Educating One Woman Can Change the Community," this competition invites participants to explore real-world issues through critical and impactful writing. Through this competition, participants are able to hone their research, writing, and analytical skills while showcasing their perspectives and ideas that can inspire meaningful change.`}
                            />
                            <CompetitionCard
                                open={openStates[2]}
                                onToggle={() => toggle(2)}
                                photoSrc="/images/wce/competition/Photo3.webp"
                                title="Photo Competition"
                                timeline=" Monday, 22 June 2026–Saturday, 25 July 2026"
                                place=" Sisternet (Application)"
                                buttonLabel="Coming Soon!"
                                shortDesc='The Photo Competition is a special competition in collaboration with XLSmart. Carrying the grand theme “She Leads, She Inspires,"'
                                fullDesc="this competition invites participants to capture moments that represent the essence of a female leader: confident, visionary, resilient, and able to inspire those around them. Through visual images, this competition emphasizes that every woman has the potential to lead, not only for others, but also in determining the direction of her own life."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className="block md:hidden relative w-full overflow-hidden" style={{ marginTop: "-4vw" }}>
                <div className="relative w-full" style={{
                    backgroundImage: "url('/images/wce/competition/mobile/BG-Pink-Comp-mb.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    paddingBottom: "6%",
                }}>
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontWeight: 500,
                        fontSize: "clamp(1rem, 5vw, 1.8rem)",
                        color: "#CF388E",
                        lineHeight: 1.4,
                        textAlign: "center",
                        padding: "8% 16px 4%",
                    }}>
                        Stay competitive and adaptable.
                    </p>

                    <div style={{
                        margin: "0 16px",
                        padding: "12px",
                        border: "1.5px solid #FFDBEE",
                        borderRadius: "16px",
                        backgroundImage: "repeating-linear-gradient(to right, #FFDBEE 0px, #FFDBEE 1.5px, transparent 1.5px, transparent calc(100% / 4))",
                        backgroundSize: "100% 100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        marginBottom: "0%",
                    }}>
                        {/* Card 1 — Business Case Competition */}
                        <div style={{ background: "#CFE5FC", border: "2px solid #87C9FF", borderRadius: "16px", padding: "12px" }}>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ width: "50%", flexShrink: 0, borderRadius: "8px", overflow: "hidden", aspectRatio: "4/3", position: "relative", marginTop: "clamp(4px, 2vw, 12px)" }}>
                                    <Image src="/images/wce/competition/mobile/Photo1-mb.webp" alt="Business Case Competition" fill style={{ objectFit: "cover", objectPosition: "center" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: "Times New Roman, serif", fontSize: "clamp(11px, 3.8vw, 20px)", fontWeight: 700, textDecoration: "underline", color: "#2555B7", margin: "0 0 4px", letterSpacing: "-0.05em" }}>
                                        Business Case Competition
                                    </p>
                                    <p style={{ fontSize: "clamp(10px, 2.9vw, 15px)", color: "#2555B7", margin: "0 0 2px" }}>
                                        <strong>Timeline: </strong> Saturday, 13 June&ndash;Saturday, 25 July 2026
                                    </p>
                                    <p style={{ fontSize: "clamp(10px, 2.9vw, 15px)", color: "#2555B7", margin: 0 }}>
                                        <strong>Place: </strong> Hybrid
                                    </p>
                                </div>
                            </div>
                            <p style={{ fontSize: "clamp(5px, 2.3vw, 13px)", color: "#2555B7", lineHeight: 1.5, margin: "0 0 10px", fontWeight: 500, textAlign: "justify" }}>
                                The Business Case Competition is one of the initiatives of Weekend Career Expo 2026 organized by Universitas Indonesia Women in Business. This competition challenges participants to solve real-world business problems through strategic analysis, innovation, and critical thinking. Through mentoring and networking sessions, participants will gain valuable insights while developing impactful business solutions. Finalists will present their ideas before a panel of judges and compete based on relevance, feasibility, and presentation quality.
                            </p>
                            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <Image src="/images/wce/competition/Undergraduate BCC.webp" alt="Undergraduate Timeline" width={400} height={200} style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px" }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <Image src="/images/wce/competition/Freshgraduate BCC.webp" alt="Fresh Graduate Timeline" width={400} height={200} style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px" }} />
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <div ref={bccDropdownRef} style={{ position: "relative" }}>
                                    <button
                                        onClick={() => setBccDropdownOpen((v) => !v)}
                                        style={{ background: "#E91E8C", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "clamp(5px, 2vw, 13px)", fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                                    >
                                        Register Here
                                        <span style={{ display: "inline-block", transform: bccDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", fontSize: "0.75em" }}>&#9660;</span>
                                    </button>
                                    {bccDropdownOpen && (
                                        <div style={{ position: "absolute", bottom: "110%", right: 0, background: "#fff", border: "1.5px solid #E91E8C", borderRadius: "10px", overflow: "hidden", zIndex: 50, minWidth: "130px", boxShadow: "0 4px 16px rgba(233,30,140,0.15)" }}>
                                            {([{ label: "Undergraduate", href: "https://forms.gle/XfDrzF96KLq8gfC3A" }, { label: "Fresh Graduate", href: "https://www.surveymonkey.com/r/cimbniagabuscomp2026" }] as { label: string; href: string }[]).map((opt, i) => (
                                                <a key={opt.label} href={opt.href} onClick={() => setBccDropdownOpen(false)} style={{ display: "block", padding: "8px 16px", color: "#E91E8C", fontWeight: 500, fontSize: "clamp(5px, 2vw, 13px)", textDecoration: "none", borderBottom: i === 0 ? "1px solid #FFDBEE" : "none", whiteSpace: "nowrap" }}>
                                                    {opt.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Card 2 — Essay Competition */}
                        <div style={{ background: "#CFE5FC", border: "2px solid #87C9FF", borderRadius: "16px", padding: "12px" }}>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ width: "50%", flexShrink: 0, borderRadius: "8px", overflow: "hidden", aspectRatio: "4/3", position: "relative", marginTop: "clamp(4px, 2vw, 12px)" }}>
                                    <Image src="/images/wce/competition/mobile/Photo2-mb.webp" alt="Essay Competition" fill style={{ objectFit: "cover" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: "Times New Roman, serif", fontSize: "clamp(11px, 3.8vw, 20px)", fontWeight: 700, textDecoration: "underline", color: "#2555B7", margin: "0 0 4px", letterSpacing: "-0.05em" }}>
                                        Essay Competition
                                    </p>
                                    <p style={{ fontSize: "clamp(10px, 2.9vw, 15px)", color: "#2555B7", margin: "0 0 2px" }}>
                                        <strong>Timeline: </strong> Monday, 1 June&ndash;Saturday, 25 July 2026
                                    </p>
                                    <p style={{ fontSize: "clamp(10px, 2.9vw, 15px)", color: "#2555B7", margin: 0 }}>
                                        <strong>Place: </strong> Online
                                    </p>
                                </div>
                            </div>
                            <p style={{ fontSize: "clamp(5px, 2.3vw, 13px)", color: "#2555B7", lineHeight: 1.5, margin: "0 0 10px", fontWeight: 500, textAlign: "justify" }}>
                                The Essay Competition is an annual event organized by Universitas Indonesia Women in Business as one of the initiatives of Weekend Career Expo 2026. Carrying the grand theme &ldquo;The Spillover Effect: How Educating One Woman Can Change the Community,&rdquo; this competition invites participants to explore real-world issues through critical and impactful writing. Through this competition, participants are able to hone their research, writing, and analytical skills while showcasing their perspectives and ideas that can inspire meaningful change.
                            </p>
                            <div style={{ marginBottom: "10px" }}>
                                <Image
                                    src="/images/wce/competition/Timeline Essay.webp"
                                    alt="Essay Competition Timeline"
                                    width={600}
                                    height={200}
                                    style={{ width: "70%", height: "auto", display: "block", borderRadius: "6px" }}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <a href="https://forms.gle/U3HU53r2xyUjbfFj6" style={{ background: "#E91E8C", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "clamp(5px, 2vw, 13px)", fontWeight: 500, textDecoration: "none" }}>
                                    Register Here
                                </a>
                            </div>
                        </div>

                        {/* Card 3 — Photo Competition */}
                        <div style={{ background: "#CFE5FC", border: "2px solid #87C9FF", borderRadius: "16px", padding: "12px" }}>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ width: "50%", flexShrink: 0, borderRadius: "8px", overflow: "hidden", aspectRatio: "4/3", position: "relative", marginTop: "clamp(4px, 2vw, 12px)" }}>
                                    <Image src="/images/wce/competition/Photo3.webp" alt="Photo Competition" fill style={{ objectFit: "cover" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: "Times New Roman, serif", fontSize: "clamp(11px, 3.8vw, 20px)", fontWeight: 700, textDecoration: "underline", color: "#2555B7", margin: "0 0 4px", letterSpacing: "-0.05em" }}>
                                        Photo Competition
                                    </p>
                                    <p style={{ fontSize: "clamp(10px, 2.9vw, 15px)", color: "#2555B7", margin: "0 0 2px" }}>
                                        <strong>Timeline: </strong> Monday, 22 June 2026&ndash;Saturday, 25 July 2026
                                    </p>
                                    <p style={{ fontSize: "clamp(10px, 2.9vw, 15px)", color: "#2555B7", margin: 0 }}>
                                        <strong>Place: </strong> Sisternet (Application)
                                    </p>
                                </div>
                            </div>
                            <p style={{ fontSize: "clamp(5px, 2.3vw, 13px)", color: "#2555B7", lineHeight: 1.5, margin: "0 0 10px", fontWeight: 500, textAlign: "justify" }}>
                                The Photo Competition is a special competition in collaboration with XLSmart. Carrying the grand theme &ldquo;She Leads, She Inspires,&rdquo; this competition invites participants to capture moments that represent the essence of a female leader: confident, visionary, resilient, and able to inspire those around them. Through visual images, this competition emphasizes that every woman has the potential to lead, not only for others, but also in determining the direction of her own life.
                            </p>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <span style={{ background: "#aaa", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "clamp(5px, 2vw, 13px)", fontWeight: 500 }}>
                                    Coming Soon!
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
