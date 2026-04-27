"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const FRAMES_OPEN = [
    "/images/homepage/tagline/Envelope-Closed-Connect.png",
    "/images/homepage/tagline/Envelope-Closed1-Connect.png",
    "/images/homepage/tagline/Connect1.png",
    "/images/homepage/tagline/Connect2.png",
];

export default function EnvelopeConnect() {
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
            className="absolute -top-[220px] left-1/2 -translate-x-1/2 flex flex-col items-center bg-transparent border-none cursor-pointer p-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="flex items-end"
                style={{
                    width: "20vw",
                    maxWidth: "332px",
                    minWidth: "120px",
                    height: "25vw",
                    maxHeight: "415px",
                    minHeight: "150px",
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
            <div
                style={{
                    opacity: 1,
                    marginTop: "12px",
                    height: "41px",
                }}
            >
                <Image
                    src="/images/homepage/tagline/Connect.png"
                    alt="Connect"
                    width={111}
                    height={41}
                    style={{ width: "8vw", height: "auto", maxWidth: "100px", minWidth: "40px" }}
                />
            </div>
        </button>
    );
}