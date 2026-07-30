import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  UserX,
  Home,
  TrendingUp,
  BarChart3,
  PieChartIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  populationStats,
  genderData,
  religionData,
  educationData,
  occupationData,
} from "../data/demographyData";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/* ─── Summary Cards ─── */
const statCards = [
  {
    label: "Total Penduduk",
    value: populationStats.totalPenduduk.toLocaleString("id-ID"),
    icon: Users,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    label: "Laki-laki",
    value: populationStats.lakiLaki.toLocaleString("id-ID"),
    icon: UserCheck,
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Perempuan",
    value: populationStats.perempuan.toLocaleString("id-ID"),
    icon: UserX,
    color: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    label: "Jumlah KK",
    value: populationStats.jumlahKK.toLocaleString("id-ID"),
    icon: Home,
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
];

function SummaryCards() {
  return (
    <motion.div
      {...staggerContainer}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
    >
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={index}
            {...staggerItem}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bgLight}`}
              >
                <Icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-800 mb-1">
              {card.value}
            </p>
            <p className="text-sm text-slate-500">{card.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ─── Custom Tooltip ─── */
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-100">
        <p className="text-sm font-semibold text-slate-800 mb-1">
          {label || payload[0].name}
        </p>
        {payload.map((item, i) => (
          <p key={i} className="text-sm text-slate-600">
            {item.dataKey === "jumlah" ? "Jumlah" : item.name}:{" "}
            <span className="font-semibold" style={{ color: item.color || item.payload.fill }}>
              {item.value.toLocaleString("id-ID")}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

/* ─── Pie Chart Component ─── */
function DemoPieChart({ data, title, icon: Icon }) {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            animationBegin={0}
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "13px" }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

/* ─── Bar Chart Component ─── */
function DemoBarChart({ data, title, icon: Icon, color = "#10b981" }) {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="jumlah"
            fill={color}
            radius={[6, 6, 0, 0]}
            animationBegin={0}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function DemografiPage() {
  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div {...fadeInUp} className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
              Data & Demografi Penduduk
            </h1>
          </div>
          <p className="text-slate-500 max-w-2xl">
            Dashboard publik data kependudukan Desa [Nama Desa]. Data yang
            ditampilkan merupakan data dummy untuk keperluan mockup.
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="mb-8 lg:mb-12">
          <SummaryCards />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          <DemoPieChart
            data={genderData}
            title="Komposisi Jenis Kelamin"
            icon={PieChartIcon}
          />
          <DemoPieChart
            data={religionData}
            title="Komposisi Agama"
            icon={PieChartIcon}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <DemoBarChart
            data={educationData}
            title="Tingkat Pendidikan"
            icon={BarChart3}
            color="#10b981"
          />
          <DemoBarChart
            data={occupationData}
            title="Mata Pencaharian"
            icon={BarChart3}
            color="#6366f1"
          />
        </div>
      </div>
    </div>
  );
}
