import React, { useEffect, useRef, useState } from 'react';

/**
 * Gaussian Splat WebGL viewer.
 *
 * Loads a .splat / .ksplat / .ply file produced by KIRI Engine and renders it
 * with @mkkellogg/gaussian-splats-3d (Three.js based). The library is loaded
 * dynamically so it does not bloat the main bundle - it only ships when a
 * user actually opens a 3D tour.
 *
 * Props:
 *  - splatUrl: full URL to the splat file (must be CORS-readable from the browser)
 *  - onClose:   () => void invoked when user clicks the close button
 *  - title:     optional string shown in the header
 */
const Gaussian3DViewer = ({ splatUrl, onClose, title }) => {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!splatUrl || !containerRef.current) return;

        let isMounted = true;

        // Lazy-load the heavy three.js + splats library only when this
        // component actually mounts, keeping the rest of the app fast.
        (async () => {
            try {
                const [{ default: GaussianSplats3D }, THREE] = await Promise.all([
                    import('@mkkellogg/gaussian-splats-3d').then(m => ({ default: m })),
                    import('three'),
                ]);

                if (!isMounted) return;

                // Decide the right loader based on file extension.
                const lowerUrl = splatUrl.toLowerCase();
                let format;
                if (lowerUrl.endsWith('.ply')) {
                    format = GaussianSplats3D.SceneFormat?.Ply;
                } else if (lowerUrl.endsWith('.ksplat')) {
                    format = GaussianSplats3D.SceneFormat?.KSplat;
                } else {
                    format = GaussianSplats3D.SceneFormat?.Splat;
                }

                const viewer = new GaussianSplats3D.Viewer({
                    rootElement: containerRef.current,
                    cameraUp: [0, -1, 0],
                    initialCameraPosition: [0, 0, 5],
                    initialCameraLookAt: [0, 0, 0],
                    sharedMemoryForWorkers: false,
                    sphericalHarmonicsDegree: 0,
                    selfDrivenMode: false,
                });
                viewerRef.current = viewer;

                await viewer.addSplatScene(splatUrl, {
                    format,
                    showLoadingUI: false,
                    onProgress: (percent) => {
                        if (!isMounted) return;
                        setProgress(Math.min(99, Math.round(percent)));
                    },
                });

                if (!isMounted) return;
                setLoading(false);
                setProgress(100);

                // Manual render loop so we can cleanly stop it on unmount.
                const animate = () => {
                    if (!isMounted || !viewerRef.current) return;
                    try { viewerRef.current.update(); viewerRef.current.render(); } catch (_) {}
                    animationFrameRef.current = requestAnimationFrame(animate);
                };
                animate();
            } catch (err) {
                if (!isMounted) return;
                console.error('Gaussian splat viewer failed:', err);
                setError(err?.message || 'Failed to load the 3D model.');
                setLoading(false);
            }
        })();

        return () => {
            isMounted = false;
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (viewerRef.current) {
                try { viewerRef.current.dispose(); } catch (_) {}
                viewerRef.current = null;
            }
        };
    }, [splatUrl]);

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10001, background: '#000', display: 'flex', flexDirection: 'column' }}>
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
                padding: '16px 24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#07A537', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#fff', letterSpacing: '1px' }}>
                        REAL 3D
                    </div>
                    {title && <h3 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: '600' }}>{title}</h3>}
                </div>
                <button
                    onClick={onClose}
                    style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '28px', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                >
                    ×
                </button>
            </div>

            <div ref={containerRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

            {loading && !error && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, color: '#fff', pointerEvents: 'none' }}>
                    <div style={{ width: 280, maxWidth: '70vw', height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: '#07A537', transition: 'width 0.2s' }} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Loading 3D model… {progress}%</div>
                    <div style={{ fontSize: 12, opacity: 0.7, maxWidth: 320, textAlign: 'center' }}>
                        Models can be 30 to 150 MB. The first load may take a moment depending on your connection.
                    </div>
                </div>
            )}

            {error && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#fff', padding: 24, textAlign: 'center' }}>
                    <h3 style={{ margin: 0 }}>Could not load the 3D model</h3>
                    <p style={{ margin: 0, opacity: 0.8, maxWidth: 480 }}>{error}</p>
                    <button onClick={onClose} style={{ marginTop: 12, background: '#D80621', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 700, cursor: 'pointer' }}>
                        Close
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: '#fff', padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, opacity: 0.9 }}>
                    Drag to orbit · Right-click drag to pan · Scroll to zoom
                </div>
            )}
        </div>
    );
};

export default Gaussian3DViewer;
