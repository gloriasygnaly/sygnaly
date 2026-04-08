import { useState, useRef, useEffect } from 'react'
import {
  AlertTriangle, Info, CheckCircle2, XCircle,
  MessageSquare, Send, User, ChevronRight, Sparkles,
  Clock, FileWarning, Shuffle,
} from 'lucide-react'

/* ══════════════════════════════════════════════════════════════
   DATOS — Alertas proactivas
══════════════════════════════════════════════════════════════ */
const alertas = [
  {
    id: 1,
    urgencia: 'urgente',
    icono: AlertTriangle,
    colorBorder: '#E24B4A',
    colorBg: '#FEF2F2',
    colorHeader: '#E24B4A',
    headerBg: '#FEE2E2',
    etiqueta: 'Urgente · Hoy',
    titulo: 'Reunión tripartita mañana',
    colaborador: 'Jorge Ramírez',
    supervisor: 'Rodrigo Soto',
    cuando: 'Mañana 09 Abr · 10:00 hrs · Sala RRHH',
    contexto:
      'Rodrigo Soto debe reunirse con Jorge Ramírez (y RRHH como facilitador) ante la acumulación de señales activas. La tensión del vínculo es alta. La preparación previa del supervisor es crítica para evitar que esta reunión escale el conflicto.',
    evitar: [
      'Mencionar el comparendo ante la Dirección del Trabajo',
      'Usar lenguaje de presión, ultimátum o amenaza de despido',
      'Interrumpir o invalidar lo que el colaborador exprese',
      'Reunirse a solas sin presencia de RRHH',
    ],
    hacer: [
      'Escuchar activamente sin interrumpir',
      'Documentar por escrito los acuerdos alcanzados',
      'Reportar el resultado de la reunión a RRHH ese mismo día',
      'Ofrecer una instancia de seguimiento en 15 días',
    ],
    boton: 'Solicitar coaching previo',
  },
  {
    id: 2,
    urgencia: 'atencion',
    icono: FileWarning,
    colorBorder: '#EF9F27',
    colorBg: '#FFFBEB',
    colorHeader: '#D97706',
    headerBg: '#FEF3C7',
    etiqueta: 'Requiere acción · Esta semana',
    titulo: 'Amonestación pendiente',
    colaborador: 'Patricio Vega',
    supervisor: 'Luis Vera',
    cuando: 'Antes del 11 Abr 2026',
    contexto:
      'Patricio Vega acumula 3 llegadas tarde y un incumplimiento de EPP documentado. Se recomienda emitir una amonestación escrita antes de que prescriba la conducta. Una amonestación mal ejecutada puede ser invalidada en juicio.',
    consideraciones: [
      { label: 'Forma', texto: 'Debe ser escrita y entregada personalmente, con acuse de recibo firmado por el trabajador.' },
      { label: 'Contenido', texto: 'Especificar la conducta concreta: fecha, hora, descripción objetiva (sin juicios de valor).' },
      { label: 'Descargos', texto: 'Ofrecer al trabajador la oportunidad de presentar sus descargos antes de aplicar la sanción.' },
      { label: 'Registro', texto: 'Guardar copia firmada en la carpeta del colaborador. Sygnaly lo registra automáticamente al subir el documento.' },
    ],
    boton: null,
  },
  {
    id: 3,
    urgencia: 'info',
    icono: Info,
    colorBorder: '#185FA5',
    colorBg: '#EFF6FF',
    colorHeader: '#185FA5',
    headerBg: '#DBEAFE',
    etiqueta: 'Atención preventiva',
    titulo: 'Cambio de condiciones laborales',
    colaborador: 'Mónica Torres',
    supervisor: 'Ana Torres',
    cuando: 'Cambio programado para 14 Abr 2026',
    contexto:
      'Se tiene previsto modificar las funciones de Mónica Torres como parte de la reestructuración del área de Administración. Sin el instrumento legal correcto, esta acción puede ser impugnada.',
    advertencia: {
      titulo: 'Riesgo: Despido indirecto art. 171 CT',
      texto:
        'Modificar funciones, jornada, remuneración o lugar de trabajo de forma unilateral y sin el consentimiento escrito del trabajador puede ser invocado como causal de despido indirecto (art. 171 Código del Trabajo). Si el tribunal acoge la demanda, el empleador debe pagar indemnización por años de servicio con recargo de 50–80%.',
      accion: 'Solución: firmar un Anexo de Contrato antes del 14 de abril, con descripción clara de las nuevas condiciones y la firma de Mónica Torres.',
    },
    boton: null,
  },
]

