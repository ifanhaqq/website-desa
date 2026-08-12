import { motion } from "framer-motion";
import {
  ClipboardList,
  FileText,
  Download,
  CheckCircle2,
  Circle,
  ArrowRight,
  FileDown,
  Briefcase,
  ScrollText,
} from "lucide-react";

import pdfBiodataKeluarga from "../assets/pdfs/Copy of FORMULIR BIODATA KELUARGA.pdf";
import pdfPelaporanKelahiran from "../assets/pdfs/Copy of FORMULIR PELAPORAN KELAHIRAN.pdf";
import pdfPelaporanKematian from "../assets/pdfs/Copy of FORMULIR PELAPORAN KEMATIAN.pdf";
import pdfPeristiwaKependudukan from "../assets/pdfs/Copy of FORMULIR PENDAFTARAN PERISTIWA KEPENDUDUKAN.pdf";
import pdfPerpindahanPenduduk from "../assets/pdfs/Copy of FORMULIR PENDAFTARAN PERPINDAHAN PENDUDUK.pdf";
import pdfPersyaratanDokumen from "../assets/pdfs/Copy of PERSYARATAN DOKUMEN KEPENDUDUKAN.pdf";
import pdfDomisiliSekolah from "../assets/pdfs/Copy of SURAT KETERANGAN DOMISILI PENDAFTARAN SEKOLAH.pdf";
import pdfPengantar from "../assets/pdfs/Copy of SURAT KETERANGAN PENGANTAR.pdf";
import pdfTidakMampu from "../assets/pdfs/Copy of SURAT KETERANGAN TIDAK MAMPU.pdf";
import pdfSuratKuasa from "../assets/pdfs/Copy of SURAT KUASA DALAM PELAYANAN ADMINISTRASI KEPENDUDUKAN.pdf";
import pdfAlamatAdministrasi from "../assets/pdfs/Copy of SURAT PERNYATAAN ALAMAT DIGUNAKAN DALAM ADMINISTRASI KEPENDUDUKAN.pdf";
import pdfAlamatRumahSendiri from "../assets/pdfs/Copy of SURAT PERNYATAAN MENGGUNAKAN ALAMAT RUMAH MILIK SENDIRI.pdf";
import pdfPengakuanAnak from "../assets/pdfs/Copy of SURAT PERNYATAAN PENGAKUAN ANAK.pdf";
import pdfPenghasilanOrtu from "../assets/pdfs/Copy of SURAT PERNYATAAN PENGHASILAN ORANG TUA.pdf";
import pdfPerubahanElemen from "../assets/pdfs/Copy of SURAT PERNYATAAN PERUBAHAN ELEMEN DATA KEPENDUDUKAN.pdf";
import pdfSptjmKelahiran from "../assets/pdfs/Copy of SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK (SPTJM) KEBENARAN DATA KELAHIRAN.pdf";
import pdfSptjmSuamiIsteri from "../assets/pdfs/Copy of SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK (SPTJM) KEBENARAN SEBAGAI PASANGAN SUAMI ISTERI.pdf";
import pdfNumpangKK from "../assets/pdfs/Copy of SURAT PERNYATAAN TIDAK KEBERATAN NUMPANG KK.pdf";
import pdfTidakPunyaDokumen from "../assets/pdfs/Copy of SURAT PERNYATAAN TIDAK MEMILIKI DOKUMEN KEPENDUDUKAN.pdf";
import pdfSptjmPerkawinan from "../assets/pdfs/Copy of SURAT PERYATAAN TANGGUNG JAWAB MUTLAK PERKAWINAN PERCERAIAN BELUM TERCATAT.pdf";

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

