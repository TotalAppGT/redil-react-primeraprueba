import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública: Pantalla de Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas Privadas: Protegidas por el App Shell del Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Outlet inyecta el Home por defecto cuando abrimos /dashboard */}
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
