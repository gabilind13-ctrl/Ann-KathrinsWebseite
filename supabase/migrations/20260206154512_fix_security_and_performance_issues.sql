/*
  # Fix Security and Performance Issues

  ## Overview
  This migration addresses multiple security and performance issues identified in the database audit.

  ## Changes

  ### 1. Add Index for Foreign Key
  - Create index on `media.created_by` to improve query performance
  - Covers the foreign key `media_created_by_fkey`

  ### 2. Optimize RLS Policies with Auth Function Caching
  - Replace `auth.uid()` with `(select auth.uid())` in all policies
  - This prevents re-evaluation of auth functions for each row
  - Significantly improves query performance at scale
  - Affects policies on `admin_users` table

  ### 3. Drop Unused Index
  - Remove `idx_admin_users_created_by` index as it's not being used

  ### 4. Fix Function Search Path
  - Update `is_admin()` function to have stable search_path
  - Prevents role mutable search_path security issue

  ### 5. Consolidate Multiple Permissive SELECT Policies
  - Merge two SELECT policies into one efficient policy
  - Eliminates redundant policy evaluation

  ## Security Notes
  - All changes maintain existing security guarantees
  - Performance improvements do not reduce security
  - RLS remains fully enforced
*/

-- 1. Add index for media.created_by foreign key
CREATE INDEX IF NOT EXISTS idx_media_created_by ON media(created_by);

-- 2. Drop unused index on admin_users
DROP INDEX IF EXISTS idx_admin_users_created_by;

-- 3. Drop existing policies that depend on is_admin function
DROP POLICY IF EXISTS "Users can check own admin status" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can revoke admin rights" ON admin_users;
DROP POLICY IF EXISTS "Allow admin registration" ON admin_users;

-- 4. Fix is_admin function to have stable search_path
DROP FUNCTION IF EXISTS is_admin(uuid);

CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE id = user_id
  );
$$;

-- 5. Create single consolidated SELECT policy with cached auth check
CREATE POLICY "Users can view admin records"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    id = (select auth.uid())
    OR
    is_admin((select auth.uid()))
  );

-- 6. Create UPDATE policy with cached auth check
CREATE POLICY "Admins can update admin users"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (is_admin((select auth.uid())))
  WITH CHECK (is_admin((select auth.uid())));

-- 7. Create DELETE policy with cached auth check
CREATE POLICY "Admins can revoke admin rights"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (is_admin((select auth.uid())));

-- 8. Create INSERT policy with cached auth check
CREATE POLICY "Allow admin registration"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin((select auth.uid()))
    OR
    NOT EXISTS (SELECT 1 FROM admin_users)
  );
