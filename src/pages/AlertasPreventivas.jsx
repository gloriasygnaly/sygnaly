import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Clock, Info, ChevronRight, User, MapPin, Lightbulb } from 'lucide-react'

/* ── Data ── */
const alertas = [
  {
    id: 'a1',
    nivel: 'urgente',
    nivelLabel: 'Urgente',
    titulo: 'Reunión tripartita sin preparación',
    colaborador: 'Jorge Ramírez',
    iniciales: 'JR',
    avatarColor: '#185FA5',
    area: 'Planta Norte',
    descripcion: 'Rodrigo Soto debe reunirse mañana con Jorge Ramírez y un representante sindical sin haber recibido coaching previo. Alta probabilidad de escalada del conflicto activo.',
    accionRecomendada: 'Solicitar orientación preventiva antes de la reunión. Preparar al jefe de turno con técnicas de comunicación en situaciones críticas.',
    tipoAccion: 'Orientación preventiva',
    fechaDeteccion: 'Hoy',
    color: '#E24B4A',
    bg: '#FEF2F2',
    borderColor: '#FECACA',
  },
  {
    id: 'a2',
    nivel: 'urgente',
    nivelLabel: 'Urgente',
    titulo: 'Proceso Ley Karin activo',
    colaborador: 'Fernanda Castillo',
    iniciales: 'FC',
    avatarColor: '#534AB7',
    area: 'Administración',
    descripcion: 'Existe una investigación activa por acoso laboral bajo Ley Karin 21.643. La empresa debe mantener la reserva del proceso y precaución absoluta ante cualquier acción disciplinaria paralela.',
    accionRecomendada: 'No tomar medidas disciplinarias mientras dure la investigación. Verificar que el proceso cumple los plazos legales (30 días hábiles). Consultar con asesor legal.',
    tipoAccion: 'Orientación preventiva',
    fechaDeteccion: 'Hace 2 días',
    color: '#E24B4A',
    bg: '#FEF2F2',
    borderColor: '#FECACA',
  },
  {
    id: 'a3',
    nivel: 'requiere_atencion',
    nivelLabel: 'Requiere atención',
    titulo: 'Amonestación pendiente sin protocolo',
    colaborador: 'Patricio Vega',
    iniciales: 'PV',
    avatarColor: '#EF9F27',
    area: 'Planta Norte',
    descripcion: 'Se tiene previsto aplicar una amonestación escrita sin haber seguido el protocolo formal. Una amonestación mal aplicada puede ser impugnada por el trabajador y debilitar futuros argumentos disciplinarios.',
    accionRecomendada: 'Revisar procedimiento de amonestación: carta escrita, firma de recepción, testigos y archivo en carpeta del colaborador. Ver orientación preventiva para el protocolo completo.',
    tipoAccion: 'Orientación preventiva',
    fechaDeteccion: 'Hoy',
    color: '#EF9F27',
    bg: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  {
    id: 'a4',
    nivel: 'requiere_atencion',
    nivelLabel: 'Requiere atención',
    titulo: 'Cambio de condiciones sin anexo',
    colaborador: 'Mónica Torres',
    iniciales: 'MT',
    avatarColor: '#1D9E75',
    area: 'Administración',
    descripcion: 'Se realizaron cambios en las condiciones laborales (horario, funciones) sin documentarlos en un anexo de contrato firmado. Esto expone a la empresa a una demanda por despido indirecto bajo Art. 171 CT.',
    accionRecomendada: 'Formalizar los cambios con un anexo de contrato firmado por ambas partes. Ver orientación preventiva para el modelo de anexo.',
    tipoAccion: 'Orientación preventiva',
    fechaDeteccion: 'Hace 3 días',
    color: '#EF9F27',
    bg: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  {
    id: 'a5',
    nivel: 'observacion',
    nivelLabel: 'En observación',
    titulo: 'Capacitación Ley Karin venciendo',
    colaborador: 'Equipo Obras',
    iniciales: 'EO',
    avatarColor: '#185FA5',
    area: 'Obras',
    descripcion: 'El equipo de Obras tiene pendiente completar la capacitación obligatoria en Ley Karin 21.643. El plazo vence el 30 de abril. Incumplir expone a la empresa a multa DT.',
    accionRecomendada: 'Programar la capacitación antes del 30 de abril. Ver el catálogo de proveedores para relators certificados en Ley Karin.',
    tipoAccion: 'Capacitación',
    fechaDeteccion: 'Vence 30 Abr',
    color: '#185FA5',
    bg: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
]

const resumen = [
  { label: 'Urgentes',          count: alertas.filter(a => a.nivel === 'urgente').length,           color: '#E24B4A', bg: '#FEF2F2' },
  { label: 'Requieren atención', count: alertas.filter(a => a.nivel === 'requiere_atencion').length, color: '#EF9F27', bg: '#FFFBEB' },
  { label: 'En observación',    count: alertas.filter(a => a.nivel === 'observacion').length,        color: '#185FA5', bg: '#EFF6FF' },
]

/* ════════════════════════════════════════════════════════════════ */
export default function AlertasPreventivas() {
  const navigate = useNavigate()

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Alertas preventivas</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {alertas.length} alertas activas · ordenadas por urgencia
        </p>
      </div>

      {/* Resumen */}
      <div className="flex gap-3 mb-5">
        {resumen.map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border"
            style={{ background: r.bg, borderColor: r.color + '44' }}
          >
            <span className="text-2xl font-bold" style={{ color: r.color }}>{r.count}</span>
            <span className="text-sm font-medium text-gray-700">{r.label}</span>
          </div>
        ))}
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-3">
        {alertas.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-xl border-2 overflow-hidden shadow-sm"
            style={{ borderColor: a.borderColor }}
          >
            {/* Stripe */}
            <div className="px-5 py-2 flex items-center gap-3" style={{ background: a.bg }}>
              {a.nivel === 'urgente'
                ? <AlertTriangle size={13} style={{ color: a.color }} />
                : a.nivel === 'requiere_atencion'
                ? <Clock size={13} style={{ color: a.color }} />
                : <Info size={13} style={{ color: a.color }} />}
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: a.color }}>
                {a.nivelLabel}
              </span>
              <span className="text-[11px] text-gray-400 ml-auto flex items-center gap-1">
                <Clock size={10} /> {a.fechaDeteccion}
              </span>
            </div>

            <div className="px-5 py-4 flex items-start gap-5">
              {/* Content */}
              <div className="flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900">{a.titulo}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                        style={{ background: a.avatarColor }}
                      >
                        {a.iniciales}
                      </div>
                      <span className="text-xs font-medium text-gray-700">{a.colaborador}</span>
                    </div>
                    <span className="text-gray-200">·</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={11} /> {a.area}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{a.descripcion}</p>

                {/* Acción recomendada */}
                <div
                  className="flex items-start gap-2 rounded-lg px-3 py-2.5"
                  style={{ background: '#F0EFFE', border: '1px solid #DDD6FE' }}
                >
                  <Lightbulb size={13} style={{ color: '#534AB7' }} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#534AB7' }}>
                      Acción recomendada
                    </p>
                    <p className="text-xs text-gray-600">{a.accionRecomendada}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="shrink-0 flex flex-col gap-2">
                <button
                  onClick={() => navigate('/orientacion')}
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ background: a.color }}
                >
                  Ver orientación <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
