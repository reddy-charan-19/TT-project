import React from 'react';
import './MyTickets.css';

export default function MyTickets({ tickets, allFlights }) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="tickets-empty-state">
        <span className="tickets-empty-icon">🎫</span>
        <h3>No Secure Tickets Found</h3>
        <p>You haven't booked any encrypted flights yet. Head over to the Browse Flights tab to start your journey.</p>
      </div>
    );
  }

  return (
    <div className="my-tickets-container animate-fade-in">
      <div className="form-header-text">
        <h2 className="form-welcome-title">Your <span className="glow-text">Encrypted Itinerary</span></h2>
        <p className="form-welcome-subtitle">
          Manage and review your secure flight bookings below.
        </p>
      </div>
      <div className="tickets-list">
        {tickets.map((t, idx) => {
          const flightDetails = allFlights.find(f => f.id === t.flightId);
          if (!flightDetails) return null;
          
          return (
            <div className="ticket-card" key={idx}>
              <div className="ticket-card-header">
                <span className={`ticket-status ${t.status.toLowerCase()}`}>{t.status}</span>
                <span className="ticket-pnr">PNR: {t.pnr}</span>
              </div>
              
              <div className="ticket-card-body">
                <div className="ticket-route-info">
                  <div className="ticket-city">{flightDetails.departure}</div>
                  <div className="ticket-path">
                    <span className="ticket-plane">✈</span>
                  </div>
                  <div className="ticket-city">{flightDetails.destination}</div>
                </div>
                
                <div className="ticket-details-grid">
                  <div className="ticket-detail">
                    <label>Passenger</label>
                    <span>{t.passengerName}</span>
                  </div>
                  <div className="ticket-detail">
                    <label>Flight No.</label>
                    <span className="highlight">{flightDetails.flightNumber}</span>
                  </div>
                  <div className="ticket-detail">
                    <label>Amount Paid</label>
                    <span className="highlight-success">${flightDetails.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="ticket-card-footer">
                <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
                  🖨 Print Secure Pass
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
