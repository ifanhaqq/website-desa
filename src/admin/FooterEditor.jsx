import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function FooterEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [form, setForm] = useState({
    kontak_alamat: "",
    kontak_telepon: "",
    kontak_email: "",
    jam_layanan: "",
    jam_keterangan_libur: "",
  });

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("kontak_alamat, kontak_telepon, kontak_email, jam_layanan, jam_keterangan_libur").single();
    if (data) {
      setForm({
        kontak_alamat: data.kontak_alamat || "",
        kontak_telepon: data.kontak_telepon || "",
        kontak_email: data.kontak_email || "",
        jam_layanan: data.jam_layanan || "",
        jam_keterangan_libur: data.jam_keterangan_libur || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    const { error } = await supabase.from("site_settings")
      .update({ ...form, updated_at: new Date().toISOString() })
      .eq("id", (await supabase.from("site_settings").select("id").single()).data.id);
    if (error) setMessage({ type: "error", text: "Gagal menyimpan: " + error.message });
    else setMessage({ type: "success", text: "Footer berhasil diperbarui!" });
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin" className="p-2 rounded-xl hover:bg-slate-100"><ArrowLeft className="w-4 h-4 text-slate-500" /></Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Footer</h1>
          <p className="text-sm text-slate-500">Edit kontak desa dan jam layanan</p>
        </div>
      </div>

      {message.text && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>{message.text}</div>
      )}

      <div className="space-y-6">
        {/* Kontak */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Kontak Desa</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
              <textarea
                value={form.kontak_alamat}
                onChange={(e) => setForm({ ...form, kontak_alamat: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telepon</label>
                <input type="text" value={form.kontak_telepon} onChange={(e) => setForm({ ...form, kontak_telepon: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" value={form.kontak_email} onChange={(e) => setForm({ ...form, kontak_email: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Jam Layanan */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Jam Layanan</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jam Kerja</label>
              <input type="text" value={form.jam_layanan} onChange={(e) => setForm({ ...form, jam_layanan: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="Contoh: Senin - Jumat: 09.00 - 14.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Keterangan Libur</label>
              <input type="text" value={form.jam_keterangan_libur} onChange={(e) => setForm({ ...form, jam_keterangan_libur: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="Contoh: Akhir Pekan Tutup" />
            </div>
          </div>
        </section>

        <div className="flex justify-end pb-4">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}
