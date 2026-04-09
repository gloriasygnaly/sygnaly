import { useState } from 'react'
import { Info, Plus, MapPin, Clock, ChevronRight, X } from 'lucide-react'

/* ── Data ── */
const proveedoresIniciales = [
  {
    id: 'p1',
    nombre: 'Vincular Consulting',
    iniciales: 'VC',
    color: '#185FA5',
    especialidades: ['Comunicación en situaciones críticas', 'Gestión de conflictos', 'Coaching ejecutivo'],
    modalidad: 'Presencial y online',
    disponibilidad: 'Inmediata',
    disponibilidadColor: '#1D9E75',
    disponibilidadBg: '#ECFDF5',
    contacto: 'contacto@vincular.cl',
    tipo: 'Consultoría',
  },
  {
    id: 'p2',
    nombre: 'Forma Laboral',
    iniciales: 'FL',
    color: '#1D9E75',
    especialidades: ['Ley Karin', 'Derechos fundamentales', 'Normativa laboral'],
    modalidad: 'Presencial RM y V región',
    disponibilidad: '1 semana',
    disponibilidadColor: '#185FA5',
    disponibilidadBg: '#EFF6FF',
    contacto: 'capacitacion@formalaboral.cl',
    tipo: 'Relator legal',
  },
  {
    id: 'p3',
    nombre: 'Enlace RH',
    iniciales: 'ER',
    color: '#534AB7',
    especialidades: ['Re-enganche y motivación', 'Liderazgo situacional', 'Clima laboral'],
    modalidad: 'Online',
    disponibilidad: '2 semanas',
    disponibilidadColor: '#EF9F27',
    disponibilidadBg: '#FFFBEB',
    contacto: 'info@enlacerh.cl',
    tipo: 'RRHH & Clima',
  },
]

const chipColors = [
  { bg: '#EFF6FF', color: '#185FA5' },
  { bg: '#ECFDF5', color: '#1D9E75' },
  { bg: '#F0EFFE', color: '#534AB7' },
  { bg: '#FFFBEB', color: '#D97706' },
  { bg: '#FEF2F2', color: '#E24B4A' },
]

/* ════════════════════════════════════════════════════════════════ */
export default function Proveedores() {
  const [proveedores, setProveedores] = useState(proveedoresIniciales)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ nombre: '', especialidades: '', modalidad: '', disponibilidad: '' })

  function handleAgregar() {
    if (!form.nombre.trim()) return
    const esp = form.especialidades.split(',').map((s) => s.trim()).filter(Boolean)
    setProveedores((prev) => [
      ...prev,
      {
        id: `p${Date.now()}`,
        nombre: form.nombre,
        iniciales: form.nombre.slice(0, 2).toUpperCase(),
        color: '#6B7280',
        especialidades: esp.length ? esp : ['Sin especialidades'],
        modalidad: form.modalidad || '—',
        disponibilidad: form.disponibilidad || '—',
        disponibilidadColor: '#6B7280',
        disponibilidadBg: '#F3F4F6',
        contacto: '',
        tipo: 'Proveedor',
      },
    ])
    setForm({ nombre: '', especialidades: '', modalidad: '', disponibilidad: '' })
    setModalOpen(false)
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proveedores</h1>
          <p className="text-gray-500 text-sm mt-0.5">Catálogo de proveedores de capacitación de tu empresa</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white hover:opacity-90 transition-opacity"
          style={{ background: '#185FA5' }}
        >
          <Plus size={15} /> Agregar proveedor
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {/* Banner */}
        <div
          className="rounded-xl px-5 py-4 flex items-start gap-4"
          style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2D1F6E 100%)' }}
        >
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
            <Info size={17} color="white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Este catálogo lo arma tu empresa</p>
            <p className="text-white/70 text-xs mt-1 leading-relaxed">
              Aquí van los proveedores de capacitación con los que ya trabajas o que tu equipo ha evaluado.
              Sygnaly no tiene proveedores preinstalados — los que aparecen son ejemplos para que veas cómo se ve el catálogo.
              Puedes agregar, editar o eliminar según los proveedores de tu confianza.
            </p>
          </div>
        </div>

        {/* Grid de proveedores */}
        <div className="grid grid-cols-3 gap-4">
          {proveedores.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md hover:border-gray-200 transition-all"
            >
              {/* Cabecera */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: p.color }}
                >
                  {p.iniciales}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-tight">{p.nombre}</p>
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full mt-0.5 inline-block"
                    style={{ background: '#F3F4F6', color: '#6B7280' }}
                  >
                    {p.tipo}
                  </span>
                </div>
              </div>

              {/* Especialidades */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Especialidades</p>
                <div className="flex flex-wrap gap-1">
                  {p.especialidades.map((e, i) => (
                    <span
                      key={e}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                      style={chipColors[i % chipColors.length]}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modalidad y disponibilidad */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={12} className="text-gray-300 shrink-0" />
                  {p.modalidad}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock size={12} className="text-gray-300 shrink-0" />
                  <span>Disponibilidad:&nbsp;</span>
                  <span
                    className="font-semibold px-1.5 py-0.5 rounded-full text-[11px]"
                    style={{ color: p.disponibilidadColor, background: p.disponibilidadBg }}
                  >
                    {p.disponibilidad}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                {p.contacto
                  ? <span className="text-[11px] text-gray-400 truncate">{p.contacto}</span>
                  : <span className="text-[11px] text-gray-300">Sin contacto registrado</span>
                }
                <button className="text-xs font-semibold flex items-center gap-1 shrink-0 ml-2" style={{ color: '#185FA5' }}>
                  Ver perfil <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}

          {/* Tarjeta vacía */}
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center gap-3 hover:border-gray-300 hover:bg-gray-100 transition-all min-h-[240px]"
          >
            <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
              <Plus size={20} className="text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-500">Agregar proveedor</p>
              <p className="text-xs text-gray-400 mt-0.5">Suma a tu catálogo</p>
            </div>
          </button>
        </div>

        {/* Nota */}
        <div
          className="rounded-xl px-5 py-3 flex items-center gap-3"
          style={{ background: '#F0EFFE', border: '1px solid #DDD6FE' }}
        >
          <Info size={15} style={{ color: '#534AB7' }} className="shrink-0" />
          <p className="text-sm font-medium" style={{ color: '#4338CA' }}>
            Este catálogo es de tu empresa. Agrega los proveedores de tu confianza.
          </p>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-[480px] max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Agregar proveedor</h3>
                <p className="text-xs text-gray-400 mt-0.5">Completa los datos para sumarlo al catálogo.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-300 hover:text-gray-500">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { key: 'nombre',          label: 'Nombre del proveedor',             placeholder: 'Ej: Capacita Pro' },
                { key: 'especialidades',  label: 'Especialidades (separadas por ,)', placeholder: 'Ej: Ley Karin, liderazgo, clima' },
                { key: 'modalidad',       label: 'Modalidad',                         placeholder: 'Ej: Online, Presencial RM, Mixta' },
                { key: 'disponibilidad',  label: 'Disponibilidad',                    placeholder: 'Ej: Inmediata, 2 semanas' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">{label}</label>
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 placeholder-gray-300"
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleAgregar}
                className="px-5 py-2 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity"
                style={{ background: '#185FA5' }}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
