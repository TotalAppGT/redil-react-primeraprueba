import React, { useState } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import ChatBubble from '../components/ChatBubble'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  // Cierra el sidebar al hacer click en un link en móviles
  const handleMobileNavClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="app-shell">
      {/* SIDEBAR PROFESIONAL */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sb-head">
          <div className="sb-brand">
            <div className="sb-logo-wrap">
              <i className="fas fa-church"></i>
            </div>
            <div>
              <div className="sb-title">Redil SaaS</div>
              <div className="sb-sub">v6.0 Pro</div>
            </div>
          </div>
          <button className="sb-close" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="sb-user">
          <div className="sb-avatar"><i className="fas fa-user-circle"></i></div>
          <div className="sb-uinfo">
            <span>Administrador</span>
            <small>Rol: Súper Admin</small>
          </div>
        </div>

        <div className="sb-nav">
          <div className="nl">Principal</div>
          
          <NavLink to="/dashboard" end onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-chart-pie"></i> Panel Central
          </NavLink>
          
          <NavLink to="/dashboard/seguimientos" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-hands-helping"></i> Seguimientos
          </NavLink>

          <NavLink to="/dashboard/asistencia" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-folder-open"></i> Asistencia / Grupos
          </NavLink>

          <NavLink to="/dashboard/hermanos" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-user-tie"></i> Hermanos Líderes
          </NavLink>

          <NavLink to="/dashboard/finanzas" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-wallet"></i> Control Diezmos
          </NavLink>
          
          <div className="nl">Módulos Pro</div>
          
          <div className="ni"><i className="fas fa-file-pdf"></i> Reportes PDF</div>
          
          <div className="nl">Sistema</div>
          
          <NavLink to="/dashboard/usuarios" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-users-cog"></i> Control de Usuarios
          </NavLink>
          
          <NavLink to="/dashboard/configuracion" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-cog"></i> Configuración SaaS
          </NavLink>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
        </button>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className="main">
        <div className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="tb-title">Sistema de Gestión Iglesia</div>
          <div className="tb-right">
            <button className="tb-btn" title="Notificaciones"><i className="fas fa-bell"></i></button>
          </div>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* Burbuja Flotante de IA GLOBAL */}
      <ChatBubble />
    </div>
  )
}
