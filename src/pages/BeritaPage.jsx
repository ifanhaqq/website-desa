import { useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  Calendar,
  Tag,
  Clock,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import { featuredArticle, articles } from "../data/newsData";

const ITEMS_PER_PAGE = 6;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/* ─── Featured Article ─── */
function FeaturedArticle() {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Placeholder 16:9 */}
        <div className="relative aspect-video bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 flex flex-col items-center justify-center overflow-hidden">
          <ImageIcon className="w-12 h-12 text-white/30 mb-2" />
          <span className="text-white/40 text-sm font-medium">
            Gambar Utama 16:9
          </span>
          {/* Decorative */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,.15) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>
          {/* Featured badge */}
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
            ⭐ Berita Utama
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
              {featuredArticle.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {featuredArticle.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {featuredArticle.readTime}
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors leading-tight">
            {featuredArticle.title}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {featuredArticle.excerpt}
          </p>
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Article Card ─── */
function ArticleCard({ article }) {
  return (
    <motion.div
      {...staggerItem}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
    >
      {/* Thumbnail 16:9 */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex flex-col items-center justify-center overflow-hidden">
        <ImageIcon className="w-8 h-8 text-slate-400 mb-1" />
        <span className="text-xs text-slate-400">Thumbnail 16:9</span>
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <Tag className="w-3 h-3" />
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
        </div>
        <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Pagination ─── */
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.div
      {...fadeInUp}
      className="flex items-center justify-center gap-2 mt-10"
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
            currentPage === page
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function BeritaPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div {...fadeInUp} className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
              Berita & Informasi Publik
            </h1>
          </div>
          <p className="text-slate-500 max-w-2xl">
            Informasi terkini seputar kegiatan dan pembangunan Desa [Nama Desa].
          </p>
        </motion.div>

        {/* Featured Article */}
        <div className="mb-8 lg:mb-12">
          <FeaturedArticle />
        </div>

        {/* Article Grid */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
