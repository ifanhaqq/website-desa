import { motion } from "framer-motion";
import {
  Eye,
  Target,
  Users,
  Compass,
  Sparkles,
  Heart,
  BookOpen,
  Landmark,
  MapPin,
  Mountain,
  ImageIcon,
} from "lucide-react";

import BgHero from "../assets/img/bg-hero.jpg"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

function PlaceholderImage({ label, className = "" }) {
  return (
    <div
      className={`relative w-full aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
      <span className="text-sm text-slate-500 font-medium">{label}</span>
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative w-full aspect-video max-h-[70vh] overflow-hidden">
      {/* Hero Background Image */}
      <img
        src={BgHero}
        alt="Pemandangan Desa"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/700 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Selamat Datang di
            <br />
            <span className="text-emerald-300">Desa [Nama Desa]</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten], Provinsi
            [Nama Provinsi]
          </p>
        </motion.div>
      </div>


    </section>
  );
}

function TreePineIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
      <path d="M12 22v-3" />
    </svg>
  );
}

/* ─── Sejarah Desa ─── */
function SejarahSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">
              Sejarah Desa
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi tempora
              incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
              enim ad minima veniam, quis nostrum exercitationem ullam corporis
              suscipit laboriosam.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Visi & Misi ─── */
const visiMisiData = [
  {
    icon: Eye,
    title: "Visi",
    description:
      "Mewujudkan Desa [Nama Desa] yang mandiri, sejahtera, dan berbudaya menuju masyarakat yang adil dan makmur.",
    color: "emerald",
  },
  {
    icon: Target,
    title: "Misi 1",
    description:
      "Meningkatkan kualitas pelayanan publik yang transparan, akuntabel, dan responsif terhadap kebutuhan masyarakat.",
    color: "teal",
  },
  {
    icon: Heart,
    title: "Misi 2",
    description:
      "Meningkatkan kesejahteraan masyarakat melalui pemberdayaan ekonomi lokal dan pengembangan potensi desa.",
    color: "cyan",
  },
  {
    icon: Users,
    title: "Misi 3",
    description:
      "Meningkatkan partisipasi masyarakat dalam pembangunan desa melalui musyawarah dan gotong royong.",
    color: "emerald",
  },
  {
    icon: BookOpen,
    title: "Misi 4",
    description:
      "Meningkatkan kualitas sumber daya manusia melalui pendidikan, pelatihan, dan pengembangan keterampilan.",
    color: "teal",
  },
  {
    icon: Landmark,
    title: "Misi 5",
    description:
      "Melestarikan nilai-nilai budaya dan kearifan lokal sebagai identitas dan kebanggaan masyarakat desa.",
    color: "cyan",
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-100 text-emerald-600",
    border: "border-emerald-100 hover:border-emerald-200",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "bg-teal-100 text-teal-600",
    border: "border-teal-100 hover:border-teal-200",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "bg-cyan-100 text-cyan-600",
    border: "border-cyan-100 hover:border-cyan-200",
  },
};

function VisiMisiSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
            Visi & Misi
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Arah dan tujuan pembangunan Desa [Nama Desa] untuk kesejahteraan
            masyarakat.
          </p>
        </motion.div>
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visiMisiData.map((item, index) => {
            const colors = colorClasses[item.color];
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                {...staggerItem}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border ${colors.border} ${colors.bg} transition-all duration-300 cursor-default`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.icon}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Struktur Pemerintahan ─── */
const pemerintahanData = [
  { nama: "[Nama Lengkap]", jabatan: "Kepala Desa" },
  { nama: "[Nama Lengkap]", jabatan: "Sekretaris Desa" },
  { nama: "[Nama Lengkap]", jabatan: "Kaur Keuangan" },
  { nama: "[Nama Lengkap]", jabatan: "Kaur Perencanaan" },
  { nama: "[Nama Lengkap]", jabatan: "Kasi Pemerintahan" },
  { nama: "[Nama Lengkap]", jabatan: "Kasi Kesejahteraan" },
  { nama: "[Nama Lengkap]", jabatan: "Kasi Pelayanan" },
  { nama: "[Nama Lengkap]", jabatan: "Kaur Tata Usaha & Umum" },
];

function PemerintahanSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
            Struktur Pemerintahan Desa
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Perangkat desa yang melayani masyarakat Desa [Nama Desa].
          </p>
        </motion.div>
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pemerintahanData.map((person, index) => (
            <motion.div
              key={index}
              {...staggerItem}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Photo placeholder 16:9 */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-slate-400" />
                </div>
                <span className="text-xs text-slate-400">Foto 16:9</span>
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {index + 1}
                </div>
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold text-slate-800 mb-1">
                  {person.nama}
                </h4>
                <span className="text-sm text-emerald-600 font-medium">
                  {person.jabatan}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Letak Geografis ─── */
const batasDesa = [
  { arah: "Utara", deskripsi: "Desa [Nama Desa A]" },
  { arah: "Selatan", deskripsi: "Desa [Nama Desa B]" },
  { arah: "Timur", deskripsi: "Desa [Nama Desa C]" },
  { arah: "Barat", deskripsi: "Desa [Nama Desa D]" },
];

function GeografiSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
            Letak Geografis
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Informasi wilayah dan batas administratif Desa [Nama Desa].
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Text content */}
          <motion.div {...fadeInUp}>
            <p className="text-slate-600 leading-relaxed mb-6">
              Desa [Nama Desa] terletak di Kecamatan [Nama Kecamatan], Kabupaten
              [Nama Kabupaten], Provinsi [Nama Provinsi]. Desa ini memiliki luas
              wilayah ± [X.XXX] hektar yang terdiri dari area permukiman, lahan
              pertanian, dan kawasan hutan.
            </p>
            <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-500" />
              Batas Wilayah Desa
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {batasDesa.map((batas, index) => (
                <motion.div
                  key={index}
                  {...staggerItem}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                      {batas.arah}
                    </span>
                    <p className="text-sm text-slate-700 font-medium">
                      {batas.deskripsi}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Embedded Map */}
          <motion.div {...fadeInUp}>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                title="Lokasi Desa"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-2.2074%2C53.4791%2C-2.1934%2C53.4871&layer=mapnik&marker=53.4831%2C-2.2004"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function ProfilPage() {
  return (
    <div>
      <HeroSection />
      <SejarahSection />
      <VisiMisiSection />
      <PemerintahanSection />
      <GeografiSection />
    </div>
  );
}
