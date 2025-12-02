import { useState } from 'react';
import { updateSettings } from '../services/socket';

const SettingsPanel = ({ onClose }) => {
    const [toxicity, setToxicity] = useState(0.1);
    const [speed, setSpeed] = useState(1.0);
    const [viewers, setViewers] = useState(1200);

    const handleApply = () => {
        updateSettings({
            toxicity: parseFloat(toxicity),
            chatSpeed: parseFloat(speed),
            viewerTarget: parseInt(viewers)
        });
        onClose();
    };

    return (
        <div className="settings-panel" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '30px',
            borderRadius: '20px',
            width: '300px',
            zIndex: 1000,
            boxShadow: '0 0 30px rgba(0,0,0,0.8)'
        }}>
            <h2 style={{ marginTop: 0 }}>Simulation Settings</h2>

            <div style={{ marginBottom: '20px' }}>
                <label>Toxicity: {(toxicity * 100).toFixed(0)}%</label>
                <input
                    type="range"
                    min="0" max="1" step="0.1"
                    value={toxicity}
                    onChange={(e) => setToxicity(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label>Chat Speed: {speed}x</label>
                <input
                    type="range"
                    min="0.1" max="5" step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label>Target Viewers: {viewers}</label>
                <input
                    type="range"
                    min="0" max="10000" step="100"
                    value={viewers}
                    onChange={(e) => setViewers(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button onClick={handleApply} style={{ padding: '8px 16px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Apply</button>
            </div>
        </div>
    );
};

export default SettingsPanel;
