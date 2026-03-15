import React, { useState } from 'react';
import { Heart, MessageCircle, Send, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Badge from '../components/Badge';
import './Feed.css';

const POSTS = [
  {
    id: 1,
    author: 'Sarah Williams',
    role: 'Senior' as const,
    time: '2 hours ago',
    content: 'Just finished an amazing internship at a tech startup! Happy to share my experience and tips with anyone looking for internship opportunities. Feel free to reach out! 🚀',
    likes: 24,
    comments: 8,
    avatar: 'SW',
    avatarColor: '#ef4444',
  },
  {
    id: 2,
    author: 'Mike Chen',
    role: 'Junior' as const,
    time: '4 hours ago',
    content: 'Looking for advice on which programming language to focus on for web development. Should I go deep into JavaScript or learn multiple languages?',
    likes: 12,
    comments: 15,
    avatar: 'MC',
    avatarColor: '#f59e0b',
  },
  {
    id: 3,
    author: 'Emily Davis',
    role: 'Senior' as const,
    time: '6 hours ago',
    content: 'Just wrapped up a fantastic mentoring session with some amazing juniors! Remember, every expert was once a beginner. Keep pushing forward! 💪 #Mentorship #CareerGrowth',
    likes: 38,
    comments: 6,
    avatar: 'ED',
    avatarColor: '#8b5cf6',
  },
];

const TRENDING = [
  { tag: '#Internship Tips', posts: 234 },
  { tag: '#Web Development', posts: 189 },
  { tag: '#Career Advice', posts: 156 },
  { tag: '#Study Groups', posts: 142 },
  { tag: '#Project Ideas', posts: 128 },
];

const MENTORS = [
  { name: 'Sarah Williams', field: 'Software Engineering', avatar: 'SW', avatarColor: '#ef4444' },
  { name: 'Emily Davis',    field: 'Data Science',         avatar: 'ED', avatarColor: '#8b5cf6' },
  { name: 'David Kumar',    field: 'Product Management',   avatar: 'DK', avatarColor: '#06b6d4' },
];

export default function Feed() {
  const navigate = useNavigate();
  const [postText, setPostText] = useState('');
  const [likes, setLikes] = useState<Record<number, boolean>>({});

  return (
    <div className="feed-page">
      <Navbar />
      <div className="feed-layout">
        {/* Left Sidebar - Profile Card */}
        <aside className="feed-left">
          <div className="profile-card">
            <div className="profile-card-avatar">
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Alex Johnson"
                className="profile-card-img"
              />
            </div>
            <h3 className="profile-card-name">Alex Johnson</h3>
            <p className="profile-card-title">Computer Science Senior | Full Stack Developer</p>
            <div className="profile-card-badge">
              <Badge type="Senior" />
            </div>
            <div className="profile-card-skills">
              <p className="skills-label">Skills</p>
              <div className="skills-tags">
                {['React', 'Node.js', 'Python', 'Machine Learning'].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="profile-card-stats">
              <div className="stat-row">
                <span className="stat-label">Connections</span>
                <span className="stat-value">248</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Posts</span>
                <span className="stat-value">42</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="feed-main">
          {/* Post Composer */}
          <div className="composer-card">
            <img src="https://i.pravatar.cc/40?img=12" alt="me" className="composer-avatar" />
            <div className="composer-box">
              <textarea
                className="composer-input"
                placeholder="Share your thoughts, ask questions, or offer advice..."
                value={postText}
                onChange={e => setPostText(e.target.value)}
                rows={3}
              />
              <div className="composer-footer">
                <button className="post-btn">
                  <Send size={15} />
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Posts */}
          {POSTS.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div
                  className="post-avatar"
                  style={{ background: post.avatarColor }}
                  onClick={() => navigate('/profile/1')}
                >
                  {post.avatar}
                </div>
                <div className="post-meta">
                  <div className="post-author-row">
                    <span className="post-author" onClick={() => navigate('/profile/1')}>
                      {post.author}
                    </span>
                    <Badge type={post.role} />
                  </div>
                  <span className="post-time">{post.time}</span>
                </div>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-actions">
                <button
                  className={`action-btn ${likes[post.id] ? 'liked' : ''}`}
                  onClick={() => setLikes(l => ({ ...l, [post.id]: !l[post.id] }))}
                >
                  <Heart size={16} fill={likes[post.id] ? 'currentColor' : 'none'} />
                  {post.likes + (likes[post.id] ? 1 : 0)}
                </button>
                <button className="action-btn">
                  <MessageCircle size={16} />
                  {post.comments}
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar */}
        <aside className="feed-right">
          {/* Trending Topics */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">
              <TrendingUp size={18} className="sidebar-icon" />
              Trending Topics
            </h3>
            <div className="trending-list">
              {TRENDING.map(t => (
                <div key={t.tag} className="trending-item">
                  <span className="trending-tag">{t.tag}</span>
                  <span className="trending-count">{t.posts} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Mentors */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">
              <Users size={18} className="sidebar-icon" />
              Suggested Mentors
            </h3>
            <div className="mentors-list">
              {MENTORS.map(m => (
                <div key={m.name} className="mentor-item">
                  <div className="mentor-avatar" style={{ background: m.avatarColor }}>
                    {m.avatar}
                  </div>
                  <div className="mentor-info">
                    <span className="mentor-name">{m.name}</span>
                    <span className="mentor-field">{m.field}</span>
                  </div>
                  <button className="connect-btn">Connect</button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