/* ─── Download Table Data ─── */
const documents = [
  {
    name: "Formulir Biodata Keluarga",
    description: "Formulir isian data lengkap anggota keluarga untuk pemutakhiran biodata.",
    file: pdfBiodataKeluarga,
  },
  {
    name: "Formulir Pelaporan Kelahiran",
    description: "Formulir permohonan dan pelaporan peristiwa kelahiran warga desa.",
    file: pdfPelaporanKelahiran,
  },
  {
    name: "Formulir Pelaporan Kematian",
    description: "Formulir pelaporan kematian untuk pengurusan akta kematian.",
    file: pdfPelaporanKematian,
  },
  {
    name: "Formulir Pendaftaran Peristiwa Kependudukan",
    description: "Formulir permohonan penerbitan atau perubahan dokumen kependudukan.",
    file: pdfPeristiwaKependudukan,
  },
  {
    name: "Formulir Pendaftaran Perpindahan Penduduk",
    description: "Formulir permohonan surat keterangan pindah domisili warga.",
    file: pdfPerpindahanPenduduk,
  },
  {
    name: "Persyaratan Dokumen Kependudukan",
    description: "Daftar syarat dan ketentuan berkas pengurusan administrasi desa.",
    file: pdfPersyaratanDokumen,
  },
  {
    name: "Surat Keterangan Domisili Pendaftaran Sekolah",
    description: "Surat keterangan tempat tinggal warga untuk keperluan pendaftaran sekolah.",
    file: pdfDomisiliSekolah,
  },
  {
    name: "Surat Keterangan Pengantar",
    description: "Surat pengantar umum dari desa untuk berbagai keperluan administrasi.",
    file: pdfPengantar,
  },
  {
    name: "Surat Keterangan Tidak Mampu",
    description: "Surat keterangan bagi warga yang memerlukan bantuan sosial atau beasiswa.",
    file: pdfTidakMampu,
  },
  {
    name: "Surat Kuasa dalam Pelayanan Administrasi Kependudukan",
    description: "Surat kuasa pengurusan dokumen kependudukan jika diwakilkan.",
    file: pdfSuratKuasa,
  },
  {
    name: "Surat Pernyataan Alamat Digunakan Dalam Administrasi Kependudukan",
    description: "Surat pernyataan keabsahan penggunaan alamat tinggal warga.",
    file: pdfAlamatAdministrasi,
  },
  {
    name: "Surat Pernyataan Menggunakan Alamat Rumah milik Rumah Milik Sendiri",
    description: "Surat pernyataan kepemilikan dan penggunaan alamat rumah pribadi.",
    file: pdfAlamatRumahSendiri,
  },
  {
    name: "Surat Pernyataan Pengakuan Anak",
    description: "Surat pernyataan resmi untuk pengurusan akta pengakuan anak.",
    file: pdfPengakuanAnak,
  },
  {
    name: "Surat Penghasilan Orang Tua",
    description: "Surat keterangan jumlah penghasilan orang tua untuk keperluan administrasi.",
    file: pdfPenghasilanOrtu,
  },
  {
    name: "Surat Pernyataan Perubahan Elemen Data Kependudukan",
    description: "Surat pernyataan permohonan perubahan elemen data pada KK/KTP.",
    file: pdfPerubahanElemen,
  },
  {
    name: "Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) Kebenaran Data Kelahiran",
    description: "Surat SPTJM kebenaran data kelahiran tanpa surat keterangan medis.",
    file: pdfSptjmKelahiran,
  },
  {
    name: "Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) Kebenaran Sebagai Pasangan Suami Isteri",
    description: "Surat SPTJM keabsahan hubungan suami istri untuk administrasi kependudukan.",
    file: pdfSptjmSuamiIsteri,
  },
  {
    name: "Surat Penyataan Tidak Keberatan Numpang KK",
    description: "Surat persetujuan dari kepala keluarga untuk warga yang menumpang KK.",
    file: pdfNumpangKK,
  },
  {
    name: "Surat Pernyataan Tidak Memiliki Dokumen Kependudukan",
    description: "Surat pernyataan resmi bagi warga yang belum/tidak memiliki dokumen kependudukan.",
    file: pdfTidakPunyaDokumen,
  },
  {
    name: "Surat Pernyataan Tanggung Jawab Mutlak Perkawinan/ Peceraian Belum Tercatat",
    description: "Surat SPTJM status perkawinan/perceraian yang belum tercatat di negara.",
    file: pdfSptjmPerkawinan,
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

/* ─── Download Table ─── */
function DownloadTable() {
  return (
    <motion.div {...fadeInUp}>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
          <FileDown className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
            Pusat Unduhan
          </h2>
          <p className="text-sm text-slate-500">
            Download template dokumen administrasi desa
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                No
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Nama Dokumen
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Deskripsi
              </th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="border-b border-slate-50 last:border-b-0 hover:bg-emerald-50/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-semibold text-slate-500">
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-medium text-sm text-slate-800">
                      {doc.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500">
                    {doc.description}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <a href={doc.file} download={doc.name + ".pdf"} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm hover:shadow-md">
                    <Download className="w-4 h-4" />
                    Unduh
                  </a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {documents.map((doc, index) => (
          <motion.div
            key={index}
            {...staggerItem}
            className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-slate-800 mb-1">
                  {doc.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {doc.description}
                </p>
              </div>
            </div>
            <a href={doc.file} download={doc.name + ".pdf"} className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
              <Download className="w-4 h-4" />
              Unduh Dokumen
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function LayananPage() {
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

        {/* Download Table */}
        <DownloadTable />
      </div>
    </div>
  );
}
