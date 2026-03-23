package com.flightbooking.domain;

import jakarta.persistence.*;

@Entity
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long ticketId;
    private double amount;

    @Enumerated(EnumType.STRING)
    private RefundStatus status;

    public enum RefundStatus {
        INITIATED, COMPLETED
    }

    public Refund() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTicketId() { return ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public RefundStatus getStatus() { return status; }
    public void setStatus(RefundStatus status) { this.status = status; }
}
