"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/wce", label: "WCE" },
  { href: "/wce/job-expo", label: "Job Expo" },
  { href: "/about-us", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "#CF388E" }}>
      <div className="w-full px-4 h-10 flex items-center justify-between md:h-16 md:px-6">

        {/* Mobile: Hamburg kiri | Desktop: Brand name kiri */}
        <button
          className="md:hidden p-1 rounded-lg"
          style={{ color: "white" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-4 flex flex-col gap-[3px]">
            <span className={`block h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </div>
        </button>

        {/* Desktop: Brand name kiri */}
        <Link href="/" className="hidden md:flex items-center">
          <span style={{
            fontFamily: "TTCommons, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
            color: "white",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
          }}>
            UI Women in Business
          </span>
        </Link>

        {/* Center — logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-[#1a1a2e]">
            <Image
              src="/images/UIWIB-LOGO.png"
              alt="UIWIB Logo"
              width={48}
              height={48}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "TTCommons, sans-serif",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
                  color: "white",
                  padding: "0.4rem 1rem",
                  borderRadius: "999px",
                  background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
                  transition: "background 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile: Brand name kanan */}
        <Link href="/" className="md:hidden flex items-center">
          <span style={{
            fontFamily: "TTCommons, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(0.55rem, 2.5vw, 0.75rem)",
            color: "white",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
          }}>
            UI Women in Business
          </span>
        </Link>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-2 flex flex-col gap-1" style={{ background: "#b52d7a" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "TTCommons, sans-serif",
                fontWeight: pathname === link.href ? 700 : 400,
                fontSize: "0.9rem",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.75rem",
                background: pathname === link.href ? "rgba(255,255,255,0.2)" : "transparent",
                textDecoration: "none",
                display: "block",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}