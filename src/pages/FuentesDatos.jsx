import { useState } from 'react'
import {
  CheckCircle2, XCircle, RefreshCw, Upload, FileText, Users,
  ClipboardList, BookOpen, ChevronRight, ArrowRight, Cpu, Database,
  BarChart2, Bell, AlertTriangle, Info,
} from 'lucide-react'

/* ── Conexiones API ── */
const conexiones = [
  {
    id: 'buk',
    nombre: 'Buk',
    descripcion: 'RRHH & Remuneraciones',
    estado: 'conectado',
    sincroniza: ['Liquidaciones de sueldo', 'Registro de asistencia', 'Licencias médicas'],
    color: '#1D9E75',
    bg: '#ECFDF5',
    ultimo: 'Hace 12 min',
  },
  {
    id: 'peoplework',
    nombre: 'PeopleWork',
    descripcion: 'Gestión de personas',
    estado: 'conectado',
    sincroniza: ['Contratos y anexos', 'Registros de capacitación', 'Evaluaciones de desempeño'],
    color: '#185FA5',
    bg: '#EFF6FF',
    ultimo: 'Hace 1 hora',
  },
  {
    id: 'previred',
    nombre: 'Previred',
    descripcion: 'Cotizaciones previsionales',
    estado: 'error',
    sincroniza: ['Declaración y pago cotizaciones', 'Certificados previsionales'],
    color: '#E24B4A',
    bg: '#FEF2F2',
    ultimo: 'Error hace 3 horas',
    errorMsg: 'No se puede autenticar con las credenciales actuales. Actualice el token de acceso.',
  },
  {
    id: 'dt',
    nombre: 'Dirección del Trabajo',
    descripcion: 'Fiscalización y normativa DT',
    estado: 'conectado',
    sincroniza: ['Comparendos activos', 'Notificaciones de fiscalización', 'Normativa actualizada'],
    color: '#534AB7',
    bg: '#F0EFFE',
    ultimo: 'Sincronización automática',
    esAutomatic: true,
  },
]

/* ── Carga manual ── */
const tiposCarga = [
  {
    id: 'docs',
    titulo: 'Documentos del colaborador',
    desc: 'Contratos, anexos, amonestaciones, finiquitos.',
    icon: FileText,
    accept: '.pdf,.docx',
    color: '#185FA5',
    bg: '#EFF6FF',
  },
  {
    id: 'actas',
    titulo: 'Actas y minutas',
    desc: 'Actas de reuniones, tripartitas, mediaciones.',
    icon: ClipboardList,
    accept: '.pdf,.docx,.txt',
    color: '#534AB7',
    bg: '#F0EFFE',
  },
  {
    id: 'encuestas',
    titulo: 'Encuestas de clima',
    desc: 'Resultados de encuestas internas o externas.',
    icon: Users,
    accept: '.xlsx,.csv,.pdf',
    color: '#1D9E75',
    bg: '#ECFDF5',
  },
  {
    id: 'normativa',
    titulo: 'Normativa interna',
    desc: 'Reglamentos, políticas, procedimientos internos.',
    icon: BookOpen,
    accept: '.pdf,.docx',
    color: '#EF9F27',
    bg: '#FFFBEB',
  },
]

/* ── Flujo de datos ── */
const pasosFlujo = [
  { icon: Database,    label: 'Fuentes',           desc: 'APIs, carga manual',         color: '#185FA5' },
  { icon: Cpu,         label: 'IA procesa',         desc: 'Extrae y estructura',         color: '#534AB7' },
  { icon: BarChart2,   label: 'Se organiza',        desc: 'Por colaborador y factor',    color: '#1D9E75' },
  { icon: RefreshCw,   label: 'Modelo pondera',     desc: 'Relevancia y contexto',       color: '#EF9F27' },
  { icon: Bell,        label: 'Alerta preventiva',  desc: 'Señal activa en el sistema',  color: '#E24B4A' },
]

/* ── Sub-components ── */
function EstadoBadge({ estado }) {
  if (estado === 'conectado')
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: '#1D9E75', background: '#ECFDF5' }}>
        <CheckCircle2 size={12} /> Conectado
      </span>
    )
  if (estado === 'error')
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: '#E24B4A', background: '#FEF2F2' }}>
        <XCircle size={12} /> Error de conexión
      </span>
    )
  return null
}

