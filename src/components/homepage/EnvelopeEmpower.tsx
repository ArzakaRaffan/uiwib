"use client";
import Image from "next/image";
import { useState, useRef } from "react";

const FRAMES_OPEN = [
    "/images/homepage/tagline/Envelope-Closed-Empower.png",
    "/images/homepage/tagline/Envelope-Closed1-Empower.png",
    "/images/homepage/tagline/Empower1.png",
    "/images/homepage/tagline/Empower2.png",
];

export default function EnvelopeEmpower() {
    const [frameIndex, setFrameIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function stopAnimation() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
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

    function handleMouseEnter() {
        playFrames(frameIndex, FRAMES_OPEN.length - 1);
    }

    function handleMouseLeave() {
        playFrames(frameIndex, 0);
    }

    return (
        <button
            type="button"
            className="absolute flex flex-col items-center bg-transparent border-none cursor-pointer p-0"
            style={{ top: "clamp(-170px, -15vw, -100px)", left: "clamp(20px, 5vw, 120px)" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                style={{
                    width: "clamp(130px, 21vw, 332px)",
                    height: "clamp(125px, 22.5vw, 415px)",
                    display: "flex",
                    alignItems: "flex-end",
                }}
            >
                {FRAMES_OPEN[frameIndex] ? (
                    <Image
                        src={FRAMES_OPEN[frameIndex]}
                        alt="Empower envelope"
                        width={332}
                        height={318}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: "bottom"
                        }}
                    />
                ) : null}
            </div>
            <div style={{ marginTop: "clamp(4px, 1vw, 12px)", height: "clamp(20px, 3vw, 41px)" }}>
                <p style={{
                    fontFamily: "TTCommons, serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "clamp(1.5rem, 2cqw, 4rem)",
                    color: "#CF388E",
                    lineHeight: 1.4,
                }}>
                    {"Empower"}
                </p>
            </div>
        </button>
    );
}