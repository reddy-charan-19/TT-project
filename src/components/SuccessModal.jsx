import React from 'react';
import './Modals.css';

export default function SuccessModal({ pnr, onClose }) {
  if (!pnr) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ textAlign: 'center', padding: '3.5rem 2.5rem' }}
      >
        <span className="success-icon">🎫</span>
        <div className="modal-title" style={{ justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--success)' }}>
          Booking Confirmed!
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          Your secure booking was successful. Please explicitly save this PNR code, you will need it to view, reschedule, or cancel your flight.
        </p>
        <div className="pnr-display">
          {pnr}
        </div>
        <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '2rem' }}>
          Acknowledge & Close
        </button>
      </div>
    </div>
  );
}
