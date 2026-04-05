import React, { useState } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="app-shell">
      {/* SIDEBAR PROFESIONAL */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ transform: sidebarOpen ? 'none' : 'translateX(-100%)' }}>
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
        
        {/* Simulación del Pastor logueado */}
        <div className="sb-user">
          <div className="sb-avatar"><i className="fas fa-user-circle"></i></div>
          <div className="sb-uinfo">
            <span>Administrador</span>
            <small>Rol: Súper Admin</small>
          </div>
        </div>

        {/* NAVEGACIÓN con React Router */}
        <div className="sb-nav">
          <div className="nl">Principal</div>
          
          <NavLink to="/dashboard" end className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-chart-pie"></i> Panel Central
          </NavLink>
          
          <div className="ni"><i className="fas fa-tasks"></i> Seguimientos</div>
          <div className="ni"><i className="fas fa-folder-open"></i> Asistencia</div>
          
          <div className="nl">Módulos Pro</div>
          
          <div className="ni"><i className="fas fa-file-pdf"></i> Reportes PDF</div>
          <div className="ni"><i className="fas fa-robot"></i> Asistente de IA</div>
          
          <div className="nl">Sistema</div>
          
          <div className="ni"><i className="fas fa-users-cog"></i> Control de Usuarios</div>
          
          <NavLink to="/dashboard/configuracion" className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-cog"></i> Configuración SaaS
          </NavLink>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
        </button>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className="main" style={{ marginLeft: sidebarOpen ? 'var(--sbw)' : '0' }}>
        <div className="topbar">
          <button className="menu-btn" style={{ display: 'block' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="tb-title">Bienvenido a tu nueva red</div>
          <div className="tb-right">
            <button className="tb-btn" title="Notificaciones"><i className="fas fa-bell"></i></button>
            <button className="tb-btn" title="Soporte y Ayuda IA"><i className="fas fa-question-circle"></i></button>
          </div>
        </div>

        <div className="content">
          {/* El Outlet inyecta Componentes que coincidan con la ruta hija */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
