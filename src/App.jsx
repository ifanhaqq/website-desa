import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProfilPage from "./pages/ProfilPage";
import DemografiPage from "./pages/DemografiPage";
import BeritaPage from "./pages/BeritaPage";
import LayananPage from "./pages/LayananPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route path="/" element={<ProfilPage />} />
        <Route path="/demografi" element={<DemografiPage />} />
        <Route path="/berita" element={<BeritaPage />} />
        <Route path="/layanan" element={<LayananPage />} />
      </Route>
    </Routes>
  );
}

export default App;
