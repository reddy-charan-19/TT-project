package com.flightbooking.config;

import com.flightbooking.domain.Flight;
import com.flightbooking.repository.FlightRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(FlightRepository flightRepository) {
        return args -> {
            Flight f1 = new Flight();
            f1.setFlightNumber("SV-101");
            f1.setDeparture("JFK");
            f1.setDestination("LAX");
            f1.setDepartureTime(LocalDateTime.now().plusDays(2));
            f1.setAvailableSeats(50);
            f1.setPrice(350.0);
            flightRepository.save(f1);

            Flight f2 = new Flight();
            f2.setFlightNumber("SV-202");
            f2.setDeparture("SFO");
            f2.setDestination("ORD");
            f2.setDepartureTime(LocalDateTime.now().plusDays(3));
            f2.setAvailableSeats(10);
            f2.setPrice(200.0);
            flightRepository.save(f2);

            Flight f3 = new Flight();
            f3.setFlightNumber("SV-305");
            f3.setDeparture("MIA");
            f3.setDestination("LHR");
            f3.setDepartureTime(LocalDateTime.now().plusDays(5));
            f3.setAvailableSeats(120);
            f3.setPrice(850.0);
            flightRepository.save(f3);

            Flight f4 = new Flight();
            f4.setFlightNumber("SV-410");
            f4.setDeparture("DXB");
            f4.setDestination("JFK");
            f4.setDepartureTime(LocalDateTime.now().plusDays(1));
            f4.setAvailableSeats(8);
            f4.setPrice(1200.0);
            flightRepository.save(f4);

            Flight f5 = new Flight();
            f5.setFlightNumber("SV-515");
            f5.setDeparture("HND");
            f5.setDestination("SYD");
            f5.setDepartureTime(LocalDateTime.now().plusDays(7));
            f5.setAvailableSeats(0); // Sold out demo
            f5.setPrice(950.0);
            flightRepository.save(f5);

            Flight f6 = new Flight();
            f6.setFlightNumber("SV-620");
            f6.setDeparture("CDG");
            f6.setDestination("FRA");
            f6.setDepartureTime(LocalDateTime.now().plusDays(4));
            f6.setAvailableSeats(45);
            f6.setPrice(180.0);
            flightRepository.save(f6);
            
            Flight f7 = new Flight();
            f7.setFlightNumber("SV-750");
            f7.setDeparture("SIN");
            f7.setDestination("HKG");
            f7.setDepartureTime(LocalDateTime.now().plusDays(2).plusHours(6));
            f7.setAvailableSeats(25);
            f7.setPrice(420.0);
            flightRepository.save(f7);
            
            Flight f8 = new Flight();
            f8.setFlightNumber("SV-800");
            f8.setDeparture("YYZ");
            f8.setDestination("YVR");
            f8.setDepartureTime(LocalDateTime.now().plusDays(1).plusHours(12));
            f8.setAvailableSeats(60);
            f8.setPrice(295.0);
            flightRepository.save(f8);
        };
    }
}
