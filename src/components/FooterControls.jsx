import React from 'react';
import CommentStream from './CommentStream';
import GiftNotification from './GiftNotification';
import DonationPopup from './DonationPopup';

const FooterControls = ({ onToggleLayout, onOpenSettings, onToggleShare, onToggleBeauty, onTogglePK }) => {
    return (
        <div className="footer-controls" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '10px 15px 20px 15px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 200,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            pointerEvents: 'none' // Allow clicks to pass through to video where not interactive
        }}>
            {/* Popups Layer */}
            <div style={{ position: 'absolute', bottom: '250px', left: 0, width: '100%', pointerEvents: 'none' }}>
                <GiftNotification />
                <DonationPopup />
            </div>

            {/* Chat Area */}
            <div className="chat-area" style={{
                width: '70%',
                maxWidth: '300px',
                marginBottom: '15px',
                pointerEvents: 'auto'
            }}>
                <CommentStream />
            </div>

            {/* Bottom Interaction Bar */}
            <div className="interaction-bar" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pointerEvents: 'auto'
            }}>
                {/* Left: Comment Input Placeholder */}
                <div style={{
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    borderRadius: '20px',
                    padding: '8px 15px',
                    color: '#aaa',
                    fontSize: '14px',
                    flexGrow: 1,
                    marginRight: '15px',
                    cursor: 'text'
                }}>
                    Say something...
                </div>

                {/* Right: Icons */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {/* Multi-Guest / Link Icon */}
                    <button onClick={onToggleLayout} title="Multi-guest" style={iconButtonStyle}>
                        🔗
                    </button>

                    {/* Share / Arrow Icon */}
                    <button onClick={onToggleShare} title="Share" style={iconButtonStyle}>
                        ↗️
                    </button>

                    {/* Beauty / Wand Icon */}
                    <button onClick={onToggleBeauty} title="Enhance" style={iconButtonStyle}>
                        ✨
                    </button>

                    {/* PK / Power Icon */}
                    <button onClick={onTogglePK} title="PK Battle" style={{ ...iconButtonStyle, border: '2px solid #FE2C55', color: '#FE2C55' }}>
                        ⚔️
                    </button>

                    {/* Settings / Meatball Menu */}
                    <button onClick={onOpenSettings} title="Settings" style={iconButtonStyle}>
                        •••
                    </button>

                    {/* Gift Icon (Standard in these apps) */}
                    <button style={{ ...iconButtonStyle, background: 'linear-gradient(45deg, #FFD700, #FFA500)', border: 'none', color: 'white' }}>
                        🎁
                    </button>
                </div>
            </div>
        </div>
    );
};

const iconButtonStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.1s'
};

export default FooterControls;
