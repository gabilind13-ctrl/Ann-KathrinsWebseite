import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const root = createRoot(document.getElementById('root')!);

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  root.render(
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="max-w-md w-full rounded-xl bg-white p-8 shadow-sm border border-neutral-200 text-center">
        <h1 className="text-xl font-semibold text-neutral-900 mb-3">Die Seite kann gerade nicht geladen werden</h1>
        <p className="text-base leading-relaxed text-neutral-600">
          Die Verbindung zur Datenbank konnte nicht hergestellt werden. Bitte lade die Vorschau neu. Wenn das Problem bestehen bleibt, melde dich bitte.
        </p>
      </div>
    </div>
  );
} else {
  import('./App.tsx').then(({ default: App }) => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
}
