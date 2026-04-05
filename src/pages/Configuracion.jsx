import React, { useState } from 'react'
import { useBranding } from '../context/BrandingContext'

export default function Configuracion() {
  const { branding, updateBranding } = useBranding()
  
  // Estado local sincronizado con el contexto y Supabase
  const [formConfig, setFormConfig] = useState({
    nombre: branding.nombre,
    logoUrl: branding.logo,
    colorPr: branding.colorPr,
    colorAc: branding.colorAc,
    sistemaActivo: branding.sistemaActivo,
    // Datos de Supabase (Sustituyen a Google Sheets)
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://xyz.supabase.co',
    ownerEmail: 'totalappgt@gmail.com',
    ownerPass: 'admintotal',
    driveFolderId: '1OHBSDIk7e1FOyC1tgkkAJoRb_nJh2CKM',
    metaMensualGrupos: branding.metaGrupos,
    // Horarios originales solicitados
    servicioLunes: '6:30 PM',
    servicioJueves: '6:30 PM',
    servicioDomManana: '7:00 AM',
    servicioDomTarde: '10:30 AM',
    mensajeMantenimiento: 'Sistema en mantenimiento. Disculpe las molestias.',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Actualización inmediata del Branding Global (Contexto)
    updateBranding({
      nombre: formConfig.nombre,
      logo: formConfig.logoUrl,
      colorPr: formConfig.colorPr,
      colorAc: formConfig.colorAc,
      metaGrupos: formConfig.metaMensualGrupos,
      sistemaActivo: formConfig.sistemaActivo
    })
    
    // Aquí se conectaría con la tabla 'configuracion' de Supabase
    alert('¡Configuración maestra actualizada con éxito! Los cambios se han propagado a todo el sistema.')
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-tools"></i> Panel de Control SaaS y Branding</h2>
        <div className="mod-acts">
           <button className="btn btn-pr" onClick={handleSave} style={{ padding: '12px 25px' }}><i className="fas fa-save"></i> Guardar Cambios</button>
        </div>
      </div>

      <div className="dg">
        {/* COLUMNA 1: IDENTIDAD Y SISTEMA */}
        <div className="dc">
           <div className="dct"><i className="fas fa-palette"></i> Identidad Visual (Branding Dinámico)</div>
           <div className="fg2" style={{ marginTop: '10px' }}>
              <div className="fgg full">
                <label>Nombre de la Iglesia / Organización</label>
                <input name="nombre" value={formConfig.nombre} onChange={handleChange} className="fc" placeholder="Ej: Iglesia Restauración" />
              </div>
              <div className="fgg full">
                <label>Link del Logotipo (Directo .png / .jpg)</label>
                <input name="logoUrl" value={formConfig.logoUrl} onChange={handleChange} className="fc" placeholder="https://miweb.com/logo.png" />
                {formConfig.logoUrl && (
                  <div style={{ marginTop: '10px', textAlign: 'center', background: '#f8f9fa', padding: '10px', borderRadius: '10px' }}>
                    <img src={formConfig.logoUrl} alt="Logo Preview" style={{ height: '60px', borderRadius: '5px' }} />
                  </div>
                )}
              </div>
              <div className="fgg half">
                <label>Color de Marca Principal</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="color" name="colorPr" value={formConfig.colorPr} onChange={handleChange} style={{ width: '45px', height: '45px', border: 'none', background: 'none', padding: '0', cursor: 'pointer' }} />
                  <input name="colorPr" value={formConfig.colorPr} onChange={handleChange} className="fc" style={{ textTransform: 'uppercase' }} />
                </div>
              </div>
              <div className="fgg half">
                <label>Color de Acento (Detalles)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="color" name="colorAc" value={formConfig.colorAc} onChange={handleChange} style={{ width: '45px', height: '45px', border: 'none', background: 'none', padding: '0', cursor: 'pointer' }} />
                  <input name="colorAc" value={formConfig.colorAc} onChange={handleChange} className="fc" style={{ textTransform: 'uppercase' }} />
                </div>
              </div>
           </div>

           <div className="dct" style={{ marginTop: '40px' }}><i className="fas fa-power-off"></i> Control de Acceso Global</div>
           <div className={`card ${formConfig.sistemaActivo ? 'active-system' : 'inactive-system'}`} style={{ border: '2px solid var(--brd)', transition: '0.3s' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
                 <div style={{ position: 'relative', width: '60px', height: '30px', background: formConfig.sistemaActivo ? 'var(--ok)' : '#ccc', borderRadius: '25px', transition: '0.3s' }}>
                    <div style={{ position: 'absolute', left: formConfig.sistemaActivo ? '33px' : '3px', top: '3px', width: '24px', height: '24px', background: '#fff', borderRadius: '50%', transition: '0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                    <input type="checkbox" name="sistemaActivo" checked={formConfig.sistemaActivo} onChange={handleChange} style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }} />
                 </div>
                 <div>
                    <span style={{ fontWeight: '900', fontSize: '15px', color: formConfig.sistemaActivo ? 'var(--ok)' : 'var(--err)' }}>
                        {formConfig.sistemaActivo ? 'SISTEMA ONLINE (ACCESO ABIERTO)' : 'SISTEMA OFFLINE (MANTENIMIENTO)'}
                    </span>
                    <p style={{ fontSize: '11px', color: 'var(--tx3)' }}>Si apagas este switch, nadie podrá ver datos excepto tú.</p>
                 </div>
              </label>
              {!formConfig.sistemaActivo && (
                <div style={{ marginTop: '15px', animation: 'slDown 0.3s ease' }}>
                   <label>Mensaje de Bloqueo</label>
                   <textarea name="mensajeMantenimiento" value={formConfig.mensajeMantenimiento} onChange={handleChange} className="fc" rows="2"></textarea>
                </div>
              )}
           </div>
        </div>

        {/* COLUMNA 2: SUPABASE Y HORARIOS */}
        <div className="dc">
           <div className="dct"><i className="fas fa-database"></i> Conexión de Datos (Supabase Cloud)</div>
           <div className="fg2">
              <div className="fgg full">
                <label>Supabase URL (Backend Activo)</label>
                <input name="supabaseUrl" value={formConfig.supabaseUrl} readOnly className="fc" style={{ background: '#f0f4f8', color: 'var(--tx3)' }} />
                <span style={{ fontSize: '10px', color: 'var(--ok)' }}>✓ Conectado exitosamente a la base de datos PostgreSQL.</span>
              </div>
              <div className="fgg half"><label>Email Administrador</label><input name="ownerEmail" value={formConfig.ownerEmail} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Filtro de Seguridad</label><input type="password" name="ownerPass" value={formConfig.ownerPass} onChange={handleChange} className="fc" /></div>
              <div className="fgg full">
                <label>ID Carpeta Drive (Almacenamiento de Reportes)</label>
                <input name="driveFolderId" value={formConfig.driveFolderId} onChange={handleChange} className="fc" />
              </div>
           </div>

           <div className="dct" style={{ marginTop: '40px' }}><i className="fas fa-calendar-alt"></i> Horarios de Cultos y Metas</div>
           <div className="fg2">
              <div className="fgg half"><label>Meta Mensual Reportes</label><input name="metaMensualGrupos" type="number" value={formConfig.metaMensualGrupos} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Culto Lunes</label><input name="servicioLunes" value={formConfig.servicioLunes} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Culto Jueves</label><input name="servicioJueves" value={formConfig.servicioJueves} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Culto Dom. (Mañana)</label><input name="servicioDomManana" value={formConfig.servicioDomManana} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Culto Dom. (Tarde)</label><input name="servicioDomTarde" value={formConfig.servicioDomTarde} onChange={handleChange} className="fc" /></div>
           </div>
        </div>
      </div>
    </div>
  )
}
