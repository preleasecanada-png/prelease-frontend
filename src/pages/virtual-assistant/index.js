import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MessageCircle, Send, X, Phone, MessageSquare, Settings, MoreVertical } from 'lucide-react';
import axios from 'axios';

const VirtualAssistant = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    initializeConversation();
    loadSettings();
  }, []);

  const initializeConversation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/virtual-assistant/start`,
        { channel: 'chat' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setConversationId(response.data.conversation_id);
        if (response.data.conversation?.messages) {
          setMessages(response.data.conversation.messages);
        }
      }
    } catch (error) {
      console.error('Error initializing conversation:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/virtual-assistant/settings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSettings(response.data.settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !conversationId) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { sender: 'user', message: userMessage }]);
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/virtual-assistant/send-message`,
        { conversation_id: conversationId, message: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessages(prev => [...prev, { 
          sender: 'assistant', 
          message: response.data.message,
          is_ai_generated: true
        }]);
      } else {
        setMessages(prev => [...prev, { 
          sender: 'assistant', 
          message: response.data.message || 'Sorry, I encountered an error. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        sender: 'assistant', 
        message: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const closeConversation = async () => {
    if (!conversationId) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/virtual-assistant/conversations/${conversationId}/close`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/dashboard');
    } catch (error) {
      console.error('Error closing conversation:', error);
    }
  };

  if (!isChatOpen) {
    return (
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
      >
        <MessageCircle size={28} />
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <MessageCircle className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Assistant Virtuel</h1>
                <p className="text-sm text-gray-500">Prelease Canada AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Settings className="text-gray-600" size={20} />
              </button>
              <button
                onClick={closeConversation}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="text-gray-600" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h3 className="font-semibold mb-3">Paramètres de l'Assistant</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modèle AI
                </label>
                <input
                  type="text"
                  value={settings.ai_model?.value || 'gpt-4'}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Température
                </label>
                <input
                  type="text"
                  value={settings.temperature?.value || '0.7'}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heures d'ouverture
                </label>
                <input
                  type="text"
                  value={`${settings.business_hours_start?.value || '09:00'} - ${settings.business_hours_end?.value || '18:00'}`}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support SMS
                </label>
                <input
                  type="text"
                  value={settings.enable_sms?.value === '1' ? 'Activé' : 'Désactivé'}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageCircle size={48} className="mb-4 text-gray-300" />
                <p className="text-lg">Commencez une conversation avec l'assistant virtuel</p>
                <p className="text-sm mt-2">Je suis là pour vous aider avec vos questions sur Prelease Canada</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="bg-blue-100 p-1 rounded-full">
                          <MessageCircle className="text-blue-600" size={16} />
                        </div>
                        <span className="text-sm font-medium">Assistant</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                    {msg.is_ai_generated && (
                      <span className="text-xs opacity-70 mt-1 block">AI Generated</span>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-3 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <MessageSquare size={16} />
                <span>Chat disponible 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>Support téléphonique: 9h-18h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <MessageSquare className="text-green-600" size={20} />
              </div>
              <h3 className="font-semibold">Chat en temps réel</h3>
            </div>
            <p className="text-sm text-gray-600">Obtenez des réponses instantanées à vos questions</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone className="text-blue-600" size={20} />
              </div>
              <h3 className="font-semibold">Support téléphonique</h3>
            </div>
            <p className="text-sm text-gray-600">Appelez-nous pendant les heures de bureau</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <MessageCircle className="text-purple-600" size={20} />
              </div>
              <h3 className="font-semibold">SMS Support</h3>
            </div>
            <p className="text-sm text-gray-600">Envoyez un SMS pour une assistance rapide</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualAssistant;
