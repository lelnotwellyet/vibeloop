import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/feed');
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="vl-circle-lg">VL</div>
        </div>
        <h1 className="auth-title">VibeLoop</h1>
        <p className="auth-sub">Connect, Learn, and Grow Together</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@college.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-btn">Sign In</button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <span className="auth-link" onClick={() => navigate('/register')}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
