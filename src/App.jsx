import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Configuracion from './pages/Configuracion'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Layout Padre */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Las ramas hijas que inyecta el <Outlet /> */}
          <Route index element={<Home />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
