import { useState } from 'react'
import {
  CheckCircle2, XCircle, AlertTriangle, Minus, FileText,
  Upload, ChevronRight, Users, Building2, Scale, Shield,
  BookOpen, Plus, Link2, FileCheck, Clock, Eye,
} from 'lucide-react'

/* ══════════════════════════════════════════════════════════════
   CONFIG ESTADOS
══════════════════════════════════════════════════════════════ */
const estadoDoc = {
  al_dia:    { icon: CheckCircle2, color: '#1D9E75', bg: '#ECFDF5', label: 'Al día' },
  faltante:  { icon: XCircle,      color: '#E24B4A', bg: '#FEF2F2', label: 'Faltante' },
  revisar:   { icon: AlertTriangle,color: '#EF9F27', bg: '#FFFBEB', label: 'Revisar' },
  registrada:{ icon: FileCheck,    color: '#534AB7', bg: '#F0EFFE', label: 'Registrada' },
  no_aplica: { icon: Minus,        color: '#9CA3AF', bg: '#F3F4F6', label: 'No aplica' },
}

/* ══════════════════════════════════════════════════════════════
   DATOS — Colaboradores con completitud documental
══════════════════════════════════════════════════════════════ */
const listaColaboradores = [
  { id: '1',  nombre: 'Jorge Ramírez',     cargo: 'Operario',       iniciales: 'JR', color: '#185FA5', pct: 58,  alerta: true  },
  { id: '2',  nombre: 'Fernanda Castillo', cargo: 'Administrativo', iniciales: 'FC', color: '#E24B4A', pct: 72,  alerta: false },
  { id: '3',  nombre: 'Patricio Vega',     cargo: 'Operario',       iniciales: 'PV', color: '#1D9E75', pct: 65,  alerta: false },
  { id: '4',  nombre: 'Mónica Torres',     cargo: 'Administrativo', iniciales: 'MT', color: '#EF9F27', pct: 85,  alerta: false },
  { id: '5',  nombre: 'Héctor Muñoz',      cargo: 'Supervisor',     iniciales: 'HM', color: '#534AB7', pct: 91,  alerta: false },
  { id: '6',  nombre: 'Alejandra Rojas',   cargo: 'Operaria',       iniciales: 'AR', color: '#185FA5', pct: 78,  alerta: false },
  { id: '7',  nombre: 'Luis Fuentes',      cargo: 'Operario',       iniciales: 'LF', color: '#1D9E75', pct: 100, alerta: false },
]

/* ── Documentos de Jorge Ramírez (id: '1') ── */
const docsJorge = [
  {
    seccion: 'Documentos base del vínculo laboral',
    items: [
      { id: 'd1', nombre: 'Contrato de trabajo firmado',   estado: 'al_dia',   fecha: 'Mar 2022',   nota: null },
      { id: 'd2', nombre: 'Último anexo de contrato',      estado: 'al_dia',   fecha: 'Ene 2025',   nota: null },
      { id: 'd3', nombre: 'Descriptor de cargo',           estado: 'al_dia',   fecha: 'Mar 2022',   nota: null },
      {
        id: 'd4',
        nombre: 'Reglamento interno con acuse de recibo',
        estado: 'faltante',
        fecha: null,
        nota: 'Sin registro de entrega. Si hay denuncia ante DT, la empresa no puede acreditar que el colaborador conocía las normas internas.',
      },
    ],
  },
  {
    seccion: 'Normativa obligatoria firmada',
    items: [
      { id: 'd5', nombre: 'Derecho a Saber DS 40 (RRHH)',                    estado: 'al_dia',   fecha: 'Mar 2022', nota: null },
      { id: 'd6', nombre: 'Reglamento de Higiene y Seguridad con acuse',      estado: 'faltante', fecha: null,       nota: null },
      { id: 'd7', nombre: 'Protocolo Ley Karin con acuse de recibo',          estado: 'al_dia',   fecha: 'Ago 2024', nota: null },
    ],
  },
  {
    seccion: 'Registros y eventos formales',
    items: [
      { id: 'd8', nombre: 'Amonestación escrita',  estado: 'registrada', fecha: 'Mar 2026', nota: null },
      { id: 'd9', nombre: 'Acta de conflicto',      estado: 'registrada', fecha: 'Ene 2026', nota: null },
    ],
  },
]

