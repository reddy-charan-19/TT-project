import React, { useState, useEffect, useMemo } from 'react';
import FlightCard from './FlightCard';
import './FlightSearch.css';

export default function FlightSearch({ user, allFlights, isLoading, error, onBookStart }) {
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [sortOption, setSortOption] = useState('price-asc');

  const airportMapping = {
    'PARIS': 'CDG', 'CHARLES DE GAULLE': 'CDG', 
    'CHICAGO': 'ORD', 'O HARE': 'ORD',
    'DUBAI': 'DXB', 'FRANKFURT': 'FRA',
    'HONG KONG': 'HKG', 'TOKYO': 'HND', 'HANEDA': 'HND',
    'NEW YORK': 'JFK', 'JOHN F. KENNEDY': 'JFK',
    'LOS ANGELES': 'LAX', 'LONDON': 'LHR', 'HEATHROW': 'LHR',
    'MIAMI': 'MIA', 'SAN FRANCISCO': 'SFO',
    'SINGAPORE': 'SIN', 'CHANGI': 'SIN',
    'SYDNEY': 'SYD', 'VANCOUVER': 'YVR', 'TORONTO': 'YYZ', 'PEARSON': 'YYZ'
  };

  const resolveCode = (term) => {
    if (!term) return null;
    const upperTerm = term.trim().toUpperCase();
    if (upperTerm.length <= 3 && allFlights.some(f => f.departure.includes(upperTerm) || f.destination.includes(upperTerm))) {
      return upperTerm;
    }
    for (const key in airportMapping) {
      if (key.includes(upperTerm)) return airportMapping[key];
    }
    return upperTerm; 
  };

  const swapAirports = () => {
    const temp = fromQuery;
    setFromQuery(toQuery);
    setToQuery(temp);
  };

  const filteredFlights = useMemo(() => {
    const fromCode = resolveCode(fromQuery);
    const toCode = resolveCode(toQuery);

    let filtered = [...allFlights];
    if (fromCode) filtered = filtered.filter(f => f.departure.includes(fromCode));
    if (toCode) filtered = filtered.filter(f => f.destination.includes(toCode));
    
    // Sort
    if (sortOption === 'price-asc') filtered.sort((a,b) => a.price - b.price);
    else if (sortOption === 'price-desc') filtered.sort((a,b) => b.price - a.price);
    
    return filtered;
  }, [allFlights, fromQuery, toQuery, sortOption]);

  return (
    <div className="flight-search-container">
      
      <div className="search-header-text">
        <h2 className="search-welcome-title">
          Welcome to <span className="glow-text">SkyVault</span>
          {user ? `, ${user.split('@')[0].split(' ')[0]}` : ''}!
        </h2>
        <p className="search-welcome-subtitle">
          Choose your destination, sort by preference, and explore encrypted flights below.
        </p>
      </div>

      <datalist id="airportList">
        <option value="CDG">Paris (Charles de Gaulle)</option>
        <option value="DXB">Dubai</option>
        <option value="FRA">Frankfurt</option>
        <option value="HKG">Hong Kong</option>
        <option value="HND">Tokyo (Haneda)</option>
        <option value="JFK">New York (John F. Kennedy)</option>
        <option value="LAX">Los Angeles</option>
        <option value="LHR">London (Heathrow)</option>
        <option value="MIA">Miami</option>
        <option value="ORD">Chicago (O'Hare)</option>
        <option value="SFO">San Francisco</option>
        <option value="SIN">Singapore (Changi)</option>
        <option value="SYD">Sydney</option>
        <option value="YVR">Vancouver</option>
        <option value="YYZ">Toronto (Pearson)</option>
      </datalist>

      <div className="search-controls">
        <div className="form-group search-input-group">
          <label>From</label>
          <input 
            type="text" 
            list="airportList" 
            placeholder="e.g. DXB or Dubai" 
            value={fromQuery}
            onChange={(e) => setFromQuery(e.target.value)}
          />
        </div>
        
        <div className="search-swap-btn" onClick={swapAirports} title="Swap Origins">
          <span className="search-swap-icon">⇄</span>
        </div>
        
        <div className="form-group search-input-group">
          <label>To</label>
          <input 
            type="text" 
            list="airportList" 
            placeholder="e.g. JFK or New York" 
            value={toQuery}
            onChange={(e) => setToQuery(e.target.value)}
          />
        </div>

        <div className="form-group search-input-group" style={{ minWidth: "200px", flex: 0.5 }}>
          <label>Sort By</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="flights-grid">
        {isLoading && (
          <div className="empty-state">
            <div className="spinner" style={{ display: 'inline-block', marginBottom: '1.5rem', borderColor: 'var(--accent)' }}></div>
            <p className="text-muted">Retrieving secure flight data...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="empty-state">
            <p className="text-danger" style={{ fontWeight: 600 }}>{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredFlights.length === 0 && (
          <div className="empty-state">
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>No flights currently available for this route.</p>
          </div>
        )}

        {!isLoading && !error && filteredFlights.length > 0 && 
          filteredFlights.map(f => (
            <FlightCard key={f.id} flight={f} onBookStart={onBookStart} />
          ))
        }
      </div>
    </div>
  );
}
