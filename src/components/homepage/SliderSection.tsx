// SliderSection.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const slides = [
    { src: "/images/homepage/tagline/Slider1.png", label: "Pre-Event", href: "wce/pre-event", color: "text-blue-300" },
    { src: "/images/homepage/tagline/Slider2.png", label: "Competition", href: "#", color: "text-orange-400" },
    { src: "/images/homepage/tagline/Slider3.png", label: "Training", href: "#", color: "text-pink-400" },
    { src: "/images/homepage/tagline/Slider4.png", label: "Grand Seminar", href: "/wce/grand-seminar", color: "text-blue-700" },
    { src: "/images/homepage/tagline/Slider5.png", label: "Job Expo", href: "#", color: "text-orange-400" },
];

export default function SliderSection() {
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
        <section aria-label="Sub Events Slider" className="w-full pt-0 pb-3 md:pb-3">
            <button
                type="button"
                aria-label="Sub events slider"
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
                                width={401}
                                height={785}
                                className="block md:hidden"
                                style={{
                                    height: "65vw",
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
                                    height: "clamp(430px, 55vw, 785px)",
                                    width: "auto",
                                    objectFit: "cover",
                                }}
                                draggable={false}
                            />
                            <div className="absolute bottom-[8%] left-0 right-0 flex flex-col items-center">
                                <Link
                                    href={slide.href}
                                    onClick={(e) => isDragging.current && e.preventDefault()}
                                    className={`text-xs md:text-base font-semibold underline ${slide.color}`}
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