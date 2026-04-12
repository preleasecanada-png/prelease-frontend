import React, { useState, useEffect, useRef } from 'react';

const stepTips = {
    1: {
        title: "Welcome!",
        tips: [
            "You're about to list your property on Prelease Canada.",
            "The process takes about 10-15 minutes to complete.",
            "Make sure you have photos, a description, and pricing ready.",
        ],
        advice: "Properties with complete profiles get 40% more inquiries. Take your time to fill in all details accurately."
    },
    2: {
        title: "About Your Place",
        tips: [
            "Choose the category that best matches your property.",
            "This helps tenants find your listing more easily.",
            "If unsure, pick the closest match — you can update later.",
        ],
        advice: "Apartments and condos are the most searched property types in Canada. Be specific to attract the right tenants."
    },
    3: {
        title: "Property Type",
        tips: [
            "Select the type that best describes your space.",
            "This affects how your listing appears in search results.",
            "Be honest — misrepresentation can lead to negative reviews.",
        ],
        advice: "Tenants filter by property type, so choosing accurately means more qualified leads."
    },
    4: {
        title: "Location",
        tips: [
            "Allow location access for automatic detection.",
            "A precise location helps tenants assess commute times.",
            "Your exact address is only shared after a reservation.",
        ],
        advice: "Properties near transit, schools, and amenities get more views. Mention nearby landmarks in your description later."
    },
    5: {
        title: "Address Details",
        tips: [
            "Select your city from the dropdown.",
            "Fill in the complete address for accurate mapping.",
            "The postal code helps with local search results.",
            "Street and apartment number are important for delivery services.",
        ],
        advice: "A complete address builds trust. Tenants are more likely to apply when they can verify the exact location."
    },
    6: {
        title: "Capacity & Layout",
        tips: [
            "Set realistic guest and room numbers.",
            "More bedrooms = higher rental price potential.",
            "Consider enabling pets — pet-friendly listings get 25% more interest.",
        ],
        advice: "In Canadian cities, 1-2 bedroom units are most in demand. If you have a family-sized home, highlight that in your description."
    },
    7: {
        title: "Bathroom Details",
        tips: [
            "Private bathrooms are a major selling point.",
            "Specify the type accurately for guest expectations.",
            "Shared bathrooms should be noted clearly.",
        ],
        advice: "A private attached bathroom can increase your rental value by 15-20%. Highlight this as a premium feature."
    },
    8: {
        title: "Who Else Is There",
        tips: [
            "Be transparent about other occupants.",
            "\"No one\" is preferred by most tenants seeking privacy.",
            "If you live on-site, mention you're available to help.",
        ],
        advice: "Transparency about shared spaces reduces conflicts and leads to better reviews. Tenants appreciate honesty."
    },
    9: {
        title: "Stand Out Features",
        tips: [
            "Think about what makes your place unique.",
            "Proximity to transit, parks, and shops matters.",
            "Mention any recent renovations or upgrades.",
        ],
        advice: "The top 3 features tenants look for in Canada: proximity to transit, in-unit laundry, and natural light."
    },
    10: {
        title: "Amenities",
        tips: [
            "Select ALL amenities that apply — don't skip any.",
            "Wi-Fi, heating, and laundry are must-haves in Canada.",
            "Unique amenities (gym, pool, rooftop) make your listing stand out.",
            "Safety features like smoke alarms boost trust.",
        ],
        advice: "Listings with 10+ amenities selected get 60% more views. Don't forget basics like Wi-Fi, heating, and kitchen."
    },
    11: {
        title: "Photos & Virtual Tour",
        tips: [
            "Upload at least 5 high-quality photos.",
            "Include photos of every room, the exterior, and the view.",
            "Natural lighting makes photos look much better.",
            "A video walkthrough enables the 3D virtual tour feature!",
        ],
        advice: "Listings with 10+ photos get 2x more inquiries. The first photo (cover) is the most important — choose a bright, wide-angle shot of the best room."
    },
    12: {
        title: "Title & Description",
        tips: [
            "Keep the title short and descriptive (50-60 characters).",
            "Mention the neighbourhood, key feature, and size.",
            "In the description, cover layout, nearby amenities, and rules.",
            "Use paragraphs — avoid walls of text.",
        ],
        advice: "Great title formula: \"[Adjective] [Size] [Type] – [Neighbourhood], [City]\". Example: \"Bright 2BR Condo – King West, Toronto\""
    },
    13: {
        title: "Publishing",
        tips: [
            "Review all details before publishing.",
            "You can edit everything after publishing.",
            "Your listing will be visible to all users immediately.",
        ],
        advice: "First impressions matter. Take a moment to review your listing from a tenant's perspective before publishing."
    },
    14: {
        title: "Reservation Settings",
        tips: [
            "\"Approve\" gives you control over who rents.",
            "\"Instant\" attracts more tenants but less screening time.",
            "For your first listing, \"Approve\" is recommended.",
        ],
        advice: "Most successful landlords in Canada use the \"Approve\" setting initially, then switch to \"Instant\" after gaining experience."
    },
    15: {
        title: "Pricing",
        tips: [
            "Research similar listings in your area.",
            "Include utilities in the price if possible — tenants prefer all-inclusive.",
            "Price competitively for your first listing to get reviews.",
            "You can adjust pricing anytime.",
        ],
        advice: "Average rents in major Canadian cities: Toronto $2,200/mo, Vancouver $2,500/mo, Montreal $1,600/mo, Ottawa $1,800/mo. Price within 10% of market rate."
    },
    16: {
        title: "Discounts",
        tips: [
            "Longer lease = bigger discount = stable income.",
            "1-month discount attracts short-term tenants.",
            "6-month discount secures long-term reliable tenants.",
            "Discounts are optional but highly recommended.",
        ],
        advice: "Offering a 6-month discount of 25-30% is standard in Canada. It guarantees stable income and reduces vacancy time."
    },
    17: {
        title: "Final Review",
        tips: [
            "Double-check all information before submitting.",
            "Ensure photos are clear and well-lit.",
            "Verify your pricing and discount structure.",
            "You're almost done!",
        ],
        advice: "Congratulations! After submitting, your listing will be live. Respond quickly to inquiries — fast response rates significantly boost your ranking."
    },
};

