import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../types';

interface ChatListProps {
  chats: Chat[];
  onCreateChat: (name: string) => void;
  onDeleteChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onCreateChat, onDeleteChat }) => {
  const [newChatName, setNewChatName] = useState('');
  const navigate = useNavigate();

  const handleCreateChat = () => {
    if (newChatName.trim()) {
      onCreateChat(newChatName);
      setNewChatName('');
    }
  };

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <div className="new-chat">
        <input
          type="text"
          placeholder="Enter chat name"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleCreateChat();
            }
          }}
        />
        <button onClick={handleCreateChat}>Create</button>
      </div>
      <ul className="chat-items">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="chat-item"
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <span className="chat-name">{chat.name}</span>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;