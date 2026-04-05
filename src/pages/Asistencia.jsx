import React from 'react'

export default function Asistencia() {
  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-folder-open"></i> Control de Asistencia</h2>
        <div className="mod-acts">
          <button className="btn btn-pr"><i className="fas fa-download"></i> Exportar a Excel</button>
          <button className="btn btn-ok"><i className="fas fa-plus"></i> Nueva Asistencia</button>
        </div>
      </div>

      <div className="card">
        <div className="ct"><i className="fas fa-list"></i> Últimos Registros (Demo)</div>
        
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Líder</th>
                <th>Red / Zona</th>
                <th>Fecha Reporte</th>
                <th>Asistencia</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Juan Pérez</strong></td>
                <td>Zona Central</td>
                <td>04 Abr, 2026</td>
                <td>45 personas</td>
                <td><span className="stat-pill pill-ok">Validado</span></td>
                <td><button className="btn btn-sm btn-pr"><i className="fas fa-eye"></i></button></td>
              </tr>
              <tr>
                <td><strong>María González</strong></td>
                <td>Sede Norte</td>
                <td>03 Abr, 2026</td>
                <td>120 personas</td>
                <td><span className="stat-pill pill-ok">Validado</span></td>
                <td><button className="btn btn-sm btn-pr"><i className="fas fa-eye"></i></button></td>
              </tr>
              <tr>
                <td><strong>Carlos Ruiz</strong></td>
                <td>Distrito 3</td>
                <td>01 Abr, 2026</td>
                <td>-</td>
                <td><span className="stat-pill pill-err">Falta Reporte</span></td>
                <td><button className="btn btn-sm btn-ok"><i className="fab fa-whatsapp"></i> Recordar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
