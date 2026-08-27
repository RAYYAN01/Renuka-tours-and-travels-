-- Admin portal schema for Renuka Tours & Travels.
-- Run once via: node scripts/migrate.mjs

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fleet_vehicles (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  seats INTEGER NOT NULL,
  luggage TEXT NOT NULL,
  ac BOOLEAN NOT NULL DEFAULT true,
  fuel TEXT NOT NULL,
  driver_included BOOLEAN NOT NULL DEFAULT true,
  price_from INTEGER,
  price_unit TEXT NOT NULL DEFAULT 'per km',
  min_km_per_day INTEGER,
  driver_bata INTEGER,
  duty_start TEXT,
  duty_end TEXT,
  price_on_request BOOLEAN NOT NULL DEFAULT false,
  image TEXT NOT NULL,
  -- Optional scenic/ambient background for the vehicle's own detail-page
  -- hero, distinct from `image` (which is also used as the card thumbnail
  -- everywhere else). Falls back to `image` when not set.
  hero_image TEXT,
  gallery JSONB NOT NULL DEFAULT '[]',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS destinations (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  kind TEXT NOT NULL,
  distance TEXT NOT NULL,
  duration TEXT NOT NULL,
  estimated_cost TEXT NOT NULL,
  recommended_vehicle TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  official_tourism_board TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  pricing_note TEXT NOT NULL,
  image TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  published_date DATE NOT NULL,
  reading_time TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  cover_image_alt TEXT NOT NULL,
  keywords JSONB NOT NULL DEFAULT '[]',
  sections JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
