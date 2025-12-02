import { useState, useEffect } from 'react';

const LiveEndedScreen = ({ onRestart, stats }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Fade in effect
        setTimeout(() => setVisible(true), 100);
    }, []);

    return (
        <div className="live-ended-screen" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease',
            color: 'white',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div className="summary-card" style={{
                backgroundColor: '#1a1a1a',
                padding: '40px',
                borderRadius: '30px',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid #333',
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'transform 0.5s ease'
            }}>
                <h1 style={{
                    fontSize: '32px',
                    marginBottom: '10px',
                    fontWeight: '800',
                    background: 'linear-gradient(45deg, #fff, #999)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>Live Ended</h1>

                <p style={{ color: '#888', marginBottom: '40px' }}>Duration: 01:24:30</p>

                <div className="stats-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    <div className="stat-item">
                        <div style={{ fontSize: '24px', marginBottom: '5px' }}>👁️</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.viewers.toLocaleString()}</div>
                        <div style={{ fontSize: '12px', color: '#888' }}>Viewers</div>
                    </div>
                    <div className="stat-item">
                        <div style={{ fontSize: '24px', marginBottom: '5px' }}>💎</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.diamonds.toLocaleString()}</div>
                        <div style={{ fontSize: '12px', color: '#888' }}>Diamonds</div>
                    </div>
                    <div className="stat-item">
                        <div style={{ fontSize: '24px', marginBottom: '5px' }}>👤</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.followers.toLocaleString()}</div>
                        <div style={{ fontSize: '12px', color: '#888' }}>New Followers</div>
                    </div>
                </div>

                <button
                    onClick={onRestart}
                    style={{
                        backgroundColor: '#E91E63',
                        color: 'white',
                        border: 'none',
                        padding: '15px 40px',
                        borderRadius: '50px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'transform 0.2s',
                        boxShadow: '0 5px 15px rgba(233, 30, 99, 0.4)'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    Restart Stream
                </button>
            </div>
        </div>
    );
};

export default LiveEndedScreen;
