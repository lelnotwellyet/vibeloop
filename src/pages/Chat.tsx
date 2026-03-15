import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Badge from '../components/Badge';
import './Chat.css';

const CONVERSATIONS = [
  {
    id: 1, name: 'Sarah Williams', role: 'Senior' as const,
    last: "That sounds great! Let's schedule a call.", time: '5m ago',
    unread: 2, online: true, avatar: 'SW', avatarColor: '#ef4444',
  },
  {
    id: 2, name: 'Mike Chen', role: 'Junior' as const,
    last: 'Thanks for the advice on React hooks!', time: '1h ago',
    unread: 0, online: true, avatar: 'MC', avatarColor: '#f59e0b',
  },
  {
    id: 3, name: 'Emily Davis', role: 'Senior' as const,
    last: "I'll send you the project details soon.", time: '3h ago',
    unread: 0, online: false, avatar: 'ED', avatarColor: '#8b5cf6',
  },
  {
    id: 4, name: 'David Kumar', role: 'Senior' as const,
    last: 'Happy to help with your portfolio!', time: '1d ago',
    unread: 0, online: false, avatar: 'DK', avatarColor: '#06b6d4',
  },
];

const MESSAGES = [
  { id: 1, from: 'other', text: "Hi! I saw your post about internship opportunities. Would love to learn more!", time: '2:30 PM' },
  { id: 2, from: 'me',    text: "Hi! Of course, I'd be happy to share my experience. What specific areas are you interested in?", time: '2:32 PM' },
  { id: 3, from: 'other', text: "I'm particularly interested in how you prepared for technical interviews and what the day-to-day work was like.", time: '2:35 PM' },
  { id: 4, from: 'me',    text: "Great questions! For technical interviews, I focused on data structures and algorithms using LeetCode. I can share my study plan if you'd like. As for the day-to-day, it was a mix of coding, code reviews, and team meetings.", time: '2:38 PM' },
  { id: 5, from: 'other', text: "That sounds great! Let's schedule a call.", time: '2:40 PM' },
];

export default function Chat() {
  const [activeId, setActiveId] = useState(1);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const activeCon = CONVERSATIONS.find(c => c.id === activeId)!;

  return (
    <div className="chat-page">
      <Navbar />
      <div className="chat-layout">
        {/* Conversation List */}
        <div className="conv-list">
          <div className="conv-search">
            <Search size={15} className="conv-search-icon" />
            <input
              className="conv-search-input"
              placeholder="Search conversations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="conv-items">
            {CONVERSATIONS.filter(c =>
              !search || c.name.toLowerCase().includes(search.toLowerCase())
            ).map(c => (
              <div
                key={c.id}
                className={`conv-item ${activeId === c.id ? 'active' : ''}`}
                onClick={() => setActiveId(c.id)}
              >
                <div className="conv-avatar-wrap">
                  <div className="conv-avatar" style={{ background: c.avatarColor }}>
                    {c.avatar}
                  </div>
                  {c.online && <span className="online-dot" />}
                </div>
                <div className="conv-info">
                  <div className="conv-name-row">
                    <span className="conv-name">{c.name}</span>
                    <Badge type={c.role} />
                    {c.unread > 0 && (
                      <span className="unread-badge">{c.unread}</span>
                    )}
                  </div>
                  <span className="conv-last">{c.last}</span>
                  <span className="conv-time">{c.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-header-avatar-wrap">
                <div className="chat-header-avatar" style={{ background: activeCon.avatarColor }}>
                  {activeCon.avatar}
                </div>
                {activeCon.online && <span className="online-dot" />}
              </div>
              <div>
                <span className="chat-header-name">{activeCon.name}</span>
                {activeCon.online && <p className="chat-header-status">Active now</p>}
              </div>
            </div>
            <Badge type={activeCon.role} />
          </div>

          {/* Messages */}
          <div className="messages">
            {MESSAGES.map(msg => (
              <div key={msg.id} className={`msg-wrap ${msg.from === 'me' ? 'msg-me' : 'msg-other'}`}>
                <div className={`msg-bubble ${msg.from === 'me' ? 'bubble-me' : 'bubble-other'}`}>
                  {msg.text}
                </div>
                <span className="msg-time">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-bar">
            <input
              className="chat-input"
              placeholder="Type a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') setMessage(''); }}
            />
            <button className="send-btn" onClick={() => setMessage('')}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
