import React, { useState } from 'react'

export default function Asistencia() {
  const [activeTab, setActiveTab] = useState('todos')
  const [showQuickFilter, setShowQuickFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data para reportes
  const [reportes, setReportes] = useState([
    { id: '1', fecha: '2026-04-04', codigo: 'C001', lider: 'Juan Pérez', sector: 'Sector Alpha', anfitrion: 'Familia Ruiz', agf: 12, h: 5, am: 2, n: 3, total: 22, ofrenda: 150.00, estado: 'Validado' },
    { id: '2', fecha: '2026-04-03', codigo: 'C005', lider: 'María González', sector: 'Sector Beta', anfitrion: 'Hna. Ana', agf: 8, h: 4, am: 1, n: 0, total: 13, ofrenda: 0.00, estado: 'Pendiente' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-file-alt"></i> Reporte de Grupos</h2>
        <div className="mod-acts">
          <button className="btn btn-ok btn-sm"><i className="fas fa-plus"></i> Nuevo Registro</button>
          <button className="btn btn-pr btn-sm"><i className="fas fa-file-excel"></i> Excel</button>
          <button className="btn btn-err btn-sm"><i className="fas fa-file-pdf"></i> PDF</button>
          <button 
            className="btn btn-ac btn-sm" 
            onClick={() => setShowQuickFilter(!showQuickFilter)}
            style={{ background: 'linear-gradient(135deg,#7d3c98,#5b2c6f)' }}
          >
            <i className="fas fa-search-plus"></i> Asistencia Hoy
          </button>
        </div>
      </div>

      {/* PANEL FILTRO RÁPIDO (ASISTENCIA HOY) */}
      {showQuickFilter && (
        <div className="card" style={{ borderLeft: '5px solid #7d3c98', padding: '0', animation: 'slDown 0.3s ease' }}>
          <div style={{ background: 'linear-gradient(135deg,#7d3c98,#5b2c6f)', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span><i className="fas fa-search-plus"></i> <b>Filtro Rápido — ¿Quién ya entregó reporte?</b></span>
            <button style={{ color: '#fff' }} onClick={() => setShowQuickFilter(false)}><i className="fas fa-times"></i></button>
          </div>
          <div style={{ padding: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', background: 'var(--bg3)' }}>
            <div className="fgg" style={{ flex: 1, minWidth: '150px' }}>
              <label>🏛 Pastor de Zona</label>
              <select className="fc"><option>Todos</option></select>
            </div>
            <div className="fgg" style={{ flex: 1, minWidth: '150px' }}>
              <label>📋 Sup. Sector</label>
              <select className="fc"><option>Todos</option></select>
            </div>
            <button className="btn btn-pr" style={{ alignSelf: 'flex-end', height: '40px' }}>Consultar</button>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--tx3)' }}>
             <i className="fas fa-info-circle"></i> Selecciona filtros para ver quién falta por entregar.
          </div>
        </div>
      )}

      {/* CONTENEDOR PRINCIPAL TABLA */}
      <div className="card" style={{ padding: '0', marginTop: '15px' }}>
        
        {/* TABS */}
        <div style={{ display: 'flex', borderBottom: '2px solid var(--brd)' }}>
          <button 
            onClick={() => setActiveTab('todos')}
            style={{ 
              flex: 1, padding: '15px', border: 'none', background: activeTab === 'todos' ? '#fff' : 'var(--bg3)',
              fontWeight: '800', color: activeTab === 'todos' ? 'var(--pr)' : 'var(--tx3)',
              borderBottom: activeTab === 'todos' ? '3px solid var(--pr)' : 'none',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-list"></i> Todos los Reportes
          </button>
          <button 
            onClick={() => setActiveTab('pendientes')}
            style={{ 
              flex: 1, padding: '15px', border: 'none', background: activeTab === 'pendientes' ? '#fff' : 'var(--bg3)',
              fontWeight: '800', color: activeTab === 'pendientes' ? 'var(--err)' : 'var(--tx3)',
              borderBottom: activeTab === 'pendientes' ? '3px solid var(--err)' : 'none',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-exclamation-triangle"></i> Pendientes de Ofrenda
          </button>
        </div>

        {/* FILTROS DINÁMICOS */}
        <div style={{ padding: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap', borderBottom: '1px solid var(--brd)' }}>
          <div className="sb2" style={{ flex: 2, minWidth: '200px', display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '5px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar líder, código o anfitrión..." 
              className="fc" 
              style={{ border: 'none', background: 'none' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <input type="date" className="fc" style={{ flex: 1, minWidth: '130px' }} defaultValue="2026-04-01" />
          <input type="date" className="fc" style={{ flex: 1, minWidth: '130px' }} defaultValue="2026-04-30" />
          <button className="btn btn-pr">Filtrar</button>
        </div>

        {/* TABLA PRO */}
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Código</th>
                <th>Líder / Sector</th>
                <th>Anfitrión</th>
                <th>AGF</th>
                <th>Ofrenda</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map(r => (
                <tr key={r.id}>
                  <td>{r.fecha}</td>
                  <td><span className="stat-pill" style={{ background: 'var(--bg3)' }}>{r.codigo}</span></td>
                  <td>
                    <strong>{r.lider}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{r.sector}</div>
                  </td>
                  <td>{r.anfitrion}</td>
                  <td><strong>{r.agf}</strong></td>
                  <td><strong style={{ color: r.ofrenda > 0 ? 'var(--ok)' : 'var(--err)' }}>Q {r.ofrenda.toFixed(2)}</strong></td>
                  <td>
                    <span className={`stat-pill ${r.estado === 'Validado' ? 'pill-ok' : 'pill-err'}`}>
                      {r.estado}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button className="tb-btn" title="Ver Detalles"><i className="fas fa-eye"></i></button>
                      <button className="tb-btn" title="Editar"><i className="fas fa-edit"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
