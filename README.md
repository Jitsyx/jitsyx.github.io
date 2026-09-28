# JITSYX CSA

Web de servicios de ciberseguridad con evaluación de riesgo (CIS Controls v8) y formulario de contacto.
React + Vite, publicada en GitHub Pages (https://jitsyx.github.io), datos en Supabase.

## Instalación
    npm install react react-dom lucide-react
    npm install -D vite @vitejs/plugin-react
    npm run dev

## Datos a personalizar
- `src/config.js`: tu correo y datos del responsable.
- `.env` (copiar de `.env.example`): URL de Supabase y clave PUBLICABLE (nunca la secreta).

## Publicación
Cada `git push` a `main` compila y publica solo (GitHub Actions).
En GitHub > Settings > Secrets and variables > Actions deben existir
`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
