import React, { useState } from 'react'

export default function Configuracion() {
  const [config, setConfig] = useState({
    nombreEntidad: 'Iglesia Restauración',
    colorPrincipal: '#1a3a5c',
    colorAcento: '#e8a020',
    moneda: 'Q (Quetzales)',
  })

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value })
  }

  const handleSave = (e) => {
    e.preventDefault()
    alert('Configuración guardada. En el futuro, esto cambiará la base de datos de Supabase para este cliente.')
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-cog"></i> Configuración SaaS (Marca Blanca)</h2>
        <div className="mod-acts">
          <button className="btn btn-pr" onClick={handleSave}><i className="fas fa-save"></i> Guardar Cambios</button>
        </div>
      </div>

      <div className="card">
        <div className="ct"><i className="fas fa-paint-brush"></i> Personalización de Identidad</div>
        <form className="fg2" onSubmit={handleSave}>
          
          <div className="fgg half">
            <label>Nombre de la Iglesia / Colegio</label>
            <input 
              name="nombreEntidad"
              value={config.nombreEntidad} 
              onChange={handleChange} 
              className="fc" 
            />
          </div>

          <div className="fgg half">
            <label>Moneda del Sistema</label>
            <select name="moneda" value={config.moneda} onChange={handleChange} className="fc">
              <input type="text" className="fc" />
              <option>Q (Quetzales) - Local</option>
              <option>$ (USD) - Internacional</option>
              <option>$ (MXN) - México</option>
              <option>COP - Colombia</option>
            </select>
          </div>

          <div className="fgg half">
            <label>Color Principal de la Marca</label>
            <div style={{display: 'flex', gap: '10px'}}>
              <input 
                type="color" 
                name="colorPrincipal"
                value={config.colorPrincipal} 
                onChange={handleChange} 
                style={{ height: '38px', width: '50px', cursor: 'pointer', border: '1px solid var(--brd)', borderRadius: '4px' }}
              />
              <input type="text" className="fc" value={config.colorPrincipal} readOnly />
            </div>
          </div>

          <div className="fgg half">
            <label>Logotipo de la Organización</label>
            <div className="drop-zone" style={{ padding: '15px' }}>
              <i className="fas fa-cloud-upload-alt" style={{ fontSize: '24px', color:'var(--tx3)'}}></i>
              <div style={{ fontSize: '12px', marginTop:'5px', color:'var(--pr)'}}>Clic para subir o arrastrar imagen</div>
            </div>
          </div>

          <div className="fgg full" style={{ marginTop: '15px' }}>
            <div className="sect-title">Control de Módulos (Suscripción)</div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked className="perm-check" /> <span>Módulo de Asistencia</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked className="perm-check" /> <span>Módulo de Diezmos / Finanzas</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" className="perm-check" /> <span>Envío de PDFs por WhatsApp (Módulo Pro)</span>
              </label>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  )
}
