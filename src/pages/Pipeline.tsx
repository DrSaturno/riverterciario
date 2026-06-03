import { useState } from "react";

interface Lead { id: number; nombre: string; modalidad: string; telefono: string; tiempo: string; origen: string; }
interface Etapa { id: string; nombre: string; color: string; leads: Lead[]; }

const PIPELINE_INICIAL: Etapa[] = [
  {
    id: "consulta", nombre: "Consulta inicial", color: "#3b82f6",
    leads: [
      { id: 1, nombre: "Valentina Gómez", modalidad: "Presencial", telefono: "+54 9 11 4523-1234", tiempo: "hace 2 min", origen: "WhatsApp" },
      { id: 4, nombre: "Tomás Rodríguez", modalidad: "Presencial", telefono: "+54 9 11 8901-2345", tiempo: "hace 23 min", origen: "Web" },
      { id: 9, nombre: "Carolina Ríos", modalidad: "Presencial", telefono: "+54 9 11 1234-5678", tiempo: "hace 4 hs", origen: "WhatsApp" },
    ],
  },
  {
    id: "interesado", nombre: "Interesado", color: "#8b5cf6",
    leads: [
      { id: 5, nombre: "Camila López", modalidad: "A Distancia", telefono: "+54 9 11 5678-9012", tiempo: "hace 41 min", origen: "WhatsApp" },
      { id: 8, nombre: "Agustín Pérez", modalidad: "A Distancia", telefono: "+54 9 11 9012-3456", tiempo: "hace 3 hs", origen: "Instagram" },
    ],
  },
  {
    id: "documentacion", nombre: "Documentación", color: "#f59e0b",
    leads: [
      { id: 2, nombre: "Lucas Fernández", modalidad: "A Distancia", telefono: "+54 9 11 6712-9870", tiempo: "hace 8 min", origen: "WhatsApp" },
      { id: 7, nombre: "Florencia Díaz", modalidad: "Presencial", telefono: "+54 9 11 7890-1234", tiempo: "hace 2 hs", origen: "Web" },
      { id: 10, nombre: "Ignacio Herrera", modalidad: "Presencial", telefono: "+54 9 11 8765-4321", tiempo: "hace 5 hs", origen: "WhatsApp" },
    ],
  },
  {
    id: "inscripto", nombre: "Inscripto", color: "#10b981",
    leads: [
      { id: 3, nombre: "Sofía Martínez", modalidad: "Presencial", telefono: "+54 9 11 2345-6789", tiempo: "hace 15 min", origen: "WhatsApp" },
      { id: 6, nombre: "Mateo García", modalidad: "A Distancia", telefono: "+54 9 11 3456-7890", tiempo: "hace 1 hs", origen: "Web" },
      { id: 11, nombre: "Luciana Vega", modalidad: "A Distancia", telefono: "+54 9 11 2233-4455", tiempo: "ayer", origen: "Instagram" },
    ],
  },
  {
    id: "perdido", nombre: "No inscripto", color: "#6b7280",
    leads: [
      { id: 12, nombre: "Ramiro Sosa", modalidad: "Presencial", telefono: "+54 9 11 6677-8899", tiempo: "hace 3 días", origen: "Web" },
    ],
  },
];

const ORIGEN_ICON: Record<string, string> = { WhatsApp: "💬", Web: "🌐", Instagram: "📸" };

export default function Pipeline() {
  const [etapas, setEtapas] = useState(PIPELINE_INICIAL);
  const [dragging, setDragging] = useState<{ lead: Lead; fromEtapa: string } | null>(null);
  const totalLeads = etapas.reduce((a, e) => a + e.leads.length, 0);
  const inscriptos = etapas.find(e => e.id === "inscripto")?.leads.length ?? 0;
  const conversion = Math.round((inscriptos / totalLeads) * 100);

  function handleDrop(toEtapaId: string) {
    if (!dragging || dragging.fromEtapa === toEtapaId) { setDragging(null); return; }
    setEtapas((prev) =>
      prev.map((e) => {
        if (e.id === dragging.fromEtapa) return { ...e, leads: e.leads.filter((l) => l.id !== dragging.lead.id) };
        if (e.id === toEtapaId) return { ...e, leads: [...e.leads, dragging.lead] };
        return e;
      })
    );
    setDragging(null);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-navy-500 bg-navy-900 px-4 md:px-6 py-3 md:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white">Pipeline de Admisión</h1>
            <p className="text-xs text-white/50 mt-0.5 hidden sm:block">Arrastrá las tarjetas para mover leads · Periodismo Deportivo</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xl font-black text-white">{totalLeads} leads</p>
              <p className="text-[10px] text-green-400 font-semibold">{conversion}% conversión</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex-shrink-0 bg-navy-900 border-b border-navy-500 px-4 md:px-6 py-2 flex gap-3 md:gap-4 overflow-x-auto">
        {etapas.map((e) => (
          <div key={e.id} className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
            <span className="text-xs text-white/60 hidden sm:block">{e.nombre}</span>
            <span className="text-xs font-bold text-white bg-navy-700 px-2 py-0.5 rounded-full">{e.leads.length}</span>
          </div>
        ))}
        <div className="ml-auto flex-shrink-0 flex items-center gap-1.5 sm:hidden">
          <span className="text-xs font-bold text-white">{totalLeads} leads</span>
          <span className="text-xs text-green-400 font-semibold">· {conversion}% conv.</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-3 md:p-4 bg-navy-800">
        <div className="flex gap-3 h-full" style={{ minWidth: `${etapas.length * 200}px` }}>
          {etapas.map((etapa) => (
            <div
              key={etapa.id}
              className="flex-1 min-w-[185px] flex flex-col bg-navy-900 rounded-xl border border-navy-500 overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(etapa.id)}
            >
              <div className="px-3 py-3 flex items-center gap-2 border-b-2" style={{ borderBottomColor: etapa.color + "60" }}>
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: etapa.color }} />
                <p className="text-xs font-bold text-white flex-1 leading-tight">{etapa.nombre}</p>
                <span className="text-xs font-black text-white bg-navy-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{etapa.leads.length}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {etapa.leads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => setDragging({ lead, fromEtapa: etapa.id })}
                    onDragEnd={() => setDragging(null)}
                    className="bg-navy-700 border border-navy-500 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-slate-400 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: etapa.color + "40", border: `1.5px solid ${etapa.color}60` }}>
                        {lead.nombre[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate leading-tight">{lead.nombre}</p>
                        <p className="text-[10px] text-white/50 truncate">{lead.telefono}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${lead.modalidad === "Presencial" ? "bg-blue-900/40 text-blue-300" : "bg-purple-900/40 text-purple-300"}`}>{lead.modalidad}</span>
                      <span className="text-[10px] text-white/40">{ORIGEN_ICON[lead.origen]}</span>
                    </div>
                    <p className="text-[10px] text-white/30">⏱ {lead.tiempo}</p>
                  </div>
                ))}
                {etapa.leads.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 opacity-30">
                    <p className="text-2xl mb-1">○</p>
                    <p className="text-[10px] text-white">Sin leads</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
