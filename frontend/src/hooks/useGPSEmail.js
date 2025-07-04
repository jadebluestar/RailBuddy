import { useState } from 'react';
import { sendLocationEmail, sendEmailViaFormspree } from '../services/emailService';

/**
 * Provides:
 * - getCurrentLocation()
 * - sendLocationAndDetails()
 * - state for location, isGettingLocation, isSendingEmail
 */

export const useGPSEmail = () => {
  const [location, setLocation] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      setIsGettingLocation(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationData = {
            lat: latitude,
            lng: longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
          };

          setLocation(locationData);
          setIsGettingLocation(false);
          resolve(locationData);
        },
        (error) => {
          setIsGettingLocation(false);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  const sendLocationAndDetails = async (emailData) => {
    if (!location) {
      throw new Error('Location not available');
    }

    setIsSendingEmail(true);

    try {
      const emailPayload = {
        ...emailData,
        location: `${location.lat}, ${location.lng}`,
        mapsLink: `https://maps.google.com/?q=${location.lat},${location.lng}`,
        meetingTime: new Date().toLocaleString()
      };

      // Try EmailJS first, fallback to Formspree
      let result = await sendLocationEmail(emailPayload);

      if (!result.success) {
        result = await sendEmailViaFormspree(emailPayload);
      }

      return result;
    } finally {
      setIsSendingEmail(false);
    }
  };

  return {
    location,
    getCurrentLocation,
    sendLocationAndDetails,
    isGettingLocation,
    isSendingEmail
  };
};
