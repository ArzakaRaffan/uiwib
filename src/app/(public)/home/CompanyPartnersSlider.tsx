"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
const companies = [
    { src: "/images/company-partners/BCG.png", alt: "BCG" },
    { src: "/images/company-partners/Blibli.png", alt: "Blibli" },
    { src: "/images/company-partners/Cloudhost.png", alt: "Cloudhost" },
    { src: "/images/company-partners/Kopi Kenangan.png", alt: "Kopi Kenangan" },
    { src: "/images/company-partners/Paragon.png", alt: "Paragon" },
    { src: "/images/company-partners/Realfood.png", alt: "Realfood" },
    { src: "/images/company-partners/Sisternet.png", alt: "Sisternet" },
];



export default function CompanyPartnersSlider() {
    const isMobile = useIsMobile();
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
                        <Image
                            src={company.src}
                            alt={company.alt}
                            width={180}
                            height={120}
                            style={{
                                height: isMobile ? "clamp(40px, 10vw, 120px)" : "clamp(20px, 6vw, 100px)",
                                width: "auto",
                                maxWidth: "100%",
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