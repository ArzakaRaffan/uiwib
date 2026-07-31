"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { JobExpo } from "@/types";

const TYPE_BADGE: Record<string, { label: string; bg: string }> = {
  FULL_TIME:      { label: "Full Time",  bg: "#F97316" },
  INTERNSHIP:     { label: "Internship", bg: "#EC4899" },
  CONTRACT:       { label: "Contract",   bg: "#8B5CF6" },
  PART_TIME:      { label: "Part Time",  bg: "#F97316" },
  PROJECT_BASED:  { label: "Project",    bg: "#0EA5E9" },
};

export interface Filters {
  location: "all" | "jabodetabek" | "non-jabodetabek";
  positions: string[];
  companies: string[];
  employmentTypes: string[];
}

export const DEFAULT_FILTERS: Filters = {
  location: "all",
  positions: [],
  companies: [],
  employmentTypes: [],
};

function formatEmploymentType(raw: string): string {
  return TYPE_BADGE[raw]?.label ?? raw;
}

function isJabodetabek(city: string, province: string | null): boolean {
  const text = `${city} ${province ?? ""}`.toLowerCase();
  return ["jakarta", "bogor", "depok", "tangerang", "bekasi"].some((k) => text.includes(k));
}

function parseSkills(raw: string | null): string[] {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function JobCard({
  job,
  selected,
  onClick,
}: Readonly<{
  job: JobExpo;
  selected: boolean;
  onClick: () => void;
}>) {
  const badge = TYPE_BADGE[job.employmentType] ?? { label: job.employmentType, bg: "#6B7280" };
  const bgFill = selected ? "#CFE5FC" : "#87C9FF";

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: bgFill,
        border: "2px solid #3D89FA",
        borderRadius: "2cqw",
        padding: "1.2cqw",
        display: "flex",
        flexDirection: "column",
        gap: "0.5cqw",
        cursor: "pointer",
        textAlign: "left",
        width: "87%",
      }}
    >
      <span
        style={{
          display: "inline-block",
          background: badge.bg,
          color: "#fff",
          fontFamily: "TTCommons, sans-serif",
          fontSize: "1.2cqw",
          fontWeight: 600,
          padding: "0.25cqw 1cqw",
          borderRadius: "2cqw",
          alignSelf: "flex-start",
        }}
      >
        {badge.label}
      </span>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.8cqw" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.15cqw" }}>
          <p style={{ fontFamily: "TimesNewRoman, serif", fontWeight: 700, fontSize: "1.8cqw", color: "#2555B7", margin: 0, lineHeight: 1.2 }}>
            {job.title}
          </p>
          <p style={{ fontFamily: "TimesNewRoman, serif", fontSize: "1.5cqw", color: "#3D89FA", margin: 0, textDecoration: "underline", lineHeight: 1.2 }}>
            {job.companyName}
          </p>
        </div>
        {job.companyLogoUrl && (
          <div style={{ background: "white", borderRadius: "0.5cqw", border: "1.25px solid #3D89FA", padding: "0.4cqw 0.8cqw", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: "9.5cqw", height: "4cqw" }}>
            <Image src={job.companyLogoUrl} alt={job.companyName} width={80} height={40} style={{ width: "100%", height: "100%", objectFit: "contain" }} unoptimized />
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4cqw" }}>
        <p style={{ fontFamily: "TimesNewRoman, serif", fontSize: "1.05cqw", color: "#3D89FA", margin: 0, textDecoration: "underline" }}>
          {job.city}{job.province ? `, ${job.province}` : ""}
        </p>
        {job.jobDescriptionSummary && (
          <p style={{ fontFamily: "TimesNewRoman, serif", fontSize: "1.05cqw", color: "#3D89FA", margin: 0, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {job.jobDescriptionSummary}
          </p>
        )}
        {job.broadExpertise && (
          <p style={{ fontFamily: "TimesNewRoman, serif", fontSize: "1.05cqw", margin: 0 }}>
            <strong style={{ color: "#2555B7", fontWeight: 700 }}>Major: </strong>
            <span style={{ color: "#3D89FA" }}>{job.broadExpertise}</span>
          </p>
        )}
      </div>
    </button>
  );
}

function FilterChip({ label, onRemove }: Readonly<{ label: string; onRemove: () => void }>) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.3cqw", background: "#CFE5FC", border: "1px solid #3D89FA", borderRadius: "2cqw", padding: "0.15cqw 0.4cqw 0.15cqw 0.7cqw", fontFamily: "TTCommons, sans-serif", fontSize: "0.85cqw", color: "#2555B7", fontWeight: 500 }}>
      {label}
      <button type="button" onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0.1cqw", color: "#3D89FA", fontSize: "0.85cqw", lineHeight: 1, display: "flex", alignItems: "center" }}>
        ✕
      </button>
    </div>
  );
}

function MobileFilterChip({ label, onRemove }: Readonly<{ label: string; onRemove: () => void }>) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "#CFE5FC", border: "1px solid #3D89FA", borderRadius: "20px", padding: "4px 8px 4px 12px", fontFamily: "TTCommons, sans-serif", fontSize: "12px", color: "#2555B7", fontWeight: 500 }}>
      {label}
      <button type="button" onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px", color: "#3D89FA", fontSize: "12px", lineHeight: 1, display: "flex", alignItems: "center" }}>
        ✕
      </button>
    </div>
  );
}

// ── Section-aware description parser ─────────────────────────────────────────

type SectionType = "responsibilities" | "qualifications" | "about" | "benefits" | "general";

interface ParsedSection {
  type: SectionType;
  lines: string[];
}

const SECTION_PILLS: Record<Exclude<SectionType, "general">, { text: string; bg: string }> = {
  responsibilities: { text: "Deskripsi Pekerjaan", bg: "#3D89FA" },
  qualifications:   { text: "Kualifikasi",          bg: "#CF388E" },
  about:            { text: "Tentang Perusahaan",   bg: "#8B5CF6" },
  benefits:         { text: "Yang Kamu Dapatkan",   bg: "#10B981" },
};

