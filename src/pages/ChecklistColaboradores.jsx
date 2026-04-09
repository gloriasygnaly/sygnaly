import { useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, MinusCircle, ChevronRight, Info } from 'lucide-react'

/* ── Mock data ── */
const tiposContrato = [
  { id: 'base',     label: 'Base',                   count: 198 },
  { id: 'variable', label: 'Con remuneración variable', count: 54  },
  { id: 'especial', label: 'Jornada especial',        count: 32  },
]

const listaColaboradores = [
  { id: '1',  nombre: 'Jorge Ramírez',     tipo: 'base',     pct: 58,  iniciales: 'JR', color: '#185FA5' },
  { id: '2',  nombre: 'Ana Torres',        tipo: 'base',     pct: 92,  iniciales: 'AT', color: '#1D9E75' },
  { id: '3',  nombre: 'Pedro Soto',        tipo: 'variable', pct: 75,  iniciales: 'PS', color: '#534AB7' },
  { id: '4',  nombre: 'María González',    tipo: 'base',     pct: 100, iniciales: 'MG', color: '#1D9E75' },
  { id: '5',  nombre: 'Luis Hernández',    tipo: 'especial', pct: 45,  iniciales: 'LH', color: '#E24B4A' },
  { id: '6',  nombre: 'Carmen López',      tipo: 'variable', pct: 83,  iniciales: 'CL', color: '#EF9F27' },
  { id: '7',  nombre: 'Roberto Díaz',      tipo: 'base',     pct: 67,  iniciales: 'RD', color: '#185FA5' },
  { id: '8',  nombre: 'Isabel Morales',    tipo: 'variable', pct: 91,  iniciales: 'IM', color: '#1D9E75' },
  { id: '9',  nombre: 'Carlos Vargas',     tipo: 'especial', pct: 38,  iniciales: 'CV', color: '#E24B4A' },
  { id: '10', nombre: 'Sandra Pizarro',    tipo: 'base',     pct: 100, iniciales: 'SP', color: '#1D9E75' },
]

const checklistPorColaborador = {
  '1': {
    tipoLabel: 'Contrato base',
    secciones: [
      {
        titulo: 'Documentos base',
        items: [
          { texto: 'Contrato de trabajo',               estado: 'ok'       },
          { texto: 'Anexo de contrato vigente',          estado: 'ok'       },
          { texto: 'Descriptor de cargo firmado',        estado: 'ok'       },
          { texto: 'Reglamento interno entregado',       estado: 'falta',   aviso: null },
        ],
      },
      {
        titulo: 'Normativa obligatoria',
        items: [
          { texto: 'DS40 – Higiene y seguridad (entrega y firma)', estado: 'ok' },
          {
            texto: 'Higiene industrial – registro capacitación',
            estado: 'falta',
            aviso: 'La DT puede cursar multa aunque se llegue a acuerdo en el comparendo.',
          },
          { texto: 'Ley Karin – protocolo y capacitación',         estado: 'ok' },
        ],
      },
      {
        titulo: 'Registros operativos',
        items: [
          {
            texto: 'Libro de asistencia / registro digital',
            estado: 'revisar',
            aviso: 'Verificar que los registros de los últimos 3 meses estén completos y sin tachaduras.',
          },
          { texto: 'Registros de capacitación firmados', estado: 'ok' },
          { texto: 'Amonestaciones escritas archivadas',  estado: 'ok' },
        ],
      },
      {
        titulo: 'Remuneración variable',
        noAplica: true,
        noAplicaRazon: 'Contrato base — sin componente variable',
        noAplicaInfo: 'Si el colaborador pasa a contrato con remuneración variable, esta sección se activará automáticamente.',
        items: [],
      },
    ],
  },
}

