/*
  # Fix Admin Users RLS Circular Reference

  1. Problem
    - Two SELECT policies exist with circular reference issues
    - The EXISTS clause in policies tries to query admin_users table
    - This creates infinite recursion when RLS evaluates the policy

  2. Solution
    - Remove both problematic SELECT policies
    - Create a simple SELECT policy that allows users to check their own admin status
    - Create a separate function to check admin status without RLS recursion

  3. Security
    - Users can only see their own admin record
    - Admins can see all admin records (via security definer function)
*/

-- Drop the problematic SELECT policies
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can view admin status" ON admin_users;

-- Create a simple, non-recursive SELECT policy
-- Users can always see their own record in admin_users
CREATE POLICY "Users can check own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Create a security definer function to check admin status
-- This bypasses RLS and prevents circular reference
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE id = user_id
  );
$$;

-- Create policy for admins to view all admin users (using the function)
CREATE POLICY "Admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));
