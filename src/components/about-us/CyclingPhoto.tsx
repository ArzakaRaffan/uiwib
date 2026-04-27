"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const photos = [
    "/images/about-us/get-to-know/Photo1.png",
    "/images/about-us/get-to-know/Photo2.png",
    "/images/about-us/get-to-know/Photo3.png",
    "/images/about-us/get-to-know/Photo4.png",
];

export default function CyclingPhoto() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % photos.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="absolute z-20 rotate-[5deg]"
            style={{ bottom: "14vw", left: "6.5vw", width: "27vw" }}
        >
            {photos.map((src, i) => (
                <Image
                    key={src}
                    src={src}
                    alt={`Photo ${i + 1}`}
                    width={500}
                    height={400}
                    style={{
                        width: "27vw",
                        height: "auto",
                        position: i === 0 ? "relative" : "absolute",
                        top: 0,
                        left: 0,
                        opacity: i === current ? 1 : 0,
                        transition: "opacity 0.8s ease",
                    }}
                />
            ))}
        </div>
    );
}