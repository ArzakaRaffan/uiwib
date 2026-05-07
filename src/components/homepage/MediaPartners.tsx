"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const GAP = 60;
const ITEM_W_DESKTOP = 180;
const ITEM_W_MOBILE = 80;
const GAP_MOBILE = 20;

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

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return isMobile;
}

function MarqueeRow({ logos, duration, isMobile }: { logos: string[]; duration: number; isMobile: boolean }) {
    const itemW = isMobile ? ITEM_W_MOBILE : ITEM_W_DESKTOP;
    const gap = isMobile ? GAP_MOBILE : GAP;
    const travel = logos.length * (itemW + gap);

    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
            <motion.div
                key={`${duration}-${itemW}`}
                animate={{ x: [0, -travel] }}
                transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                style={{ display: "flex", alignItems: "center", width: "max-content", padding: "20px 0" }}
            >
                {[...logos, ...logos, ...logos].map((src, i) => (
                    <div key={i} style={{
                        width: `${itemW}px`,
                        height: isMobile ? "50px" : "90px",
                        flexShrink: 0,
                        marginRight: `${gap}px`,
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
    const isMobile = useIsMobile();
    return (
        <div style={{ width: "100%" }}>
            <MarqueeRow logos={mediaPartnersRow1} duration={isMobile ? 13 : 5} isMobile={isMobile} />
            <div style={{ marginTop: isMobile ? "-35px" : "16px" }} />
            <MarqueeRow logos={mediaPartnersRow2} duration={isMobile ? 10 : 4} isMobile={isMobile} />
        </div>
    );
}