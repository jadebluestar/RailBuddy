import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function PreferencesPage() {
  const navigate = useNavigate();

  const [pnr, setPnr] = useState('');
  const [preferences, setPreferences] = useState({
    windowSeat: false,
    legroom: false,
    groupSeating: false,
  });

  const handleSubmit = async () => {
    try {
      // Store locally for mock flow
      localStorage.setItem(
        'preferences',
        JSON.stringify({ pnr, preferences })
      );

      // Call fake backend
      const response = await api.post('/preferences', { pnr, preferences });

      // Store matches locally too
      localStorage.setItem('matches', JSON.stringify(response.data.matches));

      // Redirect to mock match results
      navigate('/matches');
    } catch (error) {
      console.error(error);
      alert('Something went wrong saving preferences');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Link Journey & Preferences</h1>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Enter PNR"
        value={pnr}
        onChange={(e) => setPnr(e.target.value)}
      />

      <div className="mb-4">
        <label className="block">
          <input
            type="checkbox"
            checked={preferences.windowSeat}
            onChange={() =>
              setPreferences((prev) => ({
                ...prev,
                windowSeat: !prev.windowSeat,
              }))
            }
          />{' '}
          Window Seat
        </label>
        <label className="block">
          <input
            type="checkbox"
            checked={preferences.legroom}
            onChange={() =>
              setPreferences((prev) => ({
                ...prev,
                legroom: !prev.legroom,
              }))
            }
          />{' '}
          Extra Legroom
        </label>
        <label className="block">
          <input
            type="checkbox"
            checked={preferences.groupSeating}
            onChange={() =>
              setPreferences((prev) => ({
                ...prev,
                groupSeating: !prev.groupSeating,
              }))
            }
          />{' '}
          Group Seating
        </label>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Save & Find Matches
      </button>
    </div>
  );
}
