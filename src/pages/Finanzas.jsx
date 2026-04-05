import React from 'react'

export default function Finanzas() {
  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-wallet"></i> Módulo de Finanzas y Diezmos</h2>
        <div className="mod-acts">
          <button className="btn btn-pr"><i className="fas fa-file-pdf"></i> Informe Financiero (PDF)</button>
          <button className="btn btn-ok"><i className="fas fa-plus"></i> Registrar Ingreso</button>
        </div>
      </div>

      <div className="sg">
        <div className="sc g">
          <div className="sc-ico"><i className="fas fa-coins"></i></div>
          <div className="sc-v">Q 45,900</div>
          <div className="sc-l">Acumulado del Mes</div>
        </div>
        <div className="sc o">
          <div className="sc-ico"><i className="fas fa-hand-holding-usd"></i></div>
          <div className="sc-v">Q 12,050</div>
          <div className="sc-l">Ingresado esta semana</div>
        </div>
        <div className="sc r">
          <div className="sc-ico"><i className="fas fa-file-invoice"></i></div>
          <div className="sc-v">8</div>
          <div className="sc-l">Aportes sin conciliar</div>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Transacción ID</th>
                <th>Origen / Sede</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#TRX-00192</td>
                <td>Sede Central (Alfolí)</td>
                <td>Diezmos Gral.</td>
                <td><strong>Q 4,500.00</strong></td>
                <td>Hoy, 10:15 AM</td>
                <td><span className="stat-pill pill-ok">Conciliado</span></td>
              </tr>
              <tr>
                <td>#TRX-00191</td>
                <td>Zona Norte</td>
                <td>Ofrenda Misionera</td>
                <td><strong>Q 1,200.00</strong></td>
                <td>Ayer</td>
                <td><span className="stat-pill pill-ok">Conciliado</span></td>
              </tr>
              <tr>
                <td>#TRX-00190</td>
                <td>Transferencia Banco</td>
                <td>Donación Anónima</td>
                <td><strong>Q 800.00</strong></td>
                <td>01 Abr, 2026</td>
                <td><span className="stat-pill pill-err">Pendiente</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
