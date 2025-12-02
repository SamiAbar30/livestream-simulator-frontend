import { useState, useEffect } from 'react';

const DonationPopup = () => {
    const [donation, setDonation] = useState(null);

    useEffect(() => {
        const triggerDonation = () => {
            const amounts = [1, 5, 10, 20, 50, 100];
            const users = ["fan_123", "rich_guy", "supporter_x", "anonymous", "stream_lover"];
            const currencies = ["$", "€", "£"];

            const amount = amounts[Math.floor(Math.random() * amounts.length)];
            const user = users[Math.floor(Math.random() * users.length)];
            const currency = currencies[Math.floor(Math.random() * currencies.length)];

            setDonation({ user, amount, currency });

            // Hide after 3 seconds
            setTimeout(() => {
                setDonation(null);
            }, 3000);
        };

        const interval = setInterval(() => {
            if (Math.random() > 0.8) { // 20% chance every 5 seconds
                triggerDonation();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (!donation) return null;

    return (
        <div className="donation-popup" style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 255, 0, 0.8)',
            color: 'black',
            padding: '15px 25px',
            borderRadius: '10px',
            textAlign: 'center',
            animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            zIndex: 100
        }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{donation.user}</div>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>donated {donation.currency}{donation.amount}</div>
            <div style={{ fontSize: '30px' }}>🎉</div>
            <style>{`
        @keyframes popIn {
          from { transform: translateX(-50%) scale(0); opacity: 0; }
          to { transform: translateX(-50%) scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default DonationPopup;