/* ════════════════════════════════════════════════════════════════ */
export default function FuentesDatos() {
  const [uploading, setUploading] = useState({})
  const [uploaded, setUploaded]   = useState({})

  function handleUpload(id) {
    setUploading((s) => ({ ...s, [id]: true }))
    setTimeout(() => {
      setUploading((s) => ({ ...s, [id]: false }))
      setUploaded((s) => ({ ...s, [id]: true }))
    }, 1500)
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fuentes de datos</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Conexiones activas, carga manual con IA y flujo de procesamiento
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* ── Bloque 1: Conexiones API ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Database size={15} className="text-gray-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Conexiones API</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {conexiones.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border overflow-hidden shadow-sm"
                style={{ borderColor: c.estado === 'error' ? '#FECACA' : '#E5E7EB' }}
              >
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between" style={{ background: c.bg }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ background: c.color }}
                    >
                      {c.nombre.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{c.nombre}</p>
                      <p className="text-[11px] text-gray-500">{c.descripcion}</p>
                    </div>
                  </div>
                  <EstadoBadge estado={c.estado} />
                </div>

                {/* Body */}
                <div className="px-4 py-3 flex flex-col gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Sincroniza</p>
                  <ul className="flex flex-col gap-1">
                    {c.sincroniza.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: c.color }} />
                        {s}
                      </li>
                    ))}
                  </ul>

                  {c.errorMsg && (
                    <div className="mt-1 flex items-start gap-2 rounded-lg px-3 py-2" style={{ background: '#FEF2F2' }}>
                      <AlertTriangle size={12} style={{ color: '#E24B4A' }} className="shrink-0 mt-0.5" />
                      <p className="text-[11px] font-medium" style={{ color: '#991B1B' }}>{c.errorMsg}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-gray-50 mt-1">
                    <p className="text-[11px] text-gray-400">{c.ultimo}</p>
                    {c.estado === 'error' ? (
                      <button className="text-xs font-semibold flex items-center gap-1" style={{ color: '#E24B4A' }}>
                        <RefreshCw size={11} /> Reconectar
                      </button>
                    ) : (
                      <button className="text-xs font-semibold flex items-center gap-1 text-gray-400 hover:text-gray-600">
                        <RefreshCw size={11} /> Sincronizar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bloque 2: Carga manual con IA ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Upload size={15} className="text-gray-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Carga manual con IA</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {tiposCarga.map((t) => {
              const Icon = t.icon
              const isLoading = uploading[t.id]
              const isDone    = uploaded[t.id]
              return (
                <div
                  key={t.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: t.bg }}
                    >
                      <Icon size={16} style={{ color: t.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{t.titulo}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                    </div>
                  </div>

                  {/* IA note */}
                  <div className="flex items-start gap-1.5 rounded-lg px-3 py-2" style={{ background: '#F0EFFE' }}>
                    <Cpu size={12} style={{ color: '#534AB7' }} className="shrink-0 mt-0.5" />
                    <p className="text-[11px] font-medium" style={{ color: '#4338CA' }}>
                      La IA extrae y estructura el contenido automáticamente.
                    </p>
                  </div>

                  {isDone ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#1D9E75' }}>
                      <CheckCircle2 size={14} /> Archivo procesado correctamente
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUpload(t.id)}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg border-2 border-dashed transition-colors"
                      style={isLoading
                        ? { borderColor: '#E5E7EB', color: '#9CA3AF', cursor: 'wait' }
                        : { borderColor: t.color + '55', color: t.color }}
                    >
                      {isLoading ? (
                        <><RefreshCw size={13} className="animate-spin" /> Procesando…</>
                      ) : (
                        <><Upload size={13} /> Subir archivo ({t.accept})</>
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Bloque 3: Flujo de datos ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight size={15} className="text-gray-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Flujo de datos</h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5">
            <p className="text-xs text-gray-400 mb-5 text-center">
              Cómo viajan los datos desde las fuentes hasta generar una alerta preventiva en el sistema
            </p>

            <div className="flex items-center justify-between gap-2">
              {pasosFlujo.map((p, i) => {
                const Icon = p.icon
                return (
                  <div key={p.label} className="flex items-center gap-2 flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-sm"
                        style={{ background: p.color + '18' }}
                      >
                        <Icon size={20} style={{ color: p.color }} />
                      </div>
                      <p className="text-xs font-semibold text-gray-800 text-center">{p.label}</p>
                      <p className="text-[11px] text-gray-400 text-center mt-0.5 leading-snug">{p.desc}</p>
                    </div>
                    {i < pasosFlujo.length - 1 && (
                      <ChevronRight size={16} className="text-gray-200 shrink-0 mb-6" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Nota */}
        <div className="rounded-lg px-4 py-2.5 flex items-start gap-2" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <Info size={14} style={{ color: '#185FA5' }} className="shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: '#1E40AF' }}>
            Las conexiones API sincronizan datos de forma periódica. La carga manual permite incorporar documentos que no están disponibles digitalmente. Sygnaly no almacena información sensible fuera del entorno contratado por la empresa.
          </p>
        </div>
      </div>
    </div>
  )
}
