// ── Centro de Estudios Terciarios River Plate (CET) ────────────────────────

export const CET_INFO = {
  nombre: "Centro de Estudios Terciarios River Plate (CET)",
  mision: "Brindar formación técnica superior en periodismo deportivo y comunicación, integrando conocimiento académico, práctica profesional y experiencias reales desde el inicio de la carrera.",
  vision: "Consolidarse como una institución de referencia en la formación técnica superior vinculada al deporte, la comunicación y los medios.",
  presidenta: "Delfina Hempe",
  email: "infoeducativa@riverplate.edu.ar",
  telefono: "(54 9 11) 3569-1218",
  direccion: "Av. Figueroa Alcorta 7597, CABA, Buenos Aires, Argentina",
  web: "cariverplate.com.ar/educacion",
  pilares: [
    "Experiencia práctica permanente",
    "Acompañamiento personalizado",
    "Vínculo directo con el mundo del deporte y los medios",
  ],
};

export const CARRERA = {
  nombre: "Periodismo Deportivo",
  titulo: "Técnico Superior en Periodismo Deportivo",
  validez: "Título oficial con validez nacional",
  duracion: "3 años",
  modalidades: ["Presencial", "A Distancia (100% virtual)"],
  perfil: "Comunicadores deportivos con visión contemporánea, capaces de analizar, narrar y producir contenido para múltiples plataformas. Combina el periodismo tradicional con nuevos lenguajes digitales.",
  salidasLaborales: [
    "Medios de comunicación",
    "Plataformas digitales",
    "Clubes deportivos",
    "Prensa institucional",
    "Redes sociales propias",
    "Emprendimientos propios",
    "Productoras de contenido",
  ],
  planEstudios: [
    "Periodismo gráfico, radial, televisivo y digital",
    "Redes sociales y medios propios",
    "Producción audiovisual y cobertura de eventos",
    "Comunicación institucional y deportiva",
    "Expresión oral, escritura periodística y creación de contenidos",
  ],
  areasTemáticas: [
    "Periodismo Gráfico y Multimedial",
    "Televisión, Radio y Deportes",
    "Redes Sociales y Medios Digitales",
    "Teoría de la Comunicación y Lengua Castellana",
    "Expresión Integral y Oratoria",
    "Creación y Gestión de Medios",
    "Desarrollo de Marca y Comunidad",
  ],
};

export const MODALIDAD_PRESENCIAL = {
  nombre: "Presencial",
  caracteristicas: [
    "Se cursa en el Estadio Más Monumental",
    "Horario: lunes a viernes de 18:00 a 22:30 hs",
    "Asignaturas específicas: Radio, Televisión y Deportes",
  ],
  horario: "Lunes a viernes de 18:00 a 22:30 hs",
  sede: "Estadio Más Monumental, Av. Figueroa Alcorta 7597, CABA",
  ciclo2026: {
    primerCuatrimestre: "16/03/2026 al 11/07/2026",
    segundoCuatrimestre: "04/08/2026 al 28/11/2026",
  },
  planIncluye: [
    "Matrícula anual",
    "Título oficial",
    "Prácticas (Elite / amateur)",
    "Convenios y acuerdos",
  ],
};

export const MODALIDAD_DISTANCIA = {
  nombre: "A Distancia",
  caracteristicas: [
    "100% virtual, desde cualquier lugar del mundo",
    "Sin restricciones geográficas",
    "Estructura flexible basada en bimestres",
    "Cada estudiante define su ritmo y elige cuántas materias cursar",
    "Compatible con agendas laborales y personales",
    "Acceso a clases en vivo, contenido exclusivo y tutorías",
  ],
  ciclo2026: {
    bimestre1: "09/03/2026 al 30/04/2026",
    bimestre2: "11/05/2026 al 03/07/2026",
    bimestre3: "09/03/2026 al 02/10/2026",
    bimestre4: "12/10/2026 al 04/12/2026",
  },
  planIncluye: [
    "Matrícula anual",
    "Título oficial",
    "Prácticas (Elite / amateur)",
    "Convenios y acuerdos",
  ],
};

export const REQUISITOS = [
  "DNI (foto frente y dorso)",
  "Título secundario (foto frente y dorso; si es digital, se puede enviar link)",
  "Si debe materias: constancia de título en trámite",
  "Si cursás el último año: constancia de alumno regular (reemplazar en diciembre por constancia de título en trámite)",
  "No se requiere experiencia previa en periodismo ni en deportes",
];

export const MEDIOS_PAGO = ["Tarjeta de débito", "Transferencia bancaria", "Tarjeta de crédito"];

// ── Respuestas del bot ───────────────────────────────────────────────────────

