import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProfilPage from "./pages/ProfilPage";
import DemografiPage from "./pages/DemografiPage";
import BeritaPage from "./pages/BeritaPage";
import LayananPage from "./pages/LayananPage";

// Admin pages
import AdminLayout from "./admin/AdminLayout";
import LoginPage from "./admin/LoginPage";
import DashboardPage from "./admin/DashboardPage";
import ProfilEditor from "./admin/ProfilEditor";
import TimelineEditor from "./admin/TimelineEditor";
import VisiMisiEditor from "./admin/VisiMisiEditor";
import PemerintahanEditor from "./admin/PemerintahanEditor";
import DownloadEditor from "./admin/DownloadEditor";
import FooterEditor from "./admin/FooterEditor";
import SettingsPage from "./admin/SettingsPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<ProfilPage />} />
          <Route path="/demografi" element={<DemografiPage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/layanan" element={<LayananPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profil" element={<ProfilEditor />} />
          <Route path="timeline" element={<TimelineEditor />} />
          <Route path="visi-misi" element={<VisiMisiEditor />} />
          <Route path="pemerintahan" element={<PemerintahanEditor />} />
          <Route path="unduhan" element={<DownloadEditor />} />
          <Route path="footer" element={<FooterEditor />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
