import { useState } from 'react'
import { Bell, Mail, MessageSquare, ToggleLeft, ToggleRight, Info, ChevronDown, ExternalLink } from 'lucide-react'

/* ── Sub-components ── */
function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle} className="shrink-0">
      {on
        ? <ToggleRight size={28} style={{ color: '#185FA5' }} />
        : <ToggleLeft size={28} className="text-gray-300" />}
    </button>
  )
}

function SelectorAlertas({ value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:border-gray-400 text-gray-700 bg-white cursor-pointer"
      >
        <option value="urgentes">Solo alertas urgentes</option>
        <option value="todas">Todas las alertas</option>
        <option value="resumen">Resumen diario</option>
      </select>
      <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  )
}

/* ── Email preview ── */
function EmailPreview() {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      {/* Email chrome */}
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-[11px] text-gray-400 ml-2">Vista previa del email</span>
      </div>

      <div className="bg-white p-5">
        {/* Header email */}
        <div className="flex flex-col gap-1 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: '#185FA5' }}>
                SY
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Sygnaly · Alertas</p>
                <p className="text-[11px] text-gray-400">no-reply@sygnaly.com</p>
              </div>
            </div>
            <span className="text-[11px] text-gray-400">Hoy, 09:43</span>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">Para: <span className="font-medium text-gray-700">c.munoz@empresa.cl</span></p>
            <p className="text-xs font-semibold text-gray-900 mt-1">
              📌 Sygnaly · Alerta urgente: Jorge Ramírez
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-700">Hola Carolina,</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Se detectó una alerta urgente que requiere atención antes de la reunión de mañana.
          </p>

          {/* Alert card in email */}
          <div className="rounded-lg border-l-4 px-4 py-3" style={{ borderColor: '#E24B4A', background: '#FEF2F2' }}>
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#E24B4A' }}>Alerta urgente</p>
            <p className="text-sm font-semibold text-gray-900">Reunión tripartita sin preparación</p>
            <p className="text-xs text-gray-600 mt-1">
              Jorge Ramírez · Planta Norte · Rodrigo Soto debe reunirse mañana sin coaching previo.
            </p>
          </div>

          <button
            className="self-start flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg text-white"
            style={{ background: '#185FA5' }}
          >
            Ver orientación en Sygnaly <ExternalLink size={11} />
          </button>

          <p className="text-[11px] text-gray-400 mt-2 pt-2 border-t border-gray-100">
            Este mensaje fue generado automáticamente por Sygnaly. Para desactivar las notificaciones, accede a Configuración → Notificaciones.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── WhatsApp preview ── */
function WhatsAppPreview() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      {/* WA chrome */}
      <div className="px-4 py-2.5 flex items-center gap-3" style={{ background: '#075E54' }}>
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <MessageSquare size={13} color="white" />
        </div>
        <div>
          <p className="text-white text-xs font-semibold">Sygnaly Alertas</p>
          <p className="text-white/60 text-[10px]">Vista previa del mensaje</p>
        </div>
      </div>

      {/* Chat background */}
      <div className="p-4" style={{ background: '#ECE5DD' }}>
        {/* Bubble */}
        <div className="max-w-[85%] bg-white rounded-xl rounded-tl-sm px-4 py-3 shadow-sm">
          <p className="text-[11px] font-bold mb-1" style={{ color: '#075E54' }}>Sygnaly · Alerta urgente</p>
          <p className="text-sm text-gray-800 leading-relaxed">
            📌 <strong>Jorge Ramírez</strong> tiene una reunión tripartita mañana a las 10:00. Rodrigo Soto aún no ha recibido coaching previo.
          </p>
          <p className="text-sm text-gray-800 mt-1.5">
            Revisa las orientaciones antes de la reunión.
          </p>
          <p className="text-sm mt-2 font-medium" style={{ color: '#185FA5' }}>
            → Ver en Sygnaly [link]
          </p>
          <p className="text-[10px] text-gray-400 text-right mt-1.5">09:43 ✓✓</p>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════ */
export default function Notificaciones() {
  const [emailOn,    setEmailOn]    = useState(true)
  const [waOn,       setWaOn]       = useState(false)
  const [emailAddr,  setEmailAddr]  = useState('c.munoz@empresa.cl')
  const [waPhone,    setWaPhone]    = useState('+56 9 8765 4321')
  const [emailTipo,  setEmailTipo]  = useState('urgentes')
  const [waTipo,     setWaTipo]     = useState('urgentes')

  return (
    <div className="p-6 max-w-[900px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Configura cómo y cuándo Sygnaly te avisa sobre alertas activas
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* ── Email ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#EFF6FF' }}>
                <Mail size={16} style={{ color: '#185FA5' }} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Email</p>
                <p className="text-xs text-gray-400">Notificaciones por correo electrónico</p>
              </div>
            </div>
            <Toggle on={emailOn} onToggle={() => setEmailOn((v) => !v)} />
          </div>

          <div className={`px-5 py-5 flex flex-col gap-5 transition-opacity ${emailOn ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Correo del responsable RRHH</label>
                <input
                  type="email"
                  value={emailAddr}
                  onChange={(e) => setEmailAddr(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 text-gray-700"
                  placeholder="nombre@empresa.cl"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Qué alertas notificar</label>
                <SelectorAlertas value={emailTipo} onChange={setEmailTipo} />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Vista previa del email</p>
              <EmailPreview />
            </div>
          </div>
        </div>

        {/* ── WhatsApp ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#ECFDF5' }}>
                <MessageSquare size={16} style={{ color: '#1D9E75' }} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">WhatsApp</p>
                <p className="text-xs text-gray-400">Mensajes directos al teléfono del responsable</p>
              </div>
            </div>
            <Toggle on={waOn} onToggle={() => setWaOn((v) => !v)} />
          </div>

          <div className={`px-5 py-5 flex flex-col gap-5 transition-opacity ${waOn ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Número con código de país</label>
                <input
                  type="tel"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 text-gray-700"
                  placeholder="+56 9 XXXX XXXX"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Qué alertas notificar</label>
                <SelectorAlertas value={waTipo} onChange={setWaTipo} />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Vista previa del mensaje WhatsApp</p>
              <WhatsAppPreview />
            </div>
          </div>
        </div>

        {/* ── Nota activación ── */}
        <div
          className="rounded-xl px-5 py-4 flex items-start gap-3"
          style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
        >
          <Bell size={15} style={{ color: '#D97706' }} className="shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold" style={{ color: '#92400E' }}>
              Las notificaciones en tiempo real requieren configuración adicional.
            </p>
            <p className="text-xs mt-1" style={{ color: '#92400E' }}>
              Contacta al equipo Sygnaly para activarlas en tu cuenta. Las vistas previas muestran el formato exacto que recibirás cuando estén activas.
            </p>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            className="px-5 py-2 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ background: '#185FA5' }}
          >
            Guardar configuración
          </button>
        </div>
      </div>
    </div>
  )
}
