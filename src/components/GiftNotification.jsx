import { useState, useEffect } from 'react';
import { subscribeToGifts } from '../services/socket';

const GiftNotification = () => {
    const [gift, setGift] = useState(null);

    useEffect(() => {
        const handleGift = (newGift) => {
            setGift(newGift);
            // Hide after 3 seconds
            setTimeout(() => setGift(null), 3000);
        };

        const unsubscribe = subscribeToGifts(handleGift);
        return () => unsubscribe();
    }, []);

    if (!gift) return null;

    return (
        <div className="gift-notification" style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 215, 0, 0.9)',
            color: 'black',
            padding: '15px 30px',
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 100
        }}>
            <div style={{ fontSize: '40px', marginBottom: '5px' }}>{gift.giftIcon}</div>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{gift.username} sent a {gift.giftName}!</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>+{gift.value} coins</div>

            <style>{`
                @keyframes popIn {
                    0% { transform: translateX(-50%) scale(0); opacity: 0; }
                    100% { transform: translateX(-50%) scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default GiftNotification;
