import React, { useState } from 'react'

export default function Privilegios() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data basado en los encabezados reales: ID, Hermano, Area, CodigoL, Privilegio, FechaInicio, FechaFin, Observaciones, Activo
  const [privilegios, setPrivilegios] = useState([
    { id: '1', Hermano: 'Juan Pérez', Area: 'Alfolí', CodigoL: 'L-001', Privilegio: 'Director', FechaInicio: '2026-01-01', FechaFin: '', Observaciones: 'Cargo renovado anualmente', Activo: 'SI' },
    { id: '2', Hermano: 'María González', Area: 'Ujieres', CodigoL: 'L-002', Privilegio: 'Secretaria', FechaInicio: '2026-02-15', FechaFin: '2026-12-31', Observaciones: 'Periodo temporal', Activo: 'SI' },
    { id: '3', Hermano: 'Carlos Ruiz', Area: 'Distrito 3', CodigoL: 'L-012', Privilegio: 'Supervisor', FechaInicio: '2026-01-10', FechaFin: '', Observaciones: 'Reemplazo de hno. anterior', Activo: 'SI' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-crown"></i> Control de Privilegios y Cargos</h2>
        <div className="mod-acts">
          <button className="btn btn-pr btn-sm"><i className="fas fa-plus"></i> Asignar Nuevo Privilegio</button>
          <button className="btn btn-ok btn-sm"><i className="fas fa-file-pdf"></i> Imprimir Listado</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', display: 'flex', gap: '10px', borderBottom: '1px solid var(--brd)' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '5px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar por hermano, cargo o área..." 
              className="fc" 
              style={{ border: 'none', background: 'none' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Hermano (Líder)</th>
                <th>Privilegio / Cargo</th>
                <th>Área de Servicio</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {privilegios.map(p => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.Hermano}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{p.CodigoL}</div>
                  </td>
                  <td><span className="stat-pill" style={{ background: 'var(--bg3)', color: 'var(--pr)', fontWeight: '800' }}>{p.Privilegio}</span></td>
                  <td>{p.Area}</td>
                  <td>{p.FechaInicio}</td>
                  <td>{p.FechaFin || '—'}</td>
                  <td>
                    <span className={`stat-pill ${p.Activo === 'SI' ? 'pill-ok' : 'pill-err'}`}>
                      {p.Activo === 'SI' ? 'En Vigencia' : 'Caduco'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button className="tb-btn" title="Editar"><i className="fas fa-edit"></i></button>
                      <button className="tb-btn" title="Finalizar" style={{ color: 'var(--err)' }}><i className="fas fa-times-circle"></i></button>
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
