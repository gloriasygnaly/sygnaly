import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, TrendingUp, TrendingDown, Minus, ChevronDown } from 'lucide-react'
import { colaboradores } from '../data/colaboradores'

/* ── Config ── */
const nivelConfig = {
  sin_senales:       { label: 'Sin señales activas', color: '#1D9E75', bg: '#ECFDF5' },
  observacion:       { label: 'En observación',      color: '#EF9F27', bg: '#FFFBEB' },
  requiere_atencion: { label: 'Requiere atención',   color: '#EF9F27', bg: '#FFFBEB' },
  atencion_urgente:  { label: 'Atención urgente',    color: '#E24B4A', bg: '#FEF2F2' },
}

const estadoAlarmaConfig = {
  'Activo':          { color: '#E24B4A', bg: '#FEF2F2' },
  'En seguimiento':  { color: '#EF9F27', bg: '#FFFBEB' },
  'Nuevo':           { color: '#534AB7', bg: '#F0EFFE' },
  'Sin alarma':      { color: '#9CA3AF', bg: '#F3F4F6' },
}

const factorColors = [
  { bg: '#FEF2F2', color: '#E24B4A' },
  { bg: '#FFFBEB', color: '#D97706' },
  { bg: '#EFF6FF', color: '#185FA5' },
  { bg: '#ECFDF5', color: '#1D9E75' },
  { bg: '#F0EFFE', color: '#534AB7' },
]

function TendenciaIcon({ value }) {
  if (value === 'up')
    return (
      <span className="flex items-center gap-0.5 font-semibold text-xs" style={{ color: '#E24B4A' }}>
        <TrendingUp size={14} /> ↑
      </span>
    )
  if (value === 'down')
    return (
      <span className="flex items-center gap-0.5 font-semibold text-xs" style={{ color: '#1D9E75' }}>
        <TrendingDown size={14} /> ↓
      </span>
    )
  return (
    <span className="flex items-center gap-0.5 font-semibold text-xs text-gray-400">
      <Minus size={14} /> →
    </span>
  )
}

/* ── Helpers ── */
const areas = ['Todas las áreas', ...Array.from(new Set(colaboradores.map((c) => c.area)))]
const estados = [
  { value: '', label: 'Todos los estados' },
  { value: 'atencion_urgente',  label: 'Atención urgente' },
  { value: 'requiere_atencion', label: 'Requiere atención' },
  { value: 'observacion',       label: 'En observación' },
  { value: 'sin_senales',       label: 'Sin señales activas' },
]

function senalesActivas(c) {
  if (!c.senales) return 0
  return c.senales.reduce((s, cat) => s + cat.items.filter((i) => i.nivel === 'activa').length, 0)
}

/* ══════════════════════════════════════════════════════════════ */
export default function MapaSenales() {
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState('')
  const [filterArea, setFilterArea] = useState('')
  const [filterEstado, setFilterEstado] = useState('')

  const datos = useMemo(() => {
    return colaboradores
      .map((c) => ({ ...c, _activas: senalesActivas(c) }))
      .sort((a, b) => b._activas - a._activas)
      .filter((c) => {
        const matchNombre = c.nombre.toLowerCase().includes(busqueda.toLowerCase())
        const matchArea   = !filterArea   || filterArea === 'Todas las áreas' || c.area === filterArea
        const matchEstado = !filterEstado || c.nivelAlerta === filterEstado
        return matchNombre && matchArea && matchEstado
      })
  }, [busqueda, filterArea, filterEstado])

  const urgentes = colaboradores.filter((c) => c.nivelAlerta === 'atencion_urgente').length
  const enAtencion = colaboradores.filter((c) => c.nivelAlerta === 'requiere_atencion').length

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Mapa de señales</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {colaboradores.length} colaboradores monitoreados ·{' '}
          <span style={{ color: '#E24B4A' }} className="font-medium">{urgentes} atención urgente</span>
          {' · '}
          <span style={{ color: '#EF9F27' }} className="font-medium">{enAtencion} requieren atención</span>
        </p>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {/* Buscador */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Filtro área */}
        <div className="relative">
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 text-gray-700 cursor-pointer"
          >
            {areas.map((a) => (
              <option key={a} value={a === 'Todas las áreas' ? '' : a}>{a}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Filtro estado */}
        <div className="relative">
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 text-gray-700 cursor-pointer"
          >
            {estados.map((e) => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {(busqueda || filterArea || filterEstado) && (
          <button
            onClick={() => { setBusqueda(''); setFilterArea(''); setFilterEstado('') }}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Colaborador', 'Área', 'Estado del vínculo', 'Señales activas', 'Tendencia', 'Factores principales', 'Estado de alarma'].map((h) => (
                <th
                  key={h}
                  className="text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {datos.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-sm text-gray-400 py-12">
                  No se encontraron colaboradores con los filtros aplicados.
                </td>
              </tr>
            ) : (
              datos.map((c) => {
                const nivel = nivelConfig[c.nivelAlerta]
                const alarma = estadoAlarmaConfig[c.estadoAlarma] ?? { color: '#9CA3AF', bg: '#F3F4F6' }
                return (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/colaboradores/${c.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {/* Colaborador */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: c.avatarColor }}
                        >
                          {c.iniciales}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{c.nombre}</p>
                          <p className="text-xs text-gray-400">{c.cargo}</p>
                        </div>
                      </div>
                    </td>

                    {/* Área */}
                    <td className="px-4 py-3 text-sm text-gray-600">{c.area}</td>

                    {/* Estado del vínculo */}
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                        style={{ color: nivel.color, background: nivel.bg }}
                      >
                        {nivel.label}
                      </span>
                    </td>

                    {/* Señales activas */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={
                            c._activas === 0
                              ? { color: '#9CA3AF', background: '#F3F4F6' }
                              : c._activas >= 6
                              ? { color: '#E24B4A', background: '#FEF2F2' }
                              : c._activas >= 3
                              ? { color: '#EF9F27', background: '#FFFBEB' }
                              : { color: '#185FA5', background: '#EFF6FF' }
                          }
                        >
                          {c._activas}
                        </span>
                      </div>
                    </td>

                    {/* Tendencia */}
                    <td className="px-4 py-3">
                      <TendenciaIcon value={c.tendencia} />
                    </td>

                    {/* Factores principales */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.factoresPrincipales.length === 0 ? (
                          <span className="text-xs text-gray-300">—</span>
                        ) : (
                          c.factoresPrincipales.map((f, i) => (
                            <span
                              key={f}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                              style={factorColors[i % factorColors.length]}
                            >
                              {f}
                            </span>
                          ))
                        )}
                      </div>
                    </td>

                    {/* Estado de alarma */}
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                        style={{ color: alarma.color, background: alarma.bg }}
                      >
                        {c.estadoAlarma}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
          <p className="text-[11px] text-gray-400">
            {datos.length} colaborador{datos.length !== 1 ? 'es' : ''} · ordenados por señales activas (mayor a menor) ·{' '}
            <span className="font-medium">El indicador refleja señales activas, no un score de riesgo.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
