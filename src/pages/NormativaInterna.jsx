import { useState } from 'react'
import { FileText, Upload, Plus, CheckCircle2, AlertTriangle, Users, Calendar, X, Info } from 'lucide-react'

/* ── Data ── */
const documentosIniciales = [
  {
    id: 'ri',
    titulo: 'Reglamento Interno',
    version: 'v3.1',
    estado: 'desactualizado',
    estadoLabel: 'Desactualizado',
    estadoDetalle: 'Requiere actualización post Ley Karin 21.643',
    color: '#D97706',
    bg: '#FFFBEB',
    borderColor: '#FDE68A',
    firmasTotales: 247,
    firmasOk: 231,
    ultimaActualizacion: 'Enero 2024',
    categoria: 'Reglamento',
    puedeActualizar: true,
  },
  {
    id: 'lk',
    titulo: 'Protocolo Ley Karin',
    version: 'v1.0',
    estado: 'vigente',
    estadoLabel: 'Vigente',
    estadoDetalle: 'Protocolo de prevención de acoso y violencia laboral',
    color: '#1D9E75',
    bg: '#ECFDF5',
    borderColor: '#A7F3D0',
    firmasTotales: 284,
    firmasOk: 284,
    ultimaActualizacion: 'Agosto 2024',
    categoria: 'Protocolo',
    puedeActualizar: false,
  },
]

