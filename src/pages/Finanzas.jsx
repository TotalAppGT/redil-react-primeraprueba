import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'

export default function Finanzas() {
  const { branding } = useBranding()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Datos mock para visualización inicial premium mientras sincroniza Supabase
  const mockData = [
    { id: 'TRX-00192', sede: 'Sede Central (Alfolí)', concepto: 'Diezmos Gral.', monto: 4500.00, fecha: 'Hoy, 10:15 AM', estado: 'Conciliado' },
    { id: 'TRX-00191', sede: 'Zona Norte', concepto: 'Ofrenda Misionera', monto: 1200.00, fecha: 'Ayer', estado: 'Conciliado' },
    { id: 'TRX-00190', sede: 'Transferencia Banco', concepto: 'Donación Anónima', monto: 800.00, fecha: '01 Abr, 2026', estado: 'Pendiente' }
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: res } = await supabaseService.getDiezmos()
      if (res && res.length > 0) {
        // Formatear datos de Supabase al estilo del Dashboard
        const formatted = res.map(x => ({
          id: x.id.slice(0,8).toUpperCase(),
          sede: x.grupo || 'Sede Central',
          concepto: x.tipo || 'Ingreso Gral.',
          monto: x.monto_q,
          fecha: x.fecha,
          estado: 'Conciliado' // Por defecto si ya está en la tabla de diezmos
        }))
        setData(formatted)
      } else {
        setData(mockData) // Mostrar mock si no hay datos reales aún
      }
    } catch (e) {
      console.error(e)
      setData(mockData)
    } finally {
      setLoading(false)
    }
  }

  const fmtQ = (n) => 'Q ' + parseFloat(n || 0).toLocaleString('es-GT', { minimumFractionDigits: 2 })

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-wallet" style={{ color: 'var(--ac)' }}></i> Módulo de Finanzas y Diezmos</h2>
        <div className="mod-acts">
           <button className="btn btn-pr" style={{ background: '#1a3a5c' }} onClick={() => alert("Generando PDF...")}>
             <i className="fas fa-file-pdf"></i> Informe Financiero (PDF)
           </button>
           <button className="btn btn-ok" style={{ background: '#27ae60' }}>
             <i className="fas fa-plus"></i> Registrar Ingreso
           </button>
        </div>
      </div>

      <div className="sg" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="sc" style={{ borderLeft: '6px solid #27ae60' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(39,174,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <i className="fas fa-coins" style={{ color: '#27ae60', fontSize: '20px' }}></i>
            </div>
            <div>
               <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--tx)' }}>Q 45,900</div>
               <div style={{ fontSize: '11px', color: 'var(--tx2)', fontWeight: '700' }}>Acumulado del Mes</div>
            </div>
          </div>
        </div>

        <div className="sc" style={{ borderLeft: '6px solid #e8a020' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(232,160,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <i className="fas fa-hand-holding-usd" style={{ color: '#e8a020', fontSize: '20px' }}></i>
            </div>
            <div>
               <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--tx)' }}>Q 12,050</div>
               <div style={{ fontSize: '11px', color: 'var(--tx2)', fontWeight: '700' }}>Ingresado esta semana</div>
            </div>
          </div>
        </div>

        <div className="sc" style={{ borderLeft: '6px solid #e74c3c' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(231,76,60,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <i className="fas fa-file-invoice-dollar" style={{ color: '#e74c3c', fontSize: '20px' }}></i>
            </div>
            <div>
               <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--tx)' }}>8</div>
               <div style={{ fontSize: '11px', color: 'var(--tx2)', fontWeight: '700' }}>Aportes sin conciliar</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden', marginTop: '20px' }}>
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr style={{ background: '#f0f4f8' }}>
                <th style={{ color: 'var(--tx2)', fontSize: '11px' }}>TRANSACCIÓN ID</th>
                <th style={{ color: 'var(--tx2)', fontSize: '11px' }}>ORIGEN / SEDE</th>
                <th style={{ color: 'var(--tx2)', fontSize: '11px' }}>CONCEPTO</th>
                <th style={{ color: 'var(--tx2)', fontSize: '11px' }}>MONTO</th>
                <th style={{ color: 'var(--tx2)', fontSize: '11px' }}>FECHA</th>
                <th style={{ color: 'var(--tx2)', fontSize: '11px', textAlign: 'center' }}>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--tx2)', fontWeight: '600' }}>#{x.id}</td>
                  <td style={{ fontWeight: '700' }}>{x.sede}</td>
                  <td style={{ color: 'var(--tx2)' }}>{x.concepto}</td>
                  <td style={{ fontWeight: '800' }}>{fmtQ(x.monto)}</td>
                  <td style={{ color: 'var(--tx2)' }}>{x.fecha}</td>
                  <td style={{ textAlign: 'center' }}>
                     <span className={`stat-pill ${x.estado === 'Conciliado' ? 'pill-ok' : 'pill-err'}`} style={{ borderRadius: '6px', fontSize: '10px', textTransform: 'uppercase' }}>
                        {x.estado}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
