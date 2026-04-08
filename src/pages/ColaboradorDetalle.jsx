import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Clock, Users, Calendar,
  AlertTriangle, CheckCircle2, Circle, XCircle,
  Minus, Info, Scale, Building2, FileText,
  ChevronRight, TrendingDown, Calculator,
  ShieldAlert,
} from 'lucide-react'
import { colaboradores } from '../data/colaboradores'

/* ── Configuración de niveles ── */
const nivelAlertaConfig = {
  sin_senales:       { label: 'Sin señales activas', color: '#1D9E75', bg: '#ECFDF5' },
  observacion:       { label: 'En observación',      color: '#EF9F27', bg: '#FFFBEB' },
  requiere_atencion: { label: 'Requiere atención',   color: '#EF9F27', bg: '#FFFBEB' },
  atencion_urgente:  { label: 'Atención urgente',    color: '#E24B4A', bg: '#FEF2F2' },
}

const senalColor = {
  activa:     { dot: '#E24B4A', label: 'Activa' },
  observacion:{ dot: '#EF9F27', label: 'En observación' },
}

const estadoAccionConfig = {
  en_proceso:  { label: 'En proceso',  color: '#185FA5', bg: '#EFF6FF' },
  agendada:    { label: 'Agendada',    color: '#534AB7', bg: '#F0EFFE' },
  pendiente:   { label: 'Pendiente',   color: '#EF9F27', bg: '#FFFBEB' },
  por_iniciar: { label: 'Por iniciar', color: '#6B7280', bg: '#F3F4F6' },
}

const checklistConfig = {
  al_dia:   { label: 'Al día',    icon: CheckCircle2, color: '#1D9E75' },
  revisar:  { label: 'Revisar',   icon: AlertTriangle, color: '#EF9F27' },
  faltante: { label: 'Faltante',  icon: XCircle,      color: '#E24B4A' },
  no_aplica:{ label: 'No aplica', icon: Minus,        color: '#9CA3AF' },
}

const nivelExposicion = {
  Bajo:  { color: '#1D9E75', bg: '#ECFDF5' },
  Medio: { color: '#EF9F27', bg: '#FFFBEB' },
  Alto:  { color: '#E24B4A', bg: '#FEF2F2' },
}

const NOTA_CALCULOS =
  '↗ Los cálculos de montos deben ser verificados con el departamento de contabilidad. Sygnaly no valida cifras.'

