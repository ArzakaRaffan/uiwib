// src/app/(public)/wce/competition/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Competition } from "@/types";

export const metadata = { title: "Competition — WCE 2025 UIWIB" };

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

async function getCompetitions(): Promise<Competition[]> {
  return prisma.competition.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  }) as Promise<Competition[]>;
}

export default async function CompetitionPage() {
  const competitions = await getCompetitions();

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden py-24 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: "var(--color-navy)" }}>
            Competition
          </h1>
          <p className="text-neutral-600 leading-relaxed">
            Test your analytical, creative, and problem-solving skills in our range of exciting
            competitions open to UI students and beyond.
          </p>
          <div className="mt-4 text-sm text-amber-600 font-semibold">
            📅 May 26 – July 26, 2025
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          {competitions.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="font-display text-xl font-bold text-neutral-700 mb-2">
                Coming Soon
              </h3>
              <p className="text-neutral-500 text-sm">
                Competition details will be announced soon. Stay tuned!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions.map((comp) => (
                <CompetitionCard key={comp.id} competition={comp} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function CompetitionCard({ competition }: { competition: Competition }) {
  return (
    <div className="card flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-amber-50 overflow-hidden">
        {competition.imageUrl ? (
          <Image
            src={competition.imageUrl}
            alt={competition.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">
            🏆
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg mb-1" style={{ color: "var(--color-navy)" }}>
          {competition.title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-3 flex-1">
          {competition.description}
        </p>

        {/* Timeline badge */}
        <div className="flex items-start gap-2 mb-4 p-2.5 bg-amber-50 rounded-xl">
          <span className="text-base mt-0.5">📅</span>
          <p className="text-xs text-amber-800 font-medium leading-relaxed">
            {competition.timeline}
          </p>
        </div>

        <a
          href={competition.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center text-sm"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
