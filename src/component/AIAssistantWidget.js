import React, { useState, useEffect, useRef, useCallback } from 'react';
import { authFetch } from '@/Helper/helper';

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setIsLoggedIn(false);
      setIsOpen(false);
      setMessages([]);
      setSuggestions([]);
    };
    window.addEventListener('logout', handleLogout);
    return () => window.removeEventListener('logout', handleLogout);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 3000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0 && isLoggedIn) {
      loadSuggestions();
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm **Prelease AI** 🏠\n\nI can help you find properties that match your budget, explain the rental process, and guide you through every step. How can I help you today?"
      }]);
    }
  }, [isOpen, isLoggedIn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadSuggestions = async () => {
    try {
      const data = await authFetch('/ai-assistant/suggestions');
      if (data?.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (e) {
      console.error('Failed to load suggestions');
    }
  };

  const sendMessage = useCallback(async (text) => {
    const msgText = text || input.trim();
    if (!msgText || loading) return;

    const userMsg = { role: 'user', content: msgText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setSuggestions([]);

    try {
      const conversation = newMessages
        .filter(m => m.role !== 'system')
        .slice(-20)
        .map(m => ({ role: m.role, content: m.content }));

      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/ai-assistant/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: msgText,
          conversation: conversation.slice(0, -1),
        }),
      });

      const data = await res.json();
      console.log('AI response:', res.status, data);

      if (data?.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        const errMsg = data?.error || data?.message || "Sorry, I couldn't process your request. Please try again.";
        setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Chat cleared! How can I help you?"
    }]);
    loadSuggestions();
  };

  const formatMessage = (text) => {
    if (!text) return '';
    // Markdown links [text](url)
    let formatted = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#D80621;text-decoration:underline;font-weight:600;">$1</a>');
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Newlines
    formatted = formatted.replace(/\n/g, '<br/>');
    // List items
    formatted = formatted.replace(/- (.*?)(?=<br\/>|$)/g, '<span style="display:block;padding-left:12px;">• $1</span>');
    return formatted;
  };

  if (!isLoggedIn) return null;

  return (
    <>
      {/* AI Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ai-assistant-btn"
          title="Prelease AI Assistant"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a8 8 0 0 1 8 8v1a8 8 0 0 1-3.07 6.3L12 22l-4.93-4.7A8 8 0 0 1 4 11v-1a8 8 0 0 1 8-8z"/>
            <circle cx="12" cy="10" r="3"/>
            <path d="M9 10h.01M15 10h.01"/>
          </svg>
          <span className="ai-assistant-btn-badge">AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-assistant-window">
          {/* Header */}
          <div className="ai-assistant-header">
            <div className="ai-assistant-header-left">
              <div className="ai-assistant-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2a8 8 0 0 1 8 8v1a8 8 0 0 1-3.07 6.3L12 22l-4.93-4.7A8 8 0 0 1 4 11v-1a8 8 0 0 1 8-8z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div className="ai-assistant-title">Prelease AI</div>
                <div className="ai-assistant-subtitle">Your rental assistant</div>
              </div>
            </div>
            <div className="ai-assistant-header-actions">
              <button onClick={clearChat} className="ai-assistant-clear-btn" title="Clear chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"/></svg>
              </button>
              <button onClick={() => setIsOpen(false)} className="ai-assistant-close-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="ai-assistant-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg ${msg.role === 'user' ? 'ai-msg-user' : 'ai-msg-assistant'}`}>
                {msg.role === 'assistant' && (
                  <div className="ai-msg-avatar-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M12 2a8 8 0 0 1 8 8v1a8 8 0 0 1-3.07 6.3L12 22l-4.93-4.7A8 8 0 0 1 4 11v-1a8 8 0 0 1 8-8z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                )}
                <div
                  className={`ai-msg-bubble ${msg.role === 'user' ? 'ai-msg-bubble-user' : 'ai-msg-bubble-assistant'}`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
              </div>
            ))}
            {loading && (
              <div className="ai-msg ai-msg-assistant">
                <div className="ai-msg-avatar-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 2a8 8 0 0 1 8 8v1a8 8 0 0 1-3.07 6.3L12 22l-4.93-4.7A8 8 0 0 1 4 11v-1a8 8 0 0 1 8-8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="ai-msg-bubble ai-msg-bubble-assistant ai-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && messages.length <= 1 && (
            <div className="ai-suggestions">
              {suggestions.map((s, i) => (
                <button key={i} className="ai-suggestion-chip" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="ai-assistant-input-area">
            <input
              type="text"
              className="ai-assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={loading}
            />
            <button
              className="ai-assistant-send"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistantWidget;
