import React from 'react';
import ChatBubble from "../components/chat/ChatBubble";

export default {
  title: 'Components/ChatBubble',
  component: ChatBubble,
};

const Template = (args) => <ChatBubble {...args} />;

export const CurrentUser = Template.bind({});
CurrentUser.args = {
  message: {
    content: "This is my message.",
    timestamp: Date.now()
  },
  isCurrentUser: true
};

export const OtherUser = Template.bind({});
OtherUser.args = {
  message: {
    content: "Hello, I'm the other user.",
    timestamp: Date.now()
  },
  isCurrentUser: false
};
