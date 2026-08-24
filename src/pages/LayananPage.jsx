import { motion } from "framer-motion";
import {
  ClipboardList,
  FileText,
  Download,
  CheckCircle2,
  FileDown,
  Briefcase,
  ScrollText,
  Info,
  FileSpreadsheet,
  Printer,
  Search,
} from "lucide-react";

import { useDownloadFiles } from "../hooks/useDownloadFiles";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/* ─── Stepper Data ─── */
const steps = [
  {
    title: "Persiapan Dokumen",
    description:
      "Siapkan dokumen persyaratan seperti KTP, KK, dan dokumen pendukung lainnya sesuai jenis layanan yang dibutuhkan. Pastikan semua dokumen masih berlaku dan dalam kondisi baik.",
    icon: FileText,
  },
  {
    title: "Pengajuan Permohonan",
    description:
      "Datang ke kantor desa pada jam layanan dan ajukan permohonan kepada petugas loket. Isi formulir permohonan yang disediakan dengan data yang benar dan lengkap.",
    icon: ClipboardList,
  },
  {
    title: "Verifikasi & Proses",
    description:
      "Petugas akan memverifikasi kelengkapan dokumen dan memproses permohonan Anda. Waktu proses bervariasi tergantung jenis layanan (1-3 hari kerja).",
    icon: CheckCircle2,
  },
  {
    title: "Pengambilan Dokumen",
    description:
      "Setelah dokumen selesai diproses, Anda akan dihubungi untuk pengambilan. Bawa bukti pengajuan dan KTP asli saat mengambil dokumen.",
    icon: Briefcase,
  },
];

/* ─── Stepper Component ─── */
function AlurPelayanan() {
  return (
    <motion.div {...fadeInUp} className="mb-12 lg:mb-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
          <ScrollText className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
            Alur Pelayanan
          </h2>
          <p className="text-sm text-slate-500">
            Langkah-langkah mengurus dokumen di kantor desa
          </p>
        </div>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200" />

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-4 gap-6 relative"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  {...staggerItem}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step Circle */}
                  <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-emerald-500/25 mb-4">
                    <Icon className="w-8 h-8 text-white mb-1" />
                    <span className="text-xs text-emerald-100 font-semibold">
                      Langkah {index + 1}
                    </span>
                  </div>

                  <h4 className="font-semibold text-slate-800 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="lg:hidden space-y-0">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;
          return (
            <motion.div key={index} {...staggerItem} className="flex gap-4">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {!isLast && (
                  <div className="w-0.5 h-full min-h-[40px] bg-emerald-200 my-2" />
                )}
              </div>

              {/* Content */}
              <div className={`pb-8 ${isLast ? "" : ""}`}>
                <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                  Langkah {index + 1}
                </span>
                <h4 className="font-semibold text-slate-800 mt-1 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Panduan Mengisi Formulir ─── */
function PanduanMengisiFormulir() {
  const panduanSteps = [
    {
      step: 1,
      title: "Pilih & Unduh Formulir",
      description:
        'Gulir ke bagian "Pusat Unduhan" di bawah halaman ini, lalu pilih dan unduh formulir Excel yang sesuai dengan kebutuhan administrasi Anda.',
      icon: Download,
    },
    {
      step: 2,
      title: "Buka File Excel",
      description:
        "Buka file Excel yang telah diunduh menggunakan Microsoft Excel, Google Sheets, atau aplikasi spreadsheet lainnya.",
      icon: Search,
    },
    {
      step: 3,
      title: "Isi Data Formulir",
      description:
        "Isi kolom-kolom yang tersedia pada formulir dengan data yang benar dan lengkap sesuai kebutuhan administrasi Anda.",
      icon: FileSpreadsheet,
    },
    {
      step: 4,
      title: "Cetak Formulir",
      description:
        "Setelah semua data terisi, cetak formulir yang sudah diisi. Pastikan hasil cetak terbaca jelas dan sesuai format yang diminta.",
      icon: Printer,
    },
  ];

  return (
    <motion.div {...fadeInUp} className="mb-12 lg:mb-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
            Panduan Mengisi Formulir
          </h2>
          <p className="text-sm text-slate-500">
            Ikuti langkah berikut untuk mengisi formulir administrasi desa
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 lg:p-8">
        {/* Info Banner */}
        <div className="flex items-start gap-3 mb-6 bg-white/70 rounded-xl p-4 border border-blue-100">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Formulir administrasi kependudukan Desa Kliris tersedia dalam{" "}
            <span className="font-semibold text-blue-700">
              file Excel terpisah
            </span>{" "}
            untuk setiap jenis keperluan. Pilih formulir yang sesuai dengan
            kebutuhan Anda, unduh, isi datanya, lalu cetak untuk dibawa ke
            kantor desa.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {panduanSteps.map((item) => {
            const StepIcon = item.icon;
            return (
              <motion.div
                key={item.step}
                {...staggerItem}
                className="bg-white rounded-xl p-5 border border-blue-100/50 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                    <StepIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-blue-500 font-semibold">
                      Langkah {item.step}
                    </span>
                    <h4 className="font-semibold text-slate-800">
                      {item.title}
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Download Section ─── */
function DownloadSection({ files, loading }) {
  return (
    <motion.div {...fadeInUp}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
          <FileDown className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
            Pusat Unduhan
          </h2>
          <p className="text-sm text-slate-500">
            Unduh formulir yang sesuai dengan kebutuhan administrasi Anda
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-8 ml-[52px]">
        {loading ? "Memuat..." : `${files.length} formulir tersedia`}
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                <div className="flex-1">
                  <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded w-full mb-2" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {files.map((file, index) => (
            <motion.a
              key={file.id}
              {...staggerItem}
              href={file.file_url}
              download={file.filename}
              className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col"
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-50 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-emerald-700 transition-colors">
                    {file.name}
                  </h4>
                  <span className="text-xs text-slate-400">.xlsx</span>
                </div>
              </div>

              {/* Description */}
              {file.description && (
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">
                  {file.description}
                </p>
              )}

              {/* Download indicator */}
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold group-hover:text-emerald-700 transition-colors mt-auto">
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                Unduh Formulir
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}

      {!loading && files.length === 0 && (
        <div className="text-center py-12 text-sm text-slate-400">
          Belum ada file yang tersedia untuk diunduh.
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function LayananPage() {
  const { files, loading } = useDownloadFiles();

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div {...fadeInUp} className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
              Layanan Administrasi Desa
            </h1>
          </div>
          <p className="text-slate-500 max-w-2xl">
            Panduan dan template dokumen untuk kebutuhan administrasi warga Desa
            Kliris.
          </p>
        </motion.div>

        {/* Alur Pelayanan Stepper */}
        <AlurPelayanan />

        {/* Panduan Mengisi Formulir */}
        <PanduanMengisiFormulir />

        {/* Download Section */}
        <DownloadSection files={files} loading={loading} />
      </div>
    </div>
  );
}
