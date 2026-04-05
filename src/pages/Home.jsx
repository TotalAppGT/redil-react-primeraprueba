import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  LineController,
  BarController
} from 'chart.js'
import { useBranding } from '../context/BrandingContext'
import { supabaseService } from '../services/supabaseService'

// Registrar controladores necesarios para gráficas mixtas
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  LineController,
  BarController
)

export default function Home() {
  const { branding } = useBranding()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    asistencia: 0,
    ofrenda: 0,
    pendientes: 0,
    reportes: 0,
    lideres: 0,
    seguimientos: 0
  })

  const [recentData, setRecentData] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Cargar reportes del último mes aprox
      const { data: rpts } = await supabaseService.getReportes()
      const { data: lids } = await supabaseService.getHermanos()
      
      if (rpts) {
        setRecentData(rpts.slice(0, 10))
        const totals = rpts.reduce((acc, r) => {
          acc.asistencia += parseInt(r.total_asist || 0)
          acc.ofrenda += parseFloat(r.total_ofrenda || 0)
          if (r.ofrenda_recibida === 'Pendiente') acc.pendientes++
          acc.reportes++
          return acc
        }, { asistencia: 0, ofrenda: 0, pendientes: 0, reportes: 0 })
        
        setStats({
          ...totals,
          lideres: lids?.length || 0,
          seguimientos: 15 // Mock for now
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const chartData = {
    labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    datasets: [
      {
        label: 'Asistencia GF',
        data: [120, 190, 300, 500, 240, 380, 450],
        fill: true,
        backgroundColor: 'rgba(37, 99, 168, 0.1)',
        borderColor: 'var(--pr)',
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: 'var(--pr)'
      },
      {
        label: 'Meta de Grupos',
        data: [407, 407, 407, 407, 407, 407, 407],
        borderColor: 'var(--ac)',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        type: 'line'
      }
    ],
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-chart-pie" style={{ color: 'var(--ac)' }}></i> Dashboard REDIL v6.2 PRO</h2>
        <div className="mod-acts">
           <button className="btn btn-pr" onClick={loadDashboardData}><i className="fas fa-sync"></i> ACTUALIZAR DATA</button>
        </div>
      </div>

      <div className="sg">
        <div className="sc g"><div className="sc-ico"><i className="fas fa-users"></i></div><div className="sc-v">{stats.asistencia}</div><div className="sc-l">ASISTENCIA TOTAL</div></div>
        <div className="sc o"><div className="sc-ico"><i className="fas fa-coins"></i></div><div className="sc-v">Q {stats.ofrenda.toFixed(2)}</div><div className="sc-l">OFRENDA RECAUDADA</div></div>
        <div className="sc r"><div className="sc-ico"><i className="fas fa-clock"></i></div><div className="sc-v">{stats.pendientes}</div><div className="sc-l">REPORTE PENDIENTES</div></div>
        <div className="sc p"><div className="sc-ico"><i className="fas fa-id-card"></i></div><div className="sc-v">{stats.lideres}</div><div className="sc-l">HERMANOS LÍDERES</div></div>
      </div>

      <div className="dg">
        <div className="dc">
           <div className="dct"><i className="fas fa-chart-area"></i> TENDENCIA DE CRECIMIENTO SEMANAL</div>
           <p style={{ fontSize: '11px', color: 'var(--tx2)', marginBottom: '15px' }}>Proyección basada en reportes de asistencia vs meta mensual de <b>{branding?.metaGrupos || '407'}</b> grupos.</p>
           <div className="chart-area">
             <Line data={chartData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} />
           </div>
        </div>
        
        <div className="dc">
           <div className="dct"><i className="fas fa-history"></i> ACTIVIDAD RECIENTE</div>
           <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
              {recentData.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--tx3)' }}>Sin actividad hoy.</div>
              ) : (
                recentData.map((r, i) => (
                  <div className="ri" key={r.id}>
                    <div className="rdot" style={{ background: r.ofrenda_recibida === 'Pendiente' ? 'var(--err)' : 'var(--ok)' }}></div>
                    <div className="rinfo">
                      <div className="rn">{r.lider}</div>
                      <div className="rm">{r.fecha} • Cód: {r.codigo}</div>
                    </div>
                    <div className="rv" style={{ color: r.total_asist > 10 ? 'var(--ok)' : 'var(--pr)' }}>{r.total_asist} Asist.</div>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '13px', background: 'linear-gradient(135deg, var(--tl), var(--pr))', color: '#fff', border: 'none' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '42px', opacity: 0.8 }}>⚡</div>
            <div>
               <div style={{ fontSize: '16px', fontWeight: '900' }}>Resumen del Sistema SaaS</div>
               <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '2px' }}>El sistema REDIL v6.2 está operando al 100% bajo la identidad de <b>{branding?.nombre || 'REDIL'}</b></p>
            </div>
         </div>
      </div>
    </div>
  )
}
