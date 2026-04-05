import React, { createContext, useContext, useState, useEffect } from 'react'

const BrandingContext = createContext()

export function BrandingProvider({ children }) {
  const [branding, setBranding] = useState({
    nombre: localStorage.getItem('redil_nombre') || 'Iglesia Restauración',
    logo: localStorage.getItem('redil_logo') || '',
    colorPr: localStorage.getItem('redil_colorPr') || '#1a3a5c',
    colorAc: localStorage.getItem('redil_colorAc') || '#e8a020',
    metaGrupos: localStorage.getItem('redil_metaGrupos') || '407',
    sistemaActivo: localStorage.getItem('redil_sistemaActivo') !== 'NO',
  })

  // Aplicar variables CSS dinámicamente
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--pr', branding.colorPr)
    root.style.setProperty('--ac', branding.colorAc)
    // Generar un color oscuro derivado para el sidebar si es necesario
    // root.style.setProperty('--pr3', darkenColor(branding.colorPr, 20)); 
    
    localStorage.setItem('redil_nombre', branding.nombre)
    localStorage.setItem('redil_logo', branding.logo)
    localStorage.setItem('redil_colorPr', branding.colorPr)
    localStorage.setItem('redil_colorAc', branding.colorAc)
    localStorage.setItem('redil_metaGrupos', branding.metaGrupos)
    localStorage.setItem('redil_sistemaActivo', branding.sistemaActivo ? 'SI' : 'NO')
  }, [branding])

  const updateBranding = (newBranding) => {
    setBranding(prev => ({ ...prev, ...newBranding }))
  }

  return (
    <BrandingContext.Provider value={{ branding, updateBranding }}>
      {children}
    </BrandingContext.Provider>
  )
}

export const useBranding = () => useContext(BrandingContext)
