import React, { useState } from 'react'

export default function Cronograma() {
  const [searchTerm, setSearchTerm] = useState('')

  // Datos de ejemplo para una transición profesional (Basados en el cron_ original)
  const [cronograma, setCronograma] = useState([
    { id: '1', Hermano: 'Juan Pérez', Area: 'Alfolí', Servicio: 'Culto General', Privilegio: 'Director', Lunes: 'SI', Jueves: 'NO', Domingo_Mañana: 'SI', Domingo_Tarde: 'NO', Activo: 'SI' },
    { id: '2', Hermano: 'Sara González', Area: 'Alabanza', Servicio: 'Ensayos / Cultos', Privilegio: 'Corista', Lunes: 'SI', Jueves: 'SI', Domingo_Mañana: 'SI', Domingo_Tarde: 'SI', Activo: 'SI' },
    { id: '3', Hermano: 'Pedro Ramírez', Area: 'Ujieres', Servicio: 'Culto Oración', Privilegio: 'Puerta Principal', Lunes: 'NO', Jueves: 'SI', Domingo_Mañana: 'NO', Domingo_Tarde: 'SI', Activo: 'SI' },
    { id: '4', Hermano: 'Martha Ruiz', Area: 'Escuela Dominical', Servicio: 'Clases Niños', Privilegio: 'Maestra', Lunes: 'NO', Jueves: 'NO', Domingo_Mañana: 'SI', Domingo_Tarde: 'SI', Activo: 'SI' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-calendar-alt"></i> Cronograma de Actividades</h2>
        <div className="mod-acts">
           <button className="btn btn-ok btn-sm"><i className="fas fa-plus"></i> Nueva Asignación</button>
           <button className="btn btn-pr btn-sm"><i className="fas fa-print"></i> Imprimir Plan Semanal</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', display: 'flex', gap: '12px', borderBottom: '1px solid var(--brd)', background: 'var(--bg3)' }}>
           <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#fff', padding: '6px 14px', borderRadius: '10px', border: '1.5px solid var(--brd)' }}>
              <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
              <input type="text" placeholder="Buscar por hermano o área..." className="fc" style={{ border: 'none', background: 'none', padding: '0' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
           </div>
           <select className="fc" style={{ width: '180px', height: '40px' }}>
              <option>Todas las Áreas</option>
              <option>Alabanza</option>
              <option>Servidores</option>
              <option>Niños</option>
           </select>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr style={{ background: 'var(--pr)', color: '#fff' }}>
                <th style={{ color: '#fff' }}>Hno / Líder Encomendado</th>
                <th style={{ color: '#fff' }}>Asignación de Servicio</th>
                <th style={{ color: '#fff' }}>Lunes</th>
                <th style={{ color: '#fff' }}>Jueves</th>
                <th style={{ color: '#fff' }}>Dom (M)</th>
                <th style={{ color: '#fff' }}>Dom (T)</th>
                <th style={{ color: '#fff' }}>Vigencia</th>
                <th style={{ color: '#fff' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cronograma.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: '900', color: 'var(--tx)' }}>{c.Hermano}</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>ID Asoc: #{c.id * 100}</div>
                  </td>
                  <td>
                    <span className="stat-pill" style={{ background: 'var(--bg3)', color: 'var(--pr)' }}>{c.Area}</span>
                    <div style={{ fontSize: '11.5px', color: 'var(--tx2)', marginTop: '3px' }}>{c.Privilegio}</div>
                  </td>
                  <td>{c.Lunes === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: '#eee' }}></i>}</td>
                  <td>{c.jueves === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: '#eee' }}></i>}</td>
                  <td>{c.Domingo_Mañana === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: '#eee' }}></i>}</td>
                  <td>{c.Domingo_Tarde === 'SI' ? <i className="fas fa-check-circle" style={{ color: 'var(--ok)' }}></i> : <i className="fas fa-times" style={{ color: '#eee' }}></i>}</td>
                  <td>
                    <span className={`stat-pill ${c.Activo === 'SI' ? 'pill-ok' : 'pill-err'}`}>{c.Activo === 'SI' ? 'ACTIVO' : 'CADUCO'}</span>
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
