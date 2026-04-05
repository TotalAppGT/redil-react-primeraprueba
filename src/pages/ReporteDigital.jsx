import React, { useState, useEffect } from 'react'
import { useBranding } from '../context/BrandingContext'
import { supabaseService } from '../services/supabaseService'

export default function ReporteDigital() {
  const { branding } = useBranding()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [liderInfo, setLiderInfo] = useState(null)
  
  const [formData, setFormData] = useState({
    codigo: '',
    fecha: new Date().toISOString().split('T')[0],
    horaInicio: '19:00',
    horaFinal: '20:30',
    tipoReunion: 'Reunión Regular',
    hermanos: 0,
    amigos: 0,
    ninos: 0,
    martes: 0,
    jueves: 0,
    domingo: 0,
    otros: 0,
    ofrendaIglesia: 0,
    ofrendaBus: 0,
    nombre1: '', tipo1: '',
    nombre2: '', tipo2: '',
    nombre3: '', tipo3: ''
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'number' ? (parseFloat(value) || 0) : value 
    }))
  }

  const validarLider = async () => {
    if (!formData.codigo) return;
    setLoading(true)
    try {
      const { data, error } = await supabaseService.getHermanoByCodigo(formData.codigo)
      if (data) {
        setLiderInfo(data)
      } else {
        setLiderInfo(null)
        alert("⚠ Código no encontrado. Verifique e intente de nuevo.")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleEnviar = async (e) => {
    e.preventDefault()
    if (!liderInfo) {
      alert("⚠ Primero debe validar su código de líder.")
      return
    }
    
    setLoading(true)
    const reportData = {
      ...formData,
      lider: liderInfo.nombre_l,
      sup_sector: liderInfo.sup_sector_l,
      sup_area: liderInfo.sup_area_l,
      pastor_zona: liderInfo.pastor_zona,
      anfitrion: liderInfo.anfitrion,
      direccion: liderInfo.direccion,
      total_asist: parseInt(formData.hermanos) + parseInt(formData.amigos) + parseInt(formData.ninos),
      total_cultos: parseInt(formData.martes) + parseInt(formData.jueves) + parseInt(formData.domingo) + parseInt(formData.otros),
      total_ofrenda: parseFloat(formData.ofrendaIglesia) + parseFloat(formData.ofrendaBus),
      ofrenda_recibida: 'Pendiente',
      tipo_reporte: 'Reporte Digital',
      timestamp: new Date().toISOString()
    }

    try {
      const { ok, error } = await supabaseService.saveReporte(reportData)
      if (ok) {
        setSuccess(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        alert("Error al enviar: " + error.message)
      }
    } catch (e) {
      alert("Error de conexión: " + e.message)
    } finally {
      setLoading(false)
    }
  }

  const totalAsist = parseInt(formData.hermanos || 0) + parseInt(formData.amigos || 0) + parseInt(formData.ninos || 0)
  const totalOf = (parseFloat(formData.ofrendaIglesia || 0) + parseFloat(formData.ofrendaBus || 0)).toFixed(2)

  if (success) {
    return (
      <div className="mod active" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
        <div className="card" style={{ padding: '40px 20px', borderTop: '8px solid #d68910' }}>
           <div style={{ fontSize: '64px', marginBottom: '20px' }}>⏳</div>
           <h1 style={{ fontFamily: 'var(--fn2)', fontWeight: '900', color: 'var(--pr)', fontSize: '24px' }}>¡Reporte Recibido!</h1>
           <p style={{ color: 'var(--tx2)', marginTop: '8px', fontSize: '15px' }}>
              Tu informe de Grupo Familiar ha sido guardado exitosamente.
           </p>
           
           <div style={{ background: '#fff9e6', border: '1.5px solid #ffc107', borderRadius: '15px', padding: '20px', marginTop: '30px', textAlign: 'left' }}>
              <div style={{ fontWeight: '900', color: '#856404', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-exclamation-triangle"></i> Ofrenda Pendiente
              </div>
              <p style={{ fontSize: '12.5px', color: '#856404', marginTop: '8px', lineHeight: '1.6' }}>
                El monto se registra, pero quedará marcado como <b>"Pendiente"</b> hasta que se entregue físicamente al encargado de finanzas.
              </p>
           </div>
           
           <div className="card" style={{ marginTop: '20px', padding: '0', background: 'var(--bg3)', overflow: 'hidden' }}>
              <div style={{ padding: '10px', fontSize: '12px', fontWeight: '800', background: 'var(--pr)', color: '#fff' }}>RESUMEN ENVIADO</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--brd)' }}>
                 <div style={{ background: '#fff', padding: '10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--tx2)' }}>LÍDER</div>
                    <div style={{ fontWeight: '800', fontSize: '13px' }}>{liderInfo?.nombre_l}</div>
                 </div>
                 <div style={{ background: '#fff', padding: '10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--tx2)' }}>FECHA</div>
                    <div style={{ fontWeight: '800', fontSize: '13px' }}>{formData.fecha}</div>
                 </div>
                 <div style={{ background: '#fff', padding: '10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--tx2)' }}>ASISTENCIA GF</div>
                    <div style={{ fontWeight: '800', fontSize: '13px' }}>{totalAsist}</div>
                 </div>
                 <div style={{ background: '#fff', padding: '10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--tx2)' }}>OFRENDA TOTAL</div>
                    <div style={{ fontWeight: '800', fontSize: '13px', color: '#856404' }}>Q {totalOf}</div>
                 </div>
              </div>
           </div>
           
           <button className="btn btn-pr" style={{ width: '100%', marginTop: '20px', padding: '16px' }} onClick={() => window.location.reload()}>
             ENVIAR OTRO REPORTE
           </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mod active" style={{ maxWidth: '640px', margin: '0 auto', background: 'var(--bg)', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* HEADER DINÁMICO */}
      <div style={{ background: 'linear-gradient(135deg, var(--pr) 0%, var(--pr2) 100%)', color: '#fff', padding: '30px 20px', textAlign: 'center', borderBottom: '4px solid var(--ac)' }}>
        <div style={{ width: '64px', height: '64px', margin: '0 auto 15px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {branding?.logo ? <img src={branding.logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fas fa-church" style={{ fontSize: '26px' }}></i>}
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: '900', fontFamily: 'var(--fn2)', letterSpacing: '-0.5px' }}>{branding?.nombre || 'REDIL Cloud'}</h1>
        <p style={{ opacity: 0.8, fontSize: '12px', marginTop: '4px' }}>Formulario de Reporte de Grupos Familiares</p>
        <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '99px', background: 'rgba(255,255,255,0.2)', fontSize: '11px', fontWeight: '800', marginTop: '10px' }}>Paso a Paso • Digital v6.2</div>
      </div>

      <form onSubmit={handleEnviar} style={{ padding: '0 12px' }}>
        
        {/* PASO 1: LIDERAZGO */}
        <div className="card" style={{ marginTop: '15px' }}>
          <div className="ct"><i className="fas fa-search"></i> 1. IDENTIFICACIÓN DEL LÍDER</div>
          <div className="fg" style={{ marginTop: '10px' }}>
             <label>CÓDIGO DE LÍDER (REQUERIDO)</label>
             <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  name="codigo" 
                  className="fc" 
                  style={{ flex: 1, fontSize: '16px', fontWeight: '800' }}
                  placeholder="Ej: 1234" 
                  value={formData.codigo} 
                  onChange={handleChange}
                  required
                />
                <button type="button" onClick={validarLider} className="btn btn-pr" disabled={loading}>
                  {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'BUSCAR'}
                </button>
             </div>
             {liderInfo && (
               <div style={{ marginTop: '12px', background: '#f0f9f3', border: '1.5px solid var(--ok)', padding: '15px', borderRadius: '12px', animation: 'slUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                  <div style={{ color: 'var(--ok)', fontWeight: '900', fontSize: '14px' }}>✓ Líder: {liderInfo.nombre_l}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--tx2)', marginTop: '3px' }}>Sector: {liderInfo.sup_sector_l} • Área: {liderInfo.sup_area_l}</div>
               </div>
             )}
          </div>
        </div>

        {/* PASO 2: REUNIÓN */}
        <div className="card">
          <div className="ct"><i className="fas fa-calendar-day"></i> 2. DATOS DE LA REUNIÓN</div>
          <div className="fg2">
            <div className="fgg full">
              <label>FECHA DE REUNIÓN</label>
              <input type="date" name="fecha" className="fc" value={formData.fecha} onChange={handleChange} required />
            </div>
            <div className="fgg half">
              <label>HORA INICIO</label>
              <input type="time" name="horaInicio" className="fc" value={formData.horaInicio} onChange={handleChange} />
            </div>
            <div className="fgg half">
              <label>HORA FINAL</label>
              <input type="time" name="horaFinal" className="fc" value={formData.horaFinal} onChange={handleChange} />
            </div>
            <div className="fgg full">
              <label>TIPO DE ENCUENTRO</label>
              <select name="tipoReunion" className="fc" value={formData.tipoReunion} onChange={handleChange}>
                <option>Reunión Regular</option>
                <option>Ayuno y Oración</option>
                <option>Estudio Bíblico</option>
                <option>Reunión Especial</option>
                <option>Célula de Jóvenes</option>
                <option>Otro</option>
              </select>
            </div>
          </div>
        </div>

        {/* PASO 3: ASISTENCIA GF */}
        <div className="card">
          <div className="ct"><i className="fas fa-users"></i> 3. ASISTENCIA AL GRUPO</div>
          <div className="fg2" style={{ gap: '10px' }}>
            <div className="fgg" style={{ flex: 1 }}><label>HNOS</label><input type="number" name="hermanos" className="fc" value={formData.hermanos} onChange={handleChange} min="0" /></div>
            <div className="fgg" style={{ flex: 1 }}><label>AMIGOS</label><input type="number" name="amigos" className="fc" value={formData.amigos} onChange={handleChange} min="0" /></div>
            <div className="fgg" style={{ flex: 1 }}><label>NIÑOS</label><input type="number" name="ninos" className="fc" value={formData.ninos} onChange={handleChange} min="0" /></div>
          </div>
          <div style={{ marginTop: '15px', background: 'var(--pr)', color: '#fff', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--ac)' }}>⟳ TOTAL ASISTENCIA</div>
            <div style={{ fontSize: '32px', fontWeight: '900' }}>{totalAsist}</div>
          </div>
        </div>

        {/* PASO 4: CULTOS */}
        <div className="card">
          <div className="ct"><i className="fas fa-church"></i> 4. ASISTENCIA A CULTOS</div>
          <p style={{ fontSize: '11px', color: 'var(--tx2)', marginBottom: '10px' }}>¿Cuántos asistieron a la iglesia esta semana?</p>
          <div className="fg2">
            <div className="fgg half"><label>MARTES</label><input type="number" name="martes" className="fc" value={formData.martes} onChange={handleChange} /></div>
            <div className="fgg half"><label>JUEVES</label><input type="number" name="jueves" className="fc" value={formData.jueves} onChange={handleChange} /></div>
            <div className="fgg half"><label>DOMINGO</label><input type="number" name="domingo" className="fc" value={formData.domingo} onChange={handleChange} /></div>
            <div className="fgg half"><label>OTROS</label><input type="number" name="otros" className="fc" value={formData.otros} onChange={handleChange} /></div>
          </div>
        </div>

        {/* PASO 5: OFRENDAS */}
        <div className="card">
          <div className="ct"><i className="fas fa-coins"></i> 5. OFRENDAS RECAUDADAS</div>
          <div className="fg2">
            <div className="fgg half">
              <label>OFR. IGLESIA (Q)</label>
              <input type="number" step="0.01" name="ofrendaIglesia" className="fc" value={formData.ofrendaIglesia} onChange={handleChange} />
            </div>
            <div className="fgg half">
              <label>OFR. BUS (Q)</label>
              <input type="number" step="0.01" name="ofrendaBus" className="fc" value={formData.ofrendaBus} onChange={handleChange} />
            </div>
          </div>
          <div style={{ marginTop: '15px', background: '#fffcf0', border: '2px dashed var(--ac)', color: 'var(--pr)', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: '900', color: '#b7770d' }}>⟳ TOTAL OFRENDAS</div>
            <div style={{ fontSize: '32px', fontWeight: '900', color: '#b7770d' }}>Q {totalOf}</div>
          </div>
        </div>

        {/* PASO 6: SEGUIMIENTOS (DINÁMICOS) */}
        <div className="card">
          <div className="ct"><i className="fas fa-heart"></i> 6. SEGUIMIENTOS</div>
          <div className="fg">
            <label>PERSONA 1</label>
            <input type="text" name="nombre1" className="fc" placeholder="Nombre completo" value={formData.nombre1} onChange={handleChange} />
            <select name="tipo1" className="fc" style={{ marginTop: '5px' }} value={formData.tipo1} onChange={handleChange}>
               <option value="">-- Seleccionar tipo --</option>
               <option>Convertido</option><option>Reconciliación</option><option>Visita</option><option>Bautizo</option>
            </select>
          </div>
          {/* Opcionales 2 y 3 no los pongo para simplificar mobile, o los puedo activar con un botón */}
        </div>

        <button 
          type="submit" 
          className="btn btn-pr" 
          style={{ width: '100%', padding: '20px', borderRadius: '15px', fontSize: '17px', fontWeight: '900', boxShadow: '0 8px 25px rgba(26,58,92,0.3)', margin: '15px 0' }}
          disabled={loading}
        >
          {loading ? <i className="fas fa-circle-notch fa-spin"></i> : '📤 ENVIAR REPORTE AHORA'}
        </button>

      </form>
    </div>
  )
}
