"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-07-25T08:00:00").getTime();

const calculateTimeLeft = () => {
    const diff = TARGET_DATE - Date.now();
    return {
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((diff / 1000 / 60) % 60)),
    };
};

export default function CountDownGrandSeminar() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        console.log("TARGET:", TARGET_DATE);
        console.log("NOW:", Date.now());
        console.log("DIFF:", TARGET_DATE - Date.now());
        console.log("RESULT:", calculateTimeLeft());
        setTimeLeft(calculateTimeLeft());
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const cards = [
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
    ];

    return (
        <div style={{ position: "absolute", top: "-12%", left: "50%", transform: "translateX(-50%)", width: "70cqw", zIndex: 50 }}>
            <div style={{ position: "relative" }}>
                <Image src="/images/wce/grand-seminar/CountdownBackground.png" alt="" width={791} height={708}
                    style={{ width: "100%", height: "auto" }} className="drop-shadow-2xl" priority />
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "85%",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "3%",
                }}>
                    {cards.map(({ value, label }) => (
                        <div key={label} style={{ position: "relative", flex: 1 }}>
                            <Image src="/images/wce/grand-seminar/rect.png" alt=""
                                width={200} height={200}
                                style={{ width: "100%", height: "auto" }} />
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <p style={{
                                    fontFamily: "TimesNewRoman, serif",
                                    fontWeight: 900,
                                    fontSize: "clamp(1rem, 7cqw, 7rem)",
                                    color: "#CF388E",
                                    lineHeight: 1,
                                }}>
                                    {String(value).padStart(2, "0")}
                                </p>
                                <p style={{
                                    fontFamily: "TTCommons, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "clamp(0.5rem, 2cqw, 1.8rem)",
                                    color: "#CF388E",
                                    marginTop: "8%",
                                }}>
                                    {label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}