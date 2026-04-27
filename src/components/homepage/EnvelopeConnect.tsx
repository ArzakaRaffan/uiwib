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
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center bg-transparent border-none cursor-pointer p-0"
            style={{ top: "clamp(-225px, -20vw, -100px)" }}
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
                        alt="Connect envelope"
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
                <Image
                    src="/images/homepage/tagline/Connect.png"
                    alt="Connect"
                    width={111}
                    height={41}
                    style={{ width: "clamp(50px, 7vw, 111px)", height: "auto" }}
                />
            </div>
        </button>
    );
}