/* ── Documentos de Luis Fuentes (id: '7', 100%) ── */
const docsLuis = [
  {
    seccion: 'Documentos base del vínculo laboral',
    items: [
      { id: 'l1', nombre: 'Contrato de trabajo firmado',              estado: 'al_dia',   fecha: 'Feb 2017', nota: null },
      { id: 'l2', nombre: 'Último anexo de contrato',                 estado: 'al_dia',   fecha: 'Ene 2025', nota: null },
      { id: 'l3', nombre: 'Descriptor de cargo',                      estado: 'al_dia',   fecha: 'Feb 2017', nota: null },
      { id: 'l4', nombre: 'Reglamento interno con acuse de recibo',   estado: 'al_dia',   fecha: 'Feb 2017', nota: null },
    ],
  },
  {
    seccion: 'Normativa obligatoria firmada',
    items: [
      { id: 'l5', nombre: 'Derecho a Saber DS 40 (RRHH)',               estado: 'al_dia', fecha: 'Feb 2017', nota: null },
      { id: 'l6', nombre: 'Reglamento de Higiene y Seguridad con acuse', estado: 'al_dia', fecha: 'Mar 2023', nota: null },
      { id: 'l7', nombre: 'Protocolo Ley Karin con acuse de recibo',     estado: 'al_dia', fecha: 'Ago 2024', nota: null },
    ],
  },
  {
    seccion: 'Registros y eventos formales',
    items: [
      { id: 'l8', nombre: 'Sin registros de eventos formales', estado: 'no_aplica', fecha: null, nota: null },
    ],
  },
]

/* Docs genéricos para los demás */
const docsGenericos = (pct) => [
  {
    seccion: 'Documentos base del vínculo laboral',
    items: [
      { id: 'g1', nombre: 'Contrato de trabajo firmado',            estado: 'al_dia',   fecha: 'Varios', nota: null },
      { id: 'g2', nombre: 'Último anexo de contrato',               estado: pct >= 80 ? 'al_dia' : 'revisar', fecha: 'Varios', nota: null },
      { id: 'g3', nombre: 'Descriptor de cargo',                    estado: 'al_dia',   fecha: 'Varios', nota: null },
      { id: 'g4', nombre: 'Reglamento interno con acuse de recibo', estado: pct >= 85 ? 'al_dia' : 'faltante', fecha: pct >= 85 ? 'Varios' : null, nota: null },
    ],
  },
  {
    seccion: 'Normativa obligatoria firmada',
    items: [
      { id: 'g5', nombre: 'Derecho a Saber DS 40',                    estado: 'al_dia',   fecha: 'Varios', nota: null },
      { id: 'g6', nombre: 'Reglamento de Higiene y Seguridad',         estado: pct >= 80 ? 'al_dia' : 'faltante', fecha: pct >= 80 ? 'Varios' : null, nota: null },
      { id: 'g7', nombre: 'Protocolo Ley Karin con acuse de recibo',   estado: 'al_dia',   fecha: 'Ago 2024', nota: null },
    ],
  },
  { seccion: 'Registros y eventos formales', items: [] },
]

function getDocsColaborador(id, pct) {
  if (id === '1') return docsJorge
  if (id === '7') return docsLuis
  return docsGenericos(pct)
}

