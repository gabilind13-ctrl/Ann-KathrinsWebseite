import { CheckCircle, Calendar, Mail, Info } from 'lucide-react';

interface ThankYouPageProps {
  onNavigate: (page: string) => void;
}

export default function ThankYouPage({ onNavigate }: ThankYouPageProps) {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-navy to-gray-900 text-white">
        <div className="container-custom text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={80} className="text-yellow animate-fade-in" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Herzlichen Dank für Ihre Bestellung
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in">
            Sie haben nun sichergestellt, dass Sie einen Termin Ihrer Wahl buchen können
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="bg-yellow/10 border-2 border-yellow rounded-lg p-8 mb-8">
            <div className="flex items-start mb-4">
              <Calendar size={32} className="text-yellow mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Buchen Sie jetzt Ihren Termin
                </h2>
                <p className="text-gray-700 mb-6">
                  Benutzen Sie dazu folgenden Link:
                </p>
                <a
                  href="https://calendar.app.google/Hu3ACRqKPq8Afd6w9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow text-navy px-8 py-4 rounded-lg font-bold hover:bg-yellow/90 transition-colors text-lg"
                >
                  Termin buchen
                </a>
                <p className="text-sm text-gray-600 mt-4">
                  💡 Speichern Sie sich eine Erinnerung
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-8">
            <div className="flex items-start mb-4">
              <Mail size={32} className="text-navy mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Haben Sie noch Fragen?
                </h2>
                <p className="text-gray-700 mb-4">
                  Falls Sie noch Fragen haben, können Sie sich an nachfolgende E-Mail-Adresse wenden:
                </p>
                <a
                  href="mailto:mail@akandresen.de?subject=Fragen zum Entwicklungsgespräch"
                  className="inline-flex items-center text-yellow hover:text-navy font-semibold text-lg transition-colors"
                >
                  <Mail size={20} className="mr-2" />
                  mail@akandresen.de
                </a>
                <p className="text-sm text-gray-600 mt-4">
                  Betreff: <strong>Fragen zum Entwicklungsgespräch</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-navy/5 border-2 border-navy/20 rounded-lg p-8">
            <div className="flex items-start">
              <Info size={32} className="text-navy mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Wichtiger Hinweis
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Die Abwicklung aller Zahlungen auf dieser Seite erfolgt durch den Zahlungsanbieter <strong>Digistore24</strong>. Dieser erscheint auch auf jeglichen Auszügen oder Bestätigungen, die Sie bekommen.
                  </p>
                  <p>
                    Schauen Sie bitte bei Ihrer angegebenen E-Mail-Adresse, mit der Sie dieses Produkt bestellt haben. Sie werden eine E-Mail von <strong>support@digistore24.com</strong> mit dem Betreff: <strong>"Digistore24 - Bestellung erfolgreich/Zugang"</strong> erhalten.
                  </p>
                  <p className="font-semibold text-navy">
                    Wenn Sie keine E-Mail erhalten haben, dann schauen Sie bitte in Ihrem Spam-Ordner nach.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('home')}
              className="btn-secondary"
            >
              Zurück zur Startseite
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
