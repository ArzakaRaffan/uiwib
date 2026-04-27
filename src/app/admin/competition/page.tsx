// src/app/admin/competition/page.tsx
"use client";

import { useEffect, useState } from "react";
import AdminCrudPage from "@/components/admin/AdminCrudPage";
import { Competition } from "@/types";

const fields = [
  { name: "image", label: "Competition Image", type: "file" as const },
  { name: "title", label: "Title", type: "text" as const, required: true, placeholder: "Mini Case Competition" },
  { name: "description", label: "Description", type: "textarea" as const, required: true, placeholder: "Describe the competition..." },
  { name: "timeline", label: "Timeline", type: "text" as const, required: true, placeholder: "Registration: May 26 – June 15 | Competition: June 20–21" },
  { name: "applyUrl", label: "Google Form / Apply URL", type: "url" as const, required: true, placeholder: "https://forms.google.com/..." },
];

export default function AdminCompetitionPage() {
  const [items, setItems] = useState<Competition[]>([]);

  async function fetchData() {
    const res = await fetch("/api/competition");
    const data = await res.json();
    if (data.success) setItems(data.data);
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <AdminCrudPage
      title="Competitions"
      icon="🏆"
      items={items}
      fields={fields}
      apiEndpoint="/api/competition"
      imageField="image"
      onRefresh={fetchData}
      renderRow={(item) => (
        <div>
          <p className="font-display font-bold text-base" style={{ color: "var(--color-navy)" }}>{item.title}</p>
          <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{item.description}</p>
          <p className="text-xs text-amber-600 mt-1">📅 {item.timeline}</p>
        </div>
      )}
    />
  );
}
