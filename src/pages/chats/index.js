import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { authFetch } from '@/Helper/helper';
import Pusher from 'pusher-js';

const Chat = () => {
    const { fetchUsersLists, users } = useContext(CreateApiContext);
    const [message, setMessage] = useState("");
    const [completeChats, setCompleteChats] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const chatEndRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sending, setSending] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [loadingConversations, setLoadingConversations] = useState(false);
    const pusherRef = useRef(null);
    const selectedUserRef = useRef(null);
    const lastMsgIdRef = useRef(0);

    // Keep selectedUserRef in sync (used inside the Pusher event handler)
    useEffect(() => { selectedUserRef.current = selectedUser; }, [selectedUser]);

    // The sidebar list:
    //  - Default view: conversations (people you've actually talked to)
    //  - When the user types a search: filtered list of all users (to start a new chat)
    const conversationItems = conversations
        .filter(c => !searchQuery || c.user?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) || c.user?.user_name?.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(c => ({
            id: c.user.id,
            user: c.user,
            last_message: c.last_message,
            unread_count: c.unread_count,
        }));

    const conversationUserIds = new Set(conversations.map(c => String(c.user?.id)));

    const newContactItems = searchQuery
        ? (users || [])
            .filter(u => String(u.id) !== String(userId))
            .filter(u => !conversationUserIds.has(String(u.id)))
            .filter(u => u?.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) || u?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(u => ({ id: u.id, user: u, last_message: null, unread_count: 0 }))
        : [];

    const fetchConversations = useCallback(async () => {
        try {
            setLoadingConversations(true);
            const data = await authFetch('/chats/conversations');
            if (data?.status === 200) setConversations(data.data || []);
        } catch (err) {
            // silent
        } finally {
            setLoadingConversations(false);
        }
    }, []);

    useEffect(() => {
        const uid = localStorage.getItem('user_id');
        const name = localStorage.getItem('user_name') || '';
        const pic = localStorage.getItem('user_picture') || '';
        setUserId(uid);
        setUserName(name);
        setUserPicture(pic);
        fetchConversations();
        // Load full users list lazily (only used when the user types a search)
        if (users?.length === 0) {
            fetchUsersLists();
        }
    }, [fetchUsersLists, users?.length, fetchConversations]);

    useEffect(() => {
        document.body.style.height = "auto";
    }, []);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [completeChats]);

    // Pusher real-time subscription. Listens for any incoming message and either
    //  - appends to the active conversation, or
    //  - refreshes the conversations list to show the new unread count.
    useEffect(() => {
        const uid = localStorage.getItem('user_id');
        if (!uid) return;
        const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
        if (!pusherKey) return; // no real-time, fall back to manual refresh
        try {
            const pusher = new Pusher(pusherKey, {
                cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || 'us2',
            });
            pusherRef.current = pusher;
            const channel = pusher.subscribe(`chat-notify.${uid}`);
            channel.bind('App\\Events\\ChatEvent', (data) => {
                const senderId = String(data.message?.sender_id);
                const current = selectedUserRef.current;
                if (current && String(current.id) === senderId) {
                    setCompleteChats(prev => {
                        // de-dup by id
                        if (prev.some(m => m.id === data.message.id)) return prev;
                        return [...prev, {
                            id: data.message.id,
                            sender_id: data.message.sender_id,
                            received_id: data.message.received_id,
                            message: data.message.text,
                            type: 'incoming',
                            message_type: data.message.type === 'voice' ? 'voice' : 'text',
                            created_at: data.message.created_at,
                        }];
                    });
                    // mark messages from this user as read
                    authFetch('/chats/mark-read', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: senderId }),
                    }).catch(() => {});
                } else {
                    // refresh conversation list so unread count and last_message update
                    fetchConversations();
                }
            });
        } catch (e) {
            // ignore: real-time disabled
        }
        return () => {
            if (pusherRef.current) {
                try { pusherRef.current.disconnect(); } catch (_) {}
                pusherRef.current = null;
            }
        };
    }, [fetchConversations]);

    const handleMessageSend = async (e) => {
        e.preventDefault();
        if (audioBlob) {
            await sendVoiceMessage();
            return;
        }
        if (message.trim() === "" || sending || !selectedUser?.id) return;

        setSending(true);
        const formData = new FormData();
        formData.append('received_id', selectedUser.id);
        formData.append('message', message);
        formData.append('type', 'text');

        const tempId = Date.now();
        const tempMessage = {
            id: tempId,
            sender_id: userId,
            received_id: selectedUser.id,
            message,
            type: 'outgoing',
            message_type: "text",
            created_at: new Date().toISOString()
        };
        setCompleteChats(prev => [...prev, tempMessage]);
        setMessage("");
        try {
            const data = await authFetch('/user-chat', {
                method: 'POST',
                body: formData,
            });
            if (data.status === 200) {
                setCompleteChats(prev => prev.map(msg =>
                    msg.id === tempId ? { ...data.data, type: 'outgoing', message_type: 'text' } : msg
                ));
                lastMsgIdRef.current = Math.max(lastMsgIdRef.current, data.data.id);
                // refresh conversations so last_message updates
                fetchConversations();
            } else {
                toast.error(data.message || 'Something went wrong');
                // remove the optimistic message on failure
                setCompleteChats(prev => prev.filter(m => m.id !== tempId));
            }
        } catch (error) {
            toast.error('Server error. Please try again later.');
            setCompleteChats(prev => prev.filter(m => m.id !== tempId));
        } finally {
            setSending(false);
        }
    };

    const handleUserDetail = async (user_id) => {
        setSelectedUser(null);
        setCompleteChats([]);
        lastMsgIdRef.current = 0;
        try {
            const data = await authFetch(`/user-detail/${user_id}`);
            if (data.status === 200) {
                setSelectedUser(data.data);
                // received_messages = messages I sent TO this user (outgoing)
                const received = Array.isArray(data.data.received_messages)
                    ? data.data.received_messages.map(msg => ({
                        ...msg,
                        type: "outgoing",
                        message_type: (msg?.type === 'text' || msg?.type === 'reservation_request') ? 'text' : 'voice',
                    })) : [];
                // sender_messages = messages this user sent TO me (incoming)
                const sent = Array.isArray(data.data.sender_messages)
                    ? data.data.sender_messages.map(msg => ({
                        ...msg,
                        type: "incoming",
                        message_type: (msg?.type === 'text' || msg?.type === 'reservation_request') ? 'text' : 'voice',
                    })) : [];
                const allMessages = [...received, ...sent].sort((a, b) =>
                    new Date(a.created_at) - new Date(b.created_at)
                );
                if (allMessages.length > 0) {
                    lastMsgIdRef.current = Math.max(...allMessages.map(m => m.id));
                }
                setCompleteChats(allMessages);
                // mark this conversation as read on the server
                authFetch('/chats/mark-read', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id }),
                }).then(() => fetchConversations()).catch(() => {});
            } else {
                toast.error('Failed to fetch user messages');
            }
        } catch (error) {
            // silent
        }
    };

    const sendVoiceMessage = async () => {
        if (!audioBlob || !selectedUser) return;

        const tempId = Date.now();
        setCompleteChats(prev => [...prev, {
            id: tempId,
            type: 'outgoing',
            message_type: 'voice',
            audio: audioUrl,
            created_at: new Date().toISOString()
        }]);

        const formData = new FormData();
        formData.append('received_id', selectedUser.id);
        formData.append('type', 'voice');
        formData.append('voice', audioBlob, `voice_${tempId}.webm`);

        try {
            const data = await authFetch('/user-chat', {
                method: 'POST',
                body: formData,
            });
            if (data?.data) {
                setCompleteChats(prev => prev.map(m => m.id === tempId ? { ...data.data, type: 'outgoing', message_type: 'voice' } : m));
                lastMsgIdRef.current = Math.max(lastMsgIdRef.current, data.data.id);
                fetchConversations();
            } else {
                toast.error('Failed to upload voice message');
                setCompleteChats(prev => prev.filter(m => m.id !== tempId));
            }
        } catch (error) {
            toast.error('Server error. Please try again later.');
            setCompleteChats(prev => prev.filter(m => m.id !== tempId));
        }
        clearRecordedAudio();
    };

    const clearRecordedAudio = () => {
        setAudioBlob(null);
        setAudioUrl(null);
        setAudioChunks([]);
    };

    const handleVoiceClick = async () => {
        if (!isRecording) {
            try {
                clearRecordedAudio();
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                const chunks = [];
                recorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                    setAudioChunks(prev => [...prev, e.data]);
                };

                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    setAudioBlob(blob);
                    setAudioUrl(url);

                    // Release the microphone
                    stream.getTracks().forEach(track => track.stop());
                };

                recorder.start();
                setIsRecording(true);
            } catch (err) {
                console.error('Recording error:', err);
                toast.error('Microphone access denied');
            }
        } else {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const handleCancelRecording = () => {
        if (isRecording && mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
        clearRecordedAudio();
    };

    const getUserAvatar = (user) => {
        if (user?.picture && user.picture.startsWith('http')) return user.picture;
        if (user?.picture) return `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_URL}/${user.picture}`;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.first_name || user?.user_name || 'U')}&background=D80621&color=fff`;
    };

    return (
        <div className="chat-container-section">
            <div className="sidebar">
                <div className="sidebar-header">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={userPicture ? (userPicture.startsWith('http') ? userPicture : `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_URL}/${userPicture}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'U')}&background=D80621&color=fff`} alt="My Profile" className="profile-image" />
                        <h4 className='mx-3'>{userName || 'Me'}</h4>
                    </div>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search a user..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="chat-list">
                    {!searchQuery && conversationItems.length === 0 && !loadingConversations && (
                        <p className="no-results">No conversations yet. Use search to start a new one.</p>
                    )}

                    {conversationItems.length > 0 && (
                        <>
                            {searchQuery && <div style={{ padding: '6px 12px', fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>Conversations</div>}
                            {conversationItems.map(({ id, user, last_message, unread_count }) => (
                                <div
                                    className={`chat-user ${selectedUser?.id === id ? 'active' : ''}`}
                                    key={`conv-${id}`}
                                    onClick={() => handleUserDetail(id)}
                                >
                                    <img src={getUserAvatar(user)} alt={user?.user_name || user?.first_name} />
                                    <div className="text" style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong>{user?.first_name || user?.user_name}</strong>
                                            {unread_count > 0 && (
                                                <span style={{ background: '#D80621', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 10, padding: '2px 7px' }}>{unread_count}</span>
                                            )}
                                        </div>
                                        {last_message && (
                                            <div style={{ fontSize: 12, color: '#777', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {last_message?.type === 'voice' ? '🎤 Voice message' : (last_message?.message || '')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {searchQuery && newContactItems.length > 0 && (
                        <>
                            <div style={{ padding: '6px 12px', fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 8 }}>New chat</div>
                            {newContactItems.map(({ id, user }) => (
                                <div
                                    className={`chat-user ${selectedUser?.id === id ? 'active' : ''}`}
                                    key={`new-${id}`}
                                    onClick={() => handleUserDetail(id)}
                                >
                                    <img src={getUserAvatar(user)} alt={user?.user_name || user?.first_name} />
                                    <div className="text">
                                        <strong>{user?.first_name || user?.user_name}</strong>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {searchQuery && conversationItems.length === 0 && newContactItems.length === 0 && (
                        <p className="no-results">No users found.</p>
                    )}
                </div>
            </div>

            <div className="message-section">
                {selectedUser ? (
                    <>
                        <div className="message-header">
                            <img src={getUserAvatar(selectedUser)} alt={selectedUser?.user_name || selectedUser?.first_name} />
                            <div>
                                <strong>{selectedUser?.first_name || selectedUser?.user_name}</strong><br />
                                <small style={{ color: '#888', textTransform: 'capitalize' }}>{selectedUser?.role || 'user'}</small>
                            </div>
                        </div>

                        <div className="chat-body">
                            {completeChats.length === 0 && (
                                <div style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
                                    No messages yet. Start the conversation!
                                </div>
                            )}
                            {completeChats.map((chat, i) => (
                                <div className={`message ${chat?.type}`} key={chat?.id || i}>
                                    {chat?.message_type !== 'voice' ? (
                                        (chat?.message || chat?.text)
                                    ) : (
                                        <audio controls>
                                            <source
                                                src={chat?.audio || `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_HOST}/${chat?.message}`}
                                                type="audio/webm"
                                            />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                    <small className="message-time">
                                        {new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </small>
                                </div>
                            ))}

                            <div ref={chatEndRef}></div>
                        </div>
                        <div className="message-footer">
                            <div className='message-area'>
                                {audioUrl ? (
                                    <div className="voice-recording-container">
                                        <audio src={audioUrl} controls className="voice-preview" />
                                        <button
                                            className="cancel-recording-btn"
                                            onClick={handleCancelRecording}
                                            title="Cancel recording"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="12" height="12">
                                                <path fill="#d80621" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder={isRecording ? "Recording voice..." : "Write a message..."}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleMessageSend(e)}
                                        disabled={isRecording || sending}
                                        className={isRecording ? "recording" : ""}
                                    />
                                )}
                                <button
                                    className='send-message-btn'
                                    onClick={handleMessageSend}
                                    disabled={sending}
                                >
                                    <svg fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                    </svg>
                                </button>
                            </div>
                            <div
                                className={`voice-icon-btn ${isRecording ? 'recording' : ''}`}
                                onClick={handleVoiceClick}
                                title={isRecording ? "Stop recording" : "Start recording"}
                            >
                                {isRecording ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path fill='#D80621' d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path fill='#D80621' d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="select-user-message">
                        <p style={{ color: '#999', fontSize: '16px' }}>Select a conversation to start chatting</p>
                    </div>
                )}
            </div>

            <div className="profile-sidebar">
                {selectedUser ? (
                    <>
                        <img src={getUserAvatar(selectedUser)} alt={selectedUser?.user_name || selectedUser?.first_name} className="profile-image-large" />
                        <h3>{selectedUser?.first_name || selectedUser?.user_name}</h3>
                        <p className="user-role">{selectedUser?.role ?? "User"}</p>
                        {selectedUser?.email && <p className="user-info">Email: {selectedUser?.email}</p>}
                        {selectedUser?.phone_number && <p className="user-info">Phone: {selectedUser?.phone_number}</p>}
                        <div className="options">
                        </div>
                    </>
                ) : (
                    <p className="select-user-profile">Select a user to view profile</p>
                )}
            </div>
        </div >
    );
};

export default Chat;