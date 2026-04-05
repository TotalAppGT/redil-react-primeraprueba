import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BrandingProvider } from './context/BrandingContext'

// Lazy Loading para mejor performance y evitar bloqueos en el hilo principal
const Login = lazy(() => import('./pages/Login'))
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'))
const Home = lazy(() => import('./pages/Home'))
const Configuracion = lazy(() => import('./pages/Configuracion'))
const Asistencia = lazy(() => import('./pages/Asistencia'))
const ReporteDigital = lazy(() => import('./pages/ReporteDigital'))
const Hermanos = lazy(() => import('./pages/Hermanos'))
const Cronograma = lazy(() => import('./pages/Cronograma'))
const Finanzas = lazy(() => import('./pages/Finanzas'))
const Generador = lazy(() => import('./pages/Generador'))

// Error Boundary Simple
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { 
    this.setState({ errorInfo: error.toString() });
    console.error("CRITICAL ERROR:", error, errorInfo); 
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff5f5', color: '#c53030', padding: '30px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛑</div>
          <h1 style={{ fontWeight: '900', marginBottom: '10px' }}>Error Crítico Detectado</h1>
          <p style={{ fontSize: '14px', maxWidth: '500px', margin: '0 auto 20px', color: '#7b2d2d' }}>
            El sistema ha encontrado un problema técnico inesperado.
          </p>
          <div style={{ background: '#fff', padding: '15px', borderRadius: '10px', fontSize: '12px', fontFamily: 'monospace', border: '1.5px dashed #feb2b2', maxWidth: '80%', overflowX: 'auto', marginBottom: '20px' }}>
             <strong>DETALLE TÉCNICO:</strong><br/>
             {this.state.errorInfo || 'No se pudo capturar el mensaje de error.'}
          </div>
          <button onClick={() => window.location.reload()} style={{ padding: '12px 25px', background: '#c53030', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 12px rgba(197, 48, 48, 0.3)' }}>
            RECARGAR APLICACIÓN
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrandingProvider>
        <BrowserRouter>
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' }}>Cargando REDIL Cloud...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              
              {/* Rutas Protegidas de Administración */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Home />} />
                <Route path="configuracion" element={<Configuracion />} />
                <Route path="asistencia" element={<Asistencia />} />
                <Route path="reporte-digital" element={<ReporteDigital />} />
                <Route path="hermanos" element={<Hermanos />} />
                <Route path="cronograma" element={<Cronograma />} />
                <Route path="finanzas" element={<Finanzas />} />
                <Route path="generador" element={<Generador />} />
                {/* Fallback para el dashboard panel */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>

              {/* Redirección por defecto */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </BrandingProvider>
    </ErrorBoundary>
  )
}

export default App
