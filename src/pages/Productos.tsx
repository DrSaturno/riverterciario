import { useState } from "react";

interface Producto {
  id: number; nombre: string; modalidad: string; duracion: string;
  inicio: string; estado: "activo" | "proximo" | "cerrado"; descripcion: string;
  incluye: string[];
}

const INIT: Producto[] = [
  {
    id: 1,
    nombre: "Técnico Superior en Periodismo Deportivo",
    modalidad: "Presencial",
    duracion: "3 años",
    inicio: "16/03/2026",
    estado: "activo",
    descripcion: "Formación presencial en el Estadio Más Monumental. Lunes a viernes de 18:00 a 22:30 hs. Asignaturas específicas de Radio, Televisión y Deportes.",
    incluye: ["Matrícula anual", "Título oficial", "Prácticas Elite/amateur", "Convenios y acuerdos"],
  },
  {
    id: 2,
    nombre: "Técnico Superior en Periodismo Deportivo",
    modalidad: "A Distancia",
    duracion: "3 años",
    inicio: "09/03/2026",
    estado: "activo",
    descripcion: "100% virtual, sin restricciones geográficas. Estructura flexible por bimestres. Compatible con trabajo y vida personal. Desde cualquier lugar del mundo.",
    incluye: ["Matrícula anual", "Título oficial", "Prácticas Elite/amateur", "Convenios y acuerdos"],
  },
];

const ESTADO_STYLE: Record<Producto["estado"], string> = {
  activo: "bg-green-900/40 text-green-400 border-green-800",
  proximo: "bg-blue-900/40 text-blue-400 border-blue-800",
  cerrado: "bg-slate-800 text-white/40 border-slate-700",
};
const ESTADO_LABEL: Record<Producto["estado"], string> = { activo: "Activo", proximo: "Próximo", cerrado: "Cerrado" };
const MODALIDADES = ["Presencial", "A Distancia", "Híbrida"];
const ESTADOS: Producto["estado"][] = ["activo", "proximo", "cerrado"];

const EMPTY = {
  nombre: "", modalidad: "Presencial", duracion: "3 años",
  inicio: "", estado: "activo" as Producto["estado"], descripcion: "", incluye: "",
};

type ModalMode = { mode: "new" } | { mode: "edit"; producto: Producto } | { mode: "delete"; producto: Producto } | null;

