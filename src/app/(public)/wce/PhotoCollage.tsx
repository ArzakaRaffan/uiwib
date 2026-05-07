"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const photos = [
    "/images/wce/home/Photo1.png",
    "/images/wce/home/Photo2.png",
    "/images/wce/home/Photo3.png",
    "/images/wce/home/Photo4.png",
];

export default function PhotoCollage({ isMobile = false }: { isMobile?: boolean }) {
    const [current, setCurrent] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % photos.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: "absolute",
            bottom: isMobile ? "5%" : "13%",
            left: "50%",
            transform: "translateX(-50%)",
            width: isMobile ? "90%" : "80%",
        }}>
            {photos.map((src, i) => (
                <Image
                    key={src}
                    src={src}
                    alt={`Photo ${i + 1}`}
                    width={1227}
                    height={439}
                    suppressHydrationWarning
                    style={{
                        width: "100%",
                        height: "auto",
                        position: i === 0 ? "relative" : "absolute",
                        top: 0,
                        left: 0,
                        opacity: mounted ? (i === current ? 1 : 0) : i === 0 ? 1 : 0,
                        transition: mounted ? "opacity 0.8s ease" : "none",
                    }}
                />
            ))}
        </div>
    );
}