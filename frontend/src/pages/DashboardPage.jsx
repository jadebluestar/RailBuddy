import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/dashboard/DashboardCard';
import ExchangeRequestList from '../components/dashboard/ExchangeRequestList';
import KarmaPointsDisplay from '../components/dashboard/KarmaPointsDisplay';
import Layout from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useKarma } from '../hooks/useKarma';
// import { getExchangeRequests, updateExchangeRequest } from '../services/exchangeService'; // For real data

const DashboardPage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { karmaPoints, deductKarma, loading: karmaLoading, error: karmaError } = useKarma();
  const { t } = useTranslation();
  const [activeRequests, setActiveRequests] = useState([]);
  const [pastRequests, setPastRequests] = useState([]);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState('');

  // Simulate data for hackathon
  useEffect(() => {
    if (isAuthenticated && user) {
      // In a real app: fetch from backend
      // getExchangeRequests(user.id).then(data => {
      //   setActiveRequests(data.filter(req => req.status === 'pending' || req.status === 'accepted'));
      //   setPastRequests(data.filter(req => req.status === 'completed' || req.status === 'declined'));
      // });
      setActiveRequests([
        { id: 'req1', pnr: '1234567890', currentSeat: 'S5-23', desiredSeat: 'S5-24', status: 'pending', matchedUser: 'Alice' },
        { id: 'req2', pnr: '0987654321', currentSeat: 'B2-56', desiredSeat: 'B2-57', status: 'accepted', matchedUser: 'Bob' },
      ]);
      setPastRequests([
        { id: 'req3', pnr: '1122334455', currentSeat: 'A1-01', desiredSeat: 'A1-02', status: 'completed', matchedUser: 'Charlie', karmaAwarded: 10 },
        { id: 'req4', pnr: '6677889900', currentSeat: 'C3-11', desiredSeat: 'C3-12', status: 'declined', matchedUser: 'Diana' },
      ]);
    }
  }, [isAuthenticated, user]);

  const handleRequestAction = async (requestId, action) => {
    // In a real app, call backend API to update request status
    // await updateExchangeRequest(requestId, { status: action });
    console.log(`Request ${requestId} ${action}d.`);
    // Simulate update
    setActiveRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: action } : req
    ));
    setPastRequests(prev => {
        const req = activeRequests.find(r => r.id === requestId);
        if (req) {
            return [...prev, { ...req, status: action, karmaAwarded: action === 'accepted' ? 5 : 0 }]; // Simulate karma
        }
        return prev;
    });
    if (action === 'accepted') {
      // Simulate adding karma if an exchange is accepted and the user was the 'giver'
      // This is a simplified logic, actual logic needs to be more robust
      // addKarma(10); // Example karma for successful exchange
    }
  };

  const handleRedeemKarma = async () => {
    setRedeemLoading(true);
    setRedeemMessage('');
    const KARMA_COST_FOR_EXTRA_EXCHANGE = 50; // As per requirements
    const success = await deductKarma(KARMA_COST_FOR_EXTRA_EXCHANGE);

    if (success) {
      setRedeemMessage(t('karmaRedemptionSuccess'));
      // In a real app, you'd then enable the extra exchange feature
      // For hackathon, you can show a success message.
    } else {
      setRedeemMessage(karmaError || t('karmaRedemptionFailed'));
    }
    setRedeemLoading(false);
  };

  if (authLoading) {
    return <Layout><div className="text-center py-20"><LoadingSpinner /></div></Layout>;
  }

  if (!isAuthenticated || !user) {
    return <Layout><div className="container mx-auto p-4 text-center text-red-600">{t('pleaseLoginToViewDashboard')}</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('Welcome')}, {user.email || user.name}!</h1>
        <p className="text-gray-600 mb-8">{t('Welcome to your dashboard. Here you can manage your seat exchanges, view your karma points, and track your activity.')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <DashboardCard
            title={t('Linked PNRs')}
            value={user.linkedPnrs?.length || 0}
            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2V9a2 2 0 012-2h5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11v2a2 2 0 01-2 2h-2"></path></svg>}
            description={t('Total PNRs Linked')}
          />
          <KarmaPointsDisplay onRedeemClick={() => setIsRedeemModalOpen(true)} />
          <DashboardCard
            title={t('Active Matches')}
            value={activeRequests.filter(r => r.status === 'accepted').length}
            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
            description={t('Current Confirmed Exchanges')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExchangeRequestList
            requests={activeRequests.filter(req => req.status !== 'completed' && req.status !== 'declined')}
            onAccept={handleRequestAction}
            onDecline={handleRequestAction}
            type="Active Requests"
          />
          <ExchangeRequestList
            requests={pastRequests}
            type="Exchange History"
          />
        </div>
      </div>

      <Modal
        isOpen={isRedeemModalOpen}
        onClose={() => {setIsRedeemModalOpen(false); setRedeemMessage('');}}
        title={t('Redeem Karma Points')}
      >
        <p className="mb-4">{t('You can redeem your karma points for additional seat exchanges or other benefits.')}</p>
        <p className="font-bold text-lg mb-4">{t('Your Karma Points')}: {karmaPoints}</p>
        <p className="font-bold text-lg text-primary mb-6">{t('Cost for Extra Exchange')}: 50 {t('Karma Points')}</p>

        {redeemMessage && (
          <p className={`mb-4 ${redeemMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {redeemMessage}
          </p>
        )}

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => setIsRedeemModalOpen(false)} disabled={redeemLoading}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleRedeemKarma} disabled={redeemLoading || karmaPoints < 50}>
            {redeemLoading ? <LoadingSpinner className="w-4 h-4" color="white" /> : t('Redeem')}
          </Button>
        </div>
      </Modal>
    </Layout>
  );
};

export default DashboardPage;