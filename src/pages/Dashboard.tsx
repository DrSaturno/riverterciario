import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import TopicsChart from "../components/TopicsChart";
import ActivityChart from "../components/ActivityChart";

export interface Conversation {
  id: string; name: string; phone: string; lastMessage: string;
  time: string; topic: string; status: "active" | "resolved" | "pending"; messageCount: number;
}

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: "1", name: "Valentina Gómez", phone: "+54 9 11 4523-1234", lastMessage: "¿Cuáles son los requisitos para inscribirme?", time: "hace 2 min", topic: "Inscripción", status: "active", messageCount: 3 },
  { id: "2", name: "Lucas Fernández", phone: "+54 9 11 6712-9870", lastMessage: "Perfecto, muchas gracias por la info!", time: "hace 8 min", topic: "Modalidad Distancia", status: "resolved", messageCount: 5 },
  { id: "3", name: "Sofía Martínez", phone: "+54 9 11 2345-6789", lastMessage: "¿Cuándo arranca el ciclo 2026?", time: "hace 15 min", topic: "Fechas", status: "active", messageCount: 3 },
  { id: "4", name: "Tomás Rodríguez", phone: "+54 9 11 8901-2345", lastMessage: "¿El título tiene validez nacional?", time: "hace 23 min", topic: "Carrera", status: "resolved", messageCount: 2 },
  { id: "5", name: "Camila López", phone: "+54 9 11 5678-9012", lastMessage: "¿Cuánto cuesta la matrícula?", time: "hace 41 min", topic: "Aranceles", status: "pending", messageCount: 2 },
  { id: "6", name: "Mateo García", phone: "+54 9 11 3456-7890", lastMessage: "Gracias, me comunico con el equipo!", time: "hace 1 hs", topic: "Contacto", status: "resolved", messageCount: 3 },
  { id: "7", name: "Florencia Díaz", phone: "+54 9 11 7890-1234", lastMessage: "¿La distancia es compatible con mi trabajo?", time: "hace 2 hs", topic: "Modalidad Distancia", status: "resolved", messageCount: 4 },
  { id: "8", name: "Agustín Pérez", phone: "+54 9 11 9012-3456", lastMessage: "¿Qué materias se cursan el primer año?", time: "hace 3 hs", topic: "Carrera", status: "resolved", messageCount: 6 },
  { id: "9", name: "Carolina Ríos", phone: "+54 9 11 1234-5678", lastMessage: "¿Tienen sede en La Plata?", time: "hace 4 hs", topic: "Modalidad Presencial", status: "pending", messageCount: 2 },
  { id: "10", name: "Ignacio Herrera", phone: "+54 9 11 8765-4321", lastMessage: "Quiero saber más sobre la carrera", time: "hace 5 hs", topic: "Carrera", status: "resolved", messageCount: 4 },
];

const TOPICS_DATA = [
  { topic: "Modalidad distancia", count: 52 },
  { topic: "Inscripción", count: 41 },
  { topic: "Aranceles", count: 33 },
  { topic: "Fechas 2026", count: 28 },
  { topic: "La carrera", count: 24 },
  { topic: "Modalidad presencial", count: 19 },
  { topic: "Contacto", count: 8 },
];

const STATUS_STYLES: Record<string, string> = {
  active: "text-green-400 bg-green-900/30 border-green-800",
  resolved: "text-yellow-400 bg-yellow-900/30 border-yellow-800",
  pending: "text-red-400 bg-red-900/30 border-red-800",
};
const STATUS_LABELS: Record<string, string> = { active: "Activa", resolved: "Resuelta", pending: "Pendiente" };

export default function Dashboard() {
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white">Panel de Control</h1>
          <p className="text-xs text-white/50 mt-0.5 capitalize hidden sm:block">{dateStr} · {timeStr}</p>
        </div>
        <div className="flex items-center gap-2 bg-green-900/30 border border-green-800 rounded-lg px-3 py-1.5 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-green-400 hidden sm:block">Bot WhatsApp activo</span>
          <span className="text-[11px] font-semibold text-green-400 sm:hidden">Activo</span>
        </div>
      </div>

      {/* Metrics — 2 cols mobile, 3 tablet, 6 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <MetricCard label="Conversaciones hoy" value={158} trend={12} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>} accentColor="bg-river-red" />
        <MetricCard label="Tasa resolución" value={87} unit="%" trend={3} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} accentColor="bg-blue-600" />
        <MetricCard label="Tiempo promedio" value="1.4" unit="min" trend={-8} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} accentColor="bg-purple-600" />
        <MetricCard label="Usuarios únicos" value={94} trend={7} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} accentColor="bg-teal-600" />
        <MetricCard label="Tokens usados" value="48.2k" trend={5} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 7v10M9.5 9.5h4a1.5 1.5 0 010 3h-3a1.5 1.5 0 000 3h4" /></svg>} accentColor="bg-amber-600" />
        <MetricCard label="Costo del día" value="$0.019" trend={4} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} accentColor="bg-emerald-600" />
      </div>

      {/* Charts — stacked on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActivityChart />
        <TopicsChart data={TOPICS_DATA} />
      </div>

      {/* Conversation list */}
      <div className="card overflow-hidden">
        <div className="px-4 md:px-5 py-3 border-b border-navy-500 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Conversaciones recientes</p>
          <span className="text-xs text-white/50">{MOCK_CONVERSATIONS.length} total</span>
        </div>
        <div className="divide-y divide-navy-500">
          {MOCK_CONVERSATIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/conversaciones?id=${c.id}`)}
              className="w-full text-left px-4 md:px-5 py-3 flex items-center gap-3 hover:bg-navy-600/50 transition cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-river-red/20 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${STATUS_STYLES[c.status]}`}>
                    {STATUS_LABELS[c.status]}
                  </span>
                  <span className="text-[10px] text-white/40 bg-navy-700 px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:inline">{c.topic}</span>
                </div>
                <p className="text-xs text-white/50 truncate">{c.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[11px] text-white/40">{c.time}</span>
                <span className="text-[10px] text-white/30 hidden sm:block">{c.messageCount} msgs</span>
              </div>
              <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition flex-shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
