import React, { useState } from 'react'

export default function CargaMasiva() {
  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-file-upload"></i> Carga Masiva de Datos (CSV / Excel)</h2>
        <div className="mod-acts">
           <button className="btn btn-ol btn-sm"><i className="fas fa-download"></i> Descargar Plantilla</button>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center', padding: '40px' }}>
         <div style={{ marginBottom: '25px' }}>
            <i className="fas fa-file-csv" style={{ fontSize: '64px', color: 'var(--pr)', opacity: 0.2 }}></i>
         </div>
         <h3>Importación Maestro de Líderes</h3>
         <p style={{ color: 'var(--tx2)', fontSize: '14px', marginBottom: '30px' }}>
            Selecciona un archivo .csv o .xlsx para cargar múltiples líderes o registros al sistema de forma automática. 
            Asegúrate de seguir el orden de las columnas de la plantilla.
         </p>
         
         <div className="drop-zone" style={{ cursor: 'pointer', border: '3px dashed var(--brd)', borderRadius: '15px', padding: '40px', background: 'var(--bg3)' }}>
            <i className="fas fa-upload" style={{ fontSize: '28px', color: 'var(--pr)', marginBottom: '10px' }}></i>
            <p style={{ fontWeight: '800', color: 'var(--pr)' }}>Haz clic o arrastra tu archivo aquí</p>
            <span style={{ fontSize: '11px', color: 'var(--tx3)' }}>Formato soportado: .XLSX, .CSV (Max 10MB)</span>
            <input type="file" style={{ display: 'none' }} />
         </div>

         <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn btn-pr" style={{ padding: '12px 30px' }}>Iniciar Carga Masiva</button>
         </div>
      </div>
    </div>
  )
}
