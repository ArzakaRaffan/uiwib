"use client";
import Image from "next/image";
import { useState, useRef } from "react";

const FRAMES_OPEN = [
    "/images/homepage/tagline/Envelope-Closed-Grow.png",
    "/images/homepage/tagline/Envelope-Closed1-Grow.png",
    "/images/homepage/tagline/Grow1.png",
    "/images/homepage/tagline/Grow2.png",
];

export default function EnvelopeGrow({ isStatic = false, isMobile = false }: { isStatic?: boolean; isMobile?: boolean }) {
    const [frameIndex, setFrameIndex] = useState(isStatic ? FRAMES_OPEN.length - 1 : 0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function stopAnimation() {
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    }
    function playFrames(from: number, to: number) {
        stopAnimation();
        let current = Math.max(0, Math.min(from, FRAMES_OPEN.length - 1));
        const step = current < to ? 1 : -1;
        intervalRef.current = setInterval(() => {
            current += step;
            current = Math.max(0, Math.min(current, FRAMES_OPEN.length - 1));
            setFrameIndex(current);
            if (current === to) stopAnimation();
        }, 120);
    }

    function handleMouseEnter() { playFrames(frameIndex, FRAMES_OPEN.length - 1); }
    function handleMouseLeave() { playFrames(frameIndex, 0); }

    return (
        <button
            type="button"
            className="absolute flex flex-col items-center bg-transparent border-none cursor-pointer p-0"
            style={{
                top: isMobile ? "clamp(20px, 40vw, 110px)" : "clamp(-170px, -15vw, -100px)",
                right: isMobile ? "clamp(5px, 1.5vw, 18px)" : "clamp(20px, 5vw, 120px)",
            }}
            onMouseEnter={isStatic ? undefined : handleMouseEnter}
            onMouseLeave={isStatic ? undefined : handleMouseLeave}
        >
            <div style={{
                width: "clamp(130px, 21vw, 332px)",
                height: "clamp(125px, 22.5vw, 415px)",
                display: "flex",
                alignItems: "flex-end",
            }}>
                {FRAMES_OPEN[frameIndex] ? (
                    <Image
                        src={FRAMES_OPEN[frameIndex]}
                        alt="Grow envelope"
                        width={332}
                        height={318}
                        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom" }}
                    />
                ) : null}
            </div>
            <div style={{ marginTop: "clamp(4px, 1vw, 12px)", height: "clamp(20px, 3vw, 41px)" }}>
                <p style={{
                    fontFamily: "TTCommons, serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: isMobile ? "clamp(0.8rem, 3.5vw, 1.2rem)" : "clamp(1.5rem, 2cqw, 4rem)",
                    color: isMobile ? "#FFF0AF" : "#CF388E",
                    lineHeight: 1.4,
                }}>
                    {"Grow"}
                </p>
            </div>
        </button>
    );
}