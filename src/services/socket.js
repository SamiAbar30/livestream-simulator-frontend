import { io } from "socket.io-client";

// Connect to the backend server
const socket = io(import.meta.env.VITE_API_URL || "http://localhost:3000");

export const subscribeToViewers = (callback) => {
    socket.on('viewersUpdate', (data) => {
        callback(data.count);
    });
    return () => socket.off('viewersUpdate');
};

export const subscribeToComments = (callback) => {
    socket.on('newComment', (comment) => {
        callback(comment);
    });
    return () => socket.off('newComment');
};

export const subscribeToReactions = (callback) => {
    socket.on('reaction', (data) => {
        callback(data);
    });
    return () => socket.off('reaction');
};

export const subscribeToGifts = (callback) => {
    socket.on('gift', (data) => {
        callback(data);
    });
    return () => socket.off('gift');
};

export const updateSettings = (settings) => {
    socket.emit('updateSettings', settings);
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};

export default socket;
