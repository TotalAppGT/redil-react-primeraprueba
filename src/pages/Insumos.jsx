import React, { useState, useEffect } from 'react'
import { supabaseService } from '../services/supabaseService'
import { useBranding } from '../context/BrandingContext'

export default function Insumos() {
  const { branding } = useBranding()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: res } = await supabaseService.getInsumos()
      if (res) setData(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-cubes" style={{ color: 'var(--tl)' }}></i> Gestión de Insumos y Consumibles</h2>
        <div className="mod-acts">
           <button className="btn btn-ok"><i className="fas fa-plus"></i> REGISTRAR INGRESO</button>
           <button className="btn btn-pr" onClick={loadData}><i className="fas fa-sync"></i> RECARGAR</button>
        </div>
      </div>

      <div className="sg">
        <div className="sc t"><div className="sc-ico"><i className="fas fa-exclamation-triangle"></i></div><div className="sc-v">{data.filter(x => x.cantidad <= x.minimo).length}</div><div className="sc-l">ALERTA: STOCK BAJO</div></div>
        <div className="sc p"><div className="sc-ico"><i className="fas fa-shopping-cart"></i></div><div className="sc-v">Q {data.reduce((s, x) => s + (x.valor_unidad || 0) * x.cantidad, 0).toLocaleString()}</div><div className="sc-l">VALOR EN BODEGA</div></div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Insumo / Descripción</th>
                <th>Existencia</th>
                <th>Mínimo</th>
                <th>Categoría</th>
                <th>Gestión</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-circle-notch fa-spin"></i> Cargando insumos...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-box" style={{ fontSize: '30px', color: 'var(--tx3)' }}></i><p>Sin insumos registrados.</p></td></tr>
              ) : (
                data.map(x => (
                  <tr key={x.id}>
                    <td><b>{x.nombre}</b><div style={{ fontSize: '10px', color: 'var(--tx2)' }}>{x.descripcion}</div></td>
                    <td>
                      <div style={{ fontSize: '16px', fontWeight: '900', color: x.cantidad <= x.minimo ? 'var(--err)' : 'var(--ok)' }}>{x.cantidad} {x.unidad || 'Unid.'}</div>
                      {x.cantidad <= x.minimo && <span style={{ fontSize: '10px', color: 'var(--err)', fontWeight: '800' }}>⚠ REQUIERE COMPRA</span>}
                    </td>
                    <td>{x.minimo}</td>
                    <td>{x.categoria}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button className="btn btn-ok btn-sm" title="Agregar stock"><i className="fas fa-plus"></i></button>
                        <button className="btn btn-err btn-sm" title="Retirar stock"><i className="fas fa-minus"></i></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
