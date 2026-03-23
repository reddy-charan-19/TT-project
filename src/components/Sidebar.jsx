import React from 'react';
import './Sidebar.css';

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'flights', label: 'Explore Network', icon: '✈' },
    { id: 'mytickets', label: 'My Cargo / Itinerary', icon: '🎫' },
    { id: 'cancel', label: 'Terminate Booking', icon: '🚫' },
    { id: 'reschedule', label: 'Reroute Flight', icon: '🔄' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">✈</div>
        <div className="sidebar-logo-text">
          <h1>SkyVault</h1>
          <span>Encrypted Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`sidebar-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="sidebar-nav-icon">{tab.icon}</span>
            {tab.label}
          </div>
        ))}
      </nav>

      <div className="system-widget">
        <div className="system-title">
          Cryptography Nodes
          <span className="status-dot"></span>
        </div>
        
        <div className="metric-row">
          <span className="metric-label">Client Sync</span>
          <span className="metric-value" style={{ color: 'var(--success)' }}>ONLINE</span>
        </div>
        
        <div className="metric-row">
          <span className="metric-label">AES-GCM Entropy</span>
          <span className="metric-value">99.8%</span>
        </div>
        <div className="progress-bar-bg"><div className="progress-bar-fill"></div></div>

        <div className="metric-row">
          <span className="metric-label">Lattice Nodes</span>
          <span className="metric-value">4/4 UP</span>
        </div>
      </div>
    </aside>
  );
}