// Generic checklist for other collaborators
const checklistGenerico = (tipo) => ({
  tipoLabel: tipo === 'variable' ? 'Contrato con remuneración variable' : tipo === 'especial' ? 'Jornada especial' : 'Contrato base',
  secciones: [
    {
      titulo: 'Documentos base',
      items: [
        { texto: 'Contrato de trabajo',            estado: 'ok' },
        { texto: 'Anexo de contrato vigente',       estado: 'ok' },
        { texto: 'Descriptor de cargo firmado',     estado: 'ok' },
        { texto: 'Reglamento interno entregado',    estado: 'ok' },
      ],
    },
    {
      titulo: 'Normativa obligatoria',
      items: [
        { texto: 'DS40 – Higiene y seguridad (entrega y firma)',    estado: 'ok' },
        { texto: 'Higiene industrial – registro capacitación',       estado: 'ok' },
        { texto: 'Ley Karin – protocolo y capacitación',             estado: 'ok' },
      ],
    },
    {
      titulo: 'Registros operativos',
      items: [
        { texto: 'Libro de asistencia / registro digital', estado: 'ok' },
        { texto: 'Registros de capacitación firmados',     estado: 'ok' },
        { texto: 'Amonestaciones escritas archivadas',     estado: 'ok' },
      ],
    },
    ...(tipo === 'variable' ? [{
      titulo: 'Remuneración variable',
      items: [
        { texto: 'Pacto de remuneración variable firmado', estado: 'ok' },
        { texto: 'Liquidaciones con desglose variable',    estado: 'ok' },
        { texto: 'Metas documentadas por período',         estado: 'ok' },
      ],
    }] : []),
  ],
})

/* ── Sub-components ── */
function EstadoIcon({ estado }) {
  if (estado === 'ok')
    return <CheckCircle2 size={16} style={{ color: '#1D9E75' }} className="shrink-0 mt-0.5" />
  if (estado === 'falta')
    return <XCircle size={16} style={{ color: '#E24B4A' }} className="shrink-0 mt-0.5" />
  if (estado === 'revisar')
    return <AlertTriangle size={16} style={{ color: '#EF9F27' }} className="shrink-0 mt-0.5" />
  return <MinusCircle size={16} className="text-gray-300 shrink-0 mt-0.5" />
}

