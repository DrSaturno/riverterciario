import { useState } from "react";

const TONO_OPTIONS = [
  { value: "profesional", label: "Profesional", desc: "Formal y preciso", icon: "💼" },
  { value: "amigable",    label: "Amigable",    desc: "Cercano y empático", icon: "😊" },
  { value: "dinamico",    label: "Dinámico",    desc: "Energético y motivador", icon: "🎙️" },
];

const KB_DOCS = [
  { id: 1, nombre: "Oferta académica CET 2026", tipo: "pdf", fecha: "01/06/2026", indexado: true },
  { id: 2, nombre: "Requisitos de inscripción", tipo: "pdf", fecha: "01/06/2026", indexado: true },
  { id: 3, nombre: "Plan de estudios Periodismo Deportivo", tipo: "pdf", fecha: "28/05/2026", indexado: true },
  { id: 4, nombre: "Fechas ciclo lectivo 2026", tipo: "txt", fecha: "20/05/2026", indexado: false },
];

function fileIcon(tipo: string) {
  if (tipo === "pdf") return "📄";
  return "📝";
}

export default function Configuracion() {
  const [tono, setTono] = useState("amigable");
  const [nombreBot, setNombreBot] = useState("Asistente CET River Plate");
  const [descripcion, setDescripcion] = useState(
    "Soy el asistente virtual del Centro de Estudios Terciarios River Plate (CET). Puedo ayudarte con información sobre la carrera de Técnico Superior en Periodismo Deportivo, modalidades presencial y a distancia, inscripciones, requisitos, fechas del ciclo lectivo y más."
  );
  const [docs, setDocs] = useState(KB_DOCS);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-navy-500 bg-navy-900 px-6 py-4 flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Configuración</h1>
          <p className="text-xs text-slate-500 mt-0.5">Personalizá cómo responde el bot CET River Plate</p>
        </div>
        <div className="flex items-center gap-2 bg-navy-800 border border-navy-500 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-green-400">Bot activo</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-navy-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">

          {/* Bot settings */}
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-navy-500 flex items-center gap-2">
              <span className="text-river-red">⚙️</span>
              <h2 className="text-sm font-semibold text-white">Configuración del bot</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Nombre del bot</label>
                <div className="flex gap-2">
                  <input type="text" value={nombreBot} onChange={(e) => setNombreBot(e.target.value)}
                    className="flex-1 bg-navy-900 border border-navy-500 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-river-red placeholder-slate-600"
                    placeholder="Ej: Asistente CET River Plate" />
                  <button onClick={handleSave} className="px-4 py-2.5 rounded-xl bg-river-red hover:bg-river-red-dark text-white text-xs font-bold transition">
                    {saved ? "✓" : "Guardar"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Tono del asistente</label>
                <div className="grid grid-cols-3 gap-2">
                  {TONO_OPTIONS.map((opt) => (
                    <button key={opt.value} type="button" onClick={() => setTono(opt.value)}
                      className={`p-3 rounded-xl border text-left transition ${tono === opt.value ? "border-river-red bg-river-red/10 text-river-red" : "border-navy-500 text-slate-400 hover:border-slate-500 hover:bg-navy-700"}`}
                    >
                      <p className="text-base mb-1">{opt.icon}</p>
                      <p className="text-xs font-semibold">{opt.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Descripción del bot</label>
                <p className="text-xs text-slate-600 mb-2">Esta información guía las respuestas del asistente.</p>
                <textarea rows={5} className="w-full bg-navy-900 border border-navy-500 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-river-red placeholder-slate-600 resize-none"
                  value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
              </div>

              <button onClick={handleSave} className="w-full py-3 rounded-xl bg-river-red hover:bg-river-red-dark text-white text-sm font-bold transition">
                {saved ? "✓ Guardado" : "Guardar cambios"}
              </button>
            </div>
          </div>

          {/* Knowledge base */}
          <div className="card overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-navy-500 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-river-red">📚</span>
                <h2 className="text-sm font-semibold text-white">Base de conocimientos</h2>
              </div>
              <span className="text-xs text-river-red bg-river-red/10 border border-river-red/30 px-2.5 py-0.5 rounded-full font-semibold">{docs.length} docs</span>
            </div>
            <div className="p-6 flex flex-col gap-4 flex-1">
              <p className="text-xs text-slate-500">Los documentos que cargues enriquecen las respuestas del bot. Formatos: PDF, TXT, DOC.</p>
              <div className="space-y-2 flex-1">
                {docs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-navy-900 border border-navy-500 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg flex-shrink-0">{fileIcon(doc.tipo)}</span>
                      <div className="min-w-0">
                        <p className="text-xs text-white font-semibold truncate">{doc.nombre}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[10px] text-slate-600">{doc.fecha}</p>
                          {doc.indexado ? <span className="text-[10px] text-green-500 font-semibold">● Indexado</span> : <span className="text-[10px] text-yellow-500 font-semibold">● Pendiente</span>}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setDocs((prev) => prev.filter((d) => d.id !== doc.id))} className="text-slate-600 hover:text-red-400 ml-2 transition p-1 rounded text-sm">✕</button>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-xl border border-dashed border-navy-500 text-slate-400 text-sm hover:border-river-red hover:text-river-red hover:bg-river-red/5 transition flex items-center justify-center gap-2 font-medium">
                ↑ Agregar documento
              </button>
            </div>
          </div>

          {/* Info institucional */}
          <div className="card p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><span>🔴⚪</span> Información institucional del bot</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {[
                { label: "Institución", value: "Centro de Estudios Terciarios River Plate (CET)" },
                { label: "Email informes", value: "infoeducativa@riverplate.edu.ar" },
                { label: "Teléfono", value: "(54 9 11) 3569-1218" },
                { label: "Web", value: "cariverplate.com.ar/educacion" },
              ].map((item) => (
                <div key={item.label} className="bg-navy-900 rounded-xl px-4 py-3">
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-white font-semibold leading-tight">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
