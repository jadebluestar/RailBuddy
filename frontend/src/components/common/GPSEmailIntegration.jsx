import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Shield, CheckCircle } from 'lucide-react';

const GPSEmailIntegration = ({ partnerId, partnerName }) => {
  const [location, setLocation] = useState(null);
  const [email, setEmail] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [securePoints, setSecurePoints] = useState([]);
  const [emailSent, setEmailSent] = useState(false);

  // Mock secure meeting points (in real app, fetch from backend)
  const mockSecurePoints = [
    { id: 1, name: 'Railway Station Platform 1', lat: 28.6139, lng: 77.2090, verified: true },
    { id: 2, name: 'Station Food Court', lat: 28.6140, lng: 77.2088, verified: true },
    { id: 3, name: 'Station Waiting Room', lat: 28.6138, lng: 77.2092, verified: false },
  ];

  useEffect(() => {
    setSecurePoints(mockSecurePoints);
  }, []);

  const getCurrentLocation = () => {
    setIsSharing(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setIsSharing(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsSharing(false);
          alert('Unable to get location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsSharing(false);
    }
  };

  const sendLocationEmail = async () => {
    if (!email || !location) {
      alert('Please provide email and location first');
      return;
    }

    try {
      // Using EmailJS (free service) instead of backend
      // You'll need to sign up at emailjs.com and get your keys
      const emailData = {
        to_email: email,
        partner_name: partnerName,
        current_location: `${location.lat}, ${location.lng}`,
        google_maps_link: `https://maps.google.com/?q=${location.lat},${location.lng}`,
        secure_points: securePoints.map(p => p.name).join(', '),
        meeting_time: new Date().toLocaleString(),
      };

      // Mock email sending (replace with actual EmailJS integration)
      console.log('Sending email with data:', emailData);
      
      // Simulate email sending
      setTimeout(() => {
        setEmailSent(true);
        alert('Location and secure meeting points sent successfully!');
      }, 1000);

    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-6 h-6 text-green-500" />
        <h3 className="text-xl font-semibold">Secure Meeting Coordination</h3>
      </div>

      {/* Location Sharing */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Share Location</span>
          </div>
          <button
            onClick={getCurrentLocation}
            disabled={isSharing}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isSharing ? 'Getting Location...' : 'Get My Location'}
          </button>
        </div>
        
        {location && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-800">
              📍 Location captured: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
            <a
              href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              View on Google Maps
            </a>
          </div>
        )}
      </div>

      {/* Email Integration */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Mail className="w-5 h-5 text-purple-500" />
          <span className="font-medium">Send Details via Email</span>
        </div>
        
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Partner's email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <button
            onClick={sendLocationEmail}
            disabled={!email || !location || emailSent}
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {emailSent ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Email Sent Successfully!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>Send Location & Meeting Points</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Secure Meeting Points */}
      <div className="border rounded-lg p-4">
        <h4 className="font-medium mb-3 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-500" />
          <span>Recommended Secure Meeting Points</span>
        </h4>
        
        <div className="space-y-2">
          {securePoints.map(point => (
            <div
              key={point.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{point.name}</span>
                {point.verified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              
              {location && (
                <div className="text-xs text-gray-500">
                  {calculateDistance(location.lat, location.lng, point.lat, point.lng).toFixed(1)} km away
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-medium text-yellow-800 mb-2">🛡️ Safety Tips</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Always meet in public, well-lit areas</li>
          <li>• Inform someone about your meeting</li>
          <li>• Verify partner identity before meeting</li>
          <li>• Keep your ticket and ID handy</li>
        </ul>
      </div>
    </div>
  );
};

export default GPSEmailIntegration;