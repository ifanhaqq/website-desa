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
  Crown,
  Quote,
  Droplets,
  Calendar,
} from "lucide-react";

import { useSiteSettings } from "../hooks/useSiteSettings";
import { useTimeline } from "../hooks/useTimeline";
import { useVisiMisi } from "../hooks/useVisiMisi";
import { usePemerintahan } from "../hooks/usePemerintahan";

import BgHeroFallback from "../assets/img/hero.webp";

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

/* ─── Skeleton Loader ─── */
function SectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4 py-8">
      <div className="h-6 bg-slate-200 rounded-lg w-1/3 mx-auto" />
      <div className="h-4 bg-slate-200 rounded-lg w-1/2 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="h-32 bg-slate-100 rounded-2xl" />
        <div className="h-32 bg-slate-100 rounded-2xl" />
      </div>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ settings }) {
  const heroImage = settings?.hero_image_url || BgHeroFallback;
  const titleLine1 = settings?.hero_title_line1 || "Selamat Datang di";
  const titleLine2 = settings?.hero_title_line2 || "Desa Kliris";
  const subtitle = settings?.hero_subtitle || "Kecamatan Boja, Kabupaten Kendal, Provinsi Jawa Tengah";

  return (
    <section className="relative w-full aspect-video max-h-[70vh] overflow-hidden">
      {/* Hero Background Image */}
      <img
        src={heroImage}
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
            {titleLine1}
            <br />
            <span className="text-emerald-300">{titleLine2}</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
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
function SejarahSection({ settings, timeline }) {
  const quote = settings?.sejarah_quote || 'Desa Kliris berasal dari kata "TIRIS" yang dilambangkan di Makam Sokorini';
  const quoteSubheading = settings?.sejarah_quote_subheading || "Sumber Air Kehidupan";
  const p1 = settings?.sejarah_paragraph_1 || "";
  const p2 = settings?.sejarah_paragraph_2 || "";
  const p3 = settings?.sejarah_paragraph_3 || "";

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50/60 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div {...fadeInUp} className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
            Sejarah Desa Kliris
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Menelusuri jejak sejarah dan perjalanan panjang Desa Kliris dari masa ke masa.
          </p>
        </motion.div>

        {/* Origin Story Card */}
        <motion.div
          {...fadeInUp}
          className="mb-16 lg:mb-20"
        >
          <div className="relative bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Green accent top bar */}
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Left: Quote highlight */}
              <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,.2) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                </div>
                <div className="relative">
                  <Quote className="w-10 h-10 text-white/30 mb-4 rotate-180" />
                  <blockquote className="text-lg lg:text-xl font-semibold text-white leading-relaxed mb-4">
                    {quote}
                  </blockquote>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Droplets className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">
                        {quoteSubheading}
                      </p>
                      <p className="text-emerald-200/70 text-xs">
                        Asal mula nama Desa Kliris
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Story content */}
              <div className="lg:col-span-3 p-8 lg:p-10">
                <div className="space-y-5 text-slate-600 leading-relaxed text-sm lg:text-base">
                  {p1 && <p>{p1}</p>}
                  {p2 && <p>{p2}</p>}
                  {p3 && <p>{p3}</p>}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Leadership Timeline */}
        {timeline.length > 0 && (
          <>
            <motion.div {...fadeInUp} className="mb-4">
              <div className="text-center mb-10 lg:mb-12">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
                  Perjalanan Kepemimpinan Desa
                </h3>
                <p className="text-slate-500 max-w-lg mx-auto">
                  Dari era Demang hingga saat ini, Desa Kliris telah dipimpin oleh pemimpin-pemimpin yang berdedikasi.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line — desktop center, mobile left */}
              <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-200 lg:-translate-x-px" />

              <div className="space-y-6 lg:space-y-8">
                {timeline.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`relative flex items-start gap-4 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                        }`}
                    >
                      {/* Mobile dot */}
                      <div className="lg:hidden relative z-10 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Content card */}
                      <div className={`flex-1 lg:w-[calc(50%-2rem)] ${isLeft ? "lg:pr-12" : "lg:pl-12"
                        }`}>
                        <div className="group bg-white rounded-2xl border border-slate-100 p-5 lg:p-6 shadow-sm hover:shadow-lg hover:border-emerald-100 transition-all duration-300">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="hidden sm:flex w-12 h-12 bg-emerald-50 rounded-xl items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                              <Crown className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                                <Calendar className="w-3 h-3" />
                                {item.periode}
                              </span>
                              <h4 className="font-semibold text-slate-800 text-base lg:text-lg mb-1">
                                {item.nama}
                              </h4>
                              <p className="text-sm text-slate-500 leading-relaxed">
                                {item.keterangan}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop center dot */}
                      <div className="hidden lg:flex absolute left-1/2 top-5 -translate-x-1/2 z-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25 ring-4 ring-white">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                      </div>

                      {/* Spacer for the other side on desktop */}
                      <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ─── Visi & Misi ─── */
