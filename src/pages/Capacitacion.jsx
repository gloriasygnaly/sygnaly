import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  AlertTriangle, Clock, Calendar, Send, Plus, Building2,
  CheckCircle2, Tag, Info, User, Users, ChevronRight,
} from 'lucide-react'

/* ── Necesidades ── */
const necesidades = [
  {
    id: 'n1',
    urgencia: 'urgente',
    urgenciaLabel: 'Urgente',
    titulo: 'Comunicación en situaciones críticas',
    descripcion: 'Preparación para manejar interacciones de alta tensión con colaboradores en proceso de salida o conflicto activo.',
    destinatario: 'Rodrigo Soto',
    tipoDestinatario: 'persona',
    señalOrigen: 'Reunión tripartita mañana — preparación urgente requerida.',
    fechaSugerida: 'Esta semana',
    colorBg: '#FEF2F2',
    colorBorder: '#FECACA',
    colorAccent: '#E24B4A',
    icon: AlertTriangle,
  },
  {
    id: 'n2',
    urgencia: 'esta_semana',
    urgenciaLabel: 'Esta semana',
    titulo: 'Prevención acoso laboral · Ley Karin',
    descripcion: 'Capacitación obligatoria según Ley 21.643. Incluye identificación, denuncia y protocolo de actuación para equipos.',
    destinatario: 'Equipo Administración',
    tipoDestinatario: 'equipo',
    señalOrigen: 'Señal activa: capacitación Ley Karin pendiente en 4 colaboradores del área.',
    fechaSugerida: 'Próximos 7 días',
    colorBg: '#FFFBEB',
    colorBorder: '#FDE68A',
    colorAccent: '#D97706',
    icon: Clock,
  },
  {
    id: 'n3',
    urgencia: 'este_mes',
    urgenciaLabel: 'Este mes',
    titulo: 'Liderazgo y gestión de conflictos',
    descripcion: 'Desarrollo de habilidades para jefaturas en manejo de equipos con señales de fricción interna y bajo desempeño.',
    destinatario: 'Jefaturas Planta Norte y Obras',
    tipoDestinatario: 'grupo',
    señalOrigen: 'Clima laboral deteriorado en Planta Norte · Conflicto no resuelto documentado en Obras.',
    fechaSugerida: 'Este mes',
    colorBg: '#EFF6FF',
    colorBorder: '#BFDBFE',
    colorAccent: '#185FA5',
    icon: Calendar,
  },
]

/* ── Proveedores ── */
const proveedores = [
  {
    id: 'p1',
    nombre: 'Vincular Consulting',
    iniciales: 'VC',
    color: '#185FA5',
    descripcion: 'Consultoría en desarrollo organizacional con foco en comunicación crítica y procesos de cambio.',
    especialidades: ['Comunicación en crisis', 'Gestión de conflictos', 'Coaching ejecutivo'],
    contacto: 'contacto@vincular.cl',
    tipo: 'Consultoría',
  },
  {
    id: 'p2',
    nombre: 'Forma Laboral',
    iniciales: 'FL',
    color: '#1D9E75',
    descripcion: 'Especialistas en normativa laboral chilena. Programas certificados para cumplimiento legal y derechos fundamentales.',
    especialidades: ['Ley Karin', 'Derechos fundamentales', 'Normativa laboral'],
    contacto: 'capacitacion@formalaboral.cl',
    tipo: 'Relator legal',
  },
  {
    id: 'p3',
    nombre: 'Enlace RH',
    iniciales: 'ER',
    color: '#534AB7',
    descripcion: 'Programas de intervención en clima y liderazgo. Especialidad en re-enganche y retención de talento.',
    especialidades: ['Re-enganche laboral', 'Liderazgo situacional', 'Diagnóstico de clima'],
    contacto: 'info@enlacerh.cl',
    tipo: 'RRHH & Clima',
  },
]

const chipColors = [
  { bg: '#EFF6FF', color: '#185FA5' },
  { bg: '#ECFDF5', color: '#1D9E75' },
  { bg: '#F0EFFE', color: '#534AB7' },
  { bg: '#FFFBEB', color: '#D97706' },
]

/* ── Components ── */
function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium transition-colors rounded-lg"
      style={active
        ? { background: '#185FA5', color: '#fff' }
        : { color: '#6B7280' }}
    >
      {label}
    </button>
  )
}

