-- Void Voyagers inbox hardening, applied 15 November 2026 to Supabase project "vivoya" (after reports.sql), following the security audit.
-- 1. Rate limit: at most 30 reports a minute across the inbox.
create or replace function public.reports_rate_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.reports where created_at > now() - interval '1 minute') >= 30 then
    raise exception 'rate limited' using errcode = 'P0001';
  end if;
  return new;
end $$;
revoke all on function public.reports_rate_limit() from public, anon, authenticated;
drop trigger if exists reports_rate_limit on public.reports;
create trigger reports_rate_limit before insert on public.reports for each row execute function public.reports_rate_limit();

-- 2. Only the public (anon) key may submit; the app has no accounts.
revoke all on table public.reports from authenticated;
drop policy if exists "crew can submit reports" on public.reports;
create policy "crew can submit reports" on public.reports for insert to anon with check (true);

-- 3. Callsigns: letters, numbers, spaces and . _ - only (no names or contact details).
alter table public.reports add constraint reports_callsign_chars
  check (callsign is null or callsign ~ '^[A-Za-z0-9 ._-]{1,40}$') not valid;

-- 4. Retention: reports are deleted 90 days after they arrive (daily at 03:00 UTC).
create extension if not exists pg_cron;
select cron.schedule('vista-purge-reports', '0 3 * * *', $$delete from public.reports where created_at < now() - interval '90 days'$$);

-- Still to do in the dashboard: Authentication > Sign In / Providers > turn off "Allow new users to sign up".

-- 5. (Second audit) The public key may insert only the five columns the app sends. This stops backdated
--    created_at values slipping past the rate limit, and spoofed status or note values.
revoke insert on table public.reports from anon;
grant insert (callsign, env, level, summary, payload) on table public.reports to anon;
alter table public.reports add constraint reports_note_len check (note is null or char_length(note) <= 4000) not valid;

-- 6. Idempotent resends: each report carries a client_id; a resend of a delivered report gets 409 and the app
--    treats that as delivered. Index on created_at keeps the rate-limit check fast.
alter table public.reports add column if not exists client_id uuid;
create unique index if not exists reports_client_id_key on public.reports (client_id);
create index if not exists reports_created_at_idx on public.reports (created_at);
grant insert (client_id) on table public.reports to anon;
