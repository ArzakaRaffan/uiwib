// src/app/admin/partners/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { MediaPartner, CompanyPartner } from "@/types";

// ─── Shared types ─────────────────────────────────────────────────────────────

type PartnerType = "media" | "company";

interface FormState {
  open: boolean;
  type: PartnerType;
  editing: MediaPartner | CompanyPartner | null;
}

// ─── Partner Card ─────────────────────────────────────────────────────────────

function PartnerCard({
  name,
  logoUrl,
  badge,
  onEdit,
  onDelete,
}: {
  name: string;
  logoUrl: string;
  badge?: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-sm flex items-center gap-4">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center flex-shrink-0">
        {logoUrl ? (
          <img src={logoUrl} alt={name} className="object-contain w-full h-full" />
        ) : (
          <span className="text-2xl">🖼️</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate" style={{ color: "var(--color-navy)" }}>{name}</p>
        {badge && (
          <span className="mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-700 font-semibold">
            {badge}
          </span>
        )}
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={onEdit}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPartnersPage() {
  const [mediaPartners, setMediaPartners] = useState<MediaPartner[]>([]);
  const [companyPartners, setCompanyPartners] = useState<CompanyPartner[]>([]);
  const [form, setForm] = useState<FormState>({ open: false, type: "media", editing: null });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: PartnerType } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function fetchAll() {
    const [mediaRes, companyRes] = await Promise.all([
      fetch("/api/media-partners"),
      fetch("/api/company-partners"),
    ]);
    const [mediaData, companyData] = await Promise.all([mediaRes.json(), companyRes.json()]);
    if (mediaData.success) setMediaPartners(mediaData.data);
    if (companyData.success) setCompanyPartners(companyData.data);
  }

  useEffect(() => { fetchAll(); }, []);

  function openAdd(type: PartnerType) {
    setForm({ open: true, type, editing: null });
    setError("");
    setTimeout(() => formRef.current?.reset(), 0);
  }

  function openEdit(type: PartnerType, item: MediaPartner | CompanyPartner) {
    setForm({ open: true, type, editing: item });
    setError("");
  }

  async function handleSubmit() {
    if (!formRef.current) return;
    setSubmitting(true);
    setError("");

    const endpoint = form.type === "media" ? "/api/media-partners" : "/api/company-partners";
    const url = form.editing ? `${endpoint}/${form.editing.id}` : endpoint;
    const method = form.editing ? "PUT" : "POST";
    const formData = new FormData(formRef.current);

    try {
      const res = await fetch(url, { method, body: formData });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setForm({ open: false, type: "media", editing: null });
      fetchAll();
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const endpoint = deleteTarget.type === "media" ? "/api/media-partners" : "/api/company-partners";
    try {
      const res = await fetch(`${endpoint}/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setDeleteTarget(null);
      fetchAll();
    } catch (e: any) {
      alert(e.message ?? "Delete failed");
    }
  }

  const mediaRow1 = mediaPartners.filter((p) => p.row === 1);
  const mediaRow2 = mediaPartners.filter((p) => p.row === 2);

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ── Media Partners ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="font-display text-3xl font-bold flex items-center gap-2" style={{ color: "var(--color-navy)" }}>
                📰 Media Partners
              </h1>
              <p className="text-neutral-500 text-sm mt-1">{mediaPartners.length} partner total — tersebar di 2 row</p>
            </div>
          </div>

          {/* Row 1 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm text-neutral-600 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">1</span>
                Row 1
                <span className="text-neutral-400 font-normal">({mediaRow1.length} partner)</span>
              </h2>
              <button onClick={() => openAdd("media")} className="btn-primary text-xs px-3 py-1.5">
                + Tambah ke Row 1
              </button>
            </div>
            {mediaRow1.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-neutral-200 p-6 text-center text-neutral-400 text-sm">
                Belum ada media partner di Row 1
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {mediaRow1.map((p) => (
                  <PartnerCard
                    key={p.id}
                    name={p.name}
                    logoUrl={p.logoUrl}
                    badge="Row 1"
                    onEdit={() => openEdit("media", p)}
                    onDelete={() => setDeleteTarget({ id: p.id, type: "media" })}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Row 2 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm text-neutral-600 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center">2</span>
                Row 2
                <span className="text-neutral-400 font-normal">({mediaRow2.length} partner)</span>
              </h2>
              <button
                onClick={() => {
                  openAdd("media");
                  // pre-select row 2 after form opens
                  setTimeout(() => {
                    const sel = formRef.current?.querySelector<HTMLSelectElement>('[name="row"]');
                    if (sel) sel.value = "2";
                  }, 50);
                }}
                className="btn-primary text-xs px-3 py-1.5"
              >
                + Tambah ke Row 2
              </button>
            </div>
            {mediaRow2.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-neutral-200 p-6 text-center text-neutral-400 text-sm">
                Belum ada media partner di Row 2
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {mediaRow2.map((p) => (
                  <PartnerCard
                    key={p.id}
                    name={p.name}
                    logoUrl={p.logoUrl}
                    badge="Row 2"
                    onEdit={() => openEdit("media", p)}
                    onDelete={() => setDeleteTarget({ id: p.id, type: "media" })}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <hr className="border-neutral-200" />

        {/* ── Company Partners ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="font-display text-3xl font-bold flex items-center gap-2" style={{ color: "var(--color-navy)" }}>
                🏢 Company Partners
              </h1>
              <p className="text-neutral-500 text-sm mt-1">{companyPartners.length} partner total — satu row</p>
            </div>
            <button onClick={() => openAdd("company")} className="btn-primary">
              + Tambah Company Partner
            </button>
          </div>

          {companyPartners.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-neutral-200 p-12 text-center">
              <div className="text-4xl mb-3">🏢</div>
              <p className="text-neutral-500 text-sm">Belum ada company partner. Tambahkan yang pertama!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {companyPartners.map((p) => (
                <PartnerCard
                  key={p.id}
                  name={p.name}
                  logoUrl={p.logoUrl}
                  onEdit={() => openEdit("company", p)}
                  onDelete={() => setDeleteTarget({ id: p.id, type: "company" })}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* ── Form Modal ── */}
      {form.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="font-display font-bold text-lg" style={{ color: "var(--color-navy)" }}>
                {form.editing ? "Edit" : "Tambah"} {form.type === "media" ? "Media Partner" : "Company Partner"}
              </h2>
              <button
                onClick={() => setForm({ open: false, type: "media", editing: null })}
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

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Nama Partner <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Contoh: Kompas"
                  defaultValue={(form.editing as any)?.name ?? ""}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              {/* Logo */}
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Logo</label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-600"
                />
                {form.editing && (form.editing as any).logoUrl && (
                  <p className="text-xs text-neutral-400 mt-1">
                    Logo saat ini:{" "}
                    <a href={(form.editing as any).logoUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                      Lihat
                    </a>
                    . Upload baru untuk mengganti.
                  </p>
                )}
              </div>

              {/* Row selector — hanya untuk media partner */}
              {form.type === "media" && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                    Tempatkan di Row <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="row"
                    required
                    defaultValue={(form.editing as MediaPartner)?.row?.toString() ?? "1"}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-rose-400 bg-white"
                  >
                    <option value="1">Row 1</option>
                    <option value="2">Row 2</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setForm({ open: false, type: "media", editing: null })}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 btn-primary py-2.5 disabled:opacity-60"
                >
                  {submitting ? "Menyimpan..." : form.editing ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="text-4xl mb-4">🗑️</div>
            <h3 className="font-display font-bold text-lg mb-2" style={{ color: "var(--color-navy)" }}>
              Hapus partner ini?
            </h3>
            <p className="text-neutral-500 text-sm mb-6">
              Tindakan ini tidak bisa dibatalkan. Partner dan logonya akan dihapus secara permanen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
