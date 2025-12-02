import { useEffect, useRef, useState } from 'react';

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [status, setStatus] = useState('initializing');
    const [error, setError] = useState(null);
    const [showDebug, setShowDebug] = useState(false);
    const [usePlaceholder, setUsePlaceholder] = useState(false);

    useEffect(() => {
        let mounted = true;
        let currentStream = null;

        const startVideo = async () => {
            if (!mounted) return;

            setStatus('requesting_permission');
            setError(null);

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                if (!mounted) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }

                currentStream = stream;
                setStatus('stream_active');

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                if (mounted) {
                    console.error("Error accessing webcam:", err);
                    setStatus('error');
                    setError(err.message);
                }
            }
        };

        if (!usePlaceholder) {
            startVideo();
        }

        return () => {
            mounted = false;
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };
    }, [usePlaceholder]);

    const handleMetadataLoaded = () => {
        setStatus('playing');
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(e => {
                console.warn("Auto-play failed:", e);
                setError(`Auto-play blocked: ${e.message}`);
            });
        }
    };

    return (
        <div className="video-container" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: 'black',
        }}>
            {usePlaceholder ? (
                <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                    alt="Placeholder"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    onLoadedMetadata={handleMetadataLoaded}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'scaleX(-1)',
                        display: 'block',
                    }}
                />
            )}
        </div>
    );
};

export default VideoPlayer;
