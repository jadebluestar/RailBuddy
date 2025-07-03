import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MatchResults from '../components/matching/MatchResults';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
// import { verifyPnr, createExchangeRequest, getMatches } from '../services/exchangeService'; // For real data

const ExchangePage = () => {
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrDetails, setPnrDetails] = useState(null); // Stores fetched PNR data
  const [pnrLoading, setPnrLoading] = useState(false);
  const [pnrError, setPnrError] = useState('');

  const [desiredCoach, setDesiredCoach] = useState('');
  const [desiredSeat, setDesiredSeat] = useState('');
  const [matches, setMatches] = useState([]);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [matchesError, setMatchesError] = useState('');

  const [exchangeRequestLoading, setExchangeRequestLoading] = useState(false);
  const [exchangeRequestMessage, setExchangeRequestMessage] = useState('');

  // For hackathon, simulate PNR linking and match fetching
  const simulatePnrVerification = async () => {
    setPnrLoading(true);
    setPnrError('');
    // In a real app: await verifyPnr(pnrNumber);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    if (pnrNumber === '1234567890') {
      setPnrDetails({
        passengerName: 'Rahul Sharma',
        trainNumber: '12839',
        dateOfJourney: '2025-07-15',
        currentSeat: 'S5-23',
        coach: 'S5',
        berth: 'Lower'
      });
      setPnrError('');
      alert(t('pnrVerificationComplete'));
    } else {
      setPnrDetails(null);
      setPnrError(t('pnrVerificationFailed'));
    }
    setPnrLoading(false);
  };

  const simulateSearchMatches = async () => {
    if (!pnrDetails) {
      setMatchesError(t('pleaseVerifyPnrFirst'));
      return;
    }
    setMatchesLoading(true);
    setMatchesError('');
    setMatches([]);
    // In a real app: const data = await getMatches({ pnrDetails, desiredCoach, desiredSeat });
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

    // Simulate AI matches based on PNR data
    const simulatedMatches = [
      {
        id: 'match1',
        name: 'Priya Singh',
        isVerified: true,
        destination: pnrDetails.destination || 'Mumbai', // Assuming PNR has destination
        currentSeat: 'S5-24',
        desiredSeat: 'S5-23',
        profilePic: null, // Replace with actual URL
        score: 92
      },
      {
        id: 'match2',
        name: 'Arjun Reddy',
        isVerified: false,
        destination: pnrDetails.destination || 'Mumbai',
        currentSeat: 'B3-15',
        desiredSeat: 'S5-23',
        profilePic: null,
        score: 78
      },
      {
        id: 'match3',
        name: 'Sneha Kumari',
        isVerified: true,
        destination: 'Delhi',
        currentSeat: 'S5-22',
        desiredSeat: 'S5-23',
        profilePic: null,
        score: 85
      },
    ];
    setMatches(simulatedMatches);
    setMatchesLoading(false);
  };

  const handleInitiateChat = (matchId) => {
    // Navigate to chat page with partner ID
    const matchedUser = matches.find(m => m.id === matchId);
    if (matchedUser) {
      alert(`${t('initiatingChatWith')} ${matchedUser.name}`);
      // navigate(`/chat/${matchId}`); // Uncomment and use useNavigate hook
    }
  };

  const handleSendExchangeRequest = async (matchId) => {
    setExchangeRequestLoading(true);
    setExchangeRequestMessage('');
    // In a real app:
    // try {
    //   await createExchangeRequest(pnrDetails, desiredCoach, desiredSeat, matchId);
    //   setExchangeRequestMessage(t('exchangeRequestSent'));
    // } catch (err) {
    //   setExchangeRequestMessage(t('exchangeRequestFailed'));
    // }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    const matchedUser = matches.find(m => m.id === matchId);
    if (matchedUser) {
      setExchangeRequestMessage(`${t('exchangeRequestSentTo')} ${matchedUser.name}!`);
      // Simulate adding karma for initiating an exchange? (optional)
      // addKarma(5);
    } else {
      setExchangeRequestMessage(t('exchangeRequestFailed'));
    }

    setExchangeRequestLoading(false);
  };

  if (!isAuthenticated) {
    return <Layout><div className="container mx-auto p-4 text-center text-red-600">{t('pleaseLoginToExchangeSeats')}</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('exchangeSeats')}</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('securelyLinkPnr')}</h2>
          <p className="text-gray-600 mb-4">{t('linkPnrDescription')}</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-end">
            <InputField
              label={t('pnrNumber')}
              id="pnr"
              type="text"
              value={pnrNumber}
              onChange={(e) => setPnrNumber(e.target.value)}
              placeholder="e.g., 1234567890"
              className="flex-grow"
              error={pnrError}
            />
            <Button onClick={simulatePnrVerification} disabled={pnrLoading}>
              {pnrLoading ? <LoadingSpinner className="w-4 h-4" color="white" /> : t('verifyPnr')}
            </Button>
          </div>
        </div>

        {pnrDetails && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('currentTravelDetails')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>{t('passengerName')}:</strong> {pnrDetails.passengerName}</p>
              <p><strong>{t('trainNumber')}:</strong> {pnrDetails.trainNumber}</p>
              <p><strong>{t('dateOfJourney')}:</strong> {pnrDetails.dateOfJourney}</p>
              <p><strong>{t('currentSeat')}:</strong> {pnrDetails.currentSeat} ({pnrDetails.coach})</p>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">{t('desiredExchangeDetails')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label={t('specificCoach')}
                id="desiredCoach"
                type="text"
                value={desiredCoach}
                onChange={(e) => setDesiredCoach(e.target.value)}
                placeholder="e.g., S5, B1 (optional)"
              />
              <InputField
                label={t('specificSeat')}
                id="desiredSeat"
                type="text"
                value={desiredSeat}
                onChange={(e) => setDesiredSeat(e.target.value)}
                placeholder="e.g., 24, 57 (optional)"
              />
            </div>
            <Button onClick={simulateSearchMatches} className="w-full mt-6" disabled={matchesLoading}>
              {matchesLoading ? <LoadingSpinner className="w-5 h-5" color="white" /> : t('searchMatches')}
            </Button>
          </div>
        )}

        {matchesError && <p className="text-red-500 text-center mb-4">{matchesError}</p>}
        {exchangeRequestMessage && <p className={`text-center mb-4 ${exchangeRequestMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{exchangeRequestMessage}</p>}

        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('aiSuggestedMatches')}</h2>
        <MatchResults
          matches={matches}
          isLoading={matchesLoading}
          error={matchesError ? { message: matchesError } : null}
          onInitiateChat={handleInitiateChat}
          onSendExchangeRequest={handleSendExchangeRequest}
        />
      </div>
    </Layout>
  );
};

export default ExchangePage;