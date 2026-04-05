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
              <div className="sb-sub">v6.1 Pro</div>
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
          <div className="nl" style={{ marginTop: '5px' }}>PRINCIPAL</div>
          <NavLink to="/dashboard" end onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-tachometer-alt"></i> Panel Central
          </NavLink>
          
          <div className="nl">REPORTES Y GESTIÓN</div>
          <NavLink to="/dashboard/asistencia" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-file-alt"></i> Reporte de Grupos
          </NavLink>
          <NavLink to="/dashboard/reporte-digital" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-mobile-alt"></i> Reporte Digital (Form)
          </NavLink>
          <NavLink to="/dashboard/generador" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-file-invoice"></i> Generador Reportes
          </NavLink>

          <div className="nl">ADMINISTRACIÓN</div>
          <NavLink to="/dashboard/hermanos" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-user-tie"></i> Hermanos Líderes
          </NavLink>
          <NavLink to="/dashboard/carga-masiva" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-file-upload"></i> Carga Masiva
          </NavLink>
          <NavLink to="/dashboard/seguimientos" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-hands-helping"></i> Seguimientos
          </NavLink>
          <NavLink to="/dashboard/privilegios" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-crown"></i> Privilegios
          </NavLink>
          <NavLink to="/dashboard/cronograma" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-calendar-alt"></i> Cronograma
          </NavLink>

          <div className="nl">FINANZAS Y RECURSOS</div>
          <NavLink to="/dashboard/finanzas" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-wallet"></i> Control Diezmos
          </NavLink>
          <NavLink to="/dashboard/inventario" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-boxes"></i> Inventario
          </NavLink>
          <NavLink to="/dashboard/insumos" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-spray-can"></i> Insumos
          </NavLink>

          <div className="nl">COMUNICACIONES</div>
          <NavLink to="/dashboard/envio" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-paper-plane"></i> Centro de Envíos
          </NavLink>
          <NavLink to="/dashboard/contactos" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-address-book"></i> Tabla de Contactos
          </NavLink>

          <div className="nl">SISTEMA</div>
          <NavLink to="/dashboard/usuarios" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-user-cog"></i> Usuarios
          </NavLink>
          <NavLink to="/dashboard/bitacora" onClick={handleMobileNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-clipboard-list"></i> Bitácora Accesos
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
          <div className="tb-title">SaaS de Gestión Eclesiástica v6.1</div>
          <div className="tb-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: 'var(--tx3)', background: 'var(--bg3)', padding: '4px 10px', borderRadius: '15px' }}>
               ID: #7425s-PRO
            </span>
            <button className="tb-btn"><i className="fas fa-bell"></i></button>
          </div>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>

      <ChatBubble />
    </div>
  )
}
