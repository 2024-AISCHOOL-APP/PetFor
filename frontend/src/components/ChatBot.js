import React from 'react';
import './ChatBot.css';

const ChatBot = () => {
  return (
    <div className="chatbot">
      <div className="chatbot-header">펫포 쳇봇</div>
      <div className="chatbot-body">
        
        <p>뭐 해줘?</p>
        <div className='chatbot-box'><input className='chatbotInput'></input><input type='submit' className='chatbotSubmit' value="전송"></input></div>
        
      </div>
    </div>
  );
};

export default ChatBot;
