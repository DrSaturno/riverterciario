import { useState, useRef, useEffect } from "react";
import { getBotResponse, classifyTopic } from "../data/iurpKnowledge";

interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
  time: string;
  topic?: string;
}

const QUICK_OPTIONS = [
  "¿Qué carrera ofrecen?",
  "¿Cómo es la modalidad a distancia?",
  "¿Cómo me inscribo?",
  "¿Qué salidas laborales tiene?",
  "¿Cuándo arrancan las clases?",
  "¿Cuánto cuesta?",
];

function formatWhatsApp(text: string) {
  return text
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}

function now() {
  return new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

const WELCOME: Message = {
  id: "0",
  from: "bot",
  text: "¡Hola! Bienvenido/a al asistente virtual del *Centro de Estudios Terciarios River Plate* 🔴⚪\n\nPuedo ayudarte con información sobre la carrera de *Periodismo Deportivo*, modalidades presencial y a distancia, inscripción, fechas del ciclo 2026 y más.\n\n¿En qué te puedo ayudar hoy?",
  time: now(),
};

export default function BotChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      from: "user",
      text: text.trim(),
      time: now(),
      topic: classifyTopic(text),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botText = getBotResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        from: "bot",
        text: botText,
        time: now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

  return (
    <div className="p-6 h-screen flex flex-col gap-4 max-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white">Demo Bot WhatsApp</h1>
          <p className="text-sm text-slate-400 mt-0.5">Simulación del asistente virtual del CET River Plate</p>
        </div>
        <span className="badge-green">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          En línea
        </span>
      </div>

      {/* Quick options strip */}
      <div className="flex-shrink-0 flex items-center gap-2 flex-wrap">
        {QUICK_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => send(opt)}
            disabled={typing}
            className="text-xs text-slate-300 hover:text-white bg-navy-700 hover:bg-navy-600 border border-navy-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-full px-3 py-1.5 transition-colors whitespace-nowrap"
          >
            {opt}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-4 text-xs text-slate-500">
          <span>
            <span className="text-white font-medium">{messages.filter((m) => m.from === "user").length}</span> enviados
          </span>
          <span>
            <span className="text-white font-medium">{messages.filter((m) => m.from === "bot").length}</span> respuestas
          </span>
          <button
            onClick={() => setMessages([WELCOME])}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Chat window — full width */}
      <div className="flex-1 flex flex-col card overflow-hidden min-h-0">
        {/* Chat header */}
        <div className="px-4 py-3 border-b border-navy-500 flex items-center gap-3 bg-navy-900 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-river-red flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">
            CET
          </div>
          <div>
            <p className="text-sm font-semibold text-white">CET River Plate — Asistente Virtual</p>
            <p className="text-[11px] text-green-400">en línea</p>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-2"
          style={{ background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23162040' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\") #0d1b35" }}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.from === "user"
                    ? "bg-river-red text-white rounded-tr-sm"
                    : "bg-navy-600 text-slate-100 rounded-tl-sm"
                }`}
              >
                <p
                  className="leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formatWhatsApp(msg.text) }}
                />
                <p className={`text-[10px] mt-1 text-right ${msg.from === "user" ? "text-red-200" : "text-slate-500"}`}>
                  {msg.time}
                  {msg.from === "user" && " ✓✓"}
                </p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-navy-600 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-navy-500 bg-navy-900 flex-shrink-0">
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => { e.preventDefault(); send(input); }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu consulta..."
              className="flex-1 bg-navy-700 border border-navy-500 rounded-full px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-river-red transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="w-9 h-9 rounded-full bg-river-red hover:bg-river-red-dark disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
