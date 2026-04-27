// src/app/admin/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [competitions, trainings, jobs] = await Promise.all([
    prisma.competition.count({ where: { isActive: true } }),
    prisma.training.count({ where: { isActive: true } }),
    prisma.jobExpo.count({ where: { isActive: true } }),
  ]);

  const stats = [
    { label: "Active Competitions", value: competitions, icon: "🏆", href: "/admin/competition", color: "bg-amber-50 border-amber-200 text-amber-700" },
    { label: "Active Trainings", value: trainings, icon: "📚", href: "/admin/training", color: "bg-purple-50 border-purple-200 text-purple-700" },
    { label: "Active Job Listings", value: jobs, icon: "💼", href: "/admin/job-expo", color: "bg-blue-50 border-blue-200 text-blue-700" },
  ];

  const quickLinks = [
    { label: "Add Competition", href: "/admin/competition", icon: "➕" },
    { label: "Add Training", href: "/admin/training", icon: "➕" },
    { label: "Add Job Listing", href: "/admin/job-expo", icon: "➕" },
    { label: "View Website", href: "/", icon: "🌐", external: true },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-navy)" }}>
            Dashboard
          </h1>
          <p className="text-neutral-500 mt-1 text-sm">
            Welcome back! Here's an overview of your content.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className={`card p-6 border ${stat.color} hover:shadow-md transition-all`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-3xl font-display font-bold">{stat.value}</span>
              </div>
              <p className="text-sm font-semibold">{stat.label}</p>
              <p className="text-xs mt-1 opacity-70">Click to manage →</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
          <h2 className="font-display font-bold text-lg mb-4" style={{ color: "var(--color-navy)" }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-50 hover:bg-rose-50 hover:text-rose-700 transition-all text-center text-sm font-medium text-neutral-600 border border-transparent hover:border-rose-200"
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-sm text-blue-700">
          <strong>💡 Tip:</strong> Changes you make here will be reflected on the website immediately.
          Use the sidebar to navigate between sections.
        </div>
      </div>
    </div>
  );
}
