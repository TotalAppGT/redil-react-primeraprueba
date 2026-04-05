import React, { useState } from 'react'

export default function Cronograma() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data basado en los encabezados reales: ID, Hermano, Area, Servicio, Privilegio, Lunes, Jueves, Domingo_Mañana, Domingo_Tarde, FechaAsignacion, Observaciones, Activo
  const [cronograma, setCronograma] = useState([
    { id: '1', Hermano: 'Juan Pérez', Area: 'Alfolí', Servicio: 'Culto Gral', Privilegio: 'Director', Lunes: 'SI', Jueves: 'NO', Domingo_Mañana: 'SI', Domingo_Tarde: 'NO', Activo: 'SI' },
    { id: '2', Hermano: 'María González', Area: 'Ujieres', Servicio: 'Culto Gral', Privilegio: 'Ujier', Lunes: 'NO', Jueves: 'SI', Domingo_Mañana: 'NO', Domingo_Tarde: 'SI', Activo: 'SI' },
    { id: '3', Hermano: 'Elena R.', Area: 'Niños', Servicio: 'Maestra', Privilegio: 'Niños', Lunes: 'NO', Jueves: 'NO', Domingo_Mañana: 'SI', Domingo_Tarde: 'SI', Activo: 'SI' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-calendar-alt"></i> Cronograma de Actividades y Privilegios</h2>
        <div className="mod-acts">
           <button className="btn btn-pr btn-sm"><i className="fas fa-print"></i> Imprimir Semanal</button>
           <button className="btn btn-ok btn-sm"><i className="fas fa-plus"></i> Nueva Asignación</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', display: 'flex', gap: '10px', borderBottom: '1px solid var(--brd)' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '5px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar por hermano o área..." 
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
                <th>Área / Cargo</th>
                <th>Lunes</th>
                <th>Jueves</th>
                <th>Dom. Mañana</th>
                <th>Dom. Tarde</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cronograma.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.Hermano}</strong></td>
                  <td>
                    <div style={{ fontSize: '13px' }}>{c.Area}</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{c.Privilegio}</div>
                  </td>
                  <td style={{ textAlign: 'center' }}>{c.Lunes === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: 'var(--bg3)' }}></i>}</td>
                  <td style={{ textAlign: 'center' }}>{c.Jueves === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: 'var(--bg3)' }}></i>}</td>
                  <td style={{ textAlign: 'center' }}>{c.Domingo_Mañana === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: 'var(--bg3)' }}></i>}</td>
                  <td style={{ textAlign: 'center' }}>{c.Domingo_Tarde === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: 'var(--bg3)' }}></i>}</td>
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
