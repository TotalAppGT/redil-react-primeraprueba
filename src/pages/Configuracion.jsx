import React, { useState } from 'react'
import { useBranding } from '../context/BrandingContext'
import { supabaseService } from '../services/supabaseService'

export default function Configuracion() {
  const { branding, updateBranding } = useBranding()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nombre: branding?.nombre || 'Iglesia Restauración',
    logo: branding?.logo || '',
    colorPr: branding?.colorPr || '#1a3a5c',
    colorAc: branding?.colorAc || '#e8a020',
    metaGrupos: branding?.metaGrupos || '407',
    sistemaActivo: branding?.sistemaActivo ?? true,
    msgMantenimiento: 'El sistema se encuentra en mantenimiento programado. Disculpe los inconvenientes.'
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // 1. Guardar en BrandingContext (LocalStorage) para cambios inmediatos
      updateBranding(form)
      
      // 2. Persistir en Supabase (Si el usuario tiene la tabla lista)
      const { ok, error } = await supabaseService.saveConfig(form)
      if (ok) {
        alert("✓ Configuración de Identidad y Estado del Sistema Guardada Exitosamente.")
      } else {
        console.error(error)
        alert("✓ Guardado localmente. (Error en Supabase: " + (error?.message || 'Tabla config no encontrada') + ")")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-tools"></i> Panel de Configuración SaaS PRO</h2>
        <div className="mod-acts">
           <button className="btn btn-ok" onClick={handleSave} disabled={loading}>
             <i className="fas fa-save"></i> GUARDAR CAMBIOS GLOBALES
           </button>
        </div>
      </div>

      <div className="dg">
        <div className="dc">
           <div className="dct"><i className="fas fa-id-card"></i> IDENTIDAD DE LA IGLESIA (BRANDING)</div>
           <div className="fg2">
              <div className="fgg full">
                <label>NOMBRE OFICIAL DE LA IGLESIA / ORGANIZACIÓN</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} className="fc" placeholder="Ej: Iglesia Restauración Elim" />
              </div>
              <div className="fgg full">
                <label>VÍNCULO LOGOTIPO (URL)</label>
                <input name="logo" value={form.logo} onChange={handleChange} className="fc" placeholder="https://i.postimg.cc/..." />
              </div>
              <div className="fgg half">
                <label>COLOR PRIMARIO (BRAND)</label>
                <input type="color" name="colorPr" value={form.colorPr} onChange={handleChange} className="fc" style={{ height: '45px' }} />
              </div>
              <div className="fgg half">
                <label>COLOR ACENTO (CONTRASTE)</label>
                <input type="color" name="colorAc" value={form.colorAc} onChange={handleChange} className="fc" style={{ height: '45px' }} />
              </div>
              <div className="fgg full">
                 <label>META MENSUAL DE GRUPOS FAMILIARES (DASHBOARD)</label>
                 <input type="number" name="metaGrupos" value={form.metaGrupos} onChange={handleChange} className="fc" />
              </div>
           </div>
        </div>

        <div className="dc">
           <div className="dct"><i className="fas fa-power-off"></i> ESTADO DEL SISTEMA</div>
           <div style={{ background: form.sistemaActivo ? '#f0f9f3' : '#fff5f5', border: `1.5px solid ${form.sistemaActivo ? 'var(--ok)' : 'var(--err)'}`, padding: '20px', borderRadius: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <div style={{ fontWeight: '900', color: form.sistemaActivo ? 'var(--ok)' : 'var(--err)', fontSize: '15px' }}>
                   SISTEMA {form.sistemaActivo ? 'ACTIVO' : 'EN MANTENIMIENTO'}
                 </div>
                 <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                    <input type="checkbox" name="sistemaActivo" checked={form.sistemaActivo} onChange={handleChange} style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ 
                      position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                      backgroundColor: form.sistemaActivo ? 'var(--ok)' : '#ccc', 
                      borderRadius: '34px', transition: '.4s' 
                    }}>
                      <span style={{ 
                        position: 'absolute', content: '""', height: '26px', width: '26px', left: form.sistemaActivo ? '30px' : '4px', bottom: '4px', 
                        backgroundColor: 'white', borderRadius: '50%', transition: '.4s' 
                      }}></span>
                    </span>
                 </label>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--tx2)', marginTop: '8px' }}>
                Si desactivas el sistema, los usuarios no podrán realizar reportes ni ver información estratégica hasta que lo vuelvas a encender.
              </p>
           </div>
           
           {!form.sistemaActivo && (
             <div style={{ marginTop: '20px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--err)' }}>MENSAJE DE BLOQUEO / MANTENIMIENTO</label>
                <textarea name="msgMantenimiento" value={form.msgMantenimiento} onChange={handleChange} className="fc" rows="4" style={{ marginTop: '5px' }}></textarea>
             </div>
           )}
        </div>
      </div>

      <div className="card" style={{ marginTop: '13px', background: 'var(--bg3)', border: '1px dashed var(--brd)' }}>
         <div style={{ padding: '15px', textAlign: 'center' }}>
           <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--tx2)', letterSpacing: '1px' }}>VISTA PREVIA DEL LOGO</div>
           <div style={{ width: '100px', height: '100px', margin: '15px auto', borderRadius: '50%', background: 'var(--bg2)', border: '4px solid var(--ac)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {form.logo ? <img src={form.logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fas fa-church" style={{ fontSize: '32px', color: 'var(--tx3)' }}></i>}
           </div>
           <div style={{ fontSize: '14px', fontWeight: '900', color: 'var(--pr)' }}>{form.nombre}</div>
         </div>
      </div>
    </div>
  )
}
