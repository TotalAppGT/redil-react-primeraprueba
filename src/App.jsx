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

// Error Boundary Simple
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("CRITICAL ERROR:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8d7da', color: '#721c24', padding: '20px', textAlign: 'center' }}>
          <h1>🛑 Error Crítico Detectado</h1>
          <p>El sistema ha tenido un problema grave. Por favor, recarga la página o contacta al administrador.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', background: '#721c24', color: '#fff', border: 'none', borderRadius: '5px' }}>Recargar Aplicación</button>
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
