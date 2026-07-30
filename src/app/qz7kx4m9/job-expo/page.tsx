"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { JobExpo } from "@/types";

const TYPE_COLOR: Record<string, string> = {
  FULL_TIME:  "bg-blue-100 text-blue-700",
  INTERNSHIP: "bg-purple-100 text-purple-700",
  CONTRACT:   "bg-orange-100 text-orange-700",
  PART_TIME:  "bg-green-100 text-green-700",
};
const TYPE_LABEL: Record<string, string> = {
  FULL_TIME:  "Full Time",
  INTERNSHIP: "Internship",
  CONTRACT:   "Contract",
  PART_TIME:  "Part Time",
};

type ImportResult = { added: number; updated: number; skipped: number; expired: number; total: number; source: string };

function ImportResultBanner({ result }: { result: ImportResult }) {
  return (
    <div className="flex flex-wrap items-center gap-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm">
      <span className="text-green-600 font-semibold">✓ Import complete</span>
      <span className="text-neutral-600">Added: <strong className="text-green-700">{result.added}</strong></span>
      <span className="text-neutral-600">Updated: <strong className="text-blue-700">{result.updated}</strong></span>
      <span className="text-neutral-600">Skipped: <strong className="text-neutral-500">{result.skipped}</strong></span>
      {result.expired > 0 && (
        <span className="text-neutral-600">Expired: <strong className="text-orange-600">{result.expired}</strong></span>
      )}
      <span className="text-neutral-400 text-xs">of {result.total} rows</span>
    </div>
  );
}