/* ══════════════════════════════════════════════════════════════ */
export default function ColaboradorDetalle() {
  const { id } = useParams()
  const colaborador = colaboradores.find((c) => c.id === id)

  const [tabActiva, setTabActiva] = useState('senales')
  const [disclaimerAceptado, setDisclaimerAceptado] = useState(false)

  if (!colaborador) {
    return (
      <div className="p-6 flex items-center justify-center min-h-full">
        <div className="text-center">
          <p className="text-4xl mb-3">🔍</p>
          <h2 className="text-xl font-semibold text-gray-700">Colaborador no encontrado</h2>
          <Link to="/colaboradores" className="text-sm mt-2 inline-block underline" style={{ color: '#185FA5' }}>
            Volver al listado
          </Link>
        </div>
      </div>
    )
  }

  const nivel = nivelAlertaConfig[colaborador.nivelAlerta]
  const esUrgente = colaborador.nivelAlerta === 'atencion_urgente'

  const totalActivas = colaborador.senales.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.nivel === 'activa').length,
    0
  )

  const tabs = [
    { id: 'senales',   label: 'Señales y contexto' },
    { id: 'acciones',  label: 'Acciones remediales' },
    ...(esUrgente ? [{ id: 'protocolo', label: 'Protocolo de salida' }] : []),
  ]

  return (
    <div className="p-6 max-w-[1100px] mx-auto">

      {/* Back */}
      <Link
        to="/colaboradores"
        className="inline-flex items-center gap-1.5 text-sm mb-4 hover:underline"
        style={{ color: '#185FA5' }}
      >
        <ArrowLeft size={14} /> Volver a colaboradores
      </Link>

      {/* ── Header ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-start justify-between gap-4">
          {/* Avatar + nombre */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
              style={{ background: colaborador.avatarColor }}
            >
              {colaborador.iniciales}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{colaborador.nombre}</h1>
              <p className="text-sm text-gray-500">{colaborador.cargo}</p>
            </div>
          </div>

          {/* Badge nivel */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span
              className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full"
              style={{ color: nivel.color, background: nivel.bg }}
            >
              <AlertTriangle size={13} />
              {nivel.label}
            </span>
            <span className="text-xs text-gray-400">
              {totalActivas} señal{totalActivas !== 1 ? 'es' : ''} activa{totalActivas !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
          {[
            { icon: MapPin,    label: 'Planta',      value: colaborador.planta },
            { icon: Clock,     label: 'Turno',       value: `${colaborador.turno} · ${colaborador.turnoHorario}` },
            { icon: Calendar,  label: 'Antigüedad',  value: colaborador.antiguedad },
            { icon: Users,     label: 'Sindicato',   value: colaborador.sindicato },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
              <div className="flex items-center gap-1.5">
                <Icon size={13} className="text-gray-400 shrink-0" />
                <p className="text-sm text-gray-700 font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-0 border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
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
            {tab.id === 'protocolo' && (
              <span className="ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">
                Urgente
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1 — Señales y contexto
      ══════════════════════════════════════════════════════════════ */}
      {tabActiva === 'senales' && (
        <div>
          {/* Resumen */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4 border"
            style={{ background: nivel.bg, borderColor: nivel.color + '33' }}
          >
            <AlertTriangle size={18} style={{ color: nivel.color }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: nivel.color }}>
                {totalActivas} señales activas · {nivel.label}
              </p>
              <p className="text-xs text-gray-500">
                Distribuidas en {colaborador.senales.filter(c => c.items.some(i => i.nivel === 'activa')).length} de {colaborador.senales.length} categorías monitoreadas
              </p>
            </div>
          </div>

          {/* Grid 2 columnas de categorías */}
          <div className="grid grid-cols-2 gap-3">
            {colaborador.senales.map((cat) => {
              const activas = cat.items.filter((i) => i.nivel === 'activa').length
              return (
                <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  {/* Cabecera categoría */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-800">{cat.titulo}</p>
                    {activas > 0 ? (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ color: '#E24B4A', background: '#FEF2F2' }}
                      >
                        {activas} activa{activas !== 1 ? 's' : ''}
                      </span>
                    ) : cat.items.length > 0 ? (
                      <span className="text-xs px-2 py-0.5 rounded-full text-gray-400 bg-gray-100">
                        En observación
                      </span>
                    ) : null}
                  </div>

                  {/* Items */}
                  {cat.items.length === 0 ? (
                    <div className="flex items-center gap-2 text-xs text-gray-400 py-1">
                      <CheckCircle2 size={13} style={{ color: '#1D9E75' }} />
                      Sin señales registradas
                    </div>
                  ) : (
                    <ul className="flex flex-col gap-2.5">
                      {cat.items.map((item, i) => {
                        const sc = senalColor[item.nivel]
                        return (
                          <li key={i} className="flex items-start gap-2">
                            <div
                              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                              style={{ background: sc.dot }}
                            />
                            <div className="min-w-0">
                              <p className="text-sm text-gray-700 leading-snug">{item.texto}</p>
                              <p className="text-[11px] text-gray-400 mt-0.5">{item.fecha}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2 — Acciones remediales
      ══════════════════════════════════════════════════════════════ */}
      {tabActiva === 'acciones' && (
        <div>
          {/* Banner constructivo */}
          <div
            className="flex items-start gap-3 rounded-xl p-4 mb-5 border"
            style={{ background: '#EFF6FF', borderColor: '#BFDBFE' }}
          >
            <Info size={18} className="shrink-0 mt-0.5" style={{ color: '#185FA5' }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: '#185FA5' }}>
                El objetivo es bajar la tensión del vínculo, no sancionar.
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Estas acciones buscan restablecer condiciones de trabajo sanas. La intervención temprana reduce significativamente el riesgo de escalada legal.
              </p>
            </div>
          </div>

          {/* Lista de acciones */}
          <div className="flex flex-col gap-3 mb-6">
            {colaborador.acciones.map((accion) => {
              const est = estadoAccionConfig[accion.estado]
              return (
                <div
                  key={accion.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start gap-4"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: est.bg }}
                  >
                    <Circle size={14} style={{ color: est.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{accion.titulo}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{accion.descripcion}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Responsable: <span className="font-medium text-gray-600">{accion.responsable}</span>
                      {' · '}{accion.fecha}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ color: est.color, background: est.bg }}
                  >
                    {est.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Botones de cierre */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-semibold text-gray-700 mb-1">Cierre del caso</p>
            <p className="text-xs text-gray-400 mb-4">
              Una vez completadas las acciones, seleccione el resultado del proceso de intervención.
            </p>
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors"
                style={{ color: '#1D9E75', borderColor: '#1D9E75', background: '#ECFDF5' }}
              >
                <CheckCircle2 size={15} />
                Vínculo fortalecido
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors"
                style={{ color: '#E24B4A', borderColor: '#E24B4A', background: '#FEF2F2' }}
              >
                <ChevronRight size={15} />
                Derivar a protocolo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3 — Protocolo de salida (solo si atención urgente)
      ══════════════════════════════════════════════════════════════ */}
      {tabActiva === 'protocolo' && esUrgente && (
        <div>
          {/* Disclaimer legal */}
          {!disclaimerAceptado && (
            <div
              className="rounded-xl p-4 mb-5 border"
              style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} style={{ color: '#EF9F27' }} className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Aviso legal importante</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Este protocolo es una herramienta de apoyo para la gestión preventiva de RRHH.
                    <strong> No reemplaza asesoría legal profesional.</strong> Los escenarios de exposición son estimaciones
                    orientativas basadas en la información disponible. Antes de ejecutar cualquier acción de desvinculación,
                    consulte con el departamento legal o un abogado laboral habilitado.
                  </p>
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={(e) => setDisclaimerAceptado(e.target.checked)}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#185FA5' }}
                    />
                    <span className="text-xs font-medium text-gray-700">
                      Entiendo que este documento es confidencial y de uso interno exclusivo.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {disclaimerAceptado && (
            <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
              <CheckCircle2 size={13} style={{ color: '#1D9E75' }} />
              Aviso legal aceptado · Acceso de uso interno registrado
            </div>
          )}

          {/* Checklist documental */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={16} className="text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-800">Checklist documental</h2>
              <span className="ml-auto text-xs text-gray-400">
                {colaborador.protocolo.checklist.filter(c => c.estado === 'al_dia').length} de {colaborador.protocolo.checklist.filter(c => c.estado !== 'no_aplica').length} documentos al día
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {colaborador.protocolo.checklist.map((item) => {
                const cfg = checklistConfig[item.estado]
                const Icon = cfg.icon
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border"
                    style={{
                      borderColor: item.estado === 'faltante' ? '#FECACA' : item.estado === 'revisar' ? '#FDE68A' : '#F3F4F6',
                      background: item.estado === 'faltante' ? '#FEF2F2' : item.estado === 'revisar' ? '#FFFBEB' : '#FAFAFA',
                    }}
                  >
                    <Icon size={14} style={{ color: cfg.color }} className="shrink-0" />
                    <p className="text-xs text-gray-700 flex-1 leading-snug">{item.texto}</p>
                    <span className="text-[10px] font-semibold shrink-0" style={{ color: cfg.color }}>
                      {cfg.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Exposición estimada — 2 capas */}
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Exposición estimada
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Capa 1 — DT */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-50">
                  <Building2 size={14} style={{ color: '#EF9F27' }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Capa 1 · DT</p>
                  <p className="text-[10px] text-gray-400">Dirección del Trabajo (administrativa)</p>
                </div>
                <span
                  className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    color: nivelExposicion[colaborador.protocolo.exposicionDT.nivel].color,
                    background: nivelExposicion[colaborador.protocolo.exposicionDT.nivel].bg,
                  }}
                >
                  Riesgo {colaborador.protocolo.exposicionDT.nivel}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {colaborador.protocolo.exposicionDT.items.map((item, i) => (
                  <div key={i} className="flex flex-col gap-0.5 py-2 border-b border-gray-50 last:border-0">
                    <p className="text-xs font-medium text-gray-700">{item.concepto}</p>
                    <p className="text-xs text-gray-400">{item.monto !== 'Sin monto' ? item.montoRef : item.montoRef}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Capa 2 — Tribunal */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-50">
                  <Scale size={14} style={{ color: '#E24B4A' }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Capa 2 · Tribunal</p>
                  <p className="text-[10px] text-gray-400">Vía judicial (Juzgado del Trabajo)</p>
                </div>
                <span
                  className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    color: nivelExposicion[colaborador.protocolo.exposicionTribunal.nivel].color,
                    background: nivelExposicion[colaborador.protocolo.exposicionTribunal.nivel].bg,
                  }}
                >
                  Riesgo {colaborador.protocolo.exposicionTribunal.nivel}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {colaborador.protocolo.exposicionTribunal.items.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 py-2 border-b border-gray-50 last:border-0">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-700 leading-snug">{item.concepto}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.detalle}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-800 shrink-0 text-right">{item.monto}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nota de cálculos */}
          <div
            className="flex items-start gap-3 rounded-xl px-4 py-3 border"
            style={{ background: '#F9FAFB', borderColor: '#E5E7EB' }}
          >
            <Calculator size={15} className="text-gray-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-600">Nota metodológica: </span>
              {NOTA_CALCULOS}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
