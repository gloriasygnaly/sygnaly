import { Link } from 'react-router-dom'
import { colaboradores } from '../data/colaboradores'
import { MapPin, Clock, ChevronRight } from 'lucide-react'

const nivelConfig = {
  sin_senales:      { label: 'Sin señales activas', color: '#1D9E75', bg: '#ECFDF5' },
  observacion:      { label: 'En observación',      color: '#EF9F27', bg: '#FFFBEB' },
  requiere_atencion:{ label: 'Requiere atención',   color: '#EF9F27', bg: '#FFFBEB' },
  atencion_urgente: { label: 'Atención urgente',    color: '#E24B4A', bg: '#FEF2F2' },
}

export default function Colaboradores() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Colaboradores</h1>
        <p className="text-gray-500 text-sm mt-0.5">{colaboradores.length} colaborador{colaboradores.length !== 1 ? 'es' : ''} registrado{colaboradores.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {colaboradores.map((c) => {
          const nivel = nivelConfig[c.nivelAlerta]
          const totalActivas = c.senales.reduce(
            (sum, cat) => sum + cat.items.filter(i => i.nivel === 'activa').length,
            0
          )
          return (
            <Link
              key={c.id}
              to={`/colaboradores/${c.id}`}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: c.avatarColor }}
                  >
                    {c.iniciales}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{c.nombre}</p>
                    <p className="text-xs text-gray-500">{c.cargo}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 mt-0.5 shrink-0" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin size={12} />
                  {c.planta} · {c.turno}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock size={12} />
                  {c.antiguedad}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: nivel.color, background: nivel.bg }}
                >
                  {nivel.label}
                </span>
                {totalActivas > 0 && (
                  <span className="text-xs text-gray-400">{totalActivas} señales activas</span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
