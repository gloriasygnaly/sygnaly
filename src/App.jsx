import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Colaboradores from './pages/Colaboradores'
import ColaboradorDetalle from './pages/ColaboradorDetalle'
import MapaSenales from './pages/MapaSenales'
import OrientacionPreventiva from './pages/OrientacionPreventiva'
import DocsColaborador from './pages/DocsColaborador'
import ChecklistColaboradores from './pages/ChecklistColaboradores'
import RadarLegal from './pages/RadarLegal'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Principal */}
          <Route path="/"            element={<Dashboard />} />
          <Route path="/alertas"     element={<Placeholder title="Alertas preventivas" />} />
          <Route path="/acciones"    element={<Placeholder title="Acciones remediales" />} />
          <Route path="/orientacion" element={<OrientacionPreventiva />} />

          {/* Colaboradores */}
          <Route path="/colaboradores"          element={<Colaboradores />} />
          <Route path="/colaboradores/mapa"     element={<MapaSenales />} />
          <Route path="/colaboradores/:id"      element={<ColaboradorDetalle />} />

          {/* Repositorio */}
          <Route path="/repositorio/docs"              element={<DocsColaborador />} />
          <Route path="/repositorio/normativa-legal"   element={<Placeholder title="Normativa legal" />} />
          <Route path="/repositorio/normativa-interna" element={<Placeholder title="Normativa interna" />} />

          {/* Cumplimiento */}
          <Route path="/cumplimiento/checklist" element={<ChecklistColaboradores />} />
          <Route path="/cumplimiento/radar"     element={<RadarLegal />} />

          {/* Capacitación */}
          <Route path="/capacitacion/necesidades" element={<Placeholder title="Necesidades detectadas" />} />
          <Route path="/capacitacion/proveedores" element={<Placeholder title="Proveedores" />} />

          {/* Configuración */}
          <Route path="/configuracion/fuentes"  element={<Placeholder title="Fuentes de datos" />} />
          <Route path="/configuracion/usuarios" element={<Placeholder title="Usuarios y roles" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
