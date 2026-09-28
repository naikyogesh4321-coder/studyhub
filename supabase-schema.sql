-- =========================================================================
-- StudyHub Database Schema & Row-Level Security (RLS) Policies
-- Designed for Supabase PostgreSQL
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked with Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text not null,
  college text not null,
  course text not null,
  semester text not null,
  bio text,
  avatar_url text,
  role text default 'student' check (role in ('student', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can update their own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- 2. STUDY MATERIALS TABLE
create table if not exists public.materials (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  subject text not null,
  course text not null,
  semester text not null,
  material_type text not null,
  file_type text not null,
  file_size text not null,
  file_name text not null,
  file_url text not null,
  uploader_id uuid references public.profiles(id) on delete cascade not null,
  uploader_name text not null,
  uploader_avatar text,
  uploader_college text not null,
  views_count int default 0,
  downloads_count int default 0,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.materials enable row level security;

create policy "Materials are viewable by everyone"
  on public.materials for select
  using ( true );

create policy "Authenticated users can upload materials"
  on public.materials for insert
  with check ( auth.uid() = uploader_id );

create policy "Uploaders and admins can update own materials"
  on public.materials for update
  using ( auth.uid() = uploader_id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') );

create policy "Uploaders and admins can delete own materials"
  on public.materials for delete
  using ( auth.uid() = uploader_id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') );

-- 3. DOUBTS TABLE
create table if not exists public.doubts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  subject text not null,
  course text not null,
  semester text not null,
  tags text[] default '{}',
  author_id uuid references public.profiles(id) on delete cascade not null,
  author_name text not null,
  author_avatar text,
  author_college text not null,
  views_count int default 0,
  upvotes_count int default 0,
  status text default 'Unanswered' check (status in ('Answered', 'Unanswered')),
  attachment_url text,
  attachment_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.doubts enable row level security;

create policy "Doubts are viewable by everyone"
  on public.doubts for select
  using ( true );

create policy "Authenticated students can post doubts"
  on public.doubts for insert
  with check ( auth.uid() = author_id );

create policy "Authors and admins can update own doubts"
  on public.doubts for update
  using ( auth.uid() = author_id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') );

create policy "Authors and admins can delete own doubts"
  on public.doubts for delete
  using ( auth.uid() = author_id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') );

-- 4. ANSWERS TABLE
create table if not exists public.answers (
  id uuid default uuid_generate_v4() primary key,
  doubt_id uuid references public.doubts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  author_name text not null,
  author_avatar text,
  author_college text,
  content text not null,
  upvotes_count int default 0,
  is_accepted boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.answers enable row level security;

create policy "Answers are viewable by everyone"
  on public.answers for select
  using ( true );

create policy "Authenticated students can post answers"
  on public.answers for insert
  with check ( auth.uid() = author_id );

create policy "Authors can edit own answers"
  on public.answers for update
  using ( auth.uid() = author_id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') );

create policy "Authors can delete own answers"
  on public.answers for delete
  using ( auth.uid() = author_id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') );

-- 5. VOTES TABLE
create table if not exists public.votes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  target_id uuid not null,
  target_type text check (target_type in ('doubt', 'answer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, target_id, target_type)
);

alter table public.votes enable row level security;

create policy "Votes viewable by everyone"
  on public.votes for select
  using ( true );

create policy "Users can cast votes"
  on public.votes for insert
  with check ( auth.uid() = user_id );

create policy "Users can revoke own vote"
  on public.votes for delete
  using ( auth.uid() = user_id );

-- 6. BOOKMARKS TABLE
create table if not exists public.bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  target_id uuid not null,
  target_type text check (target_type in ('material', 'doubt', 'answer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, target_id, target_type)
);

alter table public.bookmarks enable row level security;

create policy "Users can view their own bookmarks"
  on public.bookmarks for select
  using ( auth.uid() = user_id );

create policy "Users can insert bookmarks"
  on public.bookmarks for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete own bookmarks"
  on public.bookmarks for delete
  using ( auth.uid() = user_id );

-- 7. NOTIFICATIONS TABLE
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text not null,
  link text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

create policy "Users can view own notifications"
  on public.notifications for select
  using ( auth.uid() = user_id );

create policy "Users can update own notification read state"
  on public.notifications for update
  using ( auth.uid() = user_id );

-- 8. STORAGE BUCKET POLICIES (Supabase Storage)
-- Run in Supabase SQL editor to create the storage bucket for study materials:
-- insert into storage.buckets (id, name, public) values ('studyhub-materials', 'studyhub-materials', true);
-- create policy "Allow public viewing of materials" on storage.objects for select using (bucket_id = 'studyhub-materials');
-- create policy "Allow authenticated uploads" on storage.objects for insert with check (bucket_id = 'studyhub-materials' and auth.role() = 'authenticated');
