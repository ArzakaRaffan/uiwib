"use client";
import { motion } from "framer-motion";

const ITEM_W = 180;
const GAP = 60;

export const mediaPartnersRow1 = [
    "/images/media-partners/DWDG Binus.png",
    "/images/media-partners/Impactional.png",
    "/images/media-partners/Ristek.png",
    "/images/media-partners/Senandika.png",
    "/images/media-partners/Atma Jaya.png",
];
export const mediaPartnersRow2 = [
    "/images/media-partners/Growth Skill.png",
    "/images/media-partners/Overcome.png",
    "/images/media-partners/Teknik Industri.png",
    "/images/media-partners/GConsulting.png",
    "/images/media-partners/YouthFounders.png",
    "/images/media-partners/Hima Bisdig.png",
    "/images/media-partners/Hellocation.png",
];

function MarqueeRow({ logos, duration }: { logos: string[]; duration: number }) {
    const travel = logos.length * (ITEM_W + GAP);

    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
            <motion.div
                animate={{ x: [0, -travel] }}
                transition={{ duration, repeat: Infinity, ease: "linear",repeatType: "loop" }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "max-content",
                    padding: "20px 0",
                }}
            >
                {[...logos, ...logos, ...logos].map((src, i) => (
                    <div key={i} style={{
                        width: `${ITEM_W}px`,
                        height: "90px",
                        flexShrink: 0,
                        marginRight: `${GAP}px`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function MediaPartnersSection() {
    return (
        <div style={{ width: "100%" }}>
            <MarqueeRow logos={mediaPartnersRow1} duration={5} />
            <div style={{ marginTop: "16px" }} />
            <MarqueeRow logos={mediaPartnersRow2} duration={5} />
        </div>
    );
}