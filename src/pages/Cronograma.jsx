import React, { useState } from 'react'

export default function Cronograma() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data basado en los encabezados reales de la v5.1: ID, Hermano, Area, Servicio, Privilegio, Lunes, Jueves, Domingo_Mañana, Domingo_Tarde, FechaAsignacion, Observaciones, Activo
  const [cronograma, setCronograma] = useState([
    { id: '1', Hermano: 'Juan Pérez', Area: 'Alfolí', Servicio: 'Culto General', Privilegio: 'Director', Lunes: 'SI', Jueves: 'NO', Domingo_Mañana: 'SI', Domingo_Tarde: 'NO', FechaAsignacion: '2026-03-29', Observaciones: 'Responsable de abrir el auditorio', Activo: 'SI' },
    { id: '2', Hermano: 'María González', Area: 'Ujieres', Servicio: 'Cultos Grales', Privilegio: 'Día de Turno', Lunes: 'NO', Jueves: 'SI', Domingo_Mañana: 'NO', Domingo_Tarde: 'SI', FechaAsignacion: '2026-03-30', Observaciones: 'Apoyo en puerta principal', Activo: 'SI' },
    { id: '3', Hermano: 'Carlos Ruiz', Area: 'Distrito 3', Servicio: 'Ministerio Alabanza', Privilegio: 'Vocalista', Lunes: 'SI', Jueves: 'SI', Domingo_Mañana: 'SI', Domingo_Tarde: 'SI', FechaAsignacion: '2026-04-01', Observaciones: 'Ensayo a las 18:00', Activo: 'SI' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-calendar-alt"></i> Cronograma Semanal de Privilegios</h2>
        <div className="mod-acts">
           <button className="btn btn-ok btn-sm"><i className="fas fa-plus"></i> Nueva Asignación</button>
           <button className="btn btn-pr btn-sm"><i className="fas fa-print"></i> Imprimir</button>
           <button className="btn btn-err btn-sm"><i className="fas fa-file-pdf"></i> PDF</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', display: 'flex', gap: '10px', borderBottom: '1px solid var(--brd)' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '5px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar por hermano, área o privilegio..." 
              className="fc" 
              style={{ border: 'none', background: 'none' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="fc" style={{ width: '180px' }}>
             <option>Todas las Áreas</option>
             <option>Alfolí</option>
             <option>Ujieres</option>
             <option>Alabanza</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Hermano (Líder)</th>
                <th>Área / Cargo</th>
                <th>Servicio</th>
                <th style={{ textAlign: 'center' }}>Lun</th>
                <th style={{ textAlign: 'center' }}>Jue</th>
                <th style={{ textAlign: 'center' }}>Dom (M)</th>
                <th style={{ textAlign: 'center' }}>Dom (T)</th>
                <th>Vigente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cronograma.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.Hermano}</strong></td>
                  <td>
                    <div style={{ fontSize: '12px', color: 'var(--pr)', fontWeight: '800' }}>{c.Area}</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{c.Privilegio}</div>
                  </td>
                  <td><span className="stat-pill" style={{ background: 'var(--bg3)' }}>{c.Servicio}</span></td>
                  <td style={{ textAlign: 'center' }}>
                    {c.Lunes === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: 'rgba(0,0,0,0.05)' }}></i>}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {c.Jueves === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: 'rgba(0,0,0,0.05)' }}></i>}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {c.Domingo_Mañana === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: 'rgba(0,0,0,0.05)' }}></i>}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {c.Domingo_Tarde === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: 'rgba(0,0,0,0.05)' }}></i>}
                  </td>
                  <td>
                    <span className={`stat-pill ${c.Activo === 'SI' ? 'pill-ok' : 'pill-err'}`}>{c.Activo === 'SI' ? 'ACTIVO' : 'CADUCO'}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
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
