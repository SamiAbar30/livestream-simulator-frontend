import React from 'react';
import VideoPlayer from './VideoPlayer';

const VideoGridManager = ({ isGridLayout }) => {
    return (
        <div className="video-grid-manager" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            backgroundColor: '#000',
            boxSizing: 'border-box',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: isGridLayout ? 'center' : 'stretch'
        }}>
            {isGridLayout ? (
                // 2x2 Grid Layout
                <>
                    <div style={{ width: '50%', height: '50%', border: '1px solid #111', position: 'relative' }}>
                        <VideoPlayer />
                        <span style={{ position: 'absolute', bottom: 10, left: 10, color: 'white', fontSize: '12px', fontWeight: 'bold', textShadow: '0 1px 2px black' }}>Host</span>
                    </div>
                    <div style={{ width: '50%', height: '50%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <span style={{ color: '#555' }}>Guest 1</span>
                        <span style={{ position: 'absolute', bottom: 10, left: 10, color: 'white', fontSize: '12px', fontWeight: 'bold', textShadow: '0 1px 2px black' }}>@GuestOne</span>
                    </div>
                    <div style={{ width: '50%', height: '50%', backgroundColor: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <span style={{ color: '#555' }}>Guest 2</span>
                        <span style={{ position: 'absolute', bottom: 10, left: 10, color: 'white', fontSize: '12px', fontWeight: 'bold', textShadow: '0 1px 2px black' }}>@GuestTwo</span>
                    </div>
                    <div style={{ width: '50%', height: '50%', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <span style={{ color: '#555' }}>Guest 3</span>
                        <span style={{ position: 'absolute', bottom: 10, left: 10, color: 'white', fontSize: '12px', fontWeight: 'bold', textShadow: '0 1px 2px black' }}>@GuestThree</span>
                    </div>
                </>
            ) : (
                // Full Screen Panel Layout
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <VideoPlayer />

                    {/* Small floating guest preview (optional) */}
                    <div style={{
                        position: 'absolute',
                        top: '120px',
                        right: '15px',
                        width: '80px',
                        height: '120px',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>Guest</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoGridManager;
