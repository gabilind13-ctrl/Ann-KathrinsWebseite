/*
  # Fix Security and Performance Issues

  1. Performance Improvements
    - Add index for `admin_users.created_by` foreign key
    - Remove unused index `idx_media_created_by`
  
  2. RLS Policy Optimization
    - Replace all `auth.uid()` with `(select auth.uid())` to prevent re-evaluation per row
    - Consolidate multiple SELECT policies into single policy
  
  3. Changes Made
    - Added: Index on admin_users(created_by)
    - Updated: All RLS policies to use SELECT subqueries
    - Consolidated: Multiple SELECT policies into one comprehensive policy
    - Removed: Unused media index
*/

-- Add index for foreign key to improve query performance
CREATE INDEX IF NOT EXISTS idx_admin_users_created_by ON admin_users(created_by);

-- Remove unused index on media table
DROP INDEX IF EXISTS idx_media_created_by;

-- Drop existing policies to recreate them with optimized queries
DROP POLICY IF EXISTS "Users can check if they are admin" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admins" ON admin_users;
DROP POLICY IF EXISTS "Admins can grant admin rights" ON admin_users;
DROP POLICY IF EXISTS "Admins can revoke admin rights" ON admin_users;

-- Consolidated SELECT policy: Users can only see their own admin status OR all admins if they are admin
CREATE POLICY "Admins can view admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    (select auth.uid()) = id OR
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

-- Optimized INSERT policy
CREATE POLICY "Admins can grant admin rights"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

-- Optimized UPDATE policy (if needed in future)
CREATE POLICY "Admins can update admin users"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

-- Optimized DELETE policy
CREATE POLICY "Admins can revoke admin rights"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );