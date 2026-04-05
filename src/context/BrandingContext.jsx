import React, { createContext, useContext, useState, useEffect } from 'react'

const BrandingContext = createContext();

export function BrandingProvider({ children }) {
  // Inicialización Segura
  const getInitialBranding = () => {
    try {
      return {
        nombre: localStorage.getItem('redil_nombre') || 'Iglesia Restauración',
        logo: localStorage.getItem('redil_logo') || '',
        colorPr: localStorage.getItem('redil_colorPr') || '#1a3a5c',
        colorAc: localStorage.getItem('redil_colorAc') || '#e8a020',
        metaGrupos: localStorage.getItem('redil_metaGrupos') || '407',
        sistemaActivo: localStorage.getItem('redil_sistemaActivo') !== 'NO'
      };
    } catch (e) {
      console.error("Local Storage Error:", e);
      return {
        nombre: 'Iglesia Restauración',
        logo: '',
        colorPr: '#1a3a5c',
        colorAc: '#e8a020',
        metaGrupos: '407',
        sistemaActivo: true
      };
    }
  };

  const [branding, setBranding] = useState(getInitialBranding);

  // Sincronización Segura
  useEffect(() => {
    if (!branding) return;
    
    try {
      const root = document.documentElement;
      root.style.setProperty('--pr', branding.colorPr);
      root.style.setProperty('--ac', branding.colorAc);
      
      localStorage.setItem('redil_nombre', branding.nombre);
      localStorage.setItem('redil_logo', branding.logo || '');
      localStorage.setItem('redil_colorPr', branding.colorPr);
      localStorage.setItem('redil_colorAc', branding.colorAc);
      localStorage.setItem('redil_metaGrupos', branding.metaGrupos);
      localStorage.setItem('redil_sistemaActivo', branding.sistemaActivo ? 'SI' : 'NO');
    } catch (e) {
      console.error("Local Storage Save Error:", e);
    }
  }, [branding]);

  const updateBranding = (newBranding) => {
    setBranding(prev => ({ ...prev, ...newBranding }));
  };

  return (
    <BrandingContext.Provider value={{ branding, updateBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};
