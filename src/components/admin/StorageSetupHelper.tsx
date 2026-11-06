import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AlertCircle, CheckCircle, Upload } from 'lucide-react';

export default function StorageSetupHelper() {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    canUpload: boolean;
    canRead: boolean;
    error?: string;
  } | null>(null);

  const testStoragePolicies = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      const testFileName = `test-${Date.now()}.txt`;
      const testFilePath = `uploads/${testFileName}`;
      const testBlob = new Blob(['test'], { type: 'text/plain' });

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(testFilePath, testBlob);

      if (uploadError) {
        setTestResult({
          canUpload: false,
          canRead: false,
          error: uploadError.message,
        });
        setTesting(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(testFilePath);

      try {
        const response = await fetch(publicUrl);
        const canRead = response.ok;

        await supabase.storage.from('media').remove([testFilePath]);

        setTestResult({
          canUpload: true,
          canRead,
        });
      } catch {
        setTestResult({
          canUpload: true,
          canRead: false,
          error: 'Lesezugriff fehlgeschlagen',
        });
      }
    } catch (error) {
      setTestResult({
        canUpload: false,
        canRead: false,
        error: String(error),
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Storage-Konfiguration prüfen
          </h3>
          <p className="text-sm text-blue-800 mb-4">
            Bevor Sie Bilder hochladen können, müssen Storage-Policies konfiguriert sein.
            Testen Sie die Konfiguration mit dem Button unten.
          </p>

          <button
            onClick={testStoragePolicies}
            disabled={testing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {testing ? 'Teste...' : 'Storage testen'}
          </button>

          {testResult && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {testResult.canUpload ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={testResult.canUpload ? 'text-green-700' : 'text-red-700'}>
                    Upload: {testResult.canUpload ? 'Funktioniert' : 'Fehler'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {testResult.canRead ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={testResult.canRead ? 'text-green-700' : 'text-red-700'}>
                    Lesezugriff: {testResult.canRead ? 'Funktioniert' : 'Fehler'}
                  </span>
                </div>
                {testResult.error && (
                  <div className="mt-3 p-3 bg-red-50 rounded text-sm text-red-800">
                    <strong>Fehler:</strong> {testResult.error}
                  </div>
                )}
              </div>

              {!testResult.canUpload && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                  <p className="font-semibold text-yellow-900 mb-2">
                    So beheben Sie das Problem:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-yellow-800">
                    <li>Öffnen Sie Ihr Supabase Dashboard</li>
                    <li>Navigieren Sie zu Storage → media Bucket → Policies</li>
                    <li>Erstellen Sie folgende Policies:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>INSERT für authenticated users</li>
                        <li>SELECT für public users</li>
                        <li>UPDATE für authenticated users (own files)</li>
                        <li>DELETE für authenticated users (own files)</li>
                      </ul>
                    </li>
                  </ol>
                  <p className="mt-3 text-xs text-yellow-700">
                    Siehe STORAGE_SETUP.md für detaillierte Anweisungen
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
