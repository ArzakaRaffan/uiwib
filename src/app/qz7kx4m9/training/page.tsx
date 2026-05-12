// src/app/admin/training/page.tsx
"use client";

import { useEffect, useState } from "react";
import AdminCrudPage from "@/components/admin/AdminCrudPage";
import { Training } from "@/types";

const fields = [
  { name: "type", label: "Type", type: "select" as const, required: true, options: ["External", "Internal"] },
  { name: "title", label: "Title / Theme", type: "text" as const, required: true, placeholder: "Breaking into Product Management" },
  { name: "date", label: "Date", type: "text" as const, required: true, placeholder: "Thursday, June 26, 2025" },
  { name: "place", label: "Place", type: "text" as const, required: true, placeholder: "Wisma Barito Pacific II (8th Floor) / tiket.com HQ" },
  { name: "description", label: "Description", type: "textarea" as const, required: true, placeholder: "Describe the training event..." },
  { name: "image", label: "Event Image (optional)", type: "file" as const },
];

export default function AdminTrainingPage() {
  const [items, setItems] = useState<Training[]>([]);

  async function fetchData() {
    const res = await fetch("/api/training");
    const data = await res.json();
    if (data.success) setItems(data.data);
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <AdminCrudPage
      title="Trainings"
      icon="📚"
      items={items}
      fields={fields}
      apiEndpoint="/api/training"
      onRefresh={fetchData}
      renderRow={(item) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.type === "External" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
              {item.type}
            </span>
          </div>
          <p className="font-display font-bold text-base" style={{ color: "var(--color-navy)" }}>{item.title}</p>
          <p className="text-xs text-neutral-500 mt-0.5">📅 {item.date} · 📍 {item.place}</p>
        </div>
      )}
    />
  );
}
