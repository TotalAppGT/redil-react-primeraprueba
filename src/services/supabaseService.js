import { supabase } from '../supabaseClient'

/**
 * SERVICIO CENTRAL DE DATOS - REDIL v6.2 PRO
 * Este servicio abstrae todas las operaciones de Supabase para facilitar la transición.
 */

export const supabaseService = {
  // --- CONFIGURACIÓN ---
  async getConfig() {
    const { data, error } = await supabase.from('config').select('*')
    if (error) throw error
    return data.reduce((acc, curr) => {
      acc[curr.clave] = curr.valor
      return acc
    }, {})
  },

  async saveConfig(configMap) {
    const updates = Object.entries(configMap).map(([clave, valor]) => ({
      clave,
      valor: String(valor)
    }))
    const { error } = await supabase.from('config').upsert(updates, { onConflict: 'clave' })
    return { ok: !error, error }
  },

  // --- LÍDERES (HERMANOS) ---
  async getHermanos() {
    const { data, error } = await supabase.from('hermanos').select('*').order('nombre_l', { ascending: true })
    return { data, error }
  },

  async getHermanoByCodigo(codigo) {
    const { data, error } = await supabase.from('hermanos').select('*').eq('codigo_l', codigo).maybeSingle()
    return { data, error }
  },

  // --- REPORTES DE GRUPO ---
  async getReportes(filtros = {}) {
    let query = supabase.from('reportes').select('*')
    if (filtros.desde) query = query.gte('fecha', filtros.desde)
    if (filtros.hasta) query = query.lte('fecha', filtros.hasta)
    const { data, error } = await query.order('fecha', { ascending: false })
    return { data, error }
  },

  async saveReporte(reportData) {
    const { data, error } = await supabase.from('reportes').upsert(reportData).select().single()
    return { ok: !error, data, error }
  },

  // --- FINANZAS ---
  async getDiezmos(desde, hasta) {
    let query = supabase.from('diezmos').select('*')
    if (desde) query = query.gte('fecha', desde)
    if (hasta) query = query.lte('fecha', hasta)
    const { data, error } = await query.order('fecha', { ascending: false })
    return { data, error }
  },

  // --- LOGÍSTICA (INVENTARIO E INSUMOS) ---
  async getInventario() {
    // Si la tabla no existe aún, devolvemos mock data para no romper el UI
    const { data, error } = await supabase.from('inventario').select('*').order('articulo', { ascending: true })
    if (error) return { data: [
      { id: 1, codigo: 'ACT-001', articulo: 'Sillas Plásticas', categoria: 'Mobiliario', ubicacion: 'Salón Principal', estado: 'Excelente', valor: 2500 }
    ], error: null }
    return { data, error }
  },

  async getInsumos() {
    const { data, error } = await supabase.from('insumos').select('*').order('nombre', { ascending: true })
    if (error) return { data: [
      { id: 1, nombre: 'Papel Bond Oficio', cantidad: 5, minimo: 10, unidad: 'Resmas', categoria: 'Papelería', valor_unidad: 35 }
    ], error: null }
    return { data, error }
  },

  // --- SEGURIDAD ---
  async getUsuarios() {
    const { data, error } = await supabase.from('usuarios').select('*').order('nombre', { ascending: true })
    if (error) return { data: [
      { id: 1, nombre: 'Admin Redil', email: 'admin@redil.com', rol: 'OWNER', ultimo_acceso: 'Hoy, 09:00 AM' }
    ], error: null }
    return { data, error }
  },

  async getCronograma() {
    const { data, error } = await supabase.from('cronograma').select('*').eq('activo', 'SI')
    return { data, error }
  }
}
