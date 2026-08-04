"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CompanyPartner } from "@/types";

const GAP = 60;
const ITEM_W_DESKTOP = 240;
const ITEM_W_MOBILE = 150;
const GAP_MOBILE = 30;
const SPEED_PX_PER_SEC = 150;

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

function MarqueeRow({ logos, isMobile }: { logos: CompanyPartner[]; isMobile: boolean }) {
    const itemW = isMobile ? ITEM_W_MOBILE : ITEM_W_DESKTOP;
    const gap = isMobile ? GAP_MOBILE : GAP;
    const travel = logos.length * (itemW + gap);
    const duration = travel / SPEED_PX_PER_SEC;

    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
            <motion.div
                key={`${duration}-${itemW}`}
                animate={{ x: [0, -travel] }}
                transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                style={{ display: "flex", alignItems: "center", width: "max-content", padding: "12px 0" }}
            >
                {[...logos, ...logos, ...logos].map((company, i) => (
                    <div key={i} style={{
                        width: `${itemW}px`,
                        height: isMobile ? "75px" : "110px",
                        flexShrink: 0,
                        marginRight: `${gap}px`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <img
                            src={company.logoUrl}
                            alt={company.name}
                            style={{
                                maxHeight: isMobile ? "65px" : "100px",
                                maxWidth: "100%",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain",
                            }}
                            draggable={false}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function CompanyPartnersSlider() {
    const isMobile = useIsMobile();
    const [row1, setRow1] = useState<CompanyPartner[]>([]);
    const [row2, setRow2] = useState<CompanyPartner[]>([]);

    useEffect(() => {
        const fetchData = () => {
            fetch("/api/company-partners")
                .then((r) => r.json())
                .then((d) => {
                    if (!d.success) return;
                    const companies: CompanyPartner[] = d.data;
                    setRow1(companies.filter((c) => c.row === 1));
                    setRow2(companies.filter((c) => c.row === 2));
                });
        };

        fetchData();
        window.addEventListener("partners-updated", fetchData);
        return () => window.removeEventListener("partners-updated", fetchData);
    }, []);

    if (row1.length === 0 && row2.length === 0) return null;

    return (
        <div style={{ width: "100%" }}>
            {row1.length > 0 && (
                <MarqueeRow logos={row1} isMobile={isMobile} />
            )}
            {row1.length > 0 && row2.length > 0 && (
                <div style={{ marginTop: isMobile ? "-8px" : "8px" }} />
            )}
            {row2.length > 0 && (
                <MarqueeRow logos={row2} isMobile={isMobile} />
            )}
        </div>
    );
}
