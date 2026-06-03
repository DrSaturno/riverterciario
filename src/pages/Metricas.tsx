import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type Rango = "hoy" | "7d" | "15d" | "30d" | "custom";

const HOY_DATA = [
  { hora: "08hs", convs: 4, tokens: 2800, costo: 0.0011 },
  { hora: "09hs", convs: 8, tokens: 5600, costo: 0.0022 },
  { hora: "10hs", convs: 12, tokens: 8400, costo: 0.0034 },
  { hora: "11hs", convs: 18, tokens: 12600, costo: 0.0051 },
  { hora: "12hs", convs: 22, tokens: 15400, costo: 0.0062 },
  { hora: "13hs", convs: 16, tokens: 11200, costo: 0.0045 },
  { hora: "14hs", convs: 24, tokens: 16800, costo: 0.0067 },
  { hora: "15hs", convs: 20, tokens: 14000, costo: 0.0056 },
  { hora: "16hs", convs: 15, tokens: 10500, costo: 0.0042 },
  { hora: "17hs", convs: 19, tokens: 13300, costo: 0.0053 },
];

const DAILY_7 = [
  { fecha: "27/05", convs: 18, respuestas: 64, tokens: 12400, costo: 0.0050 },
  { fecha: "28/05", convs: 24, respuestas: 89, tokens: 17200, costo: 0.0069 },
  { fecha: "29/05", convs: 21, respuestas: 76, tokens: 14800, costo: 0.0059 },
  { fecha: "30/05", convs: 31, respuestas: 112, tokens: 21600, costo: 0.0086 },
  { fecha: "31/05", convs: 28, respuestas: 98, tokens: 18900, costo: 0.0076 },
  { fecha: "01/06", convs: 35, respuestas: 128, tokens: 24700, costo: 0.0099 },
  { fecha: "02/06", convs: 29, respuestas: 104, tokens: 20100, costo: 0.0080 },
];

const DAILY_15 = [
  { fecha: "18/05", convs: 14, respuestas: 51, tokens: 9800, costo: 0.0039 },
  { fecha: "19/05", convs: 19, respuestas: 68, tokens: 13300, costo: 0.0053 },
  { fecha: "20/05", convs: 22, respuestas: 79, tokens: 15400, costo: 0.0062 },
  { fecha: "21/05", convs: 16, respuestas: 57, tokens: 11200, costo: 0.0045 },
  { fecha: "22/05", convs: 25, respuestas: 91, tokens: 17500, costo: 0.0070 },
  { fecha: "23/05", convs: 20, respuestas: 72, tokens: 14000, costo: 0.0056 },
  { fecha: "24/05", convs: 17, respuestas: 61, tokens: 11900, costo: 0.0048 },
  ...DAILY_7,
];

const DAILY_30 = [
  ...Array.from({ length: 15 }, (_, i) => ({
    fecha: `${3 + i}/05`, convs: Math.floor(10 + Math.random() * 20),
    respuestas: Math.floor(35 + Math.random() * 60), tokens: Math.floor(7000 + Math.random() * 15000),
    costo: parseFloat((0.003 + Math.random() * 0.006).toFixed(4)),
  })),
  ...DAILY_15,
];

const TOPICS_DATA = [
  { topic: "Carreras", count: 58 },
  { topic: "Inscripción", count: 42 },
  { topic: "Modalidad", count: 31 },
  { topic: "Aranceles", count: 24 },
  { topic: "Fechas 2026", count: 18 },
  { topic: "Contacto", count: 12 },
];

const DATA_MAP: Record<Rango, typeof DAILY_7> = {
  hoy: HOY_DATA as any,
  "7d": DAILY_7,
  "15d": DAILY_15,
  "30d": DAILY_30,
  custom: DAILY_7,
};

