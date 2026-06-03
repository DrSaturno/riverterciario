import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface Msg { from: "bot" | "user"; text: string; hora: string }
interface Conv {
  id: string; nombre: string; telefono: string; ultimoMensaje: string;
  hora: string; topic: string; status: "activa" | "resuelta" | "pendiente"; msgs: Msg[];
}

const MOCK: Conv[] = [
  {
    id: "1", nombre: "Valentina Gómez", telefono: "+54 9 11 4523-1234",
    ultimoMensaje: "¿Cuáles son los requisitos para inscribirme?", hora: "hace 2 min",
    topic: "Inscripción", status: "activa",
    msgs: [
      { from: "user", text: "Hola, quiero inscribirme a Periodismo Deportivo", hora: "14:21" },
      { from: "bot", text: "¡Hola Valentina! Para inscribirte necesitás DNI (frente y dorso), título secundario y si cursás el último año, una constancia de alumno regular. No hace falta experiencia previa. ¿Tenés el secundario completo?", hora: "14:21" },
      { from: "user", text: "¿Cuáles son los requisitos para inscribirme?", hora: "14:23" },
    ],
  },
  {
    id: "2", nombre: "Lucas Fernández", telefono: "+54 9 11 6712-9870",
    ultimoMensaje: "Perfecto, muchas gracias por la info!", hora: "hace 8 min",
    topic: "Modalidad Distancia", status: "resuelta",
    msgs: [
      { from: "user", text: "Hola, vivo en Córdoba. ¿Puedo hacer la carrera igual?", hora: "13:55" },
      { from: "bot", text: "¡Hola Lucas! Sí, perfectamente. La modalidad A Distancia es 100% virtual, sin restricciones geográficas. Podés estudiar desde cualquier lugar del mundo.", hora: "13:55" },
      { from: "user", text: "¿Y cómo son los horarios?", hora: "13:57" },
      { from: "bot", text: "La distancia es completamente flexible, con estructura bimestral. Vos elegís tu ritmo y cuántas materias cursar. Es compatible con trabajo y vida personal.", hora: "13:57" },
      { from: "user", text: "Perfecto, muchas gracias por la info!", hora: "14:01" },
    ],
  },
  {
    id: "3", nombre: "Sofía Martínez", telefono: "+54 9 11 2345-6789",
    ultimoMensaje: "¿Cuándo arranca el ciclo 2026?", hora: "hace 15 min",
    topic: "Fechas", status: "activa",
    msgs: [
      { from: "user", text: "Quiero empezar en marzo, ¿hay lugar?", hora: "13:45" },
      { from: "bot", text: "¡Hola Sofía! Sí, el 1er cuatrimestre presencial arranca el 16/03/2026. Para la modalidad a distancia el 1er bimestre comienza el 09/03/2026.", hora: "13:45" },
      { from: "user", text: "¿Cuándo arranca el ciclo 2026?", hora: "13:48" },
    ],
  },
  {
    id: "4", nombre: "Tomás Rodríguez", telefono: "+54 9 11 8901-2345",
    ultimoMensaje: "¿El título tiene validez nacional?", hora: "hace 23 min",
    topic: "Carrera", status: "resuelta",
    msgs: [
      { from: "user", text: "¿El título tiene validez nacional?", hora: "13:35" },
      { from: "bot", text: "Sí, el título es Técnico Superior en Periodismo Deportivo con validez nacional oficial, avalado por el Ministerio de Educación.", hora: "13:35" },
      { from: "user", text: "Excelente, muchas gracias!", hora: "13:36" },
    ],
  },
  {
    id: "5", nombre: "Camila López", telefono: "+54 9 11 5678-9012",
    ultimoMensaje: "¿Cuánto cuesta la matrícula?", hora: "hace 41 min",
    topic: "Aranceles", status: "pendiente",
    msgs: [
      { from: "user", text: "¿Cuánto cuesta la matrícula?", hora: "13:17" },
      { from: "bot", text: "Para consultar los valores actualizados te recomiendo contactar directamente: 📧 infoeducativa@riverplate.edu.ar o ☎️ (54 9 11) 3569-1218", hora: "13:17" },
    ],
  },
  {
    id: "6", nombre: "Mateo García", telefono: "+54 9 11 3456-7890",
    ultimoMensaje: "Gracias, me comunico con el equipo!", hora: "hace 1 hs",
    topic: "Contacto", status: "resuelta",
    msgs: [
      { from: "user", text: "¿Cómo me comunico con el CET?", hora: "12:58" },
      { from: "bot", text: "Podés contactarnos por email en infoeducativa@riverplate.edu.ar o llamando al (54 9 11) 3569-1218. También podés visitar cariverplate.com.ar/educacion", hora: "12:58" },
      { from: "user", text: "Gracias, me comunico con el equipo!", hora: "13:00" },
    ],
  },
  {
    id: "7", nombre: "Florencia Díaz", telefono: "+54 9 11 7890-1234",
    ultimoMensaje: "¿La distancia es compatible con mi trabajo?", hora: "hace 2 hs",
    topic: "Modalidad Distancia", status: "resuelta",
    msgs: [
      { from: "user", text: "¿La modalidad distancia es compatible con trabajar full time?", hora: "11:30" },
      { from: "bot", text: "¡Completamente! La modalidad a distancia fue diseñada pensando en personas que trabajan. No tenés horarios fijos de cursada, accedés al material cuando querés y avanzás a tu ritmo.", hora: "11:30" },
      { from: "user", text: "¿La distancia es compatible con mi trabajo?", hora: "11:32" },
      { from: "bot", text: "Sí, totalmente. Muchos de nuestros estudiantes trabajan 8 o más horas y estudian en sus ratos libres: noches, fines de semana, etc.", hora: "11:32" },
    ],
  },
  {
    id: "8", nombre: "Agustín Pérez", telefono: "+54 9 11 9012-3456",
    ultimoMensaje: "¿Qué materias se cursan el primer año?", hora: "hace 3 hs",
    topic: "Carrera", status: "resuelta",
    msgs: [
      { from: "user", text: "¿Qué materias se cursan el primer año?", hora: "10:50" },
      { from: "bot", text: "En el primer año cursás materias como Introducción al Periodismo, Redacción Periodística, Historia del Deporte, Locución, Comunicación y Medios, entre otras. ¿Querés que te cuente más sobre el plan de estudios?", hora: "10:50" },
      { from: "user", text: "Sí, me interesa el plan completo", hora: "10:52" },
      { from: "bot", text: "El plan completo tiene 3 años y abarca: periodismo escrito, radial y televisivo con foco en deporte. Incluye prácticas en medios y eventos deportivos reales.", hora: "10:52" },
      { from: "user", text: "Genial! Voy a pedir el prospecto", hora: "10:54" },
      { from: "bot", text: "Perfecto, podés solicitarlo en infoeducativa@riverplate.edu.ar o visitando la sede. ¡Éxitos!", hora: "10:54" },
    ],
  },
  {
    id: "9", nombre: "Carolina Ríos", telefono: "+54 9 11 1234-5678",
    ultimoMensaje: "¿Tienen sede en La Plata?", hora: "hace 4 hs",
    topic: "Modalidad Presencial", status: "pendiente",
    msgs: [
      { from: "user", text: "¿Tienen sede en La Plata?", hora: "09:45" },
      { from: "bot", text: "Actualmente la sede presencial está en el Estadio Más Monumental de Nuñez, Buenos Aires. Sin embargo tenemos la modalidad a distancia que podés cursar desde La Plata sin problemas.", hora: "09:45" },
    ],
  },
  {
    id: "10", nombre: "Ignacio Herrera", telefono: "+54 9 11 8765-4321",
    ultimoMensaje: "Quiero saber más sobre la carrera", hora: "hace 5 hs",
    topic: "Carrera", status: "resuelta",
    msgs: [
      { from: "user", text: "Quiero saber más sobre la carrera", hora: "08:30" },
      { from: "bot", text: "¡Hola Ignacio! La carrera es el Técnico Superior en Periodismo Deportivo, con duración de 3 años. Podés elegir modalidad presencial (sede Monumental) o a distancia (100% virtual). ¿Cuál te interesa más?", hora: "08:30" },
      { from: "user", text: "La presencial, ¿cuándo arrancan las clases?", hora: "08:32" },
      { from: "bot", text: "El 1er cuatrimestre 2026 arranca el 16 de marzo y el 2do el 18 de agosto. Las clases son de lunes a viernes de 18:00 a 22:30 hs.", hora: "08:32" },
      { from: "user", text: "Muchas gracias, voy a pensarlo", hora: "08:34" },
    ],
  },
];

