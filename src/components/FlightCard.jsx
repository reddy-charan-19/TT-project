import React from 'react';
import './FlightCard.css';

function formatDateTime(dtArray) {
  if (!dtArray || !Array.isArray(dtArray)) return 'N/A';
  const [y, m, d, h, min] = dtArray;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hour12 = h % 12 || 12;
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${months[m-1]} ${d}, ${y} · ${hour12}:${String(min).padStart(2,'0')} ${ampm}`;
}

export default function FlightCard({ flight, onBookStart }) {
  const isSoldOut = flight.availableSeats <= 0;

  return (
    <div className="flight-card animate-fade-in">
      <div className="flight-number">Flight {flight.flightNumber}</div>
      <div className="flight-route">
        <div className="city-code">{flight.departure}</div>
        <div className="route-line"><div className="flight-icon-wrapper">✈</div></div>
        <div className="city-code">{flight.destination}</div>
      </div>
      <div className="flight-time">
        {formatDateTime(flight.departureTime)}
      </div>
      <div className="flight-details">
        <div className="flight-detail-item">
          <div className="label">Price</div>
          <div className="value price-tag">${flight.price.toFixed(0)}</div>
        </div>
        <div className="flight-detail-item">
          <div className="label">Available</div>
          <div className="value seats-tag">{flight.availableSeats} seats</div>
        </div>
      </div>
      <button 
        className="btn btn-primary" 
        onClick={() => onBookStart(flight)}
        disabled={isSoldOut}
      >
        {isSoldOut ? 'Sold Out' : '🔐 Book Securely'}
      </button>
    </div>
  );
}
