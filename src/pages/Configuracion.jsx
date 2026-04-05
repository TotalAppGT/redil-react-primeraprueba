import React, { useState, useEffect } from 'react'
import { useBranding } from '../context/BrandingContext'

export default function Configuracion() {
  const { branding, updateBranding } = useBranding()
  
  // Estado local para los campos, inicializado con el contexto o valores por defecto del Code.gs original
  const [formConfig, setFormConfig] = useState({
    nombre: branding.nombre,
    logoUrl: branding.logo,
    colorPr: branding.colorPr,
    colorAc: branding.colorAc,
    sistemaActivo: branding.sistemaActivo,
    spreadsheetId: '1iLNbaqKwGRHGqRB1BJ0K1Sbyc53nD7uFD_UmVe91_Io',
    ownerEmail: 'totalappgt@gmail.com',
    ownerPass: 'admintotal',
    driveFolderId: '1OHBSDIk7e1FOyC1tgkkAJoRb_nJh2CKM',
    metaGrupos: branding.metaGrupos,
    mensajeMantenimiento: 'El sistema se encuentra en mantenimiento programado. Por favor, intente más tarde.',
    // Horarios de servicios (secciones legacy que el usuario pidió mantener)
    cron_lunes: 'Lunes 6:30 PM',
    cron_jueves: 'Jueves 6:30 PM',
    cron_domMañana: 'Domingo 7:00 AM',
    cron_domTarde: 'Domingo 10:30 AM',
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
    // Actualizar el contexto global para que el cambio se vea en todo el sistema al instante
    updateBranding({
      nombre: formConfig.nombre,
      logo: formConfig.logoUrl,
      colorPr: formConfig.colorPr,
      colorAc: formConfig.colorAc,
      metaGrupos: formConfig.metaGrupos,
      sistemaActivo: formConfig.sistemaActivo
    })
    
    // Aquí iría la llamada a Supabase para persistir en BD
    alert('Configuración guardada correctamente en el sistema.')
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-cog"></i> Configuración Maestra</h2>
        <div className="mod-acts">
           <button className="btn btn-pr" onClick={handleSave}><i className="fas fa-save"></i> Guardar Cambios</button>
        </div>
      </div>

      <div className="dg">
        {/* COLUMNA 1: IDENTIDAD Y SISTEMA */}
        <div className="dc">
           <div className="dct"><i className="fas fa-church"></i> Identidad de la Iglesia / Empresa</div>
           <form className="fg2" style={{ marginTop: '10px' }}>
              <div className="fgg full">
                <label>Nombre del Sistema / Organización</label>
                <input name="nombre" value={formConfig.nombre} onChange={handleChange} className="fc" />
              </div>
              <div className="fgg full">
                <label>URL del Logotipo (Imagen .jpg o .png)</label>
                <input name="logoUrl" value={formConfig.logoUrl} onChange={handleChange} className="fc" placeholder="https://ejemplo.com/logo.jpg" />
                {formConfig.logoUrl && (
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <img src={formConfig.logoUrl} alt="Preview" style={{ height: '60px', borderRadius: '8px', border: '1px solid var(--brd)' }} />
                  </div>
                )}
              </div>
              <div className="fgg half">
                <label>Color Principal (Sidebar/Botones)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="color" name="colorPr" value={formConfig.colorPr} onChange={handleChange} style={{ width: '40px', height: '40px', border: 'none', padding: '0', background: 'none' }} />
                  <input name="colorPr" value={formConfig.colorPr} onChange={handleChange} className="fc" style={{ textTransform: 'uppercase' }} />
                </div>
              </div>
              <div className="fgg half">
                <label>Color de Acento (Hover/Detalles)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="color" name="colorAc" value={formConfig.colorAc} onChange={handleChange} style={{ width: '40px', height: '40px', border: 'none', padding: '0', background: 'none' }} />
                  <input name="colorAc" value={formConfig.colorAc} onChange={handleChange} className="fc" style={{ textTransform: 'uppercase' }} />
                </div>
              </div>
           </form>

           <div className="dct" style={{ marginTop: '30px' }}><i className="fas fa-toggle-on"></i> Estado Global del Sistema</div>
           <div className="card" style={{ background: formConfig.sistemaActivo ? 'rgba(39, 174, 96, 0.05)' : 'rgba(231, 76, 60, 0.05)', border: '1px solid var(--brd)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
                 <div style={{ position: 'relative', width: '50px', height: '26px', background: formConfig.sistemaActivo ? 'var(--ok)' : '#ccc', borderRadius: '20px', transition: '0.3s' }}>
                    <div style={{ position: 'absolute', left: formConfig.sistemaActivo ? '28px' : '4px', top: '4px', width: '18px', height: '18px', background: '#fff', borderRadius: '50%', transition: '0.3s' }}></div>
                    <input type="checkbox" name="sistemaActivo" checked={formConfig.sistemaActivo} onChange={handleChange} style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }} />
                 </div>
                 <span style={{ fontWeight: '800', fontSize: '14px', color: formConfig.sistemaActivo ? 'var(--ok)' : 'var(--err)' }}>
                    {formConfig.sistemaActivo ? 'EL SISTEMA ESTÁ ENCENDIDO (VIVO)' : 'EL SISTEMA ESTÁ APAGADO (MANTENIMIENTO)'}
                 </span>
              </label>
              {!formConfig.sistemaActivo && (
                <div style={{ marginTop: '15px' }}>
                   <label>Mensaje para Usuarios Bloqueados</label>
                   <textarea name="mensajeMantenimiento" value={formConfig.mensajeMantenimiento} onChange={handleChange} className="fc" rows="2"></textarea>
                </div>
              )}
           </div>
        </div>

        {/* COLUMNA 2: TÉCNICO Y HORARIOS */}
        <div className="dc">
           <div className="dct"><i className="fas fa-user-shield"></i> Datos de Acceso y Propietario (SaaS)</div>
           <div className="fg2">
              <div className="fgg half"><label>Email Propietario</label><input name="ownerEmail" value={formConfig.ownerEmail} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Password Especial</label><input name="ownerPass" type="password" value={formConfig.ownerPass} onChange={handleChange} className="fc" /></div>
              <div className="fgg full"><label>ID Carpeta Drive (Reportes PDF)</label><input name="driveFolderId" value={formConfig.driveFolderId} onChange={handleChange} className="fc" /></div>
              <div className="fgg full"><label>Límite Inactividad (Minutos)</label><input name="limitInact" type="number" defaultValue="60" className="fc" /></div>
           </div>

           <div className="dct" style={{ marginTop: '30px' }}><i className="fas fa-clock"></i> Horarios de Servicios y Metas</div>
           <div className="fg2">
              <div className="fgg half"><label>Meta Mensual Grupos</label><input name="metaGrupos" type="number" value={formConfig.metaGrupos} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Servicio Lunes</label><input name="cron_lunes" value={formConfig.cron_lunes} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Servicio Jueves</label><input name="cron_jueves" value={formConfig.cron_jueves} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Dom. Mañana</label><input name="cron_domMañana" value={formConfig.cron_domMañana} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Dom. Tarde</label><input name="cron_domTarde" value={formConfig.cron_domTarde} onChange={handleChange} className="fc" /></div>
           </div>
        </div>
      </div>
    </div>
  )
}
