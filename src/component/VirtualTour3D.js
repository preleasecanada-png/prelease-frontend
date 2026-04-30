import React, { useState, useRef, useEffect, useCallback } from 'react';

const VirtualTour3D = ({ videoUrl, propertyTitle, onClose, tourStatus = 'none', model3dUrl = null }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [zoomLevel, setZoom] = useState(1);
    const [activeRoom, setActiveRoom] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const controlsTimeout = useRef(null);

    const rooms = [
        { name: 'Entrance', time: 0, icon: '🚪' },
        { name: 'Living Room', time: 0.15, icon: '🛋️' },
        { name: 'Kitchen', time: 0.3, icon: '🍳' },
        { name: 'Bedroom', time: 0.5, icon: '🛏️' },
        { name: 'Bathroom', time: 0.7, icon: '🚿' },
        { name: 'Balcony', time: 0.85, icon: '🌿' },
    ];

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
    };

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        const deltaX = (e.clientX - startX) * 0.3;
        const deltaY = (e.clientY - startY) * 0.3;
        setRotateY(prev => prev + deltaX);
        setRotateX(prev => Math.max(-30, Math.min(30, prev - deltaY)));
        setStartX(e.clientX);
        setStartY(e.clientY);
    }, [isDragging, startX, startY]);

    const handleMouseUp = () => setIsDragging(false);

    const handleWheel = (e) => {
        e.preventDefault();
        setZoom(prev => Math.max(0.5, Math.min(3, prev - e.deltaY * 0.001)));
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setIsDragging(true);
        setStartX(touch.clientX);
        setStartY(touch.clientY);
    };

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const deltaX = (touch.clientX - startX) * 0.3;
        const deltaY = (touch.clientY - startY) * 0.3;
        setRotateY(prev => prev + deltaX);
        setRotateX(prev => Math.max(-30, Math.min(30, prev - deltaY)));
        setStartX(touch.clientX);
        setStartY(touch.clientY);
    }, [isDragging, startX, startY]);

    const handleTouchEnd = () => setIsDragging(false);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleMouseMove, handleTouchMove]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const onTime = () => setCurrentTime(video.currentTime);
        const onLoaded = () => setDuration(video.duration);
        video.addEventListener('timeupdate', onTime);
        video.addEventListener('loadedmetadata', onLoaded);
        return () => {
            video.removeEventListener('timeupdate', onTime);
            video.removeEventListener('loadedmetadata', onLoaded);
        };
    }, []);

    const showControlsTemporarily = () => {
        setShowControls(true);
        clearTimeout(controlsTimeout.current);
        controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
    };

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const goToRoom = (index) => {
        const video = videoRef.current;
        if (!video || !duration) return;
        setActiveRoom(index);
        video.currentTime = rooms[index].time * duration;
        if (!isPlaying) {
            video.play();
            setIsPlaying(true);
        }
    };

    const toggleFullscreen = () => {
        const el = containerRef.current;
        if (!el) return;
        if (!document.fullscreenElement) {
            el.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    // If we have no walk-through video at all (rare edge case), show a clean placeholder.
    if (!videoUrl) {
        return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, color: '#fff', padding: 24 }}>
                <h3 style={{ margin: 0 }}>No tour video available yet.</h3>
                <button onClick={onClose} style={{ background: '#D80621', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 700, cursor: 'pointer' }}>Close</button>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
            }}
            onMouseMove={showControlsTemporarily}
            onTouchStart={showControlsTemporarily}
        >
            {/* Header */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
                padding: '16px 24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ background: '#D80621', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#fff', letterSpacing: '1px' }}>
                        3D TOUR
                    </div>
                    <h3 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: '600' }}>{propertyTitle}</h3>
                    {tourStatus === 'processing' && (
                        <span style={{ background: 'rgba(255, 193, 7, 0.95)', color: '#1a1a1a', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a', animation: 'pulse 1.4s ease-in-out infinite' }} />
                            Generating real 3D…
                        </span>
                    )}
                    {tourStatus === 'ready' && model3dUrl && (
                        <a
                            href={model3dUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ background: '#07A537', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Download Real 3D Model
                        </a>
                    )}
                    {tourStatus === 'failed' && (
                        <span style={{ background: 'rgba(216, 6, 33, 0.95)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                            3D conversion failed
                        </span>
                    )}
                </div>
                <button
                    onClick={onClose}
                    style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '28px', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                >
                    ×
                </button>
            </div>

            {/* Video with 3D transform */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    perspective: '1200px',
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onWheel={handleWheel}
            >
                <div style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${zoomLevel})`,
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                    transformStyle: 'preserve-3d',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 0 80px rgba(216,6,33,0.15)',
                }}>
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        style={{ width: '100vw', maxHeight: '100vh', objectFit: 'contain', display: 'block' }}
                        playsInline
                        onClick={togglePlay}
                    />
                </div>

                {/* Play overlay */}
                {!isPlaying && (
                    <div
                        onClick={togglePlay}
                        style={{
                            position: 'absolute',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'rgba(216,6,33,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(10px)',
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                            Start Virtual Tour
                        </span>
                    </div>
                )}
            </div>

            {/* Room navigation */}
            <div style={{
                position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                bottom: '100px', zIndex: 10,
                display: 'flex', gap: '8px',
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
                padding: '8px 12px', borderRadius: '16px',
                opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
            }}>
                {rooms.map((room, i) => (
                    <button
                        key={i}
                        onClick={() => goToRoom(i)}
                        style={{
                            background: activeRoom === i ? '#D80621' : 'rgba(255,255,255,0.1)',
                            border: activeRoom === i ? '2px solid #D80621' : '2px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '6px',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <span>{room.icon}</span>
                        {room.name}
                    </button>
                ))}
            </div>

            {/* Bottom controls */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
                padding: '30px 24px 20px',
                opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
            }}>
                {/* Progress bar */}
                <div
                    style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', cursor: 'pointer', marginBottom: '14px' }}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = (e.clientX - rect.left) / rect.width;
                        if (videoRef.current) videoRef.current.currentTime = pct * duration;
                    }}
                >
                    <div style={{ width: `${progress}%`, height: '100%', background: '#D80621', borderRadius: '2px', transition: 'width 0.1s' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                            {isPlaying ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </button>
                        <span style={{ color: '#fff', fontSize: '13px', fontFamily: 'monospace' }}>
                            {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} / {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Drag to look around • Scroll to zoom</span>
                        <button onClick={() => { setRotateX(0); setRotateY(0); setZoom(1); }} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                            Reset View
                        </button>
                        <button onClick={toggleFullscreen} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Zoom indicator */}
            {zoomLevel !== 1 && (
                <div style={{
                    position: 'absolute', top: '50%', right: '24px', transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                    padding: '12px 8px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                    <button onClick={() => setZoom(prev => Math.min(3, prev + 0.2))} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px' }}>+</button>
                    <span style={{ color: '#fff', fontSize: '11px', fontWeight: '600' }}>{Math.round(zoomLevel * 100)}%</span>
                    <button onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px' }}>−</button>
                </div>
            )}
        </div>
    );
};

export default VirtualTour3D;
