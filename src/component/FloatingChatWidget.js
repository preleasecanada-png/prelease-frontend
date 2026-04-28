import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { authFetch } from '@/Helper/helper';
import toast from 'react-hot-toast';
import Pusher from 'pusher-js';

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const pusherRef = useRef(null);
  const selectedConvRef = useRef(null);
  const isOpenRef = useRef(false);

  // Keep refs in sync
  useEffect(() => { selectedConvRef.current = selectedConversation; }, [selectedConversation]);
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  const playNotificationSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(1100, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.4);
    } catch (e) { /* audio not available */ }
  }, []);

  // Listen for logout event to hide widget and clean up
  useEffect(() => {
    const handleLogout = () => {
      setIsLoggedIn(false);
      setIsOpen(false);
      setConversations([]);
      setMessages([]);
      setSelectedConversation(null);
      setUnreadCount(0);
      if (pusherRef.current) {
        pusherRef.current.disconnect();
        pusherRef.current = null;
      }
    };
    window.addEventListener('logout', handleLogout);
    return () => window.removeEventListener('logout', handleLogout);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!token);
    if (!token || !userId) return;

    fetchUnreadCount();
    // Fallback poll every 30s (in case Pusher disconnects)
    const interval = setInterval(fetchUnreadCount, 30000);

    // Real-time Pusher subscription
    try {
      const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
      if (!pusherKey) {
        console.warn('Pusher app key not configured, skipping real-time updates');
        return;
      }
      const pusher = new Pusher(pusherKey, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || 'us2',
      });
      pusherRef.current = pusher;

      const channel = pusher.subscribe(`chat-notify.${userId}`);
      channel.bind('App\\Events\\ChatEvent', (data) => {
        // New message received!
        playNotificationSound();
        setUnreadCount(prev => prev + 1);

        // Show toast notification
        toast('New message received!', {
          icon: '💬',
          duration: 3000,
          style: { background: '#D80621', color: '#fff' },
        });

        // If conversation with this sender is open, add message in real-time
        const senderId = String(data.message?.sender_id);
        const currentConv = selectedConvRef.current;
        if (currentConv && String(currentConv.user.id) === senderId) {
          setMessages(prev => [...prev, {
            id: data.message.id,
            text: data.message.text,
            sender: 'other',
            created_at: data.message.created_at,
          }]);
          // Mark as read immediately
          authFetch('/chats/mark-read', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: senderId })
          }).then(() => fetchUnreadCount());
        }

        // Refresh conversations if widget is open
        if (isOpenRef.current && !selectedConvRef.current) {
          fetchConversations();
        }
      });
    } catch (e) {
      console.error('Pusher init failed:', e);
    }

    return () => {
      clearInterval(interval);
      if (pusherRef.current) {
        pusherRef.current.disconnect();
        pusherRef.current = null;
      }
    };
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const data = await authFetch('/chats/unread-count');
      if (data?.status === 200) {
        setUnreadCount(data.count);
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await authFetch('/chats/conversations');
      if (data?.status === 200) {
        setConversations(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const data = await authFetch(`/chats?user_id=${userId}`);
      if (data?.status === 200) {
        const myId = localStorage.getItem('user_id');
        const formatted = data.data.map(chat => ({
          id: chat.id,
          text: chat.message,
          sender: String(chat.sender_id) === String(userId) ? "other" : "me",
          created_at: chat.created_at,
          system: chat.type === 'reservation_request',
        }));
        setMessages(formatted);
        // Mark messages as read
        await authFetch('/chats/mark-read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId })
        });
        fetchUnreadCount(); // Refresh unread count
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const tempMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMessage]);
    setNewMessage('');

    try {
      const formData = new FormData();
      formData.append('message', newMessage);
      formData.append('received_id', selectedConversation.user.id);

      const res = await authFetch('/send-message', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 200) {
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id ? { ...res.data, sender: "me", text: res.data.message } : msg
        ));
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('Error sending message');
    }
  };

  const handleToggle = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to access chat');
      return;
    }
    
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchConversations();
    }
  };

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation.user.id);
  };

  const getUserAvatar = (user) => {
    if (user?.picture && user.picture.startsWith('http')) return user.picture;
    if (user?.picture) return `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_URL}/${user.picture}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.first_name || 'U')}&background=D80621&color=fff`;
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isLoggedIn) return null;

  return (
    <>
      {/* Floating Chat Button */}
      <div 
        className="floating-chat-button"
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#D80621',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(216, 6, 33, 0.3)',
          zIndex: 1000,
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
        </svg>
        {unreadCount > 0 && (
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: '#ff4d6d',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#D80621',
            color: 'white',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>
              {selectedConversation ? selectedConversation.user.first_name : 'Messages'}
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {selectedConversation && (
                <button
                  onClick={() => setSelectedConversation(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer'
                  }}
                >
                  ← Back
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
            {!selectedConversation ? (
              // Conversations List
              <div style={{ flex: 1, overflow: 'auto' }}>
                {loading ? (
                  <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
                ) : conversations.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    No conversations yet
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <div
                      key={conv.user.id}
                      onClick={() => selectConversation(conv)}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #eee',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        backgroundColor: 'white',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      <img
                        src={getUserAvatar(conv.user)}
                        alt={conv.user.first_name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: '4px'
                        }}>
                          <span style={{ fontWeight: '500', fontSize: '14px' }}>
                            {conv.user.first_name}
                          </span>
                          {conv.unread_count > 0 && (
                            <span style={{
                              backgroundColor: '#D80621',
                              color: 'white',
                              borderRadius: '10px',
                              padding: '2px 6px',
                              fontSize: '11px',
                              fontWeight: 'bold'
                            }}>
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#666',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {conv.last_message.message}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // Messages View
              <>
                <div style={{ 
                  flex: 1, 
                  overflowY: 'auto', 
                  minHeight: 0,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%'
                      }}
                    >
                      <div style={{
                        backgroundColor: msg.sender === 'me' ? '#D80621' : '#f1f1f1',
                        color: msg.sender === 'me' ? 'white' : 'black',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        wordWrap: 'break-word'
                      }}>
                        {msg.text}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#999',
                        marginTop: '2px',
                        textAlign: msg.sender === 'me' ? 'right' : 'left'
                      }}>
                        {new Date(msg.created_at).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div style={{
                  padding: '16px',
                  borderTop: '1px solid #eee',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '20px',
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    style={{
                      backgroundColor: '#D80621',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: newMessage.trim() ? 1 : 0.5
                    }}
                  >
                    →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatWidget;
