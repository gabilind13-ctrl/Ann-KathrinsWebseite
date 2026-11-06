import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Über mich' },
    { id: 'services', label: 'Leistungen' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Kontakt' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <img
              src="/ann-kathrin-1.png"
              alt="Dr.-Ing. Ann-Kathrin Andresen"
              className="h-14 w-14 rounded-full object-cover"
            />
            <span className="text-2xl font-bold text-navy">
              Dr.-Ing. Ann-Kathrin Andresen
            </span>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <img
              src="/logo.png"
              alt="ING.-UP Logo"
              className="h-16 w-16 object-contain"
            />
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-base font-medium transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'text-yellow'
                    : 'text-navy hover:text-yellow'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-navy"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex justify-center mb-4 pb-4 border-b border-gray-200">
              <img
                src="/logo.png"
                alt="ING.-UP Logo"
                className="h-20 w-20 object-contain"
              />
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 text-base font-medium transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'text-yellow bg-yellow/10'
                    : 'text-navy hover:text-yellow hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
