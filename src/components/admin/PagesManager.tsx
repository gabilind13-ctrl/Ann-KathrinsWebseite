import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: Record<string, any>;
  meta_description: string;
  meta_keywords: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPage({
      id: '',
      slug: '',
      title: '',
      content: {},
      meta_description: '',
      meta_keywords: '',
      published: false,
      created_at: '',
      updated_at: '',
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!editingPage) return;

    if (!editingPage.title.trim()) {
      alert('Bitte geben Sie einen Titel ein');
      return;
    }

    if (!editingPage.slug.trim()) {
      alert('Bitte geben Sie einen Slug (URL) ein');
      return;
    }

    try {
      if (isCreating) {
        const { error } = await supabase
          .from('pages')
          .insert([{
            slug: editingPage.slug,
            title: editingPage.title,
            content: editingPage.content,
            meta_description: editingPage.meta_description,
            meta_keywords: editingPage.meta_keywords,
            published: editingPage.published,
          }]);
        if (error) {
          if (error.code === '23505') {
            alert('Fehler: Eine Seite mit diesem Slug existiert bereits. Bitte wählen Sie einen anderen Slug.');
            return;
          }
          throw error;
        }
      } else {
        const { error } = await supabase
          .from('pages')
          .update({
            slug: editingPage.slug,
            title: editingPage.title,
            content: editingPage.content,
            meta_description: editingPage.meta_description,
            meta_keywords: editingPage.meta_keywords,
            published: editingPage.published,
          })
          .eq('id', editingPage.id);
        if (error) {
          if (error.code === '23505') {
            alert('Fehler: Eine Seite mit diesem Slug existiert bereits. Bitte wählen Sie einen anderen Slug.');
            return;
          }
          throw error;
        }
      }

      await loadPages();
      setEditingPage(null);
      setIsCreating(false);
      alert(`Seite erfolgreich ${isCreating ? 'erstellt' : 'aktualisiert'}`);
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Fehler beim Speichern der Seite: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diese Seite wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Fehler beim Löschen der Seite');
    }
  };

  const handleTogglePublish = async (page: Page) => {
    try {
      const { error } = await supabase
        .from('pages')
        .update({ published: !page.published })
        .eq('id', page.id);

      if (error) throw error;
      await loadPages();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Laden...</div>;
  }

  if (editingPage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {isCreating ? 'Neue Seite erstellen' : 'Seite bearbeiten'}
          </h2>
          <button
            onClick={() => {
              setEditingPage(null);
              setIsCreating(false);
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4" />
            Abbrechen
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titel
            </label>
            <input
              type="text"
              value={editingPage.title}
              onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Seitentitel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={editingPage.slug}
              onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seiten-url"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              value={editingPage.meta_description}
              onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Kurze Beschreibung für Suchmaschinen"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Keywords (kommagetrennt)
            </label>
            <input
              type="text"
              value={editingPage.meta_keywords}
              onChange={(e) => setEditingPage({ ...editingPage, meta_keywords: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={editingPage.published}
              onChange={(e) => setEditingPage({ ...editingPage, published: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Veröffentlicht
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Speichern
            </button>
            <button
              onClick={() => {
                setEditingPage(null);
                setIsCreating(false);
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Seiten verwalten</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Neue Seite
        </button>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Keine Seiten vorhanden. Erstellen Sie Ihre erste Seite.
        </div>
      ) : (
        <div className="space-y-3">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-gray-900">{page.title}</h3>
                  {page.published ? (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      <Eye className="w-3 h-3" />
                      Veröffentlicht
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                      <EyeOff className="w-3 h-3" />
                      Entwurf
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">/{page.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(page)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title={page.published ? 'Verstecken' : 'Veröffentlichen'}
                >
                  {page.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setEditingPage(page)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Bearbeiten"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(page.id)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Löschen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
