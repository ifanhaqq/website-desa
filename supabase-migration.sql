-- =============================================
-- Website Desa Kliris — Supabase Migration
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)
-- =============================================

-- ─── 1. TABLES ───

-- Site Settings (single row for all static content)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title_line1 TEXT DEFAULT 'Selamat Datang di',
  hero_title_line2 TEXT DEFAULT 'Desa Kliris',
  hero_subtitle TEXT DEFAULT 'Kecamatan Boja, Kabupaten Kendal, Provinsi Jawa Tengah',
  hero_image_url TEXT,
  sejarah_quote TEXT,
  sejarah_quote_subheading TEXT DEFAULT 'Sumber Air Kehidupan',
  sejarah_paragraph_1 TEXT,
  sejarah_paragraph_2 TEXT,
  sejarah_paragraph_3 TEXT,
  geografi_description TEXT,
  geografi_map_url TEXT,
  batas_utara TEXT,
  batas_selatan TEXT,
  batas_timur TEXT,
  batas_barat TEXT,
  kontak_alamat TEXT,
  kontak_telepon TEXT,
  kontak_email TEXT,
  jam_layanan TEXT DEFAULT 'Senin - Jumat: 09.00 - 14.00',
  jam_keterangan_libur TEXT DEFAULT 'Akhir Pekan Tutup',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kepala Desa Timeline
CREATE TABLE IF NOT EXISTS kepala_desa_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  periode TEXT NOT NULL,
  keterangan TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Visi & Misi
CREATE TABLE IF NOT EXISTS visi_misi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('visi', 'misi')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Struktur Pemerintahan
CREATE TABLE IF NOT EXISTS pemerintahan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  foto_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Download Files
CREATE TABLE IF NOT EXISTS download_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  filename TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ─── 2. ROW LEVEL SECURITY ───

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE kepala_desa_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE visi_misi ENABLE ROW LEVEL SECURITY;
ALTER TABLE pemerintahan ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_files ENABLE ROW LEVEL SECURITY;

-- Public read access (SELECT) for all tables
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read kepala_desa_timeline" ON kepala_desa_timeline FOR SELECT USING (true);
CREATE POLICY "Public read visi_misi" ON visi_misi FOR SELECT USING (true);
CREATE POLICY "Public read pemerintahan" ON pemerintahan FOR SELECT USING (true);
CREATE POLICY "Public read download_files" ON download_files FOR SELECT USING (true);

-- Authenticated write access (INSERT, UPDATE, DELETE) for all tables
CREATE POLICY "Auth insert site_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update site_settings" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete site_settings" ON site_settings FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert kepala_desa_timeline" ON kepala_desa_timeline FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update kepala_desa_timeline" ON kepala_desa_timeline FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete kepala_desa_timeline" ON kepala_desa_timeline FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert visi_misi" ON visi_misi FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update visi_misi" ON visi_misi FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete visi_misi" ON visi_misi FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert pemerintahan" ON pemerintahan FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update pemerintahan" ON pemerintahan FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete pemerintahan" ON pemerintahan FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert download_files" ON download_files FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update download_files" ON download_files FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete download_files" ON download_files FOR DELETE TO authenticated USING (true);


-- ─── 3. STORAGE BUCKETS ───

