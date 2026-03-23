import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import './App.css';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FlightSearch from './components/FlightSearch';
import CancelTicket from './components/CancelTicket';
import RescheduleTicket from './components/RescheduleTicket';
import BookingModal from './components/BookingModal';
import SuccessModal from './components/SuccessModal';
import MyTickets from './components/MyTickets';

import { initCryptoKey } from './utils/crypto';
import { apiGet } from './utils/api';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('flights');
  
  const [allFlights, setAllFlights] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [flightsError, setFlightsError] = useState(null);

  const [bookingFlight, setBookingFlight] = useState(null);
  const [successPnr, setSuccessPnr] = useState(null);
  const [myTickets, setMyTickets] = useState([]);

  const checkAuth = () => {
    const savedUser = localStorage.getItem('skyvault_user');
    if (savedUser) {
      setUser(savedUser);
      const savedTickets = localStorage.getItem(`skyvault_tickets_${savedUser}`);
      if (savedTickets) {
        setMyTickets(JSON.parse(savedTickets));
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchFlights = useCallback(async () => {
    if (!user) return;
    setLoadingFlights(true);
    setFlightsError(null);
    try {
      await initCryptoKey();
      const resp = await apiGet('/api/v1/flights');
      setAllFlights(resp.data);
    } catch (err) {
      console.warn("API unavailable, using mock flight data for demonstration.", err.message);
      const mockFlights = [
        { id: 1, flightNumber: 'EK201', departure: 'DXB', destination: 'JFK', departureTime: [2026, 4, 15, 8, 30], price: 1250, availableSeats: 42 },
        { id: 2, flightNumber: 'AF023', departure: 'JFK', destination: 'CDG', departureTime: [2026, 4, 16, 17, 45], price: 890, availableSeats: 12 },
        { id: 3, flightNumber: 'BA112', departure: 'JFK', destination: 'LHR', departureTime: [2026, 4, 16, 21, 15], price: 740, availableSeats: 0 },
        { id: 4, flightNumber: 'SQ31', departure: 'SFO', destination: 'SIN', departureTime: [2026, 4, 18, 11, 20], price: 1560, availableSeats: 5 },
        { id: 5, flightNumber: 'CX830', departure: 'HKG', destination: 'JFK', departureTime: [2026, 4, 20, 9, 10], price: 1420, availableSeats: 21 },
        { id: 6, flightNumber: 'LH400', departure: 'FRA', destination: 'JFK', departureTime: [2026, 4, 21, 10, 50], price: 680, availableSeats: 8 },
        { id: 7, flightNumber: 'EK202', departure: 'JFK', destination: 'DXB', departureTime: [2026, 4, 22, 23, 0], price: 1100, availableSeats: 16 }
      ];
      setAllFlights(mockFlights);
    } finally {
      setLoadingFlights(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchFlights();
    }
  }, [user, fetchFlights]);

  const handleLogout = () => {
    localStorage.removeItem('skyvault_user');
    setUser(null);
    setShowLogin(false);
    setAllFlights([]);
    setMyTickets([]);
  };

  const handleBookingSuccess = (pnr, flightId, passengerName) => {
    setBookingFlight(null);
    setSuccessPnr(pnr);
    
    const newTicket = { pnr, flightId, passengerName, status: 'Confirmed' };
    const updatedTickets = [...myTickets, newTicket];
    setMyTickets(updatedTickets);
    localStorage.setItem(`skyvault_tickets_${user}`, JSON.stringify(updatedTickets));
    
    fetchFlights();
  };

  const handleTicketCancelSuccess = (pnr) => {
    const updatedTickets = myTickets.map(t => t.pnr === pnr ? { ...t, status: 'Cancelled' } : t);
    setMyTickets(updatedTickets);
    localStorage.setItem(`skyvault_tickets_${user}`, JSON.stringify(updatedTickets));
    fetchFlights();
  };

  const handleTicketRescheduleSuccess = (oldPnr, newPnr, newFlightId) => {
    const updatedTickets = myTickets.map(t => 
      t.pnr === oldPnr ? { ...t, pnr: newPnr, flightId: newFlightId, status: 'Rescheduled' } : t
    );
    setMyTickets(updatedTickets);
    localStorage.setItem(`skyvault_tickets_${user}`, JSON.stringify(updatedTickets));
    fetchFlights();
  };

  if (!user) {
    if (showLogin) {
      return <Login onLoginComplete={(email) => { setUser(email); checkAuth(); }} />;
    }
    return <Welcome onGetStarted={() => setShowLogin(true)} />;
  }

  return (
    <div className="app-wrapper">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-content">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="container">

        {activeTab === 'flights' && (
          <FlightSearch 
            user={user}
            allFlights={allFlights} 
            isLoading={loadingFlights} 
            error={flightsError} 
            onBookStart={(flight) => setBookingFlight(flight)}
          />
        )}
        
        {activeTab === 'mytickets' && (
          <MyTickets tickets={myTickets} allFlights={allFlights} />
        )}

        {activeTab === 'cancel' && (
          <CancelTicket onCancelSuccess={handleTicketCancelSuccess} />
        )}

        {activeTab === 'reschedule' && (
          <RescheduleTicket 
            allFlights={allFlights} 
            onRescheduleSuccess={handleTicketRescheduleSuccess} 
          />
        )}

      </main>

      {bookingFlight && (
        <BookingModal 
          flight={bookingFlight} 
          onClose={() => setBookingFlight(null)} 
          onSuccess={(pnr, passName) => handleBookingSuccess(pnr, bookingFlight.id, passName)} 
        />
      )}

      {successPnr && (
        <SuccessModal 
          pnr={successPnr} 
          onClose={() => setSuccessPnr(null)} 
        />
      )}
      </div>
    </div>
  );
}

export default App;
