import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Contacto {
  id: number; nombre: string; telefono: string; email: string;
  interes: string; modalidad: string; etapa: string; etapaColor: string;
  etiquetas: string[]; ultimaActividad: string; notas: string;
}

const CONTACTOS_INIT: Contacto[] = [
  { id: 1, nombre: "Valentina Gómez", telefono: "+54 9 11 4523-1234", email: "vale@gmail.com", interes: "Periodismo Deportivo", modalidad: "Presencial", etapa: "Consulta inicial", etapaColor: "#3b82f6", etiquetas: ["presencial", "nueva"], ultimaActividad: "hace 2 min", notas: "Quiere arrancar en marzo, tiene secundario completo." },
  { id: 2, nombre: "Lucas Fernández", telefono: "+54 9 11 6712-9870", email: "lf@outlook.com", interes: "Periodismo Deportivo", modalidad: "A Distancia", etapa: "Documentación enviada", etapaColor: "#f59e0b", etiquetas: ["distancia", "córdoba"], ultimaActividad: "hace 8 min", notas: "Vive en Córdoba. Eligió modalidad virtual." },
  { id: 3, nombre: "Sofía Martínez", telefono: "+54 9 11 2345-6789", email: "sofi@gmail.com", interes: "Periodismo Deportivo", modalidad: "Presencial", etapa: "Inscripto", etapaColor: "#10b981", etiquetas: ["presencial", "marzo-2026"], ultimaActividad: "hace 15 min", notas: "Inscrita para el 1er cuatrimestre presencial." },
  { id: 4, nombre: "Tomás Rodríguez", telefono: "+54 9 11 8901-2345", email: "tomas@yahoo.com", interes: "Periodismo Deportivo", modalidad: "Presencial", etapa: "Consulta inicial", etapaColor: "#3b82f6", etiquetas: ["presencial"], ultimaActividad: "hace 23 min", notas: "Preguntó por validez del título." },
  { id: 5, nombre: "Camila López", telefono: "+54 9 11 5678-9012", email: "cami@gmail.com", interes: "Periodismo Deportivo", modalidad: "A Distancia", etapa: "Interesado", etapaColor: "#8b5cf6", etiquetas: ["distancia", "trabaja"], ultimaActividad: "hace 41 min", notas: "Trabaja full time, consulta por aranceles." },
  { id: 6, nombre: "Mateo García", telefono: "+54 9 11 3456-7890", email: "mato@gmail.com", interes: "Periodismo Deportivo", modalidad: "A Distancia", etapa: "Inscripto", etapaColor: "#10b981", etiquetas: ["distancia"], ultimaActividad: "hace 1 hs", notas: "" },
  { id: 7, nombre: "Florencia Díaz", telefono: "+54 9 11 7890-1234", email: "flor@gmail.com", interes: "Periodismo Deportivo", modalidad: "Presencial", etapa: "Documentación enviada", etapaColor: "#f59e0b", etiquetas: ["presencial", "agosto-2026"], ultimaActividad: "hace 2 hs", notas: "Arranca en agosto, segundo cuatrimestre." },
  { id: 8, nombre: "Agustín Pérez", telefono: "+54 9 11 9012-3456", email: "agus@gmail.com", interes: "Periodismo Deportivo", modalidad: "A Distancia", etapa: "Interesado", etapaColor: "#8b5cf6", etiquetas: ["distancia", "mendoza"], ultimaActividad: "hace 3 hs", notas: "Desde Mendoza, pregunta por bimestres." },
  { id: 9, nombre: "Carolina Ríos", telefono: "+54 9 11 1234-5678", email: "caro@gmail.com", interes: "Periodismo Deportivo", modalidad: "Presencial", etapa: "Consulta inicial", etapaColor: "#3b82f6", etiquetas: ["presencial", "laplata"], ultimaActividad: "hace 4 hs", notas: "Consulta si hay sede en La Plata." },
  { id: 10, nombre: "Ignacio Herrera", telefono: "+54 9 11 8765-4321", email: "nacho@gmail.com", interes: "Periodismo Deportivo", modalidad: "Presencial", etapa: "Documentación enviada", etapaColor: "#f59e0b", etiquetas: ["presencial", "marzo-2026"], ultimaActividad: "hace 5 hs", notas: "Quiere arrancar en marzo presencial." },
  { id: 11, nombre: "Luciana Vega", telefono: "+54 9 11 2233-4455", email: "luci@hotmail.com", interes: "Periodismo Deportivo", modalidad: "A Distancia", etapa: "Inscripto", etapaColor: "#10b981", etiquetas: ["distancia", "rosario"], ultimaActividad: "ayer", notas: "De Rosario. Inscripta modalidad virtual." },
  { id: 12, nombre: "Ramiro Sosa", telefono: "+54 9 11 6677-8899", email: "rami@gmail.com", interes: "Periodismo Deportivo", modalidad: "Presencial", etapa: "No inscripto", etapaColor: "#6b7280", etiquetas: ["perdido"], ultimaActividad: "hace 3 días", notas: "Decidió no continuar por cuestiones económicas." },
];

