import React, { useState } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useBranding } from '../context/BrandingContext'
import ChatBubble from '../components/ChatBubble'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const { branding } = useBranding()

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
    <div className="app-shell" style={{ '--pr': branding.colorPr, '--ac': branding.colorAc }}>
      {/* SIDEBAR V6.2 PRO */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sb-head">
          <div className="sb-brand">
            <div className="sb-logo-wrap" style={{ background: 'var(--ac)' }}>
              {branding?.logo ? <img src={branding.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fas fa-church"></i>}
            </div>
            <div>
              <div className="sb-title" style={{ fontSize: (branding?.nombre || '').length > 20 ? '11px' : '13px', fontWeight: '900' }}>{branding?.nombre || 'Redil SaaS'}</div>
              <div className="sb-sub">{branding?.sistemaActivo ? '✓ Sistema Activo' : '✕ Mantenimiento'}</div>
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
            <small>ID: #7425s-PRO</small>
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

      {/* ÁREA PRINCIPAL V6.2 */}
      <div className="main">
        <div className="topbar" style={{ borderBottom: `3px solid var(--ac)` }}>
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="tb-title" style={{ fontWeight: '900', color: 'var(--pr)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', background: 'var(--ac)', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>v6.2 PRO</span>
            {branding?.nombre || 'Cargando...'}
          </div>
          <div className="tb-right">
            <button className="tb-btn" title="Notificaciones"><i className="fas fa-bell"></i></button>
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