const visiMisiIcons = [Eye, Target, Heart, Users, BookOpen, Landmark, Sparkles];
const visiMisiColors = ["emerald", "teal", "cyan", "emerald", "teal", "cyan", "emerald"];

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

function VisiMisiSection({ visiMisi }) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
            Visi & Misi
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Arah dan tujuan pembangunan Desa Kliris untuk kesejahteraan
            masyarakat.
          </p>
        </motion.div>
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visiMisi.map((item, index) => {
            const colorKey = visiMisiColors[index % visiMisiColors.length];
            const colors = colorClasses[colorKey];
            const Icon = visiMisiIcons[index % visiMisiIcons.length];
            return (
              <motion.div
                key={item.id}
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
function PemerintahanSection({ pemerintahan }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
            Struktur Pemerintahan Desa
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Perangkat desa yang melayani masyarakat Desa Kliris.
          </p>
        </motion.div>
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pemerintahan.map((person, index) => (
            <motion.div
              key={person.id}
              {...staggerItem}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Photo or placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center overflow-hidden">
                {person.foto_url ? (
                  <img
                    src={person.foto_url}
                    alt={person.nama}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center mb-2">
                      <Users className="w-8 h-8 text-slate-400" />
                    </div>
                    <span className="text-xs text-slate-400">Foto Perangkat Desa</span>
                  </>
                )}
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
function GeografiSection({ settings }) {
  const description = settings?.geografi_description || "";
  const mapUrl = settings?.geografi_map_url || "https://www.openstreetmap.org/export/embed.html?bbox=110.3136%2C-7.1238%2C110.3336%2C-7.1038&layer=mapnik&marker=-7.1138%2C110.3236";
  const batasDesa = [
    { arah: "Utara", deskripsi: settings?.batas_utara || "" },
    { arah: "Selatan", deskripsi: settings?.batas_selatan || "" },
    { arah: "Timur", deskripsi: settings?.batas_timur || "" },
    { arah: "Barat", deskripsi: settings?.batas_barat || "" },
  ].filter((b) => b.deskripsi);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
            Letak Geografis
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Informasi wilayah dan batas administratif Desa Kliris.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Text content */}
          <motion.div {...fadeInUp}>
            {description && (
              <p className="text-slate-600 leading-relaxed mb-6">
                {description}
              </p>
            )}
            {batasDesa.length > 0 && (
              <>
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
              </>
            )}
          </motion.div>

          {/* Embedded Map */}
          <motion.div {...fadeInUp}>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                title="Lokasi Desa Kliris"
                src={mapUrl}
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
  const { settings, loading: settingsLoading } = useSiteSettings();
  const { timeline, loading: timelineLoading } = useTimeline();
  const { visiMisi, loading: visiMisiLoading } = useVisiMisi();
  const { pemerintahan, loading: pemerintahanLoading } = usePemerintahan();

  const isLoading = settingsLoading || timelineLoading || visiMisiLoading || pemerintahanLoading;

  return (
    <div>
      <HeroSection settings={settings} />
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionSkeleton />
          <SectionSkeleton />
          <SectionSkeleton />
        </div>
      ) : (
        <>
          <SejarahSection settings={settings} timeline={timeline} />
          {visiMisi.length > 0 && <VisiMisiSection visiMisi={visiMisi} />}
          {pemerintahan.length > 0 && <PemerintahanSection pemerintahan={pemerintahan} />}
          <GeografiSection settings={settings} />
        </>
      )}
    </div>
  );
}
