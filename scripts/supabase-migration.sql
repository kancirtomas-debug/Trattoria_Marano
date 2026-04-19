-- Trattoria Marano — Supabase schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → your project → SQL Editor → New query)

-- ─────────────────────────────────────────────────────────────────
-- admin_config: single-row singleton for runtime settings
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_config (
  id INT PRIMARY KEY DEFAULT 1,
  webhook_url TEXT,
  calendar_id TEXT,
  calendar_name TEXT,
  reservations_open BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT admin_config_single_row CHECK (id = 1)
);

-- Seed the singleton row
INSERT INTO admin_config (id, reservations_open)
VALUES (1, true)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────
-- reservations: every booking, past + present + cancelled
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INT NOT NULL CHECK (guests > 0),
  message TEXT,
  lang TEXT NOT NULL DEFAULT 'de' CHECK (lang IN ('de', 'en')),
  cancel_token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  calendar_event_id TEXT,
  reminders_sent JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations (date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations (status);
CREATE INDEX IF NOT EXISTS idx_reservations_cancel_token ON reservations (cancel_token);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations (created_at DESC);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admin_config_updated_at ON admin_config;
CREATE TRIGGER trg_admin_config_updated_at
  BEFORE UPDATE ON admin_config
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_reservations_updated_at ON reservations;
CREATE TRIGGER trg_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─────────────────────────────────────────────────────────────────
-- Row-Level Security: lock down tables to service role only
-- Server-side code uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS.
-- Public/anon clients cannot read or write.
-- ─────────────────────────────────────────────────────────────────
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
-- (no policies created → default deny for anon/authenticated,
--  service_role always bypasses RLS)
