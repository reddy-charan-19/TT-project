import React from 'react';
import './Welcome.css';

export default function Welcome({ onGetStarted }) {
  return (
    <div className="welcome-container animate-fade-in">
      {/* Background glow specific to Welcome */}
      <div className="welcome-bg"></div>

      <nav className="welcome-navbar">
        <div className="welcome-logo">
          <div className="welcome-logo-icon">✈</div>
          <div className="welcome-logo-text">SkyVault</div>
        </div>
        <button className="btn-hero-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', borderRadius: '100px', cursor: 'pointer' }} onClick={onGetStarted}>
          Client Portal
        </button>
      </nav>

      <main className="welcome-hero">
        <div className="welcome-badge">
          <span className="pulse-dot" style={{ display: 'inline-block' }}></span>
          Next-Generation Flight Booking
        </div>
        
        <h1 className="welcome-title">
          Travel with Absolute <span className="glow-text">Confidence</span>.
        </h1>
        
        <p className="welcome-subtitle">
          SkyVault integrates military-grade end-to-end encryption with seamless 
          user experiences. Book, reschedule, and securely manage your 
          flights without compromising your privacy.
        </p>

        <div className="welcome-actions">
          <button className="btn-hero btn-hero-primary" onClick={onGetStarted}>
            Enter Secure Portal
            <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}>→</span>
          </button>
        </div>
      </main>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">AES-256 GCM</h3>
            <p className="feature-desc">
              Every search, booking, and cancellation is heavily fortified with 
              client-side AES-GCM encryption, ensuring complete zero-knowledge privacy.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💸</div>
            <h3 className="feature-title">Instant Refunds</h3>
            <p className="feature-desc">
              Change of plans? SkyVault's automated immutable ledger initiates 
              secure, tamper-proof refunds instantly upon verification of cancellation.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Frictionless UI</h3>
            <p className="feature-desc">
              Security shouldn't mean complexity. Enjoy bleeding-edge responsiveness, 
              real-time availability, and beautiful interactions at every step.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
