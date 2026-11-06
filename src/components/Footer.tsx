import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-navy text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="/logo.png"
              alt="ING.-UP Logo"
              className="h-20 w-20 object-contain mb-4"
            />
            <h3 className="text-xl font-bold text-yellow mb-4">Über Ing.up</h3>
            <p className="text-sm text-gray-300 mb-4">
              Mentoring. Beratung. Innovation.
            </p>
            <p className="text-sm text-gray-300">
              Technische Präzision trifft menschliche Stärke. Für Innovationen, die Realität werden.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-yellow mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              {['home', 'about', 'services', 'blog', 'contact'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-sm text-gray-300 hover:text-yellow transition-colors duration-200"
                  >
                    {page === 'home' && 'Home'}
                    {page === 'about' && 'Über mich'}
                    {page === 'services' && 'Leistungen'}
                    {page === 'blog' && 'Blog'}
                    {page === 'contact' && 'Kontakt'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-yellow mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="text-yellow mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  Dr.-Ing. Ann-Kathrin Andresen<br />
                  Talstraße 2<br />
                  71737 Kirchberg an der Murr
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-yellow flex-shrink-0" />
                <a
                  href="tel:+491733473367"
                  className="text-sm text-gray-300 hover:text-yellow transition-colors duration-200"
                >
                  +49 173 3473 367
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-yellow flex-shrink-0" />
                <a
                  href="mailto:mail@akandresen.de"
                  className="text-sm text-gray-300 hover:text-yellow transition-colors duration-200"
                >
                  mail@akandresen.de
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-yellow mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/ann-kathrin-andresen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">
            © 2025 Dr.-Ing. Ann-Kathrin Andresen | Ing.up
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => onNavigate('impressum')}
              className="text-sm text-gray-300 hover:text-yellow transition-colors duration-200"
            >
              Impressum
            </button>
            <button
              onClick={() => onNavigate('datenschutz')}
              className="text-sm text-gray-300 hover:text-yellow transition-colors duration-200"
            >
              Datenschutzerklärung
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
