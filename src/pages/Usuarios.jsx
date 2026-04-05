import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'

export default function Usuarios() {
  const { branding } = useBranding()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: res } = await supabaseService.getUsuarios()
      if (res) setData(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-user-shield" style={{ color: 'var(--pr)' }}></i> Gestión de Seguridad y Usuarios</h2>
        <div className="mod-acts">
           <button className="btn btn-ok"><i className="fas fa-plus"></i> NUEVO USUARIO</button>
           <button className="btn btn-pr" onClick={loadData}><i className="fas fa-sync"></i> REFRESCAR</button>
        </div>
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, var(--pr) 0%, var(--pr3) 100%)', color: '#fff', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '42px', opacity: 0.8 }}>🛡️</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>Control de Privilegios Administrativos</div>
            <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>Aquí puedes asignar roles de Administrador, Pastor, Contador o Líder.</p>
          </div>
        </div>
      </div>

      <div className="table-wrap" style={{ marginTop: '15px' }}>
        <table className="pro-table">
          <thead>
            <tr>
              <th>Usuario / Correo</th>
              <th>Rol / Privilegio</th>
              <th>Último Acceso</th>
              <th>Estado Cuenta</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-circle-notch fa-spin"></i> Cargando usuarios...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-user-lock" style={{ fontSize: '30px', color: 'var(--tx3)' }}></i><p>Sin usuarios registrados.</p></td></tr>
            ) : (
              data.map(x => (
                <tr key={x.id}>
                  <td><b>{x.nombre}</b><div style={{ fontSize: '10px', color: 'var(--tx2)' }}>{x.email}</div></td>
                  <td>
                    <span className="stat-pill" style={{ 
                      background: x.rol === 'OWNER' ? 'rgba(232,160,32,0.1)' : 'rgba(37,99,168,0.1)', 
                      color: x.rol === 'OWNER' ? 'var(--ac)' : 'var(--pr)', 
                      fontWeight: '800' 
                    }}>{x.rol}</span>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--tx2)' }}>{x.ultimo_acceso || 'Sin acceso registrado'}</td>
                  <td><span className="stat-pill pill-ok">ACTIVO</span></td>
                  <td style={{ textAlign: 'center' }}>
                     <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <button className="tb-btn" title="Editar Privilegios"><i className="fas fa-key"></i></button>
                        <button className="tb-btn" title="Dar de baja" style={{ color: 'var(--err)' }}><i className="fas fa-user-minus"></i></button>
                     </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
