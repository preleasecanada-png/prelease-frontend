import React, { createContext, useState, useRef, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { authFetch } from '@/Helper/helper';
import Pusher from 'pusher-js';

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const pusherRef = useRef(null);
  const channelRef = useRef(null);
  const activePeerRef = useRef(null);
  const lastMsgIdRef = useRef(0);

  // Initialize a single Pusher connection scoped to my own channel.
  // We listen on my user's notify channel and append messages whose sender_id
  // matches the active peer.
  useEffect(() => {
    const myId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (!myId) return;
    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    if (!pusherKey) return;

    try {
      const pusher = new Pusher(pusherKey, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || 'us2',
      });
      pusherRef.current = pusher;
      const channel = pusher.subscribe(`chat-notify.${myId}`);
      channelRef.current = channel;
      channel.bind('App\\Events\\ChatEvent', (data) => {
        const peerId = activePeerRef.current;
        if (!peerId) return;
        const senderId = String(data.message?.sender_id);
        if (senderId !== String(peerId)) return; // not the active conversation
        setMessages(prev => {
          if (prev.some(m => m.id === data.message.id)) return prev;
          return [...prev, {
            id: data.message.id,
            text: data.message.text,
            sender: 'landlord',
            created_at: data.message.created_at,
            system: data.message.type === 'reservation_request',
          }];
        });
        lastMsgIdRef.current = Math.max(lastMsgIdRef.current, data.message.id);
      });
    } catch (_) {
      // ignore: real-time disabled
    }

    return () => {
      try { if (pusherRef.current) pusherRef.current.disconnect(); } catch (_) {}
      pusherRef.current = null;
      channelRef.current = null;
    };
  }, []);

  const stopListening = useCallback(() => {
    activePeerRef.current = null;
    setMessages([]);
  }, []);

  // Backwards-compatible no-op kept for the popup that calls listenToMessages(myId)
  const listenToMessages = useCallback(() => {
    // Real-time is handled globally via the Pusher subscription above.
  }, []);

  const sendMessage = async (message, user_id) => {
    if (!message) {
      toast.error("Message cannot be empty");
      return;
    }

    const outgoing = { id: Date.now(), text: message, sender: "tenant", created_at: new Date().toISOString() };
    setMessages(prev => [...prev, outgoing]);

    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("received_id", user_id);

      const res = await authFetch(`/send-message`, {
        method: "POST",
        body: formData,
      });

      if (res.status !== 200) {
        toast.error(res?.message || "Something went wrong");
        // remove the failed optimistic message
        setMessages(prev => prev.filter(m => m.id !== outgoing.id));
      } else if (res.data) {
        lastMsgIdRef.current = Math.max(lastMsgIdRef.current, res.data.id);
        // replace the optimistic message with the real one (so the id matches the server)
        setMessages(prev => prev.map(m => m.id === outgoing.id
          ? { ...m, id: res.data.id, created_at: res.data.created_at || m.created_at }
          : m));
      }
    } catch (error) {
      toast.error("API error");
      setMessages(prev => prev.filter(m => m.id !== outgoing.id));
    }
  };

  const addSystemMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), text, system: true, created_at: new Date().toISOString() }]);
  };

  const fetchChats = async (user_id) => {
    activePeerRef.current = user_id;
    lastMsgIdRef.current = 0;
    try {
      const data = await authFetch(`/chats?user_id=${user_id}`);
      if (data.status === 200) {
        const chats = Array.isArray(data.data) ? data.data : [];
        const formattedChats = chats.map(chat => ({
          id: chat.id,
          text: chat.message,
          sender: String(chat.sender_id) === String(user_id) ? "landlord" : "tenant",
          created_at: chat.created_at,
          system: chat.type === 'reservation_request',
        }));

        if (chats.length > 0) {
          lastMsgIdRef.current = Math.max(...chats.map(c => c.id));
        }
        setMessages(formattedChats);

        return formattedChats;
      }

      toast.error(data?.message || "Failed to load chats");
      return [];
    } catch (err) {
      toast.error("API error: " + err.message);
      return [];
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, addSystemMessage, fetchChats, listenToMessages, stopListening }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;