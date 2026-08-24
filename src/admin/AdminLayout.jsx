import { useState } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Clock,
  Eye,
  Users,
  Download,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
} from "lucide-react";

const sidebarLinks = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/profil", label: "Profil Desa", icon: FileText },
  { path: "/admin/timeline", label: "Kepala Desa", icon: Clock },
  { path: "/admin/visi-misi", label: "Visi & Misi", icon: Eye },
  { path: "/admin/pemerintahan", label: "Pemerintahan", icon: Users },
  { path: "/admin/unduhan", label: "Pusat Unduhan", icon: Download },
  { path: "/admin/footer", label: "Footer", icon: Settings },
];

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (link) => {
    if (link.exact) return location.pathname === link.path;
    return location.pathname.startsWith(link.path);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-100">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Admin Panel</p>
            <p className="text-xs text-slate-400">Desa Kliris</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-emerald-600" : "text-slate-400"}`} />
                {link.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-emerald-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Settings + Sign Out */}
        <div className="px-3 py-4 border-t border-slate-100 space-y-1">
          <Link
            to="/admin/settings"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              location.pathname === "/admin/settings"
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Settings className={`w-4 h-4 ${location.pathname === "/admin/settings" ? "text-emerald-600" : "text-slate-400"}`} />
            Pengaturan
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 lg:px-8 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-emerald-700">
                {user.email?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
            <span className="hidden sm:block text-sm text-slate-600 truncate max-w-[200px]">
              {user.email}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
