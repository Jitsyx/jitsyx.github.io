// Inserción directa por la API REST de Supabase (sin instalar el SDK).
// La clave "anon"/"publishable" es pública por diseño: la seguridad la dan
// las políticas RLS de supabase.sql, que solo permiten INSERTAR.
const URL_BASE = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isConfigured = Boolean(URL_BASE && KEY)

export async function insertRow(table, row) {
  if (!isConfigured) {
    throw new Error('Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env')
  }

  const headers = {
    'Content-Type': 'application/json',
    apikey: KEY,
    Prefer: 'return=minimal',
  }
  // Las claves anon clásicas son JWT (empiezan con "eyJ") y también van como Bearer.
  // Las nuevas claves "sb_publishable_..." solo van en el header apikey.
  if (KEY.startsWith('eyJ')) headers.Authorization = `Bearer ${KEY}`

  const res = await fetch(`${URL_BASE.replace(/\/$/, '')}/rest/v1/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(row),
  })

  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${await res.text()}`)
  }
}
