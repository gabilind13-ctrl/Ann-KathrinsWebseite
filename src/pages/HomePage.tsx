import { useEffect, useRef } from 'react';
import { Wrench, Lightbulb, Rocket, Users, Factory, Mic, ArrowRight, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
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
      <section className="relative min-h-[600px] md:h-[500px] flex items-center justify-center overflow-hidden bg-navy w-screen -ml-[calc((100vw-100%)/2)]">
        <div className="absolute inset-0 z-0 hidden md:block">
          <iframe
            src="https://player.vimeo.com/video/1129915182?h=e209c5149c&background=1&autoplay=1&loop=1&muted=1&controls=0"
            className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Background Video"
          />
        </div>
        <div className="absolute inset-0 bg-navy/75 z-10" />

        <div className="relative z-20 container-custom text-center px-4 py-16 md:py-8">
          <img
            src="/ann-kathrin-andresen.jpg"
            alt="Dr.-Ing. Ann-Kathrin Andresen"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-2xl animate-fade-in"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Technik bewegt die Welt.<br />Menschen machen sie möglich.
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto animate-fade-in">
            Ich begleite Ingenieure, Chemiker, Innovationsteams und Start-ups, die Fortschritt gestalten – Schritt für Schritt, mutig, strukturiert und nachhaltig.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-primary animate-pulse-soft"
            >
              Kostenloses Strategiegespräch buchen
            </button>
            <button
              onClick={() => {
                document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              Mehr erfahren
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12 animate-on-scroll">
            Was ist Ing.up?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow rounded-full mb-4">
                <Wrench size={32} className="text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">Technische Präzision</h3>
              <p className="text-gray-600 text-left">
                Ingenieure, Chemiker, Innovationsteams und Start-ups gestalten Fortschritt – Schritt für Schritt, mutig, strukturiert und nachhaltig. Ing.up steht für die Verbindung aus technischer Präzision und menschlicher Stärke. Für Innovationen, die Realität werden.
              </p>
            </div>

            <div className="p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow rounded-full mb-4">
                <Lightbulb size={32} className="text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">Bewährte Expertise</h3>
              <p className="text-gray-600 text-left">
                Erfahrung aus 19 Jahren Ingenieurin und über 10 Jahre in einem Startup zeigen: Innovation entsteht nicht durch Zufall, sondern durch Menschen, die Verantwortung übernehmen, Herausforderungen meistern und an ihre Ideen glauben. Die Pyrolyse-Technologie, einst belächelt, wurde so zu einem Unternehmen mit über 150 Arbeitsplätzen und einem Marktwert von mehr als 100 Millionen Euro.
              </p>
            </div>

            <div className="p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow rounded-full mb-4">
                <Rocket size={32} className="text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">Nachhaltige Innovation</h3>
              <p className="text-gray-600 text-left">
                Ein Beweis dafür, was möglich ist, wenn Wissen, Beharrlichkeit und Teamgeist zusammentreffen. Ing.up fördert genau diese Haltung – mit Mentoring, Beratung und Impulsen für nachhaltige Innovationskultur. Der Mensch steht dabei im Mittelpunkt jeder technischen Entwicklung.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12 animate-on-scroll">
            Was ich anbiete
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll">
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
              <p className="text-gray-600 mb-6">
                Sechs Monate Begleitung im 1:1 – online, fokussiert und praxisnah. Ziel ist Klarheit, Struktur und Umsetzungsstärke, um Projekte souverän, effizient und mit Freude zu realisieren.
              </p>
              <div className="mb-6">
                <p className="font-semibold text-navy mb-2">Für wen:</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    Ingenieure und Chemiker, die neue Wege gehen wollen
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    Fach- und Führungskräfte in Innovationsteams
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    CTOs und technische Führungskräfte in Start-ups
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

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll">
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
              <p className="text-gray-600 mb-6">
                Zwei bis drei Tage Präsenz kombiniert mit sechs Monaten digitaler Unterstützung. Schwerpunkt: Upscaling, Prozessoptimierung und Teamentwicklung. Das Ergebnis: Innovationen, die technisch fundiert, wirtschaftlich tragfähig und menschlich sinnvoll sind.
              </p>
              <div className="mb-6">
                <p className="font-semibold text-navy mb-2">Schwerpunkte:</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    Upscaling von Labormaßstab zu Industrie
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    Teamentwicklung Start-ups und Innovationsteams
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    Pyrolyse - Entwicklung, Optimierung, Bewertung
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

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll">
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
              <p className="text-gray-600 mb-6">
                Impulse für Unternehmen, die ihre Mitarbeitenden befähigen wollen, mutig neue Wege zu gehen. Mit konkreten Praxisbeispielen, neurowissenschaftlichen Erkenntnissen und klarer Struktur. Denn der Mensch ist das Fundament jeder Innovation – wer gesehen wird, wächst über sich hinaus.
              </p>
              <div className="mb-6">
                <p className="font-semibold text-navy mb-2">Für:</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    Organisationen, die Wandel gestalten wollen
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    Unternehmen, die Innovationen vorantreiben möchten
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-yellow mr-2 mt-1 flex-shrink-0" />
                    Teams, die Ideen Realität werden lassen
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full btn-primary flex items-center justify-center"
              >
                Workshop buchen <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
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
                className="w-full bg-yellow hover:bg-yellow/90 text-navy px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl block text-center"
              >
                60-Min. Entwicklungsgespräch buchen
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Unverbindlich kennenlernen – 30 Minuten kostenlos
              </h2>
              <p className="text-gray-200 mb-6">
                Sie sind unsicher, ob Mentoring oder Beratung das Richtige für Sie ist? Nutzen Sie ein kostenloses 30-minütiges Strategiegespräch. Wir lernen uns kennen, ich höre mir Ihre Situation an und wir schauen gemeinsam, wie ich Sie am besten unterstützen kann – ohne Verpflichtung, mit voller Klarheit.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-yellow mr-3 mt-1 flex-shrink-0" />
                  <span>30 Minuten Ihrer Zeit</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-yellow mr-3 mt-1 flex-shrink-0" />
                  <span>Völlig kostenfrei & unverbindlich</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-yellow mr-3 mt-1 flex-shrink-0" />
                  <span>Klare Einschätzung Ihrer Situation</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-yellow mr-3 mt-1 flex-shrink-0" />
                  <span>Kein Verkaufsgespräch</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 animate-on-scroll">
              <h3 className="text-2xl font-bold text-navy mb-6">Kostenloses Strategiegespräch</h3>
              <p className="text-gray-700 mb-6">
                Der erste Schritt beginnt mit einem Gespräch. Lassen Sie uns 30 Minuten gemeinsam schauen, wie ich Sie unterstützen kann.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full btn-primary animate-pulse-soft"
              >
                Jetzt Strategiegespräch vereinbaren
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12 animate-on-scroll">
            Erfahrung, die wirkt
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="text-center animate-on-scroll">
              <div className="text-4xl font-bold text-yellow mb-2">19+</div>
              <p className="text-gray-600">Jahre Ingenieurin</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="text-4xl font-bold text-yellow mb-2">10+</div>
              <p className="text-gray-600">Jahre Startup Erfahrung</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="text-4xl font-bold text-yellow mb-2">15+</div>
              <p className="text-gray-600">Jahre Pyrolyseexpertin</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="text-4xl font-bold text-yellow mb-2">VDI</div>
              <p className="text-gray-600">WoMentorING Mentorin</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="text-4xl font-bold text-yellow mb-2">Hero's</div>
              <p className="text-gray-600">Journey Instructor</p>
            </div>
          </div>

          <div className="bg-yellow/10 rounded-lg p-8 border-l-4 border-yellow animate-on-scroll">
            <p className="text-lg text-gray-700">
              <strong className="text-navy">Pyrum Innovations AG:</strong> Erste Mitarbeiterin und rechte Hand des Erfinders – später Leiterin Verfahrenstechnik. Entwicklung und Bau der ersten industriellen Altreifen-Pyrolyseanlage. Heute über 100 Mio. € Unternehmenswert und 150 Mitarbeitende.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-yellow">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6 animate-on-scroll">
            Bereit, Ihre Innovation voranzubringen?
          </h2>
          <p className="text-xl text-navy/80 mb-8 animate-on-scroll">
            Ob Mentoring, Beratung oder Impulsvortrag – der erste Schritt beginnt mit einem Gespräch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-secondary animate-pulse-soft"
            >
              Kostenloses Strategiegespräch (30 Min.)
            </button>
            <a
              href="https://www.checkout-ds24.com/product/644643"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow hover:bg-yellow/90 text-navy px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
            >
              60-Min. Entwicklungsgespräch buchen
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
