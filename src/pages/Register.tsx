import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'junior' | 'senior'>('junior');

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
        <h1 className="auth-title">Join VibeLoop</h1>
        <p className="auth-sub">Start your mentorship journey today</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="you@college.edu" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label className="form-label">I am a...</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  checked={role === 'junior'}
                  onChange={() => setRole('junior')}
                />
                Junior (seeking guidance)
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  checked={role === 'senior'}
                  onChange={() => setRole('senior')}
                />
                Senior (providing mentorship)
              </label>
            </div>
          </div>
          <button type="submit" className="auth-btn">Create Account</button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <span className="auth-link" onClick={() => navigate('/login')}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
