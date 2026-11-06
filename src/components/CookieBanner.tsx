import { useState, useEffect } from 'react';
import { X, Cookie, Shield, ExternalLink } from 'lucide-react';

interface CookieBannerProps {
  onNavigate: (page: string) => void;
}

export default function CookieBanner({ onNavigate }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      functional: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consent = {
      essential: true,
      functional: false,
      analytics: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full md:max-w-2xl md:rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Cookie className="text-yellow w-8 h-8" />
              <h2 className="text-2xl font-bold text-navy">
                Cookie-Einstellungen
              </h2>
            </div>
            <button
              onClick={handleRejectAll}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Schließen"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              Wir verwenden Cookies und ähnliche Technologien, um Ihnen die bestmögliche Nutzererfahrung zu bieten.
              Einige Cookies sind technisch notwendig, andere helfen uns, unsere Website zu verbessern.
            </p>
            <p className="text-sm text-gray-600">
              Gemäß DSGVO und TTDSG benötigen wir Ihre Einwilligung für nicht-essenzielle Cookies.
              Sie können Ihre Einstellungen jederzeit anpassen.
            </p>
          </div>

          {!showDetails ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowDetails(true)}
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
              >
                <span className="text-navy font-medium">
                  Cookie-Einstellungen anpassen
                </span>
                <ExternalLink size={18} className="text-gray-500" />
              </button>

              <div className="flex flex-col md:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-yellow text-navy font-semibold py-3 px-6 rounded-lg hover:bg-yellow/90 transition-colors"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 bg-gray-200 text-navy font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Nur notwendige
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="text-green-600 w-5 h-5" />
                    <h3 className="font-semibold text-navy">
                      Notwendige Cookies
                    </h3>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Immer aktiv
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                  Sie speichern z.B. Ihre Cookie-Einstellungen.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-navy mb-1">
                      Funktionale Cookies
                    </h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          functional: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung,
                  wie z.B. das Speichern Ihrer bevorzugten Einstellungen.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-navy mb-1">
                      Analyse-Cookies
                    </h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          analytics: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren,
                  um die Nutzererfahrung zu verbessern.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-3 pt-4">
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 bg-yellow text-navy font-semibold py-3 px-6 rounded-lg hover:bg-yellow/90 transition-colors"
                >
                  Auswahl speichern
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-navy text-white font-semibold py-3 px-6 rounded-lg hover:bg-navy/90 transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>

              <button
                onClick={() => setShowDetails(false)}
                className="w-full text-sm text-gray-500 hover:text-gray-700 py-2"
              >
                Zurück
              </button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Weitere Informationen finden Sie in unserer{' '}
              <button
                onClick={() => {
                  onNavigate('datenschutz');
                  setIsVisible(false);
                }}
                className="text-yellow hover:underline font-medium"
              >
                Datenschutzerklärung
              </button>
              {' '}und im{' '}
              <button
                onClick={() => {
                  onNavigate('impressum');
                  setIsVisible(false);
                }}
                className="text-yellow hover:underline font-medium"
              >
                Impressum
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
