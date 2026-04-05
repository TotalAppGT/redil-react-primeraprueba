import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'

export default function Asistencia() {
  const { branding } = useBranding()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    desde: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    hasta: new Date().toISOString().split('T')[0],
    pendientes: false
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: res, error } = await supabaseService.getReportes(filtros)
      if (res) setData(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const totals = data.reduce((acc, r) => {
    acc.asistencia += parseInt(r.total_asist || 0)
    acc.hnos += parseInt(r.hermanos || 0)
    acc.amigos += parseInt(r.amigos || 0)
    acc.ofrenda += parseFloat(r.total_ofrenda || 0)
    if (r.ofrenda_recibida === 'Pendiente') acc.pendientes++
    return acc
  }, { asistencia: 0, hnos: 0, amigos: 0, ofrenda: 0, pendientes: 0 })

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-file-signature"></i> Control de Asistencia y Reportes</h2>
        <div className="mod-acts">
           <button className="btn btn-ok" onClick={() => alert("Historial completo / Filtros avanzados")}><i className="fas fa-filter"></i> FILTRAR</button>
           <button className="btn btn-pr" onClick={loadData}><i className="fas fa-sync"></i> RECARGAR</button>
        </div>
      </div>

      <div className="sg" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="sc g"><div className="sc-ico"><i className="fas fa-users"></i></div><div className="sc-v">{totals.asistencia}</div><div className="sc-l">ASISTENCIA GRUPO FAMILIAR</div></div>
        <div className="sc p"><div className="sc-ico"><i className="fas fa-user-check"></i></div><div className="sc-v">{totals.hnos}</div><div className="sc-l">TOTAL HERMANOS</div></div>
        <div className="sc o"><div className="sc-ico"><i className="fas fa-user-plus"></i></div><div className="sc-v">{totals.amigos}</div><div className="sc-l">NUEVOS AMIGOS / VISITAS</div></div>
        <div className="sc r"><div className="sc-ico"><i className="fas fa-exclamation-triangle"></i></div><div className="sc-v">{totals.pendientes}</div><div className="sc-l">OFRENDAS PENDIENTES</div></div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Líder / Cód.</th>
                <th>Fecha</th>
                <th>AGF</th>
                <th>H</th>
                <th>Am</th>
                <th>Ofrenda Total</th>
                <th style={{ textAlign: 'center' }}>Estado Ofrenda</th>
                <th style={{ textAlign: 'center' }}>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-circle-notch fa-spin"></i> Sincronizando reportes...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-file-alt" style={{ fontSize: '30px', color: 'var(--tx3)' }}></i><p>No hay reportes registrados para este período.</p></td></tr>
              ) : (
                data.map(r => (
                  <tr key={r.id}>
                    <td><b>{r.lider}</b><div style={{ fontSize: '10px', color: 'var(--tx2)' }}>Cód: {r.codigo}</div></td>
                    <td style={{ whiteSpace: 'nowrap' }}>{r.fecha}</td>
                    <td style={{ fontWeight: '900', color: 'var(--pr)', textAlign: 'center' }}>{r.total_asist}</td>
                    <td style={{ textAlign: 'center' }}>{r.hermanos}</td>
                    <td style={{ textAlign: 'center' }}>{r.amigos}</td>
                    <td style={{ fontWeight: '800', color: '#b7770d' }}>Q {parseFloat(r.total_ofrenda || 0).toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>
                       <span className={`stat-pill ${r.ofrenda_recibida === 'Pendiente' ? 'pill-err' : 'pill-ok'}`}>
                          {r.ofrenda_recibida === 'Pendiente' ? '⚠ PENDIENTE' : '✓ RECIBIDA'}
                       </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="tb-btn" title="Ver detalle completo" onClick={() => alert("Modal de detalle para reporte: " + r.id)}>
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
