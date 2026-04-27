"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const FRAMES_OPEN = [
    "/images/homepage/tagline/Envelope-Closed-Grow.png",
    "/images/homepage/tagline/Envelope-Closed1-Grow.png",
    "/images/homepage/tagline/Grow1.png",
    "/images/homepage/tagline/Grow2.png",
];

export default function EnvelopeGrow() {
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
            className="absolute -top-[200px] right-[75px] flex flex-col items-center justify-end bg-transparent border-none cursor-pointer p-0"
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
                        alt="Grow envelope"
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
                    src="/images/homepage/tagline/Grow.png"
                    alt="Grow"
                    width={111}
                    height={41}
                    style={{ width: "8vw", height: "auto", maxWidth: "100px", minWidth: "40px" }}
                />
            </div>
        </button>
    );
}