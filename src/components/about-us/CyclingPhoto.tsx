"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const photos = [
    "/images/about-us/get-to-know/Photo1.png",
    "/images/about-us/get-to-know/Photo2.png",
    "/images/about-us/get-to-know/Photo3.png",
    "/images/about-us/get-to-know/Photo4.png",
];

export default function CameraWithPhoto() {
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
        <div className="absolute z-30" style={{ top: "35%", left: "2%", width: "50%" }}>
            {/* Cycling Photo — posisi absolut relatif terhadap wrapper ini */}
            <div className="absolute rotate-[6deg]" style={{ top: "27%", left: "12%", width: "58%" }}>
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
            {/* Camera di atas foto */}
            <Image src="/images/about-us/get-to-know/Camera.png" alt="Camera"
                width={500} height={400} style={{ width: "100%", height: "auto", position: "relative", zIndex: 10 }} />
        </div>
    );
}