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
import NormativaLegal from './pages/NormativaLegal'
import NormativaInterna from './pages/NormativaInterna'
import Capacitacion from './pages/Capacitacion'
import Proveedores from './pages/Proveedores'
import FuentesDatos from './pages/FuentesDatos'
import UsuariosRoles from './pages/UsuariosRoles'
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
          <Route path="/repositorio/normativa-legal"   element={<NormativaLegal />} />
          <Route path="/repositorio/normativa-interna" element={<NormativaInterna />} />

          {/* Cumplimiento */}
          <Route path="/cumplimiento/checklist" element={<ChecklistColaboradores />} />
          <Route path="/cumplimiento/radar"     element={<RadarLegal />} />

          {/* Capacitación */}
          <Route path="/capacitacion/necesidades" element={<Capacitacion />} />
          <Route path="/capacitacion/proveedores" element={<Proveedores />} />

          {/* Configuración */}
          <Route path="/configuracion/fuentes"  element={<FuentesDatos />} />
          <Route path="/configuracion/usuarios" element={<UsuariosRoles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