const STATUS_CLASS: Record<Conv["status"], string> = {
  activa: "text-green-400 bg-green-900/30 border-green-800",
  resuelta: "text-yellow-400 bg-yellow-900/30 border-yellow-800",
  pendiente: "text-red-400 bg-red-900/30 border-red-800",
};

export default function Conversaciones() {
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<Conv>(MOCK[0]);
  const [showChat, setShowChat] = useState(false); // mobile: show chat panel
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [botPausado, setBotPausado] = useState(false);
  const [showIntervene, setShowIntervene] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const found = MOCK.find((c) => c.id === id);
      if (found) { setSelected(found); setShowChat(true); }
    }
  }, [searchParams]);

  const filtered = search.trim()
    ? MOCK.filter((c) => c.nombre.toLowerCase().includes(search.toLowerCase()) || c.topic.toLowerCase().includes(search.toLowerCase()))
    : MOCK;

  function handleSelect(c: Conv) {
    setSelected(c);
    setBotPausado(false);
    setShowIntervene(false);
    setMsg("");
    setShowChat(true); // on mobile, go to chat view
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-navy-500 bg-navy-900 px-4 md:px-6 py-3 md:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white">Conversaciones</h1>
            <p className="text-xs text-white/50 mt-0.5 hidden sm:block">Historial de mensajes del bot</p>
          </div>
          <div className="flex items-center gap-2 bg-navy-800 border border-navy-500 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-400">Bot activo</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* List panel — hidden on mobile when chat is open */}
        <aside className={`${showChat ? "hidden md:flex" : "flex"} w-full md:w-72 flex-shrink-0 border-r border-navy-500 bg-navy-900 flex-col overflow-hidden`}>
          <div className="p-3 border-b border-navy-500">
            <input
              className="w-full bg-navy-800 border border-navy-500 text-white rounded-lg px-3 py-1.5 text-xs placeholder-white/30 focus:outline-none focus:border-river-red"
              placeholder="Buscar contacto o tema..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-navy-500">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c)}
                className={`w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-navy-700 transition ${selected?.id === c.id ? "bg-river-red/10 border-l-2 border-l-river-red" : ""}`}
              >
                <div className="w-9 h-9 rounded-full bg-navy-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">{c.nombre[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white truncate">{c.nombre}</p>
                    <span className="text-[10px] text-white/40 flex-shrink-0 ml-2">{c.hora}</span>
                  </div>
                  <p className="text-xs text-white/50 truncate mt-0.5">{c.ultimoMensaje}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_CLASS[c.status]}`}>{c.status}</span>
                    <span className="text-[10px] text-white/40 bg-navy-700 px-2 py-0.5 rounded-full">{c.topic}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat panel — hidden on mobile when list is shown */}
        <main className={`${showChat ? "flex" : "hidden md:flex"} flex-1 flex-col overflow-hidden bg-navy-800`}>
          {/* Chat header */}
          <div className="bg-navy-900 border-b border-navy-500 px-4 md:px-5 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Back button on mobile */}
              <button
                className="md:hidden p-1.5 -ml-1 rounded-lg hover:bg-navy-700 transition text-white/60 hover:text-white"
                onClick={() => setShowChat(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-8 h-8 rounded-full bg-river-red/20 text-river-red flex items-center justify-center text-sm font-bold">{selected.nombre[0]}</div>
              <div>
                <p className="text-sm font-semibold text-white">{selected.nombre}</p>
                <p className="text-xs text-white/50 hidden sm:block">{selected.telefono}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {botPausado && (
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-yellow-400 bg-yellow-900/30 border border-yellow-800 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" /> Bot pausado
                </span>
              )}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_CLASS[selected.status]}`}>{selected.status}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-5 py-4 space-y-3">
            {selected.msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
                {m.from === "user" && (
                  <div className="w-7 h-7 rounded-full bg-river-red flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mr-2 mt-1">{selected.nombre[0]}</div>
                )}
                <div className={`max-w-[75%] md:max-w-[65%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${m.from === "user" ? "bg-river-red text-white rounded-tl-sm" : "bg-navy-700 text-white rounded-tr-sm"}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.from === "user" ? "text-red-200 text-left" : "text-white/40 text-right"}`}>
                    {m.hora}{m.from === "user" && " ✓✓"}
                  </p>
                </div>
                {m.from === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-navy-600 flex items-center justify-center text-xs flex-shrink-0 ml-2 mt-1">🤖</div>
                )}
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="border-t border-navy-500 bg-navy-900 p-3 md:p-4 flex-shrink-0">
            {botPausado ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-yellow-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" /> Bot pausado
                  </p>
                  <button onClick={() => { setBotPausado(false); setShowIntervene(false); }} className="text-xs text-green-400 hover:text-white bg-green-500/10 border border-green-700/40 px-3 py-1 rounded-lg transition">
                    🤖 Reactivar
                  </button>
                </div>
                <div className="flex gap-2">
                  <textarea className="flex-1 bg-navy-800 border border-navy-500 text-white rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-river-red placeholder-white/30" rows={2} placeholder="Escribí tu mensaje..." value={msg} onChange={(e) => setMsg(e.target.value)} />
                  <button onClick={() => setMsg("")} className="bg-river-red hover:bg-river-red-dark text-white px-4 py-2 rounded-xl text-sm font-semibold transition self-end">Enviar</button>
                </div>
              </div>
            ) : !showIntervene ? (
              <button onClick={() => setShowIntervene(true)} className="flex items-center gap-2 text-sm text-river-red hover:text-white font-semibold bg-river-red/10 hover:bg-river-red/20 border border-river-red/30 px-4 py-2 rounded-xl w-full justify-center transition">
                ✏️ Intervenir en esta conversación
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-yellow-400 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full" /> Al enviar, el bot pausará sus respuestas
                </p>
                <div className="flex gap-2">
                  <textarea className="flex-1 bg-navy-800 border border-navy-500 text-white rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-river-red placeholder-white/30" rows={2} placeholder="Escribí tu mensaje..." value={msg} onChange={(e) => setMsg(e.target.value)} autoFocus />
                  <div className="flex flex-col gap-1.5 self-end">
                    <button onClick={() => { setBotPausado(true); setMsg(""); }} className="bg-river-red hover:bg-river-red-dark text-white px-4 py-2 rounded-xl text-sm font-semibold transition">Enviar</button>
                    <button onClick={() => { setShowIntervene(false); setMsg(""); }} className="text-xs text-white/40 hover:text-white/70 text-center">Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
