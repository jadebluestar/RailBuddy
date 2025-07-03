import { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../contexts/AuthContext';
// import { getChatHistory } from '../services/chatService'; // You might need this for history

// For hackathon, replace with your backend Socket.io URL
const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const useChat = (partnerId) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setMessages([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Initialize socket connection
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { token: localStorage.getItem('token') }, // Send JWT for authentication
    });

    // Handle connection
    socketRef.current.on('connect', () => {
      console.log('Socket connected');
      // Join a specific chat room (e.g., for direct messages between two users)
      // A common pattern is to create a room name from sorted user IDs
      const roomId = [user.id, partnerId].sort().join('-');
      socketRef.current.emit('joinRoom', roomId);

      // In a real app, fetch chat history for this room
      // getChatHistory(roomId)
      //   .then(history => {
      //     setMessages(history);
      //     setIsLoading(false);
      //   })
      //   .catch(err => {
      //     console.error("Error fetching chat history:", err);
      //     setError(err);
      //     setIsLoading(false);
      //   });
      // For hackathon, simulate initial messages
      setMessages([
        { id: '1', senderId: partnerId, content: "Hi! I'm interested in exchanging seats.", timestamp: Date.now() - 60000 },
        { id: '2', senderId: user.id, content: "Sure, tell me more about your seat.", timestamp: Date.now() - 30000 }
      ]);
      setIsLoading(false);
    });

    // Handle incoming messages
    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Handle errors
    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
      setError(new Error('Connection error.'));
      setIsLoading(false);
    });

    socketRef.current.on('error', (errMsg) => {
      console.error('Socket error:', errMsg);
      setError(new Error(errMsg));
      setIsLoading(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('Socket disconnected');
      }
    };
  }, [isAuthenticated, user, partnerId]); // Reconnect if user or partner changes

  const sendMessage = (receiverId, content) => {
    if (socketRef.current && user) {
      const message = {
        senderId: user.id,
        receiverId: receiverId,
        content: content,
        timestamp: Date.now(),
        // Add PNR info if relevant for chat context security
      };
      socketRef.current.emit('sendMessage', message);
    } else {
      console.warn('Socket not connected or user not authenticated to send message.');
    }
  };

  return { messages, sendMessage, isLoading, error };
};