import React, { useState } from 'react'

export default function ReporteDigital() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-mobile-alt"></i> Reporte Digital de Grupo</h2>
        <div className="mod-acts">
           <button className="btn btn-ok btn-sm"><i className="fas fa-link"></i> Abrir Versión Pública (PWA)</button>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '850px', margin: '0 auto', animation: 'slUp 0.3s ease' }}>
        
        {/* INDICADOR DE PASOS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 25px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '25px', left: '10%', width: '80%', height: '3px', background: 'var(--bg3)', zIndex: 1 }}>
             <div style={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%', height: '100%', background: 'var(--pr)', transition: '0.3s' }}></div>
          </div>
          {[1, 2, 3].map(step => (
            <div key={step} style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
               <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: activeStep >= step ? 'var(--pr)' : 'var(--tx3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontWeight: '800', transition: '0.3s' }}>{step}</div>
               <div style={{ fontSize: '10px', marginTop: '6px', fontWeight: '700', color: activeStep >= step ? 'var(--pr)' : 'var(--tx3)' }}>
                  {step === 1 ? 'IDENTIDAD' : step === 2 ? 'ASISTENCIA' : 'OFRENDA'}
               </div>
            </div>
          ))}
        </div>

        {activeStep === 1 && (
          <div className="fg2" style={{ animation: 'fdIn 0.3s ease' }}>
             <div className="fgg half"><label>Código de Líder</label><input type="text" className="fc" placeholder="L-001" /></div>
             <div className="fgg half"><label>Nombre del Líder</label><input type="text" className="fc" readOnly placeholder="Juan Pérez" /></div>
             <div className="fgg half"><label>Anfitrión</label><input type="text" className="fc" /></div>
             <div className="fgg half"><label>Fecha del Grupo</label><input type="date" className="fc" defaultValue={new Date().toISOString().split('T')[0]} /></div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="fg2" style={{ animation: 'fdIn 0.3s ease' }}>
             <div className="fgg half"><label>Hermanos Asistentes</label><input type="number" className="fc" placeholder="0" /></div>
             <div className="fgg half"><label>Amigos Invitados</label><input type="number" className="fc" placeholder="0" /></div>
             <div className="fgg half"><label>Niños</label><input type="number" className="fc" placeholder="0" /></div>
             <div className="fgg half"><label>Nuevos Convertidos</label><input type="number" className="fc" style={{ border: '2px solid var(--ok)' }} placeholder="0" /></div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="fg2" style={{ animation: 'fdIn 0.3s ease' }}>
             <div className="fgg half"><label>Ofrenda para Iglesia (Q)</label><input type="number" className="fc" placeholder="0.00" /></div>
             <div className="fgg half"><label>Ofrenda para Bus / Gastos (Q)</label><input type="number" className="fc" placeholder="0.00" /></div>
             <div className="fgg full"><label>Observaciones o Peticiones</label><textarea className="fc" rows="4"></textarea></div>
          </div>
        )}

        <div style={{ marginTop: '25px', display: 'flex', gap: '10px' }}>
          {activeStep > 1 && <button className="btn btn-ol" style={{ flex: 1 }} onClick={() => setActiveStep(activeStep - 1)}><i className="fas fa-arrow-left"></i> Anterior</button>}
          {activeStep < 3 ? (
            <button className="btn btn-pr" style={{ flex: 2 }} onClick={() => setActiveStep(activeStep + 1)}>Siguiente <i className="fas fa-arrow-right"></i></button>
          ) : (
            <button className="btn btn-ok" style={{ flex: 2 }}><i className="fas fa-paper-plane"></i> Finalizar y Enviar Reporte</button>
          )}
        </div>

      </div>
    </div>
  )
}
