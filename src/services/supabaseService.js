import { supabase } from '../supabaseClient'

/**
 * SERVICIO CENTRAL DE DATOS - REDIL v6.2 PRO
 * Este servicio abstrae todas las operaciones de Supabase para facilitar la transición.
 */

export const supabaseService = {
  // --- CONFIGURACIÓN ---
  async getConfig() {
    const { data, error } = await supabase
      .from('config')
      .select('*')
    if (error) throw error
    // Convertir array de {clave, valor} a un objeto mapa
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
    const { error } = await supabase
      .from('config')
      .upsert(updates, { onConflict: 'clave' })
    return { ok: !error, error }
  },

  // --- LÍDERES (HERMANOS) ---
  async getHermanos() {
    const { data, error } = await supabase
      .from('hermanos')
      .select('*')
      .order('nombre_l', { ascending: true })
    return { data, error }
  },

  async getHermanoByCodigo(codigo) {
    const { data, error } = await supabase
      .from('hermanos')
      .select('*')
      .eq('codigo_l', codigo)
      .maybeSingle()
    return { data, error }
  },

  // --- REPORTES DE GRUPO ---
  async getReportes(filtros = {}) {
    let query = supabase.from('reportes').select('*')
    
    if (filtros.desde) query = query.gte('fecha', filtros.desde)
    if (filtros.hasta) query = query.lte('fecha', filtros.hasta)
    if (filtros.codigo) query = query.eq('codigo', filtros.codigo)
    if (filtros.pendientes) query = query.eq('ofrenda_recibida', 'Pendiente')
    
    const { data, error } = await query.order('fecha', { ascending: false })
    return { data, error }
  },

  async saveReporte(reportData) {
    // 1. Guardar el reporte principal
    const { data, error } = await supabase
      .from('reportes')
      .upsert(reportData)
      .select()
      .single()

    if (error) return { ok: false, error }

    // 2. Auto-crear seguimientos si existen en el form
    const seguimientos = []
    if (reportData.nombre_persona) seguimientos.push({ persona: reportData.nombre_persona, tipo: reportData.tipo_seguimiento })
    if (reportData.nombre_persona_2) seguimientos.push({ persona: reportData.nombre_persona_2, tipo: reportData.tipo_seguimiento_2 })
    if (reportData.nombre_persona_3) seguimientos.push({ persona: reportData.nombre_persona_3, tipo: reportData.tipo_seguimiento_3 })

    if (seguimientos.length > 0) {
      const segInserts = seguimientos.map(s => ({
        fecha: reportData.fecha,
        persona: s.persona,
        tipo: s.tipo,
        responsable: reportData.lider,
        estado: 'Pendiente',
        fecha_registro: new Date().toISOString()
      }))
      await supabase.from('seguimientos').insert(segInserts)
    }

    return { ok: true, data }
  },

  // --- FINANZAS (DIEZMOS) ---
  async getDiezmos(desde, hasta) {
    let query = supabase.from('diezmos').select('*')
    if (desde) query = query.gte('fecha', desde)
    if (hasta) query = query.lte('fecha', hasta)
    const { data, error } = await query.order('fecha', { ascending: false })
    return { data, error }
  },

  async saveDiezmo(diezmoData) {
    const { data, error } = await supabase
      .from('diezmos')
      .upsert(diezmoData)
    return { ok: !error, data, error }
  },

  // --- CRONOGRAMA ---
  async getCronograma() {
    const { data, error } = await supabase
      .from('cronograma')
      .select('*')
      .eq('activo', 'SI')
    return { data, error }
  },

  // --- BITÁCORA ---
  async addLog(accion, detalles) {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('bitacora').insert({
      usuario: user?.email || 'Sistema',
      accion,
      detalles,
      fecha_hora: new Date().toISOString()
    })
  }
}
