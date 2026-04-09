import { useState } from 'react'
import { AlertTriangle, Scale, FileWarning, Users, Clock, ChevronDown, ChevronUp, Info } from 'lucide-react'

const NOTA_CALCULOS = '↗ Los cálculos de montos deben ser verificados con el departamento de contabilidad. Sygnaly no valida cifras.'

/* ── Mock data ── */
const dataDT = {
  multas: [
    {
      tipo: 'Multa por no entrega de Reglamento Interno',
      monto: '$184.000 – $920.000',
      estado: 'Riesgo activo',
      colaborador: 'Jorge Ramírez',
      fecha: '—',
      color: '#E24B4A',
      bg: '#FEF2F2',
    },
    {
      tipo: 'Multa por registro capacitación Higiene',
      monto: '$368.000 – $1.840.000',
      estado: 'Riesgo activo',
      colaborador: 'Jorge Ramírez',
      fecha: '—',
      color: '#E24B4A',
      bg: '#FEF2F2',
    },
    {
      tipo: 'Incumplimiento registro asistencia',
      monto: '$92.000 – $368.000',
      estado: 'En revisión',
      colaborador: 'Luis Hernández',
      fecha: '—',
      color: '#EF9F27',
      bg: '#FFFBEB',
    },
  ],
  comparendos: [
    {
      id: 'C-2026-041',
      colaborador: 'Jorge Ramírez',
      motivo: 'Fiscalización DS40 – Higiene y seguridad industrial',
      fecha: '22 abril 2026',
      estado: 'Activo',
      color: '#E24B4A',
      bg: '#FEF2F2',
    },
    {
      id: 'C-2025-118',
      colaborador: 'Carlos Vargas',
      motivo: 'Control jornada especial – libro asistencia',
      fecha: '03 marzo 2026',
      estado: 'Cerrado',
      color: '#9CA3AF',
      bg: '#F3F4F6',
    },
  ],
}

const dataTribunal = {
  despidoInjustificado: [
    {
      colaborador: 'Jorge Ramírez',
      cargo: 'Operario de producción',
      antiguedad: '4 años 3 meses',
      remuneracion: '$780.000',
      exposicion: '$3.900.000 – $11.700.000',
      estado: 'Alto riesgo',
      color: '#E24B4A',
      bg: '#FEF2F2',
    },
  ],
  despidoIndirecto: [
    {
      colaborador: 'Jorge Ramírez',
      cargo: 'Operario de producción',
      causal: 'Art. 171 CT – acoso laboral / incumplimiento grave del empleador',
      exposicion: '$4.680.000 – $15.600.000',
      estado: 'Riesgo moderado',
      color: '#EF9F27',
      bg: '#FFFBEB',
    },
  ],
  tutela: [
    {
      colaborador: 'Jorge Ramírez',
      cargo: 'Operario de producción',
      causal: 'Art. 485 CT – posible vulneración de derechos fundamentales (dignidad, integridad)',
      exposicion: '6 a 11 remuneraciones mensuales',
      estado: 'Riesgo moderado',
      color: '#EF9F27',
      bg: '#FFFBEB',
    },
  ],
  prestaciones: [
    {
      tipo: 'Cotizaciones previsionales no entregadas',
      colaborador: 'Roberto Díaz',
      monto: '$234.000',
      estado: 'En revisión',
      color: '#EF9F27',
      bg: '#FFFBEB',
    },
  ],
  nulidadDespido: [],
}

const historial = [
  { fecha: 'Abr 2026', tipo: 'DT',       label: 'Comparendo activo – DS40 / Jorge Ramírez',               color: '#E24B4A', bg: '#FEF2F2' },
  { fecha: 'Mar 2026', tipo: 'DT',       label: 'Fiscalización jornada especial – Carlos Vargas (cerrado)', color: '#9CA3AF', bg: '#F3F4F6' },
  { fecha: 'Feb 2026', tipo: 'Tribunal', label: 'Consulta interna – exposición art.171 / Jorge Ramírez',  color: '#EF9F27', bg: '#FFFBEB' },
  { fecha: 'Ene 2026', tipo: 'DT',       label: 'Multa notificada – registro asistencia / Luis Hernández', color: '#EF9F27', bg: '#FFFBEB' },
  { fecha: 'Dic 2025', tipo: 'Tribunal', label: 'Denuncia tutela – resuelta sin condena / ex-colaborador', color: '#9CA3AF', bg: '#F3F4F6' },
]

