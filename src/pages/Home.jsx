import React from 'react'
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
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function Home() {
  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Ingresos Mensuales',
        data: [12000, 19000, 15000, 22000, 18000, 24000, 26000],
        backgroundColor: '#1a3a5c',
        borderRadius: 6,
      },
      {
        label: 'Proyección Ideal',
        data: [10000, 15000, 14000, 20000, 20000, 22000, 27000],
        backgroundColor: '#e8a020',
        borderRadius: 6,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true } }
    },
    scales: {
      y: { beginAtZero: true, grid: { borderDash: [4, 4] } },
      x: { grid: { display: false } }
    }
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-chart-pie"></i> Dashboard General</h2>
        <div className="mod-acts">
           <select className="fc" style={{ width: '150px', fontSize: '12px', height: '35px' }}>
              <option>Este Mes</option>
              <option>Esta Semana</option>
              <option>Trimestre</option>
           </select>
          <button className="btn btn-pr btn-sm"><i className="fas fa-print"></i> Imprimir</button>
        </div>
      </div>

      {/* KPIs Grid - 8 Tarjetas como el original */}
      <div className="sg">
        <div className="sc">
          <div className="sc-ico"><i className="fas fa-user-tie"></i></div>
          <div className="sc-v">142</div>
          <div className="sc-l">Líderes</div>
        </div>
        <div className="sc o">
          <div className="sc-ico"><i className="fas fa-home"></i></div>
          <div className="sc-v">385</div>
          <div className="sc-l">Grupos Realizados</div>
        </div>
        <div className="sc g">
          <div className="sc-ico"><i className="fas fa-bullseye"></i></div>
          <div className="sc-v">94%</div>
          <div className="sc-l">Meta Grupos</div>
        </div>
        <div className="sc">
          <div className="sc-ico"><i className="fas fa-users"></i></div>
          <div className="sc-v">1,245</div>
          <div className="sc-l">Asistencia Total</div>
        </div>
        <div className="sc p">
          <div className="sc-ico"><i className="fas fa-hand-holding-usd"></i></div>
          <div className="sc-v">Q 15,200</div>
          <div className="sc-l">Ofrenda Total</div>
        </div>
        <div className="sc i">
          <div className="sc-ico"><i className="fas fa-heart"></i></div>
          <div className="sc-v">24</div>
          <div className="sc-l">Convertidos</div>
        </div>
        <div className="sc t">
          <div className="sc-ico"><i className="fas fa-pray"></i></div>
          <div className="sc-v">12</div>
          <div className="sc-l">Reconciliados</div>
        </div>
        <div className="sc r">
          <div className="sc-ico"><i className="fas fa-exclamation-triangle"></i></div>
          <div className="sc-v">5</div>
          <div className="sc-l">Pendientes</div>
        </div>
      </div>

      <div className="dg">
        <div className="dc">
          <div className="dct"><i className="fas fa-chart-line"></i> Asistencia & Ofrendas Mensuales</div>
          <div className="chart-area" style={{ position: 'relative', height: '280px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="dc">
          <div className="dct"><i className="fas fa-history"></i> Actividad Reciente</div>
          <div className="ri">
             <div className="rdot"></div>
             <div className="rinfo">
               <div className="rn">Nuevo Informe Entregado</div>
               <div className="rm">Zona Central - Pr. Juan</div>
             </div>
             <div className="rv">Hace 5m</div>
          </div>
          <div className="ri">
             <div className="rdot" style={{ background: 'var(--ok)' }}></div>
             <div className="rinfo">
               <div className="rn">Aporte Registrado</div>
               <div className="rm">Sede Norte</div>
             </div>
             <div className="rv">Hace 1hr</div>
          </div>
          <div className="ri">
             <div className="rdot" style={{ background: 'var(--inf)' }}></div>
             <div className="rinfo">
               <div className="rn">Usuario Administrador Creado</div>
               <div className="rm">Por: Súper Admin</div>
             </div>
             <div className="rv">Ayer</div>
          </div>
        </div>
      </div>
    </div>
  )
}
