import React from 'react';
import Layout from '../components/layout/Layout';
import ChatWindow from '../components/chat/ChatWindow';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChatPage = () => {
  const { partnerId } = useParams(); // Get partnerId from URL, if navigating from a match card
  const { t } = useTranslation();

  // For hackathon, simulate partner details if no ID is in URL or to show a default chat
  const defaultPartnerId = 'mock_user_123';
  const defaultPartnerName = t('mockPartnerName'); // Add to en.json/hi.json

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('Chat')}</h1>
        <p className="text-gray-600 mb-8">
          {t('Communicate with your matches and coordinate seat exchanges.')}
        </p>
        <ChatWindow
          partnerId={partnerId || defaultPartnerId}
          partnerName={partnerId ? `User ${partnerId}` : defaultPartnerName}
        />
      </div>
    </Layout>
  );
};

export default ChatPage;