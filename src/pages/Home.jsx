import React, { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useBranding } from '../context/BrandingContext'

// Registrar ChartJS de forma segura
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function Home() {
  const { branding } = useBranding()

  // Sincronización Profesional de Data para Gráficas
  const chartData = useMemo(() => ({
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Asistencia Total',
        data: [1200, 1900, 1500, 2200, 1800, 2400, 2600],
        backgroundColor: branding?.colorPr || '#1a3a5c',
        borderRadius: 8,
        barThickness: 25,
      },
      {
        label: 'Crecimiento Ofrendas (Q)',
        data: [10000, 15000, 14000, 20000, 20000, 22000, 27000],
        backgroundColor: branding?.colorAc || '#e8a020',
        borderRadius: 8,
        type: 'line',
        borderColor: branding?.colorAc || '#e8a020',
        borderWidth: 3,
        fill: false,
        pointRadius: 5,
        tension: 0.4
      }
    ]
  }), [branding]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 10, bottom: 0 } },
    plugins: {
      legend: { 
        position: 'bottom', 
        labels: { boxWidth: 10, usePointStyle: true, font: { weight: '800', size: 11 } } 
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(0,0,0,0.04)', borderDash: [5, 5] },
        ticks: { font: { weight: '700' } }
      },
      x: { 
        grid: { display: false },
        ticks: { font: { weight: '700' } }
      }
    }
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-chart-line"></i> Dashboard: {branding?.nombre || 'General'} </h2>
        <div className="mod-acts">
           <div className="btn btn-sm btn-ol" style={{ background: 'var(--bg3)', border: '1px solid var(--brd)' }}>
              Periodo: Este Mes <i className="fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
           </div>
           <button className="btn btn-pr btn-sm"><i className="fas fa-file-export"></i> Exportar Datos</button>
        </div>
      </div>

      <div className="sg" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <StatCard icon="user-tie" val="142" label="Líderes Activos" />
        <StatCard icon="home" val="385" label="Grupos Reportados" color="o" />
        <StatCard icon="bullseye" val="94%" label="Alcance de Meta" color="g" />
        <StatCard icon="users" val="1,245" label="Asistencia Total" />
        <StatCard icon="hand-holding-usd" val="Q 15,200" label="Diezmo / Ofrendas" color="p" />
        <StatCard icon="heart" val="24" label="Nuevos Creyentes" color="i" />
      </div>

      <div className="dg" style={{ marginTop: '5px' }}>
        <div className="dc">
          <div className="dct" style={{ color: branding?.colorPr }}><i className="fas fa-chart-bar"></i> Rendimiento Semanal Mixto</div>
          <div className="chart-area" style={{ position: 'relative', height: '300px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="dc">
          <div className="dct" style={{ color: branding?.colorPr }}><i className="fas fa-stream"></i> Bitácora en Vivo</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
             <ActivityItem title="Reporte Célula 102" desc="Líder: Juan Pérez" time="Hace 5m" />
             <ActivityItem title="Aporte Registrado" desc="Materia: Alfolí Central" time="Hace 1hr" color="o" />
             <ActivityItem title="Cronograma Actualizado" desc="Por: Admin Súper" time="Ayer" color="p" />
             <ActivityItem title="Usuario Creado" desc="Líder: Sara G." time="Ayer" color="i" />
             <ActivityItem title="Backup Finalizado" desc="Nube Cloud" time="2 días" color="g" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, val, label, color = '' }) {
  return (
    <div className={`sc ${color}`}>
       <div className="sc-ico"><i className={`fas fa-${icon}`}></i></div>
       <div className="sc-v">{val}</div>
       <div className="sc-l">{label}</div>
    </div>
  )
}

function ActivityItem({ title, desc, time, color = '' }) {
  const { branding } = useBranding()
  return (
    <div className="ri">
       <div className="rdot" style={{ background: color === 'o' ? 'var(--ac)' : color === 'p' ? 'var(--pur)' : color === 'i' ? 'var(--inf)' : color === 'g' ? 'var(--ok)' : 'var(--pr)' }}></div>
       <div className="rinfo">
         <div className="rn">{title}</div>
         <div className="rm">{desc}</div>
       </div>
       <div className="rv" style={{ fontSize: '11px', color: 'var(--tx3)' }}>{time}</div>
    </div>
  )
}
