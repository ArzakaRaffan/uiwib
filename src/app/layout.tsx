// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UI Women in Business",
  description:
    "Empowering women in Universitas Indonesia for their future and beyond. #StrongerTogether",
  openGraph: {
    title: "UI Women in Business",
    description: "Empowering, Connecting, and Growing Women at UI for a Brighter Future",
    url: "https://uiwomeninbusiness.com",
    siteName: "UIWIB",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-white text-neutral-900">{children}</body>
    </html>
  );
}
