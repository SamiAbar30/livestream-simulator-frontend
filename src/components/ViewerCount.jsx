import { useState, useEffect } from 'react';
import { subscribeToViewers } from '../services/socket';

const ViewerCount = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const handleViewerUpdate = (newCount) => {
            setCount(newCount);
        };

        const unsubscribe = subscribeToViewers(handleViewerUpdate);
        return () => unsubscribe();
    }, []);

    return (
        <div className="viewer-count" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '14px',
            fontWeight: 'bold'
        }}>
            <span style={{ color: 'red' }}>●</span> LIVE {count.toLocaleString()}
        </div>
    );
};

export default ViewerCount;
