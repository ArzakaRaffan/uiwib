// src/app/(public)/wce/page.tsx
import Link from "next/link";
import Image from "next/image";

const events = [
  {
    slug: "/wce/competition",
    title: "Competition",
    date: "Monday, 26 May – Saturday, 26 July 2025",
    place: "Tentative",
    image: "/images/competition.jpg",
    fallbackEmoji: "🏆",
    bg: "bg-amber-50",
  },
  {
    slug: "/wce/training",
    title: "Training",
    date: "TBA",
    place: "TBA",
    image: "/images/training.jpg",
    fallbackEmoji: "📚",
    bg: "bg-purple-50",
  },
  {
    slug: "/wce/grand-seminar",
    title: "Grand Seminar",
    date: "Saturday, 26 July 2025",
    place: "CBN Hall, Menara Kuningan",
    image: "/images/grand-seminar.jpg",
    fallbackEmoji: "🎤",
    bg: "bg-rose-50",
  },
  {
    slug: "/wce/job-expo",
    title: "Job Expo",
    date: "Saturday, 26 July – Friday, 29 August 2025",
    place: "Website (Online)",
    image: "/images/job-expo.jpg",
    fallbackEmoji: "💼",
    bg: "bg-blue-50",
  },
];

export const metadata = {
  title: "Weekend Career Expo 2025 — UIWIB",
};

export default function WCEPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-brand-gradient">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #1a237e 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto py-16">
          <div className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/60 border border-rose-200 text-rose-600">
            Annual Event
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4" style={{ color: "var(--color-navy)" }}>
            Weekend Career<br />
            <span style={{ color: "var(--color-rose-vivid)" }}>Expo (WCE)</span>
          </h1>
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white mb-4" style={{ background: "var(--color-navy)" }}>
            May 26 – July 31, 2025
          </div>
          <p className="text-neutral-600 leading-relaxed">
            This year, under the grand theme <strong>#GrowBeyond</strong>.<br />
            WCE encourages future leaders to step out of their comfort zones,
            explore new skills, and embrace limitless career possibilities.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Our Series of Events</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event.slug} className="card group">
                {/* Image area */}
                <div className={`relative h-48 ${event.bg} flex items-center justify-center overflow-hidden`}>
                  <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                    {event.fallbackEmoji}
                  </span>
                  {/* Replace with real <Image> once you have actual photos */}
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--color-navy)" }}>
                    {event.title}
                  </h3>
                  <div className="space-y-1 mb-4">
                    <p className="text-xs text-neutral-500">
                      <span className="font-semibold text-neutral-700">Date:</span> {event.date}
                    </p>
                    <p className="text-xs text-neutral-500">
                      <span className="font-semibold text-neutral-700">Place:</span> {event.place}
                    </p>
                  </div>
                  <Link href={event.slug} className="btn-primary text-xs px-4 py-2">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
