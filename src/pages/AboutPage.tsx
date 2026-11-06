import { useEffect, useRef } from 'react';
import { Target, Award, Users, Heart } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
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
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/drannkathrinandresen.jpeg"
                  alt="Dr.-Ing. Ann-Kathrin Andresen"
                  className="w-full h-auto object-contain object-top"
                  style={{ maxHeight: '650px' }}
                />
              </div>
            </div>
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Dr.-Ing. Ann-Kathrin Andresen
              </h1>
              <p className="text-xl text-yellow mb-6">
                Pyrolyseexpertin I Mentorin I Innovationsbegleiterin
              </p>
              <p className="text-lg text-gray-200">
                Technische Präzision trifft menschliche Stärke – für Innovationen, die Realität werden.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 animate-on-scroll">
              <div className="flex items-center mb-6">
                <Target className="text-yellow mr-4" size={40} />
                <h2 className="text-3xl font-bold text-navy">
                  Technik bewegt die Welt – Menschen machen sie möglich
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Dr. Ann-Kathrin Andresen ist Ingenieurin aus der chemischen Industrie. Aus ihrer Start-up-Erfahrung weiß sie, wie viel Mut, Ausdauer und Teamgeist es braucht, um Innovation umzusetzen. Heute bestärkt sie Menschen, die Zukunft gestalten wollen.
              </p>
            </div>

            <div className="mb-12 animate-on-scroll">
              <div className="flex items-center mb-6">
                <Award className="text-yellow mr-4" size={40} />
                <h2 className="text-3xl font-bold text-navy">
                  19 Jahre Lösungen für komplexe Herausforderungen
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Ihre Erfahrung reicht von der Entwicklung neuer industrieller Prozesse bis zur Optimierung bestehender Anlagen und der Identifikation von Einsparpotenzialen. Als erste Mitarbeiterin und langjährige Leiterin der Verfahrenstechnik prägte sie bei der Pyrum Innovations AG die Entwicklung des industriellen Prototyps für die Pyrolyse von Altreifen – von der Planung bis zum Betrieb. Innovation entsteht nicht durch Perfektion, sondern durch Beharrlichkeit und den Mut, Neues zu wagen.
              </p>
              <div className="rounded-lg overflow-hidden shadow-xl mt-8">
                <img
                  src="/dr-andresen-action.jpg"
                  alt="Dr. Andresen in Aktion"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            <div className="mb-12 animate-on-scroll">
              <div className="flex items-center mb-6">
                <Target className="text-yellow mr-4" size={40} />
                <h2 className="text-3xl font-bold text-navy">
                  Lösungen für Ihre Prozesse
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Als Expertin für Verfahrenstechnik und Innovation begleitet Ann-Kathrin Andresen Unternehmen beim Upscaling neuer Prozesse vom Labor- zum Industriemaßstab. Sie stärkt Start-ups und Innovationsteams in ihrer technischen und organisatorischen Entwicklung mit dem Ziel, Technik und Menschen zusammenzubringen, damit Innovation gelingt. Ein weiterer Schwerpunkt ist die Pyrolyse, die Entwicklung, Optimierung und Bewertung solcher Anlagen. Ihr Verfahrenstechnik-Motto: „So einfach wie möglich und so kompliziert wie nötig."
              </p>
            </div>

            <div className="mb-12 animate-on-scroll">
              <div className="flex items-center mb-6">
                <Users className="text-yellow mr-4" size={40} />
                <h2 className="text-3xl font-bold text-navy">
                  Menschen stärken – Innovation ermöglichen
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Innovation entsteht dort, wo Menschen gesehen werden. Ob Ingenieur, Chemiker oder technische Führungskräfte Ann-Kathrin Andresen unterstützt Sie dabei, Klarheit zu gewinnen, Herausforderungen zu meistern und mit Freude Verantwortung zu übernehmen. Als leidenschaftliche Basketballspielerin weiß sie: Erfolg entsteht im Team, wenn jede und jeder die eigene Stärke einbringt, Vertrauen wächst und das gemeinsame Ziel im Mittelpunkt steht. Aus ihrer eigenen Start-up-Erfahrung kennt sie die Herausforderungen technischer Entwicklung aus erster Hand.
              </p>
            </div>

            <div className="mb-12 animate-on-scroll">
              <div className="flex items-center mb-6">
                <Heart className="text-yellow mr-4" size={40} />
                <h2 className="text-3xl font-bold text-navy">
                  Authentische Entwicklung – inspiriert von Natur und Erfahrung
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Neben ihrer technischen Laufbahn absolvierte Ann-Kathrin Andresen eine Ausbildung zur Hero's Journey Instructorin. Sie verbindet Erkenntnisse aus Natur und Neurowissenschaft mit Coaching, um Menschen zu mehr Authentizität und innerer Stärke zu führen.
              </p>
            </div>

            <div className="bg-navy text-white rounded-lg p-8 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6">
                VDI-WoMentorING – Frauen in der Technik fördern
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                Dr.-Ing. Ann-Kathrin Andresen engagiert sich als Mentorin im VDI-WoMentorING 2024 und freut sich über die erfolgreiche Präsenzveranstaltung des Programms. Das vom VDI e.V. initiierte Mentoring verbindet in diesem Jahr 102 Ingenieurinnen als Mentee und Mentorin.
              </p>
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                Eine sehr gute Gelegenheit für junge Ingenieurinnen von einer erfahrenen Ingenieurin ein Jahr begleitet zu werden. Auch 2025 begleitet Dr.-Ing. Ann-Kathrin Andresen eine Ingenieurin ein Jahr auf ihrem Weg.
              </p>
              <div className="rounded-lg overflow-hidden shadow-xl mt-8">
                <img
                  src="/womentoring2024.jpg"
                  alt="VDI-WoMentorING 2024 Veranstaltung"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-yellow">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 animate-on-scroll">
            Möchten Sie mehr erfahren?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-secondary"
            >
              Kostenloses Strategiegespräch
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-primary"
            >
              Zur Kontaktseite
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
