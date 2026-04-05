import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'
import { supabase } from '../supabaseClient'

export default function Usuarios() {
  const { branding } = useBranding()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  
  // Estado para el nuevo usuario
  const [newUser, setNewUser] = useState({ nombre: '', email: '', rol: 'ADMIN' })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: res } = await supabase.from('usuarios').select('*').order('nombre')
      if (res) setData(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase.from('usuarios').insert([newUser])
      if (error) throw error
      alert("¡Usuario agregado con éxito!")
      setShowModal(false)
      setNewUser({ nombre: '', email: '', rol: 'ADMIN' })
      loadData()
    } catch (e) {
      alert("Error al guardar: " + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-user-shield" style={{ color: 'var(--pr)' }}></i> Gestión de Seguridad y Usuarios</h2>
        <div className="mod-acts">
           <button className="btn btn-ok" onClick={() => setShowModal(true)}>
             <i className="fas fa-plus"></i> NUEVO USUARIO
           </button>
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

      {/* MODAL PARA NUEVO USUARIO */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '450px' }}>
            <div className="modal-hdr">
              <h3><i className="fas fa-user-plus"></i> Registrar Nuevo Usuario</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSave} className="modal-body">
              <div className="fi">
                <label>Nombre Completo</label>
                <input 
                  className="fc" 
                  required 
                  value={newUser.nombre} 
                  onChange={e => setNewUser({...newUser, nombre: e.target.value})} 
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div className="fi">
                <label>Correo Electrónico (Google)</label>
                <input 
                  className="fc" 
                  type="email" 
                  required 
                  value={newUser.email} 
                  onChange={e => setNewUser({...newUser, email: e.target.value})} 
                  placeholder="ejemplo@gmail.com"
                />
              </div>
              <div className="fi">
                <label>Rol de Acceso</label>
                <select 
                  className="fc" 
                  value={newUser.rol} 
                  onChange={e => setNewUser({...newUser, rol: e.target.value})}
                >
                  <option value="ADMIN">Administrador General</option>
                  <option value="PASTOR">Pastor de Zona</option>
                  <option value="CONTADOR">Contabilidad y Finanzas</option>
                  <option value="LIDER">Líder de Grupo</option>
                </select>
              </div>
              <div className="modal-ft">
                <button type="button" className="btn btn-pr" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-ok" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.6); display:flex; align-items:center; justifyContent:center; z-index:1000; backdrop-filter: blur(4px); }
        .modal-content { background:#fff; border-radius:15px; width:90%; animation: slideUp 0.3s ease; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
        .modal-hdr { padding:20px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; }
        .modal-hdr h3 { margin:0; color: var(--pr); font-weight:900; }
        .modal-body { padding:20px; }
        .modal-ft { padding:15px 20px; border-top:1px solid #eee; display:flex; justify-content:flex-end; gap:10px; }
        .fi { margin-bottom:15px; }
        .fi label { display:block; font-size:12px; font-weight:800; color:var(--tx2); margin-bottom:5px; text-transform:uppercase; }
        @keyframes slideUp { from { transform: translateY(20px); opacity:0; } to { transform: translateY(0); opacity:1; } }
        .close-btn { background:none; border:none; font-size:24px; cursor:pointer; color:var(--tx3); }
      `}</style>
    </div>
  )
}
