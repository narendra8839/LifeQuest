-- LifeQuest Database Schema
-- Run this in the Supabase SQL Editor or via the Supabase CLI

-- ── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── profiles ─────────────────────────────────────────────────────────────────
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  username   text,
  avatar     text,
  level      int  not null default 1,
  xp         int  not null default 0,
  gold       int  not null default 0,
  streak     int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- ── attributes ────────────────────────────────────────────────────────────────
create table public.attributes (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  intellect   int not null default 1,
  strength    int not null default 1,
  discipline  int not null default 1,
  vitality    int not null default 1,
  creativity  int not null default 1
);

alter table public.attributes enable row level security;

create policy "Users can view their own attributes"
  on public.attributes for select using (auth.uid() = user_id);

create policy "Users can update their own attributes"
  on public.attributes for update using (auth.uid() = user_id);

create policy "Users can insert their own attributes"
  on public.attributes for insert with check (auth.uid() = user_id);

-- ── quests ────────────────────────────────────────────────────────────────────
create table public.quests (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  title        text not null,
  description  text,
  category     text not null default 'Other',
  difficulty   text not null default 'normal',
  xp_reward    int  not null default 100,
  gold_reward  int  not null default 50,
  completed    boolean not null default false,
  created_at   timestamptz not null default now(),
  completed_at timestamptz
);

alter table public.quests enable row level security;

create policy "Users can view their own quests"
  on public.quests for select using (auth.uid() = user_id);

create policy "Users can insert their own quests"
  on public.quests for insert with check (auth.uid() = user_id);

create policy "Users can update their own quests"
  on public.quests for update using (auth.uid() = user_id);

create policy "Users can delete their own quests"
  on public.quests for delete using (auth.uid() = user_id);

-- ── achievements ──────────────────────────────────────────────────────────────
create table public.achievements (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  description text not null,
  requirement jsonb not null default '{}',
  reward_xp   int  not null default 0,
  reward_gold int  not null default 0,
  icon        text not null default 'emoji_events'
);

-- Achievements are publicly readable (no RLS filter needed for SELECT)
alter table public.achievements enable row level security;

create policy "Anyone can view achievements"
  on public.achievements for select using (true);

-- ── user_achievements ─────────────────────────────────────────────────────────
create table public.user_achievements (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at    timestamptz not null default now(),
  unique (user_id, achievement_id)
);

alter table public.user_achievements enable row level security;

create policy "Users can view their own achievement unlocks"
  on public.user_achievements for select using (auth.uid() = user_id);

create policy "Users can insert their own achievement unlocks"
  on public.user_achievements for insert with check (auth.uid() = user_id);

-- ── Auto-create profile on signup ─────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.email);

  insert into public.attributes (user_id)
  values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
