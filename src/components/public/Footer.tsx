export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#CF388E", position: "relative", zIndex: 50 }} className="py-8">
      <div className="px-6">
        
        {/* Mobile: stack vertikal, Desktop: horizontal */}
        <div className="flex flex-col md:flex-row justify-start gap-[30%] pb-6">

          {/* Contact Us — di mobile tampil duluan */}
          <div className="flex flex-col gap-2 md:order-2">
            <h3 style={{
              fontFamily: "Times New Roman, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.2rem, 5vw, 1.5rem)",
              color: "#FFF5E1",
              textTransform: "uppercase",
              margin: 0,
            }}>
              Contact Us
            </h3>
            <div style={{
              fontFamily: "TTCommons, sans-serif",
              fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
              color: "#FFF5E1",
              lineHeight: 1.3,
            }}>
              <p style={{ margin: 0 }}>Phone: +6281385800886 (Love)</p>
              <p style={{ margin: 0 }}>Email: womeninbusiness.ui@gmail.com</p>
            </div>
            <div className="flex gap-3 mt-1" style={{ marginBottom: "1.5rem" }}>
              <a href="https://www.tiktok.com/@uiwomeninbusiness" aria-label="TikTok" style={{ color: "#FFF5E1" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/uiwomeninbusiness/" aria-label="Instagram" style={{ color: "#FFF5E1" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/universitas-indonesia-women-in-business/" aria-label="LinkedIn" style={{ color: "#FFF5E1" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Brand — di mobile tampil kedua */}
          <div className="flex flex-col gap-2 md:order-1">
            <h2 style={{
              fontFamily: "TimesNewRoman, serif",
              fontWeight: 700,
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              color: "#FFF5E1",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: 0,
            }}>
              UI Women in Business
            </h2>
            <div style={{
              fontFamily: "TTCommons, sans-serif",
              fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
              color: "#FFF5E1",
              lineHeight: 1.6,
              letterSpacing: "-0.05em"
            }}>
              <p style={{ fontWeight: 700, margin: 0 }}>© Universitas Indonesia Women in Business (UIWIB)</p>
              <p style={{ margin: 0 }}>UIWIB is an independent student-run organization at Universitas Indonesia</p>
            </div>
            <p style={{
              fontFamily: "TTCommons, sans-serif",
              fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
              color: "#FFF5E1",
              margin: 0,
            }}>
              All Rights Reserved
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}