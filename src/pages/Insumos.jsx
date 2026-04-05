import React, { useState } from 'react'

export default function Insumos() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data basado en los encabezados reales: ID, Articulo, Categoria, Cantidad, Unidad, PrecioUnitarioQ, StockMinimo, Proveedor, Observaciones
  const [insumos, setInsumos] = useState([
    { id: '1', Articulo: 'Aceite p. Ungir', Categoria: 'Servicio', Cantidad: 12, Unidad: 'Frascos', PrecioUnitarioQ: 35.00, StockMinimo: 5, Proveedor: 'Librería Cristiana', Observaciones: 'Fragancia Nardo' },
    { id: '2', Articulo: 'Hojas Bond Carta', Categoria: 'Oficina', Cantidad: 250, Unidad: 'Hojas', PrecioUnitarioQ: 0.15, StockMinimo: 500, Proveedor: 'Papelería El Faro', Observaciones: 'Solo quedan en bodega 1 resma' },
    { id: '3', Articulo: 'Detergente Líquido', Categoria: 'Limpieza', Cantidad: 45, Unidad: 'Litros', PrecioUnitarioQ: 14.50, StockMinimo: 10, Proveedor: 'Supermercado', Observaciones: 'Uso general' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-spray-can"></i> Control de Insumos (Consumibles)</h2>
        <div className="mod-acts">
          <button className="btn btn-pr btn-sm"><i className="fas fa-plus"></i> Registrar Gasto</button>
          <button className="btn btn-ok btn-sm"><i className="fas fa-file-excel"></i> Exportar</button>
        </div>
      </div>

      <div className="sg">
        <div className="sc p">
          <div className="sc-ico"><i className="fas fa-cart-plus"></i></div>
          <div className="sc-v">Q 1,240</div>
          <div className="sc-l">Gasto en Consumibles (Mes)</div>
        </div>
        <div className="sc r">
          <div className="sc-ico"><i className="fas fa-exclamation-triangle"></i></div>
          <div className="sc-v">2</div>
          <div className="sc-l">Artículos con Bajo Stock</div>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '15px', display: 'flex', gap: '10px', borderBottom: '1px solid var(--brd)' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '5px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar insumo..." 
              className="fc" 
              style={{ border: 'none', background: 'none' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="fc" style={{ width: '180px' }}>
            <option>Todas las Categorías</option>
            <option>Oficina</option>
            <option>Limpieza</option>
            <option>Servicio</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Insumo</th>
                <th>Categoría / Proveedor</th>
                <th>Existencia</th>
                <th>Stock Min.</th>
                <th>Precio Unit.</th>
                <th>Costo Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {insumos.map(i => (
                <tr key={i.id}>
                  <td><strong>{i.Articulo}</strong></td>
                  <td>
                    <div style={{ fontSize: '13px' }}>{i.Categoria}</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{i.Proveedor}</div>
                  </td>
                  <td>
                    <span className={`stat-pill ${i.Cantidad <= i.StockMinimo ? 'pill-err' : 'pill-ok'}`} style={{ fontWeight: '800' }}>
                      {i.Cantidad} {i.Unidad}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--tx2)' }}>{i.StockMinimo}</td>
                  <td>Q {i.PrecioUnitarioQ.toFixed(2)}</td>
                  <td><strong>Q {(i.Cantidad * i.PrecioUnitarioQ).toFixed(2)}</strong></td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button className="tb-btn" title="Descargar stock" style={{ color: 'var(--err)' }}><i className="fas fa-minus-circle"></i></button>
                      <button className="tb-btn" title="Añadir stock" style={{ color: 'var(--ok)' }}><i className="fas fa-plus-circle"></i></button>
                      <button className="tb-btn" title="Editar"><i className="fas fa-edit"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
