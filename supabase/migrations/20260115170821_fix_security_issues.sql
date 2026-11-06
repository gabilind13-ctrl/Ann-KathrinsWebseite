/*
  # Fix Security Issues

  1. Performance Optimizations
    - Add index on `admin_users.created_by` foreign key
    - Remove unused index `idx_media_created_by`
    - Optimize all RLS policies to use `(select auth.uid())` instead of `auth.uid()`
    
  2. RLS Policy Improvements
    - Consolidate multiple SELECT policies into one efficient policy
    - Improve query performance by preventing re-evaluation of auth functions
    
  3. Changes Made
    - Drop and recreate all admin_users policies with optimized auth checks
    - Add missing index for foreign key constraint
    - Remove unused media index
*/

-- Add index for foreign key on admin_users.created_by
CREATE INDEX IF NOT EXISTS idx_admin_users_created_by ON admin_users(created_by);

-- Remove unused index on media table
DROP INDEX IF EXISTS idx_media_created_by;

-- Drop existing policies on admin_users
DROP POLICY IF EXISTS "Users can check if they are admin" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admins" ON admin_users;
DROP POLICY IF EXISTS "Admins can grant admin rights" ON admin_users;
DROP POLICY IF EXISTS "Admins can revoke admin rights" ON admin_users;

-- Create optimized SELECT policy (combines previous two policies)
CREATE POLICY "Authenticated users can view admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    id = (select auth.uid()) OR
    EXISTS (
      SELECT 1 FROM admin_users admin
      WHERE admin.id = (select auth.uid())
    )
  );

-- Create optimized INSERT policy
CREATE POLICY "Admins can grant admin rights"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users admin
      WHERE admin.id = (select auth.uid())
    )
  );

-- Create optimized DELETE policy
CREATE POLICY "Admins can revoke admin rights"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users admin
      WHERE admin.id = (select auth.uid())
    )
  );