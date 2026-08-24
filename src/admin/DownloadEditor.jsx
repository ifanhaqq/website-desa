import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, X, Save, Loader2, Upload, FileSpreadsheet } from "lucide-react";

export default function DownloadEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", file_url: "", filename: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("download_files").select("*").order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const openAdd = () => { setEditingItem(null); setForm({ name: "", description: "", file_url: "", filename: "" }); setModalOpen(true); };
  const openEdit = (item) => { setEditingItem(item); setForm({ name: item.name, description: item.description || "", file_url: item.file_url, filename: item.filename }); setModalOpen(true); };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("download-files").upload(fileName, file, { upsert: true });
    if (error) {
      showMessage("error", "Gagal mengunggah file: " + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("download-files").getPublicUrl(fileName);
    setForm((prev) => ({ ...prev, file_url: urlData.publicUrl, filename: file.name }));
    if (!form.name) {
      // Auto-fill name from filename (strip extension)
      const nameFromFile = file.name.replace(/\.[^.]+$/, "");
      setForm((prev) => ({ ...prev, name: nameFromFile }));
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.file_url.trim()) return;
    setSaving(true);
    if (editingItem) {
      const { error } = await supabase.from("download_files")
        .update({ name: form.name, description: form.description, file_url: form.file_url, filename: form.filename })
        .eq("id", editingItem.id);
      if (error) showMessage("error", "Gagal menyimpan: " + error.message);
      else showMessage("success", "Data berhasil diperbarui!");
    } else {
      const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.sort_order || 0)) : -1;
      const { error } = await supabase.from("download_files")
        .insert({ name: form.name, description: form.description, file_url: form.file_url, filename: form.filename, sort_order: maxOrder + 1 });
      if (error) showMessage("error", "Gagal menambah: " + error.message);
      else showMessage("success", "File berhasil ditambahkan!");
    }
    setSaving(false);
    setModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("download_files").delete().eq("id", id);
    if (error) showMessage("error", "Gagal menghapus: " + error.message);
    else showMessage("success", "File berhasil dihapus!");
    setDeleteConfirm(null);
    fetchItems();
  };

  const moveItem = async (index, direction) => {
    const newItems = [...items];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newItems.length) return;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    await Promise.all([
      supabase.from("download_files").update({ sort_order: index }).eq("id", newItems[index].id),
      supabase.from("download_files").update({ sort_order: swapIndex }).eq("id", newItems[swapIndex].id),
    ]);
    fetchItems();
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="p-2 rounded-xl hover:bg-slate-100"><ArrowLeft className="w-4 h-4 text-slate-500" /></Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Pusat Unduhan</h1>
            <p className="text-sm text-slate-500">{items.length} file formulir</p>
          </div>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm">
          <Plus className="w-4 h-4" /> Tambah File
        </button>
      </div>

      {message.text && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>{message.text}</div>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <button onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 text-slate-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </button>
              <button onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 text-slate-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-800 text-sm truncate">{item.name}</h4>
              <span className="text-xs text-slate-400">{item.filename}</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Pencil className="w-3.5 h-3.5" /></button>
              <button onClick={() => setDeleteConfirm(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-center py-12 text-sm text-slate-400">Belum ada file.</div>}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">{editingItem ? "Edit" : "Tambah"} File</h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">File</label>
                {form.filename && (
                  <div className="flex items-center gap-2 mb-2 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-2 rounded-lg">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    {form.filename}
                  </div>
                )}
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 border-dashed rounded-xl px-4 py-2.5 transition-colors">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin text-slate-500" /> : <Upload className="w-4 h-4 text-slate-500" />}
                  <span className="text-sm text-slate-600">{uploading ? "Mengunggah..." : "Pilih file..."}</span>
                  <input type="file" accept=".xlsx,.xls,.pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="Contoh: Lembar Biodata Keluarga" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi (opsional)</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100">Batal</button>
              <button onClick={handleSave} disabled={saving || !form.name.trim() || !form.file_url.trim()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2 rounded-xl disabled:opacity-60">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Hapus File?</h3>
            <p className="text-sm text-slate-500 mb-6">File yang dihapus tidak dapat dikembalikan.</p>
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
