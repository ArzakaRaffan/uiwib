// src/components/admin/AdminCrudPage.tsx
"use client";

import { useState, useRef } from "react";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "date" | "url" | "file";
  options?: string[]; // for select
  required?: boolean;
  placeholder?: string;
}

interface AdminCrudPageProps<T extends { id: string }> {
  title: string;
  icon: string;
  items: T[];
  fields: Field[];
  apiEndpoint: string; // e.g. "/api/competition"
  imageField?: string; // form field name for image upload
  renderRow: (item: T) => React.ReactNode;
  onRefresh: () => void;
}

export default function AdminCrudPage<T extends { id: string }>({
  title,
  icon,
  items,
  fields,
  apiEndpoint,
  imageField,
  renderRow,
  onRefresh,
}: AdminCrudPageProps<T>) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function openAdd() {
    setEditing(null);
    setError("");
    setShowForm(true);
    setTimeout(() => formRef.current?.reset(), 0);
  }

  function openEdit(item: T) {
    setEditing(item);
    setError("");
    setShowForm(true);
  }

  async function handleSubmit() {
    if (!formRef.current) return;
    setSubmitting(true);
    setError("");

    const formData = new FormData(formRef.current);
    const url = editing ? `${apiEndpoint}/${editing.id}` : apiEndpoint;
    const method = editing ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setShowForm(false);
      onRefresh();
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`${apiEndpoint}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setDeleteId(null);
      onRefresh();
    } catch (e: any) {
      alert(e.message ?? "Delete failed");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold flex items-center gap-2" style={{ color: "var(--color-navy)" }}>
              {icon} {title}
            </h1>
            <p className="text-neutral-500 text-sm mt-1">{items.length} item{items.length !== 1 ? "s" : ""} total</p>
          </div>
          <button onClick={openAdd} className="btn-primary">
            + Add {title.replace(/s$/, "")}
          </button>
        </div>

        {/* Table / List */}
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
            <div className="text-4xl mb-3">{icon}</div>
            <p className="text-neutral-500 text-sm">No {title.toLowerCase()} yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">{renderRow(item)}</div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="font-display font-bold text-lg" style={{ color: "var(--color-navy)" }}>
                {editing ? `Edit ${title.replace(/s$/, "")}` : `Add ${title.replace(/s$/, "")}`}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <form ref={formRef} className="p-6 space-y-4">
              {error && (
                <div className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                  {error}
                </div>
              )}

              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={4}
                      defaultValue={(editing as any)?.[field.name] ?? ""}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 resize-none"
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      required={field.required}
                      defaultValue={(editing as any)?.[field.name] ?? ""}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 bg-white"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <div>
                      <input
                        type="file"
                        name={field.name}
                        accept="image/*"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-600"
                      />
                      {editing && (editing as any)[field.name] && (
                        <p className="text-xs text-neutral-400 mt-1">
                          Current image: <a href={(editing as any)[field.name]} target="_blank" rel="noreferrer" className="text-blue-500 underline">View</a>. Upload new to replace.
                        </p>
                      )}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      defaultValue={
                        field.type === "date"
                          ? (editing as any)?.[field.name]
                            ? new Date((editing as any)[field.name]).toISOString().split("T")[0]
                            : ""
                          : (editing as any)?.[field.name] ?? ""
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 btn-primary py-2.5 disabled:opacity-60"
                >
                  {submitting ? "Saving..." : editing ? "Save Changes" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="text-4xl mb-4">🗑️</div>
            <h3 className="font-display font-bold text-lg mb-2" style={{ color: "var(--color-navy)" }}>
              Delete this item?
            </h3>
            <p className="text-neutral-500 text-sm mb-6">
              This action cannot be undone. The item and its image will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