const PropertyAIGuide = ({ currentStep }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [displayedAdvice, setDisplayedAdvice] = useState('');
    const messagesEndRef = useRef(null);

    const stepData = stepTips[currentStep] || stepTips[1];

    useEffect(() => {
        setCurrentTipIndex(0);
        setDisplayedAdvice('');
        setIsTyping(true);

        let i = 0;
        const text = stepData.advice;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedAdvice(text.slice(0, i + 1));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, 20);

        return () => clearInterval(interval);
    }, [currentStep]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [displayedAdvice]);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D80621, #ff4d6d)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(216,6,33,0.4)',
                    animation: 'pulse-guide 2s infinite',
                }}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-4 7.5V18h-6v-1.5C7.5 15 5 12.5 5 9a7 7 0 0 1 7-7z"/>
                    <path d="M9 18h6"/><path d="M10 22h4"/>
                </svg>
            </button>
        );
    }

    if (isMinimized) {
        return (
            <div
                style={{
                    position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
                    background: '#fff', borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    padding: '12px 16px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    cursor: 'pointer', maxWidth: '280px',
                    border: '1px solid #f0f0f0',
                }}
                onClick={() => setIsMinimized(false)}
            >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #D80621, #ff4d6d)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-4 7.5V18h-6v-1.5C7.5 15 5 12.5 5 9a7 7 0 0 1 7-7z"/></svg>
                </div>
                <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#333' }}>AI Guide — Step {currentStep}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#999' }}>Click to expand</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
            width: '360px', maxHeight: '520px',
            background: '#fff', borderRadius: '20px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #f0f0f0',
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #D80621, #ff4d6d)',
                padding: '16px 18px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-4 7.5V18h-6v-1.5C7.5 15 5 12.5 5 9a7 7 0 0 1 7-7z"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                    </div>
                    <div>
                        <h4 style={{ margin: 0, color: '#fff', fontSize: '14px', fontWeight: '700' }}>AI Property Guide</h4>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>Step {currentStep} — {stepData.title}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => setIsMinimized(true)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>—</button>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Tips */}
                <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '14px' }}>
                    <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: '700', color: '#D80621', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tips for this step</p>
                    {stepData.tips.map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                            <span style={{ color: '#D80621', fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>●</span>
                            <p style={{ margin: 0, fontSize: '13px', color: '#444', lineHeight: '1.5' }}>{tip}</p>
                        </div>
                    ))}
                </div>

                {/* AI Advice */}
                <div style={{ background: '#fff5f7', borderRadius: '12px', padding: '14px', borderLeft: '3px solid #D80621' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#D80621"><path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-4 7.5V18h-6v-1.5C7.5 15 5 12.5 5 9a7 7 0 0 1 7-7z"/></svg>
                        <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#D80621' }}>AI Advice</p>
                        {isTyping && <span style={{ fontSize: '10px', color: '#999', marginLeft: 'auto' }}>typing...</span>}
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#333', lineHeight: '1.6' }}>
                        {displayedAdvice}
                        {isTyping && <span style={{ borderRight: '2px solid #D80621', marginLeft: '2px', animation: 'blink 1s infinite' }}>&nbsp;</span>}
                    </p>
                </div>

                {/* Progress */}
                <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>Progress</span>
                        <span style={{ fontSize: '11px', color: '#D80621', fontWeight: '700' }}>{Math.round((currentStep / 17) * 100)}%</span>
                    </div>
                    <div style={{ height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${(currentStep / 17) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #D80621, #ff4d6d)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#999' }}>Step {currentStep} of 17</p>
                </div>

                <div ref={messagesEndRef} />
            </div>

            <style jsx>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                @keyframes pulse-guide {
                    0% { box-shadow: 0 4px 20px rgba(216,6,33,0.4); }
                    50% { box-shadow: 0 4px 30px rgba(216,6,33,0.6); }
                    100% { box-shadow: 0 4px 20px rgba(216,6,33,0.4); }
                }
            `}</style>
        </div>
    );
};

export default PropertyAIGuide;