export default function AdminJobExpoPage() {
  const [jobs, setJobs]                   = useState<JobExpo[]>([]);
  const [search, setSearch]               = useState("");
  const [csvUrl, setCsvUrl]               = useState("");
  const [csvUrl2, setCsvUrl2]             = useState("");
  const [importing, setImporting]         = useState<"tab1" | "tab2" | null>(null);
  const [importResult, setImportResult]   = useState<ImportResult | null>(null);
  const [importError, setImportError]     = useState("");
  const [deleteId, setDeleteId]           = useState<string | null>(null);
  const [viewJob, setViewJob]             = useState<JobExpo | null>(null);

  async function fetchJobs() {
    const res  = await fetch("/api/job-expo");
    const data = await res.json();
    if (data.success) setJobs(data.data);
  }

  useEffect(() => { fetchJobs(); }, []);

  async function handleImport(source: "tab1" | "tab2") {
    setImporting(source);
    setImportResult(null);
    setImportError("");
    const url = source === "tab2" ? csvUrl2 : csvUrl;
    try {
      const res  = await fetch("/api/job-expo/import", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ csvUrl: url.trim() || undefined, source }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setImportResult(data);
      fetchJobs();
    } catch (e: unknown) {
      setImportError(e instanceof Error ? e.message : "Import failed");
    } finally {
      setImporting(null);
    }
  }

  async function handleDelete(id: string) {
    const res  = await fetch(`/api/job-expo/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) { setDeleteId(null); fetchJobs(); }
    else alert(data.error ?? "Delete failed");
  }

  const filtered = jobs.filter((j) =>
    !search ||
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total:      jobs.length,
    fullTime:   jobs.filter((j) => j.employmentType === "FULL_TIME").length,
    internship: jobs.filter((j) => j.employmentType === "INTERNSHIP").length,
    contract:   jobs.filter((j) => j.employmentType === "CONTRACT").length,
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-navy)" }}>
            💼 Job Expo
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Manage job listings imported from Glints</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Jobs",  value: stats.total,      color: "text-neutral-800" },
            { label: "Full Time",   value: stats.fullTime,   color: "text-blue-600"    },
            { label: "Internship",  value: stats.internship, color: "text-purple-600"  },
            { label: "Contract",    value: stats.contract,   color: "text-orange-600"  },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-neutral-100 p-4">
              <p className="text-xs text-neutral-500 font-medium">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Import Section — Tab 1 */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-base" style={{ color: "var(--color-navy)" }}>
              Import Tab 1 — Format Lama
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Kolom: job_link, title, employment_type, min_years_of_experience, Broad Expertise, Specific Expertise, …
              Kosongkan untuk pakai <code className="bg-neutral-100 px-1 rounded">GOOGLE_SHEETS_CSV_URL</code>.
            </p>
          </div>
          <div className="flex gap-3">
            <input
              type="url"
              value={csvUrl}
              onChange={(e) => setCsvUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv&gid=0"
              className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
            <button
              onClick={() => handleImport("tab1")}
              disabled={importing !== null}
              className="btn-primary px-6 disabled:opacity-60 whitespace-nowrap"
            >
              {importing === "tab1" ? "Importing…" : "⬇ Import Tab 1"}
            </button>
          </div>
          {importResult?.source === "tab1" && (
            <ImportResultBanner result={importResult} />
          )}
          {importError && importing === null && importResult?.source === "tab1" && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">✕ {importError}</div>
          )}
        </div>

        {/* Import Section — Tab 2 */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-base" style={{ color: "var(--color-navy)" }}>
              Import Tab 2 — Format Baru
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Kolom: job_link, title, status, employment_type, salary_range_idr, L1_category, L2_category, location_group, …
              Kosongkan untuk pakai <code className="bg-neutral-100 px-1 rounded">GOOGLE_SHEETS_CSV_URL_2</code>.
            </p>
          </div>
          <div className="flex gap-3">
            <input
              type="url"
              value={csvUrl2}
              onChange={(e) => setCsvUrl2(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv&gid=…"
              className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            <button
              onClick={() => handleImport("tab2")}
              disabled={importing !== null}
              className="px-6 disabled:opacity-60 whitespace-nowrap rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              {importing === "tab2" ? "Importing…" : "⬇ Import Tab 2"}
            </button>
          </div>
          {importResult?.source === "tab2" && (
            <ImportResultBanner result={importResult} />
          )}
          {importError && importing === null && importResult?.source === "tab2" && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">✕ {importError}</div>
          )}
        </div>

        {/* Shared error fallback (before any result) */}
        {importError && importResult === null && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">✕ {importError}</div>
        )}

        {/* Job List */}
        <div className="bg-white rounded-2xl border border-neutral-100">
          <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or company…"
              className="flex-1 px-4 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
            <span className="text-xs text-neutral-400 whitespace-nowrap">{filtered.length} of {jobs.length}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-4xl mb-3">💼</p>
              <p className="text-neutral-500 text-sm">
                {jobs.length === 0
                  ? "No jobs yet. Import from Google Sheets to get started."
                  : "No jobs match your search."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-50">
              {filtered.map((job) => (
                <div key={job.id} className="flex items-center gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-full border border-neutral-100 bg-neutral-50 flex-shrink-0 overflow-hidden relative">
                    {job.companyLogoUrl ? (
                      <Image src={job.companyLogoUrl} alt={job.companyName} fill className="object-cover" unoptimized />
                    ) : (
                      <span className="flex items-center justify-center h-full text-xs text-neutral-400 font-bold">
                        {job.companyName.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "var(--color-navy)" }}>{job.title}</p>
                    <p className="text-xs text-neutral-500 truncate">
                      {job.companyName} · {job.city}{job.province ? `, ${job.province}` : ""}
                    </p>
                    {(job.broadExpertise || job.specificExpertise) && (
                      <p className="text-xs text-neutral-400 truncate mt-0.5">
                        {job.broadExpertise}{job.specificExpertise ? ` → ${job.specificExpertise}` : ""}
                      </p>
                    )}
                  </div>

                  {/* Type badge */}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${TYPE_COLOR[job.employmentType] ?? "bg-neutral-100 text-neutral-600"}`}>
                    {TYPE_LABEL[job.employmentType] ?? job.employmentType}
                  </span>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setViewJob(job)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                    >
                      Detail
                    </button>
                    <a
                      href={job.jobLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      Glints ↗
                    </a>
                    <button
                      onClick={() => setDeleteId(job.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {viewJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-100 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-neutral-100 bg-neutral-50 flex-shrink-0 overflow-hidden relative">
                  {viewJob.companyLogoUrl
                    ? <Image src={viewJob.companyLogoUrl} alt={viewJob.companyName} fill className="object-cover" unoptimized />
                    : <span className="flex items-center justify-center h-full text-xs font-bold text-neutral-400">{viewJob.companyName.slice(0,2).toUpperCase()}</span>
                  }
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg leading-tight" style={{ color: "var(--color-navy)" }}>{viewJob.title}</h2>
                  <p className="text-sm text-neutral-500">{viewJob.companyName} · {viewJob.city}{viewJob.province ? `, ${viewJob.province}` : ""}</p>
                </div>
              </div>
              <button onClick={() => setViewJob(null)} className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 flex-shrink-0">✕</button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${TYPE_COLOR[viewJob.employmentType] ?? "bg-neutral-100 text-neutral-600"}`}>
                  {TYPE_LABEL[viewJob.employmentType] ?? viewJob.employmentType}
                </span>
                {viewJob.educationLevel && <span className="px-2.5 py-1 rounded-full text-xs bg-neutral-100 text-neutral-600">{viewJob.educationLevel}</span>}
                {viewJob.minYearsOfExperience != null && <span className="px-2.5 py-1 rounded-full text-xs bg-neutral-100 text-neutral-600">{viewJob.minYearsOfExperience === 0 ? "Fresh Graduate" : `${viewJob.minYearsOfExperience}+ yrs exp`}</span>}
                {viewJob.broadExpertise && <span className="px-2.5 py-1 rounded-full text-xs bg-rose-50 text-rose-600">{viewJob.broadExpertise}</span>}
                {viewJob.specificExpertise && <span className="px-2.5 py-1 rounded-full text-xs bg-rose-50 text-rose-500">{viewJob.specificExpertise}</span>}
              </div>

              {/* Skills */}
              {viewJob.skills && (
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {viewJob.skills.split(",").map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-600">{s.trim()}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {viewJob.jobDescriptionFull && (
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5">Description</p>
                  <p className="text-neutral-600 leading-relaxed whitespace-pre-line text-xs">{viewJob.jobDescriptionFull}</p>
                </div>
              )}

              {/* Address */}
              {viewJob.companyAddress && (
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1">Address</p>
                  <p className="text-neutral-500 text-xs">{viewJob.companyAddress}</p>
                </div>
              )}

              <a
                href={viewJob.jobLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block btn-primary text-xs px-5 py-2"
              >
                View on Glints ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="text-4xl mb-4">🗑️</div>
            <h3 className="font-display font-bold text-lg mb-2" style={{ color: "var(--color-navy)" }}>Delete this job?</h3>
            <p className="text-neutral-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
