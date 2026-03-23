package com.flightbooking.repository;

import com.flightbooking.domain.Refund;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefundRepository extends JpaRepository<Refund, Long> {
    Refund findByTicketId(Long ticketId);
}
