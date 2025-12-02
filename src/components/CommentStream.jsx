import { useState, useEffect, useRef } from 'react';

import { subscribeToComments } from '../services/socket';

const CommentStream = () => {
    const [comments, setComments] = useState([]);
    const [pinnedComment, setPinnedComment] = useState(null);
    const [bannedUsers, setBannedUsers] = useState(new Set());
    const bottomRef = useRef(null);

    useEffect(() => {
        const handleNewComment = (comment) => {
            if (bannedUsers.has(comment.username)) return;

            // Add color if not present
            const commentWithColor = {
                ...comment,
                color: comment.color || `hsl(${Math.random() * 360}, 70%, 70%)`
            };
            setComments(prev => [...prev.slice(-20), commentWithColor]);
        };

        const unsubscribe = subscribeToComments(handleNewComment);

        return () => {
            unsubscribe();
        };
    }, [bannedUsers]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [comments]);

    const handleBan = (username) => {
        setBannedUsers(prev => new Set(prev).add(username));
        setComments(prev => prev.filter(c => c.username !== username));
    };

    const handlePin = (comment) => {
        setPinnedComment(comment);
        // Remove from list if pinned to avoid duplicate visual (optional, but keeping it simple)
    };

    const getCommentStyle = (type) => {
        switch (type) {
            case 'QUESTION': return { borderLeft: '3px solid #FFD700', paddingLeft: '5px', backgroundColor: 'rgba(255, 215, 0, 0.1)' };
            case 'HYPE': return { fontWeight: 'bold', textTransform: 'uppercase', color: '#FF4500' };
            case 'TROLL': return { opacity: 0.7, fontSize: '0.9em' };
            default: return {};
        }
    };

    return (
        <div className="comment-stream" style={{
            height: '300px',
            overflowY: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: '10px',
            maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)'
        }}>
            {pinnedComment && (
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: '8px',
                    marginBottom: '10px',
                    borderLeft: '4px solid #00ff00',
                    borderRadius: '4px'
                }}>
                    <div style={{ fontSize: '12px', color: '#aaa', display: 'flex', justifyContent: 'space-between' }}>
                        <span>📌 Pinned</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => setPinnedComment(null)}>✕</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold', color: pinnedComment.color, marginRight: '8px' }}>{pinnedComment.username}</span>
                        <span style={{ color: 'white' }}>{pinnedComment.text}</span>
                    </div>
                </div>
            )}

            {comments.map((comment) => (
                <div key={comment.id} className="comment-item" style={{ marginBottom: '8px', textShadow: '1px 1px 2px black', ...getCommentStyle(comment.type), position: 'relative' }}>
                    <div className="comment-content">
                        <span style={{ fontWeight: 'bold', color: comment.color, marginRight: '8px' }}>{comment.username}</span>
                        <span style={{ color: 'white' }}>{comment.text}</span>
                    </div>

                    {/* Hover Actions (simple implementation) */}
                    <div className="comment-actions" style={{ display: 'none', position: 'absolute', right: 0, top: 0, backgroundColor: '#333', borderRadius: '4px' }}>
                        <button onClick={() => handlePin(comment)} title="Pin">📌</button>
                        <button onClick={() => handleBan(comment.username)} title="Ban">🚫</button>
                    </div>
                    <style>{`
                        .comment-item:hover .comment-actions { display: flex; gap: 5px; }
                        .comment-actions button { background: none; border: none; cursor: pointer; padding: 2px 5px; font-size: 12px; }
                        .comment-actions button:hover { background-color: #555; }
                    `}</style>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default CommentStream;
