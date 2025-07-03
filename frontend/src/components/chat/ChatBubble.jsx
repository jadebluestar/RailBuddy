import React from 'react';
import { format } from 'date-fns';

const ChatBubble = ({ message, isCurrentUser }) => {
  const bubbleClass = isCurrentUser
    ? 'bg-primary text-white self-end rounded-br-none'
    : 'bg-gray-200 text-gray-800 self-start rounded-bl-none';

  return (
    <div className={`flex flex-col max-w-xs md:max-w-md p-3 rounded-xl shadow-sm mb-2 ${bubbleClass}`}>
      <p className="text-sm break-words">{message.content}</p>
      <span className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'} text-right`}>
        {format(new Date(message.timestamp), 'HH:mm')}
      </span>
    </div>
  );
};

export default ChatBubble;