import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-navy to-gray-900 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Lassen Sie uns sprechen
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in">
            Der erste Schritt beginnt hier
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center animate-fade-in">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Vielen Dank für Ihre Anfrage!
                  </h3>
                  <p className="text-green-700">
                    Ich melde mich so schnell wie möglich bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-navy mb-2">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-navy mb-2">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
                      Telefon (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-navy mb-2">
                      Unternehmen/Institution
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-semibold text-navy mb-2">
                      Interesse an *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow focus:outline-none transition-colors"
                    >
                      <option value="">Bitte auswählen</option>
                      <option value="erstgespraech">Kostenloses Erstgespräch (30 Min.)</option>
                      <option value="mentoring">Mentoring für Ingenieure/Chemiker</option>
                      <option value="startup">Start-up Beratung</option>
                      <option value="workshop">Vortrag/Workshop</option>
                      <option value="beratung">60-Min. Beratungsgespräch</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow focus:outline-none transition-colors resize-none"
                      placeholder="Beschreiben Sie kurz Ihre Situation oder Ihr Anliegen..."
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 mr-3 w-5 h-5 text-yellow border-gray-300 rounded focus:ring-yellow"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      Ich habe die{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('datenschutz')}
                        className="text-yellow hover:underline font-semibold"
                      >
                        Datenschutzerklärung
                      </button>{' '}
                      zur Kenntnis genommen. Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für Rückfragen dauerhaft gespeichert werden. *
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center animate-pulse-soft"
                  >
                    Anfrage senden <Send size={20} className="ml-2" />
                  </button>
                </form>
              )}
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-8 mb-6">
                <h3 className="text-2xl font-bold text-navy mb-6">Kontaktdaten</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-yellow mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-gray-700 font-semibold">Adresse</p>
                      <p className="text-gray-600">
                        Dr.-Ing. Ann-Kathrin Andresen<br />
                        Talstraße 2<br />
                        71737 Kirchberg an der Murr<br />
                        Deutschland
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-yellow mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-gray-700 font-semibold">Telefon</p>
                      <a
                        href="tel:+491733473367"
                        className="text-gray-600 hover:text-yellow transition-colors"
                      >
                        +49 173 3473 367
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-yellow mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-gray-700 font-semibold">E-Mail</p>
                      <a
                        href="mailto:mail@akandresen.de"
                        className="text-gray-600 hover:text-yellow transition-colors"
                      >
                        mail@akandresen.de
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow/10 rounded-lg p-8 border-2 border-yellow">
                <h3 className="text-xl font-bold text-navy mb-4">
                  Direkt Termin buchen
                </h3>
                <p className="text-gray-700 mb-6">
                  Nutzen Sie die Möglichkeit, direkt einen Termin für ein Erstgespräch oder eine Beratung zu vereinbaren.
                </p>
                <div className="space-y-3">
                  <button className="w-full btn-secondary text-sm">
                    Google Kalender
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    Microsoft Teams
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-yellow">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Lieber telefonieren?
          </h2>
          <p className="text-lg text-navy/80 mb-6">
            Rufen Sie mich gerne direkt an oder vereinbaren Sie einen Rückruf.
          </p>
          <a
            href="tel:+491733473367"
            className="inline-flex items-center btn-secondary"
          >
            <Phone size={20} className="mr-2" />
            +49 173 3473 367
          </a>
        </div>
      </section>
    </div>
  );
}
