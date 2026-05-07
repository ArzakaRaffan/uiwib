"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import CompetitionCard from "./CompetitionCard"

const BG_W = 5750
const BG_H_FULL = 8092

const BG_H_CLOSED = 4300
const BG_H_OPEN_CARD1_ONLY = 5150
const BG_H_OPEN_CARD2_ONLY = 4800  // adjust ini
const BG_H_OPEN_BOTH = 5600

function getClipRatio(openStates: boolean[]) {
    const [open1, open2] = openStates
    if (open1 && open2)  return BG_H_OPEN_BOTH / BG_W
    if (open1)           return BG_H_OPEN_CARD1_ONLY / BG_W
    if (open2)           return BG_H_OPEN_CARD2_ONLY / BG_W
    return BG_H_CLOSED / BG_W
}

export default function CompetitionSection() {
    const [openStates, setOpenStates] = useState([false, false])
    const [containerHeight, setContainerHeight] = useState<string>(
        `calc(100vw * ${BG_H_CLOSED / BG_W})`
    )

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
        <div style={{ overflow: "hidden", marginTop: "-6vw", position: "relative", zIndex: 20 }}>
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
                        src="/images/wce/competition/BG-Pink-Competition.png"
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
                            photoSrc="/images/wce/competition/Photo1.png"
                            title="Business Case Competition"
                            timeline="TBA"
                            place="TBA"
                            shortDesc="The Business Case Competition is an annual event organized by Universitas Indonesia Women in Business as one of the initiatives of Weekend Career Expo 2026. This competition allows participants to analyze and solve real-world business problems provided by our case collaborator."
                            fullDesc="The solutions made will be presented to a panel of esteemed judges and the top five teams will advance to the final round, pitching their solutions in a professional setting. This competition aims to strengthen participants' problem-solving, creativity and innovation, as well as their critical thinking skills. The Business Case Competition is an ideal place for you to expand your networks and enhance your business acumen. This competition is a great stepping stone for those of you who are keen in business and appreciate challenges."
                        />
                        <CompetitionCard
                            open={openStates[1]}
                            onToggle={() => toggle(1)}
                            photoSrc="/images/wce/competition/Photo2.png"
                            title="Essay Competition"
                            timelineScale={0.7}
                            timeline="TBA"
                            place="TBA"
                            shortDesc="The Essay Competition is an annual event organized by Universitas Indonesia Women in Business as one of the initiatives of Weekend Career Expo 2026. This competition allows participants to write essays on themes related to real-world issues."
                            fullDesc="Through this competition, participants are also able to hone their research, writing, and analytical skills. The Essay Competition is a perfect opportunity for you to showcase your opinions, views, and interpretations of specific topics. Through this competition, you are able to expand your network and advance ideas that can shape the world."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}