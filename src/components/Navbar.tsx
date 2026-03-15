import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, User, LogOut } from 'lucide-react';
import './Navbar.css';

const NAV_ITEMS = [
  { path: '/feed',       icon: Home,          label: 'Feed' },
  { path: '/chat',       icon: MessageCircle, label: 'Chat' },
  { path: '/profile/1',  icon: User,          label: 'Profile' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/feed')}>
        <div className="vl-circle">VL</div>
        <span className="navbar-brand">VibeLoop</span>
      </div>
      <div className="navbar-links">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const active = pathname === path || (path === '/profile/1' && pathname.startsWith('/profile'));
          return (
            <button
              key={path}
              className={`nav-link ${active ? 'active' : ''}`}
              onClick={() => navigate(path)}
            >
              <Icon size={22} />
              <span>{label}</span>
            </button>
          );
        })}
        <button className="nav-link" onClick={() => navigate('/login')}>
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
