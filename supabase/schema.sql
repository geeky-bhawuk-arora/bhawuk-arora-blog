-- 1. Create a table for the blog posts
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text not null,
  content text not null,
  category text not null,
  tags text[] default '{}'::text[],
  reading_time integer default 5,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  featured boolean default false,
  emoji text default '📝',
  pattern_type text default 'dots',
  accent_color text default '#6366f1',
  author text default 'Bhawuk Arora',
  author_bio text default 'DevOps & MLOps Engineer',
  enabled boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Migration for existing databases: add 'enabled' column if it does not exist
-- ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS enabled boolean default true not null;

-- 2. Set Row Level Security (RLS)
alter table public.posts enable row level security;

-- 3. Policy: Anyone can read posts
create policy "Public posts are viewable by everyone." on public.posts
  for select using (true);

-- 4. Policy: Only authenticated users can insert/update/delete posts
create policy "Authenticated users can insert posts" on public.posts
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update posts" on public.posts
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete posts" on public.posts
  for delete using (auth.role() = 'authenticated');

-- 5. Create a trigger to automatically update the 'updated_at' column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on public.posts
  for each row
  execute function public.handle_updated_at();

-- 6. Create a table for audit logs
create table public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  event_type text not null, -- 'login', 'logout', 'timeout', 'create_post', etc.
  metadata jsonb default '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Set RLS for audit logs
alter table public.audit_logs enable row level security;

-- Policy: Only authenticated users can see their logs, but the system (service role) or the user themselves can insert.
-- For simplicity in this admin-only blog, we allow authenticated users to see and insert logs.
create policy "Authenticated users can manage audit logs" on public.audit_logs
  for all using (auth.role() = 'authenticated');
-- 8. Create a table for email subscribers
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Set RLS for subscribers
alter table public.subscribers enable row level security;

-- Policy: Anyone can insert (subscribe), but only authenticated users (admin) can select/manage.
create policy "Anyone can subscribe" on public.subscribers
  for insert with check (true);

create policy "Authenticated users can manage subscribers" on public.subscribers
  for all using (auth.role() = 'authenticated');

-- 10. Add 'banner_url' to public.posts
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS banner_url text;

-- 10. Create a table for blog comments
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  parent_id uuid references public.comments(id) on delete cascade, -- For threaded replies
  user_name text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. Set RLS for comments
alter table public.comments enable row level security;

-- Policy: Anyone can view and insert comments
create policy "Anyone can view comments" on public.comments
  for select using (true);

create policy "Anyone can insert comments" on public.comments
  for insert with check (true);

-- 12. Create a table for post ratings (upvotes/downvotes)
create table public.ratings (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  user_email text not null, -- To prevent duplicate votes
  rating integer not null check (rating in (-1, 1)),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_email) -- Primary constraint to prevent double voting
);

-- 13. Set RLS for ratings
alter table public.ratings enable row level security;

-- Policy: Anyone can view and insert ratings
create policy "Anyone can view ratings" on public.ratings
  for select using (true);

create policy "Anyone can insert ratings" on public.ratings
  for insert with check (true);
