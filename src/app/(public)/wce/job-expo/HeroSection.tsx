"use client";
import Image from "next/image";

interface HeroSectionJEProps {
  search?: string;
  onSearchChange?: (v: string) => void;
  onFilterOpen?: () => void;
  activeFilterCount?: number;
}

export default function HeroSectionJE({
  search = "",
  onSearchChange,
  onFilterOpen,
  activeFilterCount = 0,
}: HeroSectionJEProps) {
  return (
    <>
      {/* DESKTOP */}
      <section
        className="hidden md:block relative w-full overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/wce/job-expo/jobexpo_bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "4cqw 5cqw 5cqw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3cqw",
          }}
        >
          {/* Logo only — no text */}
          <div style={{ position: "relative", width: "40cqw", height: "26cqw", marginTop: "-10cqw" }}>
            <Image
              src="/images/wce/job-expo/Logo WCE x Glints.webp"
              alt="WCE x Glints x TapLoker"
              fill
              sizes="40vw"
              style={{ objectFit: "contain", objectPosition: "bottom center" }}
            />
          </div>

          {/* Search bar row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1cqw",
              width: "65%",
            }}
          >
            {/* Pill: asterisk + input + search icon */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.93)",
                borderRadius: "1.7cqw",
                padding: "0.3cqw 1.7cqw 0.3cqw 0.3cqw",
                gap: "0.8cqw",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              }}
            >
              {/* Asterisk image inside pill — no background */}
              <div style={{ width: "3.5cqw", height: "3.5cqw", flexShrink: 0 }}>
                <Image
                  src="/images/wce/job-expo/Asterisk.webp"
                  alt=""
                  width={48}
                  height={48}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              {/* Input */}
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="I am interested in..."
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  fontFamily: "TTCommons, sans-serif",
                  fontSize: "1.2cqw",
                  color: "#1a1a2e",
                  outline: "none",
                }}
              />

              {/* Search icon */}
              <button
                type="button"
                aria-label="Search"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="2.4cqw"
                  height="2.4cqw"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2555B7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
              </button>
            </div>

            {/* Hamburger */}
            <button
              type="button"
              aria-label="Filter jobs"
              onClick={onFilterOpen}
              style={{
                position: "relative",
                width: "3.2cqw",
                height: "3.2cqw",
                borderRadius: "0.8cqw",
                background: activeFilterCount > 0 ? "#CF388E" : "#3d88fa",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.45cqw",
                cursor: "pointer",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: "55%",
                    height: "0.2cqw",
                    background: "white",
                    borderRadius: "2px",
                  }}
                />
              ))}
              {activeFilterCount > 0 && (
                <div style={{ position: "absolute", top: "-0.4cqw", right: "-0.4cqw", minWidth: "1.1cqw", height: "1.1cqw", borderRadius: "50%", background: "white", color: "#CF388E", fontFamily: "TTCommons, sans-serif", fontSize: "0.65cqw", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 0.1cqw", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
                  {activeFilterCount}
                </div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* MOBILE */}
      <section
        className="block md:hidden relative w-full overflow-hidden"
        style={{ containerType: "inline-size", marginTop: "-1.5rem" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/wce/job-expo/jobexpo_bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "10cqw 5cqw 9cqw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6cqw",
          }}
        >
          {/* Logo */}
          <div style={{ position: "relative", width: "75cqw", height: "30cqw", marginTop: "-8cqw" }}>
            <Image
              src="/images/wce/job-expo/Logo WCE x Glints.webp"
              alt="WCE x Glints x TapLoker"
              fill
              sizes="60vw"
              style={{ objectFit: "contain", objectPosition: "bottom center" }}
            />
          </div>

          {/* Search bar row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.5cqw",
              width: "90%",
            }}
          >
            {/* Pill: asterisk + input + search icon */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.93)",
                borderRadius: "6cqw",
                padding: "0.5cqw 3cqw 0.5cqw 0.5cqw",
                gap: "2cqw",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              }}
            >
              {/* Asterisk image inside pill — no background */}
              <div style={{ width: "10cqw", height: "10cqw", flexShrink: 0 }}>
                <Image
                  src="/images/wce/job-expo/Asterisk.webp"
                  alt=""
                  width={48}
                  height={48}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="I am interested in..."
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  fontFamily: "TTCommons, sans-serif",
                  fontSize: "3.5cqw",
                  color: "#1a1a2e",
                  outline: "none",
                }}
              />

              <button
                type="button"
                aria-label="Search"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="6.5cqw"
                  height="6.5cqw"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2555B7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
              </button>
            </div>

            {/* Hamburger */}
            <button
              type="button"
              aria-label="Filter jobs"
              onClick={onFilterOpen}
              style={{
                position: "relative",
                width: "9cqw",
                height: "9cqw",
                borderRadius: "2.5cqw",
                background: activeFilterCount > 0 ? "#CF388E" : "#3d88fa",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5cqw",
                cursor: "pointer",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: "55%",
                    height: "0.6cqw",
                    background: "white",
                    borderRadius: "2px",
                  }}
                />
              ))}
              {activeFilterCount > 0 && (
                <div style={{ position: "absolute", top: "-1cqw", right: "-1cqw", minWidth: "3cqw", height: "3cqw", borderRadius: "50%", background: "white", color: "#CF388E", fontFamily: "TTCommons, sans-serif", fontSize: "1.8cqw", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 0.3cqw", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
                  {activeFilterCount}
                </div>
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
