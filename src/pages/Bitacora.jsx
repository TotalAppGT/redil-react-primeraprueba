import React, { useState } from 'react'

export default function Bitacora() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data basado en los encabezados reales: ID, FechaHora, Usuario, Email, Rol, Accion, Detalles
  const [logs, setLogs] = useState([
    { id: '1', fechaHora: '2026-04-05 10:15:30', usuario: 'Administrador Principal', email: 'totalappgt@gmail.com', rol: 'Propietario', accion: 'Login', detalles: 'Inicio de sesión exitoso desde Chrome/Windows' },
    { id: '2', fechaHora: '2026-04-05 10:20:12', usuario: 'Administrador Principal', email: 'totalappgt@gmail.com', rol: 'Propietario', accion: 'Sincronizar Datos', detalles: 'Se sincronizó el módulo de Hermanos con Supabase' },
    { id: '3', fechaHora: '2026-04-04 18:45:05', usuario: 'Secretaria Gral.', email: 'secretaria@iglesia.com', rol: 'Secretario', accion: 'Exportar Excel', detalles: 'Se generó reporte de asistencia trimestral' },
    { id: '4', fechaHora: '2026-04-04 14:30:00', usuario: 'Administrador Principal', email: 'totalappgt@gmail.com', rol: 'Propietario', accion: 'Cambio Config', detalles: 'Se desactivó el sistema por mantenimiento' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-clipboard-list"></i> Bitácora de Accesos y Auditoría</h2>
        <div className="mod-acts">
           <button className="btn btn-pr btn-sm"><i className="fas fa-file-excel"></i> Exportar Auditoría</button>
           <button className="btn btn-err btn-sm"><i className="fas fa-trash"></i> Purgar Logs Antiguos</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="fr" style={{ padding: '15px', display: 'flex', gap: '10px', borderBottom: '1px solid var(--brd)' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '5px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar por usuario, acción o fecha..." 
              className="fc" 
              style={{ border: 'none', background: 'none' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="fc" style={{ width: '180px' }}>
            <option>Todas las Acciones</option>
            <option>Login</option>
            <option>Cambio Config</option>
            <option>Eliminar Registro</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Usuario / Correo</th>
                <th>Acción Realizada</th>
                <th>Detalles de Auditoría</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(l => (
                <tr key={l.id}>
                  <td><span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pr)' }}>{l.fechaHora}</span></td>
                  <td>
                    <strong>{l.usuario}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{l.email} — <small style={{ fontWeight: '800', color: 'var(--ac)' }}>{l.rol}</small></div>
                  </td>
                  <td><span className="stat-pill" style={{ background: 'rgba(26,58,92,.1)', color: 'var(--pr)', fontWeight: '800' }}>{l.accion}</span></td>
                  <td style={{ fontSize: '12px' }}>{l.detalles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
