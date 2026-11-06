import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reset-password-admin`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ email, newPassword }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Passwort-Reset fehlgeschlagen');
        }

        setSuccess('Passwort erfolgreich zurückgesetzt! Sie können sich jetzt mit dem neuen Passwort anmelden.');
        setIsForgotPassword(false);
        setNewPassword('');
      } else if (isSignUp) {
        await signUp(email, password, adminCode);
        setSuccess('Account erfolgreich erstellt! Sie können sich jetzt anmelden.');
        setIsSignUp(false);
        setPassword('');
        setAdminCode('');
      } else {
        await signIn(email, password);
        window.location.href = '/admin';
      }
    } catch (err) {
      if (isForgotPassword) {
        setError(err instanceof Error ? err.message : 'Passwort-Reset fehlgeschlagen.');
      } else if (isSignUp) {
        const errorMessage = err instanceof Error ? err.message : 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
        setError(errorMessage);
      } else {
        setError('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Zugangsdaten.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            {isSignUp ? (
              <UserPlus className="w-8 h-8 text-white" />
            ) : (
              <LogIn className="w-8 h-8 text-white" />
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {isForgotPassword ? 'Passwort zurücksetzen' : isSignUp ? 'Admin Registrierung' : 'Admin Login'}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {isForgotPassword
            ? 'Setzen Sie ein neues Passwort für Ihren Account'
            : isSignUp
            ? 'Erstellen Sie einen Admin-Account'
            : 'Melden Sie sich an, um das CMS zu verwalten'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="ihre@email.de"
            />
          </div>

          {!isForgotPassword && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Passwort
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          )}

          {isForgotPassword && (
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Neues Passwort
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Neues Passwort eingeben"
              />
            </div>
          )}

          {isSignUp && !isForgotPassword && (
            <div>
              <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 mb-2">
                Admin-Code
              </label>
              <input
                type="password"
                id="adminCode"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Geheimer Admin-Code"
              />
              <p className="mt-2 text-sm text-gray-500">
                Nur mit gültigem Admin-Code können Sie sich registrieren
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? (isForgotPassword ? 'Passwort zurücksetzen...' : isSignUp ? 'Registrieren...' : 'Anmelden...')
              : (isForgotPassword ? 'Passwort zurücksetzen' : isSignUp ? 'Registrieren' : 'Anmelden')}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          {!isForgotPassword && (
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setSuccess('');
              }}
              className="block w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {isSignUp
                ? 'Bereits einen Account? Jetzt anmelden'
                : 'Noch kein Account? Jetzt registrieren'}
            </button>
          )}

          {!isSignUp && (
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(!isForgotPassword);
                setError('');
                setSuccess('');
                setPassword('');
                setNewPassword('');
              }}
              className="block w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {isForgotPassword
                ? 'Zurück zum Login'
                : 'Passwort vergessen?'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
