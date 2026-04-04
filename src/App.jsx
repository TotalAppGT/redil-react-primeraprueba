import React, { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    alert(`Testing Login for: ${email}`)
    // We will connect this to Supabase very soon!
  }

  return (
    <div className="login-screen">
      <div className="login-bg">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">
            <i className="fas fa-church"></i>
          </div>
          <h1>Iglesia Restauración</h1>
          <p>Sistema de Gestión v6.0 (React)</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="fg">
            <label><i className="fas fa-envelope"></i> Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="tu@correo.com" 
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
          <button type="submit" className="btn-login">
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
