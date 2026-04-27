// src/components/public/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-neutral-700">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-rose-700 flex items-center justify-center text-white text-xs font-bold font-display">
                UI
              </div>
              <span className="font-display font-bold text-white">UI Women in Business</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              An independent student-run organization at Universitas Indonesia.
              Empowering women in UI for their future and beyond.
            </p>
            <p className="text-xs text-neutral-500 mt-3">#StrongerTogether</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/wce", label: "Weekend Career Expo" },
                { href: "/wce/competition", label: "Competition" },
                { href: "/wce/training", label: "Training" },
                { href: "/wce/grand-seminar", label: "Grand Seminar" },
                { href: "/wce/job-expo", label: "Job Expo" },
                { href: "/about-us", label: "About Us" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-rose-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                📞{" "}
                <a href="tel:+6281234567890" className="hover:text-rose-400 transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li>
                ✉️{" "}
                <a
                  href="mailto:uiwomeninbusiness@gmail.com"
                  className="hover:text-rose-400 transition-colors"
                >
                  uiwomeninbusiness@gmail.com
                </a>
              </li>
            </ul>

            <h4 className="text-white font-semibold mt-6 mb-3 text-sm tracking-wide uppercase">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {["Instagram", "LinkedIn", "Twitter", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-neutral-700 hover:bg-rose-700 flex items-center justify-center text-xs transition-colors"
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Universitas Indonesia Women in Business. All Rights Reserved.</p>
          <p>Made with ♥ by UIWIB Tech Team</p>
        </div>
      </div>
    </footer>
  );
}
