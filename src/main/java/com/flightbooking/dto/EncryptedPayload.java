package com.flightbooking.dto;

public class EncryptedPayload {
    private String payload;

    public EncryptedPayload() {}
    public EncryptedPayload(String payload) { this.payload = payload; }

    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }
}
