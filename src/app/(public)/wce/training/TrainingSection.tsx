"use client"
import Image from "next/image"
import { useState } from "react"
import TrainingCard from "./TrainingCard"
const BG_RATIO = 9000 / 5760

const RATIO_CLOSED = BG_RATIO * 0.47   // ~0.629
const RATIO_OPEN1 = BG_RATIO * 0.58   // ~0.776
const RATIO_OPEN2 = BG_RATIO * 0.71   // ~0.950

function getClipRatio(openCount: number) {
    if (openCount === 0) return RATIO_CLOSED
    if (openCount === 1) return RATIO_OPEN1
    return RATIO_OPEN2
}

export default function TrainingSection() {
    const [openStates, setOpenStates] = useState([false, false])
    const openCount = openStates.filter(Boolean).length
    const clipRatio = getClipRatio(openCount)
    const containerHeight = `calc(100vw * ${clipRatio})`

    const toggle = (i: number) => {
        setOpenStates(prev => {
            const next = [...prev]
            next[i] = !next[i]
            return next
        })
    }

    return (
        <>
            {/* DESKTOP */}
            <div className="hidden md:block" style={{
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
                    {/* Background — full height asset, tidak di-stretch */}
                    <div style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        height: `calc(100vw * ${BG_RATIO})`,
                    }}>
                        <Image
                            src="/images/wce/training/BG-Yellow-Training.png"
                            alt="" fill
                            style={{ objectFit: "fill", objectPosition: "top" }}
                            priority
                        />
                    </div>

                    {/* Konten */}
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
                            color: "#FFA94F",
                            lineHeight: 1.4,
                            letterSpacing: "0.01em",
                            textAlign: "center",
                            width: "90%",
                            margin: 0,
                            marginBottom: "clamp(12px, 3vw, 40px)",
                        }}>
                            Skill-Up With Us!
                        </p>

                        <div style={{
                            width: "90%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "clamp(12px, 1.5vw, 24px)",
                            padding: "clamp(10px, 1.2vw, 18px)",
                            border: "1.5px solid #F5D96B",
                            borderRadius: "clamp(8px, 1.2vw, 16px)",
                            backgroundImage: `repeating-linear-gradient(
                            to right,
                            #F5D96B 0px,
                            #F5D96B 1.5px,
                            transparent 1.5px,
                            transparent calc(100% / 6)
                        )`,
                            backgroundSize: "100% 100%",
                        }}>
                            <TrainingCard
                                open={openStates[0]}
                                onToggle={() => toggle(0)}
                                photoSrc="/images/wce/training/Photo1.png"
                                logoSrc="/images/wce/training/Logo WCE.png"
                                companySrc="/images/wce/training/TBA.png"
                                title="External Training"
                                timeline="TBA"
                                place="TBA"
                                shortDesc="External Training is an exclusive event held under Weekend Career Expo 2026, aimed to provide participants with direct exposure to professional work environments and valuable insights into the world of work."
                                fullDesc={[
                                    "The upcoming External Training will be conducted in collaboration with various companies. This event includes company presentations, interactive training sessions led by industry professionals, and hands-on problem-solving activities based on real workplace scenarios.",
                                    "Participants will also gain insights from experienced professionals who will share their career journeys and practical perspectives. Through this experience, participants will develop a broader understanding of workplace practices, expand their professional network, and build essential skills to shape their future career paths.",
                                ]}
                            />
                            <TrainingCard
                                open={openStates[1]}
                                onToggle={() => toggle(1)}
                                photoSrc="/images/wce/training/Photo2.png"
                                logoSrc="/images/wce/training/Logo WCE.png"
                                companySrc="/images/wce/training/TBA.png"
                                title="Internal Training"
                                timeline="TBA"
                                place="TBA"
                                shortDesc="Internal Training is an exclusive program under Weekend Career Expo 2026, intended for the top five finalist teams of the Essay Competition and Mini Case Competition. The program features a series of interactive sessions guided by experienced mentors."
                                fullDesc={[
                                    "Designed to enrich participants with deeper insights and professional perspectives relevant to their competition journey. The topics are designed to be flexible and adaptive to the needs of each team, ensuring a more tailored and meaningful learning experience for all participants.",
                                    "Through Internal Training, each finalist team will receive focused guidance to strengthen their way of thinking, improve how they develop ideas, and communicate them more clearly.",
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className="block md:hidden relative w-full" style={{ marginTop: "-3vw" }}>
                <div className="relative w-full" style={{
                    backgroundImage: "url('/images/wce/training/mobile/BG-Yellow-Train-mb.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    paddingBottom: "8%",
                }}>
                    <p style={{
                        fontFamily: "TimesNewRoman, serif",
                        fontWeight: 500,
                        fontSize: "clamp(1rem, 5vw, 1.8rem)",
                        color: "#FFA94F",
                        lineHeight: 1.4,
                        textAlign: "center",
                        padding: "8% 16px 4%",
                    }}>
                        Skill-Up With Us!
                    </p>

                    <div style={{
                        margin: "0 16px",
                        padding: "12px",
                        border: "1.5px solid #F5D96B",
                        borderRadius: "16px",
                        backgroundImage: `repeating-linear-gradient(to right, #F5D96B 0px, #F5D96B 1.5px, transparent 1.5px, transparent calc(100% / 4))`,
                        backgroundSize: "100% 100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        marginBottom: "5%",
                    }}>
                        {/* Card 1 */}
                        <div style={{ background: "#FFEFF8", border: "2px solid #ED84C6", borderRadius: "16px", padding: "12px" }}>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ width: "45%", flexShrink: 0, borderRadius: "8px", overflow: "hidden" }}>
                                    <Image src="/images/wce/training/mobile/Photo1-mb.png" alt="External Training"
                                        width={162} height={124}
                                        style={{ width: "100%", height: "auto", display: "block" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: "Times New Roman, serif", fontSize: "clamp(11px, 4.3vw, 17px)", fontWeight: 700, textDecoration: "underline", color: "#DF56A4", margin: "0 0 4px", letterSpacing: "-0.05em" }}>
                                        External Training
                                    </p>
                                    <p style={{ fontSize: "clamp(5px, 2.6vw, 13px)", color: "#DF56A4", margin: "0 0 2px" }}>
                                        <strong>Timeline:</strong> TBA
                                    </p>
                                    <p style={{ fontSize: "clamp(5px, 2.6vw, 13px)", color: "#DF56A4", margin: 0 }}>
                                        <strong>Place:</strong> TBA
                                    </p>
                                </div>
                            </div>
                            <p style={{ fontSize: "clamp(5px, 2.3vw, 13px)", color: "#DF56A4", lineHeight: 1.5, margin: "0 0 4px", fontWeight: 500, textAlign: "justify", letterSpacing: "-0.05em" }}>
                                External Training is an exclusive event held under Weekend Career Expo 2026, aimed to provide participants with direct exposure to professional work environments and valuable insights into the world of work. This event includes company presentations, interactive training sessions led by industry professionals, and hands-on problem-solving activities based on real workplace scenarios.
                            </p>
                            <p style={{ fontSize: "clamp(5px, 2.3vw, 13px)", color: "#DF56A4", lineHeight: 1.5, margin: "0 0 10px", fontWeight: 500, textAlign: "justify", letterSpacing: "-0.05em" }}>
                                Participants will also gain insights from experienced professionals who will share their career journeys and practical perspectives. Through this experience, participants will develop a broader understanding of workplace practices, expand their professional network, and build essential skills to shape their future career paths.
                            </p>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <a href="#" style={{ background: "#E91E8C", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "clamp(5px, 2vw, 13px)", fontWeight: 500, textDecoration: "none" }}>
                                    Join Training
                                </a>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div style={{ background: "#FFEFF8", border: "2px solid #ED84C6", borderRadius: "16px", padding: "12px" }}>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ width: "45%", flexShrink: 0, borderRadius: "8px", overflow: "hidden" }}>
                                    <Image src="/images/wce/training/mobile/Photo2-mb.png" alt="Internal Training"
                                        width={162} height={124}
                                        style={{ width: "100%", height: "auto", display: "block" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: "Times New Roman, serif", fontSize: "clamp(11px, 4.3vw, 17px)", fontWeight: 700, textDecoration: "underline", color: "#DF56A4", margin: "0 0 4px", letterSpacing: "-0.05em" }}>
                                        Internal Training
                                    </p>
                                    <p style={{ fontSize: "clamp(5px, 2.6vw, 13px)", color: "#DF56A4", margin: "0 0 2px" }}>
                                        <strong>Timeline:</strong> TBA
                                    </p>
                                    <p style={{ fontSize: "clamp(5px, 2.6vw, 13px)", color: "#DF56A4", margin: 0 }}>
                                        <strong>Place:</strong> TBA
                                    </p>
                                </div>
                            </div>
                            <p style={{ fontSize: "clamp(5px, 2.3vw, 13px)", color: "#DF56A4", lineHeight: 1.5, margin: "0 0 4px", fontWeight: 500, textAlign: "justify", letterSpacing: "-0.05em" }}>
                                Internal Training is an exclusive program under Weekend Career Expo 2026, intended for the top five finalist teams of the Essay Competition and Mini Case Competition. The program features a series of interactive sessions guided by experienced mentors, designed to enrich participants with deeper insights and professional perspectives.
                            </p>
                            <p style={{ fontSize: "clamp(5px, 2.3vw, 13px)", color: "#DF56A4", lineHeight: 1.5, margin: "0 0 10px", fontWeight: 500, textAlign: "justify", letterSpacing: "-0.05em" }}>
                                Through Internal Training, each finalist team will receive focused guidance to strengthen their way of thinking, improve how they develop ideas, and communicate them more clearly.
                            </p>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <a href="#" style={{ background: "#E91E8C", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "clamp(5px, 2vw, 13px)", fontWeight: 500, textDecoration: "none" }}>
                                    Join Training
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
