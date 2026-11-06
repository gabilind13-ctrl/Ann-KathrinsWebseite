/*
  # Allow First Admin Registration

  1. Changes
    - Modify INSERT policy to allow first admin registration when table is empty
    - Keep existing security for subsequent admin registrations
    
  2. Security
    - Only allows self-registration when admin_users table is completely empty
    - After first admin exists, only existing admins can grant admin rights
    - This enables the first admin to register without manual SQL intervention
*/

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Admins can grant admin rights" ON admin_users;

-- Create new INSERT policy that allows first admin registration
CREATE POLICY "Allow admin registration"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Allow if user is already an admin (for granting rights to others)
    EXISTS (
      SELECT 1 FROM admin_users admin
      WHERE admin.id = (select auth.uid())
    )
    OR
    -- Allow if this is the first admin (table is empty)
    NOT EXISTS (
      SELECT 1 FROM admin_users
    )
  );