function detectSectionType(header: string): SectionType | null {
  const h = header.toLowerCase().replace(/[:\-_;.]/g, " ").trim();
  if (/deskripsi|job desc|tanggung jawab|responsibilit|what you.ll|what you will|what you.re doing|your role|scope of work|tugas utama|jobdesk|yang akan anda|duties|anda akan|aktivitas|day.to.day|your day|you.ll be doing|you will be doing|key responsibilit|main responsibilit/.test(h)) return "responsibilities";
  if (/kualifikasi|qualificat|requirement|persyaratan|syarat|what we need|kriteria|kandidat|who you are|kompetensi|yang kami cari|yang kami butuhkan|we are looking|we need|you.re the one|the one if|if you have|what you bring|what you.ll bring|who we.re looking/.test(h)) return "qualifications";
  if (/about us|about the company|tentang kami|tentang perusahaan|company profile|company overview|siapa kami|perusahaan kami|who we are|mengenai perusahaan/.test(h)) return "about";
  if (/benefit|keuntungan|kompensasi|fasilitas|what you.ll get|what you get|what we offer|yang akan kamu dapatkan|yang kamu dapatkan|yang kamu dapat|kamu akan mendapatkan|kami menawarkan|apa yang kamu dapatkan|tunjangan|perks/.test(h)) return "benefits";
  return null;
}

const EDUCATION_LABEL: Record<string, string> = {
  DOCTORAL:        "Doktor (S3)",
  MASTER_DEGREE:   "Magister (S2)",
  BACHELOR_DEGREE: "Sarjana (S1)",
  DIPLOMA:         "Diploma (D3/D4)",
  HIGH_SCHOOL:     "SMA/SMK",
  S3: "Doktor (S3)",
  S2: "Magister (S2)",
  S1: "Sarjana (S1)",
  D4: "Diploma (D4)",
  D3: "Diploma (D3)",
  SMA: "SMA/SMK",
  SMK: "SMA/SMK",
};

function formatEducation(raw: string | null): string {
  if (!raw) return "—";
  return EDUCATION_LABEL[raw.trim().toUpperCase()] ?? raw;
}

function cleanLine(raw: string): string {
  return raw
    .trim()
    .replace(/<[^>]*>/g, "")       // strip any HTML tag
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .trim();
}

function isHashtagLine(line: string): boolean {
  const words = line.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;
  const hashCount = words.filter((w) => w.startsWith("#")).length;
  return hashCount >= 3 && hashCount / words.length > 0.5;
}

function parseJobSections(text: string): ParsedSection[] {
  const result: ParsedSection[] = [];
  let current: ParsedSection | null = null;

  for (const raw of text.split("\n")) {
    const line = cleanLine(raw);
    if (!line) continue;
    if (isHashtagLine(line)) continue;

    // A line is a candidate section header only if it carries an explicit label signal:
    // ends with ":" or ";" (like "Tanggung Jawab:"), is ALL_CAPS (like "JOB DESCRIPTION"),
    // or is an isolated short label (1-3 words, letters only — like "Requirements", "Job Description").
    const endsWithLabel = line.endsWith(":") || line.endsWith(";");
    const isAllCaps = line.length >= 3 && line === line.toUpperCase() && /[A-Za-z]/.test(line);
    const isIsolatedLabel =
      /^[A-Za-z\s]+$/.test(line) &&
      line.trim().split(/\s+/).length <= 3 &&
      line.length <= 40;
    const couldBeHeader =
      !line.startsWith("-") &&
      !line.startsWith("*") &&
      !/^\d+[.)]\s/.test(line) &&
      line.length <= 80 &&
      (endsWithLabel || isAllCaps || isIsolatedLabel);

    if (couldBeHeader) {
      const type = detectSectionType(line);
      if (type) {
        const existing = result.find((s) => s.type === type);
        if (existing) {
          current = existing;
        } else {
          current = { type, lines: [] };
          result.push(current);
        }
        continue;
      }
    }

    if (!current) {
      current = { type: "general", lines: [] };
      result.push(current);
    }
    current.lines.push(line);
  }

  return result.filter((s) => s.lines.length > 0);
}

function isImplicitListItem(line: string): boolean {
  // Short line, not a full sentence (no trailing . ! ?), not a sub-header (: ;), not a numbered item
  return (
    line.length <= 120 &&
    !/[.!?]$/.test(line) &&
    !line.endsWith(":") &&
    !line.endsWith(";") &&
    !/^\d+[.)]\s/.test(line)
  );
}

