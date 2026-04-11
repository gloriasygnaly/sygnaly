import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  AlertTriangle,
  ClipboardList,
  Lightbulb,
  User,
  Map,
  FileText,
  Scale,
  Building2,
  CheckSquare,
  ShieldAlert,
  Target,
  Briefcase,
  Database,
  UserCog,
  Bell,
} from 'lucide-react'
import sygnalyLogo from '../assets/logo-sygnaly-blanco2.png'

const navSections = [
  {
    label: 'Principal',
    items: [
      { to: '/',           label: 'Dashboard',             icon: LayoutDashboard },
      { to: '/alertas',    label: 'Alertas preventivas',   icon: AlertTriangle },
      { to: '/acciones',   label: 'Acciones remediales',   icon: ClipboardList },
      { to: '/orientacion',label: 'Orientación preventiva',icon: Lightbulb },
    ],
  },
  {
    label: 'Colaboradores',
    items: [
      { to: '/colaboradores',      label: 'Vista individual', icon: User },
      { to: '/colaboradores/mapa', label: 'Mapa de señales',  icon: Map },
    ],
  },
  {
    label: 'Repositorio',
    items: [
      { to: '/repositorio/docs',             label: 'Docs. del colaborador', icon: FileText },
      { to: '/repositorio/normativa-legal',  label: 'Normativa legal',       icon: Scale },
      { to: '/repositorio/normativa-interna',label: 'Normativa interna',     icon: Building2 },
    ],
  },
  {
    label: 'Cumplimiento',
    items: [
      { to: '/cumplimiento/checklist', label: 'Checklist colaboradores', icon: CheckSquare },
      { to: '/cumplimiento/radar',     label: 'Radar legal empresa',     icon: ShieldAlert },
    ],
  },
  {
    label: 'Capacitación',
    items: [
      { to: '/capacitacion/necesidades', label: 'Necesidades detectadas', icon: Target },
      { to: '/capacitacion/proveedores', label: 'Proveedores',            icon: Briefcase },
    ],
  },
  {
    label: 'Configuración',
    items: [
      { to: '/configuracion/fuentes',        label: 'Fuentes de datos',  icon: Database },
      { to: '/configuracion/usuarios',       label: 'Usuarios y roles',  icon: UserCog },
      { to: '/configuracion/notificaciones', label: 'Notificaciones',    icon: Bell },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside
      className="flex flex-col shrink-0 h-full overflow-y-auto"
      style={{ width: 224, background: '#0F2744' }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center px-5 pt-6 pb-5 border-b border-white/10">
        <img
          src={sygnalyLogo}
          alt="Sygnaly"
          style={{ width: 180 }}
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-4">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1 px-2">
              {section.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }`
                    }
                    style={({ isActive }) => isActive ? { background: '#185FA5' } : {}}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span className="truncate">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: '#534AB7' }}
          >
            CM
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">Carolina Muñoz</p>
            <p className="text-white/50 text-[11px] truncate">RRHH Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
