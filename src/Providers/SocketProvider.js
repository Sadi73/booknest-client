"use client";

import Config from '@/Config';
import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const socketContext = createContext({
    socket: null,
    isConnected: false,
});

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [newNotification, setNewNotification] = useState(null);

    useEffect(() => {
        // Initialize the socket connection
        const socketInstance = io(Config.baseApi, {
            transports: ['websocket'],
            cors: {
                origin: 'http://localhost:3000', // Replace with your React app URL
            },
        });

        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Socket connected:', socketInstance.id);
            setIsConnected(true);
        });

        socketInstance.on('notification', (data) => {
            if (data?.book?._id !== newNotification?.book?._id) {
                setNewNotification(data)
            }
        });


        // Handle disconnection
        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        // Cleanup the socket connection on component unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <socketContext.Provider value={{ socket, isConnected, newNotification }}>
            {children}
        </socketContext.Provider>
    );
};

export default SocketProvider;
