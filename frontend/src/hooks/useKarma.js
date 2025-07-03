import { useContext } from 'react';
import { KarmaContext } from '../contexts/KarmaContext';

export const useKarma = () => {
  const context = useContext(KarmaContext);
  if (!context) {
    throw new Error('useKarma must be used within a KarmaProvider');
  }
  return context;
};