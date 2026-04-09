import { User, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'

/* ── Data ── */
const columnas = [
  {
    id: 'por_iniciar',
    label: 'Por iniciar',
    color: '#6B7280',
    bg: '#F9FAFB',
    borderColor: '#E5E7EB',
    headerBg: '#F3F4F6',
    tarjetas: [
      {
        id: 'ac1',
        colaborador: 'Rodrigo Soto',
        iniciales: 'RS',
        avatarColor: '#1D9E75',
        cargo: 'Jefatura Planta Norte',
        tipoAccion: 'Coaching',
        descripcion: 'Coaching previo a reunión tripartita con J. Ramírez. Preparar comunicación en situaciones críticas.',
        responsable: 'Carolina Muñoz',
        prioridad: 'urgente',
        plazo: 'Mañana',
      },
      {
        id: 'ac2',
        colaborador: 'Mónica Torres',
        iniciales: 'MT',
        avatarColor: '#EF9F27',
        cargo: 'Administración',
        tipoAccion: 'Entrevista escucha activa',
        descripcion: 'Entrevista para explorar percepción sobre cambio de condiciones y prevenir escalada a demanda art. 171.',
        responsable: 'Carolina Muñoz',
        prioridad: 'requiere_atencion',
        plazo: 'Esta semana',
      },
    ],
  },
  {
    id: 'en_proceso',
    label: 'En proceso',
    color: '#185FA5',
    bg: '#EFF6FF',
    borderColor: '#BFDBFE',
    headerBg: '#DBEAFE',
    tarjetas: [
      {
        id: 'ac3',
        colaborador: 'Jorge Ramírez',
        iniciales: 'JR',
        avatarColor: '#185FA5',
        cargo: 'Operario de producción',
        tipoAccion: 'Contención emocional',
        descripcion: 'Sesión 1 de 3 completada. Foco en reducción de conductas reactivas en piso de planta.',
        responsable: 'Equipo RRHH',
        prioridad: 'urgente',
        plazo: 'Iniciada hace 3 días',
        progreso: { actual: 1, total: 3 },
      },
      {
        id: 'ac4',
        colaborador: 'Fernanda Castillo',
        iniciales: 'FC',
        avatarColor: '#534AB7',
        cargo: 'Administración',
        tipoAccion: 'Coaching',
        descripcion: 'Sesión 1 de 3 completada. Acompañamiento durante proceso activo Ley Karin.',
        responsable: 'Carolina Muñoz',
        prioridad: 'urgente',
        plazo: 'En curso',
        progreso: { actual: 1, total: 3 },
      },
    ],
  },
  {
    id: 'vinculo_fortalecido',
    label: 'Vínculo fortalecido',
    color: '#1D9E75',
    bg: '#ECFDF5',
    borderColor: '#A7F3D0',
    headerBg: '#D1FAE5',
    tarjetas: [
      {
        id: 'ac5',
        colaborador: 'Luis Fuentes',
        iniciales: 'LF',
        avatarColor: '#1D9E75',
        cargo: 'Planta Norte',
        tipoAccion: 'Capacitación',
        descripcion: 'Capacitación Ley Karin completada. Señales activas resueltas. Vínculo laboral estabilizado.',
        responsable: 'Forma Laboral',
        prioridad: 'resuelto',
        plazo: 'Completado Abr 2026',
      },
    ],
  },
  {
    id: 'derivada_protocolo',
    label: 'Derivadas a protocolo',
    color: '#E24B4A',
    bg: '#FEF2F2',
    borderColor: '#FECACA',
    headerBg: '#FEE2E2',
    tarjetas: [
      {
        id: 'ac6',
        colaborador: 'Rodrigo Espinoza',
        iniciales: 'RE',
        avatarColor: '#E24B4A',
        cargo: 'Planta Sur',
        tipoAccion: 'Protocolo de salida',
        descripcion: 'Acción remedial sin efecto. Señales persistentes. Derivado a protocolo de salida con asesoría legal.',
        responsable: 'Jorge Lagos (Legal)',
        prioridad: 'protocolo',
        plazo: 'Activado Mar 2026',
      },
    ],
  },
]

const prioridadConfig = {
  urgente:           { label: 'Urgente',            color: '#E24B4A', bg: '#FEF2F2' },
  requiere_atencion: { label: 'Requiere atención',  color: '#EF9F27', bg: '#FFFBEB' },
  resuelto:          { label: 'Resuelto',            color: '#1D9E75', bg: '#ECFDF5' },
  protocolo:         { label: 'En protocolo',        color: '#E24B4A', bg: '#FEF2F2' },
}

const tipoColors = {
  'Coaching':                { bg: '#EFF6FF',  color: '#185FA5' },
  'Entrevista escucha activa':{ bg: '#F0EFFE',  color: '#534AB7' },
  'Contención emocional':    { bg: '#FFFBEB',  color: '#D97706' },
  'Capacitación':            { bg: '#ECFDF5',  color: '#1D9E75' },
  'Protocolo de salida':     { bg: '#FEF2F2',  color: '#E24B4A' },
}

/* ── Sub-components ── */
function ProgresoBar({ actual, total }) {
  const pct = Math.round((actual / total) * 100)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-gray-400">Sesión {actual} de {total}</span>
        <span className="font-semibold text-gray-600">{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-gray-100">
        <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: '#185FA5' }} />
      </div>
    </div>
  )
}

