import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Configuracion from './pages/Configuracion'
import Asistencia from './pages/Asistencia'
import Finanzas from './pages/Finanzas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Layout Padre */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="asistencia" element={<Asistencia />} />
          <Route path="finanzas" element={<Finanzas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
