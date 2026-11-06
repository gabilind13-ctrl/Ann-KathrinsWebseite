/*
  # Fix Admin Users UPDATE and DELETE Policies

  1. Problem
    - UPDATE and DELETE policies also have circular reference with EXISTS clause
    
  2. Solution
    - Update policies to use the is_admin() security definer function
    
  3. Security
    - Only admins can update or delete admin records
*/

-- Drop the problematic UPDATE policy
DROP POLICY IF EXISTS "Admins can update admin users" ON admin_users;

-- Create new UPDATE policy using security definer function
CREATE POLICY "Admins can update admin users"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Drop the problematic DELETE policy
DROP POLICY IF EXISTS "Admins can revoke admin rights" ON admin_users;

-- Create new DELETE policy using security definer function
CREATE POLICY "Admins can revoke admin rights"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (is_admin(auth.uid()));

-- Also fix the INSERT policy
DROP POLICY IF EXISTS "Allow admin registration" ON admin_users;

-- Create new INSERT policy using security definer function
-- Allow first admin OR existing admins to add new admins
CREATE POLICY "Allow admin registration"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin(auth.uid())
    OR
    NOT EXISTS (SELECT 1 FROM admin_users)
  );