function PctBar({ pct }) {
  const color = pct === 100 ? '#1D9E75' : pct >= 75 ? '#185FA5' : pct >= 50 ? '#EF9F27' : '#E24B4A'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[11px] font-semibold w-8 text-right" style={{ color }}>{pct}%</span>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════ */
export default function ChecklistColaboradores() {
  const [tipoActivo, setTipoActivo]         = useState('base')
  const [colaboradorActivo, setColaboradorActivo] = useState('1')

  const colaboradoresFiltrados = listaColaboradores.filter((c) => c.tipo === tipoActivo)
  const colabSeleccionado      = listaColaboradores.find((c) => c.id === colaboradorActivo)
  const checklist              = checklistPorColaborador[colaboradorActivo] ?? checklistGenerico(colabSeleccionado?.tipo ?? 'base')

  // Counts
  const totalItems    = checklist.secciones.flatMap((s) => s.items).length
  const okItems       = checklist.secciones.flatMap((s) => s.items).filter((i) => i.estado === 'ok').length
  const faltaItems    = checklist.secciones.flatMap((s) => s.items).filter((i) => i.estado === 'falta').length
  const revisarItems  = checklist.secciones.flatMap((s) => s.items).filter((i) => i.estado === 'revisar').length

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Checklist colaboradores</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Verificación de documentación y cumplimiento por tipo de contrato
        </p>
      </div>

      <div className="flex gap-5">
        {/* ── Panel izquierdo ── */}
        <div className="w-[280px] shrink-0 flex flex-col gap-4">
          {/* Tipos */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-50">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Tipo de contrato</p>
            </div>
            {tiposContrato.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTipoActivo(t.id)
                  const primero = listaColaboradores.find((c) => c.tipo === t.id)
                  if (primero) setColaboradorActivo(primero.id)
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
                style={tipoActivo === t.id ? { background: '#EFF6FF' } : {}}
              >
                <span className={tipoActivo === t.id ? 'font-semibold text-gray-900' : 'text-gray-600'}>{t.label}</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={tipoActivo === t.id
                    ? { background: '#185FA5', color: '#fff' }
                    : { background: '#F3F4F6', color: '#6B7280' }}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Lista colaboradores */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-1">
            <div className="px-4 py-2.5 border-b border-gray-50">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Colaboradores · {colaboradoresFiltrados.length}
              </p>
            </div>
            <div className="divide-y divide-gray-50">
              {colaboradoresFiltrados.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColaboradorActivo(c.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                  style={colaboradorActivo === c.id ? { background: '#EFF6FF' } : {}}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                    style={{ background: c.color }}
                  >
                    {c.iniciales}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs truncate ${colaboradorActivo === c.id ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {c.nombre}
                    </p>
                    <PctBar pct={c.pct} />
                  </div>
                  {colaboradorActivo === c.id && <ChevronRight size={13} className="text-gray-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Panel derecho ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Cabecera del colaborador */}
          {colabSeleccionado && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: colabSeleccionado.color }}
                >
                  {colabSeleccionado.iniciales}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{colabSeleccionado.nombre}</p>
                  <p className="text-xs text-gray-500">{checklist.tipoLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ color: colabSeleccionado.pct === 100 ? '#1D9E75' : colabSeleccionado.pct >= 75 ? '#185FA5' : colabSeleccionado.pct >= 50 ? '#EF9F27' : '#E24B4A' }}>
                    {colabSeleccionado.pct}%
                  </p>
                  <p className="text-[11px] text-gray-400">completitud</p>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1.5" style={{ color: '#1D9E75' }}>
                    <CheckCircle2 size={13} /> {okItems} ok
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: '#E24B4A' }}>
                    <XCircle size={13} /> {faltaItems} falta{faltaItems !== 1 ? 'n' : ''}
                  </span>
                  {revisarItems > 0 && (
                    <span className="flex items-center gap-1.5" style={{ color: '#EF9F27' }}>
                      <AlertTriangle size={13} /> {revisarItems} revisar
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Secciones checklist */}
          {checklist.secciones.map((sec) => (
            <div key={sec.titulo} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-2.5 border-b border-gray-50 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">{sec.titulo}</p>
                {sec.noAplica && (
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: '#F3F4F6', color: '#9CA3AF' }}>
                    No aplica · {sec.noAplicaRazon}
                  </span>
                )}
              </div>

              {sec.noAplica ? (
                <div className="px-5 py-4 flex items-start gap-2">
                  <Info size={15} className="text-gray-300 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-400">{sec.noAplicaInfo}</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {sec.items.map((item) => (
                    <div key={item.texto} className="px-5 py-3">
                      <div className="flex items-start gap-3">
                        <EstadoIcon estado={item.estado} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{item.texto}</p>
                          {item.aviso && (
                            <div className="mt-1.5 flex items-start gap-1.5 rounded-lg px-3 py-2" style={{ background: '#FFFBEB' }}>
                              <AlertTriangle size={13} style={{ color: '#EF9F27' }} className="shrink-0 mt-0.5" />
                              <p className="text-xs font-medium" style={{ color: '#92400E' }}>{item.aviso}</p>
                            </div>
                          )}
                        </div>
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                          style={
                            item.estado === 'ok'
                              ? { background: '#ECFDF5', color: '#1D9E75' }
                              : item.estado === 'falta'
                              ? { background: '#FEF2F2', color: '#E24B4A' }
                              : { background: '#FFFBEB', color: '#D97706' }
                          }
                        >
                          {item.estado === 'ok' ? 'Completo' : item.estado === 'falta' ? 'Falta' : 'Revisar'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Nota */}
          <div className="rounded-lg px-4 py-2.5 flex items-start gap-2" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
            <span className="text-sm">↗</span>
            <p className="text-xs" style={{ color: '#1E40AF' }}>
              Verificar documentos con el departamento de contabilidad y RRHH. Sygnaly no valida cifras ni reemplaza la revisión legal de documentos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
