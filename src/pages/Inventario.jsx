import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'

export default function Inventario() {
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
      // Simulación de carga de inventario desde Supabase
      const { data: res } = await supabaseService.getInventario()
      if (res) setData(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const filtered = data.filter(i => 
    (i.articulo || '').toLowerCase().includes(search.toLowerCase()) || 
    (i.codigo || '').includes(search)
  )

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-boxes" style={{ color: 'var(--ac)' }}></i> Control de Inventario y Activos</h2>
        <div className="mod-acts">
           <button className="btn btn-ok"><i className="fas fa-plus"></i> REGISTRAR ACTIVO</button>
           <button className="btn btn-pr" onClick={loadData}><i className="fas fa-sync"></i> RECARGAR</button>
        </div>
      </div>

      <div className="sg">
        <div className="sc g"><div className="sc-ico"><i className="fas fa-barcode"></i></div><div className="sc-v">{data.length}</div><div className="sc-l">ARTÍCULOS REGISTRADOS</div></div>
        <div className="sc p"><div className="sc-ico"><i className="fas fa-dollar-sign"></i></div><div className="sc-v">Q {data.reduce((s, x) => s + (x.valor || 0), 0).toLocaleString()}</div><div className="sc-l">VALOR TOTAL ESTIMADO</div></div>
      </div>

      <div className="card">
        <div className="ct"><i className="fas fa-search"></i> BUSCADOR POR CÓDIGO/NOMBRE</div>
        <input 
          className="fc" 
          placeholder="Escanee código de barras o escriba el nombre..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          style={{ padding: '15px' }}
        />
      </div>

      <div className="table-wrap">
        <table className="pro-table">
          <thead>
            <tr>
              <th>Cód.</th>
              <th>Artículo / Descripción</th>
              <th>Categoría</th>
              <th>Ubicación</th>
              <th>Estado Físico</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-circle-notch fa-spin"></i> Cargando inventario...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-box-open" style={{ fontSize: '30px', color: 'var(--tx3)' }}></i><p>No hay artículos en el inventario.</p></td></tr>
            ) : (
              filtered.map(x => (
                <tr key={x.id}>
                  <td>{x.codigo}</td>
                  <td><b>{x.articulo}</b><div style={{ fontSize: '10px', color: 'var(--tx2)' }}>{x.descripcion}</div></td>
                  <td><span className="stat-pill" style={{ background: 'rgba(37,99,168,0.1)', color: 'var(--pr)' }}>{x.categoria}</span></td>
                  <td>{x.ubicacion}</td>
                  <td><span className={`stat-pill ${x.estado === 'Excelente' ? 'pill-ok' : 'pill-err'}`}>{x.estado}</span></td>
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
    </div>
  )
}
