import React, { useState } from 'react';
import { apiPost } from '../utils/api';
import './Forms.css';

export default function RescheduleTicket({ allFlights, onRescheduleSuccess }) {
  const [pnr, setPnr] = useState('');
  const [newFlightId, setNewFlightId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleReschedule = async (e) => {
    e.preventDefault();
    if (!pnr.trim()) { alert('Please enter PNR'); return; }
    if (!newFlightId) { alert('Please select a new flight'); return; }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const resp = await apiPost('/api/v1/reschedule', { 
        pnr: pnr.trim(),
        newFlightId: parseInt(newFlightId)
      });
      setResult({
        data: resp.data,
        encryptedRequest: resp.encryptedRequest,
        encryptedResponse: resp.encryptedResponse
      });
      if (onRescheduleSuccess) {
        onRescheduleSuccess(pnr.trim(), resp.data.pnr, parseInt(newFlightId));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card-container">
      <div className="form-header-text">
        <h2 className="form-welcome-title">Change of <span className="glow-text">Plans</span>?</h2>
        <p className="form-welcome-subtitle">
          Instantly reassign your secure PNR to a completely different flight schedule.
        </p>
      </div>

      <div className="action-card">
        <div className="action-card-title">🔄 Reschedule a Booking</div>
        <form onSubmit={handleReschedule}>
          <div className="form-group">
            <label>PNR (Booking Reference)</label>
            <input 
              type="text" 
              placeholder="e.g. 51A4F1A0" 
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>New Flight ID</label>
            <select 
              value={newFlightId} 
              onChange={(e) => setNewFlightId(e.target.value)}
            >
              <option value="">-- Select Alternate Secure Flight --</option>
              {allFlights.map(f => (
                <option key={f.id} value={f.id}>
                  {f.flightNumber} — {f.departure} → {f.destination} (${f.price})
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={`btn btn-warning ${loading ? 'btn-loading' : ''}`} disabled={loading}>
            {loading ? <div className="spinner"></div> : <span>Reschedule Secure Flight</span>}
          </button>
        </form>

        {result && (
          <div className="result-overlay success">
            <div className="result-overlay-title success">✅ Flight Rescheduled</div>
            <div className="result-overlay-data">
              <strong>New PNR:</strong> {result.data.pnr}<br/>
              <strong>Passenger:</strong> {result.data.passengerName}<br/>
              <strong>Status:</strong> {result.data.status}
            </div>
            {result.encryptedRequest && (
              <div className="crypto-log">
                <div className="crypto-log-title">🔒 Encryption Log</div>
                <pre>Encrypted Request: {result.encryptedRequest.substring(0, 60)}...
Encrypted Response: {result.encryptedResponse?.substring(0, 60)}...</pre>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="result-overlay error">
            <div className="result-overlay-title error">❌ Reschedule Failed</div>
            <div className="result-overlay-data">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
}
