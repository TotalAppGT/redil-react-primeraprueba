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
        backgroundColor: '#1a3a5c', // var(--pr)
        borderRadius: 6,
      },
      {
        label: 'Proyección Ideal',
        data: [10000, 15000, 14000, 20000, 20000, 22000, 27000],
        backgroundColor: '#e8a020', // var(--ac)
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
        <h2><i className="fas fa-chart-pie"></i> Rendimiento General</h2>
        <div className="mod-acts">
          <button className="btn btn-pr"><i className="fas fa-download"></i> Descargar Reporte PDF</button>
          <button className="btn btn-ok"><i className="fas fa-plus"></i> Nuevo Registro</button>
        </div>
      </div>

      <div className="sg">
        <div className="sc b">
          <div className="sc-ico"><i className="fas fa-users"></i></div>
          <div className="sc-v">1,245</div>
          <div className="sc-l">Miembros Activos</div>
        </div>
        <div className="sc g">
          <div className="sc-ico"><i className="fas fa-check-circle"></i></div>
          <div className="sc-v">89%</div>
          <div className="sc-l">Asistencia Promedio</div>
        </div>
        <div className="sc o">
          <div className="sc-ico"><i className="fas fa-wallet"></i></div>
          <div className="sc-v">Q 15,200</div>
          <div className="sc-l">Ingresos Mensuales</div>
        </div>
        <div className="sc r">
          <div className="sc-ico"><i className="fas fa-user-minus"></i></div>
          <div className="sc-v">12</div>
          <div className="sc-l">Inactivos esta semana</div>
        </div>
      </div>

      <div className="dg">
        <div className="dc">
          <div className="dct"><i className="fas fa-chart-line"></i> Crecimiento Financiero (Total)</div>
          <div className="chart-area" style={{ position: 'relative', height: '240px' }}>
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
