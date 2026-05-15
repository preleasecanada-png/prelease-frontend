import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authFetch } from '@/Helper/helper';
import { 
  Settings, 
  Save, 
  Phone, 
  MessageSquare, 
  Clock, 
  Brain, 
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const AdminVirtualAssistant = () => {
  const router = useRouter();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await authFetch('/virtual-assistant/settings');

      if (response?.success) {
        setSettings(response.settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      showNotification('Erreur lors du chargement des paramètres', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key, value, type) => {
    setSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: value
      }
    }));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const settingsArray = Object.entries(settings).map(([key, data]) => ({
        key,
        value: data.value,
        type: data.type,
        description: data.description
      }));

      const response = await authFetch('/virtual-assistant/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: settingsArray }),
      });

      if (response?.success) {
        showNotification('Paramètres sauvegardés avec succès', 'success');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('Erreur lors de la sauvegarde des paramètres', 'error');
    } finally {
      setSaving(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="text-gray-600" size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Configuration Assistant Virtuel</h1>
                <p className="text-sm text-gray-500">Gérez les paramètres de l'assistant AI et des communications</p>
              </div>
            </div>
            <button
              onClick={saveSettings}
              disabled={saving}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Configuration */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-purple-100 p-2 rounded-full">
                <Brain className="text-purple-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold">Configuration AI</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fournisseur AI
                </label>
                <select
                  value={settings.ai_provider?.value || 'openai'}
                  onChange={(e) => handleSettingChange('ai_provider', e.target.value, 'string')}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modèle AI
                </label>
                <select
                  value={settings.ai_model?.value || 'gpt-4'}
                  onChange={(e) => handleSettingChange('ai_model', e.target.value, 'string')}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Tokens
                </label>
                <input
                  type="number"
                  value={settings.max_tokens?.value || 1000}
                  onChange={(e) => handleSettingChange('max_tokens', e.target.value, 'integer')}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Température ({settings.temperature?.value || 0.7})
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.temperature?.value || 0.7}
                  onChange={(e) => handleSettingChange('temperature', e.target.value, 'float')}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Précis (0)</span>
                  <span>Créatif (2)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prompt Système
                </label>
                <textarea
                  value={settings.system_prompt?.value || ''}
                  onChange={(e) => handleSettingChange('system_prompt', e.target.value, 'text')}
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Définissez le comportement de l'assistant..."
                />
              </div>
            </div>
          </div>

          {/* Communication Channels */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-full">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold">Canaux de Communication</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="text-gray-600" size={20} />
                  <div>
                    <h3 className="font-medium">Support SMS</h3>
                    <p className="text-sm text-gray-500">Permettre les communications par SMS</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enable_sms?.value === '1'}
                    onChange={(e) => handleSettingChange('enable_sms', e.target.checked ? '1' : '0', 'boolean')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-600" size={20} />
                  <div>
                    <h3 className="font-medium">Support Téléphonique</h3>
                    <p className="text-sm text-gray-500">Permettre les appels vocaux</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enable_voice?.value === '1'}
                    onChange={(e) => handleSettingChange('enable_voice', e.target.checked ? '1' : '0', 'boolean')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Clock className="text-gray-600" size={20} />
                <span>Heures de Bureau</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure de début
                  </label>
                  <input
                    type="time"
                    value={settings.business_hours_start?.value || '09:00'}
                    onChange={(e) => handleSettingChange('business_hours_start', e.target.value, 'string')}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure de fin
                  </label>
                  <input
                    type="time"
                    value={settings.business_hours_end?.value || '18:00'}
                    onChange={(e) => handleSettingChange('business_hours_end', e.target.value, 'string')}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                En dehors de ces heures, les réponses SMS et téléphoniques seront différées.
              </p>
            </div>
          </div>

          {/* API Configuration */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-100 p-2 rounded-full">
                <Settings className="text-green-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold">Configuration API</h2>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                <div>
                  <h3 className="font-medium text-yellow-800">Variables d'Environnement Requises</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Les clés API suivantes doivent être configurées dans le fichier .env du backend:
                  </p>
                  <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                    <li>• OPENAI_API_KEY - Clé API OpenAI</li>
                    <li>• TWILIO_ACCOUNT_SID - SID de compte Twilio</li>
                    <li>• TWILIO_AUTH_TOKEN - Token d'authentification Twilio</li>
                    <li>• TWILIO_PHONE_NUMBER - Numéro de téléphone Twilio</li>
                    <li>• TWILIO_API_KEY_SID - SID de clé API Twilio (pour les appels)</li>
                    <li>• TWILIO_API_KEY_SECRET - Secret de clé API Twilio</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Webhooks Twilio</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <label className="text-gray-600">SMS Webhook URL:</label>
                    <code className="block bg-gray-100 p-2 rounded mt-1 text-xs break-all">
                      {process.env.NEXT_PUBLIC_API_URL}/api/twilio/sms
                    </code>
                  </div>
                  <div>
                    <label className="text-gray-600">Call Webhook URL:</label>
                    <code className="block bg-gray-100 p-2 rounded mt-1 text-xs break-all">
                      {process.env.NEXT_PUBLIC_API_URL}/api/twilio/call
                    </code>
                  </div>
                  <div>
                    <label className="text-gray-600">Voice Gather URL:</label>
                    <code className="block bg-gray-100 p-2 rounded mt-1 text-xs break-all">
                      {process.env.NEXT_PUBLIC_API_URL}/api/twilio/gather
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Statistiques</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">--</div>
                    <div className="text-sm text-gray-500">Conversations actives</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">--</div>
                    <div className="text-sm text-gray-500">Messages aujourd'hui</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVirtualAssistant;
