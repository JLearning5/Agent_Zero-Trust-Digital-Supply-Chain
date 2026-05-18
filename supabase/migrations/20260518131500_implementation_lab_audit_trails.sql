create table if not exists public.implementation_lab_audit_trails (
  client_event_id text primary key,
  created_at timestamptz not null default timezone('utc', now()),
  decision text not null check (decision in ('allow', 'step-up', 'deny')),
  trust_score integer not null check (trust_score between 0 and 100),
  resource_tier text not null check (resource_tier in ('low', 'medium', 'high', 'critical')),
  network_zone text not null check (network_zone in ('corp', 'vendor', 'internet')),
  identity_assurance integer not null check (identity_assurance between 0 and 100),
  device_posture integer not null check (device_posture between 0 and 100),
  behavior_risk integer not null check (behavior_risk between 0 and 100),
  privileged_access boolean not null default false,
  mfa_verified boolean not null default false,
  source text not null default 'implementation_lab',
  user_agent text
);

alter table public.implementation_lab_audit_trails enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert on table public.implementation_lab_audit_trails to anon, authenticated;

drop policy if exists "implementation_lab_audit_trails_public_read" on public.implementation_lab_audit_trails;
create policy "implementation_lab_audit_trails_public_read"
on public.implementation_lab_audit_trails
for select
to anon, authenticated
using (true);

drop policy if exists "implementation_lab_audit_trails_public_insert" on public.implementation_lab_audit_trails;
create policy "implementation_lab_audit_trails_public_insert"
on public.implementation_lab_audit_trails
for insert
to anon, authenticated
with check (source = 'implementation_lab');
