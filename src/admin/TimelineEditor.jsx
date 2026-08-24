import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, X, Save, Loader2, GripVertical } from "lucide-react";

export default function TimelineEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ nama: "", periode: "", keterangan: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("kepala_desa_timeline")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const openAdd = () => {
    setEditingItem(null);
    setForm({ nama: "", periode: "", keterangan: "" });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({ nama: item.nama, periode: item.periode, keterangan: item.keterangan || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.nama.trim() || !form.periode.trim()) return;
    setSaving(true);

    if (editingItem) {
      const { error } = await supabase
        .from("kepala_desa_timeline")
        .update({ nama: form.nama, periode: form.periode, keterangan: form.keterangan })
        .eq("id", editingItem.id);
      if (error) {
        showMessage("error", "Gagal menyimpan: " + error.message);
      } else {
        showMessage("success", "Data berhasil diperbarui!");
      }
    } else {
      const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.sort_order || 0)) : -1;
      const { error } = await supabase
        .from("kepala_desa_timeline")
        .insert({ nama: form.nama, periode: form.periode, keterangan: form.keterangan, sort_order: maxOrder + 1 });
      if (error) {
        showMessage("error", "Gagal menambah: " + error.message);
      } else {
        showMessage("success", "Data berhasil ditambahkan!");
      }
    }

    setSaving(false);
    setModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("kepala_desa_timeline").delete().eq("id", id);
    if (error) {
      showMessage("error", "Gagal menghapus: " + error.message);
    } else {
      showMessage("success", "Data berhasil dihapus!");
    }
    setDeleteConfirm(null);
    fetchItems();
  };

  const moveItem = async (index, direction) => {
    const newItems = [...items];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newItems.length) return;

    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];

    // Update sort_order for both
    await Promise.all([
      supabase.from("kepala_desa_timeline").update({ sort_order: index }).eq("id", newItems[index].id),
      supabase.from("kepala_desa_timeline").update({ sort_order: swapIndex }).eq("id", newItems[swapIndex].id),
    ]);
    fetchItems();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-500" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Timeline Kepala Desa</h1>
            <p className="text-sm text-slate-500">{items.length} entri</p>
          </div>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
          message.type === "success"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3"
          >
            {/* Reorder */}
            <div className="flex flex-col gap-1 pt-1">
              <button
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 text-slate-400"
                title="Pindah ke atas"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </button>
              <button
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 text-slate-400"
                title="Pindah ke bawah"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                  {item.periode}
                </span>
              </div>
              <h4 className="font-semibold text-slate-800 text-sm">{item.nama}</h4>
              {item.keterangan && (
                <p className="text-xs text-slate-500 mt-1">{item.keterangan}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => openEdit(item)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteConfirm(item.id)}
                className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-sm text-slate-400">
            Belum ada data. Klik "Tambah" untuk menambahkan entri pertama.
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                {editingItem ? "Edit Entri" : "Tambah Entri"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                  placeholder="Nama Kepala Desa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Periode</label>
                <input
                  type="text"
                  value={form.periode}
                  onChange={(e) => setForm({ ...form, periode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                  placeholder="Contoh: 2020 – Sekarang"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Keterangan</label>
                <textarea
                  value={form.keterangan}
                  onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
                  placeholder="Deskripsi singkat (opsional)"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.nama.trim() || !form.periode.trim()}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Hapus Entri?</h3>
            <p className="text-sm text-slate-500 mb-6">Data yang dihapus tidak dapat dikembalikan.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700"
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
