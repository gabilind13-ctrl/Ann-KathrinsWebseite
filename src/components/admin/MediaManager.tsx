import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Trash2, Copy, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StorageSetupHelper from './StorageSetupHelper';

interface Media {
  id: string;
  filename: string;
  url: string;
  alt_text: string;
  size: number;
  mime_type: string;
  created_at: string;
  created_by: string;
}

export default function MediaManager() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !user) return;

    setUploading(true);

    try {
      let successCount = 0;
      let failCount = 0;

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);

          if (uploadError.message.includes('policy') || uploadError.message.includes('permission')) {
            alert('Fehler: Storage-Policies sind nicht konfiguriert. Bitte kontaktieren Sie den Administrator.\n\nDetails: Die Berechtigungen zum Hochladen von Dateien fehlen in der Datenbank.');
            setUploading(false);
            return;
          }

          failCount++;
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        const { error: insertError } = await supabase.from('media').insert([{
          filename: file.name,
          url: publicUrl,
          alt_text: file.name.split('.')[0],
          size: file.size,
          mime_type: file.type,
          created_by: user.id,
        }]);

        if (insertError) {
          console.error('Database insert error:', insertError);
          failCount++;
        } else {
          successCount++;
        }
      }

      await loadMedia();

      if (successCount > 0) {
        alert(`${successCount} Datei(en) erfolgreich hochgeladen${failCount > 0 ? `, ${failCount} fehlgeschlagen` : ''}`);
      } else if (failCount > 0) {
        alert(`Fehler: ${failCount} Datei(en) konnten nicht hochgeladen werden`);
      }
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Fehler beim Hochladen der Dateien');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: Media) => {
    if (!confirm('Möchten Sie diese Datei wirklich löschen?')) return;

    try {
      const path = item.url.split('/').slice(-2).join('/');

      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', item.id);

      if (dbError) throw dbError;

      await loadMedia();
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Fehler beim Löschen der Datei');
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return <div className="text-center py-8">Laden...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Medien verwalten</h2>
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
          <Upload className="w-4 h-4" />
          {uploading ? 'Hochladen...' : 'Dateien hochladen'}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      <StorageSetupHelper />

      {media.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Keine Medien vorhanden. Laden Sie Ihre ersten Dateien hoch.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {item.mime_type.startsWith('image/') ? (
                  <img
                    src={item.url}
                    alt={item.alt_text}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Upload className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <h3 className="font-medium text-gray-900 text-sm truncate" title={item.filename}>
                  {item.filename}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatFileSize(item.size)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        URL kopieren
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Löschen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
