"use client";
import { useState, useEffect } from "react";
import HeroSectionJE from "./HeroSection";
import JobListSection, { DEFAULT_FILTERS, type Filters } from "./JobListSection";
import type { JobExpo } from "@/types";

export default function JobExpoClient() {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [jobs, setJobs] = useState<JobExpo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/job-expo")
      .then((r) => r.json())
      .then((d) => { if (d.success) setJobs(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeFilterCount =
    (filters.location !== "all" ? 1 : 0) +
    filters.positions.length +
    filters.companies.length +
    filters.employmentTypes.length;

  return (
    <>
      <HeroSectionJE
        search={search}
        onSearchChange={setSearch}
        onFilterOpen={() => setFilterOpen(true)}
        activeFilterCount={activeFilterCount}
      />
      <JobListSection
        jobs={jobs}
        loading={loading}
        search={search}
        filterOpen={filterOpen}
        onFilterClose={() => setFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </>
  );
}
