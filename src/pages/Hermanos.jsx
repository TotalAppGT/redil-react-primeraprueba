import React, { useState } from 'react'

export default function Hermanos() {
  const [searchTerm, setSearchTerm] = useState('')

  // Datos profesionales para la transición
  const [hermanos, setHermanos] = useState([
    { id: '101', nombre: 'Juan Pérez', telefono: '5544-3322', area: 'Central', zona: 'Norte', sector: 'A', distrito: '1', privilegio: 'Pastor' },
    { id: '102', nombre: 'María González', telefono: '4433-2211', area: 'Sede Sur', zona: 'Oeste', sector: 'B', distrito: '3', privilegio: 'Líder' },
    { id: '103', nombre: 'Carlos Ruiz', telefono: '3322-1100', area: 'Enmanuel', zona: 'Sur', sector: 'C', distrito: '2', privilegio: 'Supervisor' },
    { id: '104', nombre: 'Sara Martha', telefono: '2211-0099', area: 'Central', zona: 'Este', sector: 'A', distrito: '4', privilegio: 'Líder' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-user-tie"></i> Hermanos Líderes</h2>
        <div className="mod-acts">
           <button className="btn btn-ok btn-sm"><i className="fas fa-user-plus"></i> Registrar Nuevo Líder</button>
           <button className="btn btn-pr btn-sm"><i className="fas fa-file-excel"></i> Exportar Líderes</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', display: 'flex', gap: '12px', borderBottom: '1px solid var(--brd)', background: 'var(--bg3)' }}>
           <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#fff', padding: '6px 14px', borderRadius: '10px', border: '1.5px solid var(--brd)' }}>
              <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
              <input type="text" placeholder="Buscar líder por nombre, ID o teléfono..." className="fc" style={{ border: 'none', background: 'none' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
           </div>
           <select className="fc" style={{ width: '180px' }}>
              <option>Todos los Distritos</option>
              <option>Distrito 1</option>
              <option>Distrito 2</option>
              <option>Distrito 3</option>
           </select>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr style={{ background: 'var(--pr)', color: '#fff' }}>
                <th style={{ color: '#fff' }}>Código ID</th>
                <th style={{ color: '#fff' }}>Nombre del Líder</th>
                <th style={{ color: '#fff' }}>Teléfono / Contacto</th>
                <th style={{ color: '#fff' }}>Área / Zona</th>
                <th style={{ color: '#fff' }}>Sector / Distrito</th>
                <th style={{ color: '#fff' }}>Privilegio</th>
                <th style={{ color: '#fff' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {hermanos.map(h => (
                <tr key={h.id}>
                  <td><span className="stat-pill" style={{ background: 'var(--bg3)', color: 'var(--pr)', fontSize: '11px' }}>ID #{h.id}</span></td>
                  <td><strong>{h.nombre}</strong></td>
                  <td><i className="fas fa-phone-alt" style={{ color: 'var(--tx3)', fontSize: '11px', marginRight: '6px' }}></i> {h.telefono}</td>
                  <td>
                    <div style={{ fontWeight: '800', color: 'var(--pr)' }}>{h.area}</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx2)' }}>Zona: {h.zona}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '800' }}>Sector: {h.sector}</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx2)' }}>Distrito: {h.distrito}</div>
                  </td>
                  <td>
                    <span className={`stat-pill ${h.privilegio === 'Pastor' ? 'pill-ok' : 'pill-inf'}`} style={{ background: h.privilegio === 'Pastor' ? 'rgba(39,174,96,.1)' : 'rgba(41,128,185,.1)', color: h.privilegio === 'Pastor' ? 'var(--ok)' : 'var(--inf)' }}>{h.privilegio}</span>
                  </td>
                  <td><button className="tb-btn"><i className="fas fa-edit"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
