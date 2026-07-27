/*
# Create inquiries table (single-tenant, no auth)

1. New Tables
- `inquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) - the sender's name
  - `email` (text, not null) - the sender's email address
  - `phone` (text, nullable) - optional phone number
  - `material` (text, not null) - chosen keepsake material: anyatej, hajtincs, mindkettő, egyéb
  - `message` (text, nullable) - the sender's message / idea
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `inquiries`.
- Allow anon + authenticated INSERT only (this is a public contact form).
- No SELECT/UPDATE/DELETE for anon — submissions are private to the artisan (owner reads via dashboard/SQL).

3. Notes
- This is a consultation-focused brand with no e-commerce and no user accounts, so there is no `user_id` column and no auth flow.
- The public can submit inquiries; only the project owner can read them through Supabase tooling.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  material text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_inquiries" ON inquiries;
DROP POLICY IF EXISTS "anon_update_inquiries" ON inquiries;
DROP POLICY IF EXISTS "anon_delete_inquiries" ON inquiries;
