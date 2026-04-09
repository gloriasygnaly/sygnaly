import { useState } from 'react'
import { CheckCircle2, MinusCircle, Shield, Clock, Plus, X } from 'lucide-react'

/* ── Data ── */
const usuarios = [
  {
    id: 'u1',
    nombre: 'Carolina Muñoz',
    iniciales: 'CM',
    cargo: 'RRHH Administrador',
    email: 'c.munoz@empresa.cl',
    rol: 'rrhh_admin',
    rolLabel: 'RRHH Admin',
    ultimoAcceso: 'Hoy, 09:42',
    color: '#185FA5',
    activo: true,
  },
  {
    id: 'u2',
    nombre: 'Rodrigo Soto',
    iniciales: 'RS',
    cargo: 'Jefatura Planta Norte',
    email: 'r.soto@empresa.cl',
    rol: 'jefatura',
    rolLabel: 'Jefatura',
    ultimoAcceso: 'Hoy, 08:15',
    color: '#1D9E75',
    activo: true,
  },
  {
    id: 'u3',
    nombre: 'Jorge Lagos',
    iniciales: 'JL',
    cargo: 'Asesor legal externo',
    email: 'j.lagos@lagosasociados.cl',
    rol: 'legal',
    rolLabel: 'Legal externo',
    ultimoAcceso: 'Ayer, 16:30',
    color: '#534AB7',
    activo: true,
  },
  {
    id: 'u4',
    nombre: 'Gonzalo Reyes',
    iniciales: 'GR',
    cargo: 'Gerente General',
    email: 'g.reyes@empresa.cl',
    rol: 'gerencia',
    rolLabel: 'Gerencia',
    ultimoAcceso: 'Hace 3 días',
    color: '#EF9F27',
    activo: true,
  },
]

const roles = [
  {
    id: 'rrhh_admin',
    label: 'RRHH Admin',
    color: '#185FA5',
    bg: '#EFF6FF',
    descripcion: 'Acceso total a todos los módulos. Puede crear, editar y eliminar registros. Gestiona usuarios y configuración.',
    permisoResumen: 'Acceso total',
  },
  {
    id: 'jefatura',
    label: 'Jefatura',
    color: '#1D9E75',
    bg: '#ECFDF5',
    descripcion: 'Acceso parcial a su propio equipo. Puede ver señales, checklist y acciones de sus colaboradores directos. Sin acceso a datos de remuneración.',
    permisoResumen: 'Equipo propio · sin remuneraciones',
  },
  {
    id: 'legal',
    label: 'Legal externo',
    color: '#534AB7',
    bg: '#F0EFFE',
    descripcion: 'Acceso completo a módulos legales: normativa, radar legal, protocolo de salida. Sin acceso a remuneraciones ni configuración.',
    permisoResumen: 'Legal completo · sin config.',
  },
  {
    id: 'gerencia',
    label: 'Gerencia',
    color: '#EF9F27',
    bg: '#FFFBEB',
    descripcion: 'Solo lectura ejecutiva. Ve dashboard, alertas y métricas de resumen. Sin acceso a datos individuales ni configuración.',
    permisoResumen: 'Solo lectura ejecutiva',
  },
]

/* ── Permisos por módulo ── */
// values: 'full' | 'partial' | 'none'
const modulos = [
  { label: 'Dashboard',             rrhh_admin: 'full', jefatura: 'partial', legal: 'none',    gerencia: 'full'    },
  { label: 'Alertas preventivas',   rrhh_admin: 'full', jefatura: 'partial', legal: 'partial', gerencia: 'partial' },
  { label: 'Acciones remediales',   rrhh_admin: 'full', jefatura: 'partial', legal: 'partial', gerencia: 'none'    },
  { label: 'Orientación preventiva',rrhh_admin: 'full', jefatura: 'partial', legal: 'full',    gerencia: 'partial' },
  { label: 'Colaboradores · señales', rrhh_admin: 'full', jefatura: 'partial', legal: 'partial', gerencia: 'none'  },
  { label: 'Mapa de señales',       rrhh_admin: 'full', jefatura: 'partial', legal: 'partial', gerencia: 'partial' },
  { label: 'Protocolo de salida',   rrhh_admin: 'full', jefatura: 'none',    legal: 'full',    gerencia: 'none'    },
  { label: 'Docs. del colaborador', rrhh_admin: 'full', jefatura: 'partial', legal: 'partial', gerencia: 'none'    },
  { label: 'Normativa legal',       rrhh_admin: 'full', jefatura: 'partial', legal: 'full',    gerencia: 'partial' },
  { label: 'Normativa interna',     rrhh_admin: 'full', jefatura: 'partial', legal: 'full',    gerencia: 'none'    },
  { label: 'Checklist colaboradores', rrhh_admin: 'full', jefatura: 'partial', legal: 'partial', gerencia: 'none'  },
  { label: 'Radar legal empresa',   rrhh_admin: 'full', jefatura: 'none',    legal: 'full',    gerencia: 'partial' },
  { label: 'Capacitación',          rrhh_admin: 'full', jefatura: 'partial', legal: 'none',    gerencia: 'partial' },
  { label: 'Fuentes de datos',      rrhh_admin: 'full', jefatura: 'none',    legal: 'none',    gerencia: 'none'    },
  { label: 'Usuarios y roles',      rrhh_admin: 'full', jefatura: 'none',    legal: 'none',    gerencia: 'none'    },
]

