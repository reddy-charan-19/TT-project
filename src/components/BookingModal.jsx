import React, { useState } from 'react';
import { apiPost } from '../utils/api';
import './Modals.css';

export default function BookingModal({ flight, onClose, onSuccess }) {
  const [passengerName, setPassengerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!flight) return null;

  const confirmBooking = async () => {
    if (!passengerName.trim()) { alert('Please enter passenger name'); return; }

    setLoading(true);
    setError(null);

    try {
      const resp = await apiPost('/api/v1/book', {
        flightId: flight.id,
        passengerName: passengerName.trim()
      });
      onSuccess(resp.data.pnr);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">✈ Book Securely</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-flight-info">
          <strong>Flight {flight.flightNumber}</strong><br/>
          {flight.departure} → {flight.destination}<br/>
          <span className="modal-price">${flight.price.toFixed(0)}</span>
        </div>
        
        <div className="form-group">
          <label>Passenger Name</label>
          <input 
            type="text" 
            placeholder="Enter full name as on passport" 
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
          />
        </div>
        
        <button 
          className={`btn btn-primary ${loading ? 'btn-loading' : ''}`} 
          onClick={confirmBooking} 
          disabled={loading}
          style={{ marginTop: '1.5rem' }}
        >
          {loading ? <div className="spinner"></div> : <span>Confirm Encrypted Booking</span>}
        </button>

        {error && (
          <div className="result-overlay error">
            <div className="result-overlay-title error">❌ Booking Failed</div>
            <div className="result-overlay-data">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
}
