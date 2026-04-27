

export const metadata = { title: "Grand Seminar — WCE 2025 UIWIB" };

const seriesOfEvents = [
  {
    icon: "🏢",
    title: "Company Presentation",
    description: "Where leading organizations share their values, work culture, and career opportunities.",
  },
  {
    icon: "🎙️",
    title: "Seminar Sessions",
    description: "Featuring inspiring talks from fearless female leaders and changemakers.",
  },
  {
    icon: "🏅",
    title: "Awarding",
    description: "Recognizing outstanding participants of WCE competitions.",
  },
];

const pastSpeakers = [
  { name: "Nisa Fitri", role: "Manager at a Global Consulting Firm" },
  { name: "Christella Fenisianita", role: "Global Consulting Firm" },
  { name: "Sundari Yunjuai", role: "Head of Public Relations Vidio" },
  { name: "Naisishia Yusuf", role: "Student at Atelier Indonesia" },
];

export default function GrandSeminarPage() {
  return (
    <>
      {/* HERO — full-screen premium */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Multi-layer background */}
        <div className="absolute inset-0 bg-navy-gradient" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 70% 50%, #e91e8c, transparent), radial-gradient(ellipse 50% 80% at 20% 80%, #f9a825, transparent)",
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Decorative circle */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full border border-white/10 -translate-y-1/4 translate-x-1/4" />
        <div className="absolute right-0 top-0 w-[700px] h-[700px] rounded-full border border-white/5 -translate-y-1/4 translate-x-1/4" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-rose-300">
              Main Event · WCE 2025
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Grand<br />
              <span style={{ color: "var(--color-rose-mid)" }}>Seminar</span>
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-3 italic font-display">
              "The Future Is Female: A Celebration of Fearless Female Leadership,
              Entrepreneurship, and Innovation Across Industries."
            </p>
            <p className="text-blue-200 text-sm leading-relaxed mb-8">
              Grand Seminar is the main event of Weekend Career Expo 2025 by Universitas
              Indonesia Women In Business — featuring inspiring women leaders and company presentations.
            </p>

            {/* Info pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white">
                📅 Saturday, 26 July 2025
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white">
                📍 CBN Hall, Menara Kuningan
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white">
                🕙 10:00 – 16:00 WIB
              </div>
            </div>

            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-3"
            >
              Register Now ✨
            </a>
          </div>

          {/* Right: Countdown / Visual */}
          <div className="hidden md:flex flex-col items-center gap-6">
            <div className="w-56 h-56 rounded-full border-2 border-white/20 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm animate-float">
              <div className="text-5xl mb-2">🎤</div>
              <div className="font-display text-white font-bold text-lg text-center leading-tight">
                26 July<br />2025
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
              {[
                { label: "Speakers", value: "10+" },
                { label: "Companies", value: "5+" },
                { label: "Attendees", value: "500+" },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 border border-white/10 rounded-2xl p-3 text-center">
                  <div className="font-display font-bold text-xl text-white">{s.value}</div>
                  <div className="text-xs text-blue-200 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Series of Events */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">Series of Events</h2>
          <p className="section-subtitle">A full day of inspiration, learning, and celebration</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {seriesOfEvents.map((s) => (
              <div key={s.title} className="card p-6 text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-base mb-2" style={{ color: "var(--color-navy)" }}>
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Seminar — Speakers */}
      <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">Our Past Grand Seminar</h2>
          <p className="section-subtitle">
            Heroes in the Professional Landscape — inspiring women who led the way
          </p>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {pastSpeakers.map((speaker) => (
              <div key={speaker.name} className="card p-4 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-rose-100 flex items-center justify-center text-2xl">
                  👩‍💼
                </div>
                <h4 className="font-display font-bold text-sm mb-1" style={{ color: "var(--color-navy)" }}>
                  {speaker.name}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{speaker.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--color-navy)" }}>
            Ready to Be Inspired?
          </h2>
          <p className="text-neutral-500 mb-6 leading-relaxed">
            Join hundreds of students and professionals for a day of powerful conversations and
            career-defining connections.
          </p>
          <a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-10 py-3"
          >
            Register for Grand Seminar →
          </a>
        </div>
      </section>
    </>
  );
}
