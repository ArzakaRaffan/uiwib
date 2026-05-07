"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const ITEM_W = 340;
const GAP = 1; // gap-16

const companies = [
    { src: "/images/company-partners/BCG.png", alt: "BCG" },
    { src: "/images/company-partners/Blibli.png", alt: "Blibli" },
    { src: "/images/company-partners/Cloudhost.png", alt: "Cloudhost" },
    { src: "/images/company-partners/Kopi Kenangan.png", alt: "Kopi Kenangan" },
    { src: "/images/company-partners/Paragon.png", alt: "Paragon" },
    { src: "/images/company-partners/Realfood.png", alt: "Realfood" },
    { src: "/images/company-partners/Sisternet.png", alt: "Sisternet" },
];

const travel = companies.length * (ITEM_W + GAP);

export default function CompanyPartnersSlider() {
    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
            <motion.div
                animate={{ x: [0, -travel] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                style={{ display: "flex", alignItems: "center", width: "max-content", padding: "12px 0" }}
            >
                {[...companies, ...companies].map((company, i) => (
                    <div key={i} style={{
                        width: `${ITEM_W}px`,
                        height: "120px",
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
                            style={{ height: "clamp(20px, 6vw, 100px)", width: "auto", maxWidth: "100%", objectFit: "contain" }}
                            draggable={false}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}