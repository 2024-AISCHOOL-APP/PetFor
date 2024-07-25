import React, { useState } from 'react';
import ChatBot from './ChatBot';
import './ChatBotButton.css';

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {isOpen && <ChatBot />}
      <button className="chatbot-button" onClick={toggleChatBot}>
        {isOpen ? '펫봇 닫기' : '펫봇 열기'}
      </button>
    </div>
  );
};

export default ChatBotButton;
