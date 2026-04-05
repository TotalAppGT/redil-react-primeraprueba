import React, { useState, useEffect } from 'react'
import { useBranding } from '../context/BrandingContext'

export default function ReporteDigital() {
  const { branding } = useBranding()
  const [activeStep, setActiveStep] = useState(1)
  const [success, setSuccess] = useState(false)
  
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
    seguimientos: [
      { id: 1, nombre: '', tipo: '' }
    ],
    observaciones: ''
  })

  const [liderInfo, setLiderInfo] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSegChange = (idx, field, value) => {
    const newSeg = [...formData.seguimientos]
    newSeg[idx][field] = value
    setFormData(prev => ({ ...prev, seguimientos: newSeg }))
  }

  const addSeg = () => {
    if (formData.seguimientos.length < 3) {
      setFormData(prev => ({
        ...prev,
        seguimientos: [...prev.seguimientos, { id: Date.now(), nombre: '', tipo: '' }]
      }))
    }
  }

  const removeSeg = (idx) => {
    const newSeg = formData.seguimientos.filter((_, i) => i !== idx)
    setFormData(prev => ({ ...prev, seguimientos: newSeg }))
  }

  const buscarLider = () => {
    if (!formData.codigo) return alert('Ingresa un código de líder')
    // Simular búsqueda como en el original
    setLiderInfo({
      nombre: 'Juan Pérez (' + formData.codigo + ')',
      detalle: 'Sector: Alpha · Área: Central · Pastor: Pr. Juan'
    })
  }

  const totalAsist = parseInt(formData.hermanos || 0) + parseInt(formData.amigos || 0) + parseInt(formData.ninos || 0)
  const totalCultos = parseInt(formData.martes || 0) + parseInt(formData.jueves || 0) + parseInt(formData.domingo || 0) + parseInt(formData.otros || 0)
  const totalOf = (parseFloat(formData.ofrendaIglesia || 0) + parseFloat(formData.ofrendaBus || 0)).toFixed(2)

  const handleEnviar = (e) => {
    e.preventDefault()
    if (!liderInfo) return alert('Primero busca y confirma el código del líder.')
    setSuccess(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (success) {
    return (
      <div className="mod active" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center', borderTop: '6px solid var(--ac)' }}>
          <div style={{ fontSize: '64px', marginBottom: '15px' }}>⏳</div>
          <h2 style={{ color: 'var(--pr)', fontWeight: '900' }}>¡Reporte Recibido!</h2>
          <p style={{ color: 'var(--tx2)' }}>Tu reporte fue guardado correctamente en el sistema.</p>
          
          <div style={{ background: '#fff3cd', border: '1.5px solid #ffc107', borderRadius: '12px', padding: '15px', marginTop: '20px', textAlign: 'left' }}>
             <div style={{ color: '#856404', fontWeight: '800' }}>⚠️ Ofrenda pendiente de entrega física</div>
             <p style={{ fontSize: '13px', color: '#856404', marginTop: '5px' }}>
                Tu reporte está guardado, pero la ofrenda aparecerá como <b>PENDIENTE</b> hasta que el encargado confirme la entrega física.
             </p>
          </div>

          <div style={{ marginTop: '20px', background: 'var(--bg3)', borderRadius: '12px', padding: '15px', textAlign: 'left' }}>
             <div className="ct">📋 Resumen del Reporte</div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                <div><b>Código:</b> {formData.codigo}</div>
                <div><b>Fecha:</b> {formData.fecha}</div>
                <div><b>Asist. GF:</b> {totalAsist}</div>
                <div><b>Asist. Iglesia:</b> {totalCultos}</div>
                <div><b>Ofrenda Total:</b> Q {totalOf}</div>
                <div><b>Estado:</b> ⏳ Pendiente</div>
             </div>
          </div>

          <button className="btn btn-pr" style={{ marginTop: '25px', width: '100%', padding: '15px' }} onClick={() => setSuccess(false)}>
            Enviar Otro Reporte
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mod active" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="mod-hdr" style={{ textAlign: 'center', display: 'block' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
           <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--pr)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--ac)' }}>
             {branding.logo ? <img src={branding.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : <i className="fas fa-church" style={{ color: '#fff', fontSize: '24px' }}></i>}
           </div>
        </div>
        <h2 style={{ display: 'block' }}>{branding.nombre}</h2>
        <p style={{ fontSize: '13px', color: 'var(--tx2)', marginTop: '5px' }}>Formulario de Reporte de Grupo Familiar</p>
      </div>

      <div className="card">
        <div className="card-hdr" style={{ background: 'var(--bg3)', padding: '12px 15px', borderRadius: '10px 10px 0 0' }}>
          <i className="fas fa-search"></i> <b>Identificación del Líder</b>
        </div>
        <div className="card-body" style={{ padding: '20px' }}>
          <div className="fg">
             <label>Código del Líder <span style={{ color: 'var(--err)' }}>*</span></label>
             <div style={{ display: 'flex', gap: '8px' }}>
                <input name="codigo" value={formData.codigo} onChange={handleChange} className="fc" placeholder="Ej: 12345" />
                <button className="btn btn-pr" onClick={buscarLider}>Buscar</button>
             </div>
          </div>
          {liderInfo && (
            <div style={{ marginTop: '12px', background: '#eafaf1', border: '1px solid var(--ok)', padding: '12px', borderRadius: '10px' }}>
               <div style={{ fontWeight: '900', color: 'var(--ok)' }}>✓ {liderInfo.nombre}</div>
               <div style={{ fontSize: '11.5px', color: 'var(--tx2)' }}>{liderInfo.detalle}</div>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: '15px' }}>
        <div className="card-hdr" style={{ background: 'var(--bg3)', padding: '12px 15px', borderRadius: '10px 10px 0 0' }}>
          <i className="fas fa-calendar-check"></i> <b>Datos de la Reunión y Asistencia</b>
        </div>
        <div className="card-body" style={{ padding: '20px' }}>
          <div className="fg2">
            <div className="fgg half"><label>Fecha</label><input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="fc" /></div>
            <div className="fgg half"><label>Tipo de Reunión</label>
              <select name="tipoReunion" value={formData.tipoReunion} onChange={handleChange} className="fc">
                <option>Reunión Regular</option>
                <option>Especial</option>
                <option>Célula Jóvenes</option>
              </select>
            </div>
            <div className="fgg half"><label>Hora Inicio</label><input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} className="fc" /></div>
            <div className="fgg half"><label>Hora Final</label><input type="time" name="horaFinal" value={formData.horaFinal} onChange={handleChange} className="fc" /></div>
          </div>

          <div className="dct" style={{ marginTop: '20px' }}><i className="fas fa-users"></i> Totales de Asistencia GF</div>
          <div className="fg2" style={{ gap: '10px' }}>
             <div className="fgg" style={{ flex: 1 }}><label>Hermanos</label><input type="number" name="hermanos" value={formData.hermanos} onChange={handleChange} className="fc" /></div>
             <div className="fgg" style={{ flex: 1 }}><label>Amigos</label><input type="number" name="amigos" value={formData.amigos} onChange={handleChange} className="fc" /></div>
             <div className="fgg" style={{ flex: 1 }}><label>Niños</label><input type="number" name="ninos" value={formData.ninos} onChange={handleChange} className="fc" /></div>
          </div>
          <div className="auto-calc" style={{ marginTop: '10px', background: 'var(--bg3)', padding: '12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--pr)' }}>TOTAL ASISTENCIA GF</span>
             <span style={{ fontSize: '24px', fontWeight: '900', color: 'var(--pr)' }}>{totalAsist}</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '15px' }}>
        <div className="card-hdr" style={{ background: 'var(--bg3)', padding: '12px 15px', borderRadius: '10px 10px 0 0' }}>
          <i className="fas fa-church"></i> <b>Asistencia a la Iglesia (Cultos)</b>
        </div>
        <div className="card-body" style={{ padding: '20px' }}>
           <div className="fg2" style={{ gap: '10px' }}>
             <div className="fgg half"><label>Martes</label><input type="number" name="martes" value={formData.martes} onChange={handleChange} className="fc" /></div>
             <div className="fgg half"><label>Jueves</label><input type="number" name="jueves" value={formData.jueves} onChange={handleChange} className="fc" /></div>
             <div className="fgg half"><label>Domingo</label><input type="number" name="domingo" value={formData.domingo} onChange={handleChange} className="fc" /></div>
             <div className="fgg half"><label>Otros</label><input type="number" name="otros" value={formData.otros} onChange={handleChange} className="fc" /></div>
           </div>
           <div className="auto-calc" style={{ marginTop: '10px', background: '#eafaf1', border: '1px solid var(--ok)', padding: '12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--ok)' }}>TOTAL ASISTENCIA CULTOS</span>
             <span style={{ fontSize: '24px', fontWeight: '900', color: 'var(--ok)' }}>{totalCultos}</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '15px' }}>
        <div className="card-hdr" style={{ background: 'var(--bg3)', padding: '12px 15px', borderRadius: '10px 10px 0 0' }}>
          <i className="fas fa-coins"></i> <b>Ofrendas y Seguimiento</b>
        </div>
        <div className="card-body" style={{ padding: '20px' }}>
           <div className="fg2">
              <div className="fgg half"><label>Ofrenda Iglesia (Q)</label><input type="number" step="0.01" name="ofrendaIglesia" value={formData.ofrendaIglesia} onChange={handleChange} className="fc" /></div>
              <div className="fgg half"><label>Ofrenda Bus (Q)</label><input type="number" step="0.01" name="ofrendaBus" value={formData.ofrendaBus} onChange={handleChange} className="fc" /></div>
           </div>
           <div className="auto-calc" style={{ marginTop: '10px', background: '#fffef0', border: '1px solid var(--ac)', padding: '12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--ac)' }}>TOTAL OFRENDADO Q</span>
             <span style={{ fontSize: '24px', fontWeight: '900', color: 'var(--ac)' }}>Q {totalOf}</span>
          </div>

          <div className="dct" style={{ marginTop: '20px' }}><i className="fas fa-hands-helping"></i> Seguimientos (Opcional)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             {formData.seguimientos.map((s, idx) => (
                <div key={s.id} style={{ background: 'var(--bg3)', padding: '12px', borderRadius: '10px', position: 'relative' }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input placeholder="Nombre de persona" value={s.nombre} onChange={(e) => handleSegChange(idx, 'nombre', e.target.value)} className="fc" style={{ fontSize: '12.5px' }} />
                      <select value={s.tipo} onChange={(e) => handleSegChange(idx, 'tipo', e.target.value)} className="fc" style={{ fontSize: '12.5px' }}>
                         <option value="">— Tipo —</option>
                         <option>Convertido</option>
                         <option>Reconciliación</option>
                         <option>Visita</option>
                      </select>
                   </div>
                   <button onClick={() => removeSeg(idx)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--err)', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', fontSize: '10px' }}>×</button>
                </div>
             ))}
             {formData.seguimientos.length < 3 && <button onClick={addSeg} className="btn btn-ol" style={{ fontSize: '11.5px', borderStyle: 'dashed' }}>+ Agregar otra persona</button>}
          </div>

          <div className="fgg full" style={{ marginTop: '15px' }}>
            <label>Observaciones Adicionales</label>
            <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} className="fc" rows="2"></textarea>
          </div>

          <button onClick={handleEnviar} className="btn btn-pr" style={{ width: '100%', padding: '16px', marginTop: '30px', fontSize: '16px', fontWeight: '900' }}>
            📤 ENVIAR REPORTE SEMANAL
          </button>
        </div>
      </div>
    </div>
  )
}