type BotResponse = { keywords: string[]; response: string };

export const BOT_RESPONSES: BotResponse[] = [
  {
    keywords: ["hola", "buenas", "buenos días", "buenos dias", "buenas tardes", "buenas noches", "hi", "inicio", "empezar", "información", "informacion"],
    response:
      "¡Hola! Bienvenido/a al *Centro de Estudios Terciarios River Plate* 🔴⚪\n\nSoy el asistente virtual del CET. Puedo ayudarte con:\n• La carrera de Periodismo Deportivo\n• Modalidades presencial y a distancia\n• Inscripción y requisitos\n• Aranceles y medios de pago\n• Fechas del ciclo 2026\n\n¿En qué te puedo ayudar?",
  },
  {
    keywords: ["carrera", "qué ofrecen", "oferta", "qué estudian", "qué estudiar", "qué tienen", "que tienen", "propuesta", "formación"],
    response:
      "En el *CET River Plate* ofrecemos la carrera de:\n\n🎙️ *Técnico Superior en Periodismo Deportivo*\n• Duración: 3 años\n• Título oficial con validez nacional\n• Modalidades: Presencial y A Distancia (100% virtual)\n\nFormamos comunicadores deportivos con visión contemporánea para trabajar en medios, clubes, redes sociales, plataformas digitales y emprendimientos propios.\n\n¿Querés saber más sobre alguna modalidad en particular?",
  },
  {
    keywords: ["periodismo", "periodismo deportivo", "técnico", "tecnico", "carrera de periodismo"],
    response:
      "🎙️ *Técnico Superior en Periodismo Deportivo*\n\n• *Título:* Técnico Superior en Periodismo Deportivo (validez nacional)\n• *Duración:* 3 años\n• *Modalidades:* Presencial y A Distancia\n\n*Plan de estudios incluye:*\n• Periodismo gráfico, radial, televisivo y digital\n• Redes sociales y medios propios\n• Producción audiovisual y cobertura de eventos\n• Comunicación institucional y deportiva\n• Expresión oral y escritura periodística\n• Expresión Integral y Oratoria\n• Creación y Gestión de Medios\n• Desarrollo de Marca y Comunidad\n\n¿Querés más info sobre la modalidad presencial o a distancia?",
  },
  {
    keywords: ["presencial", "cursada presencial", "en persona", "horario"],
    response:
      "📍 *Modalidad Presencial*\n\n• *Sede:* Estadio Más Monumental, Av. Figueroa Alcorta 7597, CABA\n• *Horario:* Lunes a viernes de 18:00 a 22:30 hs\n• Asignaturas específicas: Radio, Televisión y Deportes\n\n📅 *Ciclo 2026:*\n• 1° cuatrimestre: 16/03/2026 al 11/07/2026\n• 2° cuatrimestre: 04/08/2026 al 28/11/2026\n\n*Plan STANDARD incluye:*\nMatrícula anual · Título oficial · Prácticas (Elite/amateur) · Convenios\n\n¿Querés información sobre inscripción o aranceles?",
  },
  {
    keywords: ["distancia", "virtual", "online", "a distancia", "remoto", "desde mi casa", "desde cualquier lugar"],
    response:
      "💻 *Modalidad A Distancia — 100% Virtual*\n\n• Desde cualquier lugar del mundo, sin restricciones geográficas\n• Estructura flexible por bimestres\n• Cada estudiante elige su ritmo y cuántas materias cursar\n• Compatible con trabajo y vida personal\n• Clases en vivo, contenido exclusivo y tutorías personalizadas\n\n📅 *Ciclo 2026 — Bimestres:*\n• 1er bimestre: 09/03 al 30/04/2026\n• 2do bimestre: 11/05 al 03/07/2026\n• 3er bimestre: 09/03 al 02/10/2026\n• 4to bimestre: 12/10 al 04/12/2026\n\n*Plan STANDARD incluye:*\nMatrícula anual · Título oficial · Prácticas · Convenios\n\n¿Tenés más preguntas?",
  },
  {
    keywords: ["diferencia", "presencial vs distancia", "cuál es mejor", "cual es mejor", "qué modalidad", "que modalidad"],
    response:
      "🤔 *Diferencia entre Presencial y A Distancia:*\n\n*Presencial:*\n📍 Estadio Más Monumental, CABA\n🕕 Lunes a viernes, 18:00 a 22:30 hs\nIdeal si estás en CABA y preferís clases con presencia física\n\n*A Distancia:*\n💻 100% virtual desde cualquier lugar del mundo\n⏰ Horario flexible, a tu ritmo\n📆 Estructura bimestral — elegís cuántas materias cursar\nIdeal si trabajás, vivís en el interior o en el exterior\n\nAmbas modalidades incluyen el mismo título oficial y plan STANDARD. ¿Cuál se adapta mejor a vos?",
  },
  {
    keywords: ["salida", "salidas laborales", "trabajo", "en qué trabajo", "para qué sirve", "dónde puedo trabajar"],
    response:
      "💼 *Salidas laborales del Técnico en Periodismo Deportivo:*\n\n• Medios de comunicación (TV, radio, gráfica, digital)\n• Plataformas digitales y streaming\n• Clubes deportivos (prensa y comunicación)\n• Prensa institucional\n• Redes sociales propias\n• Emprendimientos propios\n• Productoras de contenido audiovisual\n\nLa carrera combina el periodismo tradicional con nuevos lenguajes digitales, preparándote para múltiples plataformas y formatos.",
  },
  {
    keywords: ["inscripción", "inscripcion", "cómo me inscribo", "como me anoto", "como me inscribo", "inscribirme", "anotarme", "quiero anotarme"],
    response:
      "📋 *Inscripción CET River Plate*\n\n*Documentación requerida:*\n• DNI (foto frente y dorso)\n• Título secundario (foto frente y dorso; si es digital, podés enviar el link)\n• Si debés materias: constancia de título en trámite\n• Si cursás el último año de secundaria: constancia de alumno regular (reemplazarla en diciembre)\n\n✅ *No se requiere experiencia previa en periodismo ni en deportes*\n\n*Medios de pago:*\nTarjeta de débito · Transferencia bancaria · Tarjeta de crédito\n\nPara iniciar tu inscripción:\n📧 infoeducativa@riverplate.edu.ar\n📞 (54 9 11) 3569-1218",
  },
  {
    keywords: ["requisito", "requisitos", "documentación", "documentacion", "qué necesito", "que necesito"],
    response:
      "📄 *Documentación para inscribirse:*\n\n• DNI (foto frente y dorso)\n• Título secundario (foto frente y dorso; o link si es digital)\n• Si debés materias: constancia de título en trámite\n• Si cursás el último año: constancia de alumno regular\n\n✅ No se requiere experiencia previa en periodismo ni en deportes. ¡La carrera está diseñada para principiantes y también para quienes buscan especializarse!\n\n¿Tenés alguna duda sobre la documentación?",
  },
  {
    keywords: ["arancel", "aranceles", "costo", "precio", "cuánto sale", "cuanto cuesta", "cuota", "cuotas", "mensualidad", "pagar", "plata"],
    response:
      "💰 *Aranceles CET River Plate*\n\nPara consultar los valores actualizados de matrícula y cuotas, te recomendamos contactarnos directamente:\n\n📧 *Email:* infoeducativa@riverplate.edu.ar\n📞 *Teléfono:* (54 9 11) 3569-1218\n\n*Medios de pago disponibles:*\n• Tarjeta de débito\n• Transferencia bancaria\n• Tarjeta de crédito\n\nNuestro equipo te dará todos los detalles del plan STANDARD.",
  },
  {
    keywords: ["acompañamiento", "tutores", "docentes", "seguimiento", "ayuda"],
    response:
      "🤝 *Acompañamiento durante la cursada*\n\nSí, en *ambas modalidades* contás con:\n• Docentes y tutores con seguimiento pedagógico\n• Acompañamiento en trabajos y proyectos\n• Orientación profesional durante toda la carrera\n• Acceso a clases en vivo y tutorías personalizadas (distancia)\n\nUno de los pilares del CET es el *acompañamiento personalizado* desde el primer día.",
  },
  {
    keywords: ["certificado", "constancia", "título parcial", "titulo parcial", "si no termino"],
    response:
      "📜 *Certificados y constancias*\n\nNo se entrega título oficial parcial si no se termina la carrera. Sin embargo, sí se pueden solicitar *constancias de materias aprobadas* para acreditar los avances realizados.\n\nEl título final es el *Técnico Superior en Periodismo Deportivo*, con validez nacional, y se obtiene al completar los 3 años.",
  },
  {
    keywords: ["experiencia", "sin experiencia", "no sé nada", "no tengo experiencia", "principiante", "empezar de cero"],
    response:
      "✅ *¡No necesitás experiencia previa!*\n\nLa carrera está diseñada tanto para quienes empiezan desde cero como para quienes buscan reconvertirse o especializarse.\n\nNo se requiere:\n• Experiencia en periodismo\n• Experiencia en deportes\n• Conocimientos técnicos previos\n\nEl CET te forma desde el principio con práctica real desde el inicio de la carrera.",
  },
  {
    keywords: ["dónde", "donde", "ubicación", "ubicacion", "dirección", "direccion", "como llego", "sede", "estadio"],
    response:
      "📍 *Sede del CET River Plate*\n\n*Estadio Más Monumental*\nAv. Figueroa Alcorta 7597, CABA, Buenos Aires\n\n*Horario presencial:* Lunes a viernes, 18:00 a 22:30 hs\n\n*La modalidad a distancia no requiere asistencia presencial — podés estudiar desde cualquier lugar del mundo.*\n\n📞 (54 9 11) 3569-1218\n📧 infoeducativa@riverplate.edu.ar",
  },
  {
    keywords: ["fecha", "fechas", "cuándo empieza", "cuando empieza", "inicio", "2026", "calendario"],
    response:
      "📅 *Ciclo Lectivo 2026*\n\n*Modalidad Presencial:*\n• 1° cuatrimestre: 16/03/2026 al 11/07/2026\n• 2° cuatrimestre: 04/08/2026 al 28/11/2026\n\n*Modalidad A Distancia (bimestres):*\n• 1er bimestre: 09/03 al 30/04/2026\n• 2do bimestre: 11/05 al 03/07/2026\n• 3er bimestre: 09/03 al 02/10/2026\n• 4to bimestre: 12/10 al 04/12/2026\n\n¿Querés empezar en marzo o agosto?",
  },
  {
    keywords: ["river", "club", "river plate", "ca river plate", "ca river"],
    response:
      "🔴⚪ *Centro de Estudios Terciarios River Plate*\n\nEl CET es la institución educativa del *Club Atlético River Plate*, ubicada en el Estadio Más Monumental de Núñez, CABA.\n\nForma parte del proyecto educativo del club, brindando formación técnica superior con vínculo directo con el mundo del deporte y los medios.\n\n¿Te interesa conocer más sobre la carrera de Periodismo Deportivo?",
  },
  {
    keywords: ["contacto", "teléfono", "telefono", "email", "correo", "llamar", "escribir", "comunicarme", "whatsapp", "como los contacto"],
    response:
      "📞 *Contacto CET River Plate*\n\n📧 *Email:* infoeducativa@riverplate.edu.ar\n📞 *Teléfono:* (54 9 11) 3569-1218\n🌐 *Web:* cariverplate.com.ar/educacion\n📍 *Dirección:* Av. Figueroa Alcorta 7597, CABA\n\n¿En qué más puedo ayudarte?",
  },
  {
    keywords: ["gracias", "muchas gracias", "ok", "perfecto", "genial", "listo", "entendí", "entendi", "de acuerdo"],
    response:
      "¡De nada! Fue un placer ayudarte 😊\n\nSi tenés más consultas, escribinos:\n📧 infoeducativa@riverplate.edu.ar\n📞 (54 9 11) 3569-1218\n\n¡Mucho éxito en tu camino en el *CET River Plate*! 🎙️🔴⚪",
  },
];