/* ══════════════════════════════════════════════════════════════
   DATOS — Chat
══════════════════════════════════════════════════════════════ */
const roles = ['RRHH', 'Jefatura', 'Legal']

const faqItems = [
  '¿Puedo cambiarle el turno a un trabajador sin su acuerdo?',
  '¿Cuándo corresponde una amonestación escrita?',
  '¿Qué es el despido indirecto art. 171?',
  '¿Cómo documentar un conflicto con un supervisor?',
  '¿Qué obligaciones tiene el empleador ante una denuncia Ley Karin?',
]

const respuestasIA = {
  '¿Puedo cambiarle el turno a un trabajador sin su acuerdo?': `Modificar el turno de forma unilateral puede constituir una modificación sustancial de las condiciones de trabajo, lo que habilita al trabajador a invocar **despido indirecto** conforme al artículo 171 del Código del Trabajo.

**Para hacerlo de forma segura:**
• Obtener el consentimiento escrito mediante un Anexo de Contrato firmado ante testigos
• Documentar la necesidad operacional que justifica el cambio
• Dar aviso con antelación razonable (se recomienda al menos 30 días)

Sin estos pasos, existe riesgo concreto de demanda por despido indirecto con recargo de 50–80% sobre la indemnización por años de servicio.`,

  '¿Cuándo corresponde una amonestación escrita?': `La amonestación escrita procede ante incumplimientos del contrato o del reglamento interno que no justifiquen el despido inmediato pero que requieren constancia formal.

**Requisitos para que sea válida:**
• Entregada por escrito al trabajador
• El trabajador debe firmar una copia con acuse de recibo (si se niega, hacerlo ante dos testigos)
• Debe indicar la conducta específica que la motiva: fecha, lugar, descripción objetiva
• Se recomienda dar al trabajador la oportunidad de presentar descargos

Sygnaly registra estas amonestaciones en la ficha del colaborador al subir el documento firmado.`,

  '¿Qué es el despido indirecto art. 171?': `El despido indirecto (o autodespido) está regulado en el **artículo 171 del Código del Trabajo**. Ocurre cuando es el propio trabajador quien termina el contrato, invocando que el empleador incurrió en una causal del artículo 160 (conducta indebida, incumplimiento grave de obligaciones, etc.).

**Si el tribunal acoge la demanda:**
• El empleador debe pagar la indemnización por años de servicio
• Con un **recargo de 50% a 80%** sobre esa indemnización

**Situaciones de mayor riesgo:**
• Cambios unilaterales de turno, funciones o remuneración
• Acoso laboral no investigado
• Falta o atraso en el pago de remuneraciones`,

  '¿Cómo documentar un conflicto con un supervisor?': `Para que la documentación sea útil en caso de escalada legal:

**Qué registrar:**
• Fecha, hora, lugar y descripción objetiva de cada episodio (sin juicios de valor)
• Nombres de testigos presentes
• Correos, mensajes o comunicaciones relevantes

**Pasos recomendados:**
• Abrir un registro en la ficha del colaborador en Sygnaly
• Si el colaborador presentó queja formal, iniciar investigación conforme a Ley Karin
• Conservar toda documentación por al menos 5 años

La documentación oportuna y objetiva es la principal defensa del empleador en caso de litigio.`,

  '¿Qué obligaciones tiene el empleador ante una denuncia Ley Karin?': `La **Ley 21.643 (Ley Karin)** establece obligaciones concretas ante denuncias de acoso laboral o sexual:

**Plazos y acciones:**
• Adoptar medidas de resguardo inmediatas para proteger al denunciante
• Iniciar investigación interna en un máximo de **5 días hábiles** desde recibida la denuncia (o derivar a la Inspección del Trabajo)
• La investigación debe concluir en **30 días hábiles**
• Informar el resultado a la Dirección del Trabajo

**Consecuencias del incumplimiento:**
• Multas de hasta **150 UTM** (~$9.844.500)
• Responsabilidad civil del empleador

Sygnaly tiene un módulo específico para gestionar el protocolo Ley Karin paso a paso.`,
}

const DISCLAIMER = 'Esta orientación es referencial. No reemplaza asesoría legal profesional.'

