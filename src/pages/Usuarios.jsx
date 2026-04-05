import React, { useState } from 'react'

export default function Usuarios() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data basado en los encabezados reales: ID, Nombre, Email, Password, Rol, Activo, FechaCreacion, MenuPermitido, PuedeVerBitacora
  const [usuarios, setUsuarios] = useState([
    { id: '1', Nombre: 'Administrador Principal', Email: 'totalappgt@gmail.com', Rol: 'Propietario', Activo: 'SI', FechaCreacion: '2026-03-01', PuedeVerBitacora: 'SI' },
    { id: '2', Nombre: 'Secretaria Gral.', Email: 'secretaria@iglesia.com', Rol: 'Secretario', Activo: 'SI', FechaCreacion: '2026-03-15', PuedeVerBitacora: 'NO' },
    { id: '3', Nombre: 'Tesorero Sede', Email: 'tesorero@iglesia.com', Rol: 'Tesorero', Activo: 'SI', FechaCreacion: '2026-03-20', PuedeVerBitacora: 'NO' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-users-cog"></i> Control de Usuarios y Permisos</h2>
        <div className="mod-acts">
          <button className="btn btn-pr"><i className="fas fa-clipboard-list"></i> Ver Bitácora</button>
          <button className="btn btn-ok"><i className="fas fa-user-plus"></i> Nuevo Usuario</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', borderBottom: '1px solid var(--brd)', display: 'flex', gap: '10px' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '8px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar usuario por nombre o correo..." 
              className="fc" 
              style={{ border: 'none', background: 'none', padding: '0' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Usuario / Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Creado el</th>
                <th>Acceso Bitácora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td>
                    <strong>{u.Nombre}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{u.Email}</div>
                  </td>
                  <td>
                    <span className="stat-pill" style={{ background: u.Rol === 'Propietario' ? 'var(--pr)' : 'var(--bg3)', color: u.Rol === 'Propietario' ? '#fff' : 'var(--tx)' }}>
                      {u.Rol}
                    </span>
                  </td>
                  <td>
                    <span className={`stat-pill ${u.Activo === 'SI' ? 'pill-ok' : 'pill-err'}`}>
                      {u.Activo === 'SI' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td style={{ fontSize: '12.5px' }}>{u.FechaCreacion}</td>
                  <td style={{ textAlign: 'center' }}>
                    <i className={`fas ${u.PuedeVerBitacora === 'SI' ? 'fa-check-circle' : 'fa-times-circle'}`} style={{ color: u.PuedeVerBitacora === 'SI' ? 'var(--ok)' : 'var(--tx3)' }}></i>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button className="tb-btn" title="Editar Permisos"><i className="fas fa-key"></i></button>
                      <button className="tb-btn" title="Editar"><i className="fas fa-edit"></i></button>
                      {u.Rol !== 'Propietario' && <button className="tb-btn" title="Eliminar" style={{ color: 'var(--err)' }}><i className="fas fa-trash"></i></button>}
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
