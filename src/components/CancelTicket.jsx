import React, { useState } from 'react';
import { apiPost } from '../utils/api';
import './Forms.css';

export default function CancelTicket({ onCancelSuccess }) {
  const [pnr, setPnr] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCancel = async (e) => {
    e.preventDefault();
    if (!pnr.trim()) { alert('Please enter PNR'); return; }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const resp = await apiPost('/api/v1/cancel', { pnr: pnr.trim() });
      setResult({
        data: resp.data,
        encryptedRequest: resp.encryptedRequest,
        encryptedResponse: resp.encryptedResponse
      });
      if (onCancelSuccess) {
        onCancelSuccess(pnr.trim());
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
        <h2 className="form-welcome-title">Need to <span className="warning-text">Cancel</span>?</h2>
        <p className="form-welcome-subtitle">
          Submit your secure PNR below. Our immutable ledger will process your refund instantly.
        </p>
      </div>

      <div className="action-card">
        <div className="action-card-title">🚫 Cancel a Secure Booking</div>
        <form onSubmit={handleCancel}>
          <div className="form-group">
            <label>PNR (Booking Reference)</label>
            <input 
              type="text" 
              placeholder="e.g. 51A4F1A0" 
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
            />
          </div>
          <button type="submit" className={`btn btn-danger ${loading ? 'btn-loading' : ''}`} disabled={loading}>
            {loading ? <div className="spinner"></div> : <span>Cancel Ticket & Request Refund</span>}
          </button>
        </form>

        {result && (
          <div className="result-overlay success">
            <div className="result-overlay-title success">✅ Ticket Cancelled</div>
            <div className="result-overlay-data">
              <strong>Refund Amount:</strong> ${result.data.amount?.toFixed(2) || '0.00'}<br/>
              <strong>Refund Status:</strong> {result.data.status}
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
            <div className="result-overlay-title error">❌ Cancellation Failed</div>
            <div className="result-overlay-data">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
}
