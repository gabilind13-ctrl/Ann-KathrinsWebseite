import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, FileText, Image, BookOpen, Home } from 'lucide-react';
import PagesManager from '../components/admin/PagesManager';
import BlogManager from '../components/admin/BlogManager';
import MediaManager from '../components/admin/MediaManager';

type TabType = 'pages' | 'blog' | 'media';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('pages');
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const tabs = [
    { id: 'pages' as TabType, label: 'Seiten', icon: FileText },
    { id: 'blog' as TabType, label: 'Blog', icon: BookOpen },
    { id: 'media' as TabType, label: 'Medien', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CMS Dashboard</h1>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Zur Website</span>
              </a>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Abmelden</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'pages' && <PagesManager />}
            {activeTab === 'blog' && <BlogManager />}
            {activeTab === 'media' && <MediaManager />}
          </div>
        </div>
      </div>
    </div>
  );
}