function PctFirmas({ ok, total }) {
  const pct = Math.round((ok / total) * 100)
  const color = pct === 100 ? '#1D9E75' : pct >= 90 ? '#185FA5' : '#D97706'
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500 flex items-center gap-1.5">
          <Users size={11} /> {ok} de {total} firmas
        </span>
        <span className="font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════ */
export default function NormativaInterna() {
  const [documentos, setDocumentos] = useState(documentosIniciales)
  const [modalAgregar, setModalAgregar] = useState(false)
  const [modalSubir, setModalSubir] = useState(null) // id del doc
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ titulo: '', version: '', categoria: '', descripcion: '' })

  function handleSubir() {
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      setModalSubir(null)
      // Update the doc to "vigente" after upload
      setDocumentos((prev) =>
        prev.map((d) =>
          d.id === modalSubir
            ? { ...d, version: 'v4.0', estado: 'vigente', estadoLabel: 'Vigente', estadoDetalle: 'Actualizado con protocolo Ley Karin 21.643', color: '#1D9E75', bg: '#ECFDF5', borderColor: '#A7F3D0', ultimaActualizacion: 'Abril 2026', puedeActualizar: false }
            : d
        )
      )
    }, 1800)
  }

  function handleAgregar() {
    if (!form.titulo.trim()) return
    setDocumentos((prev) => [
      ...prev,
      {
        id: `doc-${Date.now()}`,
        titulo: form.titulo,
        version: form.version || 'v1.0',
        estado: 'vigente',
        estadoLabel: 'Vigente',
        estadoDetalle: form.descripcion || 'Normativa interna',
        color: '#185FA5',
        bg: '#EFF6FF',
        borderColor: '#BFDBFE',
        firmasTotales: 0,
        firmasOk: 0,
        ultimaActualizacion: 'Abril 2026',
        categoria: form.categoria || 'Documento',
        puedeActualizar: true,
      },
    ])
    setForm({ titulo: '', version: '', categoria: '', descripcion: '' })
    setModalAgregar(false)
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Normativa interna</h1>
          <p className="text-gray-500 text-sm mt-0.5">Reglamentos y protocolos internos · estado de firma por colaborador</p>
        </div>
        <button
          onClick={() => setModalAgregar(true)}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white hover:opacity-90 transition-opacity"
          style={{ background: '#185FA5' }}
        >
          <Plus size={14} /> Agregar normativa interna
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Documentos */}
        {documentos.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border-2 overflow-hidden shadow-sm"
            style={{ borderColor: doc.borderColor }}
          >
            {/* Top bar */}
            <div className="px-5 py-2.5 flex items-center gap-3" style={{ background: doc.bg }}>
              <FileText size={14} style={{ color: doc.color }} />
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: doc.color }}>
                {doc.categoria}
              </span>
              <span className="text-[11px] text-gray-400 ml-auto flex items-center gap-1">
                <Calendar size={10} /> Última actualización: {doc.ultimaActualizacion}
              </span>
            </div>

            <div className="px-5 py-4 flex items-start gap-6">
              {/* Info */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-gray-900">{doc.titulo}</p>
                      <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {doc.version}
                      </span>
                      <span
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1"
                        style={{ color: doc.color, background: doc.bg }}
                      >
                        {doc.estado === 'vigente'
                          ? <CheckCircle2 size={11} />
                          : <AlertTriangle size={11} />}
                        {doc.estadoLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{doc.estadoDetalle}</p>
                  </div>
                </div>

                {/* Firmas */}
                {doc.firmasTotales > 0 && (
                  <div className="max-w-xs">
                    <PctFirmas ok={doc.firmasOk} total={doc.firmasTotales} />
                    {doc.firmasOk < doc.firmasTotales && (
                      <p className="text-[11px] text-gray-400 mt-1">
                        {doc.firmasTotales - doc.firmasOk} colaborador{doc.firmasTotales - doc.firmasOk !== 1 ? 'es' : ''} pendiente{doc.firmasTotales - doc.firmasOk !== 1 ? 's' : ''} de firmar
                      </p>
                    )}
                  </div>
                )}

                {doc.estado === 'desactualizado' && (
                  <div
                    className="flex items-start gap-2 rounded-lg px-3 py-2"
                    style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
                  >
                    <AlertTriangle size={13} style={{ color: '#D97706' }} className="shrink-0 mt-0.5" />
                    <p className="text-xs font-medium" style={{ color: '#92400E' }}>
                      Este documento requiere actualización para cumplir con la Ley Karin 21.643 (vigente desde agosto 2024).
                      La DT puede multar si el Reglamento Interno no incluye el protocolo obligatorio.
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                {doc.puedeActualizar && (
                  <button
                    onClick={() => setModalSubir(doc.id)}
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border-2 transition-colors hover:bg-amber-50"
                    style={{ borderColor: '#FDE68A', color: '#D97706' }}
                  >
                    <Upload size={14} /> Subir versión actualizada
                  </button>
                )}
                <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                  <FileText size={14} /> Ver documento
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add card */}
        <button
          onClick={() => setModalAgregar(true)}
          className="rounded-xl border-2 border-dashed border-gray-200 p-6 flex items-center justify-center gap-3 hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
            <Plus size={18} className="text-gray-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-500">Agregar normativa interna</p>
            <p className="text-xs text-gray-400">Reglamentos, protocolos, políticas internas</p>
          </div>
        </button>

        {/* Nota */}
        <div className="rounded-lg px-4 py-2.5 flex items-start gap-2" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <Info size={14} style={{ color: '#185FA5' }} className="shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: '#1E40AF' }}>
            El porcentaje de firmas refleja los registros disponibles en el sistema. Para documentos físicos, la carga manual de firma está disponible desde la ficha del colaborador.
          </p>
        </div>
      </div>

      {/* Modal: Subir versión */}
      {modalSubir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => !uploading && setModalSubir(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[440px] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Subir versión actualizada</h3>
                <p className="text-xs text-gray-400 mt-0.5">La IA extraerá y estructurará el contenido automáticamente.</p>
              </div>
              {!uploading && (
                <button onClick={() => setModalSubir(null)} className="text-gray-300 hover:text-gray-500">
                  <X size={18} />
                </button>
              )}
            </div>
            <div
              className="rounded-xl border-2 border-dashed p-8 flex flex-col items-center gap-3 mb-4"
              style={{ borderColor: '#FDE68A', background: '#FFFBEB' }}
            >
              <Upload size={28} style={{ color: '#D97706' }} />
              <p className="text-sm font-medium text-gray-600">
                {uploading ? 'Procesando documento…' : 'Arrastra el archivo o haz clic para seleccionar'}
              </p>
              <p className="text-xs text-gray-400">.pdf · .docx · .txt</p>
            </div>
            <div className="flex justify-end gap-2">
              {!uploading && (
                <button onClick={() => setModalSubir(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600">
                  Cancelar
                </button>
              )}
              <button
                onClick={handleSubir}
                disabled={uploading}
                className="px-5 py-2 text-sm font-semibold text-white rounded-xl transition-opacity"
                style={{ background: uploading ? '#9CA3AF' : '#D97706', cursor: uploading ? 'wait' : 'pointer' }}
              >
                {uploading ? 'Procesando…' : 'Subir y actualizar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Agregar */}
      {modalAgregar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setModalAgregar(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[480px] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Agregar normativa interna</h3>
                <p className="text-xs text-gray-400 mt-0.5">El documento se sumará al catálogo interno.</p>
              </div>
              <button onClick={() => setModalAgregar(false)} className="text-gray-300 hover:text-gray-500">
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { key: 'titulo',      label: 'Nombre del documento',  placeholder: 'Ej: Política de teletrabajo' },
                { key: 'version',     label: 'Versión',               placeholder: 'Ej: v1.0' },
                { key: 'categoria',   label: 'Categoría',             placeholder: 'Ej: Política, Protocolo, Reglamento' },
                { key: 'descripcion', label: 'Descripción breve',     placeholder: 'Ej: Regula el trabajo remoto en la empresa' },
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
              <button onClick={() => setModalAgregar(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600">
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
