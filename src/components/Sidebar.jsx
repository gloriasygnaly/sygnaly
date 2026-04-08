import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileWarning,
  Users,
  ClipboardList,
  BarChart2,
  MessageSquare,
  Settings,
  HelpCircle,
} from 'lucide-react'
import sygnalyLogo from '../assets/logo Sygnaly sin fondo.png'

const navSections = [
  {
    label: 'Principal',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/riesgos', label: 'Riesgos', icon: FileWarning },
      { to: '/colaboradores', label: 'Colaboradores', icon: Users },
    ],
  },
  {
    label: 'Gestión',
    items: [
      { to: '/formularios', label: 'Formularios', icon: ClipboardList },
      { to: '/reportes', label: 'Reportes', icon: BarChart2 },
      { to: '/comunicaciones', label: 'Comunicaciones', icon: MessageSquare },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { to: '/configuracion', label: 'Configuración', icon: Settings },
      { to: '/ayuda', label: 'Ayuda', icon: HelpCircle },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside
      className="flex flex-col shrink-0 h-full overflow-y-auto"
      style={{ width: 224, background: '#0F3D6E' }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center px-5 pt-6 pb-5 border-b border-white/10">
        <img
          src={sygnalyLogo}
          alt="Sygnaly"
          style={{ width: 148, filter: 'invert(1)' }}
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-5">
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
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'text-white/65 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <Icon size={16} />
                    {label}
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