/* ── Sub-components ── */
function SectionHeader({ title, icon: Icon, count, open, onToggle, colorAccent }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3 transition-colors hover:brightness-95"
    >
      <div className="flex items-center gap-2">
        <Icon size={15} style={{ color: colorAccent }} />
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        {count > 0 && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: colorAccent + '22', color: colorAccent }}>
            {count}
          </span>
        )}
      </div>
      {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
    </button>
  )
}

function EmptyRow({ msg }) {
  return (
    <div className="px-4 py-4 text-sm text-gray-400 text-center">{msg}</div>
  )
}

function MontoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-semibold text-gray-800">{value}</span>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════ */
export default function RadarLegal() {
  const [openSections, setOpenSections] = useState({
    multas: true,
    comparendos: true,
    despidoInj: true,
    despidoInd: true,
    tutela: true,
    prestaciones: false,
    nulidad: false,
  })

  function toggle(key) {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }))
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Radar legal empresa</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Exposición legal activa · 2 capas de riesgo: Dirección del Trabajo y Tribunal Laboral
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* ════════ CAPA 1 – DT ════════ */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#FECACA', background: '#FFF5F5' }}>
          {/* Layer header */}
          <div className="px-5 py-3 flex items-center gap-3" style={{ background: '#FEE2E2', borderBottom: '1px solid #FECACA' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#E24B4A' }}>
              <FileWarning size={14} color="white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Capa 1 · Dirección del Trabajo (DT)</p>
              <p className="text-xs text-gray-500">Multas, comparendos y fiscalizaciones</p>
            </div>
            <div className="ml-auto flex gap-3">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: '#FEF2F2', color: '#E24B4A' }}>
                {dataDT.multas.filter(m => m.estado === 'Riesgo activo').length} multas activas
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: '#FEF2F2', color: '#E24B4A' }}>
                {dataDT.comparendos.filter(c => c.estado === 'Activo').length} comparendo activo
              </span>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-3">
            {/* Comparendo destacado */}
            {dataDT.comparendos.filter(c => c.estado === 'Activo').map(c => (
              <div key={c.id} className="rounded-xl border-2 p-4" style={{ borderColor: '#E24B4A', background: '#FFF' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} style={{ color: '#E24B4A' }} className="shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Comparendo activo – {c.fecha}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{c.id} · {c.colaborador}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0" style={{ background: '#FEF2F2', color: '#E24B4A' }}>
                    {c.estado}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2 ml-6">{c.motivo}</p>
                <div className="mt-2 ml-6 flex items-start gap-1.5 rounded-lg px-3 py-2" style={{ background: '#FFFBEB' }}>
                  <AlertTriangle size={12} style={{ color: '#EF9F27' }} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-medium" style={{ color: '#92400E' }}>
                    La DT puede cursar multa aunque se llegue a acuerdo en el comparendo.
                  </p>
                </div>
              </div>
            ))}

            {/* Multas */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <SectionHeader
                title="Multas"
                icon={AlertTriangle}
                count={dataDT.multas.length}
                open={openSections.multas}
                onToggle={() => toggle('multas')}
                colorAccent="#E24B4A"
              />
              {openSections.multas && (
                <div className="border-t border-gray-50">
                  {dataDT.multas.map((m, i) => (
                    <div key={i} className="px-4 py-3 flex flex-col gap-1 border-b border-gray-50 last:border-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm text-gray-700">{m.tipo}</p>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap" style={{ color: m.color, background: m.bg }}>
                          {m.estado}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">{m.colaborador}</p>
                        <p className="text-xs font-semibold text-gray-700">{m.monto}</p>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-50" style={{ background: '#FFFBEB' }}>
                    <p className="text-[11px]" style={{ color: '#92400E' }}>{NOTA_CALCULOS}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Comparendos historial */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <SectionHeader
                title="Comparendos"
                icon={FileWarning}
                count={dataDT.comparendos.length}
                open={openSections.comparendos}
                onToggle={() => toggle('comparendos')}
                colorAccent="#E24B4A"
              />
              {openSections.comparendos && (
                <div className="border-t border-gray-50 divide-y divide-gray-50">
                  {dataDT.comparendos.map((c) => (
                    <div key={c.id} className="px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-gray-700">{c.motivo}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{c.id} · {c.colaborador} · {c.fecha}</p>
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap" style={{ color: c.color, background: c.bg }}>
                          {c.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ════════ CAPA 2 – TRIBUNAL ════════ */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#FDE68A', background: '#FFFDF0' }}>
          {/* Layer header */}
          <div className="px-5 py-3 flex items-center gap-3" style={{ background: '#FEF3C7', borderBottom: '1px solid #FDE68A' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#EF9F27' }}>
              <Scale size={14} color="white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Capa 2 · Tribunal Laboral</p>
              <p className="text-xs text-gray-500">Demandas, tutelas y exposición estimada</p>
            </div>
            <div className="ml-auto">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: '#FFFBEB', color: '#D97706' }}>
                {[...dataTribunal.despidoInjustificado, ...dataTribunal.despidoIndirecto, ...dataTribunal.tutela].length} exposiciones activas
              </span>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-3">
            {/* Despido injustificado */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <SectionHeader
                title="Despido injustificado"
                icon={Users}
                count={dataTribunal.despidoInjustificado.length}
                open={openSections.despidoInj}
                onToggle={() => toggle('despidoInj')}
                colorAccent="#EF9F27"
              />
              {openSections.despidoInj && (
                <div className="border-t border-gray-50">
                  {dataTribunal.despidoInjustificado.length === 0 ? (
                    <EmptyRow msg="Sin exposición activa." />
                  ) : (
                    dataTribunal.despidoInjustificado.map((r, i) => (
                      <div key={i} className="px-4 py-3 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{r.colaborador}</p>
                            <p className="text-xs text-gray-400">{r.cargo} · {r.antiguedad} · Rem. base {r.remuneracion}</p>
                          </div>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ color: r.color, background: r.bg }}>
                            {r.estado}
                          </span>
                        </div>
                        <div className="rounded-lg px-3 py-2 flex flex-col gap-1" style={{ background: '#F9FAFB' }}>
                          <MontoRow label="Exposición estimada (recargo 30–90%)" value={r.exposicion} />
                        </div>
                        <p className="text-[11px]" style={{ color: '#92400E' }}>{NOTA_CALCULOS}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Despido indirecto art.171 */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <SectionHeader
                title="Despido indirecto · Art. 171 CT"
                icon={Scale}
                count={dataTribunal.despidoIndirecto.length}
                open={openSections.despidoInd}
                onToggle={() => toggle('despidoInd')}
                colorAccent="#EF9F27"
              />
              {openSections.despidoInd && (
                <div className="border-t border-gray-50">
                  {dataTribunal.despidoIndirecto.length === 0 ? (
                    <EmptyRow msg="Sin exposición activa." />
                  ) : (
                    dataTribunal.despidoIndirecto.map((r, i) => (
                      <div key={i} className="px-4 py-3 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{r.colaborador}</p>
                            <p className="text-xs text-gray-400">{r.causal}</p>
                          </div>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ color: r.color, background: r.bg }}>
                            {r.estado}
                          </span>
                        </div>
                        <div className="rounded-lg px-3 py-2 flex flex-col gap-1" style={{ background: '#F9FAFB' }}>
                          <MontoRow label="Exposición estimada" value={r.exposicion} />
                        </div>
                        <p className="text-[11px]" style={{ color: '#92400E' }}>{NOTA_CALCULOS}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Tutela art.485 */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <SectionHeader
                title="Tutela laboral · Art. 485 CT"
                icon={AlertTriangle}
                count={dataTribunal.tutela.length}
                open={openSections.tutela}
                onToggle={() => toggle('tutela')}
                colorAccent="#534AB7"
              />
              {openSections.tutela && (
                <div className="border-t border-gray-50">
                  {dataTribunal.tutela.length === 0 ? (
                    <EmptyRow msg="Sin exposición activa." />
                  ) : (
                    dataTribunal.tutela.map((r, i) => (
                      <div key={i} className="px-4 py-3 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{r.colaborador}</p>
                            <p className="text-xs text-gray-400">{r.causal}</p>
                          </div>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ color: r.color, background: r.bg }}>
                            {r.estado}
                          </span>
                        </div>
                        <div className="rounded-lg px-3 py-2 flex flex-col gap-1" style={{ background: '#F9FAFB' }}>
                          <MontoRow label="Exposición estimada" value={r.exposicion} />
                        </div>
                        <p className="text-[11px]" style={{ color: '#92400E' }}>{NOTA_CALCULOS}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Cobro de prestaciones */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <SectionHeader
                title="Cobro de prestaciones"
                icon={Clock}
                count={dataTribunal.prestaciones.length}
                open={openSections.prestaciones}
                onToggle={() => toggle('prestaciones')}
                colorAccent="#EF9F27"
              />
              {openSections.prestaciones && (
                <div className="border-t border-gray-50">
                  {dataTribunal.prestaciones.length === 0 ? (
                    <EmptyRow msg="Sin exposición activa." />
                  ) : (
                    dataTribunal.prestaciones.map((r, i) => (
                      <div key={i} className="px-4 py-3 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{r.tipo}</p>
                            <p className="text-xs text-gray-400">{r.colaborador}</p>
                          </div>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ color: r.color, background: r.bg }}>
                            {r.estado}
                          </span>
                        </div>
                        <div className="rounded-lg px-3 py-2" style={{ background: '#F9FAFB' }}>
                          <MontoRow label="Monto estimado" value={r.monto} />
                        </div>
                        <p className="text-[11px]" style={{ color: '#92400E' }}>{NOTA_CALCULOS}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Nulidad del despido */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <SectionHeader
                title="Nulidad del despido"
                icon={Scale}
                count={dataTribunal.nulidadDespido.length}
                open={openSections.nulidad}
                onToggle={() => toggle('nulidad')}
                colorAccent="#9CA3AF"
              />
              {openSections.nulidad && (
                <div className="border-t border-gray-50">
                  <EmptyRow msg="Sin exposición activa." />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-50">
            <p className="text-sm font-semibold text-gray-700">Historial de eventos legales</p>
          </div>
          <div className="divide-y divide-gray-50">
            {historial.map((h, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4">
                <span className="text-xs text-gray-400 w-16 shrink-0">{h.fecha}</span>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={{ color: h.tipo === 'DT' ? '#E24B4A' : '#D97706', background: h.tipo === 'DT' ? '#FEF2F2' : '#FFFBEB' }}
                >
                  {h.tipo}
                </span>
                <p className="text-sm text-gray-600 flex-1">{h.label}</p>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{ color: h.color, background: h.bg }}
                >
                  {h.color === '#9CA3AF' ? 'Cerrado' : 'Activo'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Nota global */}
        <div className="rounded-lg px-4 py-2.5 flex items-start gap-2" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <Info size={14} style={{ color: '#185FA5' }} className="shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: '#1E40AF' }}>
            {NOTA_CALCULOS} · El radar refleja señales de riesgo legal, no una evaluación jurídica. Consulte a su asesor legal ante cualquier acción.
          </p>
        </div>
      </div>
    </div>
  )
}
