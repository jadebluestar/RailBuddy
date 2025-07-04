import React from 'react';
import ChatBubble from '../components/chat/ChatBubble';

const mockMessages = [
  { id: '1', senderId: 'Seema Prakash', content: "Hey! Want to swap seats?", timestamp: Date.now() - 60000 },
  { id: '2', senderId: 'Rohit Raghavan', content: "Sure, where are you sitting?", timestamp: Date.now() - 40000 },
  { id: '3', senderId: 'Vinit Rajan', content: "Near the window, seat 21A.", timestamp: Date.now() - 30000 },
  { id: '4', senderId: 'Amit Shah', content: "Perfect! I prefer aisle.", timestamp: Date.now() - 20000 }
];

export default function FakeChat() {
  const currentUserId = 'alice';

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col space-y-2">
      {mockMessages.map(msg => (
        <ChatBubble
          key={msg.id}
          message={msg}
          isCurrentUser={msg.senderId === currentUserId}
        />
      ))}
    </div>
  );
}
