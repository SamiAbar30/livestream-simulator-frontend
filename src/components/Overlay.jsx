import { useState, useEffect } from 'react';
import ViewerCount from './ViewerCount';
import CommentStream from './CommentStream';
import DonationPopup from './DonationPopup';
import GiftNotification from './GiftNotification';
import { subscribeToReactions } from '../services/socket';

const Overlay = ({ onEndLive }) => {
    const [reactions, setReactions] = useState([]);
    // Mock stats tracking for the summary screen
    const [diamonds, setDiamonds] = useState(0);
    const [followers, setFollowers] = useState(0);

    useEffect(() => {
        // Simulate accumulating stats
        const interval = setInterval(() => {
            setDiamonds(prev => prev + Math.floor(Math.random() * 5));
            setFollowers(prev => prev + Math.floor(Math.random() * 2));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleReaction = (data) => {
            const newReactions = Array.from({ length: data.count }).map((_, i) => ({
                id: Date.now() + i + Math.random(),
                left: Math.random() * 80 + 10 + '%', // Random horizontal position 10-90%
                animationDuration: Math.random() * 1 + 1 + 's' // Random speed
            }));

            setReactions(prev => [...prev, ...newReactions]);

            // Cleanup old reactions after 2 seconds
            setTimeout(() => {
                setReactions(prev => prev.filter(r => !newReactions.includes(r)));
            }, 2000);
        };

        subscribeToReactions(handleReaction);
    }, []);

    const handleClose = () => {
        // Pass current stats to parent
        onEndLive({
            viewers: 12500, // Mock peak viewers
            diamonds: diamonds,
            followers: followers
        });
    };

    return (
        <div className="overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px',
            boxSizing: 'border-box',
            overflow: 'hidden'
        }}>
            <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10 }}>
                <div className="profile-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>@user123</div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <ViewerCount />
                    <button
                        onClick={handleClose}
                        style={{
                            pointerEvents: 'auto',
                            background: 'rgba(0,0,0,0.5)',
                            border: 'none',
                            color: 'white',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px'
                        }}
                    >
                        ✕
                    </button>
                </div>
            </div>

            <DonationPopup />
            <GiftNotification />

            {/* Reaction Container */}
            <div className="reactions-container" style={{
                position: 'absolute',
                bottom: '0',
                right: '20px',
                width: '100px',
                height: '300px',
                pointerEvents: 'none'
            }}>
                {reactions.map(r => (
                    <div key={r.id} style={{
                        position: 'absolute',
                        bottom: '0',
                        left: r.left,
                        fontSize: '24px',
                        animation: `floatUp ${r.animationDuration} ease-out forwards`,
                        opacity: 0
                    }}>
                        ❤️
                    </div>
                ))}
            </div>

            <div className="bottom-bar" style={{ width: '100%', maxWidth: '400px', zIndex: 10 }}>
                <CommentStream />
            </div>

            <style>{`
                @keyframes floatUp {
                    0% { transform: translateY(0) scale(1); opacity: 1; }
                    100% { transform: translateY(-200px) scale(1.5); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default Overlay;
