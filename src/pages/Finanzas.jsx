import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'

export default function Finanzas() {
  const { branding } = useBranding()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    desde: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    hasta: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: res, error } = await supabaseService.getDiezmos(filtros.desde, filtros.hasta)
      if (res) setData(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const fmtQ = (n) => 'Q ' + parseFloat(n || 0).toLocaleString('es-GT', { minimumFractionDigits: 2 })
  const total = data.reduce((s, x) => s + parseFloat(x.monto_q || 0), 0)

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-coins"></i> Control Diezmos y Ofrendas</h2>
        <div className="mod-acts">
           <button className="btn btn-ok" onClick={() => alert("Función para nuevo registro (Modal)")}>
             <i className="fas fa-plus"></i> NUEVO REGISTRO
           </button>
           <button className="btn btn-pr" onClick={loadData}>
             <i className="fas fa-sync"></i> REFRESCAR
           </button>
        </div>
      </div>

      <div className="sg">
        <div className="sc p">
          <div className="sc-ico"><i className="fas fa-chart-line"></i></div>
          <div className="sc-v">{fmtQ(total)}</div>
          <div className="sc-l">RECAUDACIÓN TOTAL (PERÍODO)</div>
        </div>
        <div className="sc g">
          <div className="sc-ico"><i className="fas fa-receipt"></i></div>
          <div className="sc-v">{data.length}</div>
          <div className="sc-l">REGISTROS IDENTIFICADOS</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '15px' }}>
        <div className="ct"><i className="fas fa-filter"></i> FILTROS DE BÚSQUEDA</div>
        <div className="fg2">
           <div className="fgg half">
             <label>DESDE</label>
             <input type="date" className="fc" value={filtros.desde} onChange={e => setFiltros({...filtros, desde: e.target.value})} />
           </div>
           <div className="fgg half">
             <label>HASTA</label>
             <input type="date" className="fc" value={filtros.hasta} onChange={e => setFiltros({...filtros, hasta: e.target.value})} />
           </div>
        </div>
        <button className="btn btn-pr" style={{ width: '100%', marginTop: '15px' }} onClick={loadData}>
           APLICAR FILTROS DE FECHA
        </button>
      </div>

      <div className="table-wrap">
        <table className="pro-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre Completo</th>
              <th>Tipo</th>
              <th>Entrega</th>
              <th>Monto (Q)</th>
              <th>Descripción</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-circle-notch fa-spin"></i> Cargando base de datos...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-coins" style={{ fontSize: '30px', color: 'var(--tx3)' }}></i><p>Sin registros en este rango de fechas.</p></td></tr>
            ) : (
              data.map(x => (
                <tr key={x.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{x.fecha}</td>
                  <td><b>{x.nombre}</b><div style={{ fontSize: '10px', color: 'var(--tx2)' }}>{x.telefono}</div></td>
                  <td><span className="stat-pill" style={{ background: x.tipo === 'Diezmo' ? 'rgba(37,99,168,0.1)' : 'rgba(39,174,96,0.1)', color: x.tipo === 'Diezmo' ? 'var(--pr)' : 'var(--ok)' }}>{x.tipo}</span></td>
                  <td>{x.grupo || 'Física'}</td>
                  <td style={{ fontWeight: '900', color: 'var(--pr)' }}>{fmtQ(x.monto_q)}</td>
                  <td style={{ fontSize: '11px', color: 'var(--tx2)', maxWidth: '200px' }}>{x.descripcion}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                      <button className="tb-btn" style={{ width: '28px', height: '28px' }} title="Editar"><i className="fas fa-edit"></i></button>
                      <button className="tb-btn" style={{ width: '28px', height: '28px', color: 'var(--err)' }} title="Eliminar"><i className="fas fa-trash"></i></button>
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
