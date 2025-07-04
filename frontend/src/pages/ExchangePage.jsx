// src/pages/ExchangePage.jsx
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MatchResults from '../components/matching/MatchResults';
import GPSEmailIntegration from '../components/common/GPSEmailIntegration'; // ✅ Correct path!
import { useAuth } from '../hooks/useAuth';
import { TranslatedText } from "../components/multi-language/TranslatedText";
export default function ExchangePage() {
  const { isAuthenticated } = useAuth();

  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrDetails, setPnrDetails] = useState(null);
  const [pnrLoading, setPnrLoading] = useState(false);
  const [pnrError, setPnrError] = useState('');

  const [desiredCoach, setDesiredCoach] = useState('');
  const [desiredSeat, setDesiredSeat] = useState('');

  const [matches, setMatches] = useState([]);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [matchesError, setMatchesError] = useState('');

  const [exchangeRequestMessage, setExchangeRequestMessage] = useState('');

  const simulatePnrVerification = async () => {
    setPnrLoading(true);
    setPnrError('');
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (pnrNumber === '1234567890') {
      setPnrDetails({
        passengerName: 'Rahul Sharma',
        trainNumber: '12839',
        dateOfJourney: '2025-07-15',
        currentSeat: 'S5-23',
        coach: 'S5',
        berth: 'Lower'
      });
    } else {
      setPnrDetails(null);
      setPnrError('PNR verification failed.');
    }
    setPnrLoading(false);
  };

  const simulateSearchMatches = async () => {
    if (!pnrDetails) {
      setMatchesError('Please verify your PNR first.');
      return;
    }
    setMatchesLoading(true);
    setMatchesError('');
    await new Promise(resolve => setTimeout(resolve, 2000));

    setMatches([
      {
        id: 'match1',
        name: 'Priya Singh',
        currentSeat: 'S5-23',
        desiredSeat: 'S3-23',
        score: 92,
      },
    ]);
    setMatchesLoading(false);
  };

  const handleInitiateChat = (matchId) => {
    alert(`Initiating chat with ${matchId}`);
  };

  const handleSendExchangeRequest = async (matchId) => {
    setExchangeRequestMessage('');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setExchangeRequestMessage(`Exchange request sent to ${matchId}!`);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="text-center text-red-600 p-4">
          <TranslatedText>Please login to exchange seats.</TranslatedText>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Header />
      <Layout>
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold">
            <TranslatedText>Find Your Seat Exchange Partner</TranslatedText>
          </h1>

          <p className="text-gray-600">
            <TranslatedText>
              Link your PNR and share your location to safely meet your exchange partner.
            </TranslatedText>
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold">
              <TranslatedText>Securely Link PNR</TranslatedText>
            </h2>
            <InputField
              label="PNR Number"
              value={pnrNumber}
              onChange={(e) => setPnrNumber(e.target.value)}
              placeholder="e.g., 1234567890"
              error={pnrError}
            />
            <Button onClick={simulatePnrVerification} disabled={pnrLoading}>
              {pnrLoading ? (
                <LoadingSpinner className="w-4 h-4" />
              ) : (
                <TranslatedText>Verify PNR</TranslatedText>
              )}
            </Button>

            {pnrDetails && (
              <>
                <div className="mt-4">
                  <p><strong>Passenger:</strong> {pnrDetails.passengerName}</p>
                  <p><strong>Train:</strong> {pnrDetails.trainNumber}</p>
                  <p><strong>Seat:</strong> {pnrDetails.currentSeat}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <InputField
                    label="Desired Coach"
                    value={desiredCoach}
                    onChange={(e) => setDesiredCoach(e.target.value)}
                  />
                  <InputField
                    label="Desired Seat"
                    value={desiredSeat}
                    onChange={(e) => setDesiredSeat(e.target.value)}
                  />
                </div>
                <Button
                  onClick={simulateSearchMatches}
                  disabled={matchesLoading}
                  className="w-full mt-4"
                >
                  {matchesLoading ? (
                    <LoadingSpinner className="w-4 h-4" />
                  ) : (
                    <TranslatedText>Search for Matches</TranslatedText>
                  )}
                </Button>
              </>
            )}
          </div>

          {exchangeRequestMessage && (
            <p className="text-green-600">{exchangeRequestMessage}</p>
          )}

          <MatchResults
            matches={matches}
            isLoading={matchesLoading}
            error={matchesError ? { message: matchesError } : null}
            onInitiateChat={handleInitiateChat}
            onSendExchangeRequest={handleSendExchangeRequest}
          />

          {matches.length > 0 && (
            <GPSEmailIntegration
              partnerId={matches[0].id}
              partnerName={matches[0].name || 'Partner'}
            />
          )}
        </div>
      </Layout>
    </>
  );
}
