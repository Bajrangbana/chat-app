import React from 'react';
import { Message } from '../types';

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
    const isSentByUser = message.user === 'You';

  return (
    <div className={`message ${isSentByUser ? 'sent' : 'received'}`}>
      <div className="message-header">
        <span className="user">{message.user}</span>
        <span className="timestamp">{message.timestamp}</span>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
};

export default MessageComponent;