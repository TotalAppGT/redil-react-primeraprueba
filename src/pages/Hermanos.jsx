import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'
import { supabase } from '../supabaseClient'

export default function Hermanos() {
  const { branding } = useBranding()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)

  // Estado para el nuevo hermano
  const [newHermano, setNewHermano] = useState({
    codigo_l: '', nombre_l: '', 
    sup_sector_l: '', sup_area_l: '', pastor_zona: '',
    anfitrion: '', direccion: '', telefono: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: res } = await supabase.from('hermanos').select('*').order('nombre_l')
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
      const { error } = await supabase.from('hermanos').insert([newHermano])
      if (error) throw error
      alert("¡Hermano agregado correctamente!")
      setShowModal(false)
      setNewHermano({
        codigo_l: '', nombre_l: '', 
        sup_sector_l: '', sup_area_l: '', pastor_zona: '',
        anfitrion: '', direccion: '', telefono: ''
      })
      loadData()
    } catch (e) {
      alert("Error al guardar: " + e.message)
    } finally {
      setSaving(false)
    }
  }

  const filtered = data.filter(h => 
    (h.nombre_l || '').toLowerCase().includes(search.toLowerCase()) || 
    (h.codigo_l || '').includes(search)
  )

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-users" style={{ color: 'var(--ac)' }}></i> Gestión de Hermanos Líderes</h2>
        <div className="mod-acts">
           <button className="btn btn-ok" onClick={() => setShowModal(true)}>
             <i className="fas fa-plus"></i> NUEVO LÍDER
           </button>
           <button className="btn btn-pr" onClick={loadData}><i className="fas fa-sync"></i> REFRESCAR</button>
        </div>
      </div>

      <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div className="sc g"><div className="sc-ico"><i className="fas fa-id-card"></i></div><div className="sc-v">{data.length}</div><div className="sc-l">REGISTRADOS</div></div>
        <div className="sc b"><div className="sc-ico"><i className="fas fa-map-marker-alt"></i></div><div className="sc-v">{[...new Set(data.map(x => x.sup_sector_l))].length}</div><div className="sc-l">SECTORES ACTIVOS</div></div>
      </div>

      <div className="card">
        <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--tx2)', textTransform: 'uppercase' }}>BÚSQUEDA RÁPIDA</label>
        <input 
          className="fc" 
          placeholder="Buscar por nombre, código o sector..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          style={{ padding: '15px', marginTop: '5px' }}
        />
      </div>

      <div className="table-wrap">
        <table className="pro-table">
          <thead>
            <tr>
              <th>Cód.</th>
              <th>Nombre Completo</th>
              <th>Sector / Área</th>
              <th>Pastor Zona</th>
              <th style={{ textAlign: 'center' }}>Gestión</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-circle-notch fa-spin"></i> Cargando líderes...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Sin resultados.</td></tr>
            ) : (
              filtered.map(x => (
                <tr key={x.id}>
                  <td><b>{x.codigo_l}</b></td>
                  <td>{x.nombre_l}</td>
                  <td><span className="stat-pill" style={{ background: 'rgba(37,99,168,0.1)', color: 'var(--pr)', fontSize: '10px' }}>{x.sup_sector_l} / {x.sup_area_l}</span></td>
                  <td>{x.pastor_zona}</td>
                  <td style={{ textAlign: 'center' }}>
                     <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <button className="tb-btn"><i className="fas fa-edit"></i></button>
                        <button className="tb-btn" style={{ color: 'var(--err)' }}><i className="fas fa-trash"></i></button>
                     </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL PARA NUEVO HERMANO */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-hdr">
              <h3><i className="fas fa-id-badge"></i> Registrar Nuevo Hermano Líder</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSave} className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="fi">
                <label>Código de Líder</label>
                <input className="fc" required value={newHermano.codigo_l} onChange={e => setNewHermano({...newHermano, codigo_l: e.target.value})} placeholder="Ej: 154" />
              </div>
              <div className="fi">
                <label>Nombre Completo</label>
                <input className="fc" required value={newHermano.nombre_l} onChange={e => setNewHermano({...newHermano, nombre_l: e.target.value})} placeholder="Ej: Mario López" />
              </div>
              <div className="fi">
                <label>Sector</label>
                <input className="fc" value={newHermano.sup_sector_l} onChange={e => setNewHermano({...newHermano, sup_sector_l: e.target.value})} placeholder="Ej: Sector 2" />
              </div>
              <div className="fi">
                <label>Área</label>
                <input className="fc" value={newHermano.sup_area_l} onChange={e => setNewHermano({...newHermano, sup_area_l: e.target.value})} placeholder="Ej: Área Central" />
              </div>
              <div className="fi">
                <label>Pastor de Zona</label>
                <input className="fc" value={newHermano.pastor_zona} onChange={e => setNewHermano({...newHermano, pastor_zona: e.target.value})} />
              </div>
              <div className="fi">
                <label>Teléfono</label>
                <input className="fc" value={newHermano.telefono} onChange={e => setNewHermano({...newHermano, telefono: e.target.value})} />
              </div>
              <div className="fi" style={{ gridColumn: 'span 2' }}>
                <label>Dirección del Grupo</label>
                <input className="fc" value={newHermano.direccion} onChange={e => setNewHermano({...newHermano, direccion: e.target.value})} />
              </div>
              <div className="modal-ft" style={{ gridColumn: 'span 2' }}>
                <button type="button" className="btn btn-pr" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-ok" disabled={saving}>
                  {saving ? 'Guardando...' : 'Registrar Hermano'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.6); display:flex; align-items:center; justifyContent:center; z-index:1000; backdrop-filter: blur(4px); }
        .modal-content { background:#fff; border-radius:15px; width:95%; max-height:90vh; overflow-y:auto; animation: slideUp 0.3s ease; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
        .modal-hdr { padding:20px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; }
        .modal-hdr h3 { margin:0; color: var(--pr); font-weight:900; }
        .modal-body { padding:20px; }
        .modal-ft { padding:15px 20px; border-top:1px solid #eee; display:flex; justify-content:flex-end; gap:10px; }
        .fi { margin-bottom:10px; }
        .fi label { display:block; font-size:11px; font-weight:800; color:var(--tx2); margin-bottom:5px; text-transform:uppercase; }
        @keyframes slideUp { from { transform: translateY(20px); opacity:0; } to { transform: translateY(0); opacity:1; } }
      `}</style>
    </div>
  )
}
