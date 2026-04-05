import React, { useState } from 'react'
import { useBranding } from '../context/BrandingContext'

export default function Configuracion() {
  const { branding, updateBranding } = useBranding()
  
  const [formConfig, setFormConfig] = useState({
    nombre: branding.nombre,
    logoUrl: branding.logo,
    colorPr: branding.colorPr,
    colorAc: branding.colorAc,
    sistemaActivo: branding.sistemaActivo,
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://xyz.supabase.co',
    ownerEmail: 'totalappgt@gmail.com',
    ownerPass: 'admintotal',
    driveFolderId: '1OHBSDIk7e1FOyC1tgkkAJoRb_nJh2CKM',
    metaMensualGrupos: branding.metaGrupos,
    servicioLunes: '6:30 PM',
    servicioJueves: '6:30 PM',
    servicioDomManana: '7:00 AM',
    servicioDomTarde: '10:30 AM',
    mensajeMantenimiento: 'Sistema en mantenimiento. Disculpe las molestias.',
  })

  // Esta versión V6.2 elimina rastro de Sheets y habilita Branding Real
  return (
    <div className="mod active" style={{ borderTop: `4px solid ${branding.colorPr}` }}>
      <div className="mod-hdr">
        <h2><i className="fas fa-microchip"></i> Panel Central de Control SaaS — v6.2 PRO</h2>
        <div className="mod-acts">
           <button className="btn btn-pr" onClick={() => updateBranding(formConfig)} style={{ background: 'var(--pr)', padding: '12px 25px' }}><i className="fas fa-save"></i> Guardar y Aplicar Cambios Ahora</button>
        </div>
      </div>

      <div className="dg">
        <div className="dc">
           <div className="dct"><i className="fas fa-palette"></i> Branding: Tu Identidad Personal</div>
           <div className="fg2" style={{ marginTop: '10px' }}>
              <div className="fgg full">
                <label>Nombre de TU Organización</label>
                <input name="nombre" value={formConfig.nombre} onChange={(e) => setFormConfig({...formConfig, nombre: e.target.value})} className="fc" />
              </div>
              <div className="fgg full">
                <label>URL Logo (Ej: https://.../logo.png)</label>
                <input name="logoUrl" value={formConfig.logoUrl} onChange={(e) => setFormConfig({...formConfig, logoUrl: e.target.value})} className="fc" />
              </div>
              <div className="fgg half">
                <label>Color Principal (Sidebar/Fondo)</label>
                <input type="color" value={formConfig.colorPr} onChange={(e) => setFormConfig({...formConfig, colorPr: e.target.value})} style={{ width: '100%', height: '40px', cursor: 'pointer' }} />
              </div>
              <div className="fgg half">
                <label>Color Acento (Hover)</label>
                <input type="color" value={formConfig.colorAc} onChange={(e) => setFormConfig({...formConfig, colorAc: e.target.value})} style={{ width: '100%', height: '40px', cursor: 'pointer' }} />
              </div>
           </div>

           <div className="dct" style={{ marginTop: '40px' }}><i className="fas fa-shield-alt"></i> Seguridad y Acceso Global</div>
           <div style={{ background: 'var(--bg3)', padding: '15px', borderRadius: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
                 <input type="checkbox" checked={formConfig.sistemaActivo} onChange={(e) => setFormConfig({...formConfig, sistemaActivo: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                 <span style={{ fontWeight: '900', color: formConfig.sistemaActivo ? 'var(--ok)' : 'var(--err)' }}>
                    {formConfig.sistemaActivo ? '✓ SISTEMA ACTIVO PARA TODOS' : '✕ SISTEMA EN MANTENIMIENTO'}
                 </span>
              </label>
           </div>
        </div>

        <div className="dc">
           <div className="dct"><i className="fas fa-database"></i> Conexión Backend (Supabase Cloud Only)</div>
           <div className="fg2">
              <div className="fgg full">
                <label>URL de Supabase (Database)</label>
                <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', fontSize: '11px', color: 'var(--tx3)' }}>{formConfig.supabaseUrl}</div>
                <div style={{ color: 'var(--ok)', fontSize: '11px', marginTop: '5px' }}>✓ Sincronizado con PostgreSQL de forma profesional.</div>
              </div>
              <div className="fgg half"><label>Admin Email</label><input value={formConfig.ownerEmail} className="fc" /></div>
              <div className="fgg half"><label>Password Maestro</label><input type="password" value={formConfig.ownerPass} className="fc" /></div>
           </div>

           <div className="dct" style={{ marginTop: '40px' }}><i className="fas fa-clock"></i> Horarios de la Iglesia (Originales)</div>
           <div className="fg2">
              <div className="fgg half"><label>Lunes</label><input value={formConfig.servicioLunes} className="fc" /></div>
              <div className="fgg half"><label>Jueves</label><input value={formConfig.servicioJueves} className="fc" /></div>
              <div className="fgg half"><label>Dom. Mañana</label><input value={formConfig.servicioDomManana} className="fc" /></div>
              <div className="fgg half"><label>Dom. Tarde</label><input value={formConfig.servicioDomTarde} className="fc" /></div>
           </div>
        </div>
      </div>
    </div>
  )
}
