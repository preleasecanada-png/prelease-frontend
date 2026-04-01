import React, { createContext, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { authFetch } from '@/Helper/helper';

export const ChatContext = createContext();

const POLL_INTERVAL = 3000;

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const pollRef = useRef(null);
  const lastMsgIdRef = useRef(0);
  const activePeerRef = useRef(null);

  const stopListening = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    activePeerRef.current = null;
  }, []);

  const pollMessages = useCallback(async () => {
    const peerId = activePeerRef.current;
    if (!peerId) return;
    try {
      const data = await authFetch(`/chats?user_id=${peerId}`);
      if (data.status === 200 && Array.isArray(data.data)) {
        const myId = localStorage.getItem('user_id');
        const latestId = data.data.length > 0 ? Math.max(...data.data.map(m => m.id)) : 0;
        if (latestId > lastMsgIdRef.current) {
          lastMsgIdRef.current = latestId;
          const formatted = data.data.map(chat => ({
            id: chat.id,
            text: chat.message,
            sender: String(chat.sender_id) === String(peerId) ? "landlord" : "tenant",
            created_at: chat.created_at,
            system: chat.type === 'reservation_request',
          }));
          setMessages(formatted);
        }
      }
    } catch (_) {
      // silent poll failure
    }
  }, []);

  const listenToMessages = useCallback((userId) => {
    // userId here is MY user id — but we need the peer's id for polling
    // This is called from the popup, the peer id is set via fetchChats
    if (!activePeerRef.current) return;
    stopListening();
    pollRef.current = setInterval(pollMessages, POLL_INTERVAL);
  }, [stopListening, pollMessages]);

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
      } else if (res.data) {
        lastMsgIdRef.current = Math.max(lastMsgIdRef.current, res.data.id);
      }
    } catch (error) {
      toast.error("API error");
    }
  };

  const addSystemMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), text, system: true, created_at: new Date().toISOString() }]);
  };

  const fetchChats = async (user_id) => {
    stopListening();
    activePeerRef.current = user_id;
    lastMsgIdRef.current = 0;
    try {
      const data = await authFetch(`/chats?user_id=${user_id}`);
      if (data.status === 200) {
        const myId = localStorage.getItem('user_id');
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

        // Start polling for new messages
        pollRef.current = setInterval(pollMessages, POLL_INTERVAL);

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