"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MediaPartner } from "@/types";

const GAP = 60;
const ITEM_W_DESKTOP = 180;
const ITEM_W_MOBILE = 80;
const GAP_MOBILE = 20;

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
    const [row1, setRow1] = useState<string[]>([]);
    const [row2, setRow2] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/media-partners")
            .then((r) => r.json())
            .then((d) => {
                if (!d.success) return;
                const partners: MediaPartner[] = d.data;
                setRow1(partners.filter((p) => p.row === 1).map((p) => p.logoUrl));
                setRow2(partners.filter((p) => p.row === 2).map((p) => p.logoUrl));
            });
    }, []);

    if (row1.length === 0 && row2.length === 0) return null;

    return (
        <div style={{ width: "100%" }}>
            {row1.length > 0 && (
                <MarqueeRow logos={row1} duration={isMobile ? 13 : 5} isMobile={isMobile} />
            )}
            {row1.length > 0 && row2.length > 0 && (
                <div style={{ marginTop: isMobile ? "-35px" : "16px" }} />
            )}
            {row2.length > 0 && (
                <MarqueeRow logos={row2} duration={isMobile ? 10 : 4} isMobile={isMobile} />
            )}
        </div>
    );
}