export default function Placeholder({ title }) {
  return (
    <div className="p-6 flex items-center justify-center min-h-full">
      <div className="text-center">
        <p className="text-4xl mb-3">🚧</p>
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        <p className="text-gray-400 text-sm mt-1">Esta sección está en construcción.</p>
      </div>
    </div>
  )
}
