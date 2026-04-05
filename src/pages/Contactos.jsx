import React, { useState } from 'react'

export default function Contactos() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data basado en los encabezados reales: IDContacto, Nombre, Correo
  const [contactos, setContactos] = useState([
    { id: '1', nombre: 'Juan Pérez', correo: 'juanperez@gmail.com', cargo: 'Líder' },
    { id: '2', nombre: 'María González', correo: 'mjgonza@hotmail.com', cargo: 'Secretaria' },
    { id: '3', nombre: 'Carlos Ruiz', correo: 'carlos_ruiz_88@yahoo.com', cargo: 'Supervisor' },
    { id: '4', nombre: 'Ana Lopez', correo: 'alopez@iglesia.com', cargo: 'Líder' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-address-book"></i> Tabla de Contactos (Directorio)</h2>
        <div className="mod-acts">
           <button className="btn btn-pr btn-sm"><i className="fas fa-file-excel"></i> Exportar</button>
           <button className="btn btn-ok btn-sm"><i className="fas fa-plus"></i> Nuevo Contacto</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', display: 'flex', gap: '10px', borderBottom: '1px solid var(--brd)' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '5px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar por nombre o correo..." 
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
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Correo Electrónico</th>
                <th>Cargo / Privilegio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map(c => (
                <tr key={c.id}>
                  <td><span className="stat-pill" style={{ background: 'var(--bg3)', fontSize: '10px' }}>#C-0{c.id}</span></td>
                  <td><strong>{c.nombre}</strong></td>
                  <td><span style={{ fontSize: '13px', color: 'var(--inf)' }}><i className="fas fa-envelope"></i> {c.correo}</span></td>
                  <td><span className="stat-pill" style={{ background: 'rgba(232,160,32,0.1)', color: 'var(--ac)', fontWeight: '800' }}>{c.cargo}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button className="tb-btn" title="Editar"><i className="fas fa-edit"></i></button>
                      <button className="tb-btn" title="Borrar" style={{ color: 'var(--err)' }}><i className="fas fa-trash"></i></button>
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
