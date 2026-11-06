import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPost({
      id: '',
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      featured_image: '',
      author: 'Admin',
      published: false,
      published_at: null,
      created_at: '',
      updated_at: '',
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!editingPost) return;

    if (!editingPost.title.trim()) {
      alert('Bitte geben Sie einen Titel ein');
      return;
    }

    if (!editingPost.slug.trim()) {
      alert('Bitte geben Sie einen Slug (URL) ein');
      return;
    }

    try {
      const postData = {
        slug: editingPost.slug,
        title: editingPost.title,
        excerpt: editingPost.excerpt,
        content: editingPost.content,
        featured_image: editingPost.featured_image,
        author: editingPost.author,
        published: editingPost.published,
        published_at: editingPost.published ? new Date().toISOString() : null,
      };

      if (isCreating) {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        if (error) {
          if (error.code === '23505') {
            alert('Fehler: Ein Beitrag mit diesem Slug existiert bereits. Bitte wählen Sie einen anderen Slug.');
            return;
          }
          throw error;
        }
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        if (error) {
          if (error.code === '23505') {
            alert('Fehler: Ein Beitrag mit diesem Slug existiert bereits. Bitte wählen Sie einen anderen Slug.');
            return;
          }
          throw error;
        }
      }

      await loadPosts();
      setEditingPost(null);
      setIsCreating(false);
      alert(`Beitrag erfolgreich ${isCreating ? 'erstellt' : 'aktualisiert'}`);
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Fehler beim Speichern des Beitrags: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Beitrag wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Fehler beim Löschen des Beitrags');
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          published: !post.published,
          published_at: !post.published ? new Date().toISOString() : post.published_at,
        })
        .eq('id', post.id);

      if (error) throw error;
      await loadPosts();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Laden...</div>;
  }

  if (editingPost) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {isCreating ? 'Neuen Beitrag erstellen' : 'Beitrag bearbeiten'}
          </h2>
          <button
            onClick={() => {
              setEditingPost(null);
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
              value={editingPost.title}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Beitragstitel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={editingPost.slug}
              onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="beitrags-url"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autor
            </label>
            <input
              type="text"
              value={editingPost.author}
              onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Autorenname"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kurzbeschreibung
            </label>
            <textarea
              value={editingPost.excerpt}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Kurze Zusammenfassung des Beitrags"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bild-URL
            </label>
            <input
              type="text"
              value={editingPost.featured_image}
              onChange={(e) => setEditingPost({ ...editingPost, featured_image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inhalt
            </label>
            <textarea
              value={editingPost.content}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              rows={15}
              placeholder="Beitragsinhalt (Markdown unterstützt)"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={editingPost.published}
              onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
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
                setEditingPost(null);
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
        <h2 className="text-2xl font-bold text-gray-900">Blog-Beiträge verwalten</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Neuer Beitrag
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Keine Beiträge vorhanden. Erstellen Sie Ihren ersten Blog-Beitrag.
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  {post.published ? (
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
                <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                <p className="text-xs text-gray-500 mt-2">
                  von {post.author} • /{post.slug}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(post)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title={post.published ? 'Verstecken' : 'Veröffentlichen'}
                >
                  {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setEditingPost(post)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Bearbeiten"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
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
