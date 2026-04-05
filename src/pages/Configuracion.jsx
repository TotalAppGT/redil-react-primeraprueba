import React, { useState } from 'react'

export default function Configuracion() {
  const [config, setConfig] = useState({
    nombreEntidad: 'Iglesia Restauración',
    spreadsheetId: '1iLNbaqKwGRHGqRB1BJ0K1Sbyc53nD7uFD_UmVe91_Io',
    sistemaActivo: true,
    mensajeMantenimiento: 'El sistema se encuentra en mantenimiento programado. Por favor, intente más tarde.',
    colorPrincipal: '#1a3a5c',
    colorAcento: '#e8a020',
    moneda: 'Q (Quetzales)',
    metaGrupos: '407',
  })

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setConfig({ ...config, [e.target.name]: value })
  }

  const handleSave = (e) => {
    e.preventDefault()
    alert('Configuración maestra guardada con éxito.')
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-cog"></i> Configuración Maestra del Sistema</h2>
        <div className="mod-acts">
          <button className="btn btn-pr" onClick={handleSave}><i className="fas fa-save"></i> Guardar Cambios</button>
        </div>
      </div>

      <div className="dg">
        <div className="dc">
          <div className="dct"><i className="fas fa-toggle-on"></i> Control de Acceso (Switch Global)</div>
          <div style={{ padding: '10px 0' }}>
            <label className="switch-wrap" style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
               <div style={{ position: 'relative', width: '50px', height: '26px', background: config.sistemaActivo ? 'var(--ok)' : 'var(--tx3)', borderRadius: '20px', transition: '0.3s' }}>
                 <div style={{ position: 'absolute', left: config.sistemaActivo ? '26px' : '4px', top: '4px', width: '18px', height: '18px', background: '#fff', borderRadius: '50%', transition: '0.3s' }}></div>
                 <input 
                  type="checkbox" 
                  name="sistemaActivo" 
                  checked={config.sistemaActivo} 
                  onChange={handleChange} 
                  style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                />
               </div>
               <div>
                  <span style={{ fontWeight: '800', color: config.sistemaActivo ? 'var(--ok)' : 'var(--err)' }}>
                    {config.sistemaActivo ? 'SISTEMA ACTIVO' : 'SISTEMA EN MANTENIMIENTO'}
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--tx2)', marginTop: '2px' }}>Este interruptor apaga el acceso para todos los usuarios.</div>
               </div>
            </label>
            
            {!config.sistemaActivo && (
              <div style={{ marginTop: '15px', animation: 'slDown 0.3s ease' }}>
                <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--pr)' }}>Mensaje para los usuarios:</label>
                <textarea 
                  name="mensajeMantenimiento"
                  className="fc" 
                  rows="3" 
                  style={{ marginTop: '5px' }}
                  value={config.mensajeMantenimiento}
                  onChange={handleChange}
                ></textarea>
              </div>
            )}
          </div>

          <div style={{ marginTop: '25px' }}>
            <div className="dct"><i className="fas fa-database"></i> Conexión de Datos (Legado)</div>
            <div className="fgg" style={{ marginTop: '10px' }}>
              <label>Google Spreadsheet ID (Base de Datos)</label>
              <input 
                name="spreadsheetId"
                value={config.spreadsheetId}
                onChange={handleChange}
                className="fc" 
                placeholder="ID de la hoja de cálculo..."
              />
              <span style={{ fontSize: '10px', color: 'var(--tx3)' }}>Solo necesario si deseas sincronizar con Google Sheets antiguo.</span>
            </div>
          </div>
        </div>

        <div className="dc">
           <div className="dct"><i className="fas fa-paint-brush"></i> Identidad Corporativa (Branding)</div>
           <div className="fgg" style={{ marginTop: '15px' }}>
            <label>Nombre de la Organización</label>
            <input 
              name="nombreEntidad"
              value={config.nombreEntidad} 
              onChange={handleChange} 
              className="fc" 
            />
          </div>

          <div className="fgg" style={{ marginTop: '15px' }}>
            <label>Logotipo</label>
            <div className="drop-zone" style={{ padding: '20px' }}>
              <i className="fas fa-cloud-upload-alt" style={{ fontSize: '24px', color: 'var(--pr)' }}></i>
              <div style={{ fontSize: '12px', color: 'var(--pr)' }}>Subir logo .png o .jpg</div>
            </div>
          </div>

          <div className="fgg" style={{ marginTop: '15px' }}>
            <label>Meta Mensual de Grupos</label>
            <input 
              name="metaGrupos"
              type="number"
              value={config.metaGrupos} 
              onChange={handleChange} 
              className="fc" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
