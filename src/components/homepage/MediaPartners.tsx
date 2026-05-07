"use client"
import Image from "next/image"

export const mediaPartnersRow1 = [
    "/images/media-partners/DWDG Binus.png",
    "/images/media-partners/Impactional.png",
    "/images/media-partners/Ristek.png",
    "/images/media-partners/Senandika.png",
    "/images/media-partners/Atma Jaya.png",
]

export const mediaPartnersRow2 = [
    "/images/media-partners/Growth Skill.png",
    "/images/media-partners/Overcome.png",
    "/images/media-partners/Teknik Industri.png",
    "/images/media-partners/GConsulting.png",
    "/images/media-partners/YouthFounders.png",
    "/images/media-partners/Hima Bisdig.png",
    "/images/media-partners/Hellocation.png",
]

export function MarqueeRow({ logos, speed = 20 }: { logos: string[], speed?: number }) {
    const doubled = [...logos, ...logos]
    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
            <div style={{
                display: "flex",
                gap: "clamp(24px, 4vw, 60px)",
                width: "max-content",
                animation: `marquee ${speed}s linear infinite`,
                alignItems: "center",
            }}>
                {doubled.map((src, i) => (
                    <div key={i} style={{
                        position: "relative",
                        height: "clamp(40px, 12vw, 250px)",
                        width: "clamp(60px, 12vw, 250px)",
                        flexShrink: 0,
                    }}>
                        <Image src={src} alt="" fill style={{ objectFit: "contain" }} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function MediaPartnersSection() {
    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
            <style>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
            <MarqueeRow logos={mediaPartnersRow1} speed={15} />
            <div style={{ marginTop: "clamp(12px, 2vw, 24px)" }} />
            <MarqueeRow logos={mediaPartnersRow2} speed={13} />
        </div>
    )
}
