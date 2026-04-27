// src/app/(public)/wce/job-expo/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { JobExpo } from "@/types";

const LOCATIONS = ["All", "Jabodetabek", "Non-Jabodetabek", "Remote"];
const TYPES = ["All", "Full Time", "Part Time", "Internship"];

function formatDeadline(date: Date | string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function JobExpoPage() {
  const [jobs, setJobs] = useState<JobExpo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [employmentType, setEmploymentType] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (location !== "All") params.set("location", location);
    if (employmentType !== "All") params.set("employmentType", employmentType);

    const res = await fetch(`/api/job-expo?${params.toString()}`);
    const data = await res.json();
    if (data.success) setJobs(data.data);
    setLoading(false);
  }, [debouncedSearch, location, employmentType]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden py-24 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-5xl mb-4">💼</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: "var(--color-navy)" }}>
            Job Expo
          </h1>
          <p className="text-neutral-600 leading-relaxed mb-2">
            Curated career opportunities from our partner companies — exclusively for you.
          </p>
          <p className="text-xs text-blue-600 font-semibold">
            Powered by BossHire · July 26 – August 29, 2025
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-100 py-4 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search job title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
            />
          </div>

          {/* Location filter */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 bg-white text-neutral-700"
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l === "All" ? "All Locations" : l}</option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 bg-white text-neutral-700"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Job Cards */}
      <section className="py-10 px-4 bg-neutral-50 min-h-[60vh]">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center py-20 gap-3">
              <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
              <p className="text-neutral-400 text-sm">Loading opportunities...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-bold text-neutral-700 mb-2">No jobs found</h3>
              <p className="text-neutral-400 text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-neutral-400">{jobs.length} opportunity{jobs.length !== 1 ? "ies" : "y"} found</p>
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function JobCard({ job }: { job: JobExpo }) {
  const isExpired = new Date(job.deadline) < new Date();

  return (
    <div className="card p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Logo */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-blue-50 flex-shrink-0 border border-neutral-100">
          {job.companyLogoUrl ? (
            <Image src={job.companyLogoUrl} alt={job.companyName} fill className="object-contain p-1" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-blue-400">
              {job.companyName[0]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-bold text-lg" style={{ color: "var(--color-navy)" }}>
              {job.jobTitle}
            </h3>
            {isExpired && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-neutral-100 text-neutral-400 font-medium">
                Expired
              </span>
            )}
          </div>
          <p className="text-rose-600 font-semibold text-sm mb-1">{job.companyName}</p>
          <p className="text-xs text-neutral-400 mb-3">{job.industry}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-xs mb-4">
            {[
              { icon: "💰", label: "Salary", value: job.salary ?? "Not Disclosed" },
              { icon: "⏱️", label: "Type", value: job.employmentType },
              { icon: "🎓", label: "Qualification", value: job.qualification },
              { icon: "🏙️", label: "City", value: job.city },
              { icon: "📍", label: "Location", value: job.location },
              { icon: "⏳", label: "Deadline", value: formatDeadline(job.deadline) },
            ].map((m) => (
              <div key={m.label}>
                <span className="text-neutral-400">{m.icon} </span>
                <span className="font-semibold text-neutral-600">{m.label}:</span>{" "}
                <span className="text-neutral-500">{m.value}</span>
              </div>
            ))}
          </div>

          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-primary text-xs px-6 py-2 ${isExpired ? "opacity-50 pointer-events-none" : ""}`}
          >
            {isExpired ? "Closed" : "Apply Now"}
          </a>
        </div>
      </div>
    </div>
  );
}
