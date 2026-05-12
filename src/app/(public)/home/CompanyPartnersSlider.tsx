"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CompanyPartner } from "@/types";

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

const ITEM_W_MOBILE = 160;
const ITEM_W_DESKTOP = 340;
const GAP = 1;

export default function CompanyPartnersSlider() {
    const isMobile = useIsMobile();
    const [companies, setCompanies] = useState<CompanyPartner[]>([]);

    useEffect(() => {
        fetch("/api/company-partners")
            .then((r) => r.json())
            .then((d) => { if (d.success) setCompanies(d.data); });
    }, []);

    if (companies.length === 0) return null;

    const travel = companies.length * ((isMobile ? ITEM_W_MOBILE : ITEM_W_DESKTOP) + GAP);

    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
            <motion.div
                key={isMobile ? "mobile" : "desktop"}
                animate={{ x: [0, -travel] }}
                transition={{ duration: isMobile ? 14 : 5, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                style={{ display: "flex", alignItems: "center", width: "max-content", padding: "12px 0" }}
            >
                {[...companies, ...companies].map((company, i) => (
                    <div key={i} style={{
                        width: `${isMobile ? ITEM_W_MOBILE : ITEM_W_DESKTOP}px`,
                        height: isMobile ? "80px" : "120px",
                        flexShrink: 0,
                        marginRight: `${GAP}px`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <img
                            src={company.logoUrl}
                            alt={company.name}
                            style={{
                                maxHeight: isMobile ? "50px" : "70px",
                                maxWidth: isMobile ? "120px" : "200px",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain"
                            }}
                            draggable={false}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}