INSERT INTO storage.buckets (id, name, public) VALUES ('hero-images', 'hero-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('staff-photos', 'staff-photos', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('download-files', 'download-files', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read
CREATE POLICY "Public read hero-images" ON storage.objects FOR SELECT USING (bucket_id = 'hero-images');
CREATE POLICY "Public read staff-photos" ON storage.objects FOR SELECT USING (bucket_id = 'staff-photos');
CREATE POLICY "Public read download-files" ON storage.objects FOR SELECT USING (bucket_id = 'download-files');

-- Storage policies: authenticated upload/delete
CREATE POLICY "Auth upload hero-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hero-images');
CREATE POLICY "Auth update hero-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'hero-images');
CREATE POLICY "Auth delete hero-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'hero-images');

CREATE POLICY "Auth upload staff-photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'staff-photos');
CREATE POLICY "Auth update staff-photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'staff-photos');
CREATE POLICY "Auth delete staff-photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'staff-photos');

CREATE POLICY "Auth upload download-files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'download-files');
CREATE POLICY "Auth update download-files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'download-files');
CREATE POLICY "Auth delete download-files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'download-files');


-- ─── 4. SEED DATA ───

-- Site Settings (single row)
INSERT INTO site_settings (
  hero_title_line1, hero_title_line2, hero_subtitle,
  sejarah_quote, sejarah_quote_subheading,
  sejarah_paragraph_1, sejarah_paragraph_2, sejarah_paragraph_3,
  geografi_description, geografi_map_url,
  batas_utara, batas_selatan, batas_timur, batas_barat,
  kontak_alamat, kontak_telepon, kontak_email,
  jam_layanan, jam_keterangan_libur
) VALUES (
  'Selamat Datang di',
  'Desa Kliris',
  'Kecamatan Boja, Kabupaten Kendal, Provinsi Jawa Tengah',
  'Desa Kliris berasal dari kata "TIRIS" yang dilambangkan di Makam Sokorini',
  'Sumber Air Kehidupan',
  'Berdasarkan cerita penggalan-penggalan sejarah yang diceritakan oleh sesepuh masyarakat Desa Kliris, berhasil dirangkum cerita sejarah singkat. Sesungguhnya Desa Kliris berasal dari kata "TIRIS" yang dilambangkan di Makam Sokorini — ada sebuah batu berlambang (gumukan kecil) yang konon dulunya bisa memancarkan air.',
  'Dalam bahasa Jawa dinamakan "TIRIS", dan dari pancaran air tersebut dipercaya bisa memakmurkan suatu wilayah. Apabila air tersebut memancar ke arah utara, maka wilayah itu akan menjadi makmur, dan seterusnya.',
  'Di samping "TIRIS", di dekatnya ada seperangkat alat gamelan. Konon kabarnya, bilamana alat tersebut mau dipinjam oleh masyarakat, harus dengan cara selamatan di makam tersebut, maka peralatan tersebut akan muncul. Sekarang tinggal puing-puing yang berupa batu.',
  'Desa Kliris merupakan salah satu desa yang berada di Kecamatan Boja, Kabupaten Kendal, Provinsi Jawa Tengah. Desa ini memiliki letak yang strategis karena berada di jalur Jalan Raya Bubakan–Gonoharjo Limbangan dan Pasigitan–Boja. Secara topografi, Desa Kliris berada di wilayah pegunungan dengan ketinggian sekitar 635 meter di atas permukaan laut, suhu rata-rata 22–27°C, serta curah hujan sekitar 1.823 mm/tahun. Sebagian besar wilayah desa dimanfaatkan untuk lahan pertanian, permukiman, dan perkebunan sehingga mayoritas penduduk bekerja sebagai petani, buruh tani, buruh bangunan, dan buruh industri. Luas wilayah ± 264,829 hektar.',
  'https://www.openstreetmap.org/export/embed.html?bbox=110.3136%2C-7.1238%2C110.3336%2C-7.1038&layer=mapnik&marker=-7.1138%2C110.3236',
  'Desa Bubakan, Kecamatan Mijen, Kota Semarang',
  'Desa Puguh, Kecamatan Boja',
  'Desa Leban dan Desa Pasigitan, Kecamatan Boja',
  'Desa Ngabean, Kecamatan Boja',
  'Jl. Sokorini No. 01, Dsn. Krajan Rt.01 Rw.01, Desa Kliris, Kec. Boja, Kendal',
  '-',
  'desakliris001@gmail.com',
  'Senin - Jumat: 09.00 - 14.00',
  'Akhir Pekan Tutup'
);

-- Kepala Desa Timeline
INSERT INTO kepala_desa_timeline (nama, periode, keterangan, sort_order) VALUES
  ('Demang Umbul', 'Era Demang', 'Pimpinan pertama Desa Kliris dengan jabatan Demang.', 0),
  ('Bapak Soetarjo', '1938 – 1952', 'Kepala Desa pertama setelah era Demang.', 1),
  ('Bapak Meru Sammusi', '1952 – 1960', 'Melanjutkan kepemimpinan Desa Kliris.', 2),
  ('Bapak Sukardi Admowiyoto', '1960 – 1982', 'Memulai pembenahan pembangunan, bahkan merelakan harta pribadi demi kemajuan desa.', 3),
  ('Ibu Hartini S', '1982 – 1990', 'Melanjutkan administrasi dari era sebelumnya.', 4),
  ('Bapak Kiswanto', '1990 – 1998', 'Terpilih melalui pemilihan Kepala Desa.', 5),
  ('Ibu Hartini S', '1998 – 2007', 'Kembali menjabat sebagai Kepala Desa.', 6),
  ('Bapak Harsono', '2007 – 2020', 'Menjabat dua periode kepemimpinan.', 7),
  ('Ibu Dwi Mayanti Intansih', '2020 – Sekarang', 'Kepala Desa Kliris saat ini.', 8);

-- Visi & Misi
INSERT INTO visi_misi (type, title, description, sort_order) VALUES
  ('visi', 'Visi', '"Kebersamaan Dalam Membangun demi Desa Kliris Yang Lebih Maju" — Bersatu Membangun Desa Kliris menjadi Desa yang lebih baik, maju, sejahtera, dan bermartabat.', 0),
  ('misi', 'Misi 1', 'Meningkatkan pembangunan infrastruktur yang mendukung pereknomian desa seperti jalan, jembatan, serta infrastruktur strategis lainnya.', 1),
  ('misi', 'Misi 2', 'Meningkatkan pembangunan di bidang kesehatan untuk mendorong derajat kesehatan masyarakat agar dapat berkerja lebih optimal dan memiliki harapan hidup yang lebih panjang.', 2),
  ('misi', 'Misi 3', 'Meningkatkan pembangunan di bidang pendidikan untuk mendorong peningkatan kualitas sumber daya manusia agar memiliki kecerdasan dan daya saing yang lebih baik.', 3),
  ('misi', 'Misi 4', 'Meningkatkan pembangunan ekonomi mendorong semakin tumbuh dan berkembangnya pembangunna di bidang pertanian dalam arti luas, industri, perdagangan, dan pariwisata.', 4),
  ('misi', 'Misi 5', 'Menciptakan tata kelola pemerintahan yang baik (good govermence) berdasarkan demokratisasi, transparansi, penegakan hukum, berkeadilan, kesetaraan gender, dan mengutamakan pelyanan kepada masyarakat.', 5),
  ('misi', 'Misi 6', 'Mengupayakan pelestarian sumber daya alam untuk memenuhi kebutuhan dan pemerataan pembangunan guna meningkatkan perekonomian.', 6);

-- Struktur Pemerintahan
INSERT INTO pemerintahan (nama, jabatan, sort_order) VALUES
  ('Dwi Mayanti Intansih', 'Kepala Desa', 0),
  ('Mudiyono, S.Pd', 'Sekretaris Desa', 1),
  ('Puji Prihartono', 'Kaur Keuangan', 2),
  ('Purnomo', 'Kaur Perencanaan', 3),
  ('Warsito', 'Kaur Tata Usaha & Umum', 4),
  ('Abdul Rohman', 'Kasi Kesejahteraan', 5),
  ('Sukamto', 'Kasi Pemerintahan', 6),
  ('Muchyidin', 'Kasi Pelayanan', 7),
  ('Bunak Yanto', 'Kadus I', 8),
  ('Siti Chotidjah', 'Kadus II', 9),
  ('Tukiyatman', 'Kadus III', 10),
  ('Sulistiyono', 'Kadus IV', 11),
  ('Muhamad Saefudin', 'Kadus V', 12);
