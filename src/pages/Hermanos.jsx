import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'

export default function Hermanos() {
  const { branding } = useBranding()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: res, error } = await supabaseService.getHermanos()
      if (res) setData(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const filtered = data.filter(h => 
    (h.nombre_l || '').toLowerCase().includes(search.toLowerCase()) ||
    (h.codigo_l || '').includes(search) ||
    (h.sup_sector_l || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-user-tie"></i> Gestión de Hermanos Líderes</h2>
        <div className="mod-acts">
           <button className="btn btn-ok" onClick={() => alert("Formulario para nuevo líder (Modal)")}><i className="fas fa-plus"></i> NUEVO LÍDER</button>
           <button className="btn btn-pr" onClick={loadData}><i className="fas fa-sync"></i> REFRESCAR</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '15px' }}>
        <div className="ct"><i className="fas fa-search"></i> BÚSQUEDA RÁPIDA</div>
        <div className="fg">
           <input 
             type="text" 
             className="fc" 
             placeholder="Buscar por nombre, código o sector..." 
             style={{ padding: '15px', fontSize: '15px', border: '1.5px solid var(--brd)' }}
             value={search}
             onChange={e => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="sg">
        <div className="sc g"><div className="sc-ico"><i className="fas fa-id-card"></i></div><div className="sc-v">{data.length}</div><div className="sc-l">LÍDERES REGISTRADOS</div></div>
        <div className="sc i"><div className="sc-ico"><i className="fas fa-map-marker-alt"></i></div><div className="sc-v">{[...new Set(data.map(h => h.sup_sector_l))].length}</div><div className="sc-l">SECTORES ACTIVOS</div></div>
      </div>

      <div className="table-wrap">
        <table className="pro-table">
          <thead>
            <tr>
              <th>Cód.</th>
              <th>Nombre Completo del Líder</th>
              <th>Sector / Zona / Área</th>
              <th>Anfitrión / Lugar de Reunión</th>
              <th>Estado</th>
              <th style={{ textAlign: 'center' }}>Gestión</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-circle-notch fa-spin"></i> Cargando base de datos...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-user-times" style={{ fontSize: '30px', color: 'var(--tx3)' }}></i><p>No se encontraron resultados para "{search}".</p></td></tr>
            ) : (
              filtered.map(h => (
                <tr key={h.id}>
                  <td style={{ fontWeight: '900', color: 'var(--pr)' }}>{h.codigo_l}</td>
                  <td><b>{h.nombre_l}</b><div style={{ fontSize: '10px', color: 'var(--tx2)' }}>Pastor de Zona: {h.pastor_zona || '—'}</div></td>
                  <td>
                    <span className="stat-pill" style={{ background: 'rgba(41,128,185,0.08)', color: 'var(--inf)', fontSize: '10px', fontWeight: '800' }}>{h.sup_sector_l}</span> • 
                    <span className="stat-pill" style={{ background: 'rgba(14,102,85,0.08)', color: 'var(--tl)', fontSize: '10px', fontWeight: '800' }}>{h.sup_area_l}</span>
                  </td>
                  <td style={{ fontSize: '12px' }}>
                    <div style={{ fontWeight: '700' }}>{h.anfitrion}</div>
                    <div style={{ color: 'var(--tx2)', fontSize: '11px' }}>{h.direccion}</div>
                  </td>
                  <td style={{ textAlign: 'center' }}><span className="stat-pill pill-ok">ACTIVO</span></td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                      <button className="tb-btn" title="Editar"><i className="fas fa-edit"></i></button>
                      <button className="tb-btn" title="Privilegios"><i className="fas fa-crown"></i></button>
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
