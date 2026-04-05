import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useBranding } from '../context/BrandingContext'

export default function Login() {
  const { branding } = useBranding()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        setErrorMsg('Error: ' + error.message)
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setErrorMsg('Error de conexión con el servidor REDIL.')
    } finally {
      setLoading(false)
    }
  }

  // Si el sistema está desactivado (solo el admin debería entrar, pero para simplificar lo bloqueamos)
  if (branding?.sistemaActivo === false) {
    return (
      <div className="login-screen" style={{ display: 'flex' }}>
        <div className="login-card" style={{ textAlign: 'center', borderColor: 'var(--err)', borderTop: '6px solid var(--err)' }}>
          <div style={{ fontSize: '60px', marginBottom: '15px' }}>🔒</div>
          <h2 style={{ fontFamily: 'var(--fn2)', fontWeight: '900', color: 'var(--pr)' }}>Sistema en Mantenimiento</h2>
          <p style={{ color: 'var(--tx2)', fontSize: '14px', marginTop: '10px', lineHeight: '1.6' }}>
            {branding?.msgMantenimiento || 'El sistema no se encuentra disponible temporalmente. Por favor, vuelva a intentarlo más tarde.'}
          </p>
          <button className="btn btn-pr" style={{ marginTop: '20px' }} onClick={() => window.location.reload()}>REINTENTAR</button>
        </div>
      </div>
    )
  }

  return (
    <div className="login-screen" style={{ display: 'flex' }}>
      <div className="login-bg">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon" style={{ background: 'var(--pr)' }}>
            {branding?.logo ? (
              <img src={branding.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <i className="fas fa-church"></i>
            )}
          </div>
          <h1 style={{ color: 'var(--pr)' }}>{branding?.nombre || 'Iglesia Restauración'}</h1>
          <p>Sistema de Gestión v6.2 (SaaS PRO)</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="fg">
            <label><i className="fas fa-envelope"></i> Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="lider@iglesia.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="fg pw-wrap">
            <label><i className="fas fa-lock"></i> Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          {errorMsg && <div className="login-err">{errorMsg}</div>}
          
          <button type="submit" className="btn-login" style={{ background: 'var(--pr)' }} disabled={loading}>
            {loading ? 'Validando Credenciales...' : 'INGRESAR AL SISTEMA'}
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '10px', color: 'var(--tx3)', marginTop: '20px' }}>
          &copy; {new Date().getFullYear()} REDIL SaaS v6.2 • Cloud Infrastructure
        </p>
      </div>
    </div>
  )
}