/* ══════════════════════════════════════════════════════════════
   DATOS — Normativa legal
══════════════════════════════════════════════════════════════ */
const normativaLegal = [
  {
    id: 'cdt',
    titulo: 'Código del Trabajo',
    subtitulo: 'Artículos clave para RRHH',
    icono: Scale,
    color: '#185FA5',
    bg: '#EFF6FF',
    articulos: [
      { num: 'Art. 160', titulo: 'Causales de despido sin indemnización', desc: 'Falta de probidad, acoso, injurias, negociación incompatible, ausentismo injustificado, imprudencia temeraria, actos que afecten seguridad, abandono.' },
      { num: 'Art. 171', titulo: 'Despido indirecto (autodespido)', desc: 'El trabajador puede poner término al contrato invocando causales del art. 160 cometidas por el empleador. Recargo indemnizatorio: 50–80%.' },
      { num: 'Art. 45',  titulo: 'Semana corrida', desc: 'Trabajadores con remuneración variable (sueldo + comisiones/tratos) tienen derecho a remuneración por domingos y festivos, proporcional al promedio de los días hábiles.' },
    ],
    ultimaActualizacion: 'Actualizado al 01 Ene 2025',
  },
  {
    id: 'karin',
    titulo: 'Ley Karin 21.643',
    subtitulo: 'Prevención y sanción del acoso',
    icono: Shield,
    color: '#E24B4A',
    bg: '#FEF2F2',
    articulos: [
      { num: 'Art. 2°',  titulo: 'Acoso laboral y sexual', desc: 'Define acoso laboral como agresiones u hostigamientos que afecten la dignidad del trabajador. Incluye conductas reiteradas y también hechos aislados graves.' },
      { num: 'Art. 6°',  titulo: 'Obligación del empleador', desc: 'Adoptar medidas de resguardo inmediatas, iniciar investigación en 5 días hábiles, concluirla en 30 días e informar resultado a la Inspección del Trabajo.' },
      { num: 'Art. 10°', titulo: 'Sanciones al empleador', desc: 'Multas de 10 a 150 UTM. Responsabilidad civil solidaria si no adoptó medidas de prevención o las adoptó tardíamente.' },
    ],
    ultimaActualizacion: 'Vigente desde 01 Ago 2024',
  },
  {
    id: 'ds40',
    titulo: 'DS 40 · Derecho a Saber',
    subtitulo: 'Riesgos laborales y medidas preventivas',
    icono: BookOpen,
    color: '#EF9F27',
    bg: '#FFFBEB',
    articulos: [
      { num: 'Art. 21°', titulo: 'Obligación de informar', desc: 'Los empleadores deben informar oportuna y convenientemente a sus trabajadores sobre los riesgos que entrañan sus labores y las medidas preventivas pertinentes.' },
      { num: 'Art. 22°', titulo: 'Registro de entrega', desc: 'La información debe ser entregada al momento del ingreso o al producirse un cambio de puesto de trabajo, dejando constancia escrita firmada por el trabajador.' },
    ],
    ultimaActualizacion: 'Vigente. DS 40 (reglamento Ley 16.744)',
  },
  {
    id: 'dt',
    titulo: 'Dirección del Trabajo',
    subtitulo: 'Conexión automática de dictámenes',
    icono: Link2,
    color: '#534AB7',
    bg: '#F0EFFE',
    articulos: [
      { num: 'Ord. 1133/2024', titulo: 'Implementación Ley Karin', desc: 'Instrucciones sobre el protocolo de investigación, plazos y medidas de resguardo que deben adoptar los empleadores.' },
      { num: 'Ord. 0882/2025', titulo: 'Horas extraordinarias y jornada', desc: 'Criterios para el pago de sobretiempo y registro de asistencia en modalidades especiales de trabajo.' },
    ],
    ultimaActualizacion: 'Sincronizado automáticamente · Última actualización: 02 Abr 2026',
    automatico: true,
  },
]

/* ══════════════════════════════════════════════════════════════
   DATOS — Normativa interna
══════════════════════════════════════════════════════════════ */
const normativaInterna = [
  {
    id: 'ri',
    nombre: 'Reglamento Interno de Orden, Higiene y Seguridad',
    version: 'v3.1',
    fecha: 'Ene 2023',
    estado: 'desactualizado',
    firmas: { total: 247, completadas: 231 },
    advertencia: 'Desactualizado post Ley Karin (ago 2024). No incluye protocolo de denuncia ni definición de acoso laboral según la nueva ley. Debe ser actualizado antes del próximo proceso DT.',
  },
  {
    id: 'karin',
    nombre: 'Protocolo de Prevención y Denuncia Ley Karin',
    version: 'v1.0',
    fecha: 'Ago 2024',
    estado: 'vigente',
    firmas: { total: 284, completadas: 284 },
    advertencia: null,
  },
]

/* ══════════════════════════════════════════════════════════════
   SUBCOMPONENTES
══════════════════════════════════════════════════════════════ */
function PctBar({ pct }) {
  const color = pct === 100 ? '#1D9E75' : pct >= 80 ? '#EF9F27' : '#E24B4A'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-bold shrink-0" style={{ color }}>{pct}%</span>
    </div>
  )
}

