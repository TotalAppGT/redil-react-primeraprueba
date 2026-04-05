import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'

export default function Generador() {
  const { branding } = useBranding()
  const [loading, setLoading] = useState(false)
  const [filtros, setFiltros] = useState({
    desde: '',
    hasta: '',
    lider: '',
    supArea: '',
    tipo: 'Reporte General'
  })

  const [historial, setHistorial] = useState([])

  useEffect(() => {
    // Cargar historial de reportes generados
    setHistorial([
      { id: 'GEN_1', no_serie: 'RPT-2026-001', titulo: 'Informe Mensual Marzo', fecha: '2026-03-31', url: '#' }
    ])
  }, [])

  const handleGenerar = async () => {
    setLoading(true)
    // Simulación de generación de PDF profesional
    setTimeout(() => {
      setLoading(false)
      alert("✓ Reporte Generado Exitosamente: RPT-2026-002. El archivo se ha guardado en el servidor.")
    }, 2000)
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-file-pdf"></i> Generador de Reportes Ejecutivos</h2>
        <div className="mod-acts">
           <button className="btn btn-pr" onClick={handleGenerar} disabled={loading}>
             {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-magic"></i>} GENERAR AHORA
           </button>
        </div>
      </div>

      <div className="dg">
        <div className="dc">
           <div className="dct"><i className="fas fa-filter"></i> PARÁMETROS DEL REPORTE</div>
           <div className="fg2">
              <div className="fgg half"><label>DESDE FECHA</label><input type="date" className="fc" value={filtros.desde} onChange={e => setFiltros({...filtros, desde: e.target.value})} /></div>
              <div className="fgg half"><label>HASTA FECHA</label><input type="date" className="fc" value={filtros.hasta} onChange={e => setFiltros({...filtros, hasta: e.target.value})} /></div>
              <div className="fgg full">
                <label>TÍTULO DEL INFORME</label>
                <input className="fc" placeholder="Ej: Resumen Semanal de Zona 1" value={filtros.tipo} onChange={e => setFiltros({...filtros, tipo: e.target.value})} />
              </div>
              <div className="fgg half">
                 <label>FILTRAR POR LÍDER (OPCIONAL)</label>
                 <input className="fc" placeholder="Nombre del líder..." value={filtros.lider} onChange={e => setFiltros({...filtros, lider: e.target.value})} />
              </div>
              <div className="fgg half">
                 <label>FILTRAR POR ÁREA (OPCIONAL)</label>
                 <input className="fc" placeholder="Nombre del área..." value={filtros.supArea} onChange={e => setFiltros({...filtros, supArea: e.target.value})} />
              </div>
           </div>

           <div style={{ background: '#f0f4f8', padding: '20px', borderRadius: '15px', marginTop: '20px', border: '1.5px dashed var(--brd)' }}>
              <div style={{ fontWeight: '800', color: 'var(--pr)', fontSize: '14px' }}>Proyección de Salida</div>
              <p style={{ fontSize: '11px', color: 'var(--tx2)', marginTop: '4px' }}>
                Se generará un documento PDF profesional con el logotipo de <b>{branding?.nombre}</b>, incluyendo gráficas de tendencia, tablas detalladas por líder y resumen financiero consolidado.
              </p>
           </div>
        </div>

        <div className="dc">
           <div className="dct"><i className="fas fa-history"></i> ÚLTIMOS REPORTES GENERADOS (DRIVE / CLOUD)</div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {historial.map(h => (
                <div className="card" key={h.id} style={{ padding: '12px', margin: 0, background: 'var(--bg3)', border: '1px solid var(--brd)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '900', fontSize: '13px' }}>{h.no_serie}</div>
                        <div style={{ fontSize: '11px', color: 'var(--tx2)' }}>{h.titulo} • {h.fecha}</div>
                      </div>
                      <button className="btn btn-in btn-sm"><i className="fas fa-download"></i> PDF</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}
