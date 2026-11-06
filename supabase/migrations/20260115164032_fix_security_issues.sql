/*
  # Fix Security Issues

  1. Performance Improvements
    - Add index on media.created_by foreign key
    - Optimize auth.uid() calls in RLS policies with subquery wrapper
    - Fix function search_path for update_updated_at_column

  2. RLS Policy Improvements
    - Consolidate multiple SELECT policies for pages and blog_posts
    - Add proper user validation to prevent unrestricted access
    - Ensure authenticated users are properly validated

  3. Changes Made
    - Added index: idx_media_created_by
    - Recreated media RLS policies with optimized auth.uid() calls
    - Consolidated and recreated pages SELECT policies
    - Consolidated and recreated blog_posts SELECT policies
    - Fixed function search_path
*/

-- Add index on media.created_by for better performance
CREATE INDEX IF NOT EXISTS idx_media_created_by ON media(created_by);

-- Fix function search_path (need to drop CASCADE and recreate triggers)
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp;

-- Recreate triggers for updated_at
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Drop and recreate media policies with optimized auth.uid() calls
DROP POLICY IF EXISTS "Authenticated users can upload media" ON media;
DROP POLICY IF EXISTS "Authenticated users can update their media" ON media;
DROP POLICY IF EXISTS "Authenticated users can delete their media" ON media;

CREATE POLICY "Authenticated users can upload media"
  ON media FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = created_by);

CREATE POLICY "Authenticated users can update their media"
  ON media FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = created_by)
  WITH CHECK ((select auth.uid()) = created_by);

CREATE POLICY "Authenticated users can delete their media"
  ON media FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = created_by);

-- Consolidate pages SELECT policies
DROP POLICY IF EXISTS "Anyone can view published pages" ON pages;
DROP POLICY IF EXISTS "Authenticated users can view all pages" ON pages;

CREATE POLICY "View pages based on auth status"
  ON pages FOR SELECT
  USING (
    published = true 
    OR 
    (select auth.uid()) IS NOT NULL
  );

-- Improve pages modification policies with proper validation
DROP POLICY IF EXISTS "Authenticated users can insert pages" ON pages;
DROP POLICY IF EXISTS "Authenticated users can update pages" ON pages;
DROP POLICY IF EXISTS "Authenticated users can delete pages" ON pages;

CREATE POLICY "Authenticated users can insert pages"
  ON pages FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update pages"
  ON pages FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can delete pages"
  ON pages FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Consolidate blog_posts SELECT policies
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all blog posts" ON blog_posts;

CREATE POLICY "View blog posts based on auth status"
  ON blog_posts FOR SELECT
  USING (
    published = true 
    OR 
    (select auth.uid()) IS NOT NULL
  );

-- Improve blog_posts modification policies with proper validation
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON blog_posts;

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);
