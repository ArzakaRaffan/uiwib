// SliderWCEHome.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const slides = [
    { src: "/images/wce/home/Slider1.png", label: "Pre-Event", href: "/wce/pre-event", btnColor: "#E8A020" },
    { src: "/images/wce/home/Slider2.png", label: "Competition", href: "/wce/competition", btnColor: "#4A90D9" },
    { src: "/images/wce/home/Slider3.png", label: "Training", href: "/wce/training", btnColor: "#E91E8C" },
    { src: "/images/wce/home/Slider4.png", label: "Grand Seminar", href: "/wce/grand-seminar", btnColor: "#E8A020" },
    { src: "/images/wce/home/Slider5.png", label: "Job Expo", href: "/wce/job-expo", btnColor: "#E91E8C" },
];

export default function SliderWCEHome({ height = "clamp(300px, 35vw, 500px)" }: { height?: string }) {
    const dragStartX = useRef<number | null>(null);
    const isDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        dragStartX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
        isDragging.current = false;
    };

    const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (dragStartX.current === null) return;
        const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const diff = dragStartX.current - currentX;
        if (Math.abs(diff) > 5) isDragging.current = true;
        if (containerRef.current) containerRef.current.scrollLeft += diff * 0.1;
    };

    const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
        if (dragStartX.current === null) return;
        const endX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
        const diff = dragStartX.current - endX;
        if (containerRef.current) containerRef.current.scrollLeft += diff;
        dragStartX.current = null;
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!containerRef.current) return;
        if (e.key === "ArrowLeft") containerRef.current.scrollLeft -= 200;
        if (e.key === "ArrowRight") containerRef.current.scrollLeft += 200;
    };

    return (
        <section aria-label="WCE Events Slider" className="w-full pt-0 pb-3 md:pb-3">
            <button
                type="button"
                aria-label="WCE events slider"
                className="w-full outline-none cursor-grab active:cursor-grabbing select-none"
                onMouseDown={onDragStart}
                onMouseUp={onDragEnd}
                onMouseMove={onDragMove}
                onTouchStart={onDragStart}
                onTouchEnd={onDragEnd}
                onTouchMove={onDragMove}
                onKeyDown={onKeyDown}
            >
                <div
                    ref={containerRef}
                    className="flex gap-3 md:gap-5 overflow-x-auto px-3 md:px-6"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {slides.map((slide, i) => (
                        <div key={i} className="flex-shrink-0 relative">
                            {/* Mobile */}
                            <Image
                                src={slide.src}
                                alt={slide.label}
                                width={1200}
                                height={1200}
                                className="block md:hidden"
                                style={{
                                    height: "80vw",
                                    width: "auto",
                                    objectFit: "cover",
                                    minHeight: "200px",
                                    maxHeight: "785px",
                                }}
                                draggable={false}
                            />
                            {/* Desktop */}
                            <Image
                                src={slide.src}
                                alt={slide.label}
                                width={401}
                                height={785}
                                className="hidden md:block"
                                style={{
                                    height,
                                    width: "auto",
                                    objectFit: "cover",
                                }}
                                draggable={false}
                            />
                            {/* Button overlay */}
                            <div className="absolute bottom-[10%] left-0 right-0 flex justify-center">
                                <Link
                                    href={slide.href}
                                    onClick={(e) => isDragging.current && e.preventDefault()}
                                    style={{
                                        background: slide.btnColor,
                                        color: "#fff",
                                        padding: "clamp(4px, 0.5vw, 8px) clamp(12px, 1.5vw, 24px)",
                                        borderRadius: "20px",
                                        fontSize: "clamp(10px, 1vw, 14px)",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </button>
        </section>
    );
}