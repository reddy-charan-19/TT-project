package com.flightbooking.service;

import com.flightbooking.domain.Flight;
import com.flightbooking.domain.Refund;
import com.flightbooking.domain.Ticket;
import com.flightbooking.dto.BookingRequest;
import com.flightbooking.dto.RescheduleRequest;
import com.flightbooking.repository.FlightRepository;
import com.flightbooking.repository.RefundRepository;
import com.flightbooking.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class FlightBookingService {

    private final FlightRepository flightRepository;
    private final TicketRepository ticketRepository;
    private final RefundRepository refundRepository;

    public FlightBookingService(FlightRepository flightRepository,
                                TicketRepository ticketRepository,
                                RefundRepository refundRepository) {
        this.flightRepository = flightRepository;
        this.ticketRepository = ticketRepository;
        this.refundRepository = refundRepository;
    }

    public List<Flight> searchFlights(String departure, String destination) {
        return flightRepository.findByDepartureAndDestination(departure, destination);
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @Transactional
    public Ticket bookFlight(BookingRequest request) {
        Flight flight = flightRepository.findById(request.getFlightId())
                .orElseThrow(() -> new IllegalArgumentException("Flight not found"));

        if (flight.getAvailableSeats() <= 0) {
            throw new IllegalStateException("No available seats");
        }

        flight.setAvailableSeats(flight.getAvailableSeats() - 1);
        flightRepository.save(flight);

        Ticket ticket = new Ticket();
        ticket.setFlightId(flight.getId());
        ticket.setPassengerName(request.getPassengerName());
        ticket.setPnr(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        ticket.setStatus(Ticket.TicketStatus.BOOKED);

        return ticketRepository.save(ticket);
    }

    @Transactional
    public Refund cancelFlight(String pnr) {
        Ticket ticket = ticketRepository.findByPnr(pnr)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));

        if (ticket.getStatus() == Ticket.TicketStatus.CANCELLED) {
            throw new IllegalStateException("Ticket is already cancelled");
        }

        ticket.setStatus(Ticket.TicketStatus.CANCELLED);
        ticketRepository.save(ticket);

        Flight flight = flightRepository.findById(ticket.getFlightId()).orElseThrow();
        flight.setAvailableSeats(flight.getAvailableSeats() + 1);
        flightRepository.save(flight);

        Refund refund = new Refund();
        refund.setTicketId(ticket.getId());
        refund.setAmount(flight.getPrice());
        refund.setStatus(Refund.RefundStatus.COMPLETED);

        return refundRepository.save(refund);
    }

    @Transactional
    public Ticket rescheduleFlight(RescheduleRequest request) {
        cancelFlight(request.getPnr());

        Ticket oldTicket = ticketRepository.findByPnr(request.getPnr()).orElseThrow();
        BookingRequest newBooking = new BookingRequest();
        newBooking.setFlightId(request.getNewFlightId());
        newBooking.setPassengerName(oldTicket.getPassengerName());

        return bookFlight(newBooking);
    }
}
