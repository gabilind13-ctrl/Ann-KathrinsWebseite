import { useEffect, useRef } from 'react';
import { Users, Factory, Mic, CheckCircle, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-navy to-gray-900 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Leistungen
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in">
            Maßgeschneiderte Begleitung für Ingenieure, Chemiker, Start-ups und Unternehmen – von Mentoring über Beratung bis zu inspirierenden Vorträgen.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 animate-on-scroll">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow rounded-full mb-6">
                <Users size={32} className="text-navy" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">
                Mentoring
              </h3>
              <div className="mb-4">
                <span className="inline-block bg-yellow/20 text-navy px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2">
                  6 Monate
                </span>
                <span className="inline-block bg-yellow/20 text-navy px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  1:1 online
                </span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sechs Monate Begleitung im 1:1 – online, fokussiert und praxisnah. Ziel ist Klarheit, Struktur und Umsetzungsstärke, um Projekte souverän, effizient und mit Freude zu realisieren.
              </p>
              <div className="mb-6">
                <p className="font-semibold text-navy mb-3">Für wen:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Ingenieure und Chemiker, die neue Wege gehen wollen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Fach- und Führungskräfte in Innovationsteams</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">CTOs und technische Führungskräfte in Start-ups</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full btn-primary flex items-center justify-center"
              >
                Jetzt anfragen <ArrowRight size={20} className="ml-2" />
              </button>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 animate-on-scroll">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow rounded-full mb-6">
                <Factory size={32} className="text-navy" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">
                Beratung
              </h3>
              <div className="mb-4">
                <span className="inline-block bg-yellow/20 text-navy px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  Chemische Industrie/Innovationsteams/Startups
                </span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Zwei bis drei Tage Präsenz kombiniert mit sechs Monaten digitaler Unterstützung. Schwerpunkt: Upscaling, Prozessoptimierung und Teamentwicklung. Das Ergebnis: Innovationen, die technisch fundiert, wirtschaftlich tragfähig und menschlich sinnvoll sind.
              </p>
              <div className="mb-6">
                <p className="font-semibold text-navy mb-3">Schwerpunkte:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Upscaling von Labormaßstab zu Industrie</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Teamentwicklung Start-ups und Innovationsteams</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Pyrolyse - Entwicklung, Optimierung, Bewertung</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full btn-primary flex items-center justify-center"
              >
                Beratung anfragen <ArrowRight size={20} className="ml-2" />
              </button>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 animate-on-scroll">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow rounded-full mb-6">
                <Mic size={32} className="text-navy" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">
                Vortrag & Workshop
              </h3>
              <div className="mb-4">
                <span className="inline-block bg-yellow/20 text-navy px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  Innovation beginnt beim Menschen
                </span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Impulse für Unternehmen, die ihre Mitarbeitenden befähigen wollen, mutig neue Wege zu gehen. Mit konkreten Praxisbeispielen, neurowissenschaftlichen Erkenntnissen und klarer Struktur. Denn der Mensch ist das Fundament jeder Innovation – wer gesehen wird, wächst über sich hinaus.
              </p>
              <div className="mb-6">
                <p className="font-semibold text-navy mb-3">Für:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Organisationen, die Wandel gestalten wollen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Unternehmen, die Innovationen vorantreiben möchten</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Teams, die Ideen Realität werden lassen</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full btn-primary flex items-center justify-center"
              >
                Impulsvortrag buchen <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                60-Minuten Entwicklungsgespräch
              </h2>
              <h3 className="text-xl font-semibold text-yellow mb-4">
                Konkrete Lösungsansätze für Ihre Herausforderung
              </h3>
              <p className="text-gray-600 mb-6">
                Sie möchten Ihr Vorhaben strukturiert voranbringen? Sie wünschen sich einen klaren Blick von außen? In 60 Minuten konzentrierter Beratung erhalten Sie fundierte Einschätzungen und Klarheit über nächste Schritte.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-yellow mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Fokussierte Analyse Ihrer Situation</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-yellow mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Praxiserprobte Lösungsansätze</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-yellow mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Konkrete Handlungsempfehlungen</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-yellow mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Expertise aus 15 Jahren Industrieerfahrung</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow/10 rounded-lg p-8 border-2 border-yellow animate-on-scroll">
              <h3 className="text-2xl font-bold text-navy mb-4">Direkt buchen</h3>
              <p className="text-gray-700 mb-6">
                Erhalten Sie in 60 Minuten fundierte Lösungsansätze für Ihr Vorhaben.
              </p>
              <div className="bg-white rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">Investition:</p>
                <p className="text-3xl font-bold text-navy">Auf Anfrage</p>
              </div>
              <a
                href="https://www.checkout-ds24.com/product/644643"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary animate-pulse-soft block text-center"
              >
                60-Min. Entwicklungsgespräch buchen
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-yellow">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6 animate-on-scroll">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="text-xl text-navy/80 mb-8 max-w-3xl mx-auto animate-on-scroll">
            Ob Sie sich für Mentoring, Beratung oder einen Impulsvortrag interessieren – lassen Sie uns in einem ersten Gespräch herausfinden, wie ich Sie am besten unterstützen kann.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-secondary"
            >
              Kostenloses Strategiegespräch (30 Min.)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
