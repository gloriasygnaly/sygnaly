import {
  AlertTriangle,
  TrendingDown,
  Users,
  FileCheck,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  CircleDot,
} from 'lucide-react'

const kpis = [
  {
    label: 'Riesgos Activos',
    value: '12',
    delta: '+3 este mes',
    deltaUp: true,
    color: '#E24B4A',
    bg: '#FEF2F2',
    icon: AlertTriangle,
  },
  {
    label: 'Índice de Conflicto',
    value: '4.2%',
    delta: '−0.8% vs mes anterior',
    deltaUp: false,
    color: '#1D9E75',
    bg: '#ECFDF5',
    icon: TrendingDown,
  },
  {
    label: 'Colaboradores',
    value: '247',
    delta: '5 nuevos este mes',
    deltaUp: true,
    color: '#185FA5',
    bg: '#EFF6FF',
    icon: Users,
  },
  {
    label: 'Formularios Pendientes',
    value: '8',
    delta: '2 vencen esta semana',
    deltaUp: true,
    color: '#EF9F27',
    bg: '#FFFBEB',
    icon: FileCheck,
  },
]

const recentAlerts = [
  {
    id: 1,
    title: 'Posible infracción Ley Karin',
    area: 'Operaciones',
    date: 'Hace 2 horas',
    severity: 'Alta',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Descanso semanal no otorgado',
    area: 'Logística',
    date: 'Hace 5 horas',
    severity: 'Media',
    status: 'review',
  },
  {
    id: 3,
    title: 'Horas extra sin autorizar',
    area: 'Ventas',
    date: 'Ayer 16:30',
    severity: 'Baja',
    status: 'resolved',
  },
  {
    id: 4,
    title: 'Contrato a plazo fijo vencido',
    area: 'Administración',
    date: 'Ayer 09:12',
    severity: 'Alta',
    status: 'pending',
  },
  {
    id: 5,
    title: 'Falta de EPP documentada',
    area: 'Producción',
    date: '05 Apr',
    severity: 'Media',
    status: 'resolved',
  },
]

const riskByArea = [
  { area: 'Operaciones', risks: 4, pct: 80 },
  { area: 'Logística', risks: 3, pct: 60 },
  { area: 'Ventas', risks: 2, pct: 40 },
  { area: 'Administración', risks: 2, pct: 40 },
  { area: 'Producción', risks: 1, pct: 20 },
]

const severityColor = {
  Alta: { text: '#E24B4A', bg: '#FEF2F2' },
  Media: { text: '#EF9F27', bg: '#FFFBEB' },
  Baja: { text: '#1D9E75', bg: '#ECFDF5' },
}

const statusIcon = {
  pending: { icon: CircleDot, color: '#EF9F27', label: 'Pendiente' },
  review: { icon: Clock, color: '#185FA5', label: 'En revisión' },
  resolved: { icon: CheckCircle2, color: '#1D9E75', label: 'Resuelto' },
}

export default function Dashboard() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">Gestión preventiva del vínculo laboral · Abril 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, delta, deltaUp, color, bg, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-xs" style={{ color: deltaUp ? '#E24B4A' : '#1D9E75' }}>
              {delta}
            </p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Alerts table — 2 cols */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Alertas Recientes</h2>
            <button
              className="flex items-center gap-1 text-xs font-medium hover:underline"
              style={{ color: '#185FA5' }}
            >
              Ver todas <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentAlerts.map((alert) => {
              const sev = severityColor[alert.severity]
              const st = statusIcon[alert.status]
              const StatusIcon = st.icon
              return (
                <div key={alert.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{alert.title}</p>
                    <p className="text-xs text-gray-400">{alert.area} · {alert.date}</p>
                  </div>
                  <span
                    className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: sev.text, background: sev.bg }}
                  >
                    {alert.severity}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <StatusIcon size={14} style={{ color: st.color }} />
                    <span className="text-xs text-gray-500 hidden xl:inline">{st.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Risk by area — 1 col */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Riesgo por Área</h2>
          </div>
          <div className="px-5 py-4 flex flex-col gap-4">
            {riskByArea.map(({ area, risks, pct }) => (
              <div key={area}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">{area}</span>
                  <span className="text-sm font-semibold text-gray-900">{risks}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background: pct >= 70 ? '#E24B4A' : pct >= 50 ? '#EF9F27' : '#185FA5',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Cumplimiento normativo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 text-sm mb-4">Cumplimiento Normativo</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Ley Karin (21.643)', pct: 87 },
              { label: 'Código del Trabajo', pct: 94 },
              { label: 'Ley 16.744 (seguridad)', pct: 72 },
              { label: 'ODI Vigente', pct: 100 },
            ].map(({ label, pct }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">{label}</span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: pct >= 90 ? '#1D9E75' : pct >= 75 ? '#EF9F27' : '#E24B4A' }}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: pct >= 90 ? '#1D9E75' : pct >= 75 ? '#EF9F27' : '#E24B4A',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 text-sm mb-4">Actividad Reciente del Equipo</h2>
          <div className="flex flex-col gap-3">
            {[
              { user: 'María García', action: 'Cerró alerta #38 — Contrato vencido', time: 'Hace 30 min', avatar: 'MG', color: '#1D9E75' },
              { user: 'Pedro Soto', action: 'Subió formulario ODI actualizado', time: 'Hace 1 hora', avatar: 'PS', color: '#185FA5' },
              { user: 'Ana Torres', action: 'Creó alerta de riesgo en Logística', time: 'Hace 3 horas', avatar: 'AT', color: '#E24B4A' },
              { user: 'Luis Vera', action: 'Actualizó perfil de colaborador #124', time: 'Hace 4 horas', avatar: 'LV', color: '#534AB7' },
            ].map(({ user, action, time, avatar, color }) => (
              <div key={user} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5"
                  style={{ background: color }}
                >
                  {avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{user}</span>
                    {' '}· {action}
                  </p>
                  <p className="text-xs text-gray-400">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