const rolKeys = ['rrhh_admin', 'jefatura', 'legal', 'gerencia']

function PermisoCell({ nivel }) {
  if (nivel === 'full')
    return (
      <td className="px-4 py-2.5 text-center">
        <CheckCircle2 size={15} style={{ color: '#1D9E75' }} className="mx-auto" />
      </td>
    )
  if (nivel === 'partial')
    return (
      <td className="px-4 py-2.5 text-center">
        <div className="mx-auto w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#185FA5' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#185FA5' }} />
        </div>
      </td>
    )
  return (
    <td className="px-4 py-2.5 text-center">
      <MinusCircle size={15} className="text-gray-200 mx-auto" />
    </td>
  )
}

/* ════════════════════════════════════════════════════════════════ */
export default function UsuariosRoles() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios y roles</h1>
          <p className="text-gray-500 text-sm mt-0.5">Gestión de accesos y matriz de permisos por módulo</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white hover:opacity-90 transition-opacity"
          style={{ background: '#185FA5' }}
        >
          <Plus size={14} /> Invitar usuario
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* ── Tabla de usuarios ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-50">
            <p className="text-sm font-semibold text-gray-700">Usuarios activos · {usuarios.length}</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                {['Usuario', 'Rol', 'Acceso a', 'Último acceso', ''].map((h) => (
                  <th key={h} className="text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {usuarios.map((u) => {
                const rol = roles.find((r) => r.id === u.rol)
                return (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: u.color }}
                        >
                          {u.iniciales}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{u.nombre}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{ color: rol.color, background: rol.bg }}
                      >
                        {u.rolLabel}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500">{rol.permisoResumen}</td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock size={11} /> {u.ultimoAcceso}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors">
                        Editar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* ── Tarjetas de roles ── */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Shield size={14} className="text-gray-400" /> Roles disponibles
          </p>
          <div className="grid grid-cols-4 gap-4">
            {roles.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border p-4 flex flex-col gap-2"
                style={{ borderColor: r.color + '44', background: r.bg }}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: r.color }}>
                  {r.label}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">{r.descripcion}</p>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full self-start mt-auto"
                  style={{ background: r.color + '18', color: r.color }}
                >
                  {r.permisoResumen}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Matriz de permisos ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-50">
            <p className="text-sm font-semibold text-gray-700">Matriz de permisos por módulo</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-5 py-3 w-56">
                    Módulo
                  </th>
                  {roles.map((r) => (
                    <th key={r.id} className="px-4 py-3 text-center">
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                        style={{ color: r.color, background: r.bg }}
                      >
                        {r.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {modulos.map((m) => (
                  <tr key={m.label} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-2.5 text-xs font-medium text-gray-700">{m.label}</td>
                    {rolKeys.map((key) => (
                      <PermisoCell key={key} nivel={m[key]} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Leyenda */}
          <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50 flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <CheckCircle2 size={13} style={{ color: '#1D9E75' }} /> Acceso completo
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#185FA5' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#185FA5' }} />
              </div>
              Acceso parcial (solo su equipo o vista limitada)
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <MinusCircle size={13} className="text-gray-300" /> Sin acceso
            </span>
          </div>
        </div>
      </div>

      {/* Modal invitar */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[460px] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Invitar usuario</h3>
                <p className="text-xs text-gray-400 mt-0.5">El usuario recibirá una invitación por correo.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-300 hover:text-gray-500">
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Nombre completo',  placeholder: 'Ej: María Pérez' },
                { label: 'Correo electrónico', placeholder: 'Ej: m.perez@empresa.cl' },
                { label: 'Cargo',            placeholder: 'Ej: Jefatura Turno B' },
              ].map(({ label, placeholder }) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">{label}</label>
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 placeholder-gray-300"
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Rol</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 text-gray-700">
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.label} — {r.permisoResumen}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600">
                Cancelar
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity"
                style={{ background: '#185FA5' }}
              >
                Enviar invitación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