const mensajesIniciales = [
  {
    id: 1,
    tipo: 'user',
    texto: '¿Puedo cambiarle el turno a un trabajador sin su acuerdo?',
  },
  {
    id: 2,
    tipo: 'ia',
    texto: respuestasIA['¿Puedo cambiarle el turno a un trabajador sin su acuerdo?'],
  },
]

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */
function parseMarkdown(text) {
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  )
}

function ChatBubble({ msg }) {
  if (msg.tipo === 'user') {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm text-white"
          style={{ background: '#185FA5' }}
        >
          {msg.texto}
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-start gap-2.5">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: '#EFF6FF' }}
      >
        <Sparkles size={13} style={{ color: '#185FA5' }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {msg.texto.split('\n').map((line, i) => {
              const isBullet = line.trimStart().startsWith('•')
              return (
                <p key={i} className={isBullet ? 'pl-2 my-0.5' : 'my-0.5'}>
                  {parseMarkdown(line)}
                </p>
              )
            })}
          </div>
          <div
            className="flex items-start gap-1.5 mt-3 pt-2.5 border-t border-gray-100"
          >
            <Info size={12} className="text-gray-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-400 italic">{DISCLAIMER}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════════════════════════════ */
export default function OrientacionPreventiva() {
  const [tabActiva, setTabActiva] = useState('alertas')
  const [rolActivo, setRolActivo] = useState('RRHH')
  const [mensajes, setMensajes] = useState(mensajesIniciales)
  const [inputTexto, setInputTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  function enviarMensaje(texto) {
    if (!texto.trim()) return
    const userMsg = { id: Date.now(), tipo: 'user', texto: texto.trim() }
    setMensajes((prev) => [...prev, userMsg])
    setInputTexto('')
    setEnviando(true)

    setTimeout(() => {
      const respuesta =
        respuestasIA[texto.trim()] ??
        'No tengo información suficiente en Sygnaly para responder esta consulta con precisión. Te recomiendo contactar al área legal o a un abogado laboral habilitado para este caso específico.'
      setMensajes((prev) => [
        ...prev,
        { id: Date.now() + 1, tipo: 'ia', texto: respuesta },
      ])
      setEnviando(false)
    }, 800)
  }

  return (
    <div className="p-6 max-w-[1100px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Orientación preventiva</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Alertas contextuales y consultas laborales para actuar antes de que el conflicto escale.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 mb-5">
        {[
          { id: 'alertas', label: 'Alertas proactivas' },
          { id: 'chat',    label: 'Consulta a la IA' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTabActiva(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tabActiva === tab.id
                ? 'border-[#185FA5] text-[#185FA5]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tab.id === 'alertas' && (
              <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">
                3
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          TAB 1 — Alertas proactivas
      ══════════════════════════════════════════════════════════ */}
      {tabActiva === 'alertas' && (
        <div className="flex flex-col gap-4">
          {alertas.map((alerta) => {
            const Icon = alerta.icono
            return (
              <div
                key={alerta.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                style={{ border: `1px solid ${alerta.colorBorder}44` }}
              >
                {/* Header de la card */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ background: alerta.headerBg }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} style={{ color: alerta.colorHeader }} />
                    <span className="text-sm font-bold" style={{ color: alerta.colorHeader }}>
                      {alerta.titulo}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ color: alerta.colorHeader, background: alerta.colorBg }}
                    >
                      {alerta.etiqueta}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock size={12} />
                      {alerta.cuando}
                    </div>
                  </div>
                </div>

                {/* Cuerpo */}
                <div className="px-5 py-4">
                  {/* Colaborador */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Colaborador</span>
                      <span className="text-sm font-semibold text-gray-800">{alerta.colaborador}</span>
                    </div>
                    {alerta.supervisor && (
                      <>
                        <ChevronRight size={14} className="text-gray-300" />
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Supervisor</span>
                          <span className="text-sm font-semibold text-gray-800">{alerta.supervisor}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{alerta.contexto}</p>

                  {/* Qué evitar + Qué hacer */}
                  {alerta.evitar && alerta.hacer && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-lg p-3.5" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <XCircle size={13} style={{ color: '#E24B4A' }} />
                          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#E24B4A' }}>Qué evitar</p>
                        </div>
                        <ul className="flex flex-col gap-1.5">
                          {alerta.evitar.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-red-300 mt-0.5 shrink-0 text-xs">•</span>
                              <span className="text-xs text-gray-700 leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg p-3.5" style={{ background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <CheckCircle2 size={13} style={{ color: '#1D9E75' }} />
                          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#1D9E75' }}>Qué sí hacer</p>
                        </div>
                        <ul className="flex flex-col gap-1.5">
                          {alerta.hacer.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 mt-0.5 shrink-0 text-xs">•</span>
                              <span className="text-xs text-gray-700 leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Consideraciones legales */}
                  {alerta.consideraciones && (
                    <div className="rounded-lg p-4 mb-4" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                      <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#D97706' }}>
                        Consideraciones legales
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {alerta.consideraciones.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-xs font-semibold text-amber-600 shrink-0 mt-0.5 min-w-[60px]">
                              {item.label}:
                            </span>
                            <span className="text-xs text-gray-600 leading-snug">{item.texto}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Advertencia despido indirecto */}
                  {alerta.advertencia && (
                    <div className="rounded-lg p-4 mb-4" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#185FA5' }}>
                        ⚠ {alerta.advertencia.titulo}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed mb-2">{alerta.advertencia.texto}</p>
                      <p className="text-xs font-semibold" style={{ color: '#185FA5' }}>
                        {alerta.advertencia.accion}
                      </p>
                    </div>
                  )}

                  {/* Botón */}
                  {alerta.boton && (
                    <button
                      className="mt-1 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: alerta.colorHeader }}
                    >
                      <MessageSquare size={14} />
                      {alerta.boton}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 2 — Consulta a la IA
      ══════════════════════════════════════════════════════════ */}
      {tabActiva === 'chat' && (
        <div className="grid grid-cols-3 gap-4 items-start">
          {/* Panel lateral izquierdo */}
          <div className="flex flex-col gap-4">
            {/* Rol */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Consultar como
              </p>
              <div className="flex flex-col gap-1">
                {roles.map((rol) => (
                  <button
                    key={rol}
                    onClick={() => setRolActivo(rol)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      rolActivo === rol
                        ? 'text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={rolActivo === rol ? { background: '#185FA5' } : {}}
                  >
                    <User size={13} />
                    {rol}
                  </button>
                ))}
              </div>
            </div>

            {/* Preguntas frecuentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Preguntas frecuentes
              </p>
              <div className="flex flex-col gap-1.5">
                {faqItems.map((faq) => (
                  <button
                    key={faq}
                    onClick={() => enviarMensaje(faq)}
                    className="text-left text-xs text-gray-600 hover:text-gray-900 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-start gap-1.5"
                  >
                    <ChevronRight size={11} className="text-gray-300 shrink-0 mt-0.5" />
                    {faq}
                  </button>
                ))}
              </div>
            </div>

            {/* Aviso de alcance */}
            <div
              className="rounded-xl p-3.5 border"
              style={{ background: '#F9FAFB', borderColor: '#E5E7EB' }}
            >
              <div className="flex items-start gap-2">
                <Shuffle size={12} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Esta IA solo responde con información disponible en Sygnaly. No utiliza fuentes externas ni datos de otros sistemas.
                </p>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col" style={{ height: 600 }}>
            {/* Chat header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: '#EFF6FF' }}
              >
                <Sparkles size={14} style={{ color: '#185FA5' }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Orientación Sygnaly</p>
                <p className="text-[11px] text-gray-400">Consultor laboral preventivo · Rol: {rolActivo}</p>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
              {mensajes.map((msg) => (
                <ChatBubble key={msg.id} msg={msg} />
              ))}
              {enviando && (
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#EFF6FF' }}
                  >
                    <Sparkles size={13} style={{ color: '#185FA5' }} />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100">
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  enviarMensaje(inputTexto)
                }}
              >
                <input
                  type="text"
                  value={inputTexto}
                  onChange={(e) => setInputTexto(e.target.value)}
                  placeholder="Escribe tu consulta laboral…"
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 text-gray-700 placeholder-gray-400"
                  disabled={enviando}
                />
                <button
                  type="submit"
                  disabled={!inputTexto.trim() || enviando}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-opacity disabled:opacity-40"
                  style={{ background: '#185FA5' }}
                >
                  <Send size={15} />
                </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-1.5 text-center">{DISCLAIMER}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
