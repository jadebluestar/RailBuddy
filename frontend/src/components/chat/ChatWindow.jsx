import React, { useState, useEffect, useRef } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import ChatBubble from './ChatBubble';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../common/LoadingSpinner';

const ChatWindow = ({ partnerId, partnerName }) => {
  const { user } = useAuth();
  const { messages, sendMessage, isLoading, error } = useChat(partnerId);
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll to bottom when messages update

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && user && partnerId) {
      sendMessage(partnerId, newMessage.trim());
      setNewMessage('');
    }
  };

  if (!user) {
    return <div className="p-4 text-center text-red-500">{t('pleaseLoginToChat')}</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{t('errorLoadingChat')}: {error.message}</div>;
  }

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary text-white p-4 text-center text-lg font-semibold shadow-md">
        {t('chatWith')}: {partnerName || t('unknownUser')}
      </div>

      <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">{t('startChatting')}</div>
        ) : (
          messages.map((msg, index) => (
            <ChatBubble key={msg.id || index} message={msg} isCurrentUser={msg.senderId === user.id} />
          ))
        )}
        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-gray-50 flex space-x-2">
        <InputField
          id="newMessage"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={t('typeYourMessage')}
          className="flex-grow mb-0"
        />
        <Button type="submit" disabled={!newMessage.trim()}>
          {t('send')}
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;