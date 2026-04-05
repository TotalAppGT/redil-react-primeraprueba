import React, { useState } from 'react'

export default function Inventario() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('activos')

  // Mock data basado en los encabezados reales: ID, Articulo, Categoria, Cantidad, Unidad, Estado, Ubicacion, ValorQ, Observaciones
  const [items, setItems] = useState([
    { id: '1', Articulo: 'Bocinas JBL 15"', Categoria: 'Sonido', Cantidad: 2, Unidad: 'Unidades', Estado: 'Bueno', Ubicacion: 'Auditorio Ppal.', ValorQ: 4500.00, Observaciones: 'Mantenimiento preventivo en Marzo' },
    { id: '2', Articulo: 'Sillas Plásticas Azules', Categoria: 'Mobiliario', Cantidad: 150, Unidad: 'Unidades', Estado: 'Regulares', Ubicacion: 'Bodega 1', ValorQ: 120.00, Observaciones: 'Varios necesitan reparación' },
    { id: '3', Articulo: 'Proyector Epson L500', Categoria: 'Tecnología', Cantidad: 1, Unidad: 'Unidades', Estado: 'Nuevo', Ubicacion: 'Salón Clima', ValorQ: 8900.00, Observaciones: 'Garantía vigente' },
  ])

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-boxes"></i> Inventario de Activos Fijos</h2>
        <div className="mod-acts">
          <button className="btn btn-pr btn-sm"><i className="fas fa-plus"></i> Añadir Activo</button>
          <button className="btn btn-ok btn-sm"><i className="fas fa-file-excel"></i> Exportar</button>
        </div>
      </div>

      <div className="sg">
        <div className="sc">
          <div className="sc-ico"><i className="fas fa-box"></i></div>
          <div className="sc-v">245</div>
          <div className="sc-l">Artículos Totales</div>
        </div>
        <div className="sc g">
          <div className="sc-ico"><i className="fas fa-check-circle"></i></div>
          <div className="sc-v">Q 58,400</div>
          <div className="sc-l">Valor del Inventario</div>
        </div>
        <div className="sc r">
          <div className="sc-ico"><i className="fas fa-tools"></i></div>
          <div className="sc-v">12</div>
          <div className="sc-l">Artículos en mal estado</div>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid var(--brd)' }}>
          <button 
            onClick={() => setActiveTab('activos')}
            style={{ 
              flex: 1, padding: '12px', border: 'none', background: activeTab === 'activos' ? '#fff' : 'var(--bg3)',
              fontWeight: '800', color: activeTab === 'activos' ? 'var(--pr)' : 'var(--tx3)',
              borderBottom: activeTab === 'activos' ? '3px solid var(--pr)' : 'none',
              cursor: 'pointer'
            }}
          >
            Activos Disponibles
          </button>
          <button 
            onClick={() => setActiveTab('mantenimiento')}
            style={{ 
              flex: 1, padding: '12px', border: 'none', background: activeTab === 'mantenimiento' ? '#fff' : 'var(--bg3)',
              fontWeight: '800', color: activeTab === 'mantenimiento' ? 'var(--err)' : 'var(--tx3)',
              borderBottom: activeTab === 'mantenimiento' ? '3px solid var(--err)' : 'none',
              cursor: 'pointer'
            }}
          >
            En Mantenimiento
          </button>
        </div>

        <div style={{ padding: '15px', display: 'flex', gap: '10px' }}>
          <div className="sb2" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg3)', padding: '5px 12px', borderRadius: '8px' }}>
            <i className="fas fa-search" style={{ color: 'var(--tx3)', marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Buscar por artículo o categoría..." 
              className="fc" 
              style={{ border: 'none', background: 'none' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="fc" style={{ width: '180px' }}>
            <option>Todas las Categorías</option>
            <option>Sonido</option>
            <option>Mobiliario</option>
            <option>Tecnología</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Artículo</th>
                <th>Categoría / Ubicación</th>
                <th>Cant.</th>
                <th>Estado</th>
                <th>Valor Unitario</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td><strong>{i.Articulo}</strong></td>
                  <td>
                    <div style={{ fontSize: '13px' }}>{i.Categoria}</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>{i.Ubicacion}</div>
                  </td>
                  <td><span className="stat-pill" style={{ background: 'var(--bg3)' }}>{i.Cantidad} {i.Unidad}</span></td>
                  <td>
                    <span className={`stat-pill ${i.Estado === 'Bueno' || i.Estado === 'Nuevo' ? 'pill-ok' : 'pill-err'}`}>
                      {i.Estado}
                    </span>
                  </td>
                  <td><strong>Q {i.ValorQ.toFixed(2)}</strong></td>
                  <td style={{ fontSize: '11.5px', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{i.Observaciones}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button className="tb-btn" title="Editar"><i className="fas fa-edit"></i></button>
                      <button className="tb-btn" title="Dar de baja" style={{ color: 'var(--err)' }}><i className="fas fa-trash"></i></button>
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
