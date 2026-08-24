import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Save, Loader2, ImageIcon, Upload, ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfilEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    hero_title_line1: "",
    hero_title_line2: "",
    hero_subtitle: "",
    hero_image_url: "",
    sejarah_quote: "",
    sejarah_quote_subheading: "",
    sejarah_paragraph_1: "",
    sejarah_paragraph_2: "",
    sejarah_paragraph_3: "",
    geografi_description: "",
    geografi_map_url: "",
    batas_utara: "",
    batas_selatan: "",
    batas_timur: "",
    batas_barat: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (data) {
      setForm({
        hero_title_line1: data.hero_title_line1 || "",
        hero_title_line2: data.hero_title_line2 || "",
        hero_subtitle: data.hero_subtitle || "",
        hero_image_url: data.hero_image_url || "",
        sejarah_quote: data.sejarah_quote || "",
        sejarah_quote_subheading: data.sejarah_quote_subheading || "",
        sejarah_paragraph_1: data.sejarah_paragraph_1 || "",
        sejarah_paragraph_2: data.sejarah_paragraph_2 || "",
        sejarah_paragraph_3: data.sejarah_paragraph_3 || "",
        geografi_description: data.geografi_description || "",
        geografi_map_url: data.geografi_map_url || "",
        batas_utara: data.batas_utara || "",
        batas_selatan: data.batas_selatan || "",
        batas_timur: data.batas_timur || "",
        batas_barat: data.batas_barat || "",
      });
    }
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage({ type: "", text: "" });

    const fileExt = file.name.split(".").pop();
    const fileName = `hero-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setMessage({ type: "error", text: "Gagal mengunggah gambar: " + uploadError.message });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("hero-images")
      .getPublicUrl(fileName);

    handleChange("hero_image_url", urlData.publicUrl);
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    const { error } = await supabase
      .from("site_settings")
      .update({
        ...form,
        updated_at: new Date().toISOString(),
      })
      .eq("id", (await supabase.from("site_settings").select("id").single()).data.id);

    if (error) {
      setMessage({ type: "error", text: "Gagal menyimpan: " + error.message });
    } else {
      setMessage({ type: "success", text: "Perubahan berhasil disimpan!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
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
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin" className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-500" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Profil Desa</h1>
          <p className="text-sm text-slate-500">Edit hero, sejarah, dan letak geografis</p>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
          message.type === "success"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {/* ─── Hero Section ─── */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Baris 1</label>
                <input
                  type="text"
                  value={form.hero_title_line1}
                  onChange={(e) => handleChange("hero_title_line1", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Baris 2</label>
                <input
                  type="text"
                  value={form.hero_title_line2}
                  onChange={(e) => handleChange("hero_title_line2", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subjudul</label>
              <input
                type="text"
                value={form.hero_subtitle}
                onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
              />
            </div>
            {/* Hero Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gambar Hero</label>
              {form.hero_image_url && (
                <div className="relative mb-3 rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={form.hero_image_url}
                    alt="Hero preview"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    onClick={() => handleChange("hero_image_url", "")}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 border-dashed rounded-xl px-4 py-3 transition-colors">
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                ) : (
                  <Upload className="w-4 h-4 text-slate-500" />
                )}
                <span className="text-sm text-slate-600">
                  {uploading ? "Mengunggah..." : "Pilih gambar..."}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </section>

        {/* ─── Sejarah Section ─── */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Sejarah Desa</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kutipan (Quote)</label>
              <textarea
                value={form.sejarah_quote}
                onChange={(e) => handleChange("sejarah_quote", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sub-judul Kutipan</label>
              <input
                type="text"
                value={form.sejarah_quote_subheading}
                onChange={(e) => handleChange("sejarah_quote_subheading", e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Paragraf 1</label>
              <textarea
                value={form.sejarah_paragraph_1}
                onChange={(e) => handleChange("sejarah_paragraph_1", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Paragraf 2</label>
              <textarea
                value={form.sejarah_paragraph_2}
                onChange={(e) => handleChange("sejarah_paragraph_2", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Paragraf 3</label>
              <textarea
                value={form.sejarah_paragraph_3}
                onChange={(e) => handleChange("sejarah_paragraph_3", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
              />
            </div>
          </div>
        </section>

        {/* ─── Geografi Section ─── */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Letak Geografis</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Geografis</label>
              <textarea
                value={form.geografi_description}
                onChange={(e) => handleChange("geografi_description", e.target.value)}
                rows={5}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Embed Peta</label>
              <input
                type="text"
                value={form.geografi_map_url}
                onChange={(e) => handleChange("geografi_map_url", e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                placeholder="https://www.openstreetmap.org/export/embed.html?..."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "batas_utara", label: "Batas Utara" },
                { key: "batas_selatan", label: "Batas Selatan" },
                { key: "batas_timur", label: "Batas Timur" },
                { key: "batas_barat", label: "Batas Barat" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                  <input
                    type="text"
                    value={form[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end pb-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}
