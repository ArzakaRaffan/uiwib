// src/app/(public)/wce/training/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Training } from "@/types";

export const metadata = { title: "Training — WCE 2025 UIWIB" };
export const revalidate = 60;

async function getTrainings(): Promise<Training[]> {
  return prisma.training.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  }) as Promise<Training[]>;
}

export default async function TrainingPage() {
  const trainings = await getTrainings();

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden py-24 px-4 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: "var(--color-navy)" }}>
            Training
          </h1>
          <p className="text-neutral-600 leading-relaxed">
            Exclusive events that offer participants direct exposure to professional environments
            and industry knowledge through curated company partnerships.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {trainings.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="font-display text-xl font-bold text-neutral-700 mb-2">Coming Soon</h3>
              <p className="text-neutral-500 text-sm">Training schedules will be announced soon. Stay tuned!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {trainings.map((training) => (
                <TrainingCard key={training.id} training={training} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function TrainingCard({ training }: { training: Training }) {
  const isExternal = training.type === "External";

  return (
    <div className="card overflow-visible">
      <div className="p-6 md:p-8">
        {/* Type badge */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
              isExternal
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {training.type} Training
          </span>
        </div>

        <h3 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--color-navy)" }}>
          {training.title}
        </h3>

        {/* Meta info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="flex items-start gap-2 p-3 bg-neutral-50 rounded-xl">
            <span className="text-lg">📅</span>
            <div>
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Date</p>
              <p className="text-sm font-semibold text-neutral-800">{training.date}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-neutral-50 rounded-xl">
            <span className="text-lg">📍</span>
            <div>
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Place</p>
              <p className="text-sm font-semibold text-neutral-800">{training.place}</p>
            </div>
          </div>
        </div>

        <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
          {training.description}
        </p>
      </div>

      {/* Optional image */}
      {training.imageUrl && (
        <div className="relative h-56 w-full overflow-hidden rounded-b-2xl">
          <Image
            src={training.imageUrl}
            alt={training.title}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