export function getBotResponse(input: string): string {
  const normalized = input.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  for (const entry of BOT_RESPONSES) {
    if (entry.keywords.some((kw) => normalized.includes(kw.normalize("NFD").replace(/[̀-ͯ]/g, "")))) {
      return entry.response;
    }
  }

  return "Gracias por tu consulta 🙏 No encontré información específica sobre eso.\n\nTe recomiendo contactarnos directamente:\n\n📧 *infoeducativa@riverplate.edu.ar*\n📞 *(54 9 11) 3569-1218*\n🌐 cariverplate.com.ar/educacion\n\nNuestro equipo de admisiones puede ayudarte con cualquier duda sobre el CET River Plate.";
}

export type ConversationTopic =
  | "Carrera"
  | "Inscripción"
  | "Modalidad Presencial"
  | "Modalidad Distancia"
  | "Aranceles"
  | "Contacto"
  | "Otro";

export function classifyTopic(input: string): ConversationTopic {
  const n = input.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (/(periodismo|carrera|tecnico|formacion|plan de estudios|salidas)/.test(n)) return "Carrera";
  if (/(inscripcion|inscribir|requisito|documentacion|anoto|anotarme)/.test(n)) return "Inscripción";
  if (/(presencial|horario|estadio|lunes|viernes)/.test(n)) return "Modalidad Presencial";
  if (/(distancia|virtual|online|bimestre|desde casa|flexible)/.test(n)) return "Modalidad Distancia";
  if (/(arancel|costo|precio|cuota|pagar|tarjeta)/.test(n)) return "Aranceles";
  if (/(contacto|telefono|email|llamar|escribir)/.test(n)) return "Contacto";
  return "Otro";
}
