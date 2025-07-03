import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
// import { getKarmaPoints, redeemKarmaPoints } from '../services/karmaService'; // Assuming you'll build this

export const KarmaContext = createContext(null);

export const KarmaProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [karmaPoints, setKarmaPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate karma points for hackathon, replace with API call
  useEffect(() => {
    if (isAuthenticated && user) {
      setLoading(true);
      setError(null);
      // In a real app:
      // getKarmaPoints(user.id)
      //   .then(points => {
      //     setKarmaPoints(points);
      //     setLoading(false);
      //   })
      //   .catch(err => {
      //     console.error("Error fetching karma points:", err);
      //     setError(err);
      //     setLoading(false);
      //   });
      // For Hackathon: Simulate
      const simulatedKarma = localStorage.getItem(`karma_${user.id}`) ? parseInt(localStorage.getItem(`karma_${user.id}`)) : 100; // Default 100 karma
      setKarmaPoints(simulatedKarma);
      setLoading(false);
    } else {
      setKarmaPoints(0);
    }
  }, [isAuthenticated, user]);

  const addKarma = (points) => {
    if (user) {
      const newKarma = karmaPoints + points;
      setKarmaPoints(newKarma);
      localStorage.setItem(`karma_${user.id}`, newKarma.toString()); // Simulate persistence
      // In a real app: call API to update karma on backend
    }
  };

  const deductKarma = async (points) => {
    if (user) {
      if (karmaPoints >= points) {
        setLoading(true);
        setError(null);
        try {
          // In a real app:
          // await redeemKarmaPoints(user.id, points);
          const newKarma = karmaPoints - points;
          setKarmaPoints(newKarma);
          localStorage.setItem(`karma_${user.id}`, newKarma.toString()); // Simulate persistence
          setLoading(false);
          return true; // Success
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to redeem karma');
          setLoading(false);
          return false; // Failure
        }
      } else {
        setError("Not enough karma points.");
        return false;
      }
    }
    return false;
  };

  return (
    <KarmaContext.Provider value={{ karmaPoints, addKarma, deductKarma, loading, error }}>
      {children}
    </KarmaContext.Provider>
  );
};