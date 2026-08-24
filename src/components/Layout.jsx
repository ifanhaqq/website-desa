import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";
import LogoKliris from "../assets/img/logo-kliris.webp";
import { useSiteSettings } from "../hooks/useSiteSettings";

const navLinks = [
  { path: "/", label: "Profil Desa" },
  { path: "/layanan", label: "Layanan" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10">
              <img src={LogoKliris} alt="" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-800 tracking-tight">
                Desa
              </span>
              <span className="text-lg font-bold text-emerald-600 tracking-tight ml-1">
                Kliris
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-500 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-b border-emerald-100"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50"
                      }`}
                  >
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${isActive ? "text-emerald-500" : "text-slate-400"
                        }`}
                    />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer({ settings }) {
  const alamat = settings?.kontak_alamat || "Jl. Sokorini No. 01, Dsn. Krajan Rt.01 Rw.01, Desa Kliris, Kec. Boja, Kendal";
  const telepon = settings?.kontak_telepon || "-";
  const email = settings?.kontak_email || "desakliris001@gmail.com";
  const jamLayanan = settings?.jam_layanan || "Senin - Jumat: 09.00 - 14.00";
  const ketLibur = settings?.jam_keterangan_libur || "Akhir Pekan Tutup";

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Top gradient border */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10">
                <img src={LogoKliris} alt="" />
              </div>
              <span className="text-lg font-bold text-white">
                Desa Kliris
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Website resmi Desa Kliris, Kecamatan Boja,
              Kabupaten Kendal, Provinsi Jawa Tengah.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{alamat}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{telepon}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>

          {/* Jam Layanan */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Jam Layanan
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{jamLayanan}</span>
              </li>

              <li className="text-sm text-slate-500">
                {ketLibur}
              </li>
            </ul>
          </div>

          {/* Tautan */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tautan
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Desa Kliris. Seluruh hak
            cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { settings } = useSiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer settings={settings} />
    </div>
  );
}
