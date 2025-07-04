import { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../contexts/AuthContext';

const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const useChat = (partnerId) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  
  const socketRef = useRef(null);
  const locationWatchRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setMessages([]);
      setIsConnected(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Initialize socket
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { token: localStorage.getItem('token') || 'demo-token' },
      timeout: 5000,
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    // Handle connection
    socket.on('connect', () => {
      console.log('✅ Socket connected');
      setIsConnected(true);
      
      const roomId = [user.id, partnerId].sort().join('-');
      socket.emit('joinRoom', roomId);
      
      // Simulate demo history
      setMessages([
        { id: '1', senderId: partnerId, content: "Hi! I'm interested in exchanging seats.", timestamp: Date.now() - 60000 },
        { id: '2', senderId: user.id, content: "Sure, tell me more about your seat.", timestamp: Date.now() - 30000 }
      ]);
      setIsLoading(false);
    });

    // Incoming messages
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Handle location updates
    socket.on('locationUpdate', (locationData) => {
      const locationMessage = {
        id: Date.now().toString(),
        senderId: locationData.senderId,
        type: 'location',
        location: locationData.location,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, locationMessage]);
    });

    // Handle file upload progress
    socket.on('fileUploadProgress', (data) => {
      setUploadProgress(prev => ({
        ...prev,
        [data.fileId]: data.progress
      }));
    });

    // Handle file upload completion
    socket.on('fileUploaded', (fileData) => {
      const fileMessage = {
        id: Date.now().toString(),
        senderId: fileData.senderId,
        type: 'file',
        file: fileData.file,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fileMessage]);
      
      // Remove from upload progress
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileData.fileId];
        return newProgress;
      });
    });

    // Handle errors
    socket.on('connect_error', (err) => {
      console.error('🚨 Socket connection error:', err.message);
      setError(new Error('Unable to connect. Offline mode.'));
      setIsConnected(false);
      // Load fallback messages for demo
      setMessages([
        { id: '1', senderId: partnerId, content: "Hi! I'm interested in exchanging seats.", timestamp: Date.now() - 60000 },
        { id: '2', senderId: user.id, content: "Sure, tell me more about your seat.", timestamp: Date.now() - 30000 }
      ]);
      setIsLoading(false);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
      setIsConnected(false);
    });

    socket.on('error', (errMsg) => {
      console.error('⚠️ Socket error:', errMsg);
      setError(new Error('Chat error: ' + errMsg));
    });

    return () => {
      socket.disconnect();
      stopLocationSharing();
      console.log('🧹 Cleaned up socket connection');
    };
  }, [isAuthenticated, user, partnerId]);

  // Optimistic sending
  const sendMessage = (receiverId, content) => {
    const message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId,
      content,
      timestamp: Date.now(),
    };

    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('sendMessage', message);
    } else {
      console.warn('⚠️ Socket not connected. Storing locally.');
    }
    
    setMessages((prev) => [...prev, message]);
  };

  // Start live location sharing
  const startLocationSharing = () => {
    if (!navigator.geolocation) {
      setError(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    setIsLocationSharing(true);
    
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000 // 30 seconds
    };

    locationWatchRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const locationData = {
          senderId: user.id,
          receiverId: partnerId,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          }
        };

        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit('shareLocation', locationData);
        }

        // Add location message to chat
        const locationMessage = {
          id: Date.now().toString(),
          senderId: user.id,
          type: 'location',
          location: locationData.location,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, locationMessage]);
      },
      (error) => {
        console.error('Location error:', error);
        setError(new Error(`Location sharing failed: ${error.message}`));
        setIsLocationSharing(false);
      },
      options
    );
  };

  // Stop location sharing
  const stopLocationSharing = () => {
    if (locationWatchRef.current) {
      navigator.geolocation.clearWatch(locationWatchRef.current);
      locationWatchRef.current = null;
    }
    setIsLocationSharing(false);
  };

  // Share current location once
  const shareCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          senderId: user.id,
          receiverId: partnerId,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          }
        };

        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit('shareLocation', locationData);
        }

        // Add location message to chat
        const locationMessage = {
          id: Date.now().toString(),
          senderId: user.id,
          type: 'location',
          location: locationData.location,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, locationMessage]);
      },
      (error) => {
        console.error('Location error:', error);
        setError(new Error(`Location sharing failed: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Upload file
  const uploadFile = async (file) => {
    if (!file) return;

    const fileId = Date.now().toString();
    const maxSize = 10 * 1024 * 1024; // 10MB limit

    if (file.size > maxSize) {
      setError(new Error('File size exceeds 10MB limit'));
      return;
    }

    // Initialize upload progress
    setUploadProgress(prev => ({
      ...prev,
      [fileId]: 0
    }));

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('senderId', user.id);
      formData.append('receiverId', partnerId);
      formData.append('fileId', fileId);

      // Create XMLHttpRequest for upload progress
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: progress
          }));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          
          if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit('fileUploaded', {
              senderId: user.id,
              receiverId: partnerId,
              fileId,
              file: response.file
            });
          }

          // Add file message to chat
          const fileMessage = {
            id: Date.now().toString(),
            senderId: user.id,
            type: 'file',
            file: response.file,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, fileMessage]);
        } else {
          throw new Error('Upload failed');
        }
      });

      xhr.addEventListener('error', () => {
        setError(new Error('File upload failed'));
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      });

      const uploadUrl = `${SOCKET_SERVER_URL}/api/upload`;
      xhr.open('POST', uploadUrl);
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token') || 'demo-token'}`);
      xhr.send(formData);

    } catch (error) {
      console.error('Upload error:', error);
      setError(new Error('File upload failed'));
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
    }
  };

  // Utility function to get file preview
  const getFilePreview = (file) => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    });
  };

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    isConnected,
    // Location sharing methods
    startLocationSharing,
    stopLocationSharing,
    shareCurrentLocation,
    isLocationSharing,
    // File upload methods
    uploadFile,
    uploadProgress,
    getFilePreview
  };
};