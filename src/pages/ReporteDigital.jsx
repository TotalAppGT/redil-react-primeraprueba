import React, { useState } from 'react'
import { useBranding } from '../context/BrandingContext'

export default function ReporteDigital() {
  const { branding } = useBranding()
  const [success, setSuccess] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  
  const [formData, setFormData] = useState({
    codigo: '',
    fecha: new Date().toISOString().split('T')[0],
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
    seguimientos: [{ id: 1, nombre: '', tipo: '' }],
    observaciones: ''
  })

  const [liderInfo, setLiderInfo] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const buscarLider = () => {
    if (!formData.codigo) return;
    // Simulación de búsqueda profesional
    setLiderInfo({
      nombre: 'Juan Pérez (' + formData.codigo + ')',
      detalle: 'Sector: Omega · Área: Central · Pastor: Dr. Hernández'
    })
  }

  const handleEnviar = (e) => {
    e.preventDefault()
    if (!liderInfo) {
       alert("Error de Seguridad: Primero debe validar su código de líder.")
       return;
    }
    setSuccess(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalAsist = parseInt(formData.hermanos || 0) + parseInt(formData.amigos || 0) + parseInt(formData.ninos || 0)
  const totalCultos = parseInt(formData.martes || 0) + parseInt(formData.jueves || 0) + parseInt(formData.domingo || 0) + parseInt(formData.otros || 0)
  const totalOf = (parseFloat(formData.ofrendaIglesia || 0) + parseFloat(formData.ofrendaBus || 0)).toFixed(2)

  if (success) {
    return (
      <div className="mod active" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '60px 20px', borderTop: '6px solid var(--ok)' }}>
           <div style={{ fontSize: '72px', marginBottom: '20px' }}>✅</div>
           <h1 style={{ fontFamily: 'var(--fn2)', fontWeight: '900', color: 'var(--pr)', fontSize: '26px' }}>¡Reporte Exitoso!</h1>
           <p style={{ color: 'var(--tx2)', marginTop: '10px' }}>
              El informe de su Grupo Familiar ha sido procesado por el servidor **REDIL Cloud**.
           </p>
           
           <div style={{ background: '#fff9e6', border: '1.5px solid #ffc107', borderRadius: '15px', padding: '20px', marginTop: '30px', textAlign: 'left' }}>
              <div style={{ fontWeight: '900', color: '#856404' }}>📢 Atencion: Entrega de Ofrenda</div>
              <p style={{ fontSize: '13px', color: '#856404', marginTop: '8px' }}>
                 Su reporte ya está guardado, pero la ofrenda (Q {totalOf}) quedará marcada como **"Pendiente de Entrega Física"** hasta que el encargado la reciba en la iglesia.
              </p>
           </div>
           
           <button className="btn btn-pr" style={{ marginTop: '30px', padding: '16px 40px', fontSize: '14px' }} onClick={() => setSuccess(false)}>
             ENVIAR OTRO REPORTE
           </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mod active" style={{ maxWidth: '740px', margin: '0 auto' }}>
      <div className="mod-hdr" style={{ textAlign: 'center', display: 'block' }}>
        <div style={{ width: '70px', height: '70px', margin: '0 auto 15px', borderRadius: '50%', background: 'var(--pr)', border: '4px solid var(--ac)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {branding?.logo ? <img src={branding.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : <i className="fas fa-church" style={{ color: '#fff', fontSize: '26px' }}></i>}
        </div>
        <h2 style={{ display: 'block', fontSize: '24px' }}>{branding?.nombre || 'REDIL'}</h2>
        <p style={{ fontSize: '12.5px', color: 'var(--tx2)', fontWeight: '700' }}>Formulario Digital de Grupos Familiares</p>
      </div>

      <div className="card">
        <div className="dct"><i className="fas fa-id-badge"></i> Paso 1: Identificación del Liderazgo</div>
        <div className="fg" style={{ marginTop: '10px' }}>
           <label>Código Único de Líder</label>
           <div style={{ display: 'flex', gap: '10px' }}>
              <input name="codigo" value={formData.codigo} onChange={handleChange} className="fc" placeholder="Ej: 7425" onBlur={buscarLider} />
              <button className="btn btn-pr" onClick={buscarLider}>Validar</button>
           </div>
           {liderInfo && (
             <div style={{ marginTop: '12px', background: 'var(--bg3)', border: '1px solid var(--brd)', padding: '15px', borderRadius: '12px', animation: 'slUp 0.3s' }}>
                <div style={{ color: 'var(--ok)', fontWeight: '900' }}>✓ Bienvenido, {liderInfo.nombre}</div>
                <div style={{ fontSize: '11px', color: 'var(--tx2)', marginTop: '2px' }}>{liderInfo.detalle}</div>
             </div>
           )}
        </div>
      </div>

      <div className="card" style={{ marginTop: '15px' }}>
        <div className="dct"><i className="fas fa-calendar-check"></i> Paso 2: Detalles de la Reunión y Asistencia</div>
        <div className="fg2">
           <div className="fgg half"><label>Fecha Reporte</label><input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="fc" /></div>
           <div className="fgg half"><label>Tipo de Encuentro</label>
             <select name="tipoReunion" value={formData.tipoReunion} onChange={handleChange} className="fc">
                <option>Reunión Regular</option>
                <option>Especial / Aniversario</option>
                <option>Célula Juvenil</option>
             </select>
           </div>
        </div>

        <div className="dct" style={{ marginTop: '25px', color: 'var(--tx2)' }}><i className="fas fa-user-friends"></i> Participantes en Casa</div>
        <div className="fg2" style={{ gap: '10px' }}>
           <div className="fgg" style={{ flex: 1 }}><label>Hermanos</label><input type="number" name="hermanos" value={formData.hermanos} onChange={handleChange} className="fc" /></div>
           <div className="fgg" style={{ flex: 1 }}><label>Amigos</label><input type="number" name="amigos" value={formData.amigos} onChange={handleChange} className="fc" /></div>
           <div className="fgg" style={{ flex: 1 }}><label>Niños</label><input type="number" name="ninos" value={formData.ninos} onChange={handleChange} className="fc" /></div>
        </div>
        <div style={{ marginTop: '15px', background: 'var(--pr3)', color: '#fff', borderRadius: '10px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--ac)' }}>ASISTENCIA GRUPO FAMILIAR</span>
           <span style={{ fontSize: '28px', fontWeight: '900' }}>{totalAsist}</span>
        </div>
      </div>

      <div className="card" style={{ marginTop: '15px' }}>
        <div className="dct"><i className="fas fa-church"></i> Paso 3: Asistencia a Cultos Centrales</div>
        <div className="fg2">
           <div className="fgg half"><label>Martes (Enseñanza)</label><input type="number" name="martes" value={formData.martes} onChange={handleChange} className="fc" /></div>
           <div className="fgg half"><label>Jueves (Oración)</label><input type="number" name="jueves" value={formData.jueves} onChange={handleChange} className="fc" /></div>
           <div className="fgg half"><label>Domingo (General)</label><input type="number" name="domingo" value={formData.domingo} onChange={handleChange} className="fc" /></div>
           <div className="fgg half"><label>Otros Servicios</label><input type="number" name="otros" value={formData.otros} onChange={handleChange} className="fc" /></div>
        </div>
        <div style={{ marginTop: '15px', background: 'var(--bg3)', border: '1.5px solid var(--ok)', borderRadius: '10px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--ok)' }}>ASISTENCIA TOTAL IGLESIA</span>
           <span style={{ fontSize: '28px', fontWeight: '900', color: 'var(--ok)' }}>{totalCultos}</span>
        </div>
      </div>

      <div className="card" style={{ marginTop: '15px' }}>
        <div className="dct"><i className="fas fa-wallet"></i> Paso 4: Ofrendas y Observaciones</div>
        <div className="fg2">
           <div className="fgg half"><label>Ofrenda General (Q)</label><input type="number" name="ofrendaIglesia" value={formData.ofrendaIglesia} onChange={handleChange} className="fc" /></div>
           <div className="fgg half"><label>Ofrenda Bus / Transporte (Q)</label><input type="number" name="ofrendaBus" value={formData.ofrendaBus} onChange={handleChange} className="fc" /></div>
        </div>
        <div style={{ marginTop: '15px', background: '#fff9e6', border: '1.5px solid var(--ac)', borderRadius: '10px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--ac)' }}>MONTO TOTAL OFRENDADO</span>
           <span style={{ fontSize: '28px', fontWeight: '900', color: 'var(--ac)' }}>Q {totalOf}</span>
        </div>

        <div className="fgg full" style={{ marginTop: '20px' }}>
           <label>Bitácora de Seguimientos u Observaciones</label>
           <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} className="fc" rows="3" placeholder="Detalle si hubo convertidos, reconciliados o necesidades especiales..."></textarea>
        </div>

        <button onClick={handleEnviar} className="btn btn-pr" style={{ width: '100%', marginTop: '30px', padding: '18px', fontSize: '16px', fontWeight: '900' }}>
           📤 FIRMAR Y ENVIAR REPORTE SEMANAL
        </button>
      </div>
    </div>
  )
}