const ETAPAS = ["Consulta inicial", "Interesado", "Documentación enviada", "Inscripto", "No inscripto"];
const ETAPA_COLORS: Record<string, string> = {
  "Consulta inicial": "#3b82f6", "Interesado": "#8b5cf6",
  "Documentación enviada": "#f59e0b", "Inscripto": "#10b981", "No inscripto": "#6b7280",
};
const EMPTY_FORM = { nombre: "", telefono: "", email: "", modalidad: "Presencial", etapa: "Consulta inicial", notas: "", etiquetas: "" };
const inp = "w-full bg-navy-800 border border-navy-500 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-river-red placeholder-white/30";

export default function CRM() {
  const [contactos, setContactos] = useState<Contacto[]>(CONTACTOS_INIT);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contacto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const navigate = useNavigate();

  const filtered = search.trim()
    ? contactos.filter((c) =>
        c.nombre.toLowerCase().includes(search.toLowerCase()) ||
        c.etapa.toLowerCase().includes(search.toLowerCase()) ||
        c.modalidad.toLowerCase().includes(search.toLowerCase())
      )
    : contactos;

  function handleSave() {
    if (!form.nombre.trim()) return;
    const color = ETAPA_COLORS[form.etapa] || "#3b82f6";
    const nuevo: Contacto = {
      id: Date.now(), nombre: form.nombre, telefono: form.telefono, email: form.email,
      interes: "Periodismo Deportivo", modalidad: form.modalidad, etapa: form.etapa,
      etapaColor: color, etiquetas: form.etiquetas.split(",").map((e) => e.trim()).filter(Boolean),
      ultimaActividad: "ahora", notas: form.notas,
    };
    setContactos((prev) => [nuevo, ...prev]);
    setShowModal(false);
    setForm(EMPTY_FORM);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-navy-500 bg-navy-900 px-4 md:px-6 py-3 md:py-4 flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white">CRM</h1>
          <p className="text-xs text-white/50 mt-0.5 hidden sm:block">{contactos.length} contactos · Periodismo Deportivo</p>
        </div>
        <button onClick={() => { setForm(EMPTY_FORM); setShowModal(true); }} className="px-3 md:px-4 py-2 rounded-lg bg-river-red hover:bg-river-red-dark text-white text-xs font-bold transition whitespace-nowrap">
          + Nuevo
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto p-3 md:p-6 bg-navy-800">
          <div className="mb-3 md:mb-4">
            <input
              className="w-full max-w-sm bg-navy-700 border border-navy-500 text-white rounded-lg px-4 py-2 text-sm placeholder-white/30 focus:outline-none focus:border-river-red"
              placeholder="Buscar por nombre, etapa o modalidad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Mobile: cards, Desktop: table */}
          <div className="md:hidden space-y-2">
            {filtered.map((c) => (
              <button key={c.id} onClick={() => setSelected(c)}
                className="w-full text-left card p-4 flex items-start gap-3 hover:border-slate-500 transition">
                <div className="w-10 h-10 rounded-full bg-navy-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">{c.nombre[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-white">{c.nombre}</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.etapaColor + "33", border: `1px solid ${c.etapaColor}66`, color: c.etapaColor }}>{c.etapa}</span>
                  </div>
                  <p className="text-[11px] text-white/70 mt-0.5">{c.telefono}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.modalidad === "Presencial" ? "bg-blue-900/40 text-blue-300" : "bg-purple-900/40 text-purple-300"}`}>{c.modalidad}</span>
                    <span className="text-[10px] text-white/40">{c.ultimaActividad}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="hidden md:block card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-navy-500">
                <tr>
                  {["Contacto", "Modalidad", "Etapa", "Etiquetas", "Última actividad", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-navy-500 last:border-0 hover:bg-navy-600/40 transition cursor-pointer" onClick={() => setSelected(c)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-navy-500 flex items-center justify-center text-xs font-bold text-white">{c.nombre[0]}</div>
                        <div>
                          <p className="text-white font-semibold">{c.nombre}</p>
                          <p className="text-[11px] text-white/70">{c.telefono}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.modalidad === "Presencial" ? "bg-blue-900/40 text-blue-300" : "bg-purple-900/40 text-purple-300"}`}>{c.modalidad}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: c.etapaColor + "33", border: `1px solid ${c.etapaColor}66`, color: c.etapaColor }}>{c.etapa}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.etiquetas.map((t) => <span key={t} className="text-[10px] bg-navy-600 text-white/60 px-2 py-0.5 rounded-full">#{t}</span>)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white text-xs">{c.ultimaActividad}</td>
                    <td className="px-4 py-3">
                      <button onClick={(e) => { e.stopPropagation(); setSelected(c); }} className="text-xs text-river-red hover:text-white transition">Ver →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <>
            {/* Mobile overlay */}
            <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSelected(null)} />
            <aside className={`
              fixed bottom-0 left-0 right-0 z-40 max-h-[80vh] overflow-y-auto rounded-t-2xl
              md:static md:max-h-none md:rounded-none md:z-auto
              w-full md:w-72 flex-shrink-0 border-t md:border-t-0 md:border-l border-navy-500 bg-navy-900 flex flex-col
            `}>
              <div className="px-5 py-4 border-b border-navy-500 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Perfil del contacto</p>
                <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white text-lg leading-none">×</button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-river-red/20 text-river-red flex items-center justify-center text-lg font-bold">{selected.nombre[0]}</div>
                  <div>
                    <p className="text-white font-bold">{selected.nombre}</p>
                    <p className="text-xs text-white/60">{selected.telefono}</p>
                  </div>
                </div>
                <Field label="Email">{selected.email || "—"}</Field>
                <Field label="Carrera">Periodismo Deportivo</Field>
                <Field label="Modalidad">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${selected.modalidad === "Presencial" ? "bg-blue-900/40 text-blue-300" : "bg-purple-900/40 text-purple-300"}`}>{selected.modalidad}</span>
                </Field>
                <Field label="Etapa">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: selected.etapaColor + "33", border: `1px solid ${selected.etapaColor}66`, color: selected.etapaColor }}>{selected.etapa}</span>
                </Field>
                <Field label="Etiquetas">
                  <div className="flex flex-wrap gap-1 mt-1">{selected.etiquetas.map((t) => <span key={t} className="text-[10px] bg-navy-700 text-white/50 px-2 py-0.5 rounded-full">#{t}</span>)}</div>
                </Field>
                <Field label="Notas">{selected.notas || "Sin notas"}</Field>
                <Field label="Última actividad">{selected.ultimaActividad}</Field>
                <button onClick={() => navigate("/conversaciones")} className="w-full py-2 bg-river-red hover:bg-river-red-dark text-white text-xs font-bold rounded-lg transition">
                  Abrir conversación →
                </button>
              </div>
            </aside>
          </>
        )}
      </div>

      {/* Modal Nuevo Contacto */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            <div className="bg-navy-900 border border-navy-500 rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-lg pointer-events-auto max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-white">Nuevo contacto</h2>
                <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white text-xl leading-none">×</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Nombre completo *</label>
                  <input className={inp} placeholder="Ej: Juan García" value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Teléfono</label>
                    <input className={inp} placeholder="+54 9 11 XXXX" value={form.telefono} onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Email</label>
                    <input className={inp} placeholder="correo@..." value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Modalidad</label>
                    <select className={inp} value={form.modalidad} onChange={(e) => setForm((f) => ({ ...f, modalidad: e.target.value }))}><option>Presencial</option><option>A Distancia</option></select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Etapa</label>
                    <select className={inp} value={form.etapa} onChange={(e) => setForm((f) => ({ ...f, etapa: e.target.value }))}>{ETAPAS.map((e) => <option key={e}>{e}</option>)}</select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Etiquetas (separadas por coma)</label>
                  <input className={inp} placeholder="presencial, nueva, marzo-2026" value={form.etiquetas} onChange={(e) => setForm((f) => ({ ...f, etiquetas: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Notas</label>
                  <textarea className={`${inp} resize-none`} rows={3} placeholder="Observaciones..." value={form.notas} onChange={(e) => setForm((f) => ({ ...f, notas: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-navy-500 text-white/60 hover:text-white text-sm font-semibold transition">Cancelar</button>
                <button onClick={handleSave} disabled={!form.nombre.trim()} className="flex-[2] py-2.5 rounded-xl bg-river-red hover:bg-river-red-dark disabled:opacity-30 text-white text-sm font-bold transition">Crear contacto</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1">{label}</p>
      <div className="text-sm text-white">{children}</div>
    </div>
  );
}
