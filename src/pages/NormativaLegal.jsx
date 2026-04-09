import { useState } from 'react'
import { BookOpen, Scale, ShieldCheck, Wifi, ChevronDown, ChevronUp, ExternalLink, Tag } from 'lucide-react'

/* ── Data ── */
const bloques = [
  {
    id: 'codigo',
    titulo: 'Código del Trabajo',
    subtitulo: 'Ley 18.620 — vigente con últimas modificaciones',
    icon: Scale,
    color: '#185FA5',
    bg: '#EFF6FF',
    borderColor: '#BFDBFE',
    fuente: 'BCN Chile · actualizado automáticamente',
    articulos: [
      {
        codigo: 'Art. 160',
        titulo: 'Causales de despido sin derecho a indemnización',
        resumen: 'Define las causales de término del contrato por falta imputable al trabajador: falta de probidad, conductas de acoso, vías de hecho, injurias, abandono, actos contra la seguridad, perjuicio material, incumplimiento grave.',
        alertaRiesgo: 'Sygnaly monitorea conductas que podrían configurar Art. 160 N°1 (falta probidad), N°3 (vías de hecho), N°6 (incumplimiento grave).',
      },
      {
        codigo: 'Art. 171',
        titulo: 'Despido indirecto — incumplimiento grave del empleador',
        resumen: 'El trabajador puede poner término al contrato invocando causal imputable al empleador y exigir las mismas indemnizaciones que por despido injustificado, con recargo adicional si el tribunal acoge la demanda.',
        alertaRiesgo: 'Exposición activa: Jorge Ramírez. La señal de conflicto con supervisor y conducta grave del empleador puede sustentar demanda por Art. 171.',
      },
      {
        codigo: 'Art. 45',
        titulo: 'Semana corrida — remuneración diaria variable',
        resumen: 'Los trabajadores con remuneración variable que laboren lunes a viernes tienen derecho al pago del día sábado (séptimo día). La base de cálculo es el promedio de lo devengado en los días trabajados.',
        alertaRiesgo: 'Verificar liquidaciones de colaboradores con componente variable. Error frecuente en pymes con cálculo manual.',
      },
    ],
  },
  {
    id: 'karin',
    titulo: 'Ley Karin · 21.643',
    subtitulo: 'Vigente desde agosto 2024 — protocolo obligatorio para toda empresa',
    icon: ShieldCheck,
    color: '#1D9E75',
    bg: '#ECFDF5',
    borderColor: '#A7F3D0',
    fuente: 'Ministerio del Trabajo · en vigor',
    articulos: [
      {
        codigo: 'Proceso de investigación',
        titulo: 'Obligación de investigar denuncias en plazo',
        resumen: 'Toda denuncia de acoso laboral o sexual debe ser investigada en un plazo máximo de 30 días hábiles. La empresa puede optar por investigación interna o derivar a la Inspección del Trabajo. El resultado debe constar por escrito.',
        alertaRiesgo: 'Señal activa: lenguaje intimidatorio documentado en Planta Norte. Verificar si configura acoso laboral bajo esta ley.',
      },
      {
        codigo: 'Protocolo obligatorio',
        titulo: 'Protocolo de prevención de acoso y violencia',
        resumen: 'Todas las empresas deben contar con un Protocolo de Prevención de Acoso Sexual, Laboral y Violencia en el Trabajo, incluirlo en el Reglamento Interno y capacitar a todos los trabajadores.',
        alertaRiesgo: 'El Reglamento Interno actual (v3.1) requiere actualización para incluir el protocolo Ley Karin. Riesgo de multa DT.',
      },
    ],
  },
  {
    id: 'ds40',
    titulo: 'DS 40 · Derecho a Saber',
    subtitulo: 'Decreto Supremo 40 — Reglamento sobre prevención de riesgos',
    icon: BookOpen,
    color: '#EF9F27',
    bg: '#FFFBEB',
    borderColor: '#FDE68A',
    fuente: 'SUSESO · registro obligatorio capacitaciones',
    articulos: [
      {
        codigo: 'Obligación de informar',
        titulo: 'Informar sobre riesgos en el puesto de trabajo',
        resumen: 'El empleador debe informar a cada trabajador sobre los riesgos que conlleva su actividad laboral, las medidas preventivas y los métodos de trabajo correctos. Esta información debe ser entregada al inicio de la relación laboral y ante cualquier cambio de funciones.',
        alertaRiesgo: 'Señal activa en Planta Norte: comparendo DT activo por falta de registro de entrega DS40 / Jorge Ramírez.',
      },
      {
        codigo: 'Registro de capacitaciones',
        titulo: 'Obligación de registrar y conservar capacitaciones en higiene',
        resumen: 'Las capacitaciones en higiene y seguridad industrial deben quedar registradas con firma del trabajador. El empleador debe conservar estos registros y ponerlos a disposición de la DT cuando sean requeridos.',
        alertaRiesgo: 'Falta registro de capacitación Higiene / Jorge Ramírez. La DT puede multar aun si se llega a acuerdo en comparendo.',
      },
    ],
  },
  {
    id: 'dt',
    titulo: 'Dirección del Trabajo (DT)',
    subtitulo: 'Dictámenes, circulares y multas · sincronización automática',
    icon: Wifi,
    color: '#534AB7',
    bg: '#F0EFFE',
    borderColor: '#DDD6FE',
    fuente: 'DT.gob.cl · API conectada automáticamente',
    articulos: [
      {
        codigo: 'Dictámenes vigentes',
        titulo: 'Interpretaciones oficiales de la DT',
        resumen: 'Sygnaly sincroniza automáticamente los dictámenes relevantes emitidos por la Dirección del Trabajo. Los dictámenes son la interpretación oficial de la ley laboral y sirven de referencia en fiscalizaciones y tribunales.',
        alertaRiesgo: null,
      },
      {
        codigo: 'Multas y sanciones',
        titulo: 'Tabla de multas vigentes por infracción',
        resumen: 'Las multas se expresan en UTM. El rango habitual es de 1 a 60 UTM según la gravedad y el tamaño de la empresa. Las infracciones reiteradas pueden duplicar la sanción. Sygnaly alerta cuando existen riesgos de multa activos.',
        alertaRiesgo: 'Multas activas detectadas: 2 exposiciones en Planta Norte relacionadas con DS40 y registro de asistencia.',
      },
    ],
  },
]

