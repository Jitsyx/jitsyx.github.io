import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANTE: "base" tiene que coincidir con el nombre de tu repositorio en GitHub.
// Si el repo se llama "jitsyxcsa-web", la web queda en https://TU-USUARIO.github.io/jitsyxcsa-web/
// Si usás un dominio propio o el repo TU-USUARIO.github.io, cambiá base a '/'.
export default defineConfig({
  plugins: [react()],
  base: '/jitsyxcsa-web/',
})
