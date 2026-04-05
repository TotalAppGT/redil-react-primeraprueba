import React, { useState } from 'react'

export default function Generador() {
  const [activeTab, setActiveTab] = useState('nuevo')

  // Mock data basado en los encabezados reales: ID_Reporte, Fecha Inicio, Fecha Fin, Total Ofrenda, Total Asistencia, Titulo de Reporte, Archivo Generado, No Serie, Mes Reporte, Ano Reporte, Filtro Lider, Filtro Sup Sector, Filtro Sup Area, Filtro Pastor Zona
  const [generados, setGenerados] = useState([
    { id: '1', titulo: 'Consolidado Marzo 2026', periodo: '01 Mar - 31 Mar', totalOfrenda: 45000, totalAsist: 1200, serie: 'R-2026-03', fecha: '2026-04-01' },
    { id: '2', titulo: 'Informe Sede Central', periodo: '24 Abr - 30 Abr', totalOfrenda: 12800, totalAsist: 450, serie: 'R-2026-04-A', fecha: 'Hoy' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-file-invoice"></i> Generador Pro de Reportes Consolidados</h2>
        <div className="mod-acts">
           <button 
             className={`btn ${activeTab === 'nuevo' ? 'btn-pr' : 'btn-ol'}`} 
             onClick={() => setActiveTab('nuevo')}
           >
             <i className="fas fa-magic"></i> Nuevo Reporte
           </button>
           <button 
             className={`btn ${activeTab === 'historial' ? 'btn-pr' : 'btn-ol'}`} 
             onClick={() => setActiveTab('historial')}
           >
             <i className="fas fa-history"></i> Historial Generados
           </button>
        </div>
      </div>

      {activeTab === 'nuevo' ? (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', animation: 'slUp 0.3s ease' }}>
          <div className="ct"><i className="fas fa-filter"></i> Paso 1: Configurar Filtros del Reporte</div>
          <form className="fg2" onSubmit={(e) => e.preventDefault()}>
            <div className="fgg half">
              <label>Título del Reporte</label>
              <input type="text" className="fc" placeholder="Ej: Reporte Trimestral Q1" />
            </div>
            <div className="fgg half">
              <label>Fecha de Inicio del Período</label>
              <input type="date" className="fc" />
            </div>
            <div className="fgg half">
              <label>Filtro por Pastor de Zona</label>
              <select className="fc"><option>Todos los pastores</option></select>
            </div>
            <div className="fgg half">
              <label>Filtro por Supervisor de Área</label>
              <select className="fc"><option>Todas las áreas</option></select>
            </div>
            <div className="fgg half">
              <label>Incluir Gráficas en PDF</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', marginTop: '5px' }}>
                <input type="checkbox" defaultChecked /> <span>Sí, incluir gráficas de rendimiento</span>
              </label>
            </div>
            <div className="fgg half">
              <label>Opciones de Salida</label>
              <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                 <button className="btn btn-pr" style={{ flex: 1 }}><i className="fas fa-file-pdf"></i> Generar PDF</button>
                 <button className="btn btn-ok" style={{ flex: 1 }}><i className="fas fa-file-excel"></i> Generar Excel</button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="card" style={{ padding: '0', animation: 'slUp 0.3s ease' }}>
           <div className="table-wrap">
            <table className="pro-table">
               <thead>
                 <tr>
                    <th>Num. Serie</th>
                    <th>Título de Reporte</th>
                    <th>Período</th>
                    <th>Resultado</th>
                    <th>Generado el</th>
                    <th>Acciones</th>
                 </tr>
               </thead>
               <tbody>
                  {generados.map(g => (
                    <tr key={g.id}>
                      <td><span className="stat-pill" style={{ background: 'var(--bg3)' }}>{g.serie}</span></td>
                      <td><strong>{g.titulo}</strong></td>
                      <td>{g.periodo}</td>
                      <td>
                        <div style={{ fontSize: '11px', color: 'var(--ok)', fontWeight: '800' }}>Q {g.totalOfrenda.toLocaleString()}</div>
                        <div style={{ fontSize: '11px', color: 'var(--pr)', fontWeight: '800' }}>{g.totalAsist} Pers.</div>
                      </td>
                      <td>{g.fecha}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button className="tb-btn" title="Descargar"><i className="fas fa-download"></i></button>
                          <button className="tb-btn" title="Eliminar" style={{ color: 'var(--err)' }}><i className="fas fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
               </tbody>
            </table>
           </div>
        </div>
      )}
    </div>
  )
}
