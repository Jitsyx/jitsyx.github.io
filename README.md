# JITSYX CSA — Web de servicios de ciberseguridad

Landing de una página con autoevaluación de riesgo (basada en CIS Controls v8, IG1) y formulario de contacto.
Hecha con React + Vite, publicada gratis en GitHub Pages, con los datos guardados en Supabase.

## 1. Instalar

```bash
npm install
npm install lucide-react
```

Copiá los archivos de este paquete sobre tu proyecto `jitsyxcsa-web` (respeta la misma estructura de carpetas).
Tu imagen `src/assets/hero-banner.png` se usa como fondo del hero.

## 2. Base de datos (Supabase, plan gratuito)

1. Creá un proyecto en https://supabase.com (región recomendada: São Paulo).
2. En **SQL Editor**, pegá el contenido de `supabase.sql` y ejecutalo.
3. En **Project Settings > API** copiá la URL y la clave `anon` / `publishable`.
4. Copiá `.env.example` como `.env` y pegá esos dos valores.
5. `npm run dev` y probá enviar una autoevaluación. Los datos aparecen en **Table Editor**.

La clave anon es pública por diseño: las políticas RLS solo permiten **insertar**.
Nadie puede leer los datos desde la web. **Nunca** uses la clave `service_role` en el frontend.

## 3. Publicar en GitHub Pages

1. En `vite.config.js`, `base` debe ser `'/NOMBRE-DE-TU-REPO/'`.
2. En GitHub: **Settings > Secrets and variables > Actions** → creá `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
3. En **Settings > Pages**, en *Source* elegí **GitHub Actions**.
4. Hacé push a `main`. El workflow `.github/workflows/deploy.yml` compila y publica solo.

## 4. Personalizar

- Contacto, LinkedIn, GitHub: `src/config.js`
- Preguntas y puntajes: `src/data/questions.js`
- Textos legales: final de `src/components/Footer.jsx` (conviene que los revise un abogado)

## Ver las evaluaciones

En Supabase > Table Editor > `assessments`. La columna `respuestas` tiene cada pregunta con su respuesta
y su nivel de riesgo, lista para armar el informe. Usá la columna `estado` para tu seguimiento
(`nuevo`, `contactado`, `informe_enviado`, `cliente`, `descartado`).
