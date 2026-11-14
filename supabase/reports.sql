-- Vivoya flight-surgeon inbox (Supabase / Postgres). Applied to project "vivoya" (eu-central-1).
-- Astronauts can SUBMIT a report through the public key; nobody can read, change or delete through the public API.
-- Flight surgeons read reports in the Supabase dashboard, where they can set status and note.
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  callsign text check (callsign is null or char_length(callsign) between 1 and 40),
  env text not null check (env in ('leo', 'moon', 'transit', 'mars')),
  level smallint not null check (level between 0 and 3),
  summary text not null check (char_length(summary) between 1 and 2000),
  payload jsonb not null check (jsonb_typeof(payload) = 'object' and pg_column_size(payload) <= 32000),
  status text not null default 'new' check (status in ('new', 'seen', 'reviewed')),
  note text
);
comment on table public.reports is 'Vivoya opt-in health reports sent by crew to the flight surgeon. Insert-only for the public API.';

alter table public.reports enable row level security;

-- only these columns may be written by clients; status, note, id and created_at stay server-controlled
revoke all on table public.reports from anon, authenticated;
grant insert (callsign, env, level, summary, payload) on table public.reports to anon, authenticated;

create policy "crew can submit reports" on public.reports
  for insert to anon, authenticated
  with check (true);
