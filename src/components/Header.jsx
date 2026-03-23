import React from 'react';
import './Header.css';

export default function Header({ user, onLogout }) {
  if (!user) return null;

  return (
    <header className="app-header">
      <div className="header-status">
        <span className="pulse-dot"></span>
        E2E Encryption Active
      </div>

      <div className="user-nav">
        <div className="encryption-badge">Secured</div>
        <div className="user-profile">
          <span className="user-avatar">👤</span>
          <span className="user-email">{user.split('@')[0]}</span>
        </div>
        <button onClick={onLogout} className="logout-btn">Sign Out</button>
      </div>
    </header>
  );
}
