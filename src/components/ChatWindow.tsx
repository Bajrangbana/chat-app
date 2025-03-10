import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chat } from '../types';
import MessageComponent from './Message';

interface ChatWindowProps {
  chats: Chat[];
  onSendMessage: (chatId: string,name: string, content: string, type: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chats, onSendMessage }) => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');

  const chat = chats.find((chat) => chat.id === chatId);

  useEffect(() => {
    if (!chat) {
      navigate('/');
    }
  }, [chat, navigate]);

  const handleSendMessage = () => {
    if (newMessage.trim() && chatId) {
      onSendMessage(chatId, chat?.name || "", newMessage, 'S');
      setNewMessage('');
    }
  };

  const handleReceiveMessage = () => {
    if (newMessage.trim() && chatId) {
      onSendMessage(chatId,chat?.name || "",  newMessage, 'R');
      setNewMessage('');
    }
  };


  if (!chat) {
    return null;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button onClick={() => navigate('/')}>←</button>
        <h2>{chat.name}</h2>
      </div>
      <div className="messages">
        {chat.messages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={handleReceiveMessage}>Receive</button>
      </div>
    </div>
  );
};

export default ChatWindow;