/* ════════════════════════════════════════════════════════════════ */
export default function NormativaLegal() {
  const [abiertos, setAbiertos] = useState({ codigo: true, karin: true, ds40: false, dt: false })

  function toggle(id) {
    setAbiertos((s) => ({ ...s, [id]: !s[id] }))
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Normativa legal</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Marco normativo laboral chileno · Actualizado automáticamente desde fuentes oficiales
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {bloques.map((b) => {
          const Icon = b.icon
          const open = abiertos[b.id]
          return (
            <div
              key={b.id}
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: b.borderColor }}
            >
              {/* Header */}
              <button
                onClick={() => toggle(b.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:brightness-95"
                style={{ background: b.bg }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: b.color }}
                  >
                    <Icon size={16} color="white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{b.titulo}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{b.subtitulo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium text-gray-400 hidden sm:block">{b.fuente}</span>
                  {open ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                </div>
              </button>

              {/* Body */}
              {open && (
                <div className="bg-white divide-y divide-gray-50">
                  {b.articulos.map((a) => (
                    <div key={a.codigo} className="px-5 py-4 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span
                            className="text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 mt-0.5"
                            style={{ background: b.bg, color: b.color }}
                          >
                            {a.codigo}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{a.titulo}</p>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{a.resumen}</p>
                          </div>
                        </div>
                        <button className="text-gray-300 hover:text-gray-500 shrink-0 mt-0.5">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                      {a.alertaRiesgo && (
                        <div
                          className="flex items-start gap-2 rounded-lg px-3 py-2 ml-11"
                          style={{ background: '#FFFBEB' }}
                        >
                          <Tag size={12} style={{ color: '#D97706' }} className="shrink-0 mt-0.5" />
                          <p className="text-[11px] font-medium" style={{ color: '#92400E' }}>
                            {a.alertaRiesgo}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
