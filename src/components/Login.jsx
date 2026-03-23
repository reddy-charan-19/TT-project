import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLoginComplete }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const performAuth = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (isSignUp && !fullName) {
      alert("Please enter your full name");
      return;
    }
    setLoading(true);
    
    // Simulate network auth
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('skyvault_user', isSignUp ? `${fullName} (${email})` : email);
      onLoginComplete(isSignUp ? `${fullName} (${email})` : email);
    }, 800);
  };

  return (
    <div className="login-view">
      <div className="login-card">
        <div className="login-card-header">
          <h2>{isSignUp ? 'Create Secure Account' : 'SkyVault Access'}</h2>
          <p>{isSignUp ? 'Join the next generation of private travel.' : 'Secure Portal Login'}</p>
        </div>
        <form onSubmit={performAuth}>
          {isSignUp && (
            <div className="form-group" style={{ animation: 'fadeIn 0.3s ease' }}>
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email / Username</label>
            <input 
              type="text" 
              placeholder="user@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
            disabled={loading}
            style={{ marginTop: '1.5rem', padding: '1.1rem', fontSize: '1rem', letterSpacing: '1px' }}
          >
            {loading ? <div className="spinner"></div> : <span>{isSignUp ? 'Initialize Secure Profile' : 'Authenticate Securely'}</span>}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isSignUp ? 'Already have an account?' : 'New customer?'}
          </p>
          <button 
            type="button" 
            style={{ background: 'none', border: 'none', color: 'var(--accent-light)', fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem', textDecoration: 'underline' }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In to existing portal' : 'Create an account to join'}
          </button>
        </div>
      </div>
    </div>
  );
}