function renderSectionLines(lines: string[]) {
  // Decide if this section is list-like: ≥3 lines and >60% of plain lines qualify as implicit list items.
  // This lets us bullet short items that were entered without any "- " or "* " prefix.
  const plainLines = lines.filter(
    (l) => !l.startsWith("- ") && !l.startsWith("* ") && l !== "-" && l !== "*"
  );
  const qualifiedCount = plainLines.filter(isImplicitListItem).length;
  const isListSection = lines.length >= 3 && plainLines.length > 0 && qualifiedCount / plainLines.length > 0.6;

  return lines.map((line, i) => {
    // Sub-header (e.g. "Pendidikan:" or "Skills needed;") — bold, no bullet.
    // Must NOT start with - or * (those are bullet lines whose text happens to end with : or ;).
    if (!line.startsWith("-") && !line.startsWith("*") && (line.endsWith(":") || line.endsWith(";"))) {
      return (
        <p key={i} style={{ fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "1.2cqw", color: "#2555B7", margin: "0.6cqw 0 0.2cqw" }}>
          {line}
        </p>
      );
    }
    // Already numbered (e.g. "1.", "2)", "10.") — render as-is, no bullet
    if (/^\d+[.)]\s/.test(line)) {
      return (
        <p key={i} style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", color: "#2555B7", margin: 0, lineHeight: 1.6 }}>
          {line}
        </p>
      );
    }
    // Explicit bullet — raw data starts with "- " or "* "
    if (line.startsWith("- ") || line.startsWith("* ") || line === "-" || line === "*") {
      const text = line.startsWith("- ") || line.startsWith("* ") ? line.slice(2) : "";
      return (
        <div key={i} style={{ display: "flex", gap: "0.4cqw", alignItems: "flex-start" }}>
          <span style={{ color: "#2555B7", flexShrink: 0, fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", lineHeight: 1.6 }}>•</span>
          <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", color: "#2555B7", margin: 0, lineHeight: 1.6 }}>{text}</p>
        </div>
      );
    }
    // Implicit bullet — section looks like a list and this line qualifies
    if (isListSection && isImplicitListItem(line)) {
      return (
        <div key={i} style={{ display: "flex", gap: "0.4cqw", alignItems: "flex-start" }}>
          <span style={{ color: "#2555B7", flexShrink: 0, fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", lineHeight: 1.6 }}>•</span>
          <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", color: "#2555B7", margin: 0, lineHeight: 1.6 }}>{line}</p>
        </div>
      );
    }
    // Plain text, no bullet
    return (
      <p key={i} style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", color: "#2555B7", margin: 0, lineHeight: 1.6 }}>
        {line}
      </p>
    );
  });
}

const filterRowStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: "0.5cqw", cursor: "pointer", padding: "0.25cqw 0.4cqw", borderRadius: "0.4cqw", userSelect: "none" };
const filterLabelStyle: React.CSSProperties = { fontFamily: "TTCommons, sans-serif", fontSize: "0.95cqw", color: "#2555B7", lineHeight: 1.3 };

function filterToggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

function radioIndicator(selected: boolean): React.CSSProperties {
  return { width: "0.95cqw", height: "0.95cqw", borderRadius: "50%", border: `1.5px solid ${selected ? "#CF388E" : "#3D89FA"}`, background: selected ? "#CF388E" : "white", flexShrink: 0 };
}

function checkIndicator(checked: boolean): React.CSSProperties {
  return { width: "0.95cqw", height: "0.95cqw", borderRadius: "0.2cqw", border: `1.5px solid ${checked ? "#CF388E" : "#3D89FA"}`, background: checked ? "#CF388E" : "white", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" };
}

function renderMobileSectionLines(lines: string[]) {
  const plainLines = lines.filter((l) => !l.startsWith("- ") && !l.startsWith("* ") && l !== "-" && l !== "*");
  const qualifiedCount = plainLines.filter(isImplicitListItem).length;
  const isListSection = lines.length >= 3 && plainLines.length > 0 && qualifiedCount / plainLines.length > 0.6;

  return lines.map((line, i) => {
    if (!line.startsWith("-") && !line.startsWith("*") && (line.endsWith(":") || line.endsWith(";"))) {
      return <p key={i} style={{ fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "14px", color: "#2555B7", margin: "10px 0 2px" }}>{line}</p>;
    }
    if (/^\d+[.)]\s/.test(line)) {
      return <p key={i} style={{ fontFamily: "TTCommons, sans-serif", fontSize: "13px", color: "#2555B7", margin: 0, lineHeight: 1.6 }}>{line}</p>;
    }
    const isBullet = line.startsWith("- ") || line.startsWith("* ") || line === "-" || line === "*" || (isListSection && isImplicitListItem(line));
    if (isBullet) {
      const text = line.startsWith("- ") || line.startsWith("* ") ? line.slice(2) : line;
      return (
        <div key={i} style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
          <span style={{ color: "#2555B7", flexShrink: 0, fontSize: "13px", lineHeight: 1.6 }}>•</span>
          <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "13px", color: "#2555B7", margin: 0, lineHeight: 1.6 }}>{text}</p>
        </div>
      );
    }
    return <p key={i} style={{ fontFamily: "TTCommons, sans-serif", fontSize: "13px", color: "#2555B7", margin: 0, lineHeight: 1.6 }}>{line}</p>;
  });
}

