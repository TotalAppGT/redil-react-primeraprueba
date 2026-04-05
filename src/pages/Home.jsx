import React from 'react'

export default function Home() {
  return (
    <div className="mod active">
      <div className="mod-hdr">
        <h2><i className="fas fa-chart-pie"></i> Rendimiento General</h2>
        <div className="mod-acts">
          <button className="btn btn-pr"><i className="fas fa-download"></i> Descargar Reporte PDF</button>
          <button className="btn btn-ok"><i className="fas fa-plus"></i> Nuevo Registro</button>
        </div>
      </div>

      <div className="sg">
        <div className="sc b">
          <div className="sc-ico"><i className="fas fa-users"></i></div>
          <div className="sc-v">1,245</div>
          <div className="sc-l">Miembros Activos</div>
        </div>
        <div className="sc g">
          <div className="sc-ico"><i className="fas fa-check-circle"></i></div>
          <div className="sc-v">89%</div>
          <div className="sc-l">Asistencia Promedio</div>
        </div>
        <div className="sc o">
          <div className="sc-ico"><i className="fas fa-wallet"></i></div>
          <div className="sc-v">Q 15,200</div>
          <div className="sc-l">Ingresos Mensuales</div>
        </div>
        <div className="sc r">
          <div className="sc-ico"><i className="fas fa-user-minus"></i></div>
          <div className="sc-v">12</div>
          <div className="sc-l">Inactivos esta semana</div>
        </div>
      </div>

      <div className="dg">
        <div className="dc">
          <div className="dct"><i className="fas fa-chart-line"></i> Crecimiento Financiero (Demo)</div>
          <div className="chart-area" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9aaab8', border: '2px dashed #d1dbe8', borderRadius: '8px' }}>
            [ Aquí instalarás la Gráfica Profesional muy pronto ]
          </div>
        </div>
        <div className="dc">
          <div className="dct"><i className="fas fa-history"></i> Actividad Reciente</div>
          <div className="ri">
             <div className="rdot"></div>
             <div className="rinfo">
               <div className="rn">Nuevo Informe Entregado</div>
               <div className="rm">Zona Central - Pr. Juan</div>
             </div>
             <div className="rv">Hace 5m</div>
          </div>
          <div className="ri">
             <div className="rdot" style={{ background: 'var(--ok)' }}></div>
             <div className="rinfo">
               <div className="rn">Aporte Registrado</div>
               <div className="rm">Sede Norte</div>
             </div>
             <div className="rv">Hace 1hr</div>
          </div>
          <div className="ri">
             <div className="rdot" style={{ background: 'var(--inf)' }}></div>
             <div className="rinfo">
               <div className="rn">Usuario Administrador Creado</div>
               <div className="rm">Por: Súper Admin</div>
             </div>
             <div className="rv">Ayer</div>
          </div>
        </div>
      </div>
    </div>
  )
}
