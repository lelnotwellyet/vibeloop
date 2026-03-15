import React from 'react';
import { MapPin, Calendar, Heart, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Badge from '../components/Badge';
import './Profile.css';

const SKILLS = ['React', 'Node.js', 'Python', 'Machine Learning', 'TypeScript', 'AWS'];

const POSTS = [
  {
    id: 1,
    author: 'Alex Johnson',
    role: 'Senior' as const,
    time: '2 days ago',
    content: "Just wrapped up a fantastic mentoring session with some amazing juniors! Remember, every expert was once a beginner. Keep pushing forward! 💪 #Mentorship #CareerGrowth",
    likes: 38,
    comments: 12,
  },
  {
    id: 2,
    author: 'Alex Johnson',
    role: 'Senior' as const,
    time: '5 days ago',
    content: "Excited to share that I just landed a full-time offer at a top tech company! The journey wasn't easy, but persistence pays off. Happy to share tips on interview prep with anyone who needs it! 🎉",
    likes: 94,
    comments: 27,
  },
];

export default function Profile() {
  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        {/* Banner + Info Card */}
        <div className="profile-main-card">
          <div className="profile-banner" />
          <div className="profile-info-section">
            <div className="profile-avatar-wrap">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Alex Johnson"
                className="profile-big-avatar"
              />
            </div>
            <div className="profile-details">
              <div className="profile-top-row">
                <div>
                  <h1 className="profile-name">Alex Johnson</h1>
                  <p className="profile-bio">
                    Computer Science Senior | Full Stack Developer | Passionate about teaching and mentoring
                  </p>
                  <div className="profile-meta-row">
                    <span className="profile-meta-item">
                      <MapPin size={14} /> San Francisco, CA
                    </span>
                    <span className="profile-meta-item">
                      <Calendar size={14} /> Joined January 2024
                    </span>
                    <Badge type="Senior" />
                  </div>
                </div>
                <button className="edit-profile-btn">Edit Profile</button>
              </div>
              <div className="profile-stats">
                <span className="profile-stat"><strong>248</strong> Connections</span>
                <span className="profile-stat"><strong>42</strong> Posts</span>
                <span className="profile-stat"><strong>15</strong> Mentees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="profile-bottom-grid">
          {/* Skills */}
          <div className="profile-section-card">
            <h3 className="section-card-title">Skills</h3>
            <div className="profile-skills">
              {SKILLS.map(s => (
                <span key={s} className="profile-skill-tag">{s}</span>
              ))}
            </div>
          </div>

          {/* Posts & Activity */}
          <div className="profile-posts">
            <h3 className="section-card-title">Posts &amp; Activity</h3>
            {POSTS.map(post => (
              <div key={post.id} className="profile-post-card">
                <div className="profile-post-header">
                  <img
                    src="https://i.pravatar.cc/40?img=12"
                    alt="Alex"
                    className="profile-post-avatar"
                  />
                  <div>
                    <div className="profile-post-author-row">
                      <span className="profile-post-author">{post.author}</span>
                      <Badge type={post.role} />
                    </div>
                    <span className="profile-post-time">{post.time}</span>
                  </div>
                </div>
                <p className="profile-post-content">{post.content}</p>
                <div className="profile-post-actions">
                  <span className="profile-action">
                    <Heart size={15} /> {post.likes}
                  </span>
                  <span className="profile-action">
                    <MessageCircle size={15} /> {post.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
