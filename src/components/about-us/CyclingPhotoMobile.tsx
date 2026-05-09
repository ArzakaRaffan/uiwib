"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const photos = [
    "/images/about-us/get-to-know/Photo1.png",
    "/images/about-us/get-to-know/Photo2.png",
    "/images/about-us/get-to-know/Photo3.png",
    "/images/about-us/get-to-know/Photo4.png",
];

export default function CyclingPhotoMobile() {
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
        <div className="absolute z-30 block md:hidden" style={{
            top: "33vw",
            right: "-45vw",
            width: "117vw",
            overflow: "hidden"
        }}>
            <div className="absolute" style={{ top: "8vw", right: "-3.9vw", width: "77%" }}>
                {photos.map((src, i) => (
                    <Image
                        key={src}
                        src={src}
                        alt={`Photo ${i + 1}`}
                        width={500}
                        height={400}
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

            <Image src="/images/about-us/get-to-know/Camera.png" alt="Camera"
                width={1000} height={500} style={{ width: "100%", height: "auto", position: "relative", zIndex: 10, rotate: "84deg" }} />
        </div>
    );
}