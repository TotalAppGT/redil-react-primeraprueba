import React, { useState } from 'react'

export default function Seguimientos() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data basado en los encabezados reales: ID, Fecha, Persona, Telefono, Tipo, Descripcion, Responsable, Estado, FechaSeguimiento
  const [seguimientos, setSeguimientos] = useState([
    { id: '1', Fecha: '2026-04-01', Persona: 'Carlos Ruiz', Telefono: '5566-7788', Tipo: 'Consolidación', Descripcion: 'Visita por primera vez', Responsable: 'Juan Pérez', Estado: 'Pendiente', FechaSeguimiento: '2026-04-05' },
    { id: '2', Fecha: '2026-03-28', Persona: 'Ana Lopez', Telefono: '9900-1122', Tipo: 'Discipulado', Descripcion: 'Llamada telefónica', Responsable: 'María González', Estado: 'Completado', FechaSeguimiento: '2026-04-02' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-hands-helping"></i> Gestión de Seguimientos</h2>
        <div className="mod-acts">
          <button className="btn btn-pr"><i className="fas fa-file-pdf"></i> Exportar Todo</button>
          <button className="btn btn-ok"><i className="fas fa-plus"></i> Añadir Seguimiento</button>
        </div>
      </div>

      <div className="sg">
        <div className="sc g">
          <div className="sc-ico"><i className="fas fa-check-circle"></i></div>
          <div className="sc-v">14</div>
          <div className="sc-l">Completados (Mes)</div>
        </div>
        <div className="sc o">
          <div className="sc-ico"><i className="fas fa-clock"></i></div>
          <div className="sc-v">8</div>
          <div className="sc-l">Pendientes hoy</div>
        </div>
        <div className="sc r">
          <div className="sc-ico"><i className="fas fa-exclamation-triangle"></i></div>
          <div className="sc-v">3</div>
          <div className="sc-l">Atrasados</div>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', borderBottom: '1px solid var(--brd)', display: 'flex', gap: '10px' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '8px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar por persona, responsable o tipo..." 
              className="fc" 
              style={{ border: 'none', background: 'none', padding: '0' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="fc" style={{ width: '150px' }}>
            <option value="">Estado: Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Completado">Completado</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Persona / Teléfono</th>
                <th>Tipo</th>
                <th>Responsable</th>
                <th>Fecha Límite</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {seguimientos.map(s => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.Persona}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{s.Telefono}</div>
                  </td>
                  <td><span className="stat-pill" style={{ background: 'rgba(41,128,185,.1)', color: 'var(--inf)', fontWeight: '800' }}>{s.Tipo}</span></td>
                  <td>{s.Responsable}</td>
                  <td>{s.FechaSeguimiento}</td>
                  <td>
                    <span className={`stat-pill ${s.Estado === 'Completado' ? 'pill-ok' : 'pill-err'}`}>
                      {s.Estado === 'Completado' ? 'Listo' : 'Pendiente'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button className="tb-btn" title="Llamar"><i className="fas fa-phone"></i></button>
                      <button className="tb-btn" title="WhatsApp" style={{ color: 'var(--ok)' }}><i className="fab fa-whatsapp"></i></button>
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
