import React, { useState } from 'react'

export default function Envio() {
  const [activeTab, setActiveTab] = useState('redactar')

  // Mock data basado en los encabezados reales: IDEnvio, Fecha Hora, Asunto Correo, Cuerpo Mensaje, Archivos a Enviar, Destinatarios, Estado, Rutas Reales PDF
  const [envios, setEnvios] = useState([
    { id: '1', fechaHora: '2026-04-05 09:00', asunto: 'Informe Mensual Marzo', destinatarios: 'lideres@iglesia.com', estado: 'Enviado', archivos: 'reporte_marzo.pdf' },
    { id: '2', fechaHora: '2026-04-03 14:30', asunto: 'Comunicado Urgente Semana Santa', destinatarios: 'pastores-zona@iglesia.com', estado: 'Enviado', archivos: '' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-paper-plane"></i> Centro de Envíos Masivos (Gmail API)</h2>
        <div className="mod-acts">
           <button 
             className={`btn ${activeTab === 'redactar' ? 'btn-pr' : 'btn-ol'}`} 
             onClick={() => setActiveTab('redactar')}
           >
             <i className="fas fa-edit"></i> Redactar Nuevo
           </button>
           <button 
             className={`btn ${activeTab === 'enviados' ? 'btn-pr' : 'btn-ol'}`} 
             onClick={() => setActiveTab('enviados')}
           >
             <i className="fas fa-history"></i> Historial Envíos
           </button>
        </div>
      </div>

      {activeTab === 'redactar' ? (
        <div className="card" style={{ maxWidth: '900px', margin: '0 auto', animation: 'slUp 0.3s ease' }}>
          <div className="ct"><i className="fas fa-envelope-open-text"></i> Paso 1: Configurar Mensaje</div>
          <form className="fg2" onSubmit={(e) => e.preventDefault()}>
            <div className="fgg full">
              <label>Asunto del Correo</label>
              <input type="text" className="fc" placeholder="Ej: Reporte Mensual de Grupos" />
            </div>
            <div className="fgg half">
              <label>Seleccionar Destinatarios</label>
              <select className="fc">
                <option>Todos los Líderes (142)</option>
                <option>Todos los Pastores de Zona (12)</option>
                <option>Solo Distritos Centrales (45)</option>
                <option>Lista Manual (Pegar correos)</option>
              </select>
            </div>
            <div className="fgg half">
              <label>Adjuntar Archivo Generado</label>
              <select className="fc">
                <option>Ninguno (Solo Mensaje)</option>
                <option>Último Reporte PDF</option>
                <option>Informe de Diezmos (Serie R-2026-03)</option>
              </select>
            </div>
            <div className="fgg full">
              <label>Cuerpo del Mensaje (HTML Soportado)</label>
              <textarea className="fc" rows="8" placeholder="Estimados líderes..."></textarea>
            </div>
            <div className="fgg full" style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                 <button className="btn btn-pr" style={{ flex: 1, height: '45px', fontSize: '14px' }}><i className="fas fa-paper-plane"></i> Enviar a Todos Ahora</button>
                 <button className="btn btn-ol"><i className="fas fa-eye"></i> Vista Previa</button>
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
                    <th>Fecha / Hora</th>
                    <th>Asunto del Correo</th>
                    <th>Destinatarios</th>
                    <th>Adjuntos</th>
                    <th>Estado</th>
                    <th>Reeviar</th>
                 </tr>
               </thead>
               <tbody>
                  {envios.map(e => (
                    <tr key={e.id}>
                      <td><span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pr)' }}>{e.fechaHora}</span></td>
                      <td><strong>{e.asunto}</strong></td>
                      <td style={{ fontSize: '11.5px', color: 'var(--tx2)' }}>{e.destinatarios}</td>
                      <td>{e.archivos ? <span className="stat-pill" style={{ background: 'var(--bg3)', fontSize: '10px' }}><i className="fas fa-file-pdf"></i> {e.archivos}</span> : '—'}</td>
                      <td><span className="stat-pill pill-ok">Enviado✓</span></td>
                      <td><button className="tb-btn"><i className="fas fa-sync"></i></button></td>
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
