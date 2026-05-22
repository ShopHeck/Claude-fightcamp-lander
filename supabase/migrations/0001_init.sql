-- Fight Camp waitlist schema
-- Run this in Supabase SQL editor (or via `supabase db push`) on a fresh project.

create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  discipline text,
  weight_class text,
  current_weight numeric(5,1),
  target_weight numeric(5,1),
  fight_date date,
  fighter_level text,
  signup_source text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_country text,
  ip_city text,
  user_agent text,
  email_status text default 'pending',
  invited boolean default false,
  invited_at timestamptz,
  created_at timestamptz default now(),
  constraint waitlist_email_lower_uniq unique (email)
);

create index if not exists waitlist_created_idx on public.waitlist (created_at desc);
create index if not exists waitlist_discipline_idx on public.waitlist (discipline);

-- City-only public view for the live signup ticker (no PII)
create or replace view public.recent_signups as
  select ip_city as city, discipline, created_at
  from public.waitlist
  where ip_city is not null and ip_city <> ''
  order by created_at desc
  limit 20;

alter table public.waitlist enable row level security;
-- No anon policies = anon cannot read or write the table directly.
-- All writes happen server-side via the service-role key.

grant select on public.recent_signups to anon;
