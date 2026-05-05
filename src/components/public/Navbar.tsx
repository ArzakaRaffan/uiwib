"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/wce", label: "WCE" },
  { href: "#", label: "Job Expo" },
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
      <div className="w-full px-6 h-16 flex items-center justify-between">

        {/* Left — brand name */}
        <Link href="/" className="flex items-center">
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
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-[#1a1a2e]">
            <Image
              src="/images/UIWIB-LOGO.png"
              alt="UIWIB Logo"
              width={48}
              height={48}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Link>

        {/* Right — desktop nav links */}
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "white" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-3 flex flex-col gap-1" style={{ background: "#b52d7a" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "TTCommons, sans-serif",
                fontWeight: pathname === link.href ? 700 : 400,
                fontSize: "1rem",
                color: "white",
                padding: "0.6rem 1rem",
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