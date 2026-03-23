package com.flightbooking.dto;

public class RescheduleRequest {
    private String pnr;
    private Long newFlightId;

    public String getPnr() { return pnr; }
    public void setPnr(String pnr) { this.pnr = pnr; }

    public Long getNewFlightId() { return newFlightId; }
    public void setNewFlightId(Long newFlightId) { this.newFlightId = newFlightId; }
}
