import React from 'react';
import ViewerCount from './ViewerCount';

const HeaderOverlay = ({ onEndLive }) => {
    return (
        <div className="header-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            padding: '10px 15px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 200,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)'
        }}>
            {/* Left Section: Host Profile & Context */}
            <div className="header-left" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Host Profile Pill */}
                <div className="host-profile" style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '20px',
                    padding: '3px 3px 3px 3px',
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#E91E63',
                        marginRight: '8px',
                        border: '1px solid white'
                    }}>
                        <img
                            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Host"
                            alt="Host"
                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                        <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>@SimStreamer</span>
                        <span style={{ color: '#ddd', fontSize: '10px' }}>12.5k Likes</span>
                    </div>
                    <button style={{
                        backgroundColor: '#FE2C55',
                        color: 'white',
                        border: 'none',
                        borderRadius: '15px',
                        padding: '4px 12px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        Follow
                    </button>
                </div>

                {/* Live Context Tags */}
                <div className="live-context" style={{ display: 'flex', gap: '5px' }}>
                    <div style={{
                        backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        color: '#FFD700',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        border: '1px solid rgba(255, 215, 0, 0.5)'
                    }}>
                        🏆 Top 2
                    </div>
                    <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        color: '#eee',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '10px'
                    }}>
                        Chatting
                    </div>
                </div>
            </div>

            {/* Right Section: Audience & Close */}
            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Viewer Strip */}
                <div className="viewer-strip" style={{ display: 'flex', alignItems: 'center', gap: '-5px' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: '1px solid white',
                            backgroundColor: '#333',
                            marginLeft: '-8px',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i}`}
                                alt="Viewer"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    ))}
                    <div style={{ marginLeft: '5px' }}>
                        <ViewerCount />
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onEndLive}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        border: 'none',
                        color: 'white',
                        fontSize: '18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default HeaderOverlay;
