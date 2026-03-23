package com.flightbooking.repository;

import com.flightbooking.domain.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByDepartureAndDestination(String departure, String destination);
}
