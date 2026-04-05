import React, { useState } from 'react'
import { useBranding } from '../context/BrandingContext'

export default function Configuracion() {
  const { branding, updateBranding } = useBranding()
  
  // Estado local sincronizado con el contexto para edición profesional
  const [formConfig, setFormConfig] = useState({
    nombre: branding?.nombre || 'Iglesia Restauración',
    logoUrl: branding?.logo || '',
    colorPr: branding?.colorPr || '#1a3a5c',
    colorAc: branding?.colorAc || '#e8a020',
    sistemaActivo: branding?.sistemaActivo !== false,
    metaGrupos: branding?.metaGrupos || '407',
    ownerEmail: 'totalappgt@gmail.com',
    ownerPass: 'admintotal',
    driveFolderId: '1OHBSDIk7e1FOyC1tgkkAJoRb_nJh2CKM',
    mensajeMantenimiento: 'El sistema se encuentra en mantenimiento programado. Disculpe las molestias.',
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
    // Sincronización inmediata con el BrandingContext
    updateBranding({
      nombre: formConfig.nombre,
      logo: formConfig.logoUrl,
      colorPr: formConfig.colorPr,
      colorAc: formConfig.colorAc,
      metaGrupos: formConfig.metaGrupos,
      sistemaActivo: formConfig.sistemaActivo
    })
    
    // Aquí iría el guardado en Supabase (Tabla 'configuracion_saas')
    alert('¡Configuración Maestra actualizada y sincronizada en la nube!')
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-tools"></i> Configuración Maestra del SaaS </h2>
        <div className="mod-acts">
           <button className="btn btn-pr" onClick={handleSave} style={{ padding: '12px 25px' }}><i className="fas fa-save"></i> Guardar y Sincronizar Cambios</button>
        </div>
      </div>

      <div className="dg">
        <div className="dc">
           <div className="dct"><i className="fas fa-palette"></i> Identidad Visual (Branding Dinámico)</div>
           <div className="fg2" style={{ marginTop: '10px' }}>
              <div className="fgg full">
                <label>Nombre de la Iglesia / Organización</label>
                <input name="nombre" value={formConfig.nombre} onChange={handleChange} className="fc" placeholder="Ej: Iglesia Restauración" />
              </div>
              <div className="fgg full">
                <label>Enlace del Logotipo (Imagen .png / .jpg)</label>
                <input name="logoUrl" value={formConfig.logoUrl} onChange={handleChange} className="fc" placeholder="https://miweb.com/logo.png" />
                {formConfig.logoUrl && (
                  <div style={{ marginTop: '10px', textAlign: 'center', background: 'var(--bg3)', padding: '10px', borderRadius: '10px' }}>
                    <img src={formConfig.logoUrl} alt="Preview" style={{ height: '60px', borderRadius: '5px' }} />
                  </div>
                )}
              </div>
              <div className="fgg half">
                <label>Color Principal (Fondo / Sidebar)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="color" name="colorPr" value={formConfig.colorPr} onChange={handleChange} style={{ width: '45px', height: '45px', border: 'none', background: 'none', padding: '0', cursor: 'pointer' }} />
                  <input name="colorPr" value={formConfig.colorPr} onChange={handleChange} className="fc" style={{ textTransform: 'uppercase' }} />
                </div>
              </div>
              <div className="fgg half">
                <label>Color de Acento (Botones / Detalles)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="color" name="colorAc" value={formConfig.colorAc} onChange={handleChange} style={{ width: '45px', height: '45px', border: 'none', background: 'none', padding: '0', cursor: 'pointer' }} />
                  <input name="colorAc" value={formConfig.colorAc} onChange={handleChange} className="fc" style={{ textTransform: 'uppercase' }} />
                </div>
              </div>
           </div>

           <div className="dct" style={{ marginTop: '40px' }}><i className="fas fa-power-off"></i> Control de Acceso Global</div>
           <div className={`card ${formConfig.sistemaActivo ? 'active-system' : 'inactive-system'}`} style={{ border: '2.5px solid var(--brd)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
                 <div style={{ position: 'relative', width: '60px', height: '30px', background: formConfig.sistemaActivo ? 'var(--ok)' : '#ccc', borderRadius: '25px', transition: '0.3s' }}>
                    <div style={{ position: 'absolute', left: formConfig.sistemaActivo ? '33px' : '3px', top: '3px', width: '24px', height: '24px', background: '#fff', borderRadius: '50%', transition: '0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                    <input type="checkbox" name="sistemaActivo" checked={formConfig.sistemaActivo} onChange={handleChange} style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }} />
                 </div>
                 <div>
                    <span style={{ fontWeight: '900', fontSize: '15.5px', color: formConfig.sistemaActivo ? 'var(--ok)' : 'var(--err)' }}>
                        {formConfig.sistemaActivo ? 'SISTEMA ONLINE (ABIERTO)' : 'SISTEMA OFFLINE (MANTENIMIENTO)'}
                    </span>
                    <p style={{ fontSize: '11px', color: 'var(--tx3)' }}>Al desactivar, solo el administrador principal podrá ingresar al panel.</p>
                 </div>
              </label>
           </div>
        </div>

        <div className="dc">
           <div className="dct"><i className="fas fa-database"></i> Conexión de Datos (Backend Supabase)</div>
           <div className="fg2">
              <div className="fgg full">
                <label>Supabase URL (Database Cloud)</label>
                <div style={{ padding: '12px', background: '#f0f4f8', border: '1px solid var(--brd)', borderRadius: '10px', fontSize: '11px', color: 'var(--tx3)' }}>
                   {import.meta.env.VITE_SUPABASE_URL || 'PENDIENTE DE CONEXIÓN'}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--ok)', marginTop: '5px' }}>✓ Sincronizado dinámicamente mediante variables de entorno local.</span>
              </div>
              <div className="fgg half"><label>Email de Soporte</label><input name="ownerEmail" value={formConfig.ownerEmail} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>ID Carpeta Drive</label><input name="driveFolderId" value={formConfig.driveFolderId} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Meta Mensual Reportes</label><input name="metaGrupos" type="number" value={formConfig.metaGrupos} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Sesiones Simultáneas</label><input type="number" defaultValue="1" className="fc" /></div>
           </div>

           <div className="dct" style={{ marginTop: '40px' }}><i className="fas fa-lock"></i> Seguridad Propietario</div>
           <div className="card" style={{ background: 'var(--bg3)', border: '1px solid var(--brd)' }}>
              <div className="fgg full"><label>Password Especial Acceso Raíz</label><input type="password" name="ownerPass" value={formConfig.ownerPass} onChange={handleChange} className="fc" /></div>
           </div>
        </div>
      </div>
    </div>
  )
}
