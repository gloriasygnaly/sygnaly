import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Colaboradores from './pages/Colaboradores'
import ColaboradorDetalle from './pages/ColaboradorDetalle'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/riesgos" element={<Placeholder title="Gestión de Riesgos" />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
          <Route path="/colaboradores/:id" element={<ColaboradorDetalle />} />
          <Route path="/formularios" element={<Placeholder title="Formularios" />} />
          <Route path="/reportes" element={<Placeholder title="Reportes" />} />
          <Route path="/comunicaciones" element={<Placeholder title="Comunicaciones" />} />
          <Route path="/configuracion" element={<Placeholder title="Configuración" />} />
          <Route path="/ayuda" element={<Placeholder title="Ayuda" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
