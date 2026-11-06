# Storage-Policies für Media-Bucket einrichten

## Problem
Die Storage-Policies für den Media-Bucket fehlen. Ohne diese können keine Bilder hochgeladen werden.

## Lösung
Bitte richten Sie folgende Policies im Supabase Dashboard ein:

### 1. Im Supabase Dashboard anmelden
Gehen Sie zu: https://supabase.com/dashboard

### 2. Storage-Bereich öffnen
- Klicken Sie auf "Storage" im Seitenmenü
- Wählen Sie den "media" Bucket aus
- Klicken Sie auf "Policies"

### 3. Folgende Policies erstellen:

#### Policy 1: Upload erlauben
- **Name**: Authenticated users can upload
- **Policy definition**: `INSERT`
- **Target roles**: `authenticated`
- **WITH CHECK expression**: `bucket_id = 'media'`

#### Policy 2: Öffentlicher Lesezugriff
- **Name**: Public read access
- **Policy definition**: `SELECT`
- **Target roles**: `public`
- **USING expression**: `bucket_id = 'media'`

#### Policy 3: Update erlauben
- **Name**: Authenticated users can update own files
- **Policy definition**: `UPDATE`
- **Target roles**: `authenticated`
- **USING expression**: `bucket_id = 'media' AND auth.uid()::text = owner`
- **WITH CHECK expression**: `bucket_id = 'media' AND auth.uid()::text = owner`

#### Policy 4: Löschen erlauben
- **Name**: Authenticated users can delete own files
- **Policy definition**: `DELETE`
- **Target roles**: `authenticated`
- **USING expression**: `bucket_id = 'media' AND auth.uid()::text = owner`

## Alternative: SQL-Befehle (falls Sie SQL-Zugriff haben)

Wenn Sie direkten SQL-Zugriff mit ausreichenden Berechtigungen haben, können Sie diese Policies auch per SQL erstellen:

```sql
-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Upload Policy
CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

-- Read Policy
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'media');

-- Update Policy
CREATE POLICY "Authenticated users can update own files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media' AND auth.uid()::text = owner)
  WITH CHECK (bucket_id = 'media' AND auth.uid()::text = owner);

-- Delete Policy
CREATE POLICY "Authenticated users can delete own files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media' AND auth.uid()::text = owner);
```

## Nach der Einrichtung
Sobald die Policies eingerichtet sind, sollte der Bild-Upload im Admin-Bereich funktionieren.
