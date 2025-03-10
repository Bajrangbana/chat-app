import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { Chat } from './types';
import './styles.css';

const App: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  const handleCreateChat = (name: string) => {
    const newChat: Chat = {
      id: uuidv4(),
      name,
      messages: [],
    };
    setChats([...chats, newChat]);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter((chat) => chat.id !== chatId));
  };

  const handleSendMessage = (chatId: string, name: string, content: string, type: string) => {
    const newMessage = {
      id: uuidv4(),
      user: type ==='R'? name:'You',
      timestamp: new Date().toLocaleTimeString(),
      content,
      name
    };
    setChats(
      chats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [...chat.messages, newMessage] } : chat
      )
    );
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <ChatList
                chats={chats}
                onCreateChat={handleCreateChat}
                onDeleteChat={handleDeleteChat}
              />
            }
          />
          <Route
            path="/chat/:chatId"
            element={<ChatWindow chats={chats} onSendMessage={handleSendMessage} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;