export default function Productos() {
  const [productos, setProductos] = useState(INIT);
  const [modal, setModal] = useState<ModalMode>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);

  function openNew() { setForm(EMPTY); setModal({ mode: "new" }); }
  function openEdit(p: Producto) {
    setForm({ nombre: p.nombre, modalidad: p.modalidad, duracion: p.duracion, inicio: p.inicio, estado: p.estado, descripcion: p.descripcion, incluye: p.incluye.join(", ") });
    setModal({ mode: "edit", producto: p });
  }
  function openDelete(p: Producto) { setModal({ mode: "delete", producto: p }); }

  function handleSave() {
    const data = {
      nombre: form.nombre, modalidad: form.modalidad, duracion: form.duracion,
      inicio: form.inicio, estado: form.estado, descripcion: form.descripcion,
      incluye: form.incluye.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (modal?.mode === "new") setProductos((prev) => [...prev, { ...data, id: Date.now() }]);
    else if (modal?.mode === "edit") setProductos((prev) => prev.map((p) => p.id === modal.producto.id ? { ...data, id: p.id } : p));
    setModal(null);
  }

  function handleDelete() {
    if (modal?.mode === "delete") setProductos((prev) => prev.filter((p) => p.id !== modal.producto.id));
    setModal(null);
  }

  const inp = "w-full bg-navy-800 border border-navy-500 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-river-red placeholder-white/30";

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="border-b border-navy-500 bg-navy-900 px-6 py-4 flex-shrink-0 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Oferta Académica</h1>
            <p className="text-xs text-white/50 mt-0.5">Productos y carreras del CET River Plate</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-river-red hover:bg-river-red-dark text-white text-xs font-bold transition">
            + Nueva oferta
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-navy-800">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-900/30 border border-green-800 flex items-center justify-center">
                <span className="text-green-400 text-lg">✓</span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">{productos.filter((p) => p.estado === "activo").length}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Activos</p>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-800 flex items-center justify-center">
                <span className="text-blue-400 text-lg">◷</span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">{productos.filter((p) => p.estado === "proximo").length}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Próximos</p>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-600 border border-navy-500 flex items-center justify-center">
                <span className="text-white/40 text-lg">🎙️</span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">{productos.length}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Total</p>
              </div>
            </div>
          </div>

          {/* Products list */}
          <div className="space-y-4">
            {productos.map((p) => (
              <div key={p.id} className="card overflow-hidden hover:border-slate-500 transition group">
                <div className="flex">
                  {/* Color accent strip */}
                  <div
                    className="w-1.5 flex-shrink-0"
                    style={{ backgroundColor: p.modalidad === "Presencial" ? "#3b82f6" : "#8b5cf6" }}
                  />
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${p.modalidad === "Presencial" ? "bg-blue-900/40 text-blue-300 border-blue-800" : "bg-purple-900/40 text-purple-300 border-purple-800"}`}>
                            {p.modalidad}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${ESTADO_STYLE[p.estado]}`}>
                            {ESTADO_LABEL[p.estado]}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white leading-tight">{p.nombre}</h3>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button onClick={() => openEdit(p)} className="text-xs text-white/50 hover:text-white bg-navy-600 hover:bg-navy-500 px-3 py-1.5 rounded-lg transition">
                          ✏️ Editar
                        </button>
                        <button onClick={() => openDelete(p)} className="text-xs text-red-400 hover:text-white hover:bg-red-900/40 px-3 py-1.5 rounded-lg transition">
                          🗑 Eliminar
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-white/60 leading-relaxed mb-4">{p.descripcion}</p>

                    <div className="flex flex-wrap gap-3">
                      {/* Key stats */}
                      <div className="flex items-center gap-2 bg-navy-900 rounded-lg px-3 py-2">
                        <span className="text-white/40 text-xs">⏱</span>
                        <div>
                          <p className="text-[10px] text-white/40">Duración</p>
                          <p className="text-xs font-bold text-white">{p.duracion}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-navy-900 rounded-lg px-3 py-2">
                        <span className="text-white/40 text-xs">📅</span>
                        <div>
                          <p className="text-[10px] text-white/40">Inicio</p>
                          <p className="text-xs font-bold text-white">{p.inicio}</p>
                        </div>
                      </div>
                      {/* Incluye */}
                      <div className="flex-1 flex items-center gap-2 flex-wrap bg-navy-900 rounded-lg px-3 py-2">
                        {p.incluye.map((item) => (
                          <span key={item} className="text-[10px] text-green-400 font-medium flex items-center gap-1">
                            <span className="text-green-600">✓</span> {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal New/Edit */}
      {(modal?.mode === "new" || modal?.mode === "edit") && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setModal(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-navy-900 border border-navy-500 rounded-2xl p-6 w-full max-w-lg pointer-events-auto max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-white">{modal.mode === "new" ? "Nueva oferta académica" : "Editar oferta"}</h2>
                <button onClick={() => setModal(null)} className="text-white/40 hover:text-white text-xl">×</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Nombre *</label>
                  <input className={inp} placeholder="Ej: Técnico en Periodismo Deportivo" value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Modalidad</label>
                    <select className={inp} value={form.modalidad} onChange={(e) => setForm((f) => ({ ...f, modalidad: e.target.value }))}>
                      {MODALIDADES.map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Estado</label>
                    <select className={inp} value={form.estado} onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value as Producto["estado"] }))}>
                      {ESTADOS.map((e) => <option key={e} value={e}>{ESTADO_LABEL[e]}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Duración</label>
                    <input className={inp} placeholder="Ej: 3 años" value={form.duracion} onChange={(e) => setForm((f) => ({ ...f, duracion: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Fecha de inicio</label>
                    <input className={inp} placeholder="16/03/2026" value={form.inicio} onChange={(e) => setForm((f) => ({ ...f, inicio: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Descripción</label>
                  <textarea className={`${inp} resize-none`} rows={3} value={form.descripcion} onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Incluye (separado por comas)</label>
                  <input className={inp} placeholder="Matrícula, Título oficial, Prácticas..." value={form.incluye} onChange={(e) => setForm((f) => ({ ...f, incluye: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-navy-500 text-white/60 hover:text-white text-sm font-semibold transition">Cancelar</button>
                <button onClick={handleSave} disabled={!form.nombre.trim()} className="flex-[2] py-2.5 rounded-xl bg-river-red hover:bg-river-red-dark disabled:opacity-30 text-white text-sm font-bold transition">
                  {modal.mode === "new" ? "Crear oferta" : "Guardar cambios"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal Delete */}
      {modal?.mode === "delete" && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setModal(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-navy-900 border border-navy-500 rounded-2xl p-6 w-full max-w-sm pointer-events-auto shadow-2xl">
              <div className="flex items-center gap-3 mb-4"><span className="text-2xl">⚠️</span><h2 className="text-base font-bold text-white">Eliminar oferta</h2></div>
              <p className="text-sm text-white/60 mb-1">¿Eliminar:</p>
              <p className="text-sm font-semibold text-white mb-5">"{modal.producto.nombre}"?</p>
              <div className="flex gap-3">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-navy-500 text-white/60 hover:text-white text-sm font-semibold transition">Cancelar</button>
                <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-bold transition">Eliminar</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
