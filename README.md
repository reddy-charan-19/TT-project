# ✈️ SkyVault - secure Spring Boot Gateway

> A high-performance Java Spring Boot REST API for managing incredibly secure, immutable flight transactions.

![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%203.x-green) ![Data Security](https://img.shields.io/badge/Security-AES--256%20GCM-blueviolet) ![Status](https://img.shields.io/badge/Status-Robust-success)

This repository (`backend` branch) contains the server-side architecture powering the SkyVault Flight Portal. The frontend dynamically interacts with this system.

---

## 🔒 End-To-End Encrypted Communication Flow
Every network request leaving the frontend is totally obscured. The **Flight Booking Controller** inside this codebase expects `encryptedRequest` payloads.
It natively uses the `AESGCMUtil` to:
1. Decode the secure Request Payload securely server-side.
2. Read the parameters natively (Flight IDs, Booking PNRs, Cancellations).
3. Process the transaction securely against the ledger.
4. Send an `encryptedResponse` directly back to the client.

No middleware, packet loggers, or ISP can ever intercept your ticket booking details!

---

## 🚀 Setup & Execution

### Prerequisites
Make sure you have JDK 17 (or newer) and Maven installed.

### Start the Server
1. Clone this specific backend branch:
   ```bash
   git clone -b backend https://github.com/reddy-charan-19/TT-project.git skyvault-backend
   cd skyvault-backend
   ```
2. Build the packages (ignoring tests globally for speed or running `mvn clean install`):
   ```bash
   ./mvnw clean package -DskipTests
   ```
3. Run the Spring Boot server!
   ```bash
   ./mvnw spring-boot:run
   ```
The secure API endpoints will be served over `http://localhost:8080/api/v1/`.

---

### 🔥 Endpoints
- `GET /api/v1/flights`
- `POST /api/v1/book` (Accepts & Returns Encrypted Buffer)
- `POST /api/v1/cancel` (Accepts & Returns Encrypted Buffer)
- `POST /api/v1/reschedule` (Accepts & Returns Encrypted Buffer)

Remember to pair this perfectly with the `main` branch Frontend codebase!