const KEY_MAP: Record<Rango, string> = {
  hoy: "hora",
  "7d": "fecha",
  "15d": "fecha",
  "30d": "fecha",
  custom: "fecha",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-navy-900 border border-navy-500 rounded-lg px-3 py-2 text-xs shadow-lg">
        <p className="text-white/50 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">{p.name}: {typeof p.value === "number" && p.value < 1 ? `$${p.value.toFixed(4)}` : p.value.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

const RANGOS: { key: Rango; label: string }[] = [
  { key: "hoy", label: "Hoy" },
  { key: "7d", label: "7 días" },
  { key: "15d", label: "15 días" },
  { key: "30d", label: "30 días" },
  { key: "custom", label: "Personalizado" },
];

export default function Metricas() {
  const [rango, setRango] = useState<Rango>("7d");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const data = DATA_MAP[rango];
  const xKey = KEY_MAP[rango];

  const totals = data.reduce((a: any, d: any) => ({
    convs: (a.convs || 0) + (d.convs || 0),
    respuestas: (a.respuestas || 0) + (d.respuestas || 0),
    tokens: (a.tokens || 0) + (d.tokens || 0),
    costo: parseFloat(((a.costo || 0) + (d.costo || 0)).toFixed(4)),
  }), {});

  const avgResolucion = 87;
  const avgTiempo = "1.4 min";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-navy-500 bg-navy-900 px-6 py-4 flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Métricas</h1>
          <p className="text-xs text-white/50 mt-0.5">Actividad histórica del bot CET River Plate</p>
        </div>
        <div className="flex items-center gap-2 bg-navy-800 border border-navy-500 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-green-400">Bot CET · Activo</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-navy-800">

        {/* Filter row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-white/40 font-semibold uppercase tracking-wider">Período:</span>
          {RANGOS.map((r) => (
            <button
              key={r.key}
              onClick={() => setRango(r.key)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition ${
                rango === r.key
                  ? "border-river-red bg-river-red/15 text-river-red"
                  : "border-navy-500 text-white/50 hover:text-white"
              }`}
            >
              {r.label}
            </button>
          ))}
          {rango === "custom" && (
            <div className="flex items-center gap-2 ml-2">
              <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)}
                className="bg-navy-700 border border-navy-500 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-river-red" />
              <span className="text-white/30 text-xs">→</span>
              <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)}
                className="bg-navy-700 border border-navy-500 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-river-red" />
            </div>
          )}
          <div className="ml-auto flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg border border-navy-500 text-white/40 hover:text-green-400 hover:border-green-700 transition">↓ CSV</button>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-navy-500 text-white/40 hover:text-red-400 hover:border-red-700 transition">↓ PDF</button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <MetCard label="Conversaciones" value={totals.convs?.toLocaleString()} icon="💬" color="river" />
          <MetCard label="Respuestas bot" value={totals.respuestas?.toLocaleString()} icon="🤖" color="blue" />
          <MetCard label="Tasa resolución" value={`${avgResolucion}%`} icon="✅" color="green" />
          <MetCard label="Tiempo promedio" value={avgTiempo} icon="⏱️" color="purple" />
          <MetCard label="Tokens usados" value={`${(totals.tokens / 1000).toFixed(1)}k`} icon="🔤" color="amber" />
          <MetCard label="Costo estimado" value={`$${totals.costo?.toFixed(4)}`} icon="💰" color="emerald" />
        </div>

        {/* Charts row 1: conversaciones + tokens */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="card p-5">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Conversaciones por {rango === "hoy" ? "hora" : "día"}</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8102E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C8102E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3360" />
                <XAxis dataKey={xKey} tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="convs" name="convs" stroke="#C8102E" strokeWidth={2} fill="url(#convGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-5">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Tokens utilizados por {rango === "hoy" ? "hora" : "día"}</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="tokenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3360" />
                <XAxis dataKey={xKey} tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="tokens" name="tokens" stroke="#f59e0b" strokeWidth={2} fill="url(#tokenGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts row 2: costo + temas */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="card p-5">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Costo estimado por {rango === "hoy" ? "hora" : "día"} (USD)</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3360" />
                <XAxis dataKey={xKey} tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v.toFixed(3)}`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="costo" name="costo" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-5">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Temas más consultados</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={TOPICS_DATA} layout="vertical">
                <XAxis type="number" tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="topic" tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} width={75} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="count" name="consultas" fill="#C8102E" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detail table */}
        <div className="card overflow-hidden">
          <div className="px-5 py-3 border-b border-navy-500">
            <p className="text-sm font-semibold text-white">Detalle por {rango === "hoy" ? "hora" : "día"}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-navy-500">
                <tr>
                  {[rango === "hoy" ? "Hora" : "Fecha", "Conversaciones", "Respuestas bot", "Tokens usados", "Costo estimado"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((d: any) => (
                  <tr key={d[xKey]} className="border-b border-navy-500 last:border-0 hover:bg-navy-700/30 transition">
                    <td className="px-5 py-3 text-white font-semibold">{d[xKey]}</td>
                    <td className="px-5 py-3 text-river-red font-semibold">{d.convs}</td>
                    <td className="px-5 py-3 text-blue-300">{d.respuestas || "—"}</td>
                    <td className="px-5 py-3 text-amber-300 font-mono">{d.tokens?.toLocaleString()}</td>
                    <td className="px-5 py-3 text-green-400 font-mono">${d.costo?.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-navy-500">
                <tr>
                  <td className="px-5 py-3 text-white/40 text-xs font-semibold uppercase">Total</td>
                  <td className="px-5 py-3 text-river-red font-bold">{totals.convs}</td>
                  <td className="px-5 py-3 text-blue-300 font-bold">{totals.respuestas || "—"}</td>
                  <td className="px-5 py-3 text-amber-300 font-bold font-mono">{totals.tokens?.toLocaleString()}</td>
                  <td className="px-5 py-3 text-green-400 font-bold font-mono">${totals.costo?.toFixed(4)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  const colors: Record<string, string> = {
    river: "text-river-red border-red-900/40",
    blue: "text-blue-300 border-blue-900/40",
    green: "text-green-400 border-green-900/40",
    purple: "text-purple-400 border-purple-900/40",
    amber: "text-amber-400 border-amber-900/40",
    emerald: "text-emerald-400 border-emerald-900/40",
  };
  return (
    <div className={`rounded-2xl border bg-navy-700 p-4 flex flex-col gap-2 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-white/40 font-semibold uppercase tracking-wide leading-tight">{label}</p>
        <span className="text-base">{icon}</span>
      </div>
      <p className={`text-2xl font-black tracking-tight ${colors[color].split(" ")[0]}`}>{value}</p>
    </div>
  );
}
