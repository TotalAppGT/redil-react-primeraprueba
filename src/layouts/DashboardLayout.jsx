import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useBranding } from '../context/BrandingContext'
import ChatBubble from '../components/ChatBubble'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const { branding } = useBranding()

  // Manejo de salida segura
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/', { replace: true })
    } catch (e) {
      console.error("Logout Error:", e);
      navigate('/', { replace: true });
    }
  }

  // Cerrar sidebar en tablets/celulares al navegar
  const handleNavClick = () => {
    if (window.innerWidth <= 768) setSidebarOpen(false);
  }

  return (
    <div className="app-shell" style={{ '--pr': branding?.colorPr || '#1a3a5c', '--ac': branding?.colorAc || '#e8a020' }}>
      
      {/* SIDEBAR PREMIUM */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sb-head">
          <div className="sb-brand">
            <div className="sb-logo-wrap" style={{ background: 'var(--ac)' }}>
              {branding?.logo ? (
                <img src={branding.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <i className="fas fa-church"></i>
              )}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="sb-title" style={{ fontSize: (branding?.nombre || '').length > 18 ? '11px' : '13px', fontWeight: '900' }}>
                 {branding?.nombre || 'REDIL Cloud'}
              </div>
              <div className="sb-sub">{branding?.sistemaActivo ? '✓ Sistema Activo' : '✕ Mantenimiento'}</div>
            </div>
          </div>
          <button className="sb-close" onClick={() => setSidebarOpen(false)} title="Cerrar Menú">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="sb-user">
          <div className="sb-avatar"><i className="fas fa-user-circle"></i></div>
          <div className="sb-uinfo">
            <span>Administrador Central</span>
            <small>ID: #7425s-PRO</small>
          </div>
        </div>

        <nav className="sb-nav">
          <div className="nl">CONTROL PRINCIPAL</div>
          <NavLink to="/dashboard" end onClick={handleNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-tachometer-alt"></i> Panel General
          </NavLink>
          <NavLink to="/dashboard/generador" onClick={handleNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-file-pdf"></i> Generador Reportes
          </NavLink>
          
          <div className="nl">GESTIÓN SEMANAL</div>
          <NavLink to="/dashboard/reporte-digital" onClick={handleNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-mobile-alt"></i> Reporte Célula
          </NavLink>
          <NavLink to="/dashboard/asistencia" onClick={handleNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-file-signature"></i> Control Asistencia
          </NavLink>
          <NavLink to="/dashboard/cronograma" onClick={handleNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-calendar-check"></i> Cronograma
          </NavLink>

          <div className="nl">LIDERAZGO & DATA</div>
          <NavLink to="/dashboard/hermanos" onClick={handleNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-user-tie"></i> Hermanos Líderes
          </NavLink>
          <NavLink to="/dashboard/finanzas" onClick={handleNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-wallet"></i> Control Diezmos
          </NavLink>
          <NavLink to="/dashboard/configuracion" onClick={handleNavClick} className={({isActive}) => isActive ? "ni active" : "ni"}>
            <i className="fas fa-cog"></i> Configuración SaaS
          </NavLink>
        </nav>

        <button className="btn-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> FINALIZAR SESIÓN
        </button>
      </aside>

      {/* ÁREA PRINCIPAL V6.2+ */}
      <main className="main" style={{ marginLeft: sidebarOpen ? 'var(--sbw)' : '0' }}>
        <header className="topbar" style={{ borderBottom: `2.5px solid var(--ac)` }}>
          <button className="menu-btn" style={{ display: 'block' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          
          <div className="tb-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--pr)' }}>
            <span style={{ fontSize: '9px', background: 'var(--ac)', color: '#fff', padding: '1px 5px', borderRadius: '3px', fontWeight: '900' }}>v6.2+ SaaS</span>
            <span style={{ fontWeight: '900' }}>{branding?.nombre || 'REDIL'}</span>
          </div>
          
          <div className="tb-right">
             <div style={{ display: 'flex', gap: '8px' }}>
                <button className="tb-btn" title="Notificaciones"><i className="fas fa-bell"></i></button>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg3)', border: '1px solid var(--brd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'var(--pr)' }}>
                   <i className="fas fa-user"></i>
                </div>
             </div>
          </div>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </main>

      {/* Burbuja IA Dinámica */}
      <ChatBubble />
    </div>
  )
}
