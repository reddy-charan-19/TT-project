package com.flightbooking.controller;

import com.flightbooking.domain.Flight;
import com.flightbooking.domain.Refund;
import com.flightbooking.domain.Ticket;
import com.flightbooking.dto.BookingRequest;
import com.flightbooking.dto.RescheduleRequest;
import com.flightbooking.service.FlightBookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightBookingController {

    private final FlightBookingService flightBookingService;

    public FlightBookingController(FlightBookingService flightBookingService) {
        this.flightBookingService = flightBookingService;
    }

    // 🔍 Search flights
    @GetMapping("/search")
    public List<Flight> searchFlights(@RequestParam String departure,
                                      @RequestParam String destination) {
        return flightBookingService.searchFlights(departure, destination);
    }

    // 📋 Get all flights
    @GetMapping
    public List<Flight> getAllFlights() {
        return flightBookingService.getAllFlights();
    }

    // 🎫 Book flight
    @PostMapping("/book")
    public Ticket bookFlight(@RequestBody BookingRequest request) {
        return flightBookingService.bookFlight(request);
    }

    // ❌ Cancel flight
    @DeleteMapping("/cancel/{pnr}")
    public Refund cancelFlight(@PathVariable String pnr) {
        return flightBookingService.cancelFlight(pnr);
    }

    // 🔄 Reschedule flight
    @PutMapping("/reschedule")
    public Ticket rescheduleFlight(@RequestBody RescheduleRequest request) {
        return flightBookingService.rescheduleFlight(request);
    }
}