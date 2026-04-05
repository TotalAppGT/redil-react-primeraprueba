import React, { useState } from 'react'

export default function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: '¡Hola! Soy Redil-IA, tu asistente personal. ¿En qué puedo ayudarte con la gestión de tu iglesia hoy?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if(!input.trim()) return

    setMessages([...messages, { role: 'me', text: input }])
    setInput('')

    // Simular respuesta de IA
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'Estoy procesando tu solicitud. Pronto podré generar reportes y responder preguntas sobre tu base de datos mediante la API de Google Gemini.'}])
    }, 1000)
  }

  return (
    <>
      {/* Botón Flotante */}
      <div className="ai-bubble" onClick={() => setOpen(!open)}>
        <i className="fas fa-robot"></i>
      </div>

      {/* Panel de Chat */}
      <div className={`ai-panel ${open ? '' : 'closed'}`}>
        <div className="ai-hdr">
          <i className="fas fa-robot"></i>
          <span>Redil IA (Pro)</span>
          <button style={{color: '#fff'}} onClick={() => setOpen(false)}><i className="fas fa-times"></i></button>
        </div>
        
        <div className="ai-body">
          {messages.map((m, idx) => (
            <div key={idx} className={`msg ${m.role}`}>
              {m.text}
            </div>
          ))}
        </div>

        <form className="ai-foot" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Escribe tu consulta..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit"><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </>
  )
}
