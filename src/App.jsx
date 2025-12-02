import { useState } from 'react';
import HeaderOverlay from './components/HeaderOverlay';
import VideoGridManager from './components/VideoGridManager';
import FooterControls from './components/FooterControls';
import SettingsPanel from './components/SettingsPanel';
import LiveEndedScreen from './components/LiveEndedScreen';
import { subscribeToReactions } from './services/socket';
import { useEffect } from 'react';
import './App.css';

function App() {
    const [showSettings, setShowSettings] = useState(false);
    const [isLive, setIsLive] = useState(true);
    const [isGridLayout, setIsGridLayout] = useState(false);
    const [stats, setStats] = useState({ viewers: 0, diamonds: 0, followers: 0 });
    const [reactions, setReactions] = useState([]);

    // Handle reactions globally to float them over everything
    useEffect(() => {
        const handleReaction = (data) => {
            const newReactions = Array.from({ length: data.count }).map((_, i) => ({
                id: Date.now() + i + Math.random(),
                left: Math.random() * 80 + 10 + '%',
                animationDuration: Math.random() * 1 + 1 + 's'
            }));
            setReactions(prev => [...prev, ...newReactions]);
            setTimeout(() => {
                setReactions(prev => prev.filter(r => !newReactions.includes(r)));
            }, 2000);
        };
        const unsubscribe = subscribeToReactions(handleReaction);
        return () => unsubscribe();
    }, []);

    const handleEndLive = () => {
        // Mock stats for now
        setStats({
            viewers: 12500,
            diamonds: Math.floor(Math.random() * 5000),
            followers: Math.floor(Math.random() * 200)
        });
        setIsLive(false);
    };

    const handleRestart = () => {
        setIsLive(true);
        window.location.reload();
    };

    return (
        <div className="app-container" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
            {isLive ? (
                <>
                    {/* Layer 1: Video Content */}
                    <VideoGridManager isGridLayout={isGridLayout} />

                    {/* Layer 2: Header Overlay */}
                    <HeaderOverlay onEndLive={handleEndLive} />

                    {/* Layer 3: Footer Controls */}
                    <FooterControls
                        onToggleLayout={() => setIsGridLayout(!isGridLayout)}
                        onOpenSettings={() => setShowSettings(true)}
                        onToggleShare={() => console.log("Share clicked")}
                        onToggleBeauty={() => console.log("Beauty clicked")}
                        onTogglePK={() => console.log("PK clicked")}
                    />

                    {/* Layer 4: Floating Reactions */}
                    <div className="reactions-container" style={{
                        position: 'absolute',
                        bottom: '100px',
                        right: '10px',
                        width: '80px',
                        height: '300px',
                        pointerEvents: 'none',
                        zIndex: 50
                    }}>
                        {reactions.map(r => (
                            <div key={r.id} style={{
                                position: 'absolute',
                                bottom: '0',
                                left: r.left,
                                fontSize: '28px',
                                animation: `floatUp ${r.animationDuration} ease-out forwards`,
                                opacity: 0,
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}>
                                ❤️
                            </div>
                        ))}
                    </div>

                    {/* Layer 5: Modals */}
                    {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
                </>
            ) : (
                <LiveEndedScreen onRestart={handleRestart} stats={stats} />
            )}

            <style>{`
                @keyframes floatUp {
                    0% { transform: translateY(0) scale(1); opacity: 1; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-300px) scale(1.5) rotate(10deg); opacity: 0; }
                }
            `}</style>
        </div >
    );
}

export default App;