function DocRow({ item }) {
  const cfg = estadoDoc[item.estado]
  const Icon = cfg.icon
  return (
    <div className={`rounded-lg border p-3 ${item.nota ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-gray-50/30'}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon size={14} style={{ color: cfg.color }} className="shrink-0" />
          <p className="text-sm text-gray-800 truncate">{item.nombre}</p>
          {item.fecha && <span className="text-[11px] text-gray-400 shrink-0">{item.fecha}</span>}
        </div>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0"
          style={{ color: cfg.color, background: cfg.bg }}
        >
          {cfg.label}
        </span>
      </div>
      {item.nota && (
        <div className="flex items-start gap-1.5 mt-2 pt-2 border-t border-red-100">
          <AlertTriangle size={12} style={{ color: '#E24B4A' }} className="shrink-0 mt-0.5" />
          <p className="text-[11px] text-red-700 leading-snug">{item.nota}</p>
        </div>
      )}
    </div>
  )
}

function UploadZone() {
  return (
    <div className="mt-3 border-2 border-dashed border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 hover:border-gray-300 transition-colors cursor-pointer group">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
        <Upload size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Subir documento</p>
        <p className="text-[11px] text-gray-400">
          La IA extrae y estructura el contenido automáticamente.
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════════════════════════════ */
export default function DocsColaborador() {
  const [tabActiva, setTabActiva] = useState('docs')
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState('1')

  const colab = listaColaboradores.find((c) => c.id === colaboradorSeleccionado)
  const docs  = getDocsColaborador(colaboradorSeleccionado, colab?.pct ?? 0)

  const totalFaltantes = listaColaboradores.filter((c) => c.pct < 100).length

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Docs. del colaborador</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Repositorio documental · {listaColaboradores.filter(c => c.pct === 100).length} colaboradores con carpeta completa ·{' '}
          <span style={{ color: '#E24B4A' }} className="font-medium">{totalFaltantes} con documentos pendientes</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 mb-5">
        {[
          { id: 'docs',     label: 'Documentos del colaborador' },
          { id: 'legal',    label: 'Normativa legal vigente' },
          { id: 'interna',  label: 'Normativa interna' },
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
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          TAB 1 — Documentos del colaborador
      ══════════════════════════════════════════════════════════ */}
      {tabActiva === 'docs' && (
        <div className="grid gap-4" style={{ gridTemplateColumns: '220px 1fr' }}>

          {/* Panel izquierdo — Lista colaboradores */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <div className="px-3 py-2.5 border-b border-gray-100">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Colaboradores</p>
            </div>
            <div className="flex flex-col divide-y divide-gray-50">
              {listaColaboradores.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColaboradorSeleccionado(c.id)}
                  className={`flex flex-col gap-1.5 px-3 py-3 text-left transition-colors ${
                    colaboradorSeleccionado === c.id
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                        style={{ background: c.color }}
                      >
                        {c.iniciales}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-medium truncate ${colaboradorSeleccionado === c.id ? 'text-blue-700' : 'text-gray-800'}`}>
                          {c.nombre}
                        </p>
                      </div>
                    </div>
                    {c.alerta && (
                      <AlertTriangle size={12} style={{ color: '#E24B4A' }} className="shrink-0" />
                    )}
                  </div>
                  <PctBar pct={c.pct} />
                </button>
              ))}
            </div>
          </div>

          {/* Panel derecho — Documentos */}
          <div className="flex flex-col gap-4">
            {/* Header del panel derecho */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: colab?.color }}
                  >
                    {colab?.iniciales}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{colab?.nombre}</p>
                    <p className="text-xs text-gray-500">{colab?.cargo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400 mb-1">Completitud documental</p>
                    <div className="flex items-center gap-2">
                      <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${colab?.pct}%`,
                            background: colab?.pct === 100 ? '#1D9E75' : colab?.pct >= 80 ? '#EF9F27' : '#E24B4A',
                          }}
                        />
                      </div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: colab?.pct === 100 ? '#1D9E75' : colab?.pct >= 80 ? '#EF9F27' : '#E24B4A' }}
                      >
                        {colab?.pct}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secciones de documentos */}
            {docs.map((seccion) => (
              <div key={seccion.seccion} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-gray-400" />
                    <h2 className="text-sm font-semibold text-gray-800">{seccion.seccion}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    {seccion.items.filter(i => i.estado === 'faltante').length > 0 && (
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: '#E24B4A', background: '#FEF2F2' }}
                      >
                        {seccion.items.filter(i => i.estado === 'faltante').length} faltante{seccion.items.filter(i => i.estado === 'faltante').length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>

                {seccion.items.length === 0 ? (
                  <p className="text-xs text-gray-400 italic py-1">Sin registros en esta sección.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {seccion.items.map((item) => (
                      <DocRow key={item.id} item={item} />
                    ))}
                  </div>
                )}

                <UploadZone />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 2 — Normativa legal vigente
      ══════════════════════════════════════════════════════════ */}
      {tabActiva === 'legal' && (
        <div className="grid grid-cols-2 gap-4">
          {normativaLegal.map((norma) => {
            const Icon = norma.icono
            return (
              <div key={norma.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ background: norma.bg, borderBottom: `1px solid ${norma.color}22` }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} style={{ color: norma.color }} />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{norma.titulo}</p>
                      <p className="text-[11px] text-gray-500">{norma.subtitulo}</p>
                    </div>
                  </div>
                  {norma.automatico && (
                    <span
                      className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ color: norma.color, background: 'white' }}
                    >
                      <Link2 size={9} /> Auto
                    </span>
                  )}
                </div>

                {/* Artículos */}
                <div className="divide-y divide-gray-50">
                  {norma.articulos.map((art) => (
                    <div key={art.num} className="px-5 py-3">
                      <div className="flex items-start gap-3">
                        <span
                          className="text-[11px] font-bold px-2 py-0.5 rounded shrink-0 mt-0.5"
                          style={{ color: norma.color, background: norma.bg }}
                        >
                          {art.num}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-800 mb-0.5">{art.titulo}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{art.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-gray-400" />
                    <p className="text-[11px] text-gray-400">{norma.ultimaActualizacion}</p>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] font-medium hover:underline" style={{ color: norma.color }}>
                    <Eye size={11} /> Ver completo
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 3 — Normativa interna
      ══════════════════════════════════════════════════════════ */}
      {tabActiva === 'interna' && (
        <div className="flex flex-col gap-4">
          {/* Documentos */}
          {normativaInterna.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between px-5 py-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: doc.estado === 'vigente' ? '#ECFDF5' : '#FFFBEB',
                    }}
                  >
                    <FileText
                      size={16}
                      style={{ color: doc.estado === 'vigente' ? '#1D9E75' : '#EF9F27' }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{doc.nombre}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {doc.version} · Aprobado {doc.fecha}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                  style={
                    doc.estado === 'vigente'
                      ? { color: '#1D9E75', background: '#ECFDF5' }
                      : { color: '#D97706', background: '#FEF3C7' }
                  }
                >
                  {doc.estado === 'vigente' ? 'Vigente' : 'Desactualizado'}
                </span>
              </div>

              {/* Firmas */}
              <div className="px-5 pb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Users size={12} className="text-gray-400" />
                    <p className="text-xs text-gray-500">Firmas recibidas</p>
                  </div>
                  <p className="text-xs font-bold text-gray-700">
                    {doc.firmas.completadas}/{doc.firmas.total}
                  </p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(doc.firmas.completadas / doc.firmas.total) * 100}%`,
                      background: doc.firmas.completadas === doc.firmas.total ? '#1D9E75' : '#185FA5',
                    }}
                  />
                </div>
              </div>

              {/* Advertencia */}
              {doc.advertencia && (
                <div
                  className="mx-5 mb-4 rounded-lg p-3 flex items-start gap-2 border"
                  style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}
                >
                  <AlertTriangle size={13} style={{ color: '#EF9F27' }} className="shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">{doc.advertencia}</p>
                </div>
              )}

              {/* Acciones */}
              <div className="px-5 pb-4 flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Eye size={12} /> Ver documento
                </button>
                {doc.estado === 'desactualizado' && (
                  <button
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                    style={{ background: '#EF9F27' }}
                  >
                    <Upload size={12} /> Subir versión actualizada
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Botón agregar normativa */}
          <button
            className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-200 rounded-xl py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} />
            Agregar normativa interna
          </button>
        </div>
      )}
    </div>
  )
}
