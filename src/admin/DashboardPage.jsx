import { Link } from "react-router-dom";
import {
  FileText,
  Clock,
  Eye,
  Users,
  Download,
  Settings,
  ArrowRight,
  Globe,
} from "lucide-react";

const sections = [
  {
    title: "Profil Desa",
    description: "Edit hero, sejarah desa, dan letak geografis",
    icon: FileText,
    path: "/admin/profil",
    color: "emerald",
  },
  {
    title: "Kepala Desa",
    description: "Kelola timeline kepala desa dari masa ke masa",
    icon: Clock,
    path: "/admin/timeline",
    color: "blue",
  },
  {
    title: "Visi & Misi",
    description: "Edit visi dan kelola daftar misi desa",
    icon: Eye,
    path: "/admin/visi-misi",
    color: "purple",
  },
  {
    title: "Pemerintahan",
    description: "Kelola data perangkat desa dan foto profil",
    icon: Users,
    path: "/admin/pemerintahan",
    color: "amber",
  },
  {
    title: "Pusat Unduhan",
    description: "Kelola file formulir Excel untuk diunduh warga",
    icon: Download,
    path: "/admin/unduhan",
    color: "teal",
  },
  {
    title: "Footer",
    description: "Edit kontak desa dan jam layanan",
    icon: Settings,
    path: "/admin/footer",
    color: "slate",
  },
];

const colorMap = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-100 text-emerald-600",
    hover: "hover:border-emerald-200",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-100 text-blue-600",
    hover: "hover:border-blue-200",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-purple-100 text-purple-600",
    hover: "hover:border-purple-200",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "bg-amber-100 text-amber-600",
    hover: "hover:border-amber-200",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "bg-teal-100 text-teal-600",
    hover: "hover:border-teal-200",
  },
  slate: {
    bg: "bg-slate-50",
    icon: "bg-slate-100 text-slate-600",
    hover: "hover:border-slate-200",
  },
};

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Kelola konten website Desa Kliris dari panel admin ini.
        </p>
      </div>

      {/* Quick Link: View Site */}
      <Link
        to="/"
        target="_blank"
        className="inline-flex items-center gap-2 bg-white border border-slate-200 text-sm text-slate-600 font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all mb-8"
      >
        <Globe className="w-4 h-4 text-emerald-500" />
        Lihat Website
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>

      {/* Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const colors = colorMap[section.color];
          return (
            <Link
              key={section.path}
              to={section.path}
              className={`group bg-white rounded-2xl border border-slate-200 p-6 ${colors.hover} hover:shadow-md transition-all duration-300`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colors.icon}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                {section.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {section.description}
              </p>
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Kelola
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
