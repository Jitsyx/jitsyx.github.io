-- =====================================================================
-- JITSYX CSA - Base de datos en Supabase
-- Pegá todo esto en Supabase > SQL Editor > New query > Run
-- El público SOLO puede insertar. Nadie puede leer desde la web.
-- Vos ves los datos desde el panel de Supabase (Table Editor).
-- =====================================================================

-- Autoevaluaciones
create table if not exists public.assessments (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  nombre          text not null check (char_length(nombre) between 2 and 120),
  empresa         text not null check (char_length(empresa) between 2 and 120),
  rubro           text check (char_length(rubro) <= 80),
  email           text not null check (char_length(email) <= 160 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  telefono        text check (char_length(telefono) <= 40),
  respuestas      jsonb not null check (jsonb_typeof(respuestas) = 'array' and pg_column_size(respuestas) < 20000),
  riesgo          int  not null check (riesgo between 0 and 100),
  nivel           text not null check (nivel in ('BAJO', 'MEDIO', 'ALTO')),
  consentimiento  boolean not null check (consentimiento = true),
  estado          text not null default 'nuevo' check (estado in ('nuevo', 'contactado', 'informe_enviado', 'cliente', 'descartado'))
);

-- Solicitudes de consultoría
create table if not exists public.contact_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null check (char_length(nombre) between 2 and 120),
  empresa     text not null check (char_length(empresa) between 2 and 120),
  email       text not null check (char_length(email) <= 160 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  telefono    text check (char_length(telefono) <= 40),
  mensaje     text not null check (char_length(mensaje) between 10 and 2000),
  estado      text not null default 'nuevo' check (estado in ('nuevo', 'contactado', 'cerrado'))
);

-- Seguridad: activar RLS y permitir SOLO insert anónimo
alter table public.assessments      enable row level security;
alter table public.contact_requests enable row level security;

grant insert on public.assessments      to anon;
grant insert on public.contact_requests to anon;

drop policy if exists "publico_solo_inserta" on public.assessments;
create policy "publico_solo_inserta" on public.assessments
  for insert to anon with check (estado = 'nuevo');

drop policy if exists "publico_solo_inserta" on public.contact_requests;
create policy "publico_solo_inserta" on public.contact_requests
  for insert to anon with check (estado = 'nuevo');

-- No se crean políticas de SELECT/UPDATE/DELETE: con RLS activo, quedan bloqueadas para el público.
