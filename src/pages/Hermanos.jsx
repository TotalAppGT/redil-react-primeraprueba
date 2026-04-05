import React, { useState } from 'react'

export default function Hermanos() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data basado en los encabezados reales: ID, CodigoL, NombreL, Area, Zona, Sector, Anfitrion, Direccion, Sup SectorL, Sup AreaL, Ayuda Pastor, Pastor Zona
  const [hermanos, setHermanos] = useState([
    { id: '1', CodigoL: 'L-001', NombreL: 'Juan Pérez', Area: 'Área 1', Zona: 'Zona Central', Sector: 'Sector A', Anfitrion: 'Casa Familia Pérez', Direccion: 'Calle 12-34', 'Sup SectorL': 'Carlos Ruiz', 'Sup AreaL': 'Mario Gomez', 'Ayuda Pastor': 'Elena R.', 'Pastor Zona': 'Pr. Juan' },
    { id: '2', CodigoL: 'L-002', NombreL: 'María González', Area: 'Área 2', Zona: 'Sede Norte', Sector: 'Sector B', Anfitrion: 'Hna. Martha', Direccion: 'Ave. Principal 5-67', 'Sup SectorL': 'Ana Lopez', 'Sup AreaL': 'Mario Gomez', 'Ayuda Pastor': 'Elena R.', 'Pastor Zona': 'Pr. Juan' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-user-tie"></i> Hermanos Líderes</h2>
        <div className="mod-acts">
          <button className="btn btn-pr"><i className="fas fa-file-upload"></i> Carga Masiva</button>
          <button className="btn btn-ok"><i className="fas fa-plus"></i> Nuevo Líder</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', borderBottom: '1px solid var(--brd)', display: 'flex', gap: '10px' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '8px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar por nombre, código o sector..." 
              className="fc" 
              style={{ border: 'none', background: 'none', padding: '0' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="fc" style={{ width: '180px' }}>
            <option value="">Filtrar p. Zona</option>
            <option value="central">Zona Central</option>
            <option value="norte">Sede Norte</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre Líder</th>
                <th>Zona / Pastor</th>
                <th>Sector</th>
                <th>Anfitrión / Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {hermanos.map(h => (
                <tr key={h.id}>
                  <td><span className="stat-pill" style={{ background: 'var(--bg3)', color: 'var(--pr)', fontWeight: '800' }}>{h.CodigoL}</span></td>
                  <td><strong>{h.NombreL}</strong></td>
                  <td>
                    <div style={{ fontSize: '13px' }}>{h.Zona}</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{h['Pastor Zona']}</div>
                  </td>
                  <td>{h.Sector}</td>
                  <td>
                    <div style={{ fontSize: '13px' }}>{h.Anfitrion}</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{h.Direccion}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button className="tb-btn" title="Editar"><i className="fas fa-edit"></i></button>
                      <button className="tb-btn" title="Eliminar" style={{ color: 'var(--err)' }}><i className="fas fa-trash"></i></button>
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
