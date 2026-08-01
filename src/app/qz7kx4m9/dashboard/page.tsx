// src/app/qz7kx4m9/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [competitions, trainings, jobs, mediaPartners, companyPartners] = await Promise.all([
    prisma.competition.count({ where: { isActive: true } }),
    prisma.training.count({ where: { isActive: true } }),
    prisma.jobExpo.count({ where: { isActive: true } }),
    prisma.mediaPartner.count({ where: { isActive: true } }),
    prisma.companyPartner.count({ where: { isActive: true } }),
  ]);

  const stats = [
    { label: "Active Competitions", value: competitions, icon: "🏆", href: "/qz7kx4m9/competition", color: "bg-amber-50 border-amber-200 text-amber-700" },
    { label: "Active Trainings", value: trainings, icon: "📚", href: "/qz7kx4m9/training", color: "bg-purple-50 border-purple-200 text-purple-700" },
    { label: "Active Job Listings", value: jobs, icon: "💼", href: "/qz7kx4m9/job-expo", color: "bg-blue-50 border-blue-200 text-blue-700" },
    { label: "Media Partners", value: mediaPartners, icon: "📰", href: "/qz7kx4m9/partners", color: "bg-green-50 border-green-200 text-green-700" },
    { label: "Company Partners", value: companyPartners, icon: "🏢", href: "/qz7kx4m9/partners", color: "bg-rose-50 border-rose-200 text-rose-700" },
  ];

  const quickLinks = [
    { label: "Add Competition", href: "/qz7kx4m9/competition", icon: "➕" },
    { label: "Add Training", href: "/qz7kx4m9/training", icon: "➕" },
    { label: "Add Job Listing", href: "/qz7kx4m9/job-expo", icon: "➕" },
    { label: "Manage Partners", href: "/qz7kx4m9/partners", icon: "🤝" },
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
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
