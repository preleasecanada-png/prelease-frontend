import React, { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../../ContextApi/ChatContext";
import toast from "react-hot-toast";

const ChatPopup = ({ setShowChatModal, placeDetail }) => {
  const [view, setView] = useState("chat");
  const [isClosing, setIsClosing] = useState(false);
  const [message, setMessage] = useState("");
  const { messages, sendMessage, fetchChats, stopListening } = useContext(ChatContext);
  const chatEndRef = useRef(null);

  const myName = typeof window !== 'undefined' ? localStorage.getItem('user_name') || '' : '';
  const myPicture = typeof window !== 'undefined' ? localStorage.getItem('user_picture') || '' : '';

  const getAvatarUrl = (picture, name) => {
    if (picture && picture.startsWith('http')) return picture;
    if (picture) return `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_URL}/${picture}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=D80621&color=fff`;
  };

  const landlordPic = getAvatarUrl(placeDetail?.user?.picture, placeDetail?.user?.first_name || placeDetail?.user?.user_name);
  const myAvatarUrl = getAvatarUrl(myPicture, myName);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowChatModal(false);
    }, 400);
  };

  const sendChatMessage = () => {
    if (!message) {
      toast.error("Please enter a message before sending.");
      return;
    }
    sendMessage(message, placeDetail?.user_id);
    setMessage("");
  };

  useEffect(() => {
    if (placeDetail?.user_id) {
      fetchChats(placeDetail.user_id);
    }
    return () => {
      stopListening();
    };
  }, [placeDetail?.user_id]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <div className={`chat_popup ${isClosing ? 'closing' : ''}`}>

        {/* ───── HEADER ───── */}
        <div className={`chat_header ${view === "confirmed" ? "chat_header_green" : ""}`}>
          <div className="d-flex align-items-center gap-2">
            {(view === "payment" || view === "confirmed") && (
              <button
                className="chat_back_btn"
                onClick={() => setView("chat")}
                title="Back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
              </button>
            )}
            <span>Chat with Landlord</span>
          </div>
          <button className="chat_close_btn" onClick={handleClose}>
            <div></div>
          </button>
        </div>

        {/* ───── CHAT VIEW ───── */}
        {view === "chat" && (
          <>
            <div className="chat_landload_detail">
              <div className="d-flex landload-img-status">
                <div className="landlord_image">
                  <img src={landlordPic} alt="Landlord" />
                  <img src="/images/chat/check.webp" alt="Verified" />
                </div>
                <div className="landlord_info">
                  <p className="landlord_name">{placeDetail?.user?.first_name || placeDetail?.user?.user_name} <span>host</span></p>
                </div>
              </div>
              <div className="landload_price">
                <span>{placeDetail?.title}</span>
                <span>{placeDetail?.how_many_bedrooms ? `${placeDetail.how_many_bedrooms} Bedrooms` : ''}{placeDetail?.how_many_bathroom ? ` · ${placeDetail.how_many_bathroom} Bathrooms` : ''}</span>
                <span>${placeDetail?.set_your_price} /month</span>
              </div>
            </div>

            {/* Current user info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 15px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <img src={myAvatarUrl} alt="Me" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{myName || 'Me'}</p>
                <span style={{ fontSize: 12, color: '#07A537' }}>You</span>
              </div>
            </div>

            <div className="chat_messages">
              {messages.length === 0 && ""}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.system ? 'message_yellow' : msg.sender === 'tenant' ? 'message_right' : 'message_left'}`}
                >
                  {!msg.system && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <img
                        src={msg.sender === 'tenant' ? myAvatarUrl : landlordPic}
                        alt=""
                        style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>
                        {msg.sender === 'tenant' ? (myName || 'Me') : (placeDetail?.user?.first_name || placeDetail?.user?.user_name || 'Host')}
                      </span>
                    </div>
                  )}
                  <p>{msg.text || msg.message}</p>
                  <span className="message_time">
                    {new Date(msg.created_at || msg.time || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {/* <div className="payment_link">
                <button type="button" onClick={() => setView("payment")}>
                  Riya: Create Payment Order
                  <img src="/images/chat/Arrow.webp" alt="Arrow" />
                </button>
              </div> */}

              <div ref={chatEndRef}></div>
            </div>

            <div className="chat_input_wrapper">
              <input
                type="text"
                placeholder="Message to landlord..."
                className="chat_input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="chat_send_btn" onClick={sendChatMessage}>
                <img src="/images/chat/chat-button.webp" alt="Send" />
              </button>
            </div>
          </>
        )}

        {/* ───── PAYMENT ORDER VIEW ───── */}
        {view === "payment" && (
          <div className="payment_order_view">

            <div className="payment_property_info">
              <div>
                <p className="payment_property_name">Payment Order</p>
                <p className="payment_property_sub">Sanesun - Toronto</p>
              </div>
              <div className="payment_property_meta">
                <span>2 Bedrooms . 2 Beds</span>
                <span className="meta_price">$39 for 1 night</span>
              </div>
            </div>

            <p className="payment_review_text">
              Review the payment breakdown from your landlord.
            </p>

            <div className="payment_breakdown">
              <div className="payment_row">
                <span className="payment_label strikethrough">$39 x 10 days</span>
                <span className="payment_amount">$390.00</span>
              </div>
              <div className="payment_row">
                <span className="payment_label">Security Deposit</span>
                <span className="payment_amount">$39.00</span>
              </div>
              
              <div className="payment_divider" />

              <div className="payment_row payment_total_row">
                <span className="payment_total_label">Total Payable Amount</span>
                <span className="payment_total_amount">$429.00</span>
              </div>

            </div>


            <div className="payment_created_by">
              <span>This order was created by Riya James (Host)</span>
            </div>

            <button className="payment_pay_btn" type="button" onClick={() => setView("confirmed")}>
              Pay Now – $429.00 CAD
            </button>

          </div>
        )}

        {/* ───── BOOKING CONFIRMED VIEW ───── */}
        {view === "confirmed" && (
          <div className="booking_confirmed_view">

            <div className="booking_check_wrapper">
              <div className="booking_check_circle">
                <img src="/images/chat/check.svg" alt="" />
              </div>
            </div>

            <h2 className="booking_confirmed_title">Booking Confirmed!</h2>
            <p className="booking_confirmed_sub">
              Your lease for <span>Samesun Toronto</span> is now active.
            </p>

            <div className="booking_details_card">
              <div className="booking_detail_row">
                <span className="booking_detail_label">Amount</span>
                <span className="booking_detail_value">$390.00 CAD</span>
              </div>
              <div className="booking_detail_row">
                <span className="booking_detail_label">Period</span>
                <span className="booking_detail_value">Mar 09 – Mar 19, 2026</span>
              </div>
              <div className="booking_detail_row">
                <span className="booking_detail_label">Status</span>
                <span className="booking_status_badge">Active</span>
              </div>
            </div>

            <button className="booking_btn_primary" type="button">
              View My Leased Properties
            </button>
            <button className="booking_btn_secondary" type="button" onClick={() => setView("chat")}>
              Message Landlord
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default ChatPopup;