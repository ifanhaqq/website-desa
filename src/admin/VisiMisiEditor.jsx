import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";

export default function VisiMisiEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ type: "misi", title: "", description: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("visi_misi")
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
    setForm({ type: "misi", title: "", description: "" });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({ type: item.type, title: item.title, description: item.description });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) return;
    setSaving(true);

    if (editingItem) {
      const { error } = await supabase
        .from("visi_misi")
        .update({ type: form.type, title: form.title, description: form.description })
        .eq("id", editingItem.id);
      if (error) showMessage("error", "Gagal menyimpan: " + error.message);
      else showMessage("success", "Data berhasil diperbarui!");
    } else {
      const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.sort_order || 0)) : -1;
      const { error } = await supabase
        .from("visi_misi")
        .insert({ type: form.type, title: form.title, description: form.description, sort_order: maxOrder + 1 });
      if (error) showMessage("error", "Gagal menambah: " + error.message);
      else showMessage("success", "Data berhasil ditambahkan!");
    }

    setSaving(false);
    setModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("visi_misi").delete().eq("id", id);
    if (error) showMessage("error", "Gagal menghapus: " + error.message);
    else showMessage("success", "Data berhasil dihapus!");
    setDeleteConfirm(null);
    fetchItems();
  };

  const moveItem = async (index, direction) => {
    const newItems = [...items];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newItems.length) return;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    await Promise.all([
      supabase.from("visi_misi").update({ sort_order: index }).eq("id", newItems[index].id),
      supabase.from("visi_misi").update({ sort_order: swapIndex }).eq("id", newItems[swapIndex].id),
    ]);
    fetchItems();
  };

  const visi = items.filter((i) => i.type === "visi");
  const misi = items.filter((i) => i.type === "misi");

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
            <h1 className="text-xl font-bold text-slate-800">Visi & Misi</h1>
            <p className="text-sm text-slate-500">{visi.length} visi, {misi.length} misi</p>
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

      {message.text && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
          message.type === "success"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3">
            <div className="flex flex-col gap-1 pt-1">
              <button onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 text-slate-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </button>
              <button onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 text-slate-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  item.type === "visi"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-blue-50 text-blue-700"
                }`}>
                  {item.type === "visi" ? "Visi" : "Misi"}
                </span>
                <span className="text-xs text-slate-400 font-medium">{item.title}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setDeleteConfirm(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-sm text-slate-400">Belum ada data.</div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">{editingItem ? "Edit" : "Tambah"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipe</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                >
                  <option value="visi">Visi</option>
                  <option value="misi">Misi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                  placeholder='Contoh: "Visi", "Misi 1", "Misi 2"'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100">Batal</button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim() || !form.description.trim()}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2 rounded-xl disabled:opacity-60"
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
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Hapus?</h3>
            <p className="text-sm text-slate-500 mb-6">Data yang dihapus tidak dapat dikembalikan.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100">Batal</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