/* ════════════════════════════════════════════════════════════════ */
export default function Capacitacion() {
  const { pathname } = useLocation()
  const [tab, setTab] = useState(pathname.includes('proveedores') ? 1 : 0)
  const [solicitados, setSolicitados] = useState({})
  const [showAgregar, setShowAgregar] = useState(false)

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Capacitación</h1>
          <p className="text-gray-500 text-sm mt-0.5">Necesidades detectadas por señales activas y catálogo de proveedores</p>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          <TabBtn label="Necesidades detectadas" active={tab === 0} onClick={() => setTab(0)} />
          <TabBtn label="Proveedores"            active={tab === 1} onClick={() => setTab(1)} />
        </div>
      </div>

      {/* ── TAB 0: Necesidades ── */}
      {tab === 0 && (
        <div className="flex flex-col gap-4">
          {/* Banner */}
          <div
            className="rounded-xl px-5 py-4 flex items-center gap-4"
            style={{ background: 'linear-gradient(135deg, #185FA5 0%, #534AB7 100%)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} color="white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-base">
                Sygnaly detectó {necesidades.length} necesidades de capacitación basadas en señales activas
              </p>
              <p className="text-white/70 text-xs mt-0.5">
                Las necesidades se generan automáticamente a partir de señales activas en el sistema. No reemplazan el criterio del equipo RRHH.
              </p>
            </div>
            <span className="bg-white/20 text-white text-sm font-bold px-3 py-1.5 rounded-full shrink-0">
              {necesidades.length} activas
            </span>
          </div>

          {/* Cards */}
          {necesidades.map((n) => {
            const Icon = n.icon
            const solicitado = solicitados[n.id]
            return (
              <div
                key={n.id}
                className="rounded-xl border-2 overflow-hidden"
                style={{ borderColor: n.colorBorder, background: '#fff' }}
              >
                {/* Top stripe */}
                <div className="px-5 py-2.5 flex items-center gap-3" style={{ background: n.colorBg }}>
                  <Icon size={14} style={{ color: n.colorAccent }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: n.colorAccent }}>
                    {n.urgenciaLabel}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">{n.fechaSugerida}</span>
                </div>

                <div className="px-5 py-4 flex gap-5">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{n.titulo}</h3>
                    <p className="text-sm text-gray-500 mt-1">{n.descripcion}</p>

                    {/* Destinatario */}
                    <div className="mt-3 flex items-center gap-2">
                      {n.tipoDestinatario === 'persona'
                        ? <User size={13} className="text-gray-400" />
                        : <Users size={13} className="text-gray-400" />}
                      <span className="text-xs font-medium text-gray-700">{n.destinatario}</span>
                    </div>

                    {/* Señal origen */}
                    <div className="mt-2 flex items-start gap-1.5 rounded-lg px-3 py-2" style={{ background: n.colorBg }}>
                      <Tag size={12} style={{ color: n.colorAccent }} className="shrink-0 mt-0.5" />
                      <p className="text-xs font-medium" style={{ color: n.colorAccent }}>
                        Señal detectada: {n.señalOrigen}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    {solicitado ? (
                      <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#1D9E75' }}>
                        <CheckCircle2 size={16} /> Solicitud enviada
                      </span>
                    ) : (
                      <button
                        onClick={() => setSolicitados((s) => ({ ...s, [n.id]: true }))}
                        className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
                        style={{ background: n.colorAccent }}
                      >
                        <Send size={13} /> Solicitar propuesta
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          <div className="rounded-lg px-4 py-2.5 flex items-start gap-2" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
            <Info size={14} style={{ color: '#185FA5' }} className="shrink-0 mt-0.5" />
            <p className="text-xs" style={{ color: '#1E40AF' }}>
              Las necesidades detectadas son sugerencias basadas en señales activas. El equipo RRHH decide si proceder con la capacitación.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB 1: Proveedores ── */}
      {tab === 1 && (
        <div className="flex flex-col gap-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{proveedores.length} proveedores en el catálogo</p>
            <button
              onClick={() => setShowAgregar(true)}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
              style={{ background: '#185FA5' }}
            >
              <Plus size={14} /> Agregar proveedor
            </button>
          </div>

          {/* Nota */}
          <div className="rounded-lg px-4 py-2.5 flex items-start gap-2" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <Info size={14} style={{ color: '#D97706' }} className="shrink-0 mt-0.5" />
            <p className="text-xs" style={{ color: '#92400E' }}>
              El catálogo de proveedores lo arma cada empresa. Los proveedores que aparecen aquí son ejemplos — en producción no hay proveedores preinstalados.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-4">
            {proveedores.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md hover:border-gray-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: p.color }}
                  >
                    {p.iniciales}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{p.nombre}</p>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: '#F3F4F6', color: '#6B7280' }}>
                      {p.tipo}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">{p.descripcion}</p>

                <div className="flex flex-wrap gap-1">
                  {p.especialidades.map((e, i) => (
                    <span
                      key={e}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                      style={chipColors[i % chipColors.length]}
                    >
                      {e}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{p.contacto}</span>
                  <button className="text-xs font-semibold flex items-center gap-1" style={{ color: '#185FA5' }}>
                    Ver perfil <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}

            {/* Add card */}
            <button
              onClick={() => setShowAgregar(true)}
              className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center gap-2 hover:border-gray-300 hover:bg-gray-100 transition-all min-h-[180px]"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                <Plus size={18} className="text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-400">Agregar proveedor</p>
            </button>
          </div>

          {showAgregar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setShowAgregar(false)}>
              <div
                className="bg-white rounded-2xl shadow-2xl p-6 w-[440px] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">Agregar proveedor</h3>
                <p className="text-xs text-gray-400 mb-4">Ingresa los datos del proveedor para agregarlo al catálogo.</p>
                <div className="flex flex-col gap-3">
                  {['Nombre del proveedor', 'Tipo (relator, consultora…)', 'Correo de contacto', 'Especialidades (separadas por coma)'].map((label) => (
                    <div key={label}>
                      <label className="text-xs font-medium text-gray-600 block mb-1">{label}</label>
                      <input
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                        placeholder={label}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2 mt-5">
                  <button
                    onClick={() => setShowAgregar(false)}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setShowAgregar(false)}
                    className="px-4 py-2 text-sm font-semibold text-white rounded-xl"
                    style={{ background: '#185FA5' }}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