function MobileFilterSheet({
  jobs,
  filters,
  onChange,
  onClose,
}: Readonly<{ jobs: JobExpo[]; filters: Filters; onChange: (f: Filters) => void; onClose: () => void }>) {
  const allPositions = [...new Set(jobs.map((j) => j.title))].sort();
  const allCompanies = [...new Set(jobs.map((j) => j.companyName))].sort();
  const [posQuery, setPosQuery] = useState("");
  const [coQuery, setCoQuery] = useState("");
  const hasAny = filters.location !== "all" || filters.positions.length > 0 || filters.companies.length > 0 || filters.employmentTypes.length > 0;

  const rowS: React.CSSProperties = { display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderRadius: "8px", cursor: "pointer", userSelect: "none" };
  const labelS: React.CSSProperties = { fontFamily: "TTCommons, sans-serif", fontSize: "14px", color: "#2555B7" };
  const checkS = (checked: boolean): React.CSSProperties => ({
    width: "18px", height: "18px", borderRadius: "4px", border: `2px solid ${checked ? "#CF388E" : "#3D89FA"}`,
    background: checked ? "#CF388E" : "white", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
  });
  const radioS = (sel: boolean): React.CSSProperties => ({
    width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${sel ? "#CF388E" : "#3D89FA"}`,
    background: sel ? "#CF388E" : "white", flexShrink: 0,
  });
  const inputS: React.CSSProperties = {
    width: "100%", boxSizing: "border-box", padding: "8px 12px 8px 34px",
    fontFamily: "TTCommons, sans-serif", fontSize: "14px", color: "#2555B7",
    border: "1px solid #FFD1D9", borderRadius: "8px", background: "#FFFAFC", outline: "none",
  };
  const sectionTitleS: React.CSSProperties = { fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "14px", color: "#2555B7", margin: 0 };
  const divider = <div style={{ height: "1px", background: "#FFD1D9", margin: "4px 0" }} />;

  function SearchInput({ value, onChange: onCh, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
    return (
      <div style={{ position: "relative" }}>
        <svg style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder={placeholder} value={value} onChange={(e) => onCh(e.target.value)} style={inputS} />
      </div>
    );
  }

  function MultiList({ options, selected, query, onToggle }: { options: string[]; selected: string[]; query: string; onToggle: (v: string) => void }) {
    const q = query.toLowerCase().trim();
    const selectedItems = options.filter((o) => selected.includes(o));
    const unselected = options.filter((o) => !selected.includes(o) && (!q || o.toLowerCase().includes(q)));
    return (
      <>
        {selectedItems.map((val) => (
          <div key={val} style={{ ...rowS, background: "#FFF0F6" }} onClick={() => onToggle(val)}>
            <div style={checkS(true)}><span style={{ color: "white", fontSize: "10px" }}>✓</span></div>
            <span style={{ ...labelS, fontWeight: 600, flex: 1 }}>{val}</span>
          </div>
        ))}
        {selectedItems.length > 0 && unselected.length > 0 && <div style={{ height: "1px", background: "#FFD1D9", margin: "2px 10px" }} />}
        <div style={{ maxHeight: "140px", overflowY: "auto" }}>
          {unselected.map((val) => (
            <div key={val} style={rowS} onClick={() => onToggle(val)}>
              <div style={checkS(false)} />
              <span style={labelS}>{val}</span>
            </div>
          ))}
          {unselected.length === 0 && q && <p style={{ ...labelS, color: "#9CA3AF", padding: "8px 10px", margin: 0 }}>Tidak ditemukan</p>}
        </div>
      </>
    );
  }

  return (
    <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1.5px solid #FFD1D9", background: "#FFEFF8", flexShrink: 0 }}>
        <p style={{ fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "16px", color: "#2555B7", margin: 0 }}>Filter Jobs</p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {hasAny && <button type="button" onClick={() => onChange(DEFAULT_FILTERS)} style={{ background: "none", border: "none", fontFamily: "TTCommons, sans-serif", fontSize: "13px", color: "#CF388E", textDecoration: "underline", cursor: "pointer", padding: 0 }}>Clear all</button>}
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: "#2555B7", fontSize: "18px", cursor: "pointer", lineHeight: 1, padding: "2px 6px" }}>✕</button>
        </div>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto" }}>
        {/* Location */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <p style={sectionTitleS}>Location</p>
          {(["all", "jabodetabek", "non-jabodetabek"] as const).map((v) => (
            <div key={v} style={{ ...rowS, background: filters.location === v ? "#FFF0F6" : "transparent" }} onClick={() => onChange({ ...filters, location: v })}>
              <div style={radioS(filters.location === v)} />
              <span style={{ ...labelS, fontWeight: filters.location === v ? 600 : 400 }}>
                {v === "all" ? "Semua" : v === "jabodetabek" ? "Jabodetabek" : "Non-Jabodetabek"}
              </span>
            </div>
          ))}
        </div>
        {divider}

        {/* Employment Type */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <p style={sectionTitleS}>Employment Type</p>
          {(["FULL_TIME", "INTERNSHIP", "PART_TIME", "CONTRACT", "PROJECT_BASED"] as const).map((type) => (
            <div key={type} style={{ ...rowS, background: filters.employmentTypes.includes(type) ? "#FFF0F6" : "transparent" }} onClick={() => onChange({ ...filters, employmentTypes: filterToggle(filters.employmentTypes, type) })}>
              <div style={checkS(filters.employmentTypes.includes(type))}>
                {filters.employmentTypes.includes(type) && <span style={{ color: "white", fontSize: "10px" }}>✓</span>}
              </div>
              <span style={{ ...labelS, fontWeight: filters.employmentTypes.includes(type) ? 600 : 400 }}>
                {formatEmploymentType(type)}
              </span>
            </div>
          ))}
        </div>
        {divider}

        {/* Position */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={sectionTitleS}>Position {filters.positions.length > 0 && <span style={{ background: "#CF388E", color: "white", borderRadius: "50%", fontSize: "11px", padding: "1px 5px", marginLeft: "4px" }}>{filters.positions.length}</span>}</p>
          <SearchInput value={posQuery} onChange={setPosQuery} placeholder="Cari posisi..." />
          <MultiList options={allPositions} selected={filters.positions} query={posQuery} onToggle={(val) => onChange({ ...filters, positions: filterToggle(filters.positions, val) })} />
        </div>
        {divider}

        {/* Company */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={sectionTitleS}>Company {filters.companies.length > 0 && <span style={{ background: "#CF388E", color: "white", borderRadius: "50%", fontSize: "11px", padding: "1px 5px", marginLeft: "4px" }}>{filters.companies.length}</span>}</p>
          <SearchInput value={coQuery} onChange={setCoQuery} placeholder="Cari perusahaan..." />
          <MultiList options={allCompanies} selected={filters.companies} query={coQuery} onToggle={(val) => onChange({ ...filters, companies: filterToggle(filters.companies, val) })} />
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, activeCount, children }: Readonly<{ title: string; activeCount: number; children: React.ReactNode }>) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4cqw" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5cqw" }}>
        <p style={{ fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "1cqw", color: "#2555B7", margin: 0 }}>{title}</p>
        {activeCount > 0 && (
          <span style={{ background: "#CF388E", color: "white", fontFamily: "TTCommons, sans-serif", fontSize: "0.7cqw", fontWeight: 700, borderRadius: "50%", minWidth: "1.1cqw", height: "1.1cqw", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 0.15cqw" }}>
            {activeCount}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function SearchableMultiSelect({
  title,
  placeholder,
  options,
  selected,
  onToggle,
}: Readonly<{
  title: string;
  placeholder: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
}>) {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();

  const selectedItems = options.filter((o) => selected.includes(o));
  const unselectedFiltered = options
    .filter((o) => !selected.includes(o))
    .filter((o) => !q || o.toLowerCase().includes(q));

  return (
    <FilterSection title={title} activeCount={selected.length}>
      {/* Search input */}
      <div style={{ position: "relative" }}>
        <svg style={{ position: "absolute", left: "0.5cqw", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="0.9cqw" height="0.9cqw" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", boxSizing: "border-box", padding: "0.35cqw 0.6cqw 0.35cqw 1.6cqw", fontFamily: "TTCommons, sans-serif", fontSize: "0.9cqw", color: "#2555B7", border: "1px solid #FFD1D9", borderRadius: "0.5cqw", background: "#FFFAFC", outline: "none" }}
        />
      </div>

      {/* Selected items — always visible at top */}
      {selectedItems.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {selectedItems.map((val) => (
            <div key={val} style={{ ...filterRowStyle, background: "#FFF0F6" }} onClick={() => onToggle(val)}>
              <div style={checkIndicator(true)}>
                <span style={{ color: "white", fontSize: "0.6cqw", lineHeight: 1 }}>✓</span>
              </div>
              <span style={{ ...filterLabelStyle, fontWeight: 600, flex: 1 }}>{val}</span>
            </div>
          ))}
          {unselectedFiltered.length > 0 && (
            <div style={{ height: "1px", background: "#FFD1D9", margin: "0.2cqw 0.4cqw" }} />
          )}
        </div>
      )}

      {/* Filtered unselected options — scrollable, max ~7 visible */}
      {unselectedFiltered.length > 0 ? (
        <div style={{ maxHeight: "9cqw", overflowY: "auto", display: "flex", flexDirection: "column" }} className="no-scrollbar">
          {unselectedFiltered.map((val) => (
            <div key={val} style={filterRowStyle} onClick={() => onToggle(val)}>
              <div style={checkIndicator(false)} />
              <span style={filterLabelStyle}>{val}</span>
            </div>
          ))}
        </div>
      ) : q ? (
        <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "0.85cqw", color: "#9CA3AF", padding: "0.3cqw 0.4cqw", margin: 0 }}>
          Tidak ditemukan
        </p>
      ) : null}
    </FilterSection>
  );
}

function FilterPanel({
  jobs,
  filters,
  onChange,
  onClose,
}: Readonly<{
  jobs: JobExpo[];
  filters: Filters;
  onChange: (f: Filters) => void;
  onClose: () => void;
}>) {
  const allPositions = [...new Set(jobs.map((j) => j.title))].sort();
  const allCompanies = [...new Set(jobs.map((j) => j.companyName))].sort();

  const divider = <div style={{ height: "1px", background: "#FFD1D9", margin: "0.2cqw 0" }} />;
  const hasAnyFilter = filters.location !== "all" || filters.positions.length > 0 || filters.companies.length > 0 || filters.employmentTypes.length > 0;

  return (
    <div style={{ background: "white", borderRadius: "1cqw", border: "1.5px solid #FFD1D9", boxShadow: "0 8px 40px rgba(37, 85, 183, 0.14)", display: "flex", flexDirection: "column", maxHeight: "44cqw", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1cqw 1.2cqw 0.8cqw", borderBottom: "1.5px solid #FFD1D9", background: "#FFEFF8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5cqw" }}>
          <svg width="1.2cqw" height="1.2cqw" viewBox="0 0 24 24" fill="none" stroke="#CF388E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          <p style={{ fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "1.1cqw", color: "#2555B7", margin: 0 }}>Filter Jobs</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8cqw" }}>
          {hasAnyFilter && (
            <button type="button" onClick={() => onChange(DEFAULT_FILTERS)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "TTCommons, sans-serif", fontSize: "0.85cqw", color: "#CF388E", textDecoration: "underline", padding: 0 }}>
              Clear all
            </button>
          )}
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#2555B7", fontSize: "1cqw", lineHeight: 1, padding: "0.2cqw" }}>✕</button>
        </div>
      </div>

      <div style={{ overflowY: "auto", padding: "1cqw 1.2cqw", display: "flex", flexDirection: "column", gap: "0.8cqw" }} className="no-scrollbar">
        {/* Location — fixed 3 options, no search needed */}
        <FilterSection title="Location" activeCount={filters.location !== "all" ? 1 : 0}>
          {(["all", "jabodetabek", "non-jabodetabek"] as const).map((v) => (
            <div key={v} style={{ ...filterRowStyle, background: filters.location === v ? "#FFF0F6" : "transparent" }} onClick={() => onChange({ ...filters, location: v })}>
              <div style={radioIndicator(filters.location === v)} />
              <span style={{ ...filterLabelStyle, fontWeight: filters.location === v ? 600 : 400 }}>
                {v === "all" ? "Semua" : v === "jabodetabek" ? "Jabodetabek" : "Non-Jabodetabek"}
              </span>
            </div>
          ))}
        </FilterSection>

        {divider}

        {/* Employment Type — fixed options, no search needed */}
        <FilterSection title="Employment Type" activeCount={filters.employmentTypes.length}>
          {(["FULL_TIME", "INTERNSHIP", "PART_TIME", "CONTRACT", "PROJECT_BASED"] as const).map((type) => (
            <div key={type} style={{ ...filterRowStyle, background: filters.employmentTypes.includes(type) ? "#FFF0F6" : "transparent" }} onClick={() => onChange({ ...filters, employmentTypes: filterToggle(filters.employmentTypes, type) })}>
              <div style={checkIndicator(filters.employmentTypes.includes(type))}>
                {filters.employmentTypes.includes(type) && <span style={{ color: "white", fontSize: "0.6cqw", lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{ ...filterLabelStyle, fontWeight: filters.employmentTypes.includes(type) ? 600 : 400 }}>
                {formatEmploymentType(type)}
              </span>
            </div>
          ))}
        </FilterSection>

        {divider}

        {/* Position — searchable */}
        <SearchableMultiSelect
          title="Position"
          placeholder="Cari posisi..."
          options={allPositions}
          selected={filters.positions}
          onToggle={(val) => onChange({ ...filters, positions: filterToggle(filters.positions, val) })}
        />

        {divider}

        {/* Company — searchable */}
        <SearchableMultiSelect
          title="Company"
          placeholder="Cari perusahaan..."
          options={allCompanies}
          selected={filters.companies}
          onToggle={(val) => onChange({ ...filters, companies: filterToggle(filters.companies, val) })}
        />
      </div>
    </div>
  );
}

interface JobListSectionProps {
  readonly jobs: JobExpo[];
  readonly loading?: boolean;
  readonly search?: string;
  readonly filterOpen?: boolean;
  readonly onFilterClose?: () => void;
  readonly filters?: Filters;
  readonly onFiltersChange?: (f: Filters) => void;
}

export default function JobListSection({
  jobs,
  loading = false,
  search = "",
  filterOpen = false,
  onFilterClose,
  filters = DEFAULT_FILTERS,
  onFiltersChange,
}: JobListSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (filterOpen) setSelectedId(null);
  }, [filterOpen]);

  const filtered = jobs.filter((j) => {
    if (search) {
      const q = search.toLowerCase();
      const skills = parseSkills(j.skills);
      const match =
        j.title.toLowerCase().includes(q) ||
        j.companyName.toLowerCase().includes(q) ||
        j.broadExpertise?.toLowerCase().includes(q) ||
        j.l1Category?.toLowerCase().includes(q) ||
        skills.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (filters.location === "jabodetabek" && !isJabodetabek(j.city, j.province)) return false;
    if (filters.location === "non-jabodetabek" && isJabodetabek(j.city, j.province)) return false;
    if (filters.positions.length > 0 && !filters.positions.includes(j.title)) return false;
    if (filters.companies.length > 0 && !filters.companies.includes(j.companyName)) return false;
    if (filters.employmentTypes.length > 0 && !filters.employmentTypes.includes(j.employmentType)) return false;
    return true;
  });

  const hasActiveFilters =
    filters.location !== "all" ||
    filters.positions.length > 0 ||
    filters.companies.length > 0 ||
    filters.employmentTypes.length > 0;

  const selectedJob = jobs.find((j) => j.id === selectedId) ?? null;

  return (
    <>
      {/* DESKTOP */}
      <section
        className="hidden md:block relative w-full overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        <div className="absolute inset-0">
          <Image src="/images/wce/job-expo/bg_pink.webp" alt="" fill sizes="100vw" className="object-cover object-top" />
        </div>

        <div style={{ position: "relative", zIndex: 10, display: "flex", minHeight: "50cqw", paddingTop: "3cqw", paddingLeft: "2cqw", paddingRight: "2cqw" }}>

          {/* LEFT — job cards */}
          <div style={{ position: "relative", width: "45%", overflow: "hidden" }}>
            <div className="absolute inset-0 flex justify-center items-start">
              <Image src="/images/wce/job-expo/joblist_bg.webp" alt="" width={800} height={800} style={{ width: "87%", height: "auto" }} />
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div style={{ position: "relative", zIndex: 10, padding: "0.8cqw 3cqw 0", display: "flex", flexWrap: "wrap", gap: "0.4cqw", alignItems: "center" }}>
                {filters.location !== "all" && (
                  <FilterChip label={filters.location === "jabodetabek" ? "Jabodetabek" : "Non-Jabodetabek"} onRemove={() => onFiltersChange?.({ ...filters, location: "all" })} />
                )}
                {filters.positions.map((pos) => (
                  <FilterChip key={pos} label={pos} onRemove={() => onFiltersChange?.({ ...filters, positions: filters.positions.filter((x) => x !== pos) })} />
                ))}
                {filters.companies.map((co) => (
                  <FilterChip key={co} label={co} onRemove={() => onFiltersChange?.({ ...filters, companies: filters.companies.filter((x) => x !== co) })} />
                ))}
                {filters.employmentTypes.map((t) => (
                  <FilterChip key={t} label={formatEmploymentType(t)} onRemove={() => onFiltersChange?.({ ...filters, employmentTypes: filters.employmentTypes.filter((x) => x !== t) })} />
                ))}
                <button type="button" onClick={() => onFiltersChange?.(DEFAULT_FILTERS)} style={{ background: "none", border: "none", fontFamily: "TTCommons, sans-serif", fontSize: "0.8cqw", color: "#CF388E", cursor: "pointer", textDecoration: "underline", padding: "0.1cqw 0.2cqw" }}>
                  Clear all
                </button>
              </div>
            )}

            <div style={{ position: "relative", zIndex: 10, padding: "1cqw 3cqw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1cqw", maxHeight: "50cqw", overflowY: "auto" }} className="no-scrollbar">
              {loading ? (
                <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1cqw", color: "#3D89FA", textAlign: "center", marginTop: "3cqw" }}>
                  Loading jobs…
                </p>
              ) : filtered.length === 0 ? (
                <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1cqw", color: "#666", textAlign: "center", marginTop: "3cqw" }}>
                  No jobs found.
                </p>
              ) : (
                filtered.map((job) => (
                  <JobCard key={job.id} job={job} selected={selectedId === job.id} onClick={() => { setSelectedId(job.id); if (filterOpen) onFilterClose?.(); }} />
                ))
              )}
            </div>
          </div>

          {/* RIGHT — detail panel with floating filter overlay */}
          <div style={{ flex: 1, padding: "0 1.5cqw 2cqw", display: "flex", flexDirection: "column", position: "relative" }}>
            {/* Floating filter panel */}
            {filterOpen && (
              <>
                <div onClick={() => onFilterClose?.()} style={{ position: "absolute", inset: 0, zIndex: 10, cursor: "pointer" }} />
                <div style={{ position: "absolute", top: 0, left: "1.5cqw", right: "1.5cqw", zIndex: 20 }}>
                  <FilterPanel jobs={jobs} filters={filters} onChange={(f) => onFiltersChange?.(f)} onClose={() => onFilterClose?.()} />
                </div>
              </>
            )}

            {/* Detail panel */}
            {!selectedJob ? (
              <div style={{ background: "#FFEFF8", borderRadius: "1cqw", marginTop: "3cqw", display: "flex", alignItems: "center", justifyContent: "center", padding: "4cqw 2cqw" }}>
                <p style={{ fontFamily: "TimesNewRoman, serif", fontSize: "2cqw", color: "#EC4899", fontStyle: "italic", margin: 0 }}>
                  Please, select a job.
                </p>
              </div>
            ) : (() => {
              const job = selectedJob;
              const badge = TYPE_BADGE[job.employmentType] ?? { label: job.employmentType, bg: "#6B7280" };
              const skills = parseSkills(job.skills);
              return (
                <div style={{ background: "#FFEFF8", borderRadius: "1cqw", padding: "1.5cqw", display: "flex", flexDirection: "column", gap: "0.8cqw", maxHeight: "50cqw", overflowY: "auto" }} className="no-scrollbar">
                  {job.companyLogoUrl && (
                    <div style={{ background: "white", borderRadius: "0.6cqw", border: "1.25px solid #3D89FA", padding: "0.4cqw 0.8cqw", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "9.5cqw", height: "4cqw", alignSelf: "flex-start" }}>
                      <Image src={job.companyLogoUrl} alt={job.companyName} width={100} height={50} style={{ width: "100%", height: "100%", objectFit: "contain" }} unoptimized />
                    </div>
                  )}
                  <p style={{ fontFamily: "TimesNewRoman, serif", fontWeight: 700, fontSize: "2.5cqw", color: "#2555B7", margin: 0, lineHeight: 1.2 }}>{job.title}</p>
                  <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1.4cqw", color: "#3D89FA", margin: 0, textDecoration: "underline" }}>{job.companyName}</p>
                  {job.companyAddress && (
                    <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "0.95cqw", color: "#2555B7", margin: 0, opacity: 0.7 }}>{job.companyAddress}</p>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7cqw 1cqw", background: "#FFDBEE", border: "1.5px solid #FFD1D9", borderRadius: "0.8cqw", padding: "1cqw 1.2cqw" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4cqw" }}>
                      <Image src="/images/wce/job-expo/svg/location_on.png" alt="" width={16} height={16} style={{ width: "1.3cqw", height: "1.3cqw", objectFit: "contain", flexShrink: 0 }} unoptimized />
                      <span style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", color: "#2555B7" }}>{job.city}{job.province ? `, ${job.province}` : ""}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4cqw" }}>
                      <Image src="/images/wce/job-expo/svg/Clock.png" alt="" width={16} height={16} style={{ width: "1.3cqw", height: "1.3cqw", objectFit: "contain", flexShrink: 0 }} unoptimized />
                      <span style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", color: "#2555B7" }}>{badge.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4cqw" }}>
                      <Image src="/images/wce/job-expo/svg/person.png" alt="" width={16} height={16} style={{ width: "1.3cqw", height: "1.3cqw", objectFit: "contain", flexShrink: 0 }} unoptimized />
                      <span style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", color: "#2555B7" }}>{job.broadExpertise || job.l1Category || "Open For All"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4cqw" }}>
                      <Image src="/images/wce/job-expo/svg/degree.png" alt="" width={16} height={16} style={{ width: "1.3cqw", height: "1.3cqw", objectFit: "contain", flexShrink: 0 }} unoptimized />
                      <span style={{ fontFamily: "TTCommons, sans-serif", fontSize: "1.1cqw", color: "#2555B7", lineHeight: 1.4 }}>
                        {formatEducation(job.educationLevel)}
                        {(job.minYearsOfExperience ?? 0) > 0 ? ` · Min. ${job.minYearsOfExperience} thn` : " · Fresh Graduate"}
                      </span>
                    </div>
                  </div>
                  {skills.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4cqw" }}>
                      {skills.map((skill, i) => (
                        <span key={i} style={{ background: "#CFE5FC", border: "1px solid #3D89FA", borderRadius: "2cqw", padding: "0.2cqw 0.8cqw", fontFamily: "TTCommons, sans-serif", fontSize: "0.95cqw", color: "#2555B7", fontWeight: 500 }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <div>
                    <a href={job.jobLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#CF388E", border: "2px solid #DF56A4", borderRadius: "0.6cqw", padding: "0.5cqw 2cqw", color: "#FFDBEE", fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "1.2cqw", textDecoration: "none" }}>
                      Apply Now
                    </a>
                  </div>
                  {(() => {
                    const descText = job.jobDescriptionFull ?? job.jobDescriptionSummary ?? "";
                    if (!descText) return null;
                    const sections = parseJobSections(descText);
                    const hasTyped = sections.some((s) => s.type !== "general");
                    if (!hasTyped) {
                      // No sections detected — single plain card
                      return (
                        <>
                          <p style={{ fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "1.5cqw", color: "#2555B7", margin: 0 }}>Full Description</p>
                          <div style={{ background: "#FFEFF8", border: "1.5px solid #FFD1D9", borderRadius: "0.8cqw", padding: "1cqw 1.2cqw", display: "flex", flexDirection: "column" }}>
                            {renderSectionLines(sections.flatMap((s) => s.lines))}
                          </div>
                        </>
                      );
                    }
                    return sections.map((section, idx) => {
                      const pill = section.type !== "general" ? SECTION_PILLS[section.type] : null;
                      return (
                        <div
                          key={idx}
                          style={{ background: "#FFEFF8", border: "1.5px solid #FFD1D9", borderRadius: "0.8cqw", padding: "1cqw 1.2cqw", display: "flex", flexDirection: "column", gap: "0.3cqw" }}
                        >
                          {pill && (
                            <span style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", background: pill.bg, color: "white", fontFamily: "TTCommons, sans-serif", fontSize: "0.85cqw", fontWeight: 700, padding: "0.2cqw 0.8cqw", borderRadius: "2cqw", marginBottom: "0.5cqw" }}>
                              {pill.text}
                            </span>
                          )}
                          {renderSectionLines(section.lines)}
                        </div>
                      );
                    });
                  })()}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* MOBILE */}
      <section className="block md:hidden relative w-full" style={{ containerType: "inline-size", height: "100svh", overflow: "hidden" }}>
        <div className="absolute inset-0">
          <Image src="/images/wce/job-expo/bg_pink.webp" alt="" fill sizes="100vw" className="object-cover object-top" />
        </div>

        {!selectedJob && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "center", paddingTop: "16px", zIndex: 2, pointerEvents: "none" }}>
            <Image src="/images/wce/job-expo/joblist_bg.webp" alt="" width={300} height={300} style={{ width: "87%", height: "auto" }} />
          </div>
        )}

        <div style={{ position: "relative", zIndex: 10, height: "100%", overflowY: "auto" }}>
          {selectedJob ? (
            /* ── DETAIL VIEW ── */
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "32px" }}>
              {/* Back button */}
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", padding: 0, alignSelf: "flex-start" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2555B7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span style={{ fontFamily: "TTCommons, sans-serif", fontSize: "15px", color: "#2555B7", fontWeight: 600 }}>Kembali</span>
              </button>

              {/* Logo */}
              {selectedJob.companyLogoUrl && (
                <div style={{ background: "white", borderRadius: "8px", border: "1.25px solid #3D89FA", padding: "8px 14px", display: "inline-flex", alignItems: "center", justifyContent: "center", height: "52px", alignSelf: "flex-start" }}>
                  <Image src={selectedJob.companyLogoUrl} alt={selectedJob.companyName} width={120} height={60} style={{ height: "100%", width: "auto", objectFit: "contain" }} unoptimized />
                </div>
              )}

              {/* Title + company */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <p style={{ fontFamily: "TimesNewRoman, serif", fontWeight: 700, fontSize: "22px", color: "#2555B7", margin: 0, lineHeight: 1.2 }}>{selectedJob.title}</p>
                <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "15px", color: "#3D89FA", margin: 0, textDecoration: "underline" }}>{selectedJob.companyName}</p>
                {selectedJob.companyAddress && (
                  <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "13px", color: "#2555B7", margin: 0, opacity: 0.7 }}>{selectedJob.companyAddress}</p>
                )}
              </div>

              {/* Info grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", background: "#FFDBEE", border: "1.5px solid #FFD1D9", borderRadius: "12px", padding: "12px 14px" }}>
                {[
                  { icon: "/images/wce/job-expo/svg/location_on.png", text: `${selectedJob.city}${selectedJob.province ? `, ${selectedJob.province}` : ""}` },
                  { icon: "/images/wce/job-expo/svg/Clock.png", text: (TYPE_BADGE[selectedJob.employmentType] ?? { label: selectedJob.employmentType }).label },
                  { icon: "/images/wce/job-expo/svg/person.png", text: selectedJob.broadExpertise || selectedJob.l1Category || "Open For All" },
                  { icon: "/images/wce/job-expo/svg/degree.png", text: `${formatEducation(selectedJob.educationLevel)}${(selectedJob.minYearsOfExperience ?? 0) > 0 ? ` · Min. ${selectedJob.minYearsOfExperience} thn` : " · Fresh Graduate"}` },
                ].map(({ icon, text }) => (
                  <div key={icon} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                    <Image src={icon} alt="" width={16} height={16} style={{ width: "16px", height: "16px", objectFit: "contain", flexShrink: 0, marginTop: "2px" }} unoptimized />
                    <span style={{ fontFamily: "TTCommons, sans-serif", fontSize: "13px", color: "#2555B7", lineHeight: 1.4 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Skills */}
              {parseSkills(selectedJob.skills).length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {parseSkills(selectedJob.skills).map((skill, i) => (
                    <span key={i} style={{ background: "#CFE5FC", border: "1px solid #3D89FA", borderRadius: "20px", padding: "4px 10px", fontFamily: "TTCommons, sans-serif", fontSize: "12px", color: "#2555B7", fontWeight: 500 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Apply button */}
              <a
                href={selectedJob.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", background: "#CF388E", border: "2px solid #DF56A4", borderRadius: "12px", padding: "14px", color: "#FFDBEE", fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "16px", textDecoration: "none" }}
              >
                Apply Now
              </a>

              {/* Description sections */}
              {(() => {
                const descText = selectedJob.jobDescriptionFull ?? selectedJob.jobDescriptionSummary ?? "";
                if (!descText) return null;
                const sections = parseJobSections(descText);
                const hasTyped = sections.some((s) => s.type !== "general");
                const cardStyle: React.CSSProperties = { background: "#FFEFF8", border: "1.5px solid #FFD1D9", borderRadius: "12px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" };
                if (!hasTyped) {
                  return (
                    <div style={cardStyle}>
                      <p style={{ fontFamily: "TTCommons, sans-serif", fontWeight: 700, fontSize: "16px", color: "#2555B7", margin: 0 }}>Full Description</p>
                      {renderMobileSectionLines(sections.flatMap((s) => s.lines))}
                    </div>
                  );
                }
                return sections.map((section, idx) => {
                  const pill = section.type !== "general" ? SECTION_PILLS[section.type] : null;
                  return (
                    <div key={idx} style={cardStyle}>
                      {pill && (
                        <span style={{ display: "inline-flex", alignSelf: "flex-start", background: pill.bg, color: "white", fontFamily: "TTCommons, sans-serif", fontSize: "12px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", marginBottom: "4px" }}>
                          {pill.text}
                        </span>
                      )}
                      {renderMobileSectionLines(section.lines)}
                    </div>
                  );
                });
              })()}
            </div>
          ) : (
            /* ── LIST VIEW ── */
            <div style={{ position: "relative" }}>
              {/* Active filter chips */}
              {hasActiveFilters && (
                <div style={{ position: "relative", zIndex: 10, padding: "16px 16px 0", display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", justifyContent: "center" }}>
                  {filters.location !== "all" && (
                    <MobileFilterChip label={filters.location === "jabodetabek" ? "Jabodetabek" : "Non-Jabodetabek"} onRemove={() => onFiltersChange?.({ ...filters, location: "all" })} />
                  )}
                  {filters.positions.map((pos) => (
                    <MobileFilterChip key={pos} label={pos} onRemove={() => onFiltersChange?.({ ...filters, positions: filters.positions.filter((x) => x !== pos) })} />
                  ))}
                  {filters.companies.map((co) => (
                    <MobileFilterChip key={co} label={co} onRemove={() => onFiltersChange?.({ ...filters, companies: filters.companies.filter((x) => x !== co) })} />
                  ))}
                  {filters.employmentTypes.map((t) => (
                    <MobileFilterChip key={t} label={formatEmploymentType(t)} onRemove={() => onFiltersChange?.({ ...filters, employmentTypes: filters.employmentTypes.filter((x) => x !== t) })} />
                  ))}
                  <button type="button" onClick={() => onFiltersChange?.(DEFAULT_FILTERS)} style={{ background: "none", border: "none", fontFamily: "TTCommons, sans-serif", fontSize: "12px", color: "#CF388E", cursor: "pointer", textDecoration: "underline", padding: "2px 4px" }}>
                    Clear all
                  </button>
                </div>
              )}

              <div style={{ position: "relative", zIndex: 10, padding: `${hasActiveFilters ? "16px" : "36px"} 16px 24px`, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                {loading ? (
                  <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "4cqw", color: "#3D89FA", textAlign: "center", marginTop: "8cqw" }}>Loading…</p>
                ) : filtered.length === 0 ? (
                  <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "4cqw", color: "#666", textAlign: "center", marginTop: "8cqw" }}>Tidak ada lowongan ditemukan.</p>
                ) : filtered.map((job) => {
                  const badge = TYPE_BADGE[job.employmentType] ?? { label: job.employmentType, bg: "#6B7280" };
                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => { setSelectedId(job.id); if (filterOpen) onFilterClose?.(); }}
                      style={{ background: "#87C9FF", border: "2px solid #3D89FA", borderRadius: "3cqw", padding: "3.5cqw 4cqw", cursor: "pointer", textAlign: "left", width: "85%", display: "flex", flexDirection: "column", gap: "1.5cqw" }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "2cqw" }}>
                        <span style={{ display: "inline-block", background: badge.bg, color: "white", fontFamily: "TTCommons, sans-serif", fontSize: "2.8cqw", fontWeight: 600, padding: "0.8cqw 2.5cqw", borderRadius: "10cqw" }}>
                          {badge.label}
                        </span>
                        {job.companyLogoUrl && (
                          <div style={{ background: "white", borderRadius: "1.5cqw", border: "1px solid #3D89FA", padding: "1cqw 2cqw", display: "flex", alignItems: "center", justifyContent: "center", height: "8cqw", flexShrink: 0 }}>
                            <Image src={job.companyLogoUrl} alt={job.companyName} width={60} height={30} style={{ height: "100%", width: "auto", objectFit: "contain" }} unoptimized />
                          </div>
                        )}
                      </div>
                      <p style={{ fontFamily: "TimesNewRoman, serif", fontWeight: 700, fontSize: "5cqw", color: "#2555B7", margin: 0, lineHeight: 1.2 }}>{job.title}</p>
                      <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "3.5cqw", color: "#3D89FA", margin: 0, textDecoration: "underline" }}>{job.companyName}</p>
                      <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "3.2cqw", color: "#3D89FA", margin: 0 }}>{job.city}{job.province ? `, ${job.province}` : ""}</p>
                      {job.jobDescriptionSummary && (
                        <p style={{ fontFamily: "TTCommons, sans-serif", fontSize: "3cqw", color: "#2555B7", margin: 0, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", opacity: 0.75 }}>
                          {job.jobDescriptionSummary}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Filter bottom sheet — fixed overlay */}
        {filterOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
            <div onClick={() => onFilterClose?.()} style={{ position: "absolute", inset: 0, background: "rgba(37,85,183,0.35)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "white", borderRadius: "20px 20px 0 0", maxHeight: "88svh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {/* Drag handle */}
              <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
                <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: "#FFD1D9" }} />
              </div>
              <MobileFilterSheet jobs={jobs} filters={filters} onChange={(f) => onFiltersChange?.(f)} onClose={() => onFilterClose?.()} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
