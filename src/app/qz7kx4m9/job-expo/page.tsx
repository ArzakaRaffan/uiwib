// src/app/admin/job-expo/page.tsx
"use client";

import { useEffect, useState } from "react";
import AdminCrudPage from "@/components/admin/AdminCrudPage";
import { JobExpo } from "@/types";

const fields = [
  { name: "logo", label: "Company Logo", type: "file" as const },
  { name: "companyName", label: "Company Name", type: "text" as const, required: true, placeholder: "Advance Intelligence Group" },
  { name: "jobTitle", label: "Job Title", type: "text" as const, required: true, placeholder: "AI Scientist & Engineer" },
  { name: "industry", label: "Industry", type: "text" as const, required: true, placeholder: "Financial Services" },
  { name: "salary", label: "Salary (leave blank if not disclosed)", type: "text" as const, placeholder: "Rp 8.000.000 – 12.000.000" },
  { name: "employmentType", label: "Employment Type", type: "select" as const, required: true, options: ["Full Time", "Part Time", "Internship"] },
  { name: "qualification", label: "Qualification", type: "text" as const, required: true, placeholder: "Bachelor" },
  { name: "city", label: "City", type: "text" as const, required: true, placeholder: "Jakarta" },
  { name: "location", label: "Location Type", type: "select" as const, required: true, options: ["Jabodetabek", "Non-Jabodetabek", "Remote"] },
  { name: "deadline", label: "Application Deadline", type: "date" as const, required: true },
  { name: "applyUrl", label: "Apply URL", type: "url" as const, required: true, placeholder: "https://bosshire.com/..." },
];

export default function AdminJobExpoPage() {
  const [items, setItems] = useState<JobExpo[]>([]);

  async function fetchData() {
    const res = await fetch("/api/job-expo");
    const data = await res.json();
    if (data.success) setItems(data.data);
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <AdminCrudPage
      title="Job Expo"
      icon="💼"
      items={items}
      fields={fields}
      apiEndpoint="/api/job-expo"
      imageField="logo"
      onRefresh={fetchData}
      renderRow={(item) => (
        <div>
          <p className="font-display font-bold text-base" style={{ color: "var(--color-navy)" }}>{item.jobTitle}</p>
          <p className="text-xs text-rose-600 font-semibold">{item.companyName}</p>
          <div className="flex flex-wrap gap-2 mt-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-700 font-semibold">{item.employmentType}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-neutral-100 text-neutral-600">{item.location}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-neutral-100 text-neutral-600">📅 {new Date(item.deadline).toLocaleDateString("id-ID")}</span>
          </div>
        </div>
      )}
    />
  );
}
