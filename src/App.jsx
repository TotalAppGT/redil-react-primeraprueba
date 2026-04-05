import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BrandingProvider } from './context/BrandingContext'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Configuracion from './pages/Configuracion'
import Asistencia from './pages/Asistencia'
import Finanzas from './pages/Finanzas'
import Hermanos from './pages/Hermanos'
import Seguimientos from './pages/Seguimientos'
import Usuarios from './pages/Usuarios'
import Inventario from './pages/Inventario'
import Insumos from './pages/Insumos'
import Privilegios from './pages/Privilegios'
import Generador from './pages/Generador'
import Bitacora from './pages/Bitacora'
import Envio from './pages/Envio'
import Contactos from './pages/Contactos'
import ReporteDigital from './pages/ReporteDigital'
import Cronograma from './pages/Cronograma'
import CargaMasiva from './pages/CargaMasiva'

function App() {
  return (
    <BrandingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Layout Padre */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="configuracion" element={<Configuracion />} />
            <Route path="asistencia" element={<Asistencia />} />
            <Route path="finanzas" element={<Finanzas />} />
            <Route path="hermanos" element={<Hermanos />} />
            <Route path="seguimientos" element={<Seguimientos />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="inventario" element={<Inventario />} />
            <Route path="insumos" element={<Insumos />} />
            <Route path="privilegios" element={<Privilegios />} />
            <Route path="generador" element={<Generador />} />
            <Route path="bitacora" element={<Bitacora />} />
            <Route path="envio" element={<Envio />} />
            <Route path="contactos" element={<Contactos />} />
            <Route path="reporte-digital" element={<ReporteDigital />} />
            <Route path="cronograma" element={<Cronograma />} />
            <Route path="carga-masiva" element={<CargaMasiva />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BrandingProvider>
  )
}

export default App