function TarjetaAccion({ t }) {
  const prioridad = prioridadConfig[t.prioridad]
  const tipoColor = tipoColors[t.tipoAccion] ?? { bg: '#F3F4F6', color: '#6B7280' }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
      {/* Colaborador */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
            style={{ background: t.avatarColor }}
          >
            {t.iniciales}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900 leading-tight">{t.colaborador}</p>
            <p className="text-[11px] text-gray-400">{t.cargo}</p>
          </div>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
          style={{ color: prioridad.color, background: prioridad.bg }}
        >
          {prioridad.label}
        </span>
      </div>

      {/* Tipo acción */}
      <span
        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full self-start"
        style={tipoColor}
      >
        {t.tipoAccion}
      </span>

      {/* Descripción */}
      <p className="text-xs text-gray-500 leading-relaxed">{t.descripcion}</p>

      {/* Progreso */}
      {t.progreso && <ProgresoBar actual={t.progreso.actual} total={t.progreso.total} />}

      {/* Footer */}
      <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <User size={10} /> {t.responsable}
        </div>
        <span className="text-[11px] text-gray-400">{t.plazo}</span>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════ */
export default function AccionesRemediales() {
  const totalAcciones = columnas.reduce((s, c) => s + c.tarjetas.length, 0)

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Acciones remediales</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {totalAcciones} acciones activas · vista kanban por estado
        </p>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-4 gap-4 items-start">
        {columnas.map((col) => (
          <div key={col.id} className="flex flex-col gap-3">
            {/* Column header */}
            <div
              className="rounded-xl px-4 py-2.5 flex items-center justify-between border"
              style={{ background: col.headerBg, borderColor: col.borderColor }}
            >
              <span className="text-xs font-bold" style={{ color: col.color }}>{col.label}</span>
              <span
                className="text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: col.color, color: '#fff' }}
              >
                {col.tarjetas.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
              {col.tarjetas.map((t) => (
                <TarjetaAccion key={t.id} t={t} />
              ))}
            </div>

            {/* Empty state */}
            {col.tarjetas.length === 0 && (
              <div
                className="rounded-xl border-2 border-dashed p-6 flex items-center justify-center"
                style={{ borderColor: col.borderColor }}
              >
                <p className="text-xs text-gray-300 text-center">Sin acciones en esta etapa</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Flujo visual */}
      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Flujo de acción remedial</p>
        <div className="flex items-center gap-2 flex-wrap">
          {['Por iniciar', 'En proceso', 'Vínculo fortalecido', 'Derivadas a protocolo'].map((etapa, i, arr) => (
            <div key={etapa} className="flex items-center gap-2">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={
                  etapa === 'Vínculo fortalecido'
                    ? { background: '#ECFDF5', color: '#1D9E75' }
                    : etapa === 'Derivadas a protocolo'
                    ? { background: '#FEF2F2', color: '#E24B4A' }
                    : etapa === 'En proceso'
                    ? { background: '#EFF6FF', color: '#185FA5' }
                    : { background: '#F3F4F6', color: '#6B7280' }
                }
              >
                {etapa}
              </span>
              {i < arr.length - 1 && <ArrowRight size={13} className="text-gray-300" />}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          Las acciones que no logran fortalecer el vínculo se derivan al protocolo de salida con acompañamiento legal.
        </p>
      </div>
    </div>
  )
}
