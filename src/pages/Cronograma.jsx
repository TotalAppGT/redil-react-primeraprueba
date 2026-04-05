import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'

export default function Cronograma() {
  const { branding } = useBranding()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: res, error } = await supabaseService.getCronograma()
      if (res) setData(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Ejemplo de servicios dinámicos del branding (o default)
  const servicios = branding?.servicios || ["Martes 7PM", "Jueves 7PM", "Domingo 9AM", "Domingo 11AM"]

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-calendar-check" style={{ color: 'var(--inf)' }}></i> Cronograma de Servicio Semanal</h2>
        <div className="mod-acts">
           <button className="btn btn-ok" onClick={() => alert("Asignar nuevo servicio (Modal)")}><i className="fas fa-plus"></i> ASIGNAR</button>
           <button className="btn btn-pr" onClick={loadData}><i className="fas fa-sync"></i> REFRESCAR</button>
        </div>
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, var(--pr) 0%, var(--pr2) 100%)', color: '#fff', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px' }}>
           <div style={{ fontSize: '42px', opacity: 0.8 }}>📅</div>
           <div>
              <div style={{ fontSize: '18px', fontWeight: '900' }}>Planificación de Servidores</div>
              <p style={{ fontSize: '13px', opacity: 0.8, marginTop: '4px' }}>Visualización de hermanos asignados a los servicios generales de esta semana.</p>
           </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '15px', padding: '0', overflow: 'hidden' }}>
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Hermano(a)</th>
                <th>Área / Privilegio</th>
                {servicios.map((s, idx) => <th key={idx} style={{ textAlign: 'center' }}>{s}</th>)}
                <th style={{ textAlign: 'center' }}>Estado</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={servicios.length + 4} style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-circle-notch fa-spin"></i> Cargando cronograma...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={servicios.length + 4} style={{ textAlign: 'center', padding: '100px' }}><i className="fas fa-calendar-alt" style={{ fontSize: '40px', color: 'var(--tx3)' }}></i><p>No hay asignaciones registradas para esta semana.</p></td></tr>
              ) : (
                data.map((h, i) => (
                  <tr key={h.id}>
                    <td><b>{h.hermano}</b></td>
                    <td><span className="stat-pill" style={{ background: 'rgba(41,128,185,0.1)', color: 'var(--inf)' }}>{h.servicio || h.privilegio}</span></td>
                    {servicios.map((s, idx) => (
                      <td key={idx} style={{ textAlign: 'center' }}>
                        {h[`servicio_${idx+1}`] === 'SI' ? (
                          <div style={{ color: 'var(--ok)', background: 'rgba(39,174,96,0.1)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: '1px solid var(--ok)' }}>
                            <i className="fas fa-check"></i>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--tx3)' }}>—</span>
                        )}
                      </td>
                    ))}
                    <td style={{ textAlign: 'center' }}>
                      <span className="stat-pill pill-ok">ACTIVO</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="tb-btn" style={{ margin: '0 auto' }}><i className="fas fa-ellipsis-v"></i></